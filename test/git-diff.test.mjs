import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createHash } from 'node:crypto'
import { buildSecureTools, resolveConfig, scanPath, scanText, runGitDiff } from '../lib/index.js'

const executeFile = promisify(execFile)
const fixtureRoot = fileURLToPath(new URL('./.tmp/', import.meta.url))
const policy = { version: 1, exclude: [], ignore: [] }
const runner = {
  async run(argv, options = {}) {
    try {
      const { stdout, stderr } = await executeFile(argv[0], argv.slice(1), {
        cwd: options.cwd, signal: options.signal, timeout: options.timeoutMs ?? 10000,
        encoding: 'utf8', windowsHide: true, maxBuffer: 2 * 1024 * 1024,
      })
      return { exitCode: 0, signal: null, stdout, stderr }
    } catch (error) {
      if (!Number.isInteger(error.code)) throw error
      return { exitCode: error.code, signal: error.signal ?? null, stdout: error.stdout ?? '', stderr: error.stderr ?? '' }
    }
  },
}

async function project(t, files) {
  await fs.mkdir(fixtureRoot, { recursive: true })
  const root = await fs.mkdtemp(path.join(fixtureRoot, 'case-'))
  t.after(async () => {
    const rel = path.relative(fixtureRoot, path.resolve(root))
    assert.ok(rel.startsWith('case-') && !rel.includes(path.sep) && !path.isAbsolute(rel), 'cleanup must stay inside the generated fixture directory')
    await fs.rm(root, { recursive: true, force: true })
  })
  const git = async (...args) => {
    const result = await runner.run(['git', ...args], { cwd: root })
    assert.equal(result.exitCode, 0, result.stderr)
    return result.stdout
  }
  const write = async (file, text) => {
    const target = path.join(root, file)
    await fs.mkdir(path.dirname(target), { recursive: true })
    await fs.writeFile(target, text)
  }
  await git('init', '--initial-branch=main')
  for (const [key, value] of Object.entries({
    'user.name': 'Security regression fixture', 'user.email': 'fixture@example.invalid',
    'core.autocrlf': 'false', 'core.quotePath': 'true', 'commit.gpgsign': 'false',
    'core.hooksPath': path.join(root, '.no-hooks'),
  })) await git('config', '--local', key, value)
  for (const [file, text] of Object.entries(files)) await write(file, text)
  await git('add', '--all')
  await git('commit', '--allow-empty', '-m', 'Initialize regression fixture')
  const tools = buildSecureTools(resolveConfig({}, root), root, runner)
  return { root, git, write, tools }
}

test('secure_diff reads real Git changes with Chinese paths and exports their workspace locations', async t => {
  const file = 'src/中文 安全.js'
  const { root, write, tools } = await project(t, { [file]: 'const safe = 1\n' })
  await write(file, 'const safe = 1\neval(input)\n')
  const diff = tools.find(tool => tool.name === 'secure_diff')
  const result = await diff.execute({}, {})
  assert.equal(result.passed, false)
  assert.deepEqual(result.findings.map(f => [f.ruleId, f.file, f.line]), [['SEC-001', file, 2]])
  assert.match(diff.output.render({}, result)[0].text, /中文 安全\.js:2/)
  const report = await tools.find(tool => tool.name === 'secure_report').execute({}, {})
  assert.equal(report.passed, false)
  const exported = await tools.find(tool => tool.name === 'secure_export').execute({ format: 'sarif' }, {})
  const run = JSON.parse(exported.text).runs[0]
  const location = run.results[0].locations[0].physicalLocation.artifactLocation
  assert.equal(new URL(location.uri, run.originalUriBaseIds.ROOTPATH.uri).href, pathToFileURL(path.join(root, file)).href)
})

test('secure_diff reviews staged secret/config lines without reading later working tree edits', async t => {
  const { git, write, tools } = await project(t, {
    '.env': 'API_URL=https://example.invalid\n',
    '.npmrc': 'fund=false\naudit=true\n',
    'key.pem': 'fixture only\n',
    'existing.js': 'eval(old)\n',
  })
  await write('.env', 'API_URL=https://example.invalid\nAPI_TOKEN=fixture-value\n')
  await write('.npmrc', 'fund=false\naudit=false\n')
  await write('key.pem', 'fixture only\n-----BEGIN PRIVATE KEY-----\n')
  await git('add', '--all')
  await write('.env', 'API_URL=https://example.invalid\n')
  const result = await tools.find(tool => tool.name === 'secure_diff').execute({ staged: true }, {})
  assert.equal(result.passed, false)
  assert.deepEqual(result.findings.map(f => [f.ruleId, f.file, f.line]), [
    ['SEC-303', 'key.pem', 2], ['SEC-305', '.env', 2], ['SEC-404', '.npmrc', 2],
  ])
})

