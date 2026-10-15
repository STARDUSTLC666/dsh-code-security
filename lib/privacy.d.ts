import type { Finding } from './scanner.js';
export declare function evidenceFingerprint(finding: Pick<Finding, 'ruleId' | 'file' | 'snippet'> & {
    fingerprint?: string;
}): string;
export declare function redactText(text: string): string;
export declare function protectFinding(finding: Finding): Finding;
