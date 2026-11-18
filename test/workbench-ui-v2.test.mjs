import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

function createMockEnv({ withHostPrimitives = false, storageThrows = false, initialStyle = null, onClipboardWrite = null } = {}) {
  const storage = new Map()
  if (initialStyle) storage.set('dsh-stardust:ui-style', initialStyle)
  const windowListeners = new Map()
  const dispatchedEvents = []
  const syncedNodes = new Set()

  class MockCustomEvent {
    constructor(type, init = {}) {
      this.type = type
      this.detail = init.detail
    }
  }

  function makeDomElement(tag, attrs = {}, parent = null) {
    const attributes = new Map(Object.entries(attrs))
    const node = {
      tagName: tag.toUpperCase(),
      parentElement: parent,
      setAttribute(k, v) {
        attributes.set(k, String(v))
        if (k === 'data-dsh-portal-synced') syncedNodes.add(node)
      },
      getAttribute(k) {
        return attributes.has(k) ? attributes.get(k) : null
      },
      hasAttribute(k) {
        return attributes.has(k)
      },
      closest(selector) {
        let cur = node
        while (cur) {
          const role = cur.getAttribute?.('role')
          if (selector.includes('[role="dialog"]') && role === 'dialog') return cur
          if (selector.includes('[role="menu"]') && role === 'menu') return cur
          cur = cur.parentElement
        }
        return null
      },
    }
    return node
  }

  const headStyles = []
  const mockDocument = {
    baseURI: 'http://127.0.0.1:4321/',
    documentElement: makeDomElement('html'),
    head: {
      appendChild(el) {
        headStyles.push(el)
        return el
      },
    },
    createElement(tag) {
      return makeDomElement(tag)
    },
    querySelector(selector) {
      if (selector.startsWith('style[data-plugin-css=')) {
        return headStyles.find(el => selector.includes(el.getAttribute('data-plugin-css'))) || null
      }
      return null
    },
    querySelectorAll(selector) {
      if (selector.includes('[data-dsh-portal-synced]')) return [...syncedNodes]
      return []
    },
  }

  const mockWindow = {
    CustomEvent: MockCustomEvent,
    document: mockDocument,
    localStorage: {
      getItem(k) {
        if (storageThrows) throw new Error('SecurityError: storage disabled')
        return storage.has(k) ? storage.get(k) : null
      },
      setItem(k, v) {
        if (storageThrows) throw new Error('SecurityError: storage disabled')
        storage.set(k, String(v))
      },
    },
    addEventListener(type, fn) {
      if (!windowListeners.has(type)) windowListeners.set(type, new Set())
      windowListeners.get(type).add(fn)
    },
    removeEventListener(type, fn) {
      windowListeners.get(type)?.delete(fn)
    },
    dispatchEvent(event) {
      dispatchedEvents.push(event)
      for (const fn of windowListeners.get(event.type) || []) fn(event)
      return true
    },
    __ModuleLoader__: {
      load(entry) {
        mockWindow.__loaded = entry
      },
    },
  }

  let stateValues = []
  let stateCursor = 0
  let refValues = []
  let refCursor = 0
  const effects = []
  const cleanups = []
  const React = {
    Fragment: Symbol.for('react.fragment'),
    createElement(type, props, ...children) {
      const flat = children.flat(Infinity).filter(v => v !== null && v !== undefined && v !== false && v !== true)
      return { type, props: { ...(props || {}), children: flat.length <= 1 ? flat[0] : flat }, children: flat }
    },
    cloneElement(el, extraProps, ...children) {
      const nextChildren = children.length ? children.flat(Infinity).filter(v => v !== null && v !== undefined && v !== false && v !== true) : el.children
      return {
        type: el.type,
        props: { ...el.props, ...(extraProps || {}), children: nextChildren },
        children: nextChildren,
      }
    },
    useState(initial) {
      const idx = stateCursor++
      if (!(idx in stateValues)) {
        stateValues[idx] = typeof initial === 'function' ? initial() : initial
      }
      const set = next => {
        stateValues[idx] = typeof next === 'function' ? next(stateValues[idx]) : next
      }
      return [stateValues[idx], set]
    },
    useEffect(fn) {
      effects.push(fn)
    },
    useLayoutEffect(fn) {
      effects.push(fn)
    },
    useRef(initial) {
      const idx = refCursor++
      if (!(idx in refValues)) refValues[idx] = { current: initial }
      return refValues[idx]
    },
    useId() {
      return 'sec-uid'
    },
    useMemo(fn) {
      return fn()
    },
  }

  let primitivesRequireCount = 0
  const hostPrimitives = {
    Button: function HostButton(props) { return { type: 'HostButton', props, children: [props.icon, props.children].filter(Boolean) } },
    Input: function HostInput(props) { return { type: 'HostInput', props, children: [props.icon].filter(Boolean) } },
    Checkbox: function HostCheckbox(props) { return { type: 'HostCheckbox', props, children: [] } },
    Switch: function HostSwitch(props) { return { type: 'HostSwitch', props, children: [] } },
    Menu: function HostMenu({ children, ...props }) {
      const extra = Array.isArray(children) ? children : [children]
      return { type: 'HostMenu', props, children: [props.anchor, ...extra].filter(Boolean) }
    },
    // Intentionally omits extra data-* attributes on outer role="dialog" just like real DSH 0.2.2-rc.3 Modal!
    Modal: function HostModal({ className, title, children }) {
      return React.createElement('div', { role: 'dialog', 'aria-modal': 'true', 'aria-label': title, className }, children)
    },
  }

  const rawBundle = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
  const instrumented = rawBundle.replace(
    "return { inject: ['slots', 'locale'], apply };",
    "return { inject: ['slots', 'locale'], apply, probe: { W, Workbench, SecurityResults, FindingCard, HealthReport, Coverage } };",
  )

  runInNewContext(instrumented, {
    window: mockWindow,
    document: mockDocument,
    CustomEvent: MockCustomEvent,
    AbortController,
    setTimeout,
    clearTimeout,
    navigator: { clipboard: { async writeText(val) { onClipboardWrite?.(val) } } },
    fetch: async () => ({ ok: true, json: async () => ({ ok: true, workspaces: [] }) }),
  })

  const client = mockWindow.__loaded.factory(name => {
    if (name === 'react') return React
    if (name === '@deepseek-ai/dsh-client-ui-primitives') {
      primitivesRequireCount++
      if (withHostPrimitives) return hostPrimitives
      throw new Error('Host primitives unavailable in standalone test')
    }
    throw new Error('Unexpected module: ' + name)
  })

  const locale = { getSnapshot: () => ({ active: 'zh-CN' }), subscribe: () => () => {} }
  client.apply({
    locale,
    get: key => (key === 'locale' ? locale : undefined),
    effect(fn, label) { if (label?.endsWith(': locale')) return fn() },
    slots: { inject(_n, fn) { fn() }, register() { return () => {} } },
  })

  function rerenderTree(renderFn) {
    stateCursor = 0
    refCursor = 0
    effects.length = 0
    return expand(renderFn())
  }

  function renderTree(renderFn) {
    const vnode = rerenderTree(renderFn)
    while (effects.length) {
      const fn = effects.shift()
      const off = fn()
      if (typeof off === 'function') cleanups.push(off)
    }
    return vnode
  }

  function expand(node) {
    if (Array.isArray(node)) return node.map(expand)
    if (!node || typeof node !== 'object') return node
    if (typeof node.type === 'function') {
      return expand(node.type(node.props || {}))
    }
    return {
      ...node,
      props: node.props
        ? Object.fromEntries(
            Object.entries(node.props).map(([k, v]) => [
              k,
              k === 'anchor' || k === 'list' || k === 'detail' || k === 'action' || k === 'footer' || k === 'toolbar'
                ? expand(v)
                : v,
            ]),
          )
        : {},
      children: (node.children || []).map(expand),
    }
  }

  function findAll(node, pred, out = []) {
    if (Array.isArray(node)) { node.forEach(item => findAll(item, pred, out)); return out }
    if (!node || typeof node !== 'object') return out
    if (pred(node)) out.push(node)
    if (node.props) {
      for (const k of ['anchor', 'list', 'detail', 'action', 'footer', 'toolbar', 'icon']) {
        if (node.props[k] && typeof node.props[k] === 'object') findAll(node.props[k], pred, out)
      }
    }
    for (const child of node.children || []) findAll(child, pred, out)
    return out
  }

  return {
    React,
    client,
    storage,
    mockDocument,
    dispatchedEvents,
    makeDomElement,
    renderTree,
    rerenderTree,
    expand,
    findAll,
    getPrimitivesRequireCount: () => primitivesRequireCount,
    resetState() { stateValues = []; stateCursor = 0; refValues = []; refCursor = 0 },
    cleanup() { while (cleanups.length) cleanups.pop()() },
  }
}

