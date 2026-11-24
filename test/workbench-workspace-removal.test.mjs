import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { SecurityWorkbench, SECURITY_WORKBENCH_ROUTE } from '../lib/workbench.js'
import { resolveConfig } from '../lib/config.js'

const post = body => new Request('http://dsh.internal' + SECURITY_WORKBENCH_ROUTE, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'x-dsh-security-action': '1',
    origin: 'http://127.0.0.1:8181',
    host: '127.0.0.1:8181',
  },
  body: JSON.stringify(body),
})

test('deleted or moved workspace disappears on list and returns 404 workspace_missing on stale open', async () => {
  const base = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-sec-missing-'))
  try {
    const storeDir = path.join(base, 'store')
    const ws = path.join(base, 'repo-a')
    await fs.mkdir(ws, { recursive: true })
    await fs.writeFile(path.join(ws, 'app.js'), 'console.log(1)\n')

    const wb = new SecurityWorkbench(resolveConfig({}), { directory: storeDir, tools: () => [] })
    await wb.remember(ws)
    const listed1 = await wb.action({ operation: 'list' })
    assert.equal(listed1.workspaces.length, 1)
    const id = listed1.workspaces[0].id

    // Delete the workspace folder on disk
    await fs.rm(ws, { recursive: true, force: true })

    // Refresh hides it automatically
    const listed2 = await wb.action({ operation: 'list' })
    assert.deepEqual(listed2.workspaces, [])

    // Stale open returns structured 404 workspace_missing instead of raw ENOENT
    const stale = await wb.fetch(post({ operation: 'open', id }))
    assert.equal(stale.status, 404)
    const payload = await stale.json()
    assert.equal(payload.code, 'workspace_missing')
    assert.match(payload.message, /移动或删除/)
  } finally {
    await fs.rm(base, { recursive: true, force: true })
  }
})

test('remove-workspace deletes only the workbench entry, disables autoCheck, and keeps files on disk', async () => {
  const base = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-sec-remove-'))
  try {
    const storeDir = path.join(base, 'store')
    const wsA = path.join(base, 'repo-a')
    const wsB = path.join(base, 'repo-b')
    await fs.mkdir(wsA, { recursive: true })
    await fs.mkdir(wsB, { recursive: true })
    const fileA = path.join(wsA, 'keep.ts')
    await fs.writeFile(fileA, 'export const ok = true\n')

    const autoEvents = []
    const wb = new SecurityWorkbench(resolveConfig({}), { directory: storeDir, tools: () => [] })
    wb.onAutoChanged = (root, enabled) => autoEvents.push({ root, enabled })

    await wb.remember(wsA)
    await wb.remember(wsB)
    const listed = await wb.action({ operation: 'list' })
    assert.equal(listed.workspaces.length, 2)
    const entryA = listed.workspaces.find(w => w.label === 'repo-a')
    assert.ok(entryA)

    const res = await wb.fetch(post({ operation: 'remove-workspace', id: entryA.id }))
    assert.equal(res.status, 200)
    const body = await res.json()
    assert.equal(body.removed, true)
    assert.deepEqual(body.workspaces.map(w => w.label), ['repo-b'])
    assert.ok(autoEvents.some(e => e.root === entryA.root && e.enabled === false))
    assert.equal(existsSync(fileA), true)

    // Persists across reload and can be re-registered later
    const reopened = new SecurityWorkbench(resolveConfig({}), { directory: storeDir, tools: () => [] })
    assert.deepEqual((await reopened.action({ operation: 'list' })).workspaces.map(w => w.label), ['repo-b'])
    await reopened.remember(wsA)
    assert.equal((await reopened.action({ operation: 'list' })).workspaces.length, 2)
  } finally {
    await fs.rm(base, { recursive: true, force: true })
  }
})
