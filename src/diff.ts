/**
 * git diff 增量扫描：只解析 unified diff 的新增行并映射到新文件行号。
 *
 * @module dsh-secure-review/diff
 */

import path from 'node:path'
import { createHash } from 'node:crypto'
import type { Finding } from './scanner.js'
import type { SecurePolicy } from './policy.js'
import { scanLineSet } from './scanner.js'
import type { ProcessRunner } from './runner.js'

export interface DiffLine {
  line: number
  text: string
}

export interface DiffFile {
  file: string
  added: DiffLine[]
}

export interface DiffScanResult {
  base: string
  filesChanged: number
  addedLines: number
  findings: Finding[]
  diff: string
}

/** 运行 git diff（默认 HEAD，工作区未提交改动）。 */
export async function runGitDiff(runner: ProcessRunner, cwd: string, base: string, target?: string, timeoutMs = 30000): Promise<string> {
  const argv = ['git', 'diff', '--no-ext-diff', '--unified=0', base]
  if (target !== undefined && target.trim() !== '') argv.push('--', target.trim())
  const result = await runner.run(argv, { timeoutMs })
  if (result.exitCode !== 0 && result.exitCode !== 1) {
    throw new Error('git diff 失败（退出码 ' + String(result.exitCode) + '）：' + result.stderr.trim().split(/\r?\n/).slice(-4).join(' | '))
  }
  if (result.stdout.trim() === '') return ''
  return result.stdout
}

function isNewFileHeader(line: string): string | null {
  const m = /^\+\+\+ b\/(.*)$/.exec(line)
  if (m === null) return null
  const file = m[1]!.replace(/\t.*$/, '')
  if (file === '' || file === '/dev/null') return null
  return file
}

/** 解析 unified diff，返回每个文件的新增行与新行号。 */
export function parseDiff(diff: string, cwd: string): DiffFile[] {
  const files: DiffFile[] = []
  let current: DiffFile | null = null
  let newLine = 0
  for (const raw of diff.split(/\r?\n/)) {
    const file = isNewFileHeader(raw)
    if (file !== null) {
      current = { file: file.replace(/\\/g, '/'), added: [] }
      files.push(current)
      newLine = 0
      continue
    }
    const hunk = /^@@\s+-\d+(?:,\d+)?\s+\+(\d+)(?:,\d+)?\s+@@/.exec(raw)
    if (hunk !== null && current !== null) {
      newLine = Number(hunk[1])
      continue
    }
    if (current === null) continue
    if (raw.startsWith('+++') || raw.startsWith('---')) continue
    if (raw.startsWith('+')) {
      current.added.push({ line: newLine, text: raw.slice(1) })
      newLine += 1
    } else if (raw.startsWith('-')) {
      // removed line: new line number stays
    } else {
      newLine += 1
    }
  }
  return files
}

function makeDiffId(ruleId: string, file: string, line: number, snippet: string): string {
  const hash = createHash('sha256').update('diff|' + ruleId + '|' + file + '|' + line + '|' + snippet.slice(0, 80)).digest('hex').slice(0, 10)
  return 'SRD-' + hash
}

/** 对 diff 新增行执行规则扫描。 */
export function scanDiff(diff: string, cwd: string, policy: SecurePolicy): DiffScanResult {
  const parsed = parseDiff(diff, cwd)
  const findings: Finding[] = []
  let addedLines = 0
  for (const file of parsed) {
    addedLines += file.added.length
    const rel = path.isAbsolute(file.file) ? path.relative(cwd, file.file) : file.file
    findings.push(...scanLineSet(file.added, rel, policy).map((finding) => ({ ...finding, id: makeDiffId(finding.ruleId, rel, finding.line, finding.snippet) })))
  }
  findings.sort((a, b) => severityOrder(b.severity) - severityOrder(a.severity) || a.file.localeCompare(b.file) || a.line - b.line)
  return { base: 'HEAD', filesChanged: parsed.length, addedLines, findings, diff }
}

function severityOrder(severity: string): number {
  return severity === 'critical' ? 4 : severity === 'high' ? 3 : severity === 'medium' ? 2 : 1
}
