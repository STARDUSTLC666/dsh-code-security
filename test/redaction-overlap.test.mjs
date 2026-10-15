import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { buildSecureTools, resolveConfig, redactText } from '../lib/index.js'

test('a secret reported by one rule is also removed from overlapping injection evidence, state, baseline and exports', async t => {
  const dir = await mkdtemp(join(tmpdir(), 'dsh-overlap-')); t.after(() => rm(dir, { recursive: true, force: true }))
  const value = 'qR7sU9vW1xY3zA5bC7dE9fG1hI3jK5lM7nO9'
  await writeFile(join(dir,'input.js'), 'eval("' + value + '" + req.body.code);\n')
  const tools = buildSecureTools(resolveConfig({},dir),dir,{ async run() { throw new Error('No process expected') } }), run = (name,args={}) => tools.find(t=>t.name===name).execute(args,{})
  const scan = await run('secure_scan'); assert.ok(scan.findings.some(f=>f.ruleId==='SEC-001')); assert.ok(scan.findings.some(f=>f.ruleId==='SEC-304'))
  const baseline = await run('secure_baseline',{reason:'Synthetic overlapping evidence'}), report = await run('secure_report')
  for (const result of [scan,baseline,report,await run('secure_export',{format:'sarif'}),await run('secure_export',{format:'markdown'})]) assert.equal(JSON.stringify(result).includes(value),false)
  assert.equal((await readFile(join(dir,'.code-security/state.json'),'utf8')).includes(value),false)
  for (const text of ['exec("'+value+'"+input)','exec("'+value]) { const clean=redactText(text);assert.equal(clean.includes(value),false);assert.equal(redactText(clean),clean) }
})
