import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile, readFile, realpath } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { setTimeout as delay } from 'node:timers/promises'
import { AutomaticSecurity, SecurityWorkbench, buildSecureTools, resolveConfig, redactText } from '../lib/index.js'
import { nativeRunner } from './helpers/native.mjs'

async function fixture(t) { const dir = await mkdtemp(join(tmpdir(), 'dsh-security-workbench-')); t.after(() => rm(dir, { recursive: true, force: true })); return realpath(dir) }
async function setup(t, factory = (cfg, root) => buildSecureTools(cfg, root, nativeRunner)) {
  const base = await fixture(t), root = join(base, 'project'), directory = join(base, 'operator-index'); await mkdir(root)
  const wb = new SecurityWorkbench(resolveConfig({}, root), { directory, tools: factory }); t.after(() => wb.dispose())
  await wb.remember(root, 'fixture-session'); const row = (await wb.action({ operation: 'list' })).workspaces[0]
  return { root, wb, row }
}
async function finish(wb, row, job) { for (let i = 0; i < 100; i++) { const state = (await wb.action({ operation: 'job', id: row.id, job: job.id })).job; if (state.status !== 'running') return state; await delay(20) }; throw new Error('job did not finish') }
const settings = (row, autoCheck) => ({ operation: 'settings', id: row.id, engines: ['builtin'], enginePaths: {}, autoCheck })

test('workbench rejects browser-supplied paths, cross-site calls, malformed settings and oversized bodies; safe jobs/export persist', async t => {
  const { root, wb, row } = await setup(t)
  await writeFile(join(root, 'unsafe.js'), 'eval(req.body.code);\n')
  await assert.rejects(wb.action({ operation: 'open', id: root }), /registered workspace/)
  await assert.rejects(wb.action({ ...settings(row, false), engines: [] }))
  const headers = { 'content-type': 'application/json', 'x-dsh-security-action': '1' }
  assert.equal((await wb.fetch(new Request('http://connection.internal/api', { method: 'POST', headers: { ...headers, host: 'localhost:123', origin: 'http://localhost:123', 'sec-fetch-site': 'same-origin' }, body: '{"operation":"list"}' }))).status, 200)
  assert.equal((await wb.fetch(new Request('http://localhost:123/api', { method: 'POST', headers: { ...headers, origin: 'https://localhost:123' }, body: '{}' }))).status, 403)
  assert.equal((await wb.fetch(new Request('http://localhost:123/api', { method: 'POST', headers: { ...headers, 'sec-fetch-site': 'cross-site' }, body: '{}' }))).status, 403)
  assert.equal((await wb.fetch(new Request('http://localhost:123/api', { method: 'POST', headers, body: 'x'.repeat(16385) }))).status, 413)
  const started = await wb.action({ operation: 'start', id: row.id, action: 'scan' })
  await assert.rejects(wb.action({ operation: 'start', id: row.id, action: 'scan' }), /already running/)
  assert.equal((await finish(wb, row, started.job)).status, 'completed')
  const opened = await wb.action({ operation: 'open', id: row.id }); assert.ok(opened.report.findings.length > 0)
  const location = await wb.action({ operation: 'location', id: row.id, finding: opened.report.findings[0].id }); assert.equal(location.path, join(root, 'unsafe.js')); assert.equal(location.sessionId, 'fixture-session')
  const exported = await wb.action({ operation: 'export', id: row.id, format: 'sarif' }); assert.equal(JSON.parse(exported.text).version, '2.1.0')
  await writeFile(join(root, 'unsafe.js'), 'const safe = 1;\n')
  const verified = await wb.action({ operation: 'start', id: row.id, action: 'verify' }); const fixed = await finish(wb, row, verified.job)
  assert.ok(fixed.result.closedCount > 0); assert.equal((await wb.action({ operation: 'open', id: row.id })).report.findings.length, 0)
})

