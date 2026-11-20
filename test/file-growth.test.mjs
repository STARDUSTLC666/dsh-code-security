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
