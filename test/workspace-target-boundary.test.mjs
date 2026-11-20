import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, symlink, rm, realpath } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildSecureTools, resolveConfig } from '../lib/index.js'

const testRoot = path.dirname(fileURLToPath(import.meta.url))
async function fixture(t) {
  const directory = await mkdtemp(path.join(testRoot, '.boundary-'))
  const workspace = path.join(directory, 'workspace'), outside = path.join(directory, 'outside'), host = path.join(directory, 'host')
  await Promise.all([mkdir(workspace), mkdir(outside), mkdir(host)])
  await writeFile(path.join(workspace, 'inside.js'), 'eval(input)\n')
  await writeFile(path.join(workspace, '..settings.js'), 'const value = 1\n')
  await writeFile(path.join(workspace, 'package.json'), JSON.stringify({dependencies:{'inside-package':'1.0.0'}}))
  await writeFile(path.join(outside, 'private.js'), 'eval(input)\n')
  await writeFile(path.join(outside, 'package.json'), JSON.stringify({dependencies:{'outside-package':'*'}}))
  await symlink(outside, path.join(workspace, 'external'), process.platform === 'win32' ? 'junction' : 'dir')
  t.after(async () => {
    const relative = path.relative(await realpath(testRoot), await realpath(directory))
    assert.ok(relative.startsWith('.boundary-') && !relative.includes(path.sep))
    await rm(directory, {recursive:true, force:true})
  })
  const tools = buildSecureTools(resolveConfig({}, host), host, {async run(){throw new Error('unexpected subprocess')}})
  const exec = {agent:{session:{header:{cwd:workspace}}}}
  return {workspace, outside, call:(name, args) => tools.find(tool=>tool.name===name).execute(args, exec)}
}

test('production scan and dependency tools reject outside targets and ancestor junctions before replacing state', async t => {
  const {workspace, outside, call} = await fixture(t)
  await call('secure_scan', {target:'inside.js'})
  const stateFile = path.join(workspace, '.code-security', 'state.json'), before = await readFile(stateFile, 'utf8')
  for (const [tool, filename] of [['secure_scan','private.js'], ['secure_deps','package.json']]) {
    for (const target of ['../outside/' + filename, path.join(outside, filename), 'external/' + filename]) {
      await assert.rejects(call(tool, {target}), /workspace|工作区|链接/i)
      assert.equal(await readFile(stateFile, 'utf8'), before)
    }
  }
})

test('workspace targets retain absolute, dot and normalized path compatibility', async t => {
  const {workspace, call} = await fixture(t)
  for (const target of [path.join(workspace, 'inside.js'), './inside.js', 'unused/../inside.js']) {
    const result = await call('secure_scan', {target})
    assert.equal(result.filesScanned, 1); assert.equal(result.findings.length, 1)
  }
  assert.equal((await call('secure_scan', {target:'..settings.js'})).filesScanned, 1)
  const all = await call('secure_scan', {target:'.'})
  assert.equal(all.filesScanned, 3); assert.ok(all.findings.every(f=>!f.file.startsWith('external/')))
  const inventory = await call('secure_deps', {target:path.join(workspace, 'package.json')})
  assert.deepEqual(inventory.dependencies.map(dep=>dep.name), ['inside-package'])
})
