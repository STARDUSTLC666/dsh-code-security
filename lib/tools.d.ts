/**
 * 九个面向模型的安全审查工具：
 * secure_scan / secure_diff / secure_fix_verify / secure_report / secure_export /
 * secure_baseline / secure_deps / secure_policy_show / secure_policy_set。
 *
 * @module dsh-code-security/tools
 */
import { type ResolvedSecureConfig } from './config.js';
import type { ProcessRunner } from './runner.js';
export interface ContentBlock {
    type: 'text';
    text: string;
}
export interface SecureToolDefinition {
    name: string;
    description: string;
    parameters: {
        type: 'object';
        properties: Record<string, unknown>;
        required?: string[];
    };
    output: {
        schema: Record<string, unknown>;
        render(args: unknown, value: unknown): ContentBlock[];
    };
    execute(args: unknown, exec: unknown): Promise<unknown>;
    timeoutMs?: number;
}
export declare function buildSecureTools(cfg: ResolvedSecureConfig, cwd: string, runner: ProcessRunner): SecureToolDefinition[];
