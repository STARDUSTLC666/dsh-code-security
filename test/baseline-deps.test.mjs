import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { buildSecureTools, resolveConfig } from '../lib/index.js'

async function world(files = {}) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'secure-extra-'))
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(dir, name)
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, content)
  }
  const cfg = resolveConfig({ stateDir: path.join(dir, '.code-security') }, dir)
  return { dir, cfg }
}

const fakeRunner = { async run() { return { exitCode: 0, signal: null, stdout: '', stderr: '' } } }

test('secure_baseline 接受当前问题后，secure_scan 只按新增判定', async () => {
  const { dir, cfg } = await world({ 'a.js': 'eval(user)\n' })
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  const scan = tools.find(t => t.name === 'secure_scan')
  const first = await scan.execute({ target: '.' }, {})
  assert.equal(first.newFindings.length, 1)
  assert.equal(first.passed, false)

  const baselineTool = tools.find(t => t.name === 'secure_baseline')
  const accepted = await baselineTool.execute({ reason: '历史遗留' }, {})
  assert.equal(accepted.acceptedCount, 1)

  const second = await scan.execute({ target: '.' }, {})
  assert.equal(second.newFindings.length, 0)
  assert.equal(second.passed, true)

  await fs.writeFile(path.join(dir, 'b.js'), 'eval(other)\n')
  const third = await scan.execute({ target: '.' }, {})
  assert.equal(third.newFindings.length, 1)
  assert.equal(third.passed, false)
  await fs.rm(dir, { recursive: true, force: true })
})

test('secure_baseline 审批门允许/拒绝', async () => {
  const { dir, cfg } = await world({ 'a.js': 'eval(user)\n' })
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  await tools.find(t => t.name === 'secure_scan').execute({ target: '.' }, {})
  const baselineTool = tools.find(t => t.name === 'secure_baseline')
  assert.equal(typeof baselineTool.gate, 'function')
  const allowed = await baselineTool.gate({ approval: { request: async () => 'allowed-once' } }, async () => 'ok')
  assert.equal(allowed, 'ok')
  const denied = await baselineTool.gate({ approval: { request: async () => 'cancelled' } }, async () => 'bad')
  assert.equal(denied.kind, 'deny')
  await fs.rm(dir, { recursive: true, force: true })
})

test('secure_deps 解析 package.json 并标记风险', async () => {
  const { dir, cfg } = await world({
    'package.json': JSON.stringify({
      dependencies: { lodash: '^4.17.21', demo: '*' },
      devDependencies: { 'git-dep': 'github:someone/repo' },
      peerDependencies: { 'local-pkg': 'file:../local-pkg' },
    }),
  })
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  const value = await tools.find(t => t.name === 'secure_deps').execute({ target: '.' }, {})
  assert.equal(value.filesScanned, 1)
  assert.equal(value.riskyCount, 3)
  const byName = Object.fromEntries(value.dependencies.map(d => [d.name, d.risk]))
  assert.equal(byName.demo, 'wildcard')
  assert.equal(byName['git-dep'], 'git')
  assert.equal(byName['local-pkg'], 'local')
  assert.equal(byName.lodash, 'range')
  await fs.rm(dir, { recursive: true, force: true })
})

test('secure_deps 解析 requirements.txt', async () => {
  const { dir, cfg } = await world({ 'requirements.txt': 'flask==3.0.0\nrequests\ndjango>=4.0\n' })
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  const value = await tools.find(t => t.name === 'secure_deps').execute({ target: '.' }, {})
  const byName = Object.fromEntries(value.dependencies.map(d => [d.name, d.risk]))
  assert.equal(byName.flask, 'exact')
  assert.equal(byName.requests, 'unpinned')
  assert.equal(byName.django, 'range')
  await fs.rm(dir, { recursive: true, force: true })
})
