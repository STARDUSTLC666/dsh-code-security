/**
 * git diff 增量扫描：只解析 unified diff 的新增行并映射到新文件行号。
 *
 * @module dsh-code-security/diff
 */
import type { Finding } from './scanner.js';
import type { SecurePolicy } from './policy.js';
import type { ProcessRunner } from './runner.js';
export interface DiffLine {
    line: number;
    text: string;
}
export interface DiffFile {
    file: string;
    added: DiffLine[];
}
export interface DiffScanResult {
    base: string;
    filesChanged: number;
    addedLines: number;
    findings: Finding[];
    diff: string;
}
/** 运行 git diff（默认 HEAD，工作区未提交改动）。 */
export declare function runGitDiff(runner: ProcessRunner, cwd: string, base: string, target?: string, timeoutMs?: number, staged?: boolean): Promise<string>;
/** 解析 unified diff，返回每个文件的新增行与新行号。 */
export declare function parseDiff(diff: string, cwd: string): DiffFile[];
/** 对 diff 新增行执行规则扫描。 */
export declare function scanDiff(diff: string, cwd: string, policy: SecurePolicy): DiffScanResult;
