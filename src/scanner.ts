/**
 * 确定性安全扫描器：遍历文件、按语言应用规则、密钥熵检测、内联豁免。
 *
 * @module dsh-code-security/scanner
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { DEFAULT_EXCLUDE_DIRS, type Severity } from './config.js'
import { languageForFile, RULES, type SecurityRule } from './rules.js'
import { policyExcludesDir, policyIgnores, type SecurePolicy } from './policy.js'

export interface Finding {
  id: string
  ruleId: string
  title: string
  cwe: string
  severity: Severity
  confidence: 'high' | 'medium' | 'low'
  file: string
  line: number
  snippet: string
  message: string
}

export interface ScanResult {
  root: string
  filesScanned: number
  filesSkipped: number
  findings: Finding[]
  durationMs: number
}

export interface ScanOptions {
  cwd: string
  target?: string
  maxFiles: number
  maxFileBytes: number
  policy: SecurePolicy
}

const DISABLE_NEXT = /secure-review-disable-next-line(?:\s+([\w,-]+))?/
const DISABLE_LINE = /secure-review-disable-line(?:\s+([\w,-]+))?/

function isComment(line: string): boolean {
  const t = line.trim()
  return t.startsWith('//') || t.startsWith('#') || t.startsWith('/*') || t.startsWith('*')
}

function disabledRules(line: string, pattern: RegExp): string[] | null {
  const m = pattern.exec(line)
  if (m === null) return null
  if (m[1] === undefined) return []
  return m[1].split(',').map((x) => x.trim()).filter((x) => x !== '')
}

function shouldSkipLine(rule: SecurityRule, disabled: string[] | null | undefined): boolean {
  if (disabled === null || disabled === undefined) return false
  if (disabled.length === 0) return true
  return disabled.includes(rule.id)
}

function fileHasBinary(buffer: Uint8Array): boolean {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8000))
  for (const byte of sample) if (byte === 0) return true
  return false
}

const TEXT_EXTENSIONS = /\.(?:js|mjs|cjs|jsx|ts|tsx|py|go|java|rb|php|sh|bash|zsh|ya?ml|json|env|dockerfile|txt|md|html|css|vue|svelte|pem|key|crt|cer|p12|der|p8)$/i

function shouldScanFile(file: string): boolean {
  const base = path.basename(file).toLowerCase()
  if (base === 'dockerfile') return true
  if (/\.env(?:\..*)?$/.test(base)) return true
  if (base === '.npmrc') return true
  return TEXT_EXTENSIONS.test(file)
}

/** Shannon 熵；只对 24 位以上且以字母数字为主的 token 判分。 */
function shannon(text: string): number {
  if (text.length < 16) return 0
  const counts = new Map<string, number>()
  for (const char of text) counts.set(char, (counts.get(char) ?? 0) + 1)
  let entropy = 0
  for (const count of counts.values()) {
    const p = count / text.length
    entropy -= p * Math.log2(p)
  }
  return entropy
}

const TOKEN_PATTERN = /['"]([A-Za-z0-9+/=_-]{24,})['"]/g
const HIGH_ENTROPY_THRESHOLD = 3.8

function detectHighEntropy(line: string, lineNumber: number, file: string, rel: string, rule: SecurityRule): Finding[] {
  const findings: Finding[] = []
  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const token = match[1]!
    if (/^[0-9]+$/.test(token)) continue
    if (!/\d/.test(token)) continue
    if (shannon(token) < HIGH_ENTROPY_THRESHOLD) continue
    const id = makeId(rule.id, rel, lineNumber, token.slice(0, 32))
    findings.push({
      id,
      ruleId: rule.id,
      title: rule.title,
      cwe: rule.cwe,
      severity: rule.severity,
      confidence: rule.confidence,
      file: rel,
      line: lineNumber,
      snippet: line.trim().slice(0, 200),
      message: rule.message,
    })
  }
  return findings
}

function makeId(ruleId: string, file: string, line: number, snippet: string): string {
  const hash = createHash('sha256').update(ruleId + '|' + file + '|' + line + '|' + snippet.slice(0, 80)).digest('hex').slice(0, 10)
  return 'SR-' + hash
}

export interface LineEntry {
  line: number
  text: string
}

