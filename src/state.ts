/**
 * 扫描状态持久化：供 secure_fix_verify 对比基线，secure_report 汇总历史，
 * 以及 secure_baseline 持久化已接受的基线问题。
 *
 * @module dsh-code-security/state
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash, randomUUID } from 'node:crypto'
import lockfile from 'proper-lockfile'
import type { Finding } from './scanner.js'

export interface ScanStateEntry {
  mode: string
  target: string
  time: string
  filesScanned: number
  findings: Finding[]
  fingerprints: string[]
  counts: { critical: number; high: number; medium: number; low: number }
}

export interface BaselineEntry {
  time: string
  target: string
  reason: string
  findings: Finding[]
  fingerprints: string[]
  counts: { critical: number; high: number; medium: number; low: number }
}

export interface StateDocument {
  last: ScanStateEntry | null
  history: ScanStateEntry[]
  baseline: BaselineEntry | null
}

const STATE_FILE = 'state.json'
const HISTORY_LIMIT = 50

export function findingFingerprint(finding: Finding): string {
  const raw = finding.ruleId + '|' + finding.file + '|' + finding.snippet.trim()
  return createHash('sha256').update(raw).digest('hex')
}

export function statePath(stateDir: string): string {
  return path.join(stateDir, STATE_FILE)
}

export async function loadState(stateDir: string): Promise<StateDocument> {
  try {
    const info = await fs.lstat(statePath(stateDir))
    if (!info.isFile() || info.isSymbolicLink() || info.size > 16 * 1024 * 1024) throw new Error('记录不是普通文件或超过 16 MiB')
    const text = await fs.readFile(statePath(stateDir), 'utf8')
    const parsed: unknown = JSON.parse(text)
    const obj = (parsed ?? {}) as Record<string, unknown>
    if (!Array.isArray(obj.history) || obj.history.some(entry => !isEntry(entry)) || obj.last !== null && !isEntry(obj.last) || obj.baseline !== undefined && obj.baseline !== null && !isBaseline(obj.baseline)) throw new Error('记录结构无效')
    const last = isEntry(obj.last) ? obj.last : null
    const history = Array.isArray(obj.history) ? obj.history.filter(isEntry) : []
    const baseline = isBaseline(obj.baseline) ? obj.baseline : null
    return { last, history, baseline }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw new Error('安全扫描记录无法读取，原文件已保留：' + (error instanceof Error ? error.message : String(error)))
    return { last: null, history: [], baseline: null }
  }
}

function isEntry(value: unknown): value is ScanStateEntry {
  if (typeof value !== 'object' || value === null) return false
  const row = value as ScanStateEntry
  return typeof row.mode === 'string' && typeof row.target === 'string' && typeof row.time === 'string'
    && Number.isInteger(row.filesScanned) && row.filesScanned >= 0 && validFindings(row.findings)
    && validFingerprints(row.fingerprints) && validCounts(row.counts)
}

function isBaseline(value: unknown): value is BaselineEntry {
  if (typeof value !== 'object' || value === null) return false
  const row = value as BaselineEntry
  return typeof row.time === 'string' && typeof row.target === 'string' && typeof row.reason === 'string'
    && validFindings(row.findings) && validFingerprints(row.fingerprints) && validCounts(row.counts)
}

function validFingerprints(value: unknown): value is string[] { return Array.isArray(value) && value.every(item => typeof item === 'string') }
function validCounts(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false
  const counts = value as Record<string, unknown>
  return ['critical', 'high', 'medium', 'low'].every(key => typeof counts[key] === 'number' && Number.isInteger(counts[key]) && (counts[key] as number) >= 0)
}
function validFindings(value: unknown): value is Finding[] {
  return Array.isArray(value) && value.every(item => typeof item === 'object' && item !== null
    && typeof item.ruleId === 'string' && typeof item.file === 'string' && typeof item.snippet === 'string'
    && Number.isInteger(item.line) && item.line >= 1 && ['critical','high','medium','low'].includes(item.severity))
}

export async function saveState(stateDir: string, entry: ScanStateEntry, signal?: AbortSignal): Promise<string> {
  signal?.throwIfAborted()
  await fs.mkdir(stateDir, { recursive: true })
  const unlock = await lockfile.lock(stateDir, { retries: { retries: 30, minTimeout: 25, maxTimeout: 100 } })
  try {
    signal?.throwIfAborted()
    const state = await loadState(stateDir)
    state.last = entry
    state.history.unshift(entry)
    state.history = state.history.slice(0, HISTORY_LIMIT)
    return await writeState(stateDir, state, signal)
  } finally { await unlock() }
}

export async function saveBaseline(stateDir: string, baseline: BaselineEntry, signal?: AbortSignal): Promise<string> {
  signal?.throwIfAborted()
  await fs.mkdir(stateDir, { recursive: true })
  const unlock = await lockfile.lock(stateDir, { retries: { retries: 30, minTimeout: 25, maxTimeout: 100 } })
  try {
    signal?.throwIfAborted()
    const state = await loadState(stateDir)
    state.baseline = baseline
    return await writeState(stateDir, state, signal)
  } finally { await unlock() }
}

async function writeState(stateDir: string, state: StateDocument, signal?: AbortSignal): Promise<string> {
  signal?.throwIfAborted()
  const file = statePath(stateDir)
  const tmp = file + '.tmp-' + randomUUID(), bytes = JSON.stringify(state, null, 2)
  if (Buffer.byteLength(bytes) > 16 * 1024 * 1024) throw new Error('安全扫描记录超过 16 MiB，本次没有保存。')
  try { await fs.writeFile(tmp, bytes, { flag: 'wx', mode: 0o600, signal }); signal?.throwIfAborted(); await fs.rename(tmp, file) }
  finally { await fs.unlink(tmp).catch(() => {}) }
  return file
}

export function countFindings(findings: Finding[]): { critical: number; high: number; medium: number; low: number } {
  const counts = { critical: 0, high: 0, medium: 0, low: 0 }
  for (const finding of findings) counts[finding.severity] += 1
  return counts
}

export function compareFingerprints(baseline: string[], current: string[]): { closed: string[]; remaining: string[]; fresh: string[] } {
  const oldSet = new Set(baseline)
  const newSet = new Set(current)
  return {
    closed: baseline.filter((x) => !newSet.has(x)),
    remaining: baseline.filter((x) => newSet.has(x)),
    fresh: current.filter((x) => !oldSet.has(x)),
  }
}

/** 根据已接受基线把发现分为新增与已接受。 */
export function splitByBaseline(findings: Finding[], baseline: BaselineEntry | null): { fresh: Finding[]; accepted: Finding[] } {
  if (baseline === null) return { fresh: findings, accepted: [] }
  const acceptedSet = new Set(baseline.fingerprints)
  const fresh: Finding[] = []
  const accepted: Finding[] = []
  for (const finding of findings) {
    if (acceptedSet.has(findingFingerprint(finding))) accepted.push(finding)
    else fresh.push(finding)
  }
  return { fresh, accepted }
}
