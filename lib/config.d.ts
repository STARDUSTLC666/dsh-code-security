/**
 * dsh-code-security 配置解析：扫描边界、门禁阈值与状态目录。
 *
 * @module dsh-code-security/config
 */
export type Severity = 'critical' | 'high' | 'medium' | 'low';
export interface SecureConfig {
    maxFiles?: number;
    maxFileBytes?: number;
    failOn?: Severity;
    stateDir?: string;
}
export interface ResolvedSecureConfig {
    maxFiles: number;
    maxFileBytes: number;
    failOn: Severity;
    stateDir: string;
}
export declare const DEFAULT_EXCLUDE_DIRS: string[];
export declare function resolveConfig(config: SecureConfig | undefined | null, cwd?: string): ResolvedSecureConfig;
export declare function optionalString(args: Record<string, unknown>, key: string): string | undefined;
export declare function requiredString(args: Record<string, unknown>, key: string, label: string): string;
export declare function optionalInteger(args: Record<string, unknown>, key: string, label: string, lo: number, hi: number, fallback: number): number;
