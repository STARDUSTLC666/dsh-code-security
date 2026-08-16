import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { scanPath } from '../lib/scanner.js'
import { loadPolicy } from '../lib/policy.js'
import { resolveConfig } from '../lib/config.js'

async function tmpProject(files) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'secure-review-'))
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(dir, name)
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, content)
  }
  return dir
}

test('JavaScript 注入/硬编码密钥规则命中', async () => {
  const dir = await tmpProject({
    'bad.js': 'eval(userInput);\nexecSync("rm -rf " + x);\nconst password = "hunter2";\ndocument.body.innerHTML = user;\n',
  })
  const cfg = resolveConfig(null, dir)
  const result = await scanPath({ cwd: dir, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy: await loadPolicy(dir) })
  const ids = new Set(result.findings.map(f => f.ruleId))
  assert.ok(ids.has('SEC-001'))
  assert.ok(ids.has('SEC-002'))
  assert.ok(ids.has('SEC-301'))
  assert.ok(ids.has('SEC-009'))
  await fs.rm(dir, { recursive: true, force: true })
})

test('Python 反序列化/弱哈希规则命中', async () => {
  const dir = await tmpProject({
    'bad.py': 'pickle.loads(data)\nimport hashlib; hashlib.md5(password.encode()).hexdigest()\n',
  })
  const cfg = resolveConfig(null, dir)
  const result = await scanPath({ cwd: dir, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy: await loadPolicy(dir) })
  const ids = new Set(result.findings.map(f => f.ruleId))
  assert.ok(ids.has('SEC-101'))
  assert.ok(ids.has('SEC-201'))
  await fs.rm(dir, { recursive: true, force: true })
})

test('Dockerfile privileged / latest 规则命中', async () => {
  const dir = await tmpProject({
    'Dockerfile': 'FROM node:latest\nRUN --privileged echo hi\n',
  })
  const cfg = resolveConfig(null, dir)
  const result = await scanPath({ cwd: dir, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy: await loadPolicy(dir) })
  const ids = new Set(result.findings.map(f => f.ruleId))
  assert.ok(ids.has('SEC-402'))
  assert.ok(ids.has('SEC-406'))
  await fs.rm(dir, { recursive: true, force: true })
})

test('.npmrc audit=false 文件级规则命中', async () => {
  const dir = await tmpProject({ '.npmrc': 'audit=false\n' })
  const cfg = resolveConfig(null, dir)
  const result = await scanPath({ cwd: dir, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy: await loadPolicy(dir) })
  assert.ok(result.findings.some(f => f.ruleId === 'SEC-404'))
  await fs.rm(dir, { recursive: true, force: true })
})

test('内联豁免 next-line 可跳过规则', async () => {
  const dir = await tmpProject({ 'ok.js': '// secure-review-disable-next-line SEC-001\neval(safeStaticCode)\n' })
  const cfg = resolveConfig(null, dir)
  const result = await scanPath({ cwd: dir, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy: await loadPolicy(dir) })
  assert.ok(!result.findings.some(f => f.ruleId === 'SEC-001'))
  await fs.rm(dir, { recursive: true, force: true })
})

test('node_modules 默认排除', async () => {
  const dir = await tmpProject({
    'node_modules/x.js': 'eval(1)\n',
    'src/a.js': 'eval(1)\n',
  })
  const cfg = resolveConfig(null, dir)
  const result = await scanPath({ cwd: dir, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy: await loadPolicy(dir) })
  assert.equal(result.findings.filter(f => f.ruleId === 'SEC-001').length, 1)
  await fs.rm(dir, { recursive: true, force: true })
})

test('PHP/Java/Ruby 命令执行规则命中', async () => {
  const dir = await tmpProject({
    'bad.php': 'system($_GET["cmd"]);\n',
    'Bad.java': 'Runtime.getRuntime().exec(cmd);\n',
    'bad.rb': 'system("ls " + arg)\n',
  })
  const cfg = resolveConfig(null, dir)
  const result = await scanPath({ cwd: dir, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy: await loadPolicy(dir) })
  const ids = new Set(result.findings.map(f => f.ruleId))
  assert.ok(ids.has('SEC-011'))
  assert.ok(ids.has('SEC-013'))
  assert.ok(ids.has('SEC-012'))
  await fs.rm(dir, { recursive: true, force: true })
})

test('.env 与 GitHub Actions 规则命中', async () => {
  const dir = await tmpProject({
    '.env': 'API_KEY=abcd1234\n',
    '.github/workflows/ci.yml': 'jobs:\n  build:\n    steps:\n      - uses: actions/checkout@main\n',
  })
  const cfg = resolveConfig(null, dir)
  const result = await scanPath({ cwd: dir, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy: await loadPolicy(dir) })
  const ids = new Set(result.findings.map(f => f.ruleId))
  assert.ok(ids.has('SEC-305'))
  assert.ok(ids.has('SEC-407'))
  await fs.rm(dir, { recursive: true, force: true })
})
