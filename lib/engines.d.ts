import type { ResolvedSecureConfig, SourceEngine } from './config.js';
import type { ProcessRunner } from './runner.js';
import type { Finding } from './scanner.js';
export type EngineId = SourceEngine | 'osv';
export interface EngineCoverage {
    engine: EngineId;
    status: 'completed' | 'partial' | 'not-installed' | 'failed' | 'timed-out' | 'not-run';
    version?: string;
    reason?: string;
    findingsCount?: number;
    durationMs?: number;
}
export interface ScanDocument {
    file: string;
    text: string;
    selectedLines?: ReadonlySet<number>;
}
/** File modification dates describe the cache, not the age of every advisory inside it. */
export declare function databaseHealth(cfg: ResolvedSecureConfig): Promise<{
    directory: string;
    available: boolean;
    databases: {
        ecosystem: string;
        fileModifiedAt: string;
    }[];
}>;
export declare function probeEngine(engine: Exclude<EngineId, 'builtin'>, cfg: ResolvedSecureConfig, runner: ProcessRunner, signal?: AbortSignal): Promise<EngineCoverage>;
export declare function scanExternal(engine: 'betterleaks' | 'semgrep', documents: ScanDocument[], cfg: ResolvedSecureConfig, runner: ProcessRunner, signal?: AbortSignal): Promise<{
    findings: Finding[];
    coverage: EngineCoverage;
}>;
export declare function mergeFindings(findings: Finding[]): Finding[];
export declare function auditDependencies(documents: ScanDocument[], mode: 'offline' | 'online', cfg: ResolvedSecureConfig, runner: ProcessRunner, signal?: AbortSignal): Promise<{
    mode: "offline" | "online";
    coverage: EngineCoverage;
    packagesScanned: number;
    vulnerabilities: never[];
} | {
    mode: "offline" | "online";
    coverage: {
        findingsCount: number;
        reason?: string;
        status: "completed" | "partial" | "not-run";
        engine: EngineId;
        version?: string;
        durationMs?: number;
    };
    packagesScanned: number;
    vulnerabilities: Record<string, unknown>[];
}>;
