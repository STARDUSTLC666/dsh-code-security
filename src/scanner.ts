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
  signal?: AbortSignal
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

function detectHighEntropy(line: string, lineNumber: number, rel: string, rule: SecurityRule): Finding[] {
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

function scanFileRule(entries: LineEntry[], rel: string, rule: SecurityRule, disabledNext: ReadonlyMap<number, string[] | null | undefined>, selectedLines?: ReadonlySet<number>): Finding | undefined {
  let block: LineEntry[] = []
  const checkBlock = (): Finding | undefined => {
    if (block.length === 0) return undefined
    const text = block.map(entry => entry.text).join('\n')
    let best: { index: number; start: number; end: number } | undefined
    for (const pattern of rule.patterns) {
      const regex = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
      for (const match of text.matchAll(regex)) {
        const index = match.index!
        const start = text.slice(0, index).split('\n').length - 1
        const end = start + match[0].split('\n').length - 1
        if (selectedLines !== undefined && !block.slice(start, end + 1).some(entry => selectedLines.has(entry.line))) continue
        if (best === undefined || index < best.index) best = { index, start, end }
        break
      }
    }
    if (best === undefined) return undefined
    const line = block[best.start]!.line
    const snippet = block.slice(best.start, best.end + 1).map(entry => entry.text).join('\n')
    return {
      id: makeId(rule.id, rel, line, snippet), ruleId: rule.id, title: rule.title,
      cwe: rule.cwe, severity: rule.severity, confidence: rule.confidence,
      file: rel, line, snippet: snippet.trim().slice(0, 200), message: rule.message,
    }
  }
  for (const entry of entries) {
    const suppressed = isComment(entry.text) || shouldSkipLine(rule, disabledNext.get(entry.line))
    if (suppressed || block.length > 0 && entry.line !== block.at(-1)!.line + 1) {
      const finding = checkBlock()
      if (finding !== undefined) return finding
      block = []
    }
    if (!suppressed) block.push(entry)
  }
  return checkBlock()
}

/** 对带行号的文本行应用规则（全量扫描与 git diff 增量扫描共用）。 */
export function scanLineSet(entries: LineEntry[], rel: string, policy: SecurePolicy, selectedLines?: ReadonlySet<number>): Finding[] {
  const language = languageForFile(rel)
  const findings: Finding[] = []
  const applied = RULES.filter((rule) => (rule.languages.includes(language) || rule.languages.includes('any')) && !policyIgnores(policy, rule.id, rel))
  const entropyRule = applied.find((rule) => rule.id === 'SEC-304')
  const prevDisable = new Map<number, string[] | null | undefined>()
  for (const entry of entries) {
    if (isComment(entry.text)) prevDisable.set(entry.line + 1, disabledRules(entry.text, DISABLE_NEXT))
  }
  for (const entry of entries) {
    if (selectedLines !== undefined && !selectedLines.has(entry.line)) continue
    const isCommentLine = isComment(entry.text)
    const currentDisable = isCommentLine ? disabledRules(entry.text, DISABLE_LINE) : null
    for (const rule of applied) {
      if (rule.id === 'SEC-304') continue
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
    if (entropyRule !== undefined && !isCommentLine && !shouldSkipLine(entropyRule, currentDisable) && !shouldSkipLine(entropyRule, prevDisable.get(entry.line))) {
      findings.push(...detectHighEntropy(entry.text, entry.line, rel, entropyRule))
    }
  }
  for (const rule of applied) {
    if (rule.fileLevel !== true) continue
    const finding = scanFileRule(entries, rel, rule, prevDisable, selectedLines)
    if (finding !== undefined) findings.push(finding)
  }
  return findings
}

/** 扫描单个文件内容，按语言与行应用规则。 */
export function scanText(content: string, file: string, rel: string, policy: SecurePolicy): Finding[] {
  const lines = content.split(/\r?\n/)
  const entries: LineEntry[] = lines.map((text, index) => ({ line: index + 1, text }))
  // Match file rules over contiguous lines, sharing locations and suppressions
  // with incremental scans without joining unrelated diff hunks.
  return scanLineSet(entries, rel, policy)
}

/** Apply the same exclusions to full scans, directly selected files and diffs. */
export function isExcludedPath(rel: string, policy: SecurePolicy): boolean {
  return rel.split('/').some((part) => DEFAULT_EXCLUDE_DIRS.includes(part)) || policyExcludesDir(policy, rel)
}

/** 扫描目录或单个文件。 */
export async function scanPath(options: ScanOptions): Promise<ScanResult> {
  const started = Date.now()
  const { cwd, maxFiles, maxFileBytes, policy } = options
  const root = options.target !== undefined && options.target.trim() !== '' ? path.resolve(cwd, options.target.trim()) : cwd
  let filesScanned = 0
  let filesSkipped = 0
  const findings: Finding[] = []
  const relRoot = path.relative(cwd, root).split(path.sep).join('/')

  const visit = async (absolute: string, rel: string): Promise<void> => {
    options.signal?.throwIfAborted()
    if (isExcludedPath(rel, policy)) {
      filesSkipped += 1
      return
    }
    let stat
    try {
      stat = await fs.lstat(absolute)
    } catch {
      filesSkipped += 1
      return
    }
    options.signal?.throwIfAborted()
    if (stat.isSymbolicLink()) { filesSkipped += 1; return }
    if (stat.isDirectory()) {
      if (DEFAULT_EXCLUDE_DIRS.includes(path.basename(absolute))) return
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
    options.signal?.throwIfAborted()
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