/** 对带行号的文本行应用规则（全量扫描与 git diff 增量扫描共用）。 */
export function scanLineSet(entries: LineEntry[], rel: string, policy: SecurePolicy): Finding[] {
  const language = languageForFile(rel)
  const findings: Finding[] = []
  const applied = RULES.filter((rule) => rule.languages.includes(language) || rule.languages.includes('any'))
  const prevDisable = new Map<number, string[] | null | undefined>()
  for (const entry of entries) {
    if (isComment(entry.text)) prevDisable.set(entry.line + 1, disabledRules(entry.text, DISABLE_NEXT))
  }
  for (const entry of entries) {
    const isCommentLine = isComment(entry.text)
    const currentDisable = isCommentLine ? disabledRules(entry.text, DISABLE_LINE) : null
    for (const rule of applied) {
      if (rule.id === 'SEC-304') continue
      if (policyIgnores(policy, rule.id, rel)) continue
      if (shouldSkipLine(rule, currentDisable) || shouldSkipLine(rule, prevDisable.get(entry.line))) continue
      if (rule.fileLevel === true) continue
      if (isCommentLine) continue
      if (!rule.patterns.some((pattern) => pattern.test(entry.text))) continue
      findings.push({
        id: makeId(rule.id, rel, entry.line, entry.text),
        ruleId: rule.id,
        title: rule.title,
        cwe: rule.cwe,
        severity: rule.severity,
        confidence: rule.confidence,
        file: rel,
        line: entry.line,
        snippet: entry.text.trim().slice(0, 200),
        message: rule.message,
      })
    }
    const entropyRule = RULES.find((rule) => rule.id === 'SEC-304')
    if (entropyRule !== undefined && !policyIgnores(policy, entropyRule.id, rel) && !isCommentLine && !shouldSkipLine(entropyRule, currentDisable) && !shouldSkipLine(entropyRule, prevDisable.get(entry.line))) {
      findings.push(...detectHighEntropy(entry.text, entry.line, rel, rel, entropyRule))
    }
  }
  return findings
}

/** 扫描单个文件内容，按语言与行应用规则。 */
export function scanText(content: string, file: string, rel: string, policy: SecurePolicy): Finding[] {
  const lines = content.split(/\r?\n/)
  const entries: LineEntry[] = lines.map((text, index) => ({ line: index + 1, text }))
  const findings = scanLineSet(entries, rel, policy)
  const language = languageForFile(rel)
  const applied = RULES.filter((rule) => rule.languages.includes(language) || rule.languages.includes('any'))
  for (const rule of applied) {
    if (rule.fileLevel !== true) continue
    if (policyIgnores(policy, rule.id, rel)) continue
    if (rule.patterns.some((pattern) => pattern.test(content))) {
      findings.push({
        id: makeId(rule.id, rel, 1, content.slice(0, 80)),
        ruleId: rule.id,
        title: rule.title,
        cwe: rule.cwe,
        severity: rule.severity,
        confidence: rule.confidence,
        file: rel,
        line: 1,
        snippet: content.slice(0, 200),
        message: rule.message,
      })
    }
  }
  return findings
}

/** 扫描目录或单个文件。 */
export async function scanPath(options: ScanOptions): Promise<ScanResult> {
  const started = Date.now()
  const { cwd, maxFiles, maxFileBytes, policy } = options
  const root = options.target !== undefined && options.target.trim() !== '' ? path.resolve(cwd, options.target.trim()) : cwd
  let filesScanned = 0
  let filesSkipped = 0
  const findings: Finding[] = []
  const relRoot = path.relative(cwd, root) || '.'

  const visit = async (absolute: string, rel: string): Promise<void> => {
    let stat
    try {
      stat = await fs.stat(absolute)
    } catch {
      filesSkipped += 1
      return
    }
    if (stat.isDirectory()) {
      if (DEFAULT_EXCLUDE_DIRS.includes(path.basename(absolute)) || policyExcludesDir(policy, rel)) return
      let entries
      try {
        entries = await fs.readdir(absolute, { withFileTypes: true })
      } catch {
        filesSkipped += 1
        return
      }
      for (const entry of entries) {
        if (filesScanned >= maxFiles) return
        await visit(path.join(absolute, entry.name), rel === '' ? entry.name : rel + '/' + entry.name)
      }
      return
    }
    if (!stat.isFile() || !shouldScanFile(absolute)) {
      filesSkipped += 1
      return
    }
    if (stat.size > maxFileBytes) {
      filesSkipped += 1
      return
    }
    let buffer: Uint8Array
    try {
      buffer = new Uint8Array(await fs.readFile(absolute))
    } catch {
      filesSkipped += 1
      return
    }
    if (fileHasBinary(buffer)) {
      filesSkipped += 1
      return
    }
    filesScanned += 1
    const text = new TextDecoder('utf-8', { fatal: false }).decode(buffer)
    findings.push(...scanText(text, absolute, rel, policy))
  }

  await visit(root, relRoot)
  findings.sort((a, b) => severityRank(b.severity) - severityRank(a.severity) || a.file.localeCompare(b.file) || a.line - b.line)
  return { root, filesScanned, filesSkipped, findings, durationMs: Date.now() - started }
}

function severityRank(severity: Severity): number {
  return severity === 'critical' ? 4 : severity === 'high' ? 3 : severity === 'medium' ? 2 : 1
}
