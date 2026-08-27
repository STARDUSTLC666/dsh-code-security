/**
 * 项目策略文件 .code-security.json：排除目录、忽略规则与门禁阈值。
 *
 * @module dsh-code-security/policy
 */
export interface PolicyIgnore {
    ruleId?: string;
    file?: string;
    reason?: string;
}
export interface SecurePolicy {
    version: 1;
    exclude: string[];
    ignore: PolicyIgnore[];
    failOn?: 'critical' | 'high' | 'medium' | 'low';
}
export declare const DEFAULT_POLICY: SecurePolicy;
export declare const POLICY_FILE = ".code-security.json";
export declare function policyPath(cwd: string): string;
export declare function loadPolicy(cwd: string): Promise<SecurePolicy>;
export declare function normalizePolicy(obj: Record<string, unknown>): SecurePolicy;
export declare function savePolicy(cwd: string, policy: SecurePolicy): Promise<string>;
export declare function policyExcludesDir(policy: SecurePolicy, rel: string): boolean;
export declare function policyIgnores(policy: SecurePolicy, ruleId: string, file: string): boolean;