test('secure_diff produces a stable patch despite Git color and prefix preferences', async t => {
  const { git, write, tools } = await project(t, { 'a.js': 'const safe = 1\n' })
  for (const [key, value] of Object.entries({
    'color.ui': 'always', 'diff.noprefix': 'true', 'diff.mnemonicPrefix': 'true',
    'diff.srcPrefix': 'before/', 'diff.dstPrefix': 'after/',
  })) await git('config', '--local', key, value)
  await write('a.js', 'eval(input)\n')
  const result = await tools.find(tool => tool.name === 'secure_diff').execute({}, {})
  assert.deepEqual(result.findings.map(f => f.file), ['a.js'])
  assert.equal(result.passed, false)
})

test('secure_diff uses paths relative to a nested session workspace and excludes sibling changes', async t => {
  const { root, write } = await project(t, { 'app/a.js': 'const safe = 1\n', 'sibling.js': 'const safe = 1\n' })
  await write('app/a.js', 'eval(input)\n')
  await write('sibling.js', 'eval(other)\n')
  const workspace = path.join(root, 'app')
  const tools = buildSecureTools(resolveConfig({}, root), root, runner)
  const result = await tools.find(tool => tool.name === 'secure_diff').execute({}, { agent: { session: { header: { cwd: workspace } } } })
  assert.deepEqual(result.findings.map(f => f.file), ['a.js'])
  const state = JSON.parse(await fs.readFile(path.join(workspace, '.code-security/state.json'), 'utf8'))
  assert.equal(state.last.findings[0].file, 'a.js')
})

test('full scans locate file rules at their evidence lines and apply direct-file exclusions', async t => {
  const { root } = await project(t, { 'src/generated.js': 'eval(input)\n', 'src/keep.js': 'eval(other)\n' })
  const selectedPolicy = { ...policy, exclude: ['src/generated.js'] }
  const direct = await scanPath({ cwd: root, target: 'src/generated.js', maxFiles: 100, maxFileBytes: 10000, policy: selectedPolicy })
  assert.equal(direct.filesScanned, 0)
  assert.deepEqual(direct.findings, [])
  const all = await scanPath({ cwd: root, maxFiles: 100, maxFileBytes: 10000, policy: selectedPolicy })
  assert.deepEqual(all.findings.map(f => f.file), ['src/keep.js'])
  assert.deepEqual(scanText('# config\n\nAPI_TOKEN=fixture-value\n', '.env', '.env', policy).map(f => [f.ruleId, f.line, f.snippet]), [['SEC-305', 3, 'API_TOKEN=[REDACTED]']])
  assert.deepEqual(scanText('fund=false\naudit=false\n', '.npmrc', '.npmrc', policy).map(f => [f.ruleId, f.line]), [['SEC-404', 2]])
  assert.deepEqual(scanText('fixture only\n-----BEGIN PRIVATE KEY-----\n', 'key.pem', 'key.pem', policy).map(f => [f.ruleId, f.line]), [['SEC-303', 2]])
})

test('invalid Git parameters and truncated patches cannot replace scan state', async t => {
  const { root, tools } = await project(t, { 'a.js': 'const safe = 1\n' })
  await tools.find(tool => tool.name === 'secure_scan').execute({}, {})
  const stateFile = path.join(root, '.code-security/state.json')
  const before = await fs.readFile(stateFile, 'utf8')
  let calls = 0
  const rejectedRunner = { async run() { calls++; return { exitCode: 0, signal: null, stdout: '', stderr: '' } } }
  const diff = buildSecureTools(resolveConfig({}, root), root, rejectedRunner).find(tool => tool.name === 'secure_diff')
  for (const args of [{ base: '--quiet' }, { base: '' }, { base: 1 }, { base: null }, { staged: 'true' }, { staged: null }]) {
    await assert.rejects(diff.execute(args, {}), /base|staged/)
    assert.equal(await fs.readFile(stateFile, 'utf8'), before)
  }
  await assert.rejects(runGitDiff(rejectedRunner, root, '--quiet'), /base/)
  assert.equal(calls, 0)
  const truncatedRunner = { async run() {
    return { exitCode: 0, signal: null, stderr: '', stdout: [
      'diff --git a/a.js b/a.js', '--- a/a.js', '+++ b/a.js',
      '@@ -0,0 +1,2 @@', '+const safe = 1',
    ].join('\n') }
  } }
  const truncated = buildSecureTools(resolveConfig({}, root), root, truncatedRunner).find(tool => tool.name === 'secure_diff')
  await assert.rejects(truncated.execute({}, {}), /diff.*不完整|diff.*格式无效/)
  assert.equal(await fs.readFile(stateFile, 'utf8'), before)
})

