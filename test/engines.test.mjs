import {test} from 'node:test'
import assert from 'node:assert/strict'
import {mkdtemp,writeFile,readFile,readdir,rm,access} from 'node:fs/promises'
import {resolve,join,relative} from 'node:path'
import {spawnSync} from 'node:child_process'
import {resolveConfig,buildSecureTools,createSubprocessRunner} from '../lib/index.js'
import {scanExternal,auditDependencies} from '../lib/engines.js'

const root=resolve('test'),secret='ghp_aB3dE5fG7hI9jK1mN3pQ5rS7tU9vW1xY3zA5'
async function fixture(t){const dir=await mkdtemp(join(root,'.engines-'));t.after(async()=>{assert.ok(!relative(root,dir).startsWith('..'));await rm(dir,{recursive:true,force:true})});return dir}
function fake(scan){return {async run(argv,options){if(argv.includes('version')||argv.includes('--version'))return{exitCode:0,signal:null,stdout:argv[0]==='osv-scanner'?'osv-scanner version: 2.7.0':'1.9.0',stderr:''};return scan(argv,options)}}}
const ok=value=>({exitCode:0,signal:null,stdout:JSON.stringify(value),stderr:''})
const leak=(file,line=1)=>({File:file,RuleID:'github-pat',Description:'GitHub token',StartLine:line,EndLine:line,Secret:secret,Match:secret,Attributes:{confidence:'high'}})

