import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { dirname, join, relative, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadState, saveState, saveBaseline } from '../lib/state.js'
import lockfile from 'proper-lockfile'

const root = dirname(fileURLToPath(import.meta.url))
const counts = { critical: 0, high: 0, medium: 0, low: 0 }
const entry = i => ({ mode: 'scan', target: 'workspace-' + i, time: new Date().toISOString(), filesScanned: 1, findings: [], fingerprints: [], counts })
async function fixture(t) {
  const dir = await mkdtemp(join(root, '.state-'))
  t.after(async () => { const rel = relative(root, dir); assert.ok(rel && !rel.startsWith('..') && !isAbsolute(rel)); await rm(dir, { recursive: true, force: true }) })
  return join(dir, 'state')
}
test('并发扫描与基线写入不丢失历史或基线', async t => {
  const dir = await fixture(t), baseline = { time: new Date().toISOString(), target: '.', reason: 'fixture', findings: [], fingerprints: [], counts }
  await Promise.all([...Array.from({ length: 12 }, (_, i) => saveState(dir, entry(i))), saveBaseline(dir, baseline)])
  const state = await loadState(dir)
  assert.equal(state.history.length, 12)
  assert.equal(new Set(state.history.map(item => item.target)).size, 12)
  assert.deepEqual(state.baseline, baseline)
})
test('损坏记录不被新扫描或基线覆盖', async t => {
  const dir = await fixture(t); await mkdir(dir, { recursive: true })
  for (const bytes of ['{broken', '{"history":"not an array","last":null}', '{"history":[{"findings":[]}],"last":null}']) {
    await writeFile(join(dir, 'state.json'), bytes)
    await assert.rejects(saveState(dir, entry(1)), /原文件已保留/)
    await assert.rejects(saveBaseline(dir, { time: '', target: '.', reason: '', findings: [], fingerprints: [], counts }), /原文件已保留/)
    assert.equal(await readFile(join(dir, 'state.json'), 'utf8'), bytes)
  }
})

test('等待另一个写入者期间取消，不追加历史或覆盖原记录', async t => {
  const dir = await fixture(t); await saveState(dir, entry(1))
  const before = await readFile(join(dir, 'state.json'), 'utf8'), unlock = await lockfile.lock(dir)
  const controller = new AbortController(), pending = saveState(dir, entry(2), controller.signal)
  const rejection = assert.rejects(pending, /cancel waiting writer/)
  controller.abort(new Error('cancel waiting writer')); await unlock(); await rejection
  assert.equal(await readFile(join(dir, 'state.json'), 'utf8'), before)
})