test('full/diff scans share baselines and accept legacy dot-prefixed state paths', async t => {
  const { root, write, tools } = await project(t, { 'src/a.js': 'const safe = 1\n' })
  await write('src/a.js', 'const safe = 1\neval(input)\n')
  const scan = await tools.find(tool => tool.name === 'secure_scan').execute({}, {})
  assert.equal(scan.findings[0].file, 'src/a.js')
  await tools.find(tool => tool.name === 'secure_baseline').execute({ reason: 'Regression fixture' }, {})
  const file = path.join(root, '.code-security/state.json')
  const state = JSON.parse(await fs.readFile(file, 'utf8'))
  for (const entry of [state.last, state.baseline]) {
    entry.findings = entry.findings.map(f => ({ ...f, file: './' + f.file }))
    entry.fingerprints = entry.findings.map(f => createHash('sha256').update(f.ruleId + '|' + f.file + '|' + f.snippet.trim()).digest('hex'))
  }
  await fs.writeFile(file, JSON.stringify(state))
  const verify = await tools.find(tool => tool.name === 'secure_fix_verify').execute({}, {})
  assert.equal(verify.remainingCount, 1)
  assert.equal(verify.freshCount, 0)
  assert.equal(verify.closedCount, 0)
  const diff = await tools.find(tool => tool.name === 'secure_diff').execute({}, {})
  assert.equal(diff.passed, true)
  assert.equal(diff.newFindings.length, 0)
  assert.equal(diff.acceptedFindings.length, 1)
})

