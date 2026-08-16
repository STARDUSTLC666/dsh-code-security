/**
 * 扫描状态持久化：供 secure_fix_verify 对比基线，secure_report 汇总历史，
 * 以及 secure_baseline 持久化已接受的基线问题。
 *
 * @module dsh-secure-review/state
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
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
    const text = await fs.readFile(statePath(stateDir), 'utf8')
    const parsed: unknown = JSON.parse(text)
    const obj = (parsed ?? {}) as Record<string, unknown>
    const last = isEntry(obj.last) ? obj.last : null
    const history = Array.isArray(obj.history) ? obj.history.filter(isEntry) : []
    const baseline = isBaseline(obj.baseline) ? obj.baseline : null
    return { last, history, baseline }
  } catch {
    return { last: null, history: [], baseline: null }
  }
}

function isEntry(value: unknown): value is ScanStateEntry {
  return typeof value === 'object' && value !== null && Array.isArray((value as ScanStateEntry).findings)
}

function isBaseline(value: unknown): value is BaselineEntry {
  return typeof value === 'object' && value !== null && Array.isArray((value as BaselineEntry).findings) && Array.isArray((value as BaselineEntry).fingerprints)
}

export async function saveState(stateDir: string, entry: ScanStateEntry): Promise<string> {
  await fs.mkdir(stateDir, { recursive: true })
  const state = await loadState(stateDir)
  state.last = entry
  state.history.unshift(entry)
  state.history = state.history.slice(0, HISTORY_LIMIT)
  return writeState(stateDir, state)
}

export async function saveBaseline(stateDir: string, baseline: BaselineEntry): Promise<string> {
  await fs.mkdir(stateDir, { recursive: true })
  const state = await loadState(stateDir)
  state.baseline = baseline
  return writeState(stateDir, state)
}

async function writeState(stateDir: string, state: StateDocument): Promise<string> {
  const file = statePath(stateDir)
  const tmp = file + '.tmp-' + process.pid
  await fs.writeFile(tmp, JSON.stringify(state, null, 2), 'utf8')
  await fs.rename(tmp, file)
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