test('Workbench UI v2 lazily loads @deepseek-ai/dsh-client-ui-primitives only on render and maps host contracts', () => {
  const env = createMockEnv({ withHostPrimitives: true })
  assert.equal(env.getPrimitivesRequireCount(), 0, 'must never eagerly require host primitives during load or apply')

  const { W, FindingCard } = env.client.probe
  const pageTree = env.expand(env.renderTree(() =>
    env.React.createElement(
      W.Page,
      { workbench: true, title: '代码安全', icon: 'shield' },
      env.React.createElement(FindingCard, {
        finding: {
          id: 'f-1',
          ruleId: 'SEC-001',
          cwe: 'CWE-78',
          severity: 'high',
          confidence: 'high',
          evidence: 'dataflow',
          file: 'src/run.ts',
          line: 42,
          snippet: 'exec(input)',
          title: 'Command injection',
          message: 'Unsafe shell execution',
        },
        fresh: true,
        copied: true,
        onOpen() {},
        onCopy() {},
      }),
    ),
  ))

  assert.ok(env.getPrimitivesRequireCount() > 0, 'host primitives are resolved lazily during render')
  assert.equal(pageTree.type, 'section')
  assert.equal(pageTree.props['data-dsh-style'], 'harness')
  assert.equal(pageTree.props['data-dsh-font'], 'arcade')
  assert.equal(pageTree.props['data-main'], 'true')

  const fontTrigger = env.findAll(pageTree, n => n.type === 'HostButton' && String(n.props?.className || '').includes('dsh-font-trigger'))[0]
  assert.ok(fontTrigger, 'renders compact FontSwitcher trigger beside StyleSwitcher')

  const hostButtons = env.findAll(pageTree, n => n.type === 'HostButton')
  assert.ok(hostButtons.length >= 3, 'uses host Button for FindingCard actions and header StyleSwitcher')
  const copyBtn = hostButtons.find(n => n.props['data-copied'] === 'true')
  assert.ok(copyBtn, 'copied state propagates data-copied="true" for check pop animation')
  const icons = env.findAll(pageTree, n => n.type === 'svg' && n.props['data-dsh-icon'])
  const iconNames = new Set(icons.map(n => n.props['data-dsh-icon']))
  assert.ok(iconNames.has('shield'))
  assert.ok(iconNames.has('check'))
  assert.ok(iconNames.has('external'))
  assert.ok(iconNames.has('down'))

  // Danger variant maps to host 'ghost' + dsh-wb-btn-danger
  const dangerBtn = env.expand(env.React.createElement(W.Button, { variant: 'danger', icon: 'trash' }, '放弃'))
  assert.equal(dangerBtn.type, 'HostButton')
  assert.equal(dangerBtn.props.variant, 'ghost')
  assert.match(dangerBtn.props.className, /dsh-wb-btn-danger/)
  env.cleanup()
})

