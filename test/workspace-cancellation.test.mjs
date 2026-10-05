import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, symlink, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildSecureTools, resolveConfig, scanPath, loadPolicy, normalizePolicy } from '../lib/index.js'

test('扫描、策略和 git diff 使用当前会话工作区，取消后不写入状态', async t => {
  const root = await mkdtemp(join(tmpdir(), 'secure-workspace-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const host = join(root, 'host'), workspace = join(root, 'workspace')
  await mkdir(host); await mkdir(workspace)
  await writeFile(join(workspace, 'bad.js'), 'eval(input)\n')
  let observed
  const tools = buildSecureTools(resolveConfig({}, host), host, { async run(argv, options) {
    observed = options; return { exitCode: 0, signal: null, stdout: '', stderr: '' }
  } })
  const context = { agent: { session: { header: { cwd: workspace } } } }
  const scan = tools.find(tool => tool.name === 'secure_scan')
  const result = await scan.execute({}, context)
  assert.equal(result.counts.critical, 1)
  const before = await readFile(join(workspace, '.code-security/state.json'), 'utf8')
  await assert.rejects(readFile(join(host, '.code-security/state.json')), { code: 'ENOENT' })
  await tools.find(tool => tool.name === 'secure_diff').execute({}, context)
  assert.equal(observed.cwd, workspace)
  await assert.rejects(scan.execute({}, { ...context, signal: AbortSignal.abort(new Error('用户取消')) }), /用户取消/)
  // The completed diff may update state; cancellation must leave those bytes untouched.
  const saved = await readFile(join(workspace, '.code-security/state.json'), 'utf8')
  await assert.rejects(scan.execute({}, { ...context, signal: AbortSignal.abort(new Error('用户取消')) }), /用户取消/)
  assert.equal(await readFile(join(workspace, '.code-security/state.json'), 'utf8'), saved)
  assert.ok(before)
})

test('扫描跳过目录联接和循环链接，不读取链接外的文件', async t => {
  const root = await mkdtemp(join(tmpdir(), 'secure-links-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const workspace = join(root, 'project'), outside = join(root, 'outside')
  await mkdir(workspace); await mkdir(outside)
  await writeFile(join(workspace, 'safe.js'), 'const value = 1\n')
  await writeFile(join(outside, 'bad.js'), 'eval(input)\n')
  await symlink(outside, join(workspace, 'external'), process.platform === 'win32' ? 'junction' : 'dir')
  await symlink(workspace, join(workspace, 'loop'), process.platform === 'win32' ? 'junction' : 'dir')
  const result = await scanPath({ cwd: workspace, maxFiles: 20, maxFileBytes: 10000, policy: { version: 1, exclude: [], ignore: [] } })
  assert.equal(result.filesScanned, 1)
  assert.equal(result.filesSkipped, 2)
  assert.deepEqual(result.findings, [])
})

test('损坏策略和空忽略规则明确报错，不静默禁用检查', async t => {
  const root = await mkdtemp(join(tmpdir(), 'secure-policy-invalid-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const file = join(root, '.code-security.json'), bytes = '{invalid'
  await writeFile(file, bytes)
  await assert.rejects(loadPolicy(root), /原文件已保留/)
  assert.equal(await readFile(file, 'utf8'), bytes)
  assert.throws(() => normalizePolicy({ ignore: [{}] }), /空规则/)
})
