import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { zipSync, strToU8 } from 'fflate'

export const nativeRunner = { async run(argv, options = {}) {
  const signal = AbortSignal.any([...(options.signal ? [options.signal] : []), AbortSignal.timeout(options.timeoutMs ?? 60000)])
  signal.throwIfAborted()
  return new Promise((resolve, reject) => {
    const child = spawn(argv[0], argv.slice(1), { cwd: options.cwd, env: { ...process.env, ...options.env }, windowsHide: true, signal, stdio: ['ignore','pipe','pipe'] })
    const output = [[], []]; let size = 0, failure
    child.on('error', error => { failure = error })
    for (const [i, stream] of [child.stdout, child.stderr].entries()) stream.on('data', chunk => { size += chunk.length; if (size > 8 * 1024 * 1024) { failure = new Error('Fixture output exceeded limit'); child.kill() }; output[i].push(chunk) })
    child.on('close', (exitCode, terminated) => {
      if (failure || signal.aborted) reject(signal.aborted ? signal.reason : failure)
      else resolve({ exitCode, signal: terminated, stdout: Buffer.concat(output[0]).toString('utf8'), stderr: Buffer.concat(output[1]).toString('utf8') })
    })
  })
} }

// Intentionally synthetic advisory: exercises the real OSV range matcher without a network.
export async function localDatabase(directory) {
  const folder = join(directory, 'osv-scalibr', 'npm'); await mkdir(folder, { recursive: true })
  const advisory = { schema_version: '1.7.0', id: 'DSH-TEST-0001', modified: '2026-01-01T00:00:00Z', published: '2026-01-01T00:00:00Z', summary: 'Synthetic fixture advisory',
    affected: [{ package: { ecosystem: 'npm', name: 'dsh-security-fixture' }, ranges: [{ type: 'SEMVER', events: [{ introduced: '0' }, { fixed: '1.1.0' }] }] }] }
  await writeFile(join(folder, 'all.zip'), zipSync({ 'DSH-TEST-0001.json': strToU8(JSON.stringify(advisory)) }))
}
export const lockfile = version => JSON.stringify({ name: 'fixture', version: '1.0.0', lockfileVersion: 3, packages: { '': { name: 'fixture', version: '1.0.0' }, 'node_modules/dsh-security-fixture': { version, resolved: 'https://registry.npmjs.org/dsh-security-fixture/-/dsh-security-fixture-' + version + '.tgz' } } })
