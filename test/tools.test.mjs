import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { buildSecureTools, resolveConfig } from '../lib/index.js'

async function world(files = {}) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'secure-tools-'))
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(dir, name)
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, content)
  }
  const cfg = resolveConfig({ stateDir: path.join(dir, '.code-security') }, dir)
  return { dir, cfg }
}

const fakeRunner = {
  async run(argv) {
    return { exitCode: 0, signal: null, stdout: '', stderr: '' }
  },
}

for (const name of ['secure_scan', 'secure_diff', 'secure_fix_verify']) {
  test(`${name} rejects misspelled or invalid targets before scanning or changing state`, async (t) => {
    const { dir, cfg } = await world({ 'selected.js': 'const safe = 1\n', 'unselected.js': 'eval(input)\n' })
    t.after(() => fs.rm(dir, { recursive: true, force: true }))
    let calls = 0
    const tools = buildSecureTools(cfg, dir, { async run() { calls++; return { exitCode: 0, signal: null, stdout: '', stderr: '' } } })
    await tools.find(t => t.name === 'secure_scan').execute({ target: 'selected.js' }, {})
    const stateFile = path.join(dir, '.code-security/state.json')
    const before = await fs.readFile(stateFile, 'utf8')
    const tool = tools.find(t => t.name === name)
    for (const args of [{ paths: ['selected.js'] }, { files: 'selected.js' }, { target: 'selected.js', glob: '*.js' }, { target: '' }, { target: '  ' }, { target: null }, { target: ['selected.js'] }, 'selected.js']) {
      await assert.rejects(tool.execute(args, {}), /参数|target/)
      assert.equal(await fs.readFile(stateFile, 'utf8'), before)
    }
    assert.equal(calls, 0, 'invalid diff targets must not invoke git')
  })
}

test('secure_scan keeps a valid file scope and still accepts an explicit whole-workspace scan', async (t) => {
  const { dir, cfg } = await world({ 'selected.js': 'const safe = 1\n', 'unselected.js': 'eval(input)\n' })
  t.after(() => fs.rm(dir, { recursive: true, force: true }))
  const scan = buildSecureTools(cfg, dir, fakeRunner).find(t => t.name === 'secure_scan')
  const args = { target: ' selected.js ' }
  const selected = await scan.execute(args, {})
  assert.equal(selected.filesScanned, 1)
  assert.match(scan.output.render(args, selected)[0].text, /安全审查：通过\n文件 1 个/)
  const all = await scan.execute({}, {})
  assert.equal(all.filesScanned, 2)
  assert.equal(all.counts.critical, 1)
  assert.match(scan.output.render({}, all)[0].text, /critical 1/)
  assert.match(scan.output.render({}, all)[0].text, /unselected\.js/)
})

test('secure_scan 写入状态并给出门禁结论', async () => {
  const { dir, cfg } = await world({ 'src/bad.js': 'eval(user)\n' })
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  const value = await tools.find(t => t.name === 'secure_scan').execute({ target: '.' }, {})
  assert.equal(value.counts.critical, 1)
  assert.equal(value.passed, false)
  await fs.stat(path.join(dir, '.code-security/state.json'))
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
  assert.match(tools.find(t => t.name === 'secure_diff').output.render({ base: 'HEAD' }, value)[0].text, /critical 1/)
  assert.match(tools.find(t => t.name === 'secure_diff').output.render({ base: 'HEAD' }, value)[0].text, /x\.js/)
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
  const pkg = JSON.parse(await fs.readFile(new URL('../package.json', import.meta.url), 'utf8'))
  assert.equal(JSON.parse(sarif.text).runs[0].tool.driver.version, pkg.version)
  const markdown = await exportTool.execute({ format: 'markdown' }, {})
  assert.match(markdown.text, /# 安全审查报告/)
  const target = path.join(dir, 'report.sarif')
  const written = await exportTool.execute({ format: 'sarif', path: target }, {})
  await fs.stat(target)
  assert.equal(written.path, target)
  await fs.rm(dir, { recursive: true, force: true })
})

test('SARIF resolves a nested finding against the workspace with encoded paths', async (t) => {
  const { dir, cfg } = await world({ 'src space/a#中.js': 'eval(user)\n' })
  t.after(() => fs.rm(dir, { recursive: true, force: true }))
  const tools = buildSecureTools(cfg, dir, fakeRunner)
  await tools.find(t => t.name === 'secure_scan').execute({ target: 'src space/a#中.js' }, {})
  const exported = await tools.find(t => t.name === 'secure_export').execute({ format: 'sarif' }, {})
  const run = JSON.parse(exported.text).runs[0]
  const location = run.results[0].locations[0].physicalLocation.artifactLocation
  assert.equal(location.uriBaseId, 'ROOTPATH')
  const base = run.originalUriBaseIds.ROOTPATH.uri
  assert.equal(new URL(location.uri, base).href, pathToFileURL(path.join(dir, 'src space/a#中.js')).href)
  assert.deepEqual(run.tool.driver.rules[0].shortDescription, { text: run.tool.driver.rules[0].name })
})
