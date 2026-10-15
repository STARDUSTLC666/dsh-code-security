// CI-only tooling; the plugin never downloads or installs scanners for its users.
import { mkdtemp, writeFile, mkdir, chmod, appendFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
if (!process.env.GITHUB_ENV || !process.env.RUNNER_TEMP || process.arch !== 'x64' || !['win32','linux'].includes(process.platform)) throw new Error('This installer requires an x64 GitHub Windows/Linux runner')
const windows = process.platform === 'win32', directory = await mkdtemp(join(process.env.RUNNER_TEMP, 'dsh-security-engines-'))
const checksums = windows ? ['b765daec9fda475b031b5a5159798cbe4294a3f2a50683cbc0471226e376d3da','9964ed64ec9a387391eb4cc006ad5c531154821aef29b793e02c448de4686438'] : ['f8b185a39ffcece2a1ca82bf3a4e7435cd81963ffd16b7a9128daf75f35f6de7','160c6253e2922e9e0a6a9771c5c4c40a4b3c6090b34a3cdd5e80c96cc2e4218b']
async function run(program, args) { await new Promise((resolve,reject) => { const child = spawn(program,args,{stdio:'inherit',windowsHide:true}); child.once('error',reject); child.once('close',code => code === 0 ? resolve() : reject(new Error(program + ' exited ' + code))) }) }
async function download(url, file, sha) {
  const response = await fetch(url, { signal: AbortSignal.timeout(120000) }); if (!response.ok) throw new Error('Download failed: ' + response.status)
  const bytes = new Uint8Array(await response.arrayBuffer()); if (bytes.length > 100 * 1024 * 1024 || createHash('sha256').update(bytes).digest('hex') !== sha) throw new Error('Release checksum mismatch')
  await writeFile(file, bytes)
}
const archive = 'betterleaks_1.9.0_' + (windows ? 'windows_x64.zip' : 'linux_x64.tar.gz'), archivePath = join(directory,archive), bin = join(directory,'bin'); await mkdir(bin)
const osvName = 'osv-scanner_' + (windows ? 'windows_amd64.exe' : 'linux_amd64'), osv = join(bin,osvName)
await Promise.all([
  download('https://github.com/betterleaks/betterleaks/releases/download/v1.9.0/' + archive, archivePath, checksums[0]),
  download('https://github.com/google/osv-scanner/releases/download/v2.7.0/' + osvName, osv, checksums[1]),
])
await run('tar', [windows ? '-xf' : '-xzf', archivePath, '-C', bin, windows ? 'betterleaks.exe' : 'betterleaks'])
const betterleaks = join(bin,windows ? 'betterleaks.exe' : 'betterleaks'); if (!windows) { await chmod(osv,0o700); await chmod(betterleaks,0o700) }
const venv = join(directory,'semgrep-venv'); await run('python',['-m','venv',venv])
const python = join(venv,windows ? 'Scripts/python.exe' : 'bin/python'), semgrep = join(venv,windows ? 'Scripts/semgrep.exe' : 'bin/semgrep')
await run(python,['-m','pip','install','--disable-pip-version-check','--only-binary=:all:','semgrep==1.181.0'])
await appendFile(process.env.GITHUB_ENV,'DSH_TEST_BETTERLEAKS=' + betterleaks + '\nDSH_TEST_OSV=' + osv + '\nDSH_TEST_SEMGREP=' + semgrep + '\n')
