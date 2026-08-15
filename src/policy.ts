/**
 * 项目策略文件 .secure-review.json：排除目录、忽略规则与门禁阈值。
 *
 * @module dsh-secure-review/policy
 */

import fs from 'node:fs/promises'
import path from 'node:path'

export interface PolicyIgnore {
  ruleId?: string
  file?: string
  reason?: string
}

export interface SecurePolicy {
  version: 1
  exclude: string[]
  ignore: PolicyIgnore[]
  failOn?: 'critical' | 'high' | 'medium' | 'low'
}

export const DEFAULT_POLICY: SecurePolicy = Object.freeze({
  version: 1,
  exclude: [],
  ignore: [],
})

export const POLICY_FILE = '.secure-review.json'

export function policyPath(cwd: string): string {
  return path.join(cwd, POLICY_FILE)
}

export async function loadPolicy(cwd: string): Promise<SecurePolicy> {
  try {
    const text = await fs.readFile(policyPath(cwd), 'utf8')
    const parsed: unknown = JSON.parse(text)
    const obj = (parsed ?? {}) as Record<string, unknown>
    return normalizePolicy(obj)
  } catch {
    return { ...DEFAULT_POLICY, exclude: [...DEFAULT_POLICY.exclude], ignore: [] }
  }
}

export function normalizePolicy(obj: Record<string, unknown>): SecurePolicy {
  const exclude = Array.isArray(obj.exclude) ? obj.exclude.filter((x): x is string => typeof x === 'string') : []
  const ignoreRaw = Array.isArray(obj.ignore) ? obj.ignore : []
  const ignore: PolicyIgnore[] = []
  for (const item of ignoreRaw) {
    if (typeof item !== 'object' || item === null) continue
    const rec = item as Record<string, unknown>
    ignore.push({
      ruleId: typeof rec.ruleId === 'string' && rec.ruleId !== '' ? rec.ruleId : undefined,
      file: typeof rec.file === 'string' && rec.file !== '' ? rec.file : undefined,
      reason: typeof rec.reason === 'string' ? rec.reason : '',
    })
  }
  const failOn = obj.failOn === 'critical' || obj.failOn === 'high' || obj.failOn === 'medium' || obj.failOn === 'low' ? obj.failOn : undefined
  return { version: 1, exclude, ignore, failOn }
}

export async function savePolicy(cwd: string, policy: SecurePolicy): Promise<string> {
  const file = policyPath(cwd)
  const tmp = file + '.tmp-' + process.pid
  await fs.writeFile(tmp, JSON.stringify(policy, null, 2) + '\n', 'utf8')
  await fs.rename(tmp, file)
  return file
}

function globToRegex(glob: string): RegExp {
  const escaped = glob.replace(/[.+^$()|{}]/g, '\\$&').replace(/\*\*/g, '§§').replace(/\*/g, '[^/]*').replace(/§§/g, '.*')
  return new RegExp('(^|/)' + escaped + '($|/)')
}

export function policyExcludesDir(policy: SecurePolicy, rel: string): boolean {
  return policy.exclude.some((pattern) => globToRegex(pattern).test(rel))
}

export function policyIgnores(policy: SecurePolicy, ruleId: string, file: string): boolean {
  return policy.ignore.some((item) => {
    if (item.ruleId !== undefined && item.ruleId !== ruleId) return false
    if (item.file !== undefined && !globToRegex(item.file).test(file)) return false
    return true
  })
}
