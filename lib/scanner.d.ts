/**
 * 确定性安全扫描器：遍历文件、按语言应用规则、密钥熵检测、内联豁免。
 *
 * @module dsh-code-security/scanner
 */
import { type Severity } from './config.js';
import { type SecurePolicy } from './policy.js';
export interface Finding {
    id: string;
    ruleId: string;
    title: string;
    cwe: string;
    severity: Severity;
    confidence: 'high' | 'medium' | 'low';
    file: string;
    line: number;
    snippet: string;
    message: string;
}
export interface ScanResult {
    root: string;
    filesScanned: number;
    filesSkipped: number;
    findings: Finding[];
    durationMs: number;
}
export interface ScanOptions {
    cwd: string;
    target?: string;
    maxFiles: number;
    maxFileBytes: number;
    policy: SecurePolicy;
}
export interface LineEntry {
    line: number;
    text: string;
}
/** 对带行号的文本行应用规则（全量扫描与 git diff 增量扫描共用）。 */
export declare function scanLineSet(entries: LineEntry[], rel: string, policy: SecurePolicy): Finding[];
/** 扫描单个文件内容，按语言与行应用规则。 */
export declare function scanText(content: string, file: string, rel: string, policy: SecurePolicy): Finding[];
/** 扫描目录或单个文件。 */
export declare function scanPath(options: ScanOptions): Promise<ScanResult>;
