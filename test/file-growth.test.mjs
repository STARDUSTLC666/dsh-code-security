import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanPath, scanDeps, DEFAULT_POLICY } from '../lib/index.js'
import { boundedFile } from '../lib/workspace.js'

const here = path.dirname(fileURLToPath(import.meta.url))
test('source and manifest size limits survive a file growing after directory metadata was read', async t => {
  const directory = await fs.mkdtemp(path.join(here, '.growth-'))
  t.after(async()=>{const rel=path.relative(here,directory);assert.ok(rel.startsWith('.growth-')&&!rel.includes(path.sep));await fs.rm(directory,{recursive:true,force:true})})
  for (const [filename, initial, grown, scan] of [
    ['growing.js','const safe = 1\n','eval(input);\n'.repeat(1000), root=>scanPath({cwd:root,maxFiles:20,maxFileBytes:100,policy:DEFAULT_POLICY})],
    ['package.json','{}',JSON.stringify({dependencies:{'unexpected-package':'*'}, padding:'x'.repeat(1000)}), root=>scanDeps(root,{maxFileBytes:100})],
  ]) {
    const file = path.join(directory,filename); await fs.writeFile(file,initial)
    const original = fs.lstat; let changed=false
    fs.lstat = async function(name,...args){
      const result = await original.call(this,name,...args)
      if(path.resolve(String(name))===file&&!changed){changed=true;await fs.writeFile(file,grown)}
      return result
    }
    let result
    try {result=await scan(directory)} finally {fs.lstat=original}
    assert.equal(changed,true)
    assert.equal(result.complete,false,'a stale size check cannot certify an oversized file')
    assert.equal(result.findings?.length??result.dependencies.length,0)
    await fs.unlink(file)
  }
})

test('bounded reads stop at the byte budget and close their handle on growth or cancellation', async t => {
  const directory = await fs.mkdtemp(path.join(here,'.growth-')), file=path.join(directory,'input.js')
  t.after(async()=>{const rel=path.relative(here,directory);assert.ok(rel.startsWith('.growth-')&&!rel.includes(path.sep));await fs.rm(directory,{recursive:true,force:true})})
  const original = fs.open
  for(const mode of ['growth','cancel']) {
    await fs.writeFile(file,'const safe=1\n')
    let closed=false, size=0, first=true
    const controller = new AbortController(), reason = new Error('caller cancelled')
    fs.open = async function(...args) {
      const handle=await original.apply(this,args), read=handle.read.bind(handle), close=handle.close.bind(handle)
      handle.read=async (...readArgs)=>{
        const value=await read(...readArgs);size+=value.bytesRead
        if(first){first=false;if(mode==='growth')await fs.appendFile(file,'x'.repeat(10000));else controller.abort(reason)}
        return value
      }
      handle.close=async()=>{closed=true;return close()}
      return handle
    }
    try {
      await assert.rejects(boundedFile(file,100,controller.signal), error=>mode==='growth'?error.code==='SCAN_FILE_TOO_LARGE':error===reason)
      assert.equal(closed,true);assert.ok(size<=101)
    } finally {fs.open=original}
  }
})

test('source scanner bounds directory entries and reports partial coverage', async t => {
  const directory = await fs.mkdtemp(path.join(here, '.growth-'))
  t.after(async () => { const rel = path.relative(here, directory); assert.ok(rel.startsWith('.growth-') && !rel.includes(path.sep)); await fs.rm(directory, { recursive: true, force: true }) })
  await fs.writeFile(path.join(directory, 'a.bin'), Buffer.from([0]))
  await fs.writeFile(path.join(directory, 'b.bin'), Buffer.from([0]))
  await fs.writeFile(path.join(directory, 'c.bin'), Buffer.from([0]))
  const result = await scanPath({ cwd: directory, maxFiles: 20, maxEntries: 2, maxFileBytes: 100, policy: DEFAULT_POLICY })
  assert.equal(result.complete, false)
  assert.ok(result.warnings.some(warning => /目录项数量上限/.test(warning)))
})

test('dependency scanner retains incomplete coverage for a missing target', async t => {
  const directory = await fs.mkdtemp(path.join(here, '.growth-'))
  t.after(async () => { const rel = path.relative(here, directory); assert.ok(rel.startsWith('.growth-') && !rel.includes(path.sep)); await fs.rm(directory, { recursive: true, force: true }) })
  const result = await scanDeps(path.join(directory, 'missing'))
  assert.equal(result.complete, false)
  assert.equal(result.filesScanned, 0)
  assert.equal(result.filesSkipped, 1)
  assert.deepEqual(result.dependencies, [])
  assert.ok(result.warnings.some(warning => /无法读取/.test(warning)))
})

