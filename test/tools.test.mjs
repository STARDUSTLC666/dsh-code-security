import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { buildSecureTools, resolveConfig } from '../lib/index.js'

async function world(files = {}) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'secure-tools-'))
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(dir, name)
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, content)
  }
  const cfg = resolveConfig({ stateDir: path.join(dir, '.secure-review') }, dir)
  return { dir, cfg }
}

const fakeRunner = {
  async run(argv) {
    return { exitCode: 0, signal: null, stdout: '', stderr: '' }
  },
}

test('secure_scan 写入状态并给出门禁结论', async () => {
  const { dir, cfg } = await world({ 'src/bad.js': 'eval(user)\n' })
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  const value = await tools.find(t => t.name === 'secure_scan').execute({ target: '.' }, {})
  assert.equal(value.counts.critical, 1)
  assert.equal(value.passed, false)
  await fs.stat(path.join(dir, '.secure-review/state.json'))
  await fs.rm(dir, { recursive: true, force: true })
})

test('secure_fix_verify 对比基线并识别新增问题', async () => {
  const { dir, cfg } = await world({ 'a.js': 'eval(user)\n' })
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  const scan = tools.find(t => t.name === 'secure_scan')
  await scan.execute({ target: '.' }, {})
  await fs.writeFile(path.join(dir, 'a.js'), 'const ok = 1\n')
  await fs.writeFile(path.join(dir, 'b.js'), 'eval(other)\n')
  const verify = tools.find(t => t.name === 'secure_fix_verify')
  const value = await verify.execute({ target: '.' }, {})
  assert.equal(value.closedCount, 1)
  assert.equal(value.remainingCount, 0)
  assert.equal(value.freshCount, 1)
  assert.equal(value.passed, false)
  await fs.rm(dir, { recursive: true, force: true })
})

test('secure_diff 使用 git diff 结果', async () => {
  const { dir, cfg } = await world({})
  const diff = `diff --git a/x.js b/x.js\n--- a/x.js\n+++ b/x.js\n@@ -0,0 +1,1 @@\n+eval(user)\n`
  const runner = { async run() { return { exitCode: 0, signal: null, stdout: diff, stderr: '' } } }
  const tools = buildSecureTools(cfg, dir, runner)
  const value = await tools.find(t => t.name === 'secure_diff').execute({ base: 'HEAD' }, {})
  assert.equal(value.findings.length, 1)
  assert.equal(value.findings[0].ruleId, 'SEC-001')
  await fs.rm(dir, { recursive: true, force: true })
})

test('secure_policy_set 写入策略', async () => {
  const { dir, cfg } = await world({})
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  const set = tools.find(t => t.name === 'secure_policy_set')
  const value = await set.execute({ policy: JSON.stringify({ exclude: ['vendor/**'], ignore: [], failOn: 'high' }) }, {})
  assert.equal(value.policy.failOn, 'high')
  const show = await tools.find(t => t.name === 'secure_policy_show').execute({}, {})
  assert.deepEqual(show.policy.exclude, ['vendor/**'])
  await fs.rm(dir, { recursive: true, force: true })
})

test('secure_policy_set 审批门：允许/拒绝', async () => {
  const { dir, cfg } = await world({})
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  const set = tools.find(t => t.name === 'secure_policy_set')
  assert.equal(typeof set.gate, 'function')
  const allowed = await set.gate({ approval: { request: async () => 'allowed-once' } }, async () => 'ok')
  assert.equal(allowed, 'ok')
  const denied = await set.gate({ approval: { request: async () => 'cancelled' } }, async () => 'bad')
  assert.equal(denied.kind, 'deny')
  await fs.rm(dir, { recursive: true, force: true })
})

test('secure_diff staged=true 使用 --cached', async () => {
  const { dir, cfg } = await world({})
  const calls = []
  const runner = { async run(argv) { calls.push(argv); return { exitCode: 0, signal: null, stdout: '', stderr: '' } } }
  const tools = buildSecureTools(cfg, dir, runner)
  await tools.find(t => t.name === 'secure_diff').execute({ staged: true }, {})
  assert.ok(calls[0].includes('--cached'))
  await fs.rm(dir, { recursive: true, force: true })
})

test('secure_export 生成 SARIF 与 Markdown', async () => {
  const { dir, cfg } = await world({ 'a.js': 'eval(user)\n' })
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  await tools.find(t => t.name === 'secure_scan').execute({ target: '.' }, {})
  const exportTool = tools.find(t => t.name === 'secure_export')
  const sarif = await exportTool.execute({ format: 'sarif' }, {})
  assert.equal(sarif.findingCount, 1)
  assert.equal(JSON.parse(sarif.text).version, '2.1.0')
  const markdown = await exportTool.execute({ format: 'markdown' }, {})
  assert.match(markdown.text, /# 安全审查报告/)
  const target = path.join(dir, 'report.sarif')
  const written = await exportTool.execute({ format: 'sarif', path: target }, {})
  await fs.stat(target)
  assert.equal(written.path, target)
  await fs.rm(dir, { recursive: true, force: true })
})
