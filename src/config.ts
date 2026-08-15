/**
 * dsh-secure-review 配置解析：扫描边界、门禁阈值与状态目录。
 *
 * @module dsh-secure-review/config
 */

import path from 'node:path'

export type Severity = 'critical' | 'high' | 'medium' | 'low'

export interface SecureConfig {
  maxFiles?: number
  maxFileBytes?: number
  failOn?: Severity
  stateDir?: string
}

export interface ResolvedSecureConfig {
  maxFiles: number
  maxFileBytes: number
  failOn: Severity
  stateDir: string
}

export const DEFAULT_EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', 'out', 'coverage', '.next', '.cache', '.turbo', '.secure-review']

export function resolveConfig(config: SecureConfig | undefined | null, cwd = process.cwd()): ResolvedSecureConfig {
  const cfg = config ?? {}
  let maxFiles = 5000
  if (cfg.maxFiles !== undefined) {
    if (typeof cfg.maxFiles !== 'number' || !Number.isFinite(cfg.maxFiles) || cfg.maxFiles <= 0) throw new Error('maxFiles 必须是大于 0 的数字。')
    maxFiles = Math.min(100000, Math.max(10, Math.round(cfg.maxFiles)))
  }
  let maxFileBytes = 2 * 1024 * 1024
  if (cfg.maxFileBytes !== undefined) {
    if (typeof cfg.maxFileBytes !== 'number' || !Number.isFinite(cfg.maxFileBytes) || cfg.maxFileBytes <= 0) throw new Error('maxFileBytes 必须是大于 0 的数字（字节）。')
    maxFileBytes = Math.min(20 * 1024 * 1024, Math.max(64 * 1024, Math.round(cfg.maxFileBytes)))
  }
  const failOn: Severity = cfg.failOn === 'critical' || cfg.failOn === 'high' || cfg.failOn === 'medium' || cfg.failOn === 'low' ? cfg.failOn : 'medium'
  const stateDir = typeof cfg.stateDir === 'string' && cfg.stateDir.trim() !== '' ? path.resolve(cwd, cfg.stateDir.trim()) : path.join(cwd, '.secure-review')
  return { maxFiles, maxFileBytes, failOn, stateDir }
}

export function optionalString(args: Record<string, unknown>, key: string): string | undefined {
  const value = args[key]
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
}

export function requiredString(args: Record<string, unknown>, key: string, label: string): string {
  const value = optionalString(args, key)
  if (value === undefined) throw new Error(label + '（参数 ' + key + '）为必填，请提供非空字符串。')
  return value
}

export function optionalInteger(args: Record<string, unknown>, key: string, label: string, lo: number, hi: number, fallback: number): number {
  const value = args[key]
  if (value === undefined || value === null) return fallback
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error(label + '（参数 ' + key + '）必须是数字。')
  const rounded = Math.round(value)
  if (rounded < lo || rounded > hi) throw new Error(label + '（参数 ' + key + '）必须在 ' + lo + '-' + hi + ' 之间。')
  return rounded
}
