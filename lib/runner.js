/**
 * 子进程执行层：通过 DSH 官方 subprocess 服务运行 git diff。
 *
 * @module dsh-code-security/runner
 */
const COLLECT_BYTES = 8 * 1024 * 1024;
export function createSubprocessRunner(spawn, graceMs, defaultTimeoutMs) {
    return {
        async run(argv, options) {
            const timeoutMs = options?.timeoutMs ?? defaultTimeoutMs;
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(new Error('git diff timed out')), timeoutMs);
            try {
                const handle = spawn({
                    argv,
                    cwd: process.cwd(),
                    stdio: { stdin: 'ignore', stdout: { maxBytes: COLLECT_BYTES }, stderr: { maxBytes: COLLECT_BYTES } },
                    graceMs,
                    signal: controller.signal,
                });
                const outcome = await handle.done;
                return {
                    exitCode: outcome.exitCode,
                    signal: outcome.signal,
                    stdout: handle.collected.stdout?.readFrom(0).text ?? '',
                    stderr: handle.collected.stderr?.readFrom(0).text ?? '',
                };
            }
            finally {
                clearTimeout(timer);
            }
        },
    };
}
