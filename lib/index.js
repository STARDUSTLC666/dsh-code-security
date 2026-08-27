/**
 * dsh-code-security —— AI 代码安全审查插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册 secure_scan / secure_diff / secure_fix_verify /
 * secure_report / secure_export / secure_policy_show / secure_policy_set 七个工具。扫描为纯确定性规则，
 * git diff 通过官方 subprocess 服务执行，零运行时依赖。
 *
 * @module dsh-code-security
 */
import { resolveConfig } from './config.js';
import { createSubprocessRunner } from './runner.js';
import { buildSecureTools } from './tools.js';
export const name = 'code-security';
export const inject = ['tools', 'subprocess'];
export function apply(ctx, config) {
    let cfg;
    try {
        cfg = resolveConfig(config);
    }
    catch (error) {
        console.warn('[dsh-code-security] ' + (error instanceof Error ? error.message : String(error)));
        cfg = resolveConfig(null);
    }
    const runner = createSubprocessRunner(ctx.subprocess.spawn, 10000, 60000);
    const tools = buildSecureTools(cfg, process.cwd(), runner);
    const disposers = [];
    for (const definition of tools) {
        const wrapped = { ...definition };
        if (wrapped.gate !== undefined) {
            const original = wrapped.gate.bind(wrapped);
            wrapped.gate = async (exec, next) => {
                const record = (typeof exec === 'object' && exec !== null ? exec : {});
                return original({ ...record, approval: ctx.get?.('approval') }, next);
            };
        }
        disposers.push(ctx.tools.register(wrapped, { prepend: true }));
    }
    if (typeof ctx.on === 'function') {
        ctx.on('dispose', () => { for (const dispose of disposers)
            dispose(); });
    }
}
export * from './config.js';
export * from './deps.js';
export * from './diff.js';
export * from './policy.js';
export * from './rules.js';
export * from './runner.js';
export * from './scanner.js';
export * from './state.js';
export * from './extra.js';
export * from './tools.js';
