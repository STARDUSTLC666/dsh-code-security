/**
 * dsh-code-security —— AI 代码安全审查插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册 secure_scan / secure_diff / secure_fix_verify /
 * secure_report / secure_export / secure_policy_show / secure_policy_set 七个工具。扫描为纯确定性规则，
 * git diff 通过官方 subprocess 服务执行，零运行时依赖。
 *
 * @module dsh-code-security
 */

import { resolveConfig, type SecureConfig } from './config.js'
import { createSubprocessRunner, type SubprocessSpawnLike } from './runner.js'
import { buildSecureTools, type SecureToolDefinition } from './tools.js'

export const name = 'code-security'
export const inject = ['tools', 'subprocess']

export interface SecurePluginContext {
  subprocess: { spawn: SubprocessSpawnLike }
  tools: { register(definition: SecureToolDefinition): () => void }
  on?(event: string, listener: (...args: any[]) => unknown, options?: { prepend?: boolean }): (() => void) | void
}

export function apply(ctx: SecurePluginContext, config?: SecureConfig | null): void {
  let cfg
  try {
    cfg = resolveConfig(config)
  } catch (error) {
    console.warn('[dsh-code-security] ' + (error instanceof Error ? error.message : String(error)))
    cfg = resolveConfig(null)
  }
  const runner = createSubprocessRunner(ctx.subprocess.spawn, 10000, 60000)
  const tools = buildSecureTools(cfg, process.cwd(), runner)
  const disposers: Array<() => void> = []
  for (const definition of tools) {
    disposers.push(ctx.tools.register(definition))
  }
  if (typeof ctx.on === 'function') {
    ctx.on('tools/pre-execute', async (exec: { name?: unknown; arguments?: unknown }, next: () => Promise<unknown>) => {
      const args = (typeof exec.arguments === 'object' && exec.arguments !== null ? exec.arguments : {}) as Record<string, unknown>
      let reason: string | undefined
      if (exec.name === 'secure_policy_set') reason = '覆盖写入项目 .code-security.json 安全策略'
      if (exec.name === 'secure_baseline') reason = '把当前全部安全问题接受为基线'
      if (exec.name === 'secure_export' && typeof args.path === 'string' && args.path !== '') reason = '导出安全报告到 ' + args.path
      if (reason === undefined) return next()
      return { kind: 'ask', reason }
    }, { prepend: true })
    ctx.on('dispose', () => { for (const dispose of disposers) dispose() })
  }
}

export * from './config.js'
export * from './deps.js'
export * from './diff.js'
export * from './policy.js'
export * from './rules.js'
export * from './runner.js'
export * from './scanner.js'
export * from './state.js'
export * from './extra.js'
export * from './tools.js'