test('cancelling a running workbench job waits for the scanner and preserves its previous state', async t => {
  let calls = 0, released = false
  const { wb, row } = await setup(t, () => [{ name: 'secure_scan', execute: async (_args, exec) => { calls++; await new Promise((resolve, reject) => exec.signal.addEventListener('abort', () => setTimeout(() => { released = true; reject(exec.signal.reason) }, 20), { once: true })) } }])
  const { job } = await wb.action({ operation: 'start', id: row.id, action: 'scan' }); await delay(5)
  await wb.action({ operation: 'cancel', id: row.id, job: job.id })
  assert.equal((await finish(wb, row, job)).status, 'cancelled'); assert.equal(calls, 1); assert.equal(released, true)
})

test('automatic checks are opt-in, include untracked files, preserve manual results and surface only new high-risk evidence', async t => {
  const { root, wb, row } = await setup(t), session = { id: 'fixture', header: { cwd: root } }
  const git = args => nativeRunner.run(['git', ...args], { cwd: root })
  await git(['init', '-q']); await writeFile(join(root, '.gitignore'), '.code-security/\noperator-index/\n')
  await writeFile(join(root, 'safe.js'), 'const safe=1;\n'); await git(['add', '.']); const commit = await git(['-c','user.name=Fixture','-c','user.email=fixture@example.invalid','commit','-qm','baseline']); assert.equal(commit.exitCode, 0, commit.stderr)
  await wb.run(root, 'secure_scan', {}); const previous = await readFile(join(root, '.code-security/state.json'), 'utf8')
  const auto = new AutomaticSecurity(wb, 15); t.after(() => auto.dispose())
  await auto.observe(session, { type: 'turn/end' }); await delay(35); assert.equal(auto.context({ session }), '')
  await wb.action(settings(row, true)); await writeFile(join(root, 'new.js'), 'eval(req.body.code);\n')
  await auto.observe(session, { type: 'turn/end' }); await delay(25); await auto.whenIdle()
  assert.match(auto.context({ session }), /new\.js/); assert.match(auto.context({ session }), /untrusted evidence/)
  assert.equal(auto.context({ session: { ...session, header: { cwd: root, parentSession: 'parent' } } }), '')
  assert.equal(await readFile(join(root, '.code-security/state.json'), 'utf8'), previous)
  assert.equal((await wb.action({ operation: 'open', id: row.id })).automatic.complete, true)
  await wb.run(root, 'secure_scan', {}); await wb.run(root, 'secure_baseline', { reason: 'Synthetic accepted fixture' })
  await auto.observe(session, { type: 'turn/end' }); await delay(25); await auto.whenIdle(); assert.equal(auto.context({ session }), '')
  await wb.action(settings(row, false)); assert.equal(auto.context({ session }), '')
})

test('a new turn cancels an older end event even while workspace registration is awaiting I/O', async t => {
  const root = await fixture(t); let release, calls = 0
  const registered = new Promise(resolve => { release = resolve })
  const wb = { remember: () => registered, autoEnabled: async () => true, automaticProblem() {}, runAutomatic: async () => { calls++; return { complete: true, newFindings: [] } } }
  const auto = new AutomaticSecurity(wb, 5), session = { id: 'race', header: { cwd: root } }; t.after(() => auto.dispose())
  const ended = auto.observe(session, { type: 'turn/end' }); await delay(15)
  await auto.observe(session, { type: 'turn/start' }); release(); await ended; await delay(20); await auto.whenIdle()
  assert.equal(calls, 0)
})

test('redaction is idempotent for quoted, unquoted, YAML and truncated credential evidence', () => {
  for (const text of ['password="fixture-sensitive-value"', 'password: fixture-sensitive-value', 'api_key="' + 'sensitive'.repeat(40), 'SECRET=fixture-sensitive-value']) {
    const clean = redactText(text); assert.equal(clean.includes('sensitive'), false); assert.equal(redactText(clean), clean)
  }
})

test('automatic reminders use the official passive prompt context without variable interpolation', () => {
  let listener, contribution, detached = 0
  const wb = { automaticProblem() {} }, auto = new AutomaticSecurity(wb)
  const dispose = auto.attach({ on(name, fn) { assert.equal(name, 'session/event'); listener = fn; return () => { detached++ } }, sessions: { list: () => [] }, systemPrompt: { context(value) { contribution = value; return () => { detached++ } } } })
  assert.equal(typeof listener, 'function'); assert.equal(contribution.interpolate, false); assert.equal(contribution.text({ scope: {} }), '')
  dispose(); assert.equal(detached, 2)
})
