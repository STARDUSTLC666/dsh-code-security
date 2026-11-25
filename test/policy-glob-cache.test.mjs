import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizePolicy, policyExcludesDir, policyIgnores } from '../lib/policy.js'

test('cached policy globs preserve directory and finding matches across policy edits', () => {
  const policy = normalizePolicy({ exclude: ['vendor/**'], ignore: [{ ruleId: 'SEC-001', file: 'generated/*.js' }] })
  assert.equal(policyExcludesDir(policy, 'vendor/pkg/index.js'), true)
  assert.equal(policyExcludesDir(policy, 'src/vendor.js'), false)
  assert.equal(policyIgnores(policy, 'SEC-001', 'generated/output.js'), true)
  assert.equal(policyIgnores(policy, 'SEC-002', 'generated/output.js'), false)
  assert.equal(policyIgnores(policy, 'SEC-001', 'src/output.js'), false)

  policy.exclude[0] = 'third-party/**'
  policy.ignore[0] = { ruleId: 'SEC-002', file: 'vendor/*.js' }
  assert.equal(policyExcludesDir(policy, 'vendor/pkg/index.js'), false)
  assert.equal(policyExcludesDir(policy, 'third-party/pkg/index.js'), true)
  assert.equal(policyIgnores(policy, 'SEC-001', 'generated/output.js'), false)
  assert.equal(policyIgnores(policy, 'SEC-002', 'vendor/output.js'), true)
})

test('policy glob compilation treats regex punctuation as literal and never aliases the double-star token', () => {
  const policy = normalizePolicy({ exclude: ['release§§secret', 'literal[dir]/**'] })
  assert.equal(policyExcludesDir(policy, 'release§§secret/file.js'), true)
  assert.equal(policyExcludesDir(policy, 'release-anything-secret/file.js'), false)
  assert.equal(policyExcludesDir(policy, 'literal[dir]/nested/file.js'), true)
  assert.equal(policyExcludesDir(policy, 'literaldir/nested/file.js'), false)
})

test('policy normalization bounds pattern counts, lengths and total complexity', () => {
  assert.throws(() => normalizePolicy({ exclude: Array(257).fill('vendor/**') }), /数量上限/)
  assert.throws(() => normalizePolicy({ ignore: Array.from({ length: 513 }, () => ({ ruleId: 'SEC-001' })) }), /数量上限/)
  assert.throws(() => normalizePolicy({ exclude: ['x'.repeat(1025)] }), /长度上限/)
  assert.throws(() => normalizePolicy({ exclude: Array(33).fill('x'.repeat(1024)) }), /总长度超过上限/)
})
