import {test} from 'node:test'
import assert from 'node:assert/strict'
import {mkdtemp,writeFile,readFile,symlink,mkdir,rm} from 'node:fs/promises'
import {join,resolve,relative} from 'node:path'
import {scanText,scanDeps,resolveConfig,buildSecureTools,loadState,splitByBaseline} from '../lib/index.js'
import {DEFAULT_POLICY} from '../lib/policy.js'

const root=resolve('test'),secret='SYNTHETIC_aB12cD34eF56gH78iJ90kL12'
const runner={async run(){throw new Error('No process execution expected')}}
async function fixture(t){const dir=await mkdtemp(join(root,'.privacy-'));t.after(async()=>{assert.ok(!relative(root,dir).startsWith('..'));await rm(dir,{recursive:true,force:true})});return dir}

test('tool values, persisted history, baseline and exports never echo synthetic credentials',async t=>{
 const dir=await fixture(t);await writeFile(join(dir,'input.js'),'const api_key = "'+secret+'";\n')
 const tools=buildSecureTools(resolveConfig({},dir),dir,runner),call=(name,args={})=>tools.find(t=>t.name===name).execute(args,{})
 const scan=await call('secure_scan'),base=await call('secure_baseline',{reason:'approved fixture'})
 for(const value of [scan,base,await call('secure_report'),await call('secure_export'),await call('secure_fix_verify')])assert.equal(JSON.stringify(value).includes(secret),false)
 assert.equal((await readFile(join(dir,'.code-security/state.json'),'utf8')).includes(secret),false)
 const again=await call('secure_scan');assert.equal(again.newFindings.length,0);assert.ok(again.acceptedFindings.length)
})
test('legacy raw history is scrubbed atomically while preserving acceptance across line shifts',async t=>{
 const dir=await fixture(t),stateDir=join(dir,'state');await mkdir(stateDir)
 const row={id:'old',ruleId:'SEC-302',title:'key',cwe:'CWE-798',severity:'high',confidence:'medium',file:'./a.js',line:1,snippet:'const api_key = "'+secret+'";',message:'fixture'}
 const counts={critical:0,high:1,medium:0,low:0},entry={mode:'scan',target:'.',time:'fixture',filesScanned:1,findings:[row],fingerprints:['old'],counts}
 await writeFile(join(stateDir,'state.json'),JSON.stringify({last:entry,history:[entry],baseline:{...entry,reason:'accepted'}}))
 const states=await Promise.all([loadState(stateDir),loadState(stateDir)])
 assert.equal((await readFile(join(stateDir,'state.json'),'utf8')).includes(secret),false)
 const current=scanText('\n\n'+row.snippet,'a.js','a.js',DEFAULT_POLICY).filter(f=>f.ruleId==='SEC-302')
 assert.equal(splitByBaseline(current,states[0].baseline).fresh.length,0)
 assert.equal(states[0].history.length,1)
})
test('Python PEP621 extras/groups and Poetry are parsed by TOML, not header regex',async t=>{
 const dir=await fixture(t)
 await writeFile(join(dir,'pyproject.toml'),'[project]\nname="fixture"\ndependencies=["requests==2.31.0", "rich>=13; python_version>=\'3.10\'"]\n[project.optional-dependencies]\nweb=["flask[async]>=3"]\n[dependency-groups]\ndev=["pytest==8.3.0"]\n[tool.poetry.dependencies]\npython="^3.11"\nhttpx={version="^0.28",optional=true}\n')
 const result=await scanDeps(dir);assert.equal(result.complete,true);assert.deepEqual(result.dependencies.map(d=>d.name).sort(),['flask','httpx','pytest','requests','rich']);assert.equal(result.dependencies.find(d=>d.name==='requests').risk,'exact')
})
test('malformed manifests and dynamic Python dependencies are incomplete rather than silently clean',async t=>{
 const dir=await fixture(t);await writeFile(join(dir,'package.json'),'{invalid');await writeFile(join(dir,'pyproject.toml'),'[project]\ndynamic=["dependencies"]\n')
 const result=await scanDeps(dir);assert.equal(result.complete,false);assert.equal(result.warnings.length,2)
 assert.equal(JSON.stringify(result).includes('{invalid'),false)
})
test('dependency scanning skips junctions and respects aborts and file limits',async t=>{
 const dir=await fixture(t),outside=await fixture(t);await writeFile(join(outside,'package.json'),'{"dependencies":{"outside":"*"}}')
 await symlink(outside,join(dir,'linked'),process.platform==='win32'?'junction':'dir')
 assert.equal((await scanDeps(dir)).dependencies.length,0)
 await writeFile(join(dir,'package.json'),'{}');assert.equal((await scanDeps(dir,{maxFileBytes:1})).complete,false)
 const ctl=new AbortController();ctl.abort(new Error('fixture abort'));await assert.rejects(scanDeps(dir,{signal:ctl.signal}),/fixture abort/)
})
test('sanitizer suppression requires the actual unchanged dompurify import and safe call shape',()=>{
 const scan=code=>scanText(code,'a.tsx','a.tsx',DEFAULT_POLICY).filter(f=>f.ruleId==='SEC-009')
 assert.equal(scan('import DOMPurify from "dompurify";\nnode.innerHTML = DOMPurify.sanitize(input);').length,0)
 assert.equal(scan('import DOMPurify from "dompurify";\nconst el = <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(input)}}/>;').length,0)
 for(const code of ['node.innerHTML = DOMPurify.sanitize(input);','import DOMPurify from "dompurify";\nfunction f(DOMPurify){ node.innerHTML=DOMPurify.sanitize(input) }','import DOMPurify from "dompurify";\nDOMPurify.sanitize=evil;\nnode.innerHTML=DOMPurify.sanitize(input);','import DOMPurify from "dompurify";\nnode.innerHTML=DOMPurify.sanitize(input, customConfig);','import DOMPurify from "dompurify";\na.innerHTML=DOMPurify.sanitize(input); b.innerHTML=input;']){
  assert.ok(scan(code).length,code);assert.equal(scan(code)[0].evidence,'pattern');assert.notEqual(scan(code)[0].severity,'high')
 }
})