test('Standalone fallback mode renders semantic HTML controls and syncs all 13 [data-dsh-style] presets, 8 [data-dsh-font] pairings, and portaled dialogs', () => {
  const env = createMockEnv({ withHostPrimitives: false })
  const { W } = env.client.probe

  assert.deepEqual(
    Array.from(W.DSH_STYLES, s => s.id),
    ['harness', 'cream', 'claude', 'pixel8bit', 'mint', 'glass', 'eink', 'blueprint', 'risograph', 'win98', 'songhui', 'frutiger', 'gazette'],
  )
  assert.equal(W.DSH_DEFAULT_FONT, 'arcade')
  assert.deepEqual(
    Array.from(W.DSH_FONTS, f => f.id),
    ['arcade', 'auto', 'songkai', 'fangsong', 'poster', 'retro98', 'serif', 'modern'],
  )

  // Mount a simulated portaled dialog outer <div role="dialog"> without data-dsh-style
  const outerDialogDom = env.makeDomElement('div', { role: 'dialog' })
  const innerDialogDom = env.makeDomElement('div', {}, outerDialogDom)

  const dialogTree = env.expand(env.renderTree(() =>
    env.React.createElement(W.Dialog, {
      title: '设置尚未保存',
      tone: 'warn',
      closeLabel: '继续编辑',
      onClose() {},
    }, env.React.createElement('p', null, '确认切换')),
  ))

  const frameNode = env.findAll(dialogTree, n => n.props?.className === 'dsh-wb-dialog-frame')[0]
  assert.ok(frameNode, 'Dialog renders dsh-wb-dialog-frame')
  assert.equal(typeof frameNode.props.ref, 'function')
  frameNode.props.ref(innerDialogDom)
  assert.equal(outerDialogDom.getAttribute('data-dsh-style'), 'harness')
  assert.equal(outerDialogDom.getAttribute('data-dsh-font'), 'arcade')
  assert.equal(outerDialogDom.getAttribute('data-window-drag-exclude'), '')

  // Cycle through all 13 styles and verify localStorage + custom event + portaled dialog sync
  for (const styleId of ['cream', 'claude', 'pixel8bit', 'mint', 'glass', 'eink', 'blueprint', 'risograph', 'win98', 'songhui', 'frutiger', 'gazette', 'harness']) {
    env.resetState()
    const applied = W.writeDshStyle(styleId)
    assert.equal(applied, styleId)
    assert.equal(env.storage.get('dsh-stardust:ui-style'), styleId)
    assert.equal(outerDialogDom.getAttribute('data-dsh-style'), styleId, 'portaled dialog updates to ' + styleId)
    assert.equal(dispatchedStyleOf(env.dispatchedEvents), styleId)

    const page = env.expand(env.renderTree(() =>
      env.React.createElement(W.Page, { workbench: true, title: '代码安全', icon: 'shield' }, 'body'),
    ))
    assert.equal(page.props['data-dsh-style'], styleId)
    assert.equal(page.props['data-dsh-font'], 'arcade')
  }

  // Cycle through all 8 font pairings and verify localStorage + custom event + root + portaled dialog sync
  for (const fontId of ['auto', 'songkai', 'fangsong', 'poster', 'retro98', 'serif', 'modern', 'arcade']) {
    env.resetState()
    const appliedFont = W.writeDshFont(fontId)
    assert.equal(appliedFont, fontId)
    assert.equal(env.storage.get('dsh-stardust:ui-font'), fontId)
    assert.equal(env.mockDocument.documentElement.getAttribute('data-dsh-font'), fontId)
    assert.equal(outerDialogDom.getAttribute('data-dsh-font'), fontId, 'portaled dialog updates font to ' + fontId)
    assert.equal(env.dispatchedEvents.at(-1)?.detail?.font, fontId)

    const page = env.expand(env.renderTree(() =>
      env.React.createElement(W.Page, { workbench: true, title: '代码安全', icon: 'shield' }, 'body'),
    ))
    assert.equal(page.props['data-dsh-font'], fontId)
  }

  // Restricted storage fallback does not throw
  const restricted = createMockEnv({ withHostPrimitives: false, storageThrows: true })
  assert.equal(restricted.client.probe.W.readDshStyle(), 'harness')
  assert.equal(restricted.client.probe.W.writeDshStyle('claude'), 'claude')
  assert.equal(restricted.client.probe.W.readDshFont(), 'arcade')
  assert.equal(restricted.client.probe.W.writeDshFont('songkai'), 'songkai')
  env.cleanup()
  restricted.cleanup()
})

