import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { resolveConfig, buildSecureTools } from '../lib/index.js'
import { nativeRunner, localDatabase, lockfile } from './helpers/native.mjs'

async function fixture(t) { const dir = await mkdtemp(join(tmpdir(), 'dsh-native-security-')); t.after(() => rm(dir, { recursive: true, force: true })); return dir }
const engines = { betterleaks: process.env.DSH_TEST_BETTERLEAKS, semgrep: process.env.DSH_TEST_SEMGREP, osv: process.env.DSH_TEST_OSV }
const token = 'ghp_aB3dE5fG7hI9jK1mN3pQ5rS7tU9vW1xY3zA5'
const toolsAt = (dir, extra = {}) => buildSecureTools(resolveConfig({ enginePaths: Object.fromEntries(Object.entries(engines).filter(([, value]) => value)), ...extra }, dir), dir, nativeRunner)
const tool = (tools, name) => tools.find(t => t.name === name)

test('native Betterleaks: a documented fake token is redacted; placeholders are ignored; a complete recheck persists the repair', { skip: !engines.betterleaks, timeout: 90000 }, async t => {
  const dir = await fixture(t), tools = toolsAt(dir)
  await writeFile(join(dir, 'token.js'), 'const access_token = "' + token + '";\n')
  await writeFile(join(dir, 'placeholder.js'), 'const access_token = "YOUR_GITHUB_TOKEN";\n')
  const result = await tool(tools, 'secure_scan').execute({ engines: ['betterleaks'] }, {})
  assert.equal(result.complete, true); assert.equal(result.coverage[0].version, '1.9.0')
  assert.ok(result.findings.some(f => f.ruleId === 'betterleaks:github-pat'))
  assert.ok(result.findings.every(f => f.file === 'token.js')); assert.equal(JSON.stringify(result).includes(token), false)
  assert.equal((await readFile(join(dir, '.code-security/state.json'), 'utf8')).includes(token), false)
  await writeFile(join(dir, 'token.js'), 'const access_token = process.env.GITHUB_TOKEN;\n')
  const verified = await tool(tools, 'secure_fix_verify').execute({}, {})
  assert.equal(verified.complete, true); assert.equal(verified.closedCount, result.findings.length); assert.equal(verified.passed, true)
  assert.deepEqual((await tool(tools, 'secure_report').execute({}, {})).findings, [])
})

test('native Semgrep CE: follows a local variable, respects parameterized SQL, and does not trust shadowed DOMPurify', { skip: !engines.semgrep, timeout: 120000 }, async t => {
  const dir = await fixture(t), tools = toolsAt(dir)
  await writeFile(join(dir, 'unsafe.js'), `import {exec} from 'node:child_process';\nexport function route(req, element, db) {\n  const command = req.query.command;\n  exec(command);\n  element.innerHTML = req.body.html;\n  db.query('SELECT * FROM items WHERE id=' + req.query.id);\n}\n`)
  await writeFile(join(dir, 'safe.js'), `import DOMPurify from 'dompurify';\nexport function route(req, element, db) {\n element.innerHTML = DOMPurify.sanitize(req.body.html);\n db.query('SELECT * FROM items WHERE id=?', [req.query.id]);\n}\n`)
  await writeFile(join(dir, 'shadow.js'), `export function route(req, element, DOMPurify) {\n element.innerHTML = DOMPurify.sanitize(req.body.html);\n}\n`)
  const result = await tool(tools, 'secure_scan').execute({ engines: ['semgrep'] }, {})
  assert.equal(result.complete, true, JSON.stringify(result.coverage))
  assert.equal(result.findings.filter(f => f.file === 'unsafe.js').length, 3)
  assert.ok(result.findings.some(f => f.file === 'unsafe.js' && f.line === 4 && f.cwe === 'CWE-78'))
  assert.ok(result.findings.some(f => f.file === 'shadow.js' && f.cwe === 'CWE-79'))
  assert.ok(result.findings.every(f => f.file !== 'safe.js' && f.evidence === 'dataflow'))
})

test('native OSV: resolves a transitive lockfile package against a synthetic offline database, then confirms a fixed version', { skip: !engines.osv, timeout: 90000 }, async t => {
  const dir = await fixture(t), cache = join(dir, 'db-cache'); await localDatabase(cache)
  await nativeRunner.run(['git','init','-q'], { cwd: dir }); await writeFile(join(dir,'.gitignore'),'.code-security/\n')
  const tools = toolsAt(dir, { osvDatabaseDir: cache })
  await writeFile(join(dir, 'package.json'), '{"name":"fixture","version":"1.0.0"}')
  await writeFile(join(dir, 'package-lock.json'), lockfile('1.0.0'))
  const result = await tool(tools, 'secure_deps').execute({ audit: 'offline' }, {})
  assert.equal(result.audited, true, JSON.stringify(result.audit.coverage)); assert.equal(result.passed, false)
  assert.ok(result.audit.vulnerabilities.some(v => v.id === 'DSH-TEST-0001' && v.version === '1.0.0' && v.fixedVersions.includes('1.1.0')))
  await writeFile(join(dir, 'package-lock.json'), lockfile('1.1.0'))
  const fixed = await tool(tools, 'secure_deps').execute({ audit: 'offline' }, {})
  assert.equal(fixed.audited, true); assert.equal(fixed.passed, true); assert.deepEqual(fixed.audit.vulnerabilities, [])
  const health = await tool(tools, 'secure_health').execute({}, {})
  assert.equal(health.database.available, true); assert.equal(health.database.databases[0].ecosystem, 'npm')
  const unavailable = toolsAt(dir, { osvDatabaseDir: join(dir, 'missing-cache') })
  const absent = await tool(unavailable, 'secure_deps').execute({ audit: 'offline' }, {})
  assert.equal(absent.audited, false); assert.equal(absent.passed, false)
  assert.notEqual(absent.audit.coverage.status, 'completed')
  await writeFile(join(dir, 'package-lock.json'), '{broken-lockfile')
  const malformed = await tool(tools, 'secure_deps').execute({ audit: 'offline' }, {})
  assert.equal(malformed.audited, false); assert.equal(malformed.passed, false)
})
