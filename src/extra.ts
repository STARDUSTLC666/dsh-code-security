/**
 * 扩展工具：secure_baseline（基线接受）与 secure_deps（SBOM-lite）。
 *
 * @module dsh-secure-review/extra
 */

import path from 'node:path'
import { optionalString, requiredString, type ResolvedSecureConfig } from './config.js'
import { scanDeps } from './deps.js'
import { loadState, saveBaseline } from './state.js'
import type { SecureToolDefinition } from './tools.js'

function compileParameters(spec: Record<string, any>): { type: 'object'; properties: Record<string, unknown>; required?: string[] } {
  const properties: Record<string, unknown> = {}
  const required: string[] = []
  for (const [key, prop] of Object.entries(spec)) {
    if (prop?.required === true) required.push(key)
    const node: Record<string, unknown> = {}
    if (typeof prop?.type === 'string') node.type = prop.type
    if (typeof prop?.description === 'string') node.description = prop.description
    properties[key] = node
  }
  return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) }
}

export function buildExtraTools(cfg: ResolvedSecureConfig, cwd: string): SecureToolDefinition[] {
  const stateDir = cfg.stateDir

  const secureBaseline: SecureToolDefinition = {
    name: 'secure_baseline',
    description: '把最近一次扫描的全部问题标记为已接受基线。之后 secure_scan / secure_diff / secure_report 只按基线外的新增问题判定门禁。写操作需要审批。',
    parameters: compileParameters({
      reason: { type: 'string', required: true, description: '接受这些已知问题的原因（会写入状态，例如：历史遗留，计划在 v1.2 修复）。' },
    }),
    output: {
      schema: { type: 'object', properties: { file: { type: 'string' }, acceptedCount: { type: 'integer' }, baseline: { type: 'object', additionalProperties: true } }, additionalProperties: true },
      render: (_args, value) => {
        const rec = (value ?? {}) as Record<string, unknown>
        return [{ type: 'text', text: '已接受基线：' + String(rec.acceptedCount ?? 0) + ' 个已知问题（' + String(rec.file ?? '') + '）。' }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = (rawArgs ?? {}) as Record<string, unknown>
      const reason = requiredString(args, 'reason', '接受原因')
      const state = await loadState(stateDir)
      if (state.last === null) throw new Error('尚无扫描结果，请先执行 secure_scan 或 secure_diff。')
      const baseline = {
        time: new Date().toISOString(),
        target: state.last.target,
        reason,
        findings: state.last.findings,
        fingerprints: state.last.fingerprints,
        counts: state.last.counts,
      }
      const file = await saveBaseline(stateDir, baseline)
      return { file, acceptedCount: baseline.findings.length, baseline }
    },
    timeoutMs: 10000,
  }

  const secureDeps: SecureToolDefinition = {
    name: 'secure_deps',
    description: 'SBOM-lite：解析项目依赖清单（package.json / requirements.txt / pyproject.toml / go.mod / Cargo.toml / composer.json / Gemfile），列出依赖名称、版本约束与风险标记（wildcard/git/local/unpinned）。不联网。',
    parameters: compileParameters({
      target: { type: 'string', description: '扫描根目录（可选，默认当前工作区）。' },
    }),
    output: {
      schema: {
        type: 'object',
        properties: {
          root: { type: 'string' }, filesScanned: { type: 'integer' }, riskyCount: { type: 'integer' },
          dependencies: { type: 'array', items: { type: 'object', additionalProperties: true } },
          warnings: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: true,
      },
      render: (_args, value) => {
        const rec = (value ?? {}) as Record<string, unknown>
        const deps = Array.isArray(rec.dependencies) ? rec.dependencies : []
        const lines = ['依赖清单扫描：' + deps.length + ' 个依赖，风险项 ' + String(rec.riskyCount ?? 0) + ' 个。']
        for (const dep of deps) {
          const row = (dep ?? {}) as Record<string, unknown>
          if (row.risk !== 'exact' && row.risk !== 'range') lines.push('- ' + String(row.name ?? '') + ' [' + String(row.risk ?? '') + '] ' + String(row.file ?? ''))
        }
        return [{ type: 'text', text: lines.join('\n') }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = (rawArgs ?? {}) as Record<string, unknown>
      const target = optionalString(args, 'target')
      const root = path.resolve(cwd, target ?? '.')
      return scanDeps(root)
    },
    timeoutMs: 30000,
  }

  secureBaseline.gate = async (exec: unknown, next: () => Promise<unknown>) => {
    const record = (typeof exec === 'object' && exec !== null ? exec : {}) as Record<string, unknown>
    const approval = record.approval as { request(options: { reason: string }): Promise<string> } | undefined
    if (approval === undefined) return { kind: 'deny', reason: 'secure_baseline 需要确认，但当前环境没有审批通道。' }
    const outcome = await approval.request({ reason: '把当前全部安全问题接受为基线' })
    if (outcome === 'allowed-once') return next()
    if (outcome === 'cancelled') return { kind: 'deny', reason: '基线接受被取消，未执行。' }
    return { kind: 'deny', reason: '基线接受未获批准。' }
  }

  return [secureBaseline, secureDeps]
}
