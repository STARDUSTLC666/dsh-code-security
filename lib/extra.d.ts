/**
 * 扩展工具：secure_baseline（基线接受）与 secure_deps（SBOM-lite）。
 *
 * @module dsh-code-security/extra
 */
import { type ResolvedSecureConfig } from './config.js';
import type { SecureToolDefinition } from './tools.js';
import type { ProcessRunner } from './runner.js';
export declare function buildExtraTools(cfg: ResolvedSecureConfig, cwd: string, signal?: AbortSignal, runner?: ProcessRunner): SecureToolDefinition[];
