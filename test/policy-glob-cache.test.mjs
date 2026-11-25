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
