import test from 'node:test'
import assert from 'node:assert/strict'
import { createSubprocessRunner } from '../lib/runner.js'

test('git diff timeout remains active until the subprocess settles', async () => {
  let signal
  const runner = createSubprocessRunner((spec) => {
    signal = spec.signal
    return {
      done: new Promise((resolve) => {
        signal.addEventListener('abort', () => resolve({ exitCode: null, signal: 'SIGTERM' }), { once: true })
      }),
      collected: { stderr: { readFrom: () => ({ text: 'partial stderr' }) } },
      terminate() {},
    }
  }, 1000, 20)
  await assert.rejects(runner.run(['git', 'diff']), /timed out/)
  assert.equal(signal.aborted, true)
  assert.match(signal.reason.message, /timed out/)
})

test('settled and failed subprocesses release their timeout', async () => {
  for (const outcome of ['success', 'spawn failure', 'done failure']) {
    let signal
    const failure = new Error(outcome)
    const runner = createSubprocessRunner((spec) => {
      signal = spec.signal
      if (outcome === 'spawn failure') throw failure
      return {
        done: outcome === 'done failure' ? Promise.reject(failure) : Promise.resolve({ exitCode: 0, signal: null }),
        collected: {},
        terminate() {},
      }
    }, 1000, 20)
    if (outcome === 'success') assert.equal((await runner.run(['git', 'diff'])).exitCode, 0)
    else await assert.rejects(runner.run(['git', 'diff']), (error) => error === failure)
    await new Promise((resolve) => setTimeout(resolve, 40))
    assert.equal(signal.aborted, false, outcome)
  }
})

test('a lossy DSH output tail is never parsed as a complete Git or scanner response', async () => {
  for (const stream of ['stdout','stderr']) {
    const runner = createSubprocessRunner(() => ({ done: Promise.resolve({ exitCode: 0, signal: null }), collected: { [stream]: { readFrom: () => ({ text: '{}', lossy: true }) } }, terminate() {} }), 1000, 1000)
    await assert.rejects(runner.run(['fixture']), /output exceeded 8 MiB/)
  }
})
