/**
 * 子进程执行层：通过 DSH 官方 subprocess 服务运行 git diff。
 *
 * @module dsh-code-security/runner
 */
export interface RunResult {
    exitCode: number | null;
    signal: string | null;
    stdout: string;
    stderr: string;
}
export interface ProcessRunner {
    run(argv: readonly string[], options?: {
        timeoutMs?: number;
    }): Promise<RunResult>;
}
export interface SubprocessHandleLike {
    done: Promise<{
        exitCode: number | null;
        signal: string | null;
    }>;
    collected: {
        stdout?: {
            readFrom(offset: number): {
                text: string;
            };
        };
        stderr?: {
            readFrom(offset: number): {
                text: string;
            };
        };
    };
    terminate(): void;
}
export interface SubprocessSpawnLike {
    (spec: {
        argv: readonly string[];
        cwd: string;
        stdio: {
            stdin: 'ignore';
            stdout: {
                maxBytes: number;
            };
            stderr: {
                maxBytes: number;
            };
        };
        graceMs: number;
        signal?: AbortSignal;
    }): SubprocessHandleLike;
}
export declare function createSubprocessRunner(spawn: SubprocessSpawnLike, graceMs: number, defaultTimeoutMs: number): ProcessRunner;
