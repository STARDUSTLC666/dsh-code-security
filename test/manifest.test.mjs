import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { existsSync } from 'node:fs'
import { apply, inject } from '../lib/index.js'
const require = createRequire(import.meta.url)
const pkg = require('../package.json')

test('manifest 字段', () => {
  assert.equal(pkg.name, 'dsh-code-security')
  assert.equal(pkg.version, '0.3.1')
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  assert.ok(pkg.files.includes('lib'))
  assert.ok(existsSync(new URL('../cordis.patch.yml', import.meta.url)))
})

test('apply 注册 10 个工具、挂载 alpha.4 pre-execute 审批门并 dispose', async () => {
  const names = []
  const definitions = []
  const listeners = {}
  const listenerOptions = {}
  const ctx = {
    subprocess: { spawn: async () => ({}) },
    tools: { register(def) { definitions.push(def); names.push(def.name); return () => names.splice(names.indexOf(def.name), 1) } },
    on(e, l, options) { listeners[e] = l; listenerOptions[e] = options },
  }
  apply(ctx, {})
  assert.deepEqual(names, ['secure_scan', 'secure_diff', 'secure_fix_verify', 'secure_report', 'secure_export', 'secure_baseline', 'secure_deps', 'secure_policy_show', 'secure_policy_set', 'secure_health'])
  assert.ok(definitions.every(definition => !('gate' in definition)))
  assert.equal(listenerOptions['tools/pre-execute'].prepend, true)
  assert.deepEqual(await listeners['tools/pre-execute']({ name: 'secure_policy_set', arguments: {} }, async () => ({ kind: 'allow' })), {
    kind: 'ask',
    reason: '覆盖写入项目 .code-security.json 安全策略',
  })
  assert.equal(await listeners['tools/pre-execute']({ name: 'secure_export', arguments: {} }, async () => 'next'), 'next')
  assert.deepEqual(await listeners['tools/pre-execute']({ name: 'secure_export', arguments: { path: 'report.sarif' } }, async () => 'next'), {
    kind: 'ask',
    reason: '导出安全报告到 report.sarif',
  })
  listeners.dispose()
  assert.equal(names.length, 0)
  assert.deepEqual(inject, ['tools', 'subprocess'])
})
