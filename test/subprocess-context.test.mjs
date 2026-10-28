import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { apply } from '../lib/index.js'
import { gitOutput } from './git-output.mjs'

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
        collected: { stdout: { readFrom: () => ({ text: gitOutput(spec.argv, spec.cwd) }) } },
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
  // 一次扫描可能先问一次仓库的对象格式（--attr-source 需要空树 OID），
  // 因此按 subcommand 找真正的 diff 调用，而不是假设只有一次进程调用。
  const diff = service.internals.calls.find(call => call.argv.includes('diff'))
  assert.ok(diff, 'must spawn git diff')
  const argv = diff.argv
  assert.equal(argv[0], 'git')
  assert.ok(argv.includes('core.fsmonitor=false'), argv.join(' '))
  assert.ok(argv.some(arg => arg.startsWith('--attr-source=')), argv.join(' '))
  assert.ok(argv.includes('--no-ext-diff') && argv.includes('--no-textconv'))
  assert.deepEqual(argv.slice(-2), ['HEAD', '--'])
})
