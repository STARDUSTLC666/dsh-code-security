/**
 * 子进程执行层：通过 DSH 官方 subprocess 服务运行 git diff。
 *
 * @module dsh-code-security/runner
 */

export interface RunResult {
  exitCode: number | null
  signal: string | null
  stdout: string
  stderr: string
}

export interface ProcessRunner {
  run(argv: readonly string[], options?: { timeoutMs?: number; cwd?: string; signal?: AbortSignal; env?: Record<string, string> }): Promise<RunResult>
}

export interface SubprocessHandleLike {
  done: Promise<{ exitCode: number | null; signal: string | null }>
  collected: {
    stdout?: { readFrom(offset: number): { text: string; lossy?: boolean } }
    stderr?: { readFrom(offset: number): { text: string; lossy?: boolean } }
  }
  terminate(): void
}

export interface SubprocessSpawnLike {
  (spec: {
    argv: readonly string[]
    cwd: string
    stdio: { stdin: 'ignore'; stdout: { maxBytes: number }; stderr: { maxBytes: number } }
    graceMs: number
    signal?: AbortSignal
    env?: Record<string, string>
  }): SubprocessHandleLike
}

const COLLECT_BYTES = 8 * 1024 * 1024

export function createSubprocessRunner(spawn: SubprocessSpawnLike, graceMs: number, defaultTimeoutMs: number): ProcessRunner {
  return {
    async run(argv, options) {
      const timeoutMs = options?.timeoutMs ?? defaultTimeoutMs
      const controller = new AbortController()
      const signal = options?.signal ? AbortSignal.any([options.signal, controller.signal]) : controller.signal
      signal.throwIfAborted()
      const timer = setTimeout(() => controller.abort(new Error('scanner subprocess timed out')), timeoutMs)
      try {
        const handle = spawn({
          argv,
          cwd: options?.cwd ?? process.cwd(),
          stdio: { stdin: 'ignore', stdout: { maxBytes: COLLECT_BYTES }, stderr: { maxBytes: COLLECT_BYTES } },
          graceMs,
          signal,
          ...(options?.env ? { env: options.env } : {}),
        })
        const outcome = await handle.done
        signal.throwIfAborted()
        const stdout = handle.collected.stdout?.readFrom(0), stderr = handle.collected.stderr?.readFrom(0)
        if (stdout?.lossy || stderr?.lossy) throw new Error('scanner subprocess output exceeded 8 MiB; this check is incomplete')
        return {
          exitCode: outcome.exitCode,
          signal: outcome.signal,
          stdout: stdout?.text ?? '',
          stderr: stderr?.text ?? '',
        }
      } finally {
        clearTimeout(timer)
      }
    },
  }
}
