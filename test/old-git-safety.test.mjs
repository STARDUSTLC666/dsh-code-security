import test from 'node:test'
import assert from 'node:assert/strict'
import { runGitDiff } from '../lib/index.js'
import { gitOutput } from './git-output.mjs'

test('unsupported attribute isolation never retries an unprotected Git diff', async () => {
  let unprotected = 0
  const runner = { async run(argv) {
    if (argv.includes('rev-parse')) return { exitCode: 0, stdout: gitOutput(argv, process.cwd()), stderr: '' }
    if (argv.some(arg => arg.startsWith('--attr-source='))) return { exitCode: 129, stdout: '', stderr: 'unknown option: --attr-source' }
    unprotected++
    return { exitCode: 0, stdout: '', stderr: '' }
  } }
  await assert.rejects(runGitDiff(runner, 'unsupported-git-fixture', 'HEAD'), /Git|git/)
  assert.equal(unprotected, 0, 'an empty diff from an unsafe fallback could falsely pass review')
})