function dispatchedStyleOf(events) {
  return events.at(-1)?.detail?.style
}

test('Design system CSS enforces Never-Too-Dark slate, 13 palettes, 8 font pairings, materiality, v3 layout primitives, and update footer', () => {
  const rawBundle = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
  const env = createMockEnv({ withHostPrimitives: false })
  const css = env.client.probe.W.styles

  const cssRules = css.replace(/\/\*[\s\S]*?\*\//g, '')

  // 1. Never too dark: soft breathable slate in host dark mode, no pitch-black surfaces
  assert.match(cssRules, /body\[data-ds-dark-theme\][\s\S]*?#1f232b/i)
  assert.match(cssRules, /body\[data-ds-dark-theme\][\s\S]*?#272c36/i)
  assert.doesNotMatch(cssRules, /#090a0f|#0b0d13|#000000/i)

  // 2. All 13 switchable [data-dsh-style] themes + deepened materiality
  for (const preset of ['harness', 'cream', 'claude', 'pixel8bit', 'mint', 'glass', 'eink', 'blueprint', 'risograph', 'win98', 'songhui', 'frutiger', 'gazette']) {
    assert.ok(css.includes(`[data-dsh-style="${preset}"]`), `missing CSS scope for ${preset}`)
  }
  assert.match(css, /#faf7f0/i, 'cream daylight paper')
  assert.match(css, /3px 3px 0 #ebe3d1/i, 'cream stacked-paper shadow')
  assert.match(css, /#c96442/i, 'claude terracotta accent')
  assert.match(css, /\[data-dsh-serif\]/i, 'claude editorial serif')
  assert.match(css, /translate:\s*1px 1px/i, 'pixel8bit stepped press')
  assert.match(css, /steps\(2,\s*end\)/i, 'pixel8bit stepped timing')
  assert.match(css, /\.dsh-pixel-cursor/i, 'pixel8bit active row cursor')
  assert.match(css, /#0f766e/i, 'mint teal accent')
  assert.match(css, /#f3f7ff/i, 'glass aurora daylight base')
  assert.match(css, /blur\(14px\)/i, 'glass frosted blur')
  assert.match(css, /#f2f1ec/i, 'eink warm matte e-paper')
  assert.match(css, /#eaf3fb/i, 'blueprint cyanotype grid')
  assert.match(css, /#ff3e7f/i, 'risograph electric pink')
  assert.match(css, /#dcdcdc/i, 'win98 platinum bevel')
  assert.match(css, /#b83b2a/i, 'songhui cinnabar seal')
  assert.match(css, /#eaf7ff/i, 'frutiger aqua gloss')
  assert.match(css, /#f6f3ec/i, 'gazette newsprint base')
  assert.match(css, /4px double #161514/i, 'gazette masthead double rule')
  assert.match(css, /#9b1c1c/i, 'gazette crimson seal accent')

  // 2b. Dual-layer typography variables, 8 [data-dsh-font] rules, and compact FontSwitcher chrome
  assert.match(cssRules, /--dsh-font-display:/)
  assert.match(cssRules, /--dsh-font-body:/)
  assert.match(cssRules, /--dsh-font-mono:/)
  for (const fontId of ['songkai', 'fangsong', 'poster', 'retro98', 'serif', 'arcade', 'modern']) {
    assert.ok(cssRules.includes(`[data-dsh-font="${fontId}"]`), `missing CSS font override for ${fontId}`)
  }
  assert.match(cssRules, /\.dsh-style-switcher/)
  assert.match(cssRules, /\.dsh-font-trigger/)
  assert.match(cssRules, /\.dsh-font-glyph/)

  // 3. v3 header, sliding indicator, split resizer, skeleton, quick-action bar, and clearances
  assert.match(cssRules, /\.dsh-header/)
  assert.match(cssRules, /\.dsh-tab-indicator/)
  assert.match(cssRules, /\.dsh-split-resizer/)
  assert.match(cssRules, /\.dsh-skeleton/)
  assert.match(cssRules, /\.dsh-row-actions/)
  assert.match(cssRules, /--dsh-frame-top-clearance/)
  assert.match(cssRules, /--dsh-frame-leading-clearance/)
  assert.match(cssRules, /\[data-window-drag-exclude\]\s*\{\s*-webkit-app-region:\s*no-drag/)
  assert.doesNotMatch(cssRules, /\[data-window-drag-exclude\]\s*\*/)

  // 4. Small-button icon micro-animations, @starting-style dialog entrance, and reduced motion
  for (const icon of ['refresh', 'plus', 'close', 'external', 'link', 'trash', 'down', 'check', 'copy', 'download']) {
    assert.ok(cssRules.includes(`data-dsh-icon="${icon}"`), `missing icon animation rule for ${icon}`)
  }
  assert.match(cssRules, /@starting-style/)
  assert.match(cssRules, /transition-behavior:\s*allow-discrete/)
  assert.match(cssRules, /overscroll-behavior:\s*contain/)
  assert.match(cssRules, /@media\s*\(prefers-reduced-motion:\s*reduce\)/)
  assert.match(cssRules, /@media\s*\(forced-colors:\s*active\)/)

  // 5. Plugin update footer preserved & calm compact strip rules present
  assert.ok(rawBundle.includes('data-plugin-update-footer'))
  assert.ok(rawBundle.includes('__stardustUpdatesFooter'))
  assert.match(cssRules, /\[data-plugin-update-footer\][\s\S]*?min-height:\s*32px/)
  env.cleanup()
})

test('HostMenuWithStyle & Cordis 4 ctx.effect unload cleanup work cleanly', async () => {
  const env = createMockEnv({ withHostPrimitives: true })
  const { W } = env.client.probe
  W.writeDshStyle('pixel8bit')
  W.writeDshFont('fangsong')
  const P = W.primitives()
  const openMenu = env.expand(env.React.createElement(P.Menu, {
    open: true,
    dshStyle: 'pixel8bit',
    dshFont: 'fangsong',
    items: [{ id: 'a', label: 'A' }],
    anchor: env.React.createElement('button', null, 'Open'),
  }))
  const syncSpan = env.findAll(openMenu, n => n.type === 'span' && n.props?.['data-dsh-style'] === 'pixel8bit')[0]
  assert.ok(syncSpan, 'HostMenuWithStyle injects hidden portal sync span when open')
  const outerMenuDom = env.makeDomElement('div', { role: 'menu' })
  const innerSpanDom = env.makeDomElement('span', {}, outerMenuDom)
  syncSpan.props.ref(innerSpanDom)
  assert.equal(outerMenuDom.getAttribute('data-dsh-style'), 'pixel8bit')
  assert.equal(outerMenuDom.getAttribute('data-dsh-font'), 'fangsong')
  assert.equal(outerMenuDom.getAttribute('data-window-drag-exclude'), '')
  env.cleanup()

  // Verify Cordis 4 ctx.effect unload disposal on server entry
  const { apply } = await import('../lib/index.js')
  const registered = new Set()
  const effectCleanups = []
  apply({
    subprocess: { spawn: async () => ({}) },
    tools: { register(def) { registered.add(def.name); return () => registered.delete(def.name) } },
    effect(fn) { const off = fn(); if (typeof off === 'function') effectCleanups.push(off) },
    on() { return () => {} },
  }, {})
  assert.equal(registered.size, 10)
  for (const off of effectCleanups) await off()
  assert.equal(registered.size, 0, 'ctx.effect disposer unregisters all tools on Cordis 4 unload')
})

test('Unscanned project inline CTAs & interactive CoachmarkTour (? 引导, directional arrow, step progression, localStorage done)', async () => {
  const copied = []
  const env = createMockEnv({ withHostPrimitives: false, onClipboardWrite: val => copied.push(val) })
  const { W, Workbench, SecurityResults } = env.client.probe

  // Verify popover + spotlight + directional arrow + 8-bit & reduced-motion CSS rules
  assert.match(W.styles, /\[popover\]:is\(:popover-open,\s*\.\\:popover-open\)\s*\{\s*display:\s*block;\s*\}/)
  assert.match(W.styles, /\.dsh-wb-tour-card\[data-side="bottom"\]\s*>\s*\.dsh-wb-tour-arrow/)
  assert.match(W.styles, /box-shadow:\s*4px 4px 0px #1e2826/)
  assert.match(W.styles, /@media\s*\(prefers-reduced-motion:\s*no-preference\)[\s\S]*?\.dsh-wb-tour-spotlight/)

  // 1) Unscanned project empty state (!report.hasScan) provides inline Scan code & Check changes CTAs + 1-click prompt chips
  const triggeredActions = []
  const emptyScanTree = env.renderTree(() =>
    env.React.createElement(SecurityResults, {
      report: { hasScan: false },
      findings: [],
      fresh: new Set(),
      limit: 50,
      busy: false,
      loading: false,
      onRun: name => triggeredActions.push(name),
    }),
  )
  const scanBtn = env.findAll(emptyScanTree, n => n.type === 'button' && n.props?.['data-sec-empty-action'] === 'scan')[0]
  const diffBtn = env.findAll(emptyScanTree, n => n.type === 'button' && n.props?.['data-sec-empty-action'] === 'diff')[0]
  assert.ok(scanBtn, 'expected inline 检查代码 primary CTA inside !report.hasScan empty state')
  assert.ok(diffBtn, 'expected inline 检查改动 secondary CTA inside !report.hasScan empty state')
  scanBtn.props.onClick()
  diffBtn.props.onClick()
  assert.deepEqual(triggeredActions, ['scan', 'diff'])

  // 2) Workbench has zero static <details> workflow guide clutter, keeps SecurityPromptChip in W.Empty, exposes ? 引导, and runs 4-step CoachmarkTour
  env.resetState()
  let wbTree = env.renderTree(() => env.React.createElement(Workbench, { workbench: true }))
  assert.equal(env.findAll(wbTree, n => n.type === 'details' && Object.hasOwn(n.props || {}, 'data-sec-workflow-guide')).length, 0, 'static workflow box removed')

  const triggerBtn = env.findAll(wbTree, n => n.type === 'button' && Object.hasOwn(n.props || {}, 'data-tour-trigger'))[0]
  assert.ok(triggerBtn, 'expected topbar ? 引导 trigger button')
  assert.equal(triggerBtn.props['aria-expanded'], false)
  assert.equal(triggerBtn.props['aria-haspopup'], undefined, 'must NOT set aria-haspopup on tour trigger')

  // Wait for list fetch + 280ms first-visit auto-open timer
  await new Promise(r => setTimeout(r, 310))
  wbTree = env.rerenderTree(() => env.React.createElement(Workbench, { workbench: true }))

  // Empty catalog W.Empty still exposes SecurityPromptChip buttons
  const emptyPromptChips = env.findAll(wbTree, n => n.type === 'button' && n.props?.['data-copy-prompt'])
  assert.ok(emptyPromptChips.length >= 2, 'SecurityPromptChip buttons inside empty catalog W.Empty remain intact')

  let tourDialog = env.findAll(wbTree, n => n.props?.role === 'dialog' && n.props?.['aria-modal'] === 'false')[0]
  assert.ok(tourDialog, 'CoachmarkTour auto-opens after 280ms on first visit')
  assert.equal(tourDialog.props['data-tour-card'], 'scan')
  const arrow = env.findAll(tourDialog, n => Object.hasOwn(n.props || {}, 'data-tour-arrow'))[0]
  assert.ok(arrow, 'CoachmarkTour renders directional [data-tour-arrow]')

  // Step 1 includes inline 1-click prompt copy button when no project is scanned yet
  const step1PromptBtn = env.findAll(tourDialog, n => n.type === 'button' && n.props?.['data-copy-prompt'] === '检查这个项目的安全问题，给出触发条件、文件位置和脱敏证据')[0]
  assert.ok(step1PromptBtn, 'Step 1 exposes inline 1-click prompt copy button when unscanned')
  step1PromptBtn.props.onClick()
  await new Promise(r => setTimeout(r, 10))
  assert.deepEqual(copied, ['检查这个项目的安全问题，给出触发条件、文件位置和脱敏证据'])

  // Progress through Steps 2 -> 3 -> 4 and complete tour
  for (const expectedStepId of ['findings', 'dependencies', 'verify']) {
    const nextBtn = env.findAll(tourDialog, n => Object.hasOwn(n.props || {}, 'data-tour-next'))[0]
    nextBtn.props.onClick()
    wbTree = env.rerenderTree(() => env.React.createElement(Workbench, { workbench: true }))
    tourDialog = env.findAll(wbTree, n => n.props?.role === 'dialog' && n.props?.['aria-modal'] === 'false')[0]
    assert.equal(tourDialog.props['data-tour-card'], expectedStepId)
  }

  const doneBtn = env.findAll(tourDialog, n => Object.hasOwn(n.props || {}, 'data-tour-next'))[0]
  doneBtn.props.onClick()
  assert.equal(env.storage.get('dsh-code-security.tour.v1'), 'done')
  wbTree = env.rerenderTree(() => env.React.createElement(Workbench, { workbench: true }))
  assert.equal(env.findAll(wbTree, n => n.props?.role === 'dialog' && n.props?.['aria-modal'] === 'false').length, 0)

  // Verify modalOpen suppresses / closes active CoachmarkTour and popover="manual" uses setAttribute (not IDL .popover)
  let popoverAttr = null
  let popoverShown = false
  env.resetState()
  const PopoverHarness = () => {
    const tree = W.CoachmarkTour({
      steps: [{ id: 's1', selector: '#scan', side: 'bottom', title: 'T', desc: 'D' }],
      step: 0,
      manual: true,
      style: 'pixel8bit',
      lang: 'zh',
    })
    tree.props.ref.current = {
      setAttribute(k, v) { if (k === 'popover') popoverAttr = v },
      showPopover() { popoverShown = true },
      hidePopover() {},
    }
    return tree
  }
  env.renderTree(() => env.React.createElement(PopoverHarness))
  assert.equal(popoverAttr, 'manual')
  assert.equal(popoverShown, true)

  env.resetState()
  const suppressedPage = env.renderTree(() =>
    env.React.createElement(W.Page, {
      workbench: true,
      title: '代码安全',
      modalOpen: true,
      tourStorageKey: 'dsh-code-security.modal-test.v1',
      tourSteps: [{ id: 's1', selector: '#x', title: 'T', desc: 'D' }],
    }, 'body'),
  )
  await new Promise(r => setTimeout(r, 310))
  const afterTimer = env.rerenderTree(() =>
    env.React.createElement(W.Page, {
      workbench: true,
      title: '代码安全',
      modalOpen: true,
      tourStorageKey: 'dsh-code-security.modal-test.v1',
      tourSteps: [{ id: 's1', selector: '#x', title: 'T', desc: 'D' }],
    }, 'body'),
  )
  assert.equal(env.findAll(suppressedPage, n => n.props?.className === 'dsh-wb-tour-layer').length, 0)
  assert.equal(env.findAll(afterTimer, n => n.props?.className === 'dsh-wb-tour-layer').length, 0, 'modalOpen suppresses auto-tour')

  env.cleanup()
})

test('UI v3 unified 48px header, sliding tabs, resizable split pane, shimmer skeleton, serif materiality, and row quick actions', () => {
  const env = createMockEnv({ withHostPrimitives: false })
  const { W, SecurityResults, FindingCard } = env.client.probe

  // 1. Unified 48px single-row header with inline tabs and no subtitle row
  const tabsEl = env.React.createElement(W.Tabs, {
    id: 'sec-v3-tabs',
    label: '代码安全视图',
    value: 'findings',
    onChange() {},
    items: [
      { id: 'findings', label: '检查结果', count: 3 },
      { id: 'dependencies', label: '依赖检查' },
    ],
  })
  const pageTree = env.expand(env.renderTree(() =>
    env.React.createElement(
      W.Page,
      { workbench: true, title: '代码安全', icon: 'shield', navigation: tabsEl },
      env.React.createElement(W.TabPanel, { id: 'sec-v3-tabs', activeTab: 'findings' }, 'panel-body'),
    ),
  ))
  const header = env.findAll(pageTree, n => n.type === 'header' && Object.hasOwn(n.props || {}, 'data-dsh-header'))[0]
  assert.ok(header, 'renders unified .dsh-header')
  assert.equal(env.findAll(pageTree, n => String(n.props?.className || '').includes('dsh-wb-subtitle')).length, 0, 'subtitle row removed for single-row 48px header')
  assert.ok(env.findAll(header, n => String(n.props?.className || '').includes('dsh-tab-indicator')).length === 1, 'renders sliding tab indicator')
  assert.ok(env.findAll(pageTree, n => Object.hasOwn(n.props || {}, 'data-dsh-tab-panel')).length === 1, 'renders .dsh-tab-panel for 140ms entrance')

  // 2. Shimmer skeleton when SecurityResults is loading without report
  env.resetState()
  const skelTree = env.expand(env.renderTree(() =>
    env.React.createElement(SecurityResults, { loading: true, report: null, findings: [], fresh: new Set(), limit: 50 }),
  ))
  assert.ok(env.findAll(skelTree, n => Object.hasOwn(n.props || {}, 'data-dsh-skeleton')).length >= 3, 'renders DshSkeleton during initial loading')

  // 3. Resizable split pane + row hover quick actions + pixel cursor + [data-dsh-serif]
  const copied = []
  const opened = []
  const sampleFinding = {
    id: 'f-1',
    ruleId: 'SEC-001',
    cwe: 'CWE-78',
    severity: 'high',
    confidence: 'high',
    evidence: 'dataflow',
    file: 'src/run.ts',
    line: 42,
    snippet: 'exec(input)',
    title: 'Command injection',
    message: 'Unsafe shell execution',
  }
  const renderFindings = () => env.rerenderTree(() =>
    env.React.createElement(SecurityResults, {
      report: { hasScan: true, time: '2026-11-18T00:00:00Z', scope: { kind: 'scan', target: '.' }, findings: [sampleFinding] },
      findings: [sampleFinding],
      fresh: new Set(['f-1']),
      limit: 50,
      busy: false,
      loading: false,
      onCopy: f => copied.push(f.id),
      onOpen: f => opened.push(f.id),
    }),
  )
  env.resetState()
  let resultsTree = env.renderTree(() =>
    env.React.createElement(SecurityResults, {
      report: { hasScan: true, time: '2026-11-18T00:00:00Z', scope: { kind: 'scan', target: '.' }, findings: [sampleFinding] },
      findings: [sampleFinding],
      fresh: new Set(['f-1']),
      limit: 50,
      busy: false,
      loading: false,
      onCopy: f => copied.push(f.id),
      onOpen: f => opened.push(f.id),
    }),
  )
  const resizer = env.findAll(resultsTree, n => n.props?.role === 'separator' && Object.hasOwn(n.props || {}, 'data-dsh-resizer'))[0]
  assert.ok(resizer, 'renders DshSplitResizer separator')
  assert.equal(resizer.props['aria-valuenow'], 370)
  resizer.props.onKeyDown({ key: 'ArrowRight', preventDefault() {} })
  resultsTree = renderFindings()
  const updatedResizer = env.findAll(resultsTree, n => n.props?.role === 'separator' && Object.hasOwn(n.props || {}, 'data-dsh-resizer'))[0]
  assert.equal(updatedResizer.props['aria-valuenow'], 386)
  assert.equal(env.storage.get('dsh-code-security:split-width'), '386')
  updatedResizer.props.onDoubleClick()
  resultsTree = renderFindings()
  assert.equal(env.storage.get('dsh-code-security:split-width'), '370')

  const quickCopy = env.findAll(resultsTree, n => n.type === 'button' && n.props?.['data-sec-quick-action'] === 'copy')[0]
  const quickOpen = env.findAll(resultsTree, n => n.type === 'button' && n.props?.['data-sec-quick-action'] === 'open')[0]
  assert.ok(quickCopy && quickOpen, 'renders row hover quick actions for copy location and open file')
  quickCopy.props.onClick()
  quickOpen.props.onClick()
  assert.deepEqual(copied, ['f-1'])
  assert.deepEqual(opened, ['f-1'])

  assert.ok(env.findAll(resultsTree, n => n.props?.className === 'dsh-pixel-cursor').length >= 1, 'renders pixel8bit active cursor')
  assert.ok(env.findAll(resultsTree, n => Object.hasOwn(n.props || {}, 'data-dsh-serif')).length >= 2, 'stamps [data-dsh-serif] on row & detail titles')

  const cardTree = env.expand(env.React.createElement(FindingCard, { finding: sampleFinding, fresh: true, copied: false, onOpen() {}, onCopy() {} }))
  assert.ok(env.findAll(cardTree, n => n.type === 'h2' && Object.hasOwn(n.props || {}, 'data-dsh-serif')).length === 1)

  env.cleanup()
})

test('CoachmarkTour measure() safely escapes React.useId() colon selectors without throwing SyntaxError', () => {
  const env = createMockEnv({ withHostPrimitives: false })
  const { W } = env.client.probe
  const queried = []
  let capturedLayout = null
  const fakeTarget = { getBoundingClientRect: () => ({ left: 140, top: 14, width: 88, height: 32 }) }
  const rootRef = {
    current: {
      querySelector(sel) {
        queried.push(sel)
        if (sel.startsWith('#:')) throw new SyntaxError(`Failed to execute 'querySelector': '${sel}' is not a valid selector`)
        if (sel === '[id=":r22:-tabs-tab-findings"]') return fakeTarget
        return null
      },
    },
  }
  env.renderTree(() =>
    env.React.createElement(W.CoachmarkTour, {
      rootRef,
      steps: [{ id: 'findings', selector: '#:r22:-tabs-tab-findings', side: 'bottom', title: 'T', desc: 'D' }],
      step: 0,
      manual: true,
      style: 'gazette',
      font: 'arcade',
      setLayout: layout => { capturedLayout = layout },
    }),
  )
  assert.deepEqual(queried, ['#:r22:-tabs-tab-findings', '[id=":r22:-tabs-tab-findings"]'])
  assert.ok(capturedLayout?.spotlight, 'resolves spotlight bounds via escaped [id="..."] selector')
  env.cleanup()
})
