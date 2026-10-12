import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { apply } from '../lib/index.js'

test('secure_diff preserves the subprocess service receiver', async (t) => {
  const stateDir = mkdtempSync(join(process.cwd(), '.subprocess-test-'))
  t.after(() => rmSync(stateDir, { recursive: true, force: true }))
  const definitions = new Map()
  const service = {
    internals: { calls: [] },
    spawn(spec) {
      this.internals.calls.push(spec)
      return {
        done: Promise.resolve({ exitCode: 0, signal: null }),
        collected: { stdout: { readFrom: () => ({ text: '' }) } },
        terminate() {},
      }
    },
  }
  apply({
    subprocess: service,
    tools: { register(definition) { definitions.set(definition.name, definition); return () => {} } },
    on() {},
  }, { stateDir })
  const result = await definitions.get('secure_diff').execute({}, { signal: new AbortController().signal })
  assert.equal(result.passed, true)
  assert.equal(result.filesScanned, 0)
  assert.equal(service.internals.calls.length, 1)
  const argv = service.internals.calls[0].argv
  assert.deepEqual(argv.slice(0, 2), ['git', 'diff'])
  assert.ok(argv.includes('--no-ext-diff') && argv.includes('--no-textconv'))
  assert.deepEqual(argv.slice(-2), ['HEAD', '--'])
})
