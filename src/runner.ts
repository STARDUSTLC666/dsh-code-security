/**
 * 子进程执行层：通过 DSH 官方 subprocess 服务运行 git diff。
 *
 * @module dsh-secure-review/runner
 */

export interface RunResult {
  exitCode: number | null
  signal: string | null
  stdout: string
  stderr: string
}

export interface ProcessRunner {
  run(argv: readonly string[], options?: { timeoutMs?: number }): Promise<RunResult>
}

export interface SubprocessHandleLike {
  done: Promise<{ exitCode: number | null; signal: string | null }>
  collected: {
    stdout?: { readFrom(offset: number): { text: string } }
    stderr?: { readFrom(offset: number): { text: string } }
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
  }): SubprocessHandleLike
}

const COLLECT_BYTES = 8 * 1024 * 1024

export function createSubprocessRunner(spawn: SubprocessSpawnLike, graceMs: number, defaultTimeoutMs: number): ProcessRunner {
  return {
    async run(argv, options) {
      const timeoutMs = options?.timeoutMs ?? defaultTimeoutMs
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(new Error('git diff timed out')), timeoutMs)
      let handle: SubprocessHandleLike
      try {
        handle = spawn({
          argv,
          cwd: process.cwd(),
          stdio: { stdin: 'ignore', stdout: { maxBytes: COLLECT_BYTES }, stderr: { maxBytes: COLLECT_BYTES } },
          graceMs,
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timer)
      }
      const outcome = await handle.done
      return {
        exitCode: outcome.exitCode,
        signal: outcome.signal,
        stdout: handle.collected.stdout?.readFrom(0).text ?? '',
        stderr: handle.collected.stderr?.readFrom(0).text ?? '',
      }
    },
  }
}
