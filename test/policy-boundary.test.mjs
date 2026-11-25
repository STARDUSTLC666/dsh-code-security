import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadPolicy, normalizePolicy, savePolicy } from '../lib/policy.js'

const here = path.dirname(fileURLToPath(import.meta.url))

async function fixture(t) {
  const directory = await fs.mkdtemp(path.join(here, '.policy-boundary-'))
  t.after(async () => {
    const relative = path.relative(here, directory)
    assert.ok(relative.startsWith('.policy-boundary-') && !relative.includes(path.sep))
    await fs.rm(directory, { recursive: true, force: true })
  })
  return directory
}

test('policy loading rejects oversized files without reading their contents', async t => {
  const root = await fixture(t)
  const file = path.join(root, '.code-security.json')
  await fs.writeFile(file, Buffer.alloc(256 * 1024 + 1, 0x20))
  const original = fs.open
  let bytesRead = 0
  fs.open = async (...args) => {
    const handle = await original.apply(fs, args)
    const read = handle.read.bind(handle)
    handle.read = async (...readArgs) => {
      const result = await read(...readArgs)
      bytesRead += result.bytesRead
      return result
    }
    return handle
  }
  try {
    await assert.rejects(loadPolicy(root), /超过大小上限|exceeds the size limit/)
    assert.equal(bytesRead, 0)
  } finally {
    fs.open = original
  }
})

test('oversized policy writes preserve the previous readable policy', async t => {
  const root = await fixture(t)
  const previous = normalizePolicy({ exclude: ['vendor/**'] })
  const file = await savePolicy(root, previous)
  const before = await fs.readFile(file, 'utf8')
  const oversized = normalizePolicy({ ignore: [{ ruleId: 'SEC-001', reason: 'x'.repeat(300000) }] })
  await assert.rejects(savePolicy(root, oversized), /256 KiB/)
  assert.equal(await fs.readFile(file, 'utf8'), before)
  assert.deepEqual(await loadPolicy(root), previous)
})

test('policy loading rejects an external symbolic link', async t => {
  const directory = await fixture(t)
  const root = path.join(directory, 'workspace')
  const outside = path.join(directory, 'outside-policy.json')
  await fs.mkdir(root)
  await fs.writeFile(outside, JSON.stringify({ exclude: ['**'] }))
  try {
    await fs.symlink(outside, path.join(root, '.code-security.json'), 'file')
  } catch (error) {
    if (['EPERM', 'EACCES', 'ENOTSUP'].includes(error.code)) return t.skip('file symlinks are unavailable on this host')
    throw error
  }
  await assert.rejects(loadPolicy(root), /符号链接|symlink/i)
})

test('policy loading rejects an external file substituted at the open boundary', async t => {
  const directory = await fixture(t)
  const root = path.join(directory, 'workspace')
  const file = path.join(root, '.code-security.json')
  const outside = path.join(directory, 'outside-policy.json')
  await fs.mkdir(root)
  await fs.writeFile(file, JSON.stringify({ exclude: [] }))
  await fs.writeFile(outside, JSON.stringify({ exclude: ['**'] }))
  const original = fs.open
  let replaced = false
  fs.open = async (name, ...args) => {
    if (!replaced && path.resolve(String(name)) === file) {
      replaced = true
      await fs.rename(file, file + '.checked')
      if (process.platform === 'win32') await fs.link(outside, file)
      else await fs.symlink(outside, file)
    }
    return original.apply(fs, [name, ...args])
  }
  try {
    await assert.rejects(loadPolicy(root), /变化|changed|outside|工作区|ELOOP/i)
    assert.equal(replaced, true)
  } finally {
    fs.open = original
  }
})
