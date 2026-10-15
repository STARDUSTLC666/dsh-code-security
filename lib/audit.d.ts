import type { ResolvedSecureConfig, SourceEngine } from './config.js';
import type { ProcessRunner } from './runner.js';
import type { SecurePolicy } from './policy.js';
import { type EngineCoverage } from './engines.js';
export type ScanScope = {
    kind: 'scan';
    target?: string;
} | {
    kind: 'diff';
    target?: string;
    base: string;
    staged: boolean;
    includeUntracked?: boolean;
};
export declare function sourceEngines(value: unknown, defaults: SourceEngine[]): SourceEngine[];
export declare function runSourceCheck(scope: ScanScope, cfg: ResolvedSecureConfig, cwd: string, runner: ProcessRunner, engines: SourceEngine[], policy: SecurePolicy, signal?: AbortSignal): Promise<{
    findings: import("./scanner.js").Finding[];
    engines: SourceEngine[];
    coverage: EngineCoverage[];
    complete: boolean;
    scope: ScanScope;
    warnings: string[];
    root: string;
    filesScanned: number;
    filesSkipped: number;
    durationMs: number;
}>;
