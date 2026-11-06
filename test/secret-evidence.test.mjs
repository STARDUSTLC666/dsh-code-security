import test from 'node:test'
import assert from 'node:assert/strict'
import {scanText, splitByBaseline} from '../lib/index.js'
import {DEFAULT_POLICY} from '../lib/policy.js'

const scan = (text, file = 'src/example.ts') => scanText(text, file, file, DEFAULT_POLICY)
const entropy = text => scan(text).filter(f => f.ruleId === 'SEC-304')
const digest = 'fb2c8dcfe8b8c5b3aa6ce26ca489f149f6a1451150a09c024a0329ad172bfe4d'
const route = '/-/npm/v1/oidc/token/exchange/package/'
const purpose = 'dsh-email/oauth2-tokens/v2'

test('public digest fields, versioned DPAPI purposes and URL routes are not treated as random credentials', () => {
  for (const source of [
    '"sourceSha256": "' + digest + '",',
    'const ENTROPY = "' + purpose + '";',
    'const response = await fetch(registry + "' + route + '" + escaped, {method: "POST"});',
    'const endpoint = "' + route + '";',
  ]) assert.equal(entropy(source).length, 0, source)
})

test('the same public-looking values remain findings in credential fields and unknown contexts', () => {
  for (const source of [
    'const apiKey = "' + digest + '";',
    'const secretSha256 = "' + digest + '";',
    'const token = "' + purpose + '";',
    'const password = "' + route + '";',
    'const anything = "' + digest + '";',
    'const ENTROPY = "SYNTHETIC_aB12cD34eF56gH78iJ90kL12";',
    'sendToken("' + route + '");',
  ]) assert.ok(entropy(source).length, source)
})

test('test directories do not implicitly suppress hardcoded credentials', () => {
  const found = scan('const password = "synthetic-fixture-password";', 'test/example.test.mjs')
  assert.ok(found.some(f => f.ruleId === 'SEC-301'))
  assert.equal(JSON.stringify(found).includes('synthetic-fixture-password'), false)
})

test('private-key acceptance binds to its full material, survives line shifts and never exposes the key', () => {
  const pem = body => '-----BEGIN PRIVATE KEY-----\n' + body + '\n-----END PRIVATE KEY-----\n'
  const first = scan(pem('SYNTHETIC_FIRST_KEY_BODY'), 'test/fixture.pem').find(f => f.ruleId === 'SEC-303')
  const shifted = scan('\n\n' + pem('SYNTHETIC_FIRST_KEY_BODY'), 'test/fixture.pem').find(f => f.ruleId === 'SEC-303')
  const rotated = scan(pem('SYNTHETIC_SECOND_KEY_BODY'), 'test/fixture.pem').find(f => f.ruleId === 'SEC-303')
  assert.ok(first && shifted && rotated)
  assert.equal(first.fingerprint, shifted.fingerprint)
  assert.notEqual(first.fingerprint, rotated.fingerprint)
  assert.equal(splitByBaseline([shifted], {findings: [first]}).accepted.length, 1)
  assert.equal(splitByBaseline([rotated], {findings: [first]}).fresh.length, 1)
  const added = scan(pem('SYNTHETIC_FIRST_KEY_BODY') + pem('SYNTHETIC_SECOND_KEY_BODY'), 'test/fixture.pem').find(f => f.ruleId === 'SEC-303')
  assert.equal(splitByBaseline([added], {findings: [first]}).fresh.length, 1)
  const commentLike = body => scan(pem('SYNTHETIC_FIRST_KEY_BODY\n//BASE64_PREFIX\n' + body), 'test/fixture.pem').find(f => f.ruleId === 'SEC-303')
  assert.notEqual(commentLike('FIRST').fingerprint, commentLike('CHANGED').fingerprint)
  assert.equal(JSON.stringify([first, shifted, rotated]).includes('SYNTHETIC_'), false)
})
