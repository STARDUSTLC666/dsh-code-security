/**
 * 扫描状态持久化：供 secure_fix_verify 对比基线，secure_report 汇总历史，
 * 以及 secure_baseline 持久化已接受的基线问题。
 *
 * @module dsh-code-security/state
 */
import type { Finding } from './scanner.js';
export interface ScanStateEntry {
    mode: string;
    target: string;
    time: string;
    filesScanned: number;
    findings: Finding[];
    fingerprints: string[];
    counts: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
}
export interface BaselineEntry {
    time: string;
    target: string;
    reason: string;
    findings: Finding[];
    fingerprints: string[];
    counts: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
}
export interface StateDocument {
    last: ScanStateEntry | null;
    history: ScanStateEntry[];
    baseline: BaselineEntry | null;
}
export declare function findingFingerprint(finding: Finding): string;
export declare function statePath(stateDir: string): string;
export declare function loadState(stateDir: string): Promise<StateDocument>;
export declare function saveState(stateDir: string, entry: ScanStateEntry): Promise<string>;
export declare function saveBaseline(stateDir: string, baseline: BaselineEntry): Promise<string>;
export declare function countFindings(findings: Finding[]): {
    critical: number;
    high: number;
    medium: number;
    low: number;
};
export declare function compareFingerprints(baseline: string[], current: string[]): {
    closed: string[];
    remaining: string[];
    fresh: string[];
};
/** 根据已接受基线把发现分为新增与已接受。 */
export declare function splitByBaseline(findings: Finding[], baseline: BaselineEntry | null): {
    fresh: Finding[];
    accepted: Finding[];
};
