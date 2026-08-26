import test from 'node:test'
import assert from 'node:assert/strict'
import * as fs from 'node:fs/promises'
import * as os from 'node:os'
import * as path from 'node:path'
import { buildSecureTools, resolveConfig } from '../lib/index.js'

test('secure_health 汇总配置且 ok=true', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-secure-health-'))
  const cfg = resolveConfig({}, dir)
  const runner = { run: async () => ({ exitCode: 0, stdout: '', stderr: '' }) }
  const health = buildSecureTools(cfg, dir, runner).find((t) => t.name === 'secure_health')
  const value = await health.execute({})
  assert.equal(value.ok, true)
  assert.match(String(value.checks[0].detail), /maxFiles=/)
  const blocks = health.output.render({}, value)
  assert.match(blocks[0].text, /自检：正常/)
  await fs.rm(dir, { recursive: true, force: true })
})
