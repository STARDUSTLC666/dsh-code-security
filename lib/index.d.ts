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
import { type SecureConfig } from './config.js';
import { type SubprocessSpawnLike } from './runner.js';
import { type SecureToolDefinition } from './tools.js';
export declare const name = "code-security";
export declare const inject: string[];
export interface SecurePluginContext {
    subprocess: {
        spawn: SubprocessSpawnLike;
    };
    tools: {
        register(definition: SecureToolDefinition): () => void;
    };
    on?(event: string, listener: (...args: any[]) => unknown, options?: {
        prepend?: boolean;
    }): (() => void) | void;
    inject?(services: string[], callback: (ctx: any) => void): unknown;
}
export declare function apply(ctx: SecurePluginContext, config?: SecureConfig | null): void;
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
export * from './engines.js';
export * from './audit.js';
export * from './privacy.js';
export * from './workbench.js';
export * from './automatic.js';
