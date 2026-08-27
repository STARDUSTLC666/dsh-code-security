/**
 * dsh-code-security —— AI 代码安全审查插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：注册 secure_scan / secure_diff / secure_fix_verify /
 * secure_report / secure_export / secure_policy_show / secure_policy_set 七个工具。扫描为纯确定性规则，
 * git diff 通过官方 subprocess 服务执行，零运行时依赖。
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
        register(definition: SecureToolDefinition, options?: {
            prepend?: boolean;
        }): () => void;
    };
    get?(name: 'approval'): unknown;
    on?(event: string, listener: () => void): () => void;
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
