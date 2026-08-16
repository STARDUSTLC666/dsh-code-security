import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { existsSync } from 'node:fs'
import { apply, inject } from '../lib/index.js'
const require = createRequire(import.meta.url)
const pkg = require('../package.json')

test('manifest 字段', () => {
  assert.equal(pkg.name, 'dsh-secure-review')
  assert.equal(pkg.version, '0.2.2')
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  assert.ok(pkg.files.includes('lib'))
  assert.ok(existsSync(new URL('../cordis.patch.yml', import.meta.url)))
})

test('apply 注册 9 个工具并 dispose', () => {
  const names = []
  const listeners = {}
  const ctx = {
    subprocess: { spawn: async () => ({}) },
    tools: { register(def) { names.push(def.name); return () => names.splice(names.indexOf(def.name), 1) } },
    get() { return undefined },
    on(e, l) { listeners[e] = l },
  }
  apply(ctx, {})
  assert.deepEqual(names, ['secure_scan', 'secure_diff', 'secure_fix_verify', 'secure_report', 'secure_export', 'secure_baseline', 'secure_deps', 'secure_policy_show', 'secure_policy_set'])
  listeners.dispose()
  assert.equal(names.length, 0)
  assert.deepEqual(inject, ['tools', 'subprocess'])
})