test('Betterleaks uses isolated files, explicit config, no validation, redacted output and cleans its snapshot',async t=>{
 const dir=await fixture(t),cfg=resolveConfig({},dir);let snapshot
 const runner=fake(async(argv,options)=>{snapshot=argv[2];assert.ok(argv.includes('--validation=false'));assert.ok(argv.includes('--redact=100'));assert.ok(argv.includes('--config'));assert.ok(options.signal);const file=join(snapshot,'a.js');assert.match(await readFile(file,'utf8'),/ghp_/);return ok([leak(file)])})
 const result=await scanExternal('betterleaks',[{file:'a.js',text:'const token="'+secret+'"'}],cfg,runner)
 assert.equal(result.coverage.status,'completed');assert.equal(result.findings.length,1);assert.equal(JSON.stringify(result).includes(secret),false);await assert.rejects(access(snapshot))
})
test('bad or truncated reports and foreign locations never become a successful scan',async t=>{
 const dir=await fixture(t),cfg=resolveConfig({},dir)
 for(const value of ['{broken','{}','null',JSON.stringify([leak('C:/foreign.js')])]){
  const result=await scanExternal('betterleaks',[{file:'a.js',text:'safe'}],cfg,fake(async()=>({exitCode:0,signal:null,stdout:value,stderr:''})))
  assert.notEqual(result.coverage.status,'completed');assert.deepEqual(result.findings,[])
 }
})
test('external diff results are restricted to added lines, including a multi-line match',async t=>{
 const dir=await fixture(t),cfg=resolveConfig({},dir)
 const result=await scanExternal('betterleaks',[{file:'a.js',text:'one\ntwo\nthree',selectedLines:new Set([3])}],cfg,fake(async argv=>ok([leak(join(argv[2],'a.js'),1),{...leak(join(argv[2],'a.js'),2),EndLine:3}])))
 assert.deepEqual(result.findings.map(f=>f.line),[2]);assert.equal(result.coverage.status,'completed')
})
test('missing engines and malformed arguments cannot produce a clean verdict',async t=>{
 const dir=await fixture(t);await writeFile(join(dir,'a.js'),'const n=1')
 const runner={async run(){throw Object.assign(new Error('not found'),{code:'ENOENT'})}},tools=buildSecureTools(resolveConfig({},dir),dir,runner),scan=tools.find(t=>t.name==='secure_scan')
 const value=await scan.execute({engines:['builtin','betterleaks']},{})
 assert.equal(value.passed,false);assert.equal(value.complete,false);assert.equal(value.coverage.find(c=>c.engine==='betterleaks').status,'not-installed')
 const before=await readFile(join(dir,'.code-security/state.json'),'utf8')
 for(const engines of [[],['builtin','builtin'],['unknown'],'betterleaks'])await assert.rejects(scan.execute({engines},{}),/engines/)
 assert.equal(await readFile(join(dir,'.code-security/state.json'),'utf8'),before)
})
test('cancelled external scans settle before snapshot cleanup and never replace prior state',async t=>{
 const dir=await fixture(t),cfg=resolveConfig({},dir);await writeFile(join(dir,'a.js'),'const safe=1')
 let startedResolve;const started=new Promise(r=>startedResolve=r)
 const runner=fake(async(_argv,options)=>{startedResolve();await new Promise((_resolve,reject)=>options.signal.addEventListener('abort',()=>reject(options.signal.reason),{once:true}));throw new Error('unreachable')})
 const tools=buildSecureTools(cfg,dir,runner),scan=tools.find(t=>t.name==='secure_scan')
 await scan.execute({},{});const before=await readFile(join(dir,'.code-security/state.json'),'utf8'),ctl=new AbortController()
 const pending=scan.execute({engines:['betterleaks']},{signal:ctl.signal});await started;ctl.abort(new Error('fixture cancelled'));await assert.rejects(pending,/fixture cancelled/)
 assert.equal(await readFile(join(dir,'.code-security/state.json'),'utf8'),before);assert.deepEqual(await readdir(join(dir,'.code-security/engine-tmp')),[])
})
test('a failed recheck does not mark previously detected findings as closed',async t=>{
 const dir=await fixture(t);await writeFile(join(dir,'a.js'),'const access_token="'+secret+'"')
 let unavailable=false
 const runner={async run(argv,options){if(unavailable)throw Object.assign(new Error('ENOENT'),{code:'ENOENT'});return fake(async argv=>ok([leak(join(argv[2],'a.js'))])).run(argv,options)}}
 const tools=buildSecureTools(resolveConfig({},dir),dir,runner)
 await tools.find(t=>t.name==='secure_scan').execute({engines:['betterleaks']},{})
 unavailable=true;const result=await tools.find(t=>t.name==='secure_fix_verify').execute({},{})
 assert.equal(result.passed,false);assert.equal(result.complete,false);assert.equal(result.closedCount,0);assert.equal(result.unverified.length,1)
})
test('OSV inventory carries vulnerability IDs, fixed versions and actual resolved package versions',async t=>{
 const dir=await fixture(t),cfg=resolveConfig({},dir)
 const runner=fake(async argv=>ok({results:[{source:{path:join(argv.at(-1),'package-lock.json')},packages:[{package:{name:'demo',version:'1.0.0',ecosystem:'npm'},vulnerabilities:[{id:'TEST-1',aliases:['CVE-TEST'],summary:'Synthetic advisory',affected:[{package:{name:'demo',ecosystem:'npm'},ranges:[{events:[{introduced:'0'},{fixed:'1.1.0'}]}]}]}]}]}]}))
 const result=await auditDependencies([{file:'package-lock.json',text:'{}'}],'offline',cfg,runner)
 assert.equal(result.coverage.status,'completed');assert.equal(result.packagesScanned,1);assert.equal(result.vulnerabilities[0].version,'1.0.0');assert.deepEqual(result.vulnerabilities[0].fixedVersions,['1.1.0'])
})
test('staged enhanced scans read the index rather than a safer working-tree replacement',async t=>{
 const dir=await fixture(t)
 const git=(...args)=>{const result=spawnSync('git',args,{cwd:dir,encoding:'utf8'});assert.equal(result.status,0,result.stderr);return result.stdout}
 git('init','-q');await writeFile(join(dir,'a.js'),'const safe=1\n');git('add','.');git('-c','user.name=Fixture','-c','user.email=fixture@example.invalid','commit','-qm','baseline')
 await writeFile(join(dir,'a.js'),'const safe=1\nconst access_token="'+secret+'"\n');git('add','a.js');await writeFile(join(dir,'a.js'),'const safe=1\n')
 const runner={async run(argv,options){if(argv[0]==='git'){const r=spawnSync('git',argv.slice(1),{cwd:options.cwd,encoding:'utf8'});return{exitCode:r.status,signal:null,stdout:r.stdout,stderr:r.stderr}}return fake(async argv=>{const file=join(argv[2],'a.js');assert.match(await readFile(file,'utf8'),/ghp_/);return ok([leak(file,1),leak(file,2)])}).run(argv,options)}}
 const tools=buildSecureTools(resolveConfig({},dir),dir,runner),result=await tools.find(t=>t.name==='secure_diff').execute({staged:true,engines:['betterleaks']},{})
 assert.equal(result.complete,true);assert.deepEqual(result.findings.map(f=>f.line),[2]);assert.equal(JSON.stringify(result).includes(secret),false)
})
