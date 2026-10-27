import { registerUpdates } from '@stardustlc/dsh-updates'
/**
 * dsh-code-security —— AI 代码安全审查插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册 secure_scan / secure_diff / secure_fix_verify /
 * secure_report / secure_export / secure_baseline / secure_deps / secure_policy_show /
 * secure_policy_set / secure_health 十个工具。内置规则与可选本地引擎共用
 * 脱敏、覆盖状态与基线；子进程通过官方服务执行，设置面板与自动检查按需挂载。
 *
 * @module dsh-code-security
 */

import { resolveConfig, type SecureConfig } from './config.js'
import { createSubprocessRunner, type SubprocessSpawnLike } from './runner.js'
import { buildSecureTools, type SecureToolDefinition } from './tools.js'
import { SecurityWorkbench, installSecurityWorkbench } from './workbench.js'
import { AutomaticSecurity } from './automatic.js'

export const name = 'code-security'
export const inject = ['tools', 'subprocess']

export interface SecurePluginContext {
  subprocess: { spawn: SubprocessSpawnLike }
  tools: { register(definition: SecureToolDefinition): () => void }
  on?(event: string, listener: (...args: any[]) => unknown, options?: { prepend?: boolean }): (() => void) | void
  inject?(services: string[], callback: (ctx: any) => void): unknown
}

export function apply(ctx: SecurePluginContext, config?: SecureConfig | null): void {
  registerUpdates(ctx, { name: "dsh-code-security" })

  let cfg
  let configurationError: string | undefined
  try {
    cfg = resolveConfig(config)
  } catch (error) {
    configurationError = error instanceof Error ? error.message : String(error)
    console.warn('[dsh-code-security] ' + configurationError)
    cfg = resolveConfig(null)
  }
  const runner = createSubprocessRunner((spec) => ctx.subprocess.spawn(spec), 10000, 60000)
  const configuredTools = (config: typeof cfg, root: string) => buildSecureTools(config, root, runner).map(definition => ({ ...definition, async execute(args: unknown, exec: unknown) {
    if (configurationError && ['secure_scan','secure_diff','secure_fix_verify','secure_deps','secure_baseline'].includes(definition.name)) throw new Error('请先修复插件配置，检查未运行 / Fix the plugin configuration before scanning: ' + configurationError)
    const value = await definition.execute(args, exec)
    return configurationError && definition.name === 'secure_health' ? { ...(value as object), ok: false, configurationError } : value
  } }))
  const tools = configuredTools(cfg, process.cwd())
  const disposers: Array<() => void> = []
  const workbench = typeof ctx.inject === 'function' ? new SecurityWorkbench(cfg, { tools: configuredTools }) : undefined
  if (workbench) {
    installSecurityWorkbench(ctx, workbench)
    const automatic = new AutomaticSecurity(workbench)
    ctx.inject?.(['sessions', 'systemPrompt'], host => {
      const detach = automatic.attach(host)
      if (typeof host.effect === 'function') host.effect(() => detach)
      else host.on?.('dispose', detach)
    })
    ctx.on?.('dispose', async () => { automatic.dispose(); await automatic.whenIdle(); await workbench.dispose() })
  }
  for (const definition of tools) {
    disposers.push(ctx.tools.register({ ...definition, async execute(args, exec) {
      if (!workbench) return definition.execute(args, exec)
      const context = exec as { agent?: { session?: { id?: string; header?: { cwd?: string } } } } | undefined
      const root = context?.agent?.session?.header?.cwd || process.cwd()
      const configured = configuredTools(await workbench.configFor(root), root).find(t => t.name === definition.name)!
      const value = await configured.execute(args, exec)
      try { await workbench.remember(root, context?.agent?.session?.id) } catch { /* Indexing must not turn a successful check into an error. */ }
      return value
    } }))
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
export * from './engines.js'
export * from './audit.js'
export * from './privacy.js'
export * from './workbench.js'
export * from './automatic.js'