test('secure_diff ignores configured external text converters and reviews source text', async t => {
  const { root, git, write, tools } = await project(t, {
    '.gitattributes': '*.js diff=security-fixture\n', 'a.js': 'const safe = 1\n',
    'converter.cjs': 'require("node:fs").writeFileSync(require("node:path").join(__dirname, "converter-ran"), "ran"); process.stdout.write("const hidden = 1\\n");\n',
  })
  const quote = value => "'" + value.replace(/'/g, "'\\''") + "'"
  await git('config', '--local', 'diff.security-fixture.textconv', quote(process.execPath.replace(/\\/g, '/')) + ' ' + quote(path.join(root, 'converter.cjs').replace(/\\/g, '/')))
  await write('a.js', 'eval(input)\n')
  const result = await tools.find(tool => tool.name === 'secure_diff').execute({}, {})
  assert.equal(result.passed, false)
  assert.deepEqual(result.findings.map(f => f.ruleId), ['SEC-001'])
  await assert.rejects(fs.stat(path.join(root, 'converter-ran')), { code: 'ENOENT' })
  // Positive control: ordinary Git really uses the configured converter.
  await git('diff', 'HEAD', '--', 'a.js')
  assert.equal(await fs.readFile(path.join(root, 'converter-ran'), 'utf8'), 'ran')
})

test('secure_diff persists reviewed file counts and renders skipped policy matches', async t => {
  const { root, write, tools } = await project(t, { 'vendor/a.js': 'const safe = 1\n', 'src/a.js': 'const safe = 1\n' })
  await write('vendor/a.js', 'eval(vendor)\n')
  await write('src/a.js', 'eval(input)\n')
  await write('.code-security.json', JSON.stringify({ version: 1, exclude: ['vendor/**'], ignore: [] }))
  const tool = tools.find(tool => tool.name === 'secure_diff')
  const result = await tool.execute({}, {})
  assert.equal(result.filesChanged, 2)
  assert.equal(result.filesScanned, 1)
  assert.equal(result.filesSkipped, 1)
  assert.deepEqual(result.findings.map(f => f.file), ['src/a.js'])
  assert.match(tool.output.render({}, result)[0].text, /已跳过 1 项/)
  const state = JSON.parse(await fs.readFile(path.join(root, '.code-security/state.json'), 'utf8'))
  assert.equal(state.last.filesScanned, 1)
})
const shellQuote = value => "'" + value.replace(/'/g, "'\\''") + "'"

test('runGitDiff 关掉 fsmonitor 并让属性查询落在空树上', async () => {
  const calls = []
  const capture = { async run(argv) { calls.push(argv); return { exitCode: 0, signal: null, stdout: '', stderr: '' } } }
  await runGitDiff(capture, '/fixture/repo', 'HEAD')
  const diffCall = calls.find(argv => argv.includes('diff'))
  assert.ok(diffCall, 'must run git diff')
  assert.ok(diffCall.includes('core.fsmonitor=false'), diffCall.join(' '))
  assert.ok(diffCall.some(arg => arg.startsWith('--attr-source=')), diffCall.join(' '))
})

test('secure_diff 不执行被扫仓库的 core.fsmonitor 命令', async t => {
  const { root, git, write, tools } = await project(t, {
    'fsmonitor.cjs': 'require("node:fs").writeFileSync(require("node:path").join(__dirname, "fsmonitor-ran"), "ran");\nprocess.stdout.write("2\\0\\0");\n',
    'a.js': 'const safe = 1\n',
  })
  const command = shellQuote(process.execPath.replace(/\\/g, '/')) + ' ' + shellQuote(path.join(root, 'fsmonitor.cjs').replace(/\\/g, '/'))
  await git('config', '--local', 'core.fsmonitor', command)
  await write('a.js', 'eval(input)\n')
  const result = await tools.find(tool => tool.name === 'secure_diff').execute({}, {})
  assert.equal(result.passed, false)
  assert.deepEqual(result.findings.map(f => f.ruleId), ['SEC-001'])
  await assert.rejects(fs.stat(path.join(root, 'fsmonitor-ran')), { code: 'ENOENT' })
  // 正向对照：普通 Git 会执行配置里的 fsmonitor 命令。脚本只写标记，不实现完整
  // 协议，因此这里只关心它是否被启动，忽略 Git 的退出码。
  await runner.run(['git', 'diff', 'HEAD', '--', 'a.js'], { cwd: root })
  assert.equal(await fs.readFile(path.join(root, 'fsmonitor-ran'), 'utf8'), 'ran')
})

test('secure_diff 不套用 clean 过滤器，藏不掉新增的危险行', async t => {
  const { root, git, write, tools } = await project(t, {
    '.gitattributes': '*.js filter=security-hidden\n',
    'a.js': 'const safe = 1\n',
    'cleaner.cjs': 'require("node:fs").writeFileSync(require("node:path").join(__dirname, "cleaner-ran"), "ran");\nprocess.stdout.write("const safe = 1\\n");\n',
  })
  const command = shellQuote(process.execPath.replace(/\\/g, '/')) + ' ' + shellQuote(path.join(root, 'cleaner.cjs').replace(/\\/g, '/'))
  await git('config', '--local', 'filter.security-hidden.clean', command)
  await write('a.js', 'const safe = 1\neval(input)\n')
  const result = await tools.find(tool => tool.name === 'secure_diff').execute({}, {})
  assert.equal(result.passed, false)
  assert.deepEqual(result.findings.map(f => [f.ruleId, f.file, f.line]), [['SEC-001', 'a.js', 2]])
  await assert.rejects(fs.stat(path.join(root, 'cleaner-ran')), { code: 'ENOENT' })
  // 正向对照：普通 Git 会跑 clean 过滤器，diff 里看不到 eval(input)。
  const raw = await git('diff', 'HEAD', '--', 'a.js')
  assert.equal(await fs.readFile(path.join(root, 'cleaner-ran'), 'utf8'), 'ran')
  assert.doesNotMatch(raw, /eval\(input\)/)
})
test('includeUntracked 的 ls-files 同样不执行被扫仓库的 fsmonitor 命令', async t => {
  const { root, git, write, tools } = await project(t, {
    'fsmonitor.cjs': 'require("node:fs").writeFileSync(require("node:path").join(__dirname, "fsmonitor-ran"), "ran");\nprocess.stdout.write("2\\0\\0");\n',
    'tracked.js': 'const safe = 1\n',
  })
  const command = shellQuote(process.execPath.replace(/\\/g, '/')) + ' ' + shellQuote(path.join(root, 'fsmonitor.cjs').replace(/\\/g, '/'))
  await git('config', '--local', 'core.fsmonitor', command)
  await write('untracked.js', 'eval(input)\n')
  const result = await tools.find(tool => tool.name === 'secure_diff').execute({ includeUntracked: true }, {})
  assert.equal(result.passed, false)
  assert.deepEqual(result.findings.map(f => f.file), ['untracked.js'])
  await assert.rejects(fs.stat(path.join(root, 'fsmonitor-ran')), { code: 'ENOENT' })
})
