import { type SecurePolicy } from './policy.js';
export interface DependencyEntry {
    name: string;
    spec: string;
    manager: 'npm' | 'pypi' | 'go' | 'cargo' | 'composer' | 'ruby';
    file: string;
    kind: 'runtime' | 'dev' | 'peer' | 'optional' | 'unknown';
    risk: 'exact' | 'range' | 'unpinned' | 'git' | 'local' | 'wildcard';
    note: string;
}
export interface DepsScanResult {
    root: string;
    filesScanned: number;
    filesSkipped: number;
    dependencies: DependencyEntry[];
    riskyCount: number;
    warnings: string[];
    complete: boolean;
    lockfiles: string[];
}
export declare function scanDeps(root: string, options?: {
    maxFiles?: number;
    maxFileBytes?: number;
    signal?: AbortSignal;
    policy?: SecurePolicy;
    onDocument?: (document: {
        file: string;
        text: string;
    }) => void;
}): Promise<DepsScanResult>;
