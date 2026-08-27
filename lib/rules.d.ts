/**
 * 确定性安全规则库。每条规则只报告事实模式，不包含修复建议。
 *
 * @module dsh-code-security/rules
 */
import type { Severity } from './config.js';
export type Language = 'javascript' | 'python' | 'go' | 'java' | 'ruby' | 'php' | 'shell' | 'yaml' | 'dockerfile' | 'json' | 'env' | 'any';
export interface SecurityRule {
    id: string;
    title: string;
    cwe: string;
    severity: Severity;
    confidence: 'high' | 'medium' | 'low';
    languages: Language[];
    patterns: RegExp[];
    message: string;
    fileLevel?: boolean;
}
export declare const RULES: readonly SecurityRule[];
/** 规则类别：供报告聚合与排序使用。 */
export declare function ruleCategory(ruleId: string): string;
export declare function languageForFile(file: string): Language;
