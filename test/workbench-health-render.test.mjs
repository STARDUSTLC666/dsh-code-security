/**
 * 「检查工具」结果渲染验收。
 *
 * 面板源码是手写 JS（不经 tsc）。这里复用 workbench-registration.test.mjs 的
 * 同一套手法：在 vm 里加载 lib/client.js，把 return 语句临时换成带 probe 的版本，
 * 用假 React 直接调用 HealthReport（无 hook），不引入 DOM 依赖。
 *
 * 会红的情形：secure_health 已经返回 checks（扫描上限/严重度门禁/状态目录/工作目录），
 * 但面板只渲染引擎徽标，用户点完「检查工具」看不到实际生效的配置与目录。
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

function loadProbe() {
  let client, definition
  const locale = { getSnapshot: () => ({ active: 'zh' }), subscribe() { return () => {} } }
  const react = {
    createElement(type, props, ...children) { return { type, props: props || {}, children } },
    useEffect() {}, useLayoutEffect() {}, useId: () => 'probe-id', useRef: value => ({ current: value }), useState: value => [value, () => {}], useMemo: fn => fn(), cloneElement: value => value,
  }
  const source = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
    .replace("return { inject: ['slots', 'locale'], apply };", "return { inject: ['slots', 'locale'], apply, probe: { HealthReport } };")
  runInNewContext(source, {
    window: { __ModuleLoader__: { load({ factory }) { client = factory(name => {
      if (name === 'react') return react
      throw new Error('Unexpected eager UI dependency: ' + name)
    }) } } },
  })
  client.apply({
    locale, get: () => locale,
    effect(fn, label) { if (label?.endsWith(': locale')) return fn() },
    slots: { inject(_name, fn) { fn() }, register(meta) { definition = meta }, },
  })
  assert.ok(definition, '工作台必须仍能注册')
  return client.probe
}

const flatten = nodes => nodes.flatMap(node => Array.isArray(node) ? flatten(node) : [node]).filter(Boolean)
const textOf = node => flatten([node.children]).map(child => typeof child === 'string' ? child : textOf(child)).join('')
const findAll = (node, predicate) => {
  const found = []
  const walk = value => {
    if (Array.isArray(value)) { value.forEach(walk); return }
    if (!value || typeof value !== 'object') return
    if (predicate(value)) found.push(value)
    walk(value.children)
  }
  walk(node)
  return found
}

test('检查工具的结果列出每一项配置与目录，而不是只有引擎徽标', () => {
  const { HealthReport } = loadProbe()
  const tree = HealthReport({
    result: {
      ok: true,
      checks: [
        { name: '扫描上限', ok: true, detail: 'maxFiles=5000，maxFileBytes=2097152' },
        { name: '严重度门禁', ok: true, detail: 'failOn=medium' },
        { name: '状态目录', ok: true, detail: '/repo/.code-security' },
        { name: '工作目录', ok: true, detail: '/repo' },
      ],
      configuredEngines: ['builtin'],
    },
  })
  const items = findAll(tree, node => node.type === 'li').map(textOf)
  assert.equal(items.length, 4, '四个检查项都要出现')
  assert.match(items.join('\n'), /扫描上限：maxFiles=5000/, '用户看不到生效中的上限，就无法判断配置是否生效')
  assert.match(items.join('\n'), /状态目录：\/repo\/\.code-security/)
  assert.match(textOf(tree), /已选引擎：内置规则/)
})

test('自检失败时用 error 语气并要求逐条处理', () => {
  const { HealthReport } = loadProbe()
  const tree = HealthReport({ result: { ok: false, checks: [{ name: '工作目录', ok: false, detail: '未绑定工作区' }], configuredEngines: [] } })
  const status = findAll(tree, node => node.props && node.props.tone !== undefined)[0]
  assert.equal(status.props.tone, 'error')
  assert.match(textOf(status), /逐条处理/)
  assert.match(textOf(tree), /未绑定工作区/)
  assert.match(textOf(tree), /无（只用内置规则）/)
})