async function swapFileAtOpen(file, outside) {
  const original = fs.open
  let replaced = false
  fs.open = async function (name, ...args) {
    if (!replaced && path.resolve(String(name)) === file) {
      replaced = true
      await fs.rename(file, file + '.checked')
      if (process.platform === 'win32') await fs.link(outside, file)
      else await fs.symlink(outside, file)
    }
    return original.apply(this, [name, ...args])
  }
  return () => { fs.open = original; return replaced }
}

test('source scanner rejects an external link substituted at the file-open boundary', async t => {
  const directory = await fs.mkdtemp(path.join(here, '.growth-'))
  t.after(async () => { const rel = path.relative(here, directory); assert.ok(rel.startsWith('.growth-') && !rel.includes(path.sep)); await fs.rm(directory, { recursive: true, force: true }) })
  const workspace = path.join(directory, 'workspace'), file = path.join(workspace, 'source.js'), outside = path.join(directory, 'outside.js')
  await fs.mkdir(workspace); await fs.writeFile(file, 'const safe = true\n'); await fs.writeFile(outside, 'const UNIQUE_EXTERNAL_MARKER = "race-outside-7f23"; eval(input)\n')
  const restore = await swapFileAtOpen(file, outside), documents = []
  let result
  try { result = await scanPath({ cwd: workspace, maxFiles: 20, maxFileBytes: 10000, policy: DEFAULT_POLICY, onDocument: doc => documents.push(doc) }) }
  finally { assert.equal(restore(), true, 'race fixture must substitute the file when the reader opens it') }
  assert.equal(result.complete, false)
  assert.deepEqual(result.findings, [])
  assert.equal(JSON.stringify(documents).includes('race-outside-7f23'), false)
})

test('dependency scanner rejects an external manifest substituted at the file-open boundary', async t => {
  const directory = await fs.mkdtemp(path.join(here, '.growth-'))
  t.after(async () => { const rel = path.relative(here, directory); assert.ok(rel.startsWith('.growth-') && !rel.includes(path.sep)); await fs.rm(directory, { recursive: true, force: true }) })
  const workspace = path.join(directory, 'workspace'), file = path.join(workspace, 'package.json'), outside = path.join(directory, 'outside-package.json')
  await fs.mkdir(workspace); await fs.writeFile(file, '{}'); await fs.writeFile(outside, JSON.stringify({ dependencies: { 'race-outside-7f23': '*' } }))
  const restore = await swapFileAtOpen(file, outside)
  let result
  try { result = await scanDeps(workspace) }
  finally { assert.equal(restore(), true, 'race fixture must substitute the manifest when the reader opens it') }
  assert.equal(result.complete, false)
  assert.equal(result.filesScanned, 0)
  assert.equal(result.filesSkipped, 1)
  assert.equal(result.dependencies.some(dep => dep.name === 'race-outside-7f23'), false)
})

test('source scanner rejects an external directory substituted when traversal opens it', async t => {
  const directory = await fs.mkdtemp(path.join(here, '.growth-'))
  t.after(async () => { const rel = path.relative(here, directory); assert.ok(rel.startsWith('.growth-') && !rel.includes(path.sep)); await fs.rm(directory, { recursive: true, force: true }) })
  const workspace = path.join(directory, 'workspace'), outside = path.join(directory, 'outside')
  await fs.mkdir(workspace); await fs.mkdir(outside); await fs.writeFile(path.join(outside, 'source.js'), 'eval(input)\n')
  const original = fs.opendir; let replaced = false
  fs.opendir = async function (name, ...args) {
    if (!replaced && path.resolve(String(name)) === workspace) {
      replaced = true
      await fs.rename(workspace, workspace + '.checked')
      await fs.symlink(outside, workspace, process.platform === 'win32' ? 'junction' : 'dir')
    }
    return original.apply(this, [name, ...args])
  }
  let result
  try { result = await scanPath({ cwd: workspace, maxFiles: 20, maxFileBytes: 10000, policy: DEFAULT_POLICY }) }
  finally { fs.opendir = original; assert.equal(replaced, true, 'race fixture must substitute the directory during traversal') }
  assert.equal(result.complete, false)
  assert.deepEqual(result.findings, [])
})
