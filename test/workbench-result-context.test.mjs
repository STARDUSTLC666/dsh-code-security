import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {runInNewContext} from 'node:vm'

function render(report, language = 'zh') {
  let client
  const locale = {getSnapshot: () => ({active: language}), subscribe() {return () => {}}}
  const react = {
    Fragment: 'fragment', createElement: (type, props, ...children) => ({type, props: props || {}, children}),
    useEffect() {}, useLayoutEffect() {}, useId: () => 'probe', useRef: value => ({current: value}), useState: value => [value, () => {}], useMemo: fn => fn(), cloneElement: value => value,
  }
  const source = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
    .replace("return { inject: ['slots', 'locale'], apply };", "return { inject: ['slots', 'locale'], apply, probe: { SecurityResults } };")
  runInNewContext(source, {window: {__ModuleLoader__: {load({factory}) {client = factory(name => {if (name === 'react') return react; throw Error(name)})}}}})
  client.apply({locale, get: () => locale, effect(fn, label) {if (label?.endsWith(': locale')) return fn()}, slots: {inject(_name, fn) {fn()}, register() {}}})
  return client.probe.SecurityResults({report, findings: [], fresh: new Set(), limit: 50})
}
function text(node) {return Array.isArray(node) ? node.map(text).join('') : typeof node === 'string' ? node : node && typeof node === 'object' ? text(node.children) : ''}

test('saved report time and scope appear before the status without expanding coverage', () => {
  const tree = render({hasScan: true, time: '2026-10-29T12:32:06.881Z', scope: {kind: 'scan', target: 'dsh-email'}})
  const summary = tree.children[0]
  assert.equal(summary.props.className, 'security-report-meta')
  assert.match(text(summary), /最近检查：.*2026.*范围：dsh-email.*文件扫描/)
  assert.match(text(summary), /更新插件不会自动重扫/)
  assert.match(text(summary), /测试夹具和公开常量需核对用途/)
  assert.equal(summary.children[0].children[1].props.dateTime, '2026-10-29T12:32:06.881Z')
})

test('legacy report target is visible, missing or invalid dates never pretend to be current', () => {
  for (const time of [undefined, 'invalid']) {
    const tree = render({hasScan: true, time, target: 'legacy-project', mode: 'diff:HEAD'})
    assert.match(text(tree.children[0]), /时间未知.*legacy-project.*Git 改动/)
    assert.doesNotMatch(text(tree), /Invalid Date/)
  }
})

test('English context explains saved findings in English', () => {
  const tree = render({hasScan: true, time: '2026-11-06T00:00:00Z', scope: {kind: 'scan', target: 'src'}}, 'en')
  assert.match(text(tree.children[0]), /Last checked:.*Scope: src.*File scan/)
  assert.match(text(tree.children[0]), /plugin updates do not rerun checks/)
  assert.doesNotMatch(text(tree.children[0]), /最近|检查|新增/)
})
