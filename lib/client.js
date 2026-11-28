// Generated: shared optional update controls; edit the original client templates.
(function(){
/* DSH workbench UI v1. MIT. Canonical source: dsh-suite/ui/workbench-ui.js.
 * Vendored into each plugin: no Suite or extra runtime dependency is required.
 * Styles are scoped to .dshw and never replace the host chrome or theme.
 */
function createWorkbenchUI(React) {
  const h = React.createElement;
  const { useEffect, useId, useRef } = React;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const paths = {
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z', 'M7 3v4M17 3v4M3 10h18'],
    mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
    rss: ['M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16', 'M4 19h.01'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    shield: ['m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z', 'm8 12 3 3 5-6'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    play: ['m9 6 9 6-9 6Z'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
    plus: ['M12 5v14M5 12h14'],
    refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
    settings: ['m9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z', 'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
    close: ['m6 6 12 12M18 6 6 18'],
    left: ['m14 5-7 7 7 7'],
    right: ['m10 5 7 7-7 7'],
    down: ['m5 9 7 7 7-7'],
    filter: ['M4 5h16M7 12h10M10 19h4'],
    download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
    upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
    copy: ['M8 8h13v13H8z', 'M16 8V3H3v13h5'],
    external: ['M14 3h7v7m0-7L10 14', 'M10 3H3v18h18v-7'],
    file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
    folder: ['M3 5h7l2 3h9v12H3z'],
    edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
    trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
    more: ['M5 12h.01M12 12h.01M19 12h.01'],
    info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
    check: ['m5 12 4 4L19 6'],
    quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
    star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
    reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
    link: ['m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0', 'm14 8 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0'],
  };
  function Icon({ name = 'file', size = 20, ...props }) {
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false, ...props },
      (paths[name] || paths.file).map((d, index) => h('path', { key: index, d })));
  }
  function Button({ children, icon, variant, className, ...props }) {
    return h('button', { type: 'button', ...props, className: cx('w-button', variant && 'w-' + variant, className) }, icon ? h(Icon, { name: icon, size: 18 }) : null, children);
  }
  function IconButton({ label, icon, ...props }) {
    return h(Button, { ...props, icon, className: cx('w-icon-button', props.className), 'aria-label': label, title: label });
  }
  function Page({ title, subtitle, actions, children, workbench = false, className, rootRef, ...props }) {
    return h('section', { ...props, ref: rootRef, className: cx('dshw', 'w-page', className), 'data-main': workbench ? 'true' : 'false' },
      h(Styles, { key: 'styles' }),
      h('header', { className: 'w-page-header' }, h('div', { className: 'w-heading' }, h('h1', null, title), subtitle ? h('p', { className: 'w-subtitle' }, subtitle) : null), actions ? h('div', { className: 'w-header-actions' }, actions) : null),
      h('div', { className: 'w-body' }, children));
  }
  function Tabs({ items, value, onChange, label, children }) {
    const id = useId();
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    function keys(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
      const node = event.currentTarget.parentElement?.querySelectorAll('[role=tab]')[next];
      if (node) { onChange(items[next].id); node.focus(); }
    }
    return h('div', { className: 'w-tabs-layout' },
      h('div', { className: 'w-tabs', role: 'tablist', 'aria-label': label }, items.map((item, index) => h('button', {
        type: 'button', role: 'tab', key: item.id, id: id + '-' + item.id, 'aria-controls': id + '-panel', 'aria-selected': active === item.id, tabIndex: active === item.id ? 0 : -1,
        onClick: () => onChange(item.id), onKeyDown: event => keys(event, index),
      }, item.label, item.count !== undefined ? h('span', { className: 'w-count' }, item.count) : null))),
      h('div', { className: 'w-tab-panel', id: id + '-panel', role: 'tabpanel', 'aria-labelledby': id + '-' + active }, children));
  }
  function Status({ children, tone = 'info', className }) {
    if (!children) return null;
    return h('div', { className: cx('dshw', 'w-status', 'w-status-' + tone, className), role: tone === 'error' ? 'alert' : 'status', 'aria-live': tone === 'error' ? 'assertive' : 'polite' }, h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 18 }), h('div', null, children));
  }
  function Empty({ title, children, action, icon = 'file' }) {
    return h('div', { className: 'dshw w-empty' }, h(Styles, { key: 'styles' }), h(Icon, { name: icon, size: 32 }), h('h2', null, title), children ? h('div', { className: 'w-muted' }, children) : null, action ? h('div', { className: 'w-toolbar' }, action) : null);
  }
  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useRef(null);
    useEffect(() => {
      if (!selected || !ref.current || ref.current.clientWidth > 760) return;
      const heading = ref.current.querySelector('.w-detail h2');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }, [selected]);
    return h('div', { ref, className: cx('w-split', className), 'data-selected': selected ? 'true' : 'false', style: { '--w-list-width': listWidth + 'px' } },
      h('div', { className: 'w-master' }, list),
      h('div', { className: 'w-detail' }, selected ? h(Button, { className: 'w-back', icon: 'left', variant: 'ghost', onClick: onBack }, backLabel) : null, detail));
  }
  function Row({ title, meta, description, active, onClick, children, status, className, disabled }) {
    return h('div', { className: cx('w-row', active && 'w-selected', className) },
      children ? h('div', { className: 'w-row-select' }, children) : null,
      h('button', { type: 'button', className: 'w-row-button', onClick, disabled, 'aria-pressed': !!active },
        h('span', { className: 'w-row-head' }, h('strong', null, title), status ? h('span', { className: 'w-tag' }, status) : null),
        meta ? h('span', { className: 'w-row-meta' }, meta) : null,
        description ? h('span', { className: 'w-row-description' }, description) : null));
  }
  function Search({ label, value, onChange, ...props }) {
    const id = useId();
    return h('div', { className: 'w-search' }, h(Icon, { name: 'search', size: 18 }), h('input', { type: 'search', id, 'aria-label': label, placeholder: label, value, onChange, ...props }));
  }
  function Switch({ label, checked, onChange, disabled }) {
    return h('label', { className: 'w-switch-label' }, h('span', null, label), h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange, 'aria-label': label }), h('span', { className: 'w-switch-track', 'aria-hidden': true }));
  }
  function Dialog({ title, children, onClose, closeLabel, className, busy = false }) {
    const id = useId(), panel = useRef(null);
    useEffect(() => {
      const previous = document.activeElement;
      panel.current?.querySelector('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')?.focus();
      return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
    }, []);
    function keydown(event) {
      if (event.key === 'Escape' && !event.isComposing) { event.preventDefault(); event.stopPropagation(); if (!busy) onClose(); return; }
      if (event.key !== 'Tab') return;
      const controls = [...panel.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')].filter(node => node.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (!controls.length) { event.preventDefault(); panel.current.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return h('div', { className: 'dshw w-overlay', onClick: event => { if (!busy && event.target === event.currentTarget) onClose(); } },
      h(Styles, { key: 'styles' }),
      h('section', { ref: panel, className: cx('w-dialog', className), role: 'dialog', 'aria-modal': true, 'aria-labelledby': id, tabIndex: -1, onKeyDown: keydown },
        h('header', { className: 'w-dialog-header' }, h('h2', { id }, title), h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: onClose })), h('div', { className: 'w-dialog-body' }, children)));
  }
  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    // The two slots are optional. Existing settings and manual tools still load
    // in hosts without a workbench, while RC.3 owns navigation/pinning itself.
    ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) }, component));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) { return h(Icon, { name: icon, size }); }));
  }
  const styles = `
.dshw{--w-bg:var(--dsw-alias-bg-layer-1,#fff);--w-soft:var(--dsw-alias-bg-layer-2,#f7f8fa);--w-text:var(--dsw-alias-label-primary,#18202c);--w-muted:var(--dsw-alias-label-secondary,#667085);--w-border:var(--dsw-alias-border-l3,#e7e9ef);--w-accent:var(--dsh-plugin-workbench-accent,#4f6bdb);--w-selected:color-mix(in srgb,var(--w-accent) 10%,var(--w-bg));--w-primary:var(--w-text);--w-on-primary:var(--w-bg);container-type:inline-size;container-name:dsh-workbench;color:var(--w-text);font:14px/1.65 var(--dsh-font-family-content,system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif);min-width:0;max-width:100%;box-sizing:border-box;text-align:start;color-scheme:inherit}
.dshw *,.dshw *:before,.dshw *:after{box-sizing:border-box}.dshw h1,.dshw h2,.dshw h3,.dshw h4,.dshw p{margin:0}.dshw h1{font-size:30px;line-height:1.25;letter-spacing:-.025em;font-weight:650}.dshw h2{font-size:24px;line-height:1.35;font-weight:650;letter-spacing:-.015em;overflow-wrap:anywhere}.dshw h3,.dshw h4{font-size:16px;line-height:1.4;font-weight:600}.dshw a{color:var(--w-accent);text-underline-offset:3px;overflow-wrap:anywhere}.dshw button,.dshw input,.dshw select,.dshw textarea{font:inherit;color:inherit;max-width:100%}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select,.dshw textarea{background:var(--dsw-specific-input-major,var(--w-bg));border:1px solid var(--w-border);border-radius:8px;padding:8px 11px;min-width:0;line-height:1.5}.dshw input:not([type=checkbox]):not([type=radio]):not([type=file]),.dshw select{min-height:38px}.dshw textarea{resize:vertical}.dshw input[type=checkbox],.dshw input[type=radio]{width:16px;height:16px;flex-shrink:0;accent-color:var(--w-accent)}.dshw :focus-visible{outline:2px solid var(--w-accent);outline-offset:3px}.dshw button:disabled,.dshw input:disabled,.dshw select:disabled,.dshw textarea:disabled{opacity:.5;cursor:not-allowed}.dshw label{font-size:13px}.dshw fieldset{min-width:0;border:1px solid var(--w-border);border-radius:8px}.dshw summary{cursor:pointer;font-weight:550;list-style:none;display:flex;align-items:center;gap:8px}.dshw summary::-webkit-details-marker{display:none}.dshw summary:after{content:'';display:block;margin-inline-start:auto;width:7px;height:7px;border-inline-end:1.75px solid currentColor;border-bottom:1.75px solid currentColor;transform:rotate(45deg);flex-shrink:0}.dshw details[open]>summary:after{transform:rotate(225deg)}.dshw details>summary+*{margin-top:12px}.dshw pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;max-width:100%;background:var(--w-soft);border-radius:6px;padding:14px}.dshw img,.dshw video,.dshw iframe{max-width:100%}
.w-page{display:flex;flex-direction:column;position:relative;padding:0;min-height:540px;gap:0}.w-page[data-main=true]{height:100%;min-height:0;padding:calc(24px + var(--dsh-frame-top-clearance,0px)) 28px 0 max(28px,var(--dsh-frame-leading-clearance,0px));overflow:auto}.dshw[data-main=true]{background:var(--w-bg)}.dshw.w-page,.dshw .w-body,.dshw .w-tab-panel{overflow-x:clip}.w-page-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding-bottom:22px;flex-shrink:0}.w-heading{min-width:0}.w-subtitle{margin-top:8px!important;font-size:14px;color:var(--w-muted);line-height:1.6}.w-header-actions,.w-toolbar,.w-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px;min-width:0}.w-header-actions{justify-content:flex-end}.w-body,.w-tabs-layout{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0}.w-body{overflow:auto}.w-tab-panel{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column;overflow:auto}.w-tabs{display:flex;align-items:stretch;gap:20px;border-bottom:1px solid var(--w-border);flex-shrink:0;overflow-x:auto;scrollbar-width:thin}.dshw .w-tabs>button{border:0;border-bottom:2px solid transparent;background:transparent;padding:11px 8px 13px;white-space:nowrap;font-size:14px;font-weight:550;cursor:pointer;color:var(--w-muted);display:flex;align-items:center;gap:7px}.dshw .w-tabs>button[aria-selected=true]{border-bottom-color:var(--w-accent);color:var(--w-accent)}.w-count,.w-tag{font-size:12px;line-height:1.5;display:inline-flex;align-items:center;flex-shrink:0;background:var(--w-soft);border-radius:5px;padding:1px 6px;color:var(--w-muted)}.w-tabs [aria-selected=true] .w-count,.w-selected .w-tag{color:var(--w-accent);background:var(--w-selected)}
.dshw .w-button{display:inline-flex;justify-content:center;align-items:center;gap:7px;background:var(--w-bg);border:1px solid var(--w-border);border-radius:8px;padding:8px 12px;min-height:36px;line-height:1.4;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;white-space:normal}.dshw .w-button:not(:disabled):hover{background:var(--w-soft)}.dshw .w-primary{background:var(--w-primary);border-color:var(--w-primary);color:var(--w-on-primary)}.dshw .w-primary:not(:disabled):hover{background:var(--w-primary);opacity:.9}.dshw .w-ghost{background:transparent;border-color:transparent}.dshw .w-danger{color:var(--dsw-alias-state-error-primary,#b43c3c)}.dshw .w-icon-button{width:36px;min-width:36px;padding:8px}.dshw .w-button svg{flex-shrink:0}.w-muted{color:var(--w-muted);font-size:12px;line-height:1.6}.w-section{padding:24px 0;border-bottom:1px solid var(--w-border);min-width:0}.w-section>h3{margin-bottom:12px}.w-section>p+p{margin-top:8px}.w-fields{display:grid;gap:16px;min-width:0}.w-field{display:grid;gap:6px;min-width:0}.w-field>input,.w-field>select,.w-field>textarea{width:100%}.w-status{display:flex;align-items:flex-start;gap:8px;padding:11px 13px;margin:12px 0;border:1px solid var(--w-border);border-radius:8px;background:var(--w-soft);font-size:13px;overflow-wrap:anywhere;flex-shrink:0}.w-status>svg{flex-shrink:0;margin-top:2px}.w-status-error{color:var(--dsw-alias-state-error-primary,#ad3636)}.w-status-success{color:var(--dsw-alias-state-success-primary,#24794a)}.w-status-warn{color:var(--dsw-alias-state-warning-primary,#8a5a00)}.w-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px;width:100%;max-width:580px;padding:48px 24px;margin:auto;min-height:280px;overflow-wrap:anywhere}.w-empty>svg{color:var(--w-muted)}.w-empty h2{font-size:20px}.w-empty .w-muted{font-size:14px}.w-empty .w-toolbar{justify-content:center}
.w-split{display:grid;grid-template-columns:minmax(240px,var(--w-list-width)) minmax(0,1fr);min-height:460px;flex:1;min-width:0}.w-master{min-width:0;border-inline-end:1px solid var(--w-border);overflow:auto;padding-bottom:24px}.w-detail{min-width:0;padding:26px 28px;overflow:auto;overflow-wrap:anywhere;display:flex;flex-direction:column}.w-master-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:20px 16px}.w-search{display:flex;align-items:center;gap:8px;border:1px solid var(--w-border);border-radius:8px;padding:0 10px;min-width:0;flex:1;background:var(--w-bg)}.w-search>svg{color:var(--w-muted);flex-shrink:0}.dshw .w-search>input{border:0!important;background:transparent!important;padding:8px 0!important;width:100%;outline-offset:0}.w-row{display:flex;gap:0;min-width:0;position:relative;border-bottom:1px solid var(--w-border);border-inline-start:3px solid transparent}.w-row-select{display:flex;align-items:flex-start;padding:21px 0 0 14px}.dshw .w-row-button{display:flex;flex-direction:column;align-items:stretch;gap:7px;text-align:start;width:100%;padding:18px 18px 18px 16px;border:0;background:transparent;color:inherit;min-width:0;cursor:pointer;line-height:1.5}.dshw .w-row-button:hover{background:var(--w-soft)}.w-row-head{display:flex;align-items:flex-start;gap:10px;justify-content:space-between;min-width:0}.w-row-head>strong{font-size:14px;line-height:1.5;font-weight:600;overflow-wrap:anywhere}.w-row-meta,.w-row-description{color:var(--w-muted);font-size:12px;line-height:1.6;overflow-wrap:anywhere}.w-row-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.w-selected{background:var(--w-selected);border-inline-start-color:var(--w-accent)}.w-back{display:none!important}.w-detail-title{margin-bottom:12px!important}.w-detail-meta{color:var(--w-muted);font-size:13px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.w-detail-footer{padding:24px 0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:auto;border-top:1px solid var(--w-border)}.w-detail-footer .w-muted{flex:1;min-width:160px}.w-definition{display:grid;grid-template-columns:minmax(80px,120px) minmax(0,1fr);gap:8px 16px;font-size:14px;margin:20px 0}.w-definition dt{color:var(--w-muted)}.w-definition dd{margin:0;min-width:0;overflow-wrap:anywhere}
.w-switch-label{display:inline-flex;align-items:center;gap:8px;font-size:13px;position:relative;cursor:pointer}.w-switch-label>input{position:absolute;opacity:0;inset-inline-end:0;width:36px!important;height:22px!important;margin:0;cursor:pointer}.w-switch-track{width:36px;height:22px;border-radius:12px;display:block;background:var(--w-border);border:1px solid var(--w-border);pointer-events:none;padding:2px;transition:background .15s}.w-switch-track:before{content:'';display:block;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0002;transition:transform .15s}.w-switch-label>input:checked+.w-switch-track{background:var(--w-accent);border-color:var(--w-accent)}.w-switch-label>input:checked+.w-switch-track:before{transform:translateX(14px)}.w-switch-label>input:focus-visible+.w-switch-track{outline:2px solid var(--w-accent);outline-offset:3px}.w-switch-label:has(>input:disabled){opacity:.5;cursor:not-allowed}
.w-overlay{position:fixed;inset:0;background:#0005;display:flex;justify-content:flex-end;z-index:1000;padding:12px;overflow:auto}.w-dialog{width:min(620px,100%);max-height:100%;display:flex;flex-direction:column;min-height:0;background:var(--w-bg);color:var(--w-text);border:1px solid var(--w-border);border-radius:12px;box-shadow:0 18px 70px #0003}.w-dialog-header{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid var(--w-border);flex-shrink:0}.w-dialog-header>h2{font-size:20px}.w-dialog-body{overflow:auto;padding:20px 24px;min-height:0}.w-editor-grid{display:grid;grid-template-columns:210px minmax(0,1fr) 300px;min-height:500px;flex:1}.w-editor-list{padding:20px 12px;border-inline-end:1px solid var(--w-border);min-width:0}.w-editor-canvas{background:var(--w-soft);padding:20px;min-width:0;display:flex;flex-direction:column;gap:14px}.w-editor-inspector{padding:24px;border-inline-start:1px solid var(--w-border);min-width:0;overflow:auto}.w-editor-inspector h3{margin-bottom:18px}.w-preview-empty{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;aspect-ratio:16/9;min-height:180px;background:var(--w-soft);border:1px solid var(--w-border);border-radius:8px;padding:24px;color:var(--w-muted)}.w-content-pad{padding:24px 0}.w-stack{display:flex;flex-direction:column;gap:16px;min-width:0}.w-scroll-x{overflow:auto;max-width:100%}
@container dsh-workbench (max-width:1000px){.w-editor-grid{grid-template-columns:160px minmax(0,1fr)}.w-editor-inspector{grid-column:1/-1;border-inline-start:0;border-top:1px solid var(--w-border)}.w-header-actions{max-width:60%}.w-split{grid-template-columns:minmax(240px,32%) minmax(0,1fr)}}
@container dsh-workbench (max-width:760px){.w-page-header{gap:14px;flex-wrap:wrap;padding-bottom:18px}.w-heading{flex:1;min-width:170px}.dshw h1{font-size:24px}.w-header-actions{max-width:100%;justify-content:flex-start}.w-subtitle{font-size:13px}.w-tabs{gap:12px}.dshw .w-tabs>button{padding:10px 4px 12px}.w-split{display:block;min-height:360px}.w-split[data-selected=false]>.w-detail{display:none}.w-split[data-selected=true]>.w-master{display:none}.w-master{border-inline-end:0}.w-detail{padding:20px 0}.w-back{display:inline-flex!important;align-self:flex-start;margin:0 0 16px!important}.w-detail h2{font-size:22px}.w-master-toolbar{padding:16px 0}.dshw .w-row-button{padding:16px 10px}.w-detail-footer{position:static}.w-detail-footer .w-muted{flex-basis:100%}.w-editor-grid{display:flex;flex-direction:column}.w-editor-list{border-inline-end:0;border-bottom:1px solid var(--w-border);padding:16px 0}.w-editor-canvas{padding:16px 0;background:var(--w-bg)}.w-editor-inspector{padding:20px 0}.w-dialog-header,.w-dialog-body{padding:16px}.w-button{min-height:40px}.w-definition{grid-template-columns:80px minmax(0,1fr)}}
@media(max-width:700px){.w-page[data-main=true]{padding:calc(16px + var(--dsh-frame-top-clearance,0px)) 16px 0 max(16px,var(--dsh-frame-leading-clearance,0px))}.w-overlay{padding:8px}.w-dialog{width:100%}}
@media(prefers-reduced-motion:reduce){.dshw *,.dshw *:before{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`;
  function Styles() { return h('style', null, styles); }
  return { Icon, Button, IconButton, Page, Tabs, Status, Empty, Split, Row, Search, Switch, Dialog, Styles, register, styles };
}

/* One update control per plugin. Only transport, idle guards and installation
 * coordination are shared; no global update page or update-all action exists. */
function __stardustUpdatesGuards() {
  const key = Symbol.for('stardustlc.plugin-updates.guards.v1');
  return globalThis[key] ||= { values: new Map(), listeners: new Set(), viewListeners: new Set(), clients: new Set() };
}
function __stardustUpdatesGuard(React, name, { dirty = false, busy = false, retainOnClose = false } = {}) {
  const token = React.useRef(null);
  if (!token.current) token.current = {};
  React.useLayoutEffect(() => {
    const pool = __stardustUpdatesGuards();
    if (!dirty && !busy) for (const [key, value] of pool.values) if (value.name === name && value.orphan) pool.values.delete(key);
    pool.values.set(token.current, { name, dirty: !!dirty, busy: !!busy, retainOnClose, orphan: false });
    for (const listener of pool.listeners) listener();
  }, [name, !!dirty, !!busy, retainOnClose]);
  React.useEffect(() => () => {
    const pool = __stardustUpdatesGuards(), value = pool.values.get(token.current);
    if (value?.retainOnClose && (value.dirty || value.busy)) value.orphan = true;
    else pool.values.delete(token.current);
    for (const listener of pool.listeners) listener();
  }, []);
}
function __StardustPluginUpdatesFooter({ React, name }) {
  const [, render] = React.useState(0), pool = __stardustUpdatesGuards();
  React.useEffect(() => { const fn = () => render(value => value + 1); pool.viewListeners.add(fn); return () => pool.viewListeners.delete(fn); }, []);
  const client = [...pool.clients].find(client => typeof client.Footer === 'function' && client.has(name));
  if (!client) return null;
  return React.createElement(client.Footer, { name });
}
function __stardustUpdatesFooter(React, name) {
  return React.createElement(__StardustPluginUpdatesFooter, { key: 'plugin-updates', React, name });
}
function __stardustUpdatesInlinePage(React, element, name) {
  return React.cloneElement(element, null, element.props.children, __stardustUpdatesFooter(React, name));
}
function __stardustUpdatesDetailName(subject, rows) {
  if (!subject || !['bundle', 'row'].includes(subject.kind)) return null;
  if (subject.kind === 'row' && subject.pkg?.name === '@stardustlc/dsh-suite') {
    const component = rows.find(row => row.bundledBy === subject.pkg.name && (subject.row?.moduleName === row.name || subject.row?.moduleName?.startsWith(row.name + '/')));
    if (component) return component.name;
  }
  return rows.some(row => row.name === subject.pkg?.name) ? subject.pkg.name : null;
}
function __stardustUpdatesNativeFormState(document) {
  let dirty = false, busy = false;
  for (const scope of document.querySelectorAll('[data-plugin-detail],[data-plugin-row-detail]')) for (const button of scope.querySelectorAll('button')) {
    if (!button.getClientRects().length || button.closest('.plugin-updates-footer')) continue;
    const label = (button.getAttribute('aria-label') || button.textContent || '').trim();
    if (/^(?:正在保存|保存中|Saving)(?:[.…\s]|$)/i.test(label) || button.getAttribute('aria-busy') === 'true') busy = true;
    if (!button.disabled && button.getAttribute('aria-disabled') !== 'true' && /^(?:保存(?:更改|设置|配置)?|Save(?: changes| settings| configuration)?)(?:\s+(?:Ctrl|⌘|Enter|↵).*)?$/i.test(label)) dirty = true;
  }
  return { dirty, busy };
}
function __stardustUpdatesDisplayRows(next, known) {
  for (const row of next.rows) known.set(row.name, row);
  if (!['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state)) return next;
  const rows = [...next.rows];
  for (const row of known.values()) if ((row.name === next.job.name || row.bundledBy === next.job.name) && !rows.some(item => item.name === row.name)) rows.push({ ...row, updating: true });
  return { ...next, rows };
}
function __stardustUpdatesSuiteRows(next, participants) {
  // The official manager lists top-level dependencies, not Suite's transitive
  // components. Project active, build-identified clients for display only.
  // Installation and preferences still use the real Suite row from the host.
  const suiteUpdating = next.job?.name === '@stardustlc/dsh-suite' && ['verifying', 'installing', 'cancelling', 'unknown', 'restore-failed'].includes(next.job?.state);
  const suite = next.rows.find(row => row.name === '@stardustlc/dsh-suite' && (row.enabled || suiteUpdating));
  if (!suite) return next;
  const rows = [...next.rows], names = new Set(rows.map(row => row.name));
  for (const item of participants) if (item.suiteComponent && item.packageVersion && item.label && !names.has(item.name)) {
    names.add(item.name);
    rows.push({ name: item.name, version: item.packageVersion, enabled: true, sourceKind: 'suite', loadError: false, label: item.label, labelEn: item.labelEn, bundledBy: suite.name });
  }
  return { ...next, rows };
}
function __stardustUpdatesWrap(definition, participant) {
  return { ...definition, factory(require) {
    const original = definition.factory(require);
    if (!original || typeof original !== 'object') return original;
    const React = require('react');
    return { ...original, apply(ctx, ...args) {
      const result = original.apply?.call(this, ctx, ...args);
      // The optional alpha.3 slot stays dormant in older hosts; its scoped
      // injection unregisters naturally when the plugin is unloaded.
      if (participant.iconData && participant.sectionIds?.length && typeof ctx.inject === 'function') ctx.inject(['slots'], host => {
        for (const id of new Set(participant.sectionIds)) host.slots.inject('settings.section.icon', () => host.slots.register({ name: 'settings.section.icon', id }, function PluginSettingsIcon({ size = 20 }) {
          return React.createElement('img', { src: participant.iconData, alt: '', 'aria-hidden': true, width: size, height: size, style: { objectFit: 'contain', display: 'block', flexShrink: 0 } });
        }));
      });
      if (typeof ctx.inject === 'function') ctx.inject(['slots', 'locale', 'remote', 'remote.pluginManager'], host => __stardustUpdatesJoin(host, React, require, participant));
      return result;
    } };
  } };
}
function __stardustUpdatesJoin(host, React, require, participant) {
  const uiRevision = 12;
  const key = Symbol.for('stardustlc.plugin-updates.client.v1'), pools = globalThis[key] ||= new WeakMap(), root = host.root || host;
  if (typeof root.plugin !== 'function') return;
  let record = pools.get(root);
  if (!record) {
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision, migration: Promise.resolve() };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if ((record.uiRevision || 0) < uiRevision && (record.requestedUiRevision || 0) < uiRevision) {
    // An earlier loaded participant may still own an older client revision. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    const previousMigration = record.migration;
    shared.requestedUiRevision = uiRevision;
    record.upgrading = record.migration = Promise.resolve(previousMigration).then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = uiRevision; pools.set(root, shared);
      __stardustUpdatesActivate(shared, pools, root, React, require);
    }).catch(() => { /* The original page remains usable if host disposal fails. */ }).finally(() => {
      if (shared.requestedUiRevision === uiRevision) { shared.requestedUiRevision = 0; shared.upgrading = null; }
    });
  }
  clearTimeout(record.timer);
  const ref = {}; record.refs.set(ref, participant);
  host.effect(() => () => {
    record.refs.delete(ref);
    const stop = () => {
      if (record.refs.size || !record.alive) return;
      if (record.hold) { record.timer = setTimeout(stop, 1000); return; }
      record.alive = false; Promise.resolve(record.fiber?.dispose?.()).catch(() => {});
    };
    if (!record.refs.size) record.timer = setTimeout(stop, 1000);
  });
}
function __stardustUpdatesActivate(shared, pools, root, React, require) {
  shared.fiber = root.plugin({ name: 'stardustlc-plugin-updates-client', inject: ['slots', 'locale', 'remote', 'remote.pluginManager'], apply(ctx) {
    const client = __stardustUpdatesClient(ctx, React, require, shared);
    ctx.effect(() => () => { shared.alive = false; client.dispose(); if (pools.get(root) === shared) pools.delete(root); });
  } });
  Promise.resolve(shared.fiber).catch(() => { shared.alive = false; if (pools.get(root) === shared) pools.delete(root); });
}
function __stardustUpdatesClient(ctx, React, require, shared) {
  const h = React.createElement, W = createWorkbenchUI(React), route = new URL('api/stardustlc/plugin-updates', document.baseURI);
  const { useState, useEffect, useRef } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const REPOS = { 'dsh-blender-studio': 'dsh-blender-studio', 'dsh-calendar': 'dsh-calendar', 'dsh-cite': 'dsh-cite', 'dsh-code-security': 'dsh-code-security', 'dsh-codex-port': 'dsh-codex-port', 'deepseek-computer-use': 'deepseek-computer-use', 'dsh-dingtalk': 'dsh-dingtalk', '@stardustlc/dsh-docker': 'dsh-docker', '@stardustlc/dsh-dream': 'dsh-dream', 'dsh-email': 'dsh-email', 'dsh-ffmpeg': 'dsh-ffmpeg', 'dsh-flakefinder': 'dsh-flakefinder', 'dsh-hyperframes': 'dsh-hyperframes', 'dsh-minimal-ptc': 'dsh-minimal-ptc', 'dsh-ppt': 'dsh-ppt', 'dsh-remotion': 'dsh-remotion', '@stardustlc/dsh-review': 'dsh-review', 'dsh-rss': 'dsh-rss', 'dsh-slack': 'dsh-slack', 'dsh-sql': 'dsh-sql', '@stardustlc/dsh-suite': 'dsh-suite', 'dsh-voice': 'dsh-voice' };
  const repoUrl = pkg => Object.hasOwn(REPOS, pkg) ? 'https://github.com/STARDUSTLC666/' + REPOS[pkg] : null;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, autoScope: 'compatible', deferredUntil: 0, ignoredVersion: null };
  const originalRow = name => state?.rows.find(row => row.name === name);
  const rowFor = name => { const row = originalRow(name); return row?.bundledBy ? originalRow(row.bundledBy) : row; };
  const activeJob = () => ['verifying', 'installing', 'cancelling'].includes(state?.job?.state);
  function notify() { shared.hold = manualOperation || activeJob(); for (const listener of listeners) listener(); for (const listener of pool.viewListeners) listener(); }
  async function api(body = { action: 'state' }) {
    const controller = new AbortController(); requests.add(controller);
    const timeout = setTimeout(() => controller.abort(), body.action === 'check' ? 95000 : 45000);
    try {
      const response = await fetch(route, { method: 'POST', credentials: 'same-origin', cache: 'no-store', signal: controller.signal, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify(body) });
      let data; try { data = await response.json(); } catch { throw new Error('service-unavailable'); }
      if (!response.ok || !data.ok) throw new Error(response.status === 403 ? 'owner-required' : data.code || 'service-unavailable');
      return data.value;
    } catch (error) { if (error?.name === 'AbortError') throw new Error('service-unavailable'); throw error; }
    finally { clearTimeout(timeout); requests.delete(controller); }
  }
  function pageState(manual = manualOperation) {
    const values = [...pool.values.values()], nativeForm = __stardustUpdatesNativeFormState(document);
    const dialog = [...document.querySelectorAll('[role="dialog"],dialog[open]')].some(node => node.getClientRects().length && !(manual && (node.closest('.plugin-updates-footer') || node.querySelector('.plugin-updates-footer'))));
    return { action: 'heartbeat', id, dirty: nativeForm.dirty || values.some(value => value.dirty), busy: nativeForm.busy || values.some(value => value.busy) || dialog, idleForMs: Math.min(86400000, Math.max(0, Date.now() - lastInteraction)) };
  }
  const heartbeat = () => api(pageState());
  function interaction() { lastInteraction = Date.now(); if (registered && alive) void heartbeat().catch(() => {}); }
  const guardChanged = () => { if (registered && alive) void heartbeat().catch(() => {}); };
  for (const event of ['pointerdown', 'keydown', 'input']) document.addEventListener(event, interaction, { capture: true, passive: true });
  pool.listeners.add(guardChanged);
  const close = () => { void fetch(route, { method: 'POST', credentials: 'same-origin', keepalive: true, headers: { 'content-type': 'application/json', 'x-stardustlc-updates': '1' }, body: JSON.stringify({ action: 'client-close', id }) }).catch(() => {}); };
  window.addEventListener('pagehide', close);
  let issuedSnapshot = 0, appliedSnapshot = 0;
  async function refresh() {
    const request = ++issuedSnapshot;
    const next = await api();
    if (alive && request > appliedSnapshot) {
      appliedSnapshot = request;
      state = __stardustUpdatesDisplayRows(__stardustUpdatesSuiteRows(next, shared.refs.values()), knownRows);
      notify();
    }
    return next;
  }
  const STALE_CHECK_MS = 30 * 60 * 1000, STALE_RETRY_MS = 5 * 60 * 1000, staleChecks = new Map(), staleInFlight = new Set();
  function refreshIfStale(row) {
    if (!alive || !row || row.sourceKind !== 'registry' || row.bundledBy || !row.available || row.updating) return;
    const now = Date.now();
    if (row.checkedAt && now - row.checkedAt <= STALE_CHECK_MS) return;
    if (staleInFlight.has(row.name) || now - (staleChecks.get(row.name) ?? -Infinity) < STALE_RETRY_MS) return;
    staleChecks.set(row.name, now);
    staleInFlight.add(row.name);
    void (async () => {
      try { await api({ action: 'check', name: row.name }); await refresh(); }
      catch { /* Offline or transient errors stay silent and throttled by staleChecks. */ }
      finally { staleInFlight.delete(row.name); }
    })();
  }
  function useSnapshot() {
    const [, render] = useState(0);
    useEffect(() => { const fn = () => render(value => value + 1); listeners.add(fn); const stop = ctx.locale?.subscribe?.(fn); return () => { listeners.delete(fn); stop?.(); }; }, []);
    return state;
  }
  function message(code) {
    return ({
      'page-dirty': t('有未保存的修改。请先保存或放弃修改，再更新。', 'Save or discard unsaved changes before updating.'),
      'page-busy': t('有页面操作或对话框尚未结束，请完成后再试。', 'Finish the active page operation or close its dialog, then retry.'),
      'page-not-ready': t('还有窗口状态未确认，或旧版插件尚未提供状态保护。请刷新相关窗口，必要时先手动更新旧版插件。', 'A window state is unknown or an older plugin lacks state protection. Refresh the affected windows and manually update legacy plugins if needed.'),
      busy: t('DSH 正在执行任务或安装，请等操作结束。', 'DSH is running a task or installation. Wait for it to finish.'),
      'activity-unknown': t('无法确认任务是否空闲，已暂停安装。', 'Installation paused because task activity is unknown.'),
      'restart-required': t('更新服务需要重启后继续。请在方便时手动重启 DSH。', 'The updater needs a restart. Restart DSH manually when convenient.'),
      'operation-unconfirmed': t('上次安装未确认或恢复失败。请在官方插件管理中检查并修复，之后手动重启 DSH。', 'The last installation is unconfirmed or recovery failed. Check and repair it in native plugin management, then restart DSH manually.'),
      'check-first': t('检查结果已过期，请重新检查。', 'This check expired. Check again.'),
      'release-changed': t('发现更新的发布版本（或发布信息已更新），已刷新至最新状态，请再次确认安装。', 'A newer release or updated metadata was found and refreshed; confirm again to install.'),
      'preferences-conflict': t('另一个窗口修改了偏好，已刷新，请重试。', 'Preferences changed in another window. They have been refreshed; retry.'),
      'preferences-unreadable': t('更新偏好文件无法读取，自动安装已关闭。请检查当前 profile 的 stardustlc-plugin-updates.json。', 'Preferences could not be read. Automatic installation is off. Check stardustlc-plugin-updates.json in this profile.'),
      'no-update': t('版本已变化或暂不兼容，请重新检查。', 'The version changed or is incompatible. Check again.'),
      'source-not-registry': t('本地源码、Git 等安装，请通过原安装方式更新。', 'Update local, Git and other external sources through their original installation method.'),
      'managed-by-suite': t('这个插件随 Suite 安装，通过 Suite 更新。', 'This plugin was installed through Suite and is updated through Suite.'),
      'owner-required': t('只有 profile 拥有者能管理更新。', 'Only the profile owner can manage updates.'),
      'version-mismatch': t('宿主装入的版本与目标不同。请重新检查版本和软件源策略。', 'The installed version differs from the target. Check the release and registry policy.'),
      'unexpected-package': t('宿主装入的包或版本与目标不同。请检查版本和软件源策略。', 'The installed package or version differed from the target. Check the release and registry policy.'),
      'version-unconfirmed': t('尚未确认新版已加载，请在插件详情中检查当前版本。', 'The new version could not be confirmed. Check the installed version in plugin details.'),
      'build-blocked': t('构建脚本等待批准。请查看原生插件管理中的安装提示。', 'Build scripts await approval. Review the install details in native plugin management.'),
      'bundle-in-use': t('宿主暂时无法热卸载旧版（通常因本轮刚更新过其他共用底层依赖的插件，内存路径待刷新；或同时启用了包含此组件的组合包）：直接手动重启一次 DSH 即可继续更新，无需逐个停用插件。', 'The host cannot hot-unload the previous version right now (usually because another plugin sharing dependencies was updated earlier in this session, or a bundle containing this component is also active): restart DSH once and retry without disabling plugins one by one.'),
      'already-installed': t('该包已在当前配置中，请刷新或重启 DSH 后查看当前版本。', 'This package is already present in the profile; refresh or restart DSH to inspect its version.'),
      'incompatible-version': t('目标版本与当前运行的 DSH 版本不兼容。', 'The target version is incompatible with the running DSH version.'),
      'stop-profile': t('当前配置未启用热重载，需关闭 DSH 后再通过命令行更新。', 'This profile runs without hot reload; stop DSH and update via CLI.'),
      'not-removable': t('此内置或受保护插件不支持在此处移除替换。', 'This built-in or protected bundle cannot be replaced here.'),
      'pkg-network': t('连接 npm 源时网络中断，请稍后重试。', 'Network error reaching the package registry. Retry shortly.'),
      'pkg-timeout': t('包管理器请求超时，请检查网络后重试。', 'Package manager request timed out. Check your connection and retry.'),
      'pkg-not-found': t('未找到目标版本或已被源撤回，请重新检查更新。', 'Target release was not found on the registry. Check again.'),
      'pkg-no-matching-version': t('没有匹配当前兼容性要求的已发布版本。', 'No published version matches the compatibility constraints.'),
      'pkg-integrity': t('下载包的完整性校验未通过，已放弃安装，请重试。', 'Package integrity verification failed. Installation aborted; retry.'),
      'pkg-disk-full': t('磁盘空间不足，请清理后重试。', 'Disk space is full. Free disk space and retry.'),
      'pkg-permission': t('无权写入当前 profile 目录，请检查文件权限。', 'Permission denied writing to this profile directory.'),
      'pkg-pnpm-missing': t('未检测到可用的 pnpm，请在环境或宿主插件设置中检查。', 'pnpm is unavailable to the host package manager.'),
      'operation-error': t('宿主包管理器未能完成操作，可在原生「插件」详情页点击更新查看完整日志。', 'Host package manager did not complete the operation. Retry from native plugin details to inspect logs.'),
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
  }
  function reasonOf(job) {
    if (!job) return null;
    if (job.reason) return job.reason;
    const res = job.outcome?.result;
    if (res?.pendingBuilds || res?.failureKind === 'build-blocked') return 'build-blocked';
    if (res?.failureKind && ['network', 'timeout', 'not-found', 'no-matching-version', 'integrity', 'pnpm-missing', 'disk-full', 'permission'].includes(res.failureKind)) return 'pkg-' + res.failureKind;
    return res?.error?.code || null;
  }
  // releaseOf() keeps the failing engine/peer range check as a stable code; say which
  // environment has to change instead of only reporting that the release is incompatible.
  function requirement(release) {
    return ({
      'dsh-version': t('需要换成与该版本匹配的 DSH 本体', 'it needs a different DSH version'),
      'node-version': t('需要换成与该版本匹配的 Node.js', 'it needs a different Node.js version'),
      deprecated: t('作者已把这个版本标记为弃用', 'the author marked this release as deprecated'),
      'not-bundle': t('这个版本不是可加载的 DSH 插件包', 'this release is not a loadable DSH plugin bundle'),
    })[release?.reason] || t('发布元数据的兼容范围与当前环境不符', 'its published compatibility range does not match this environment');
  }
  function jobLabel(job) {
    if (job.state === 'installing') {
      const phase = ({
        checking: t('宿主正在检查版本', 'Host checking release'),
        removing: t('正在卸载旧版', 'Unloading the previous version'),
        applying: t('正在加载新版', 'Loading the new version'),
        restoring: t('正在恢复旧版', 'Restoring the previous version'),
      })[job.phase];
      if (phase) return phase;
    }
    return ({ verifying: t('正在核对版本', 'Verifying release'), installing: t('正在安装', 'Installing'), cancelling: t('正在请求取消', 'Requesting cancellation'), complete: t('已更新', 'Updated'), 'restart-required': t('已安装，等待你手动重启', 'Installed; manual restart needed'), restored: t('更新未成功，已恢复原版本', 'Update failed; previous version restored'), 'restore-failed': t('恢复未成功，请检查官方插件管理', 'Recovery failed; check native plugin management'), unknown: t('结果未确认，请检查官方插件管理', 'Result unconfirmed; check native plugin management'), cancelled: t('已取消', 'Cancelled'), failed: t('更新未成功', 'Update failed') })[job.state] || job.state;
  }
  const FOOTER_CSS = '.plugin-updates-footer{box-sizing:border-box;flex-shrink:0;margin-top:16px;padding-top:14px;border-top:var(--dsh-control-border-width,0.5px) solid var(--dsw-alias-border-l2,var(--dsw-alias-border-l3,#e5e7eb));min-width:0;max-width:100%;color:var(--dsw-alias-label-primary,#202124)}'
    + '.dshw.plugin-updates-footer.is-inline{display:block!important;width:100%!important;max-width:100%!important;margin-block:auto 0!important;margin-inline:0!important;padding:6px 14px!important;border-top:var(--dsh-control-border-width,0.5px) solid var(--dsw-alias-border-l2,var(--dsw-alias-border-l3,#e5e7eb));background:var(--dsw-alias-bg-layer-1,var(--w-soft,#f7f8fa));font-size:12px;line-height:1.45}'
    + '.plugin-updates-footer .updates-bar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px 12px;min-block-size:28px;min-width:0}'
    + '.plugin-updates-footer .updates-bar-info,.plugin-updates-footer .updates-bar-actions,.plugin-updates-footer .updates-head-actions,.plugin-updates-footer .updates-title-row{display:flex;align-items:center;flex-wrap:wrap;gap:6px 8px;min-width:0}'
    + '.plugin-updates-footer .updates-head{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px 12px}'
    + '.plugin-updates-footer .updates-compact-bar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px 12px}'
    + '.plugin-updates-footer .updates-compact-bar>.updates-options{margin-top:0;min-width:0}'
    + '.plugin-updates-footer .updates-compact-bar>.updates-options[open]{flex:1 1 100%}'
    + '.plugin-updates-footer h2{font-size:13.5px;line-height:1.4;margin:0;font-weight:600}'
    + '.plugin-updates-footer .updates-pill{display:inline-flex;align-items:center;padding:1px 7px;border-radius:999px;font-size:11px;font-weight:600;line-height:1.5;background:var(--dsw-alias-bg-layer-2,var(--w-soft,#eef1f6));color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-pill.is-accent{background:color-mix(in srgb,var(--w-accent,#4f6bdb) 14%,transparent);color:var(--w-accent,#4f6bdb)}'
    + '.plugin-updates-footer .updates-pill.is-error{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#ad3636) 14%,transparent);color:var(--dsw-alias-state-error-primary,#ad3636)}'
    + '.plugin-updates-footer .updates-mono,.plugin-updates-footer .updates-subtitle,.plugin-updates-footer .updates-version{font:12px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;overflow-wrap:anywhere;margin:0}'
    + '.plugin-updates-footer .updates-badge{padding:1px 6px;border-radius:5px;background:var(--dsw-alias-bg-layer-2,var(--w-soft,#eef1f6));color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-meta-line,.plugin-updates-footer .updates-note{margin:3px 0 0;font-size:12px;line-height:1.55}'
    + '.plugin-updates-footer .updates-inline-msg.is-error{color:var(--dsw-alias-state-error-primary,#ad3636);font-size:12px}'
    + '.plugin-updates-footer .w-button.is-sm{min-block-size:26px;min-inline-size:26px;min-height:26px;padding:3px 9px;font-size:12px;gap:5px;border-radius:6px}'
    + '.plugin-updates-footer .updates-options{margin-top:8px}'
    + '.plugin-updates-footer .updates-options>summary{cursor:pointer;display:inline-flex;align-items:center;gap:0.55ch;min-block-size:24px;font-size:12px;line-height:1.5;font-weight:500;color:var(--dsw-alias-label-secondary,#657080);list-style:none}'
    + '.plugin-updates-footer .updates-options>summary:after{display:none}'
    + '.plugin-updates-footer .updates-options>summary::before{content:"";inline-size:6px;block-size:6px;flex-shrink:0;border-inline-end:1.5px solid currentColor;border-block-end:1.5px solid currentColor;rotate:-45deg}'
    + '.plugin-updates-footer .updates-options>summary:dir(rtl)::before{rotate:135deg}'
    + '.plugin-updates-footer .updates-options[open]>summary::before{rotate:45deg}'
    + '.plugin-updates-footer .updates-options>summary:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:3px;border-radius:4px}'
    + '.plugin-updates-footer details::details-content{interpolate-size:allow-keywords;overflow:clip;contain:layout}'
    + '.plugin-updates-footer details:not([open])::details-content{block-size:0}'
    + '.plugin-updates-footer .updates-settings{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px;padding:10px 0 2px}'
    + '.plugin-updates-footer>.w-section{margin:8px 0 0;padding:0;border:0}'
    + '.plugin-updates-footer .w-toolbar{margin-top:8px!important}'
    + '.plugin-updates-footer .w-switch-label{max-width:100%;gap:12px;align-items:flex-start}'
    + '.plugin-updates-footer .w-switch-track{flex-shrink:0}'
    + '.plugin-updates-footer .updates-notes{margin-top:8px;padding:10px 12px;border:1px solid var(--dsw-alias-border-l3,#e5e7eb);border-radius:8px;background:var(--dsw-alias-bg-base,var(--w-bg,#fff))}'
    + '.plugin-updates-footer .updates-notes pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:220px;overflow:auto;margin:6px 0;padding:10px;font:12px/1.65 ui-monospace,monospace}'
    + '.plugin-updates-footer .updates-notes pre code{font:inherit;background:transparent;padding:0}'
    + '.plugin-updates-footer .updates-links{display:flex;flex-wrap:wrap;align-items:center;gap:4px 14px;margin-top:10px;padding-top:8px;border-top:1px dashed var(--dsw-alias-border-l3,#e5e7eb);font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary,#657080)}'
    + '.plugin-updates-footer .updates-links a{color:inherit;text-decoration:none;display:inline-flex;align-items:center;min-block-size:24px;gap:4px}'
    + '.plugin-updates-footer .updates-links a:hover{color:var(--dsw-alias-label-primary,#202124);text-decoration:underline}'
    + '.plugin-updates-footer .updates-links a:focus-visible{outline:2px solid var(--dsw-focus-ring-color,#6b79df);outline-offset:3px;border-radius:4px}'
    + '.plugin-updates-footer .w-overlay{z-index:1002}'
    + '.plugin-updates-footer .updates-auto-nudge{display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;margin-top:6px;font-size:12px;color:var(--dsw-alias-label-secondary,#657080)}'
    + '@media(pointer:coarse){.plugin-updates-footer .w-button.is-sm{min-block-size:32px;min-height:32px;padding:5px 11px}}'
    + '@media(prefers-reduced-motion:no-preference){.plugin-updates-footer .updates-options>summary::before{transition:rotate .18s ease}.plugin-updates-footer details::details-content{transition:block-size .22s ease,content-visibility .22s ease allow-discrete}}'
    + '@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}';
  function FooterFrame({ name, label, inline = false, supplement = false, head, children }) {
    return h('section', { className: 'dshw plugin-updates-footer' + (inline ? ' is-inline' : ''), 'data-plugin-update-footer': name, 'aria-label': label + (supplement ? t(' · 自动更新与反馈', ' · Auto-update and feedback') : t(' · 版本与更新', ' · Version and updates')) },
      h('style', null, W.styles),
      h('style', null, FOOTER_CSS),
      head, children);
  }
  function Panel({ name, inline = false }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [selectedVersion, setSelectedVersion] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false), [dismissedJobId, setDismissedJobId] = useState(null);
    const seenActiveJob = useRef ? useRef(null) : { current: null };
    const row = rowFor(name), original = originalRow(name), target = row?.name || name, prefs = preferences(target), job = snapshot?.job?.name === target ? snapshot.job : null;
    if (job && ['verifying', 'installing', 'cancelling'].includes(job.state)) seenActiveJob.current = job.id;
    const panelStaleTarget = !!snapshot && !!row && !!original && (!inline || (row.sourceKind === 'registry' && row.available && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release?.version));
    useEffect(() => { if (panelStaleTarget && !activeJob()) refreshIfStale(row); }, [panelStaleTarget, row?.name, row?.available, row?.checkedAt]);
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { staleChecks.set(target, Date.now()); await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function runOperation(request) {
      setDialog(null); manualOperation = true; notify();
      setError(''); setWorking(true);
      try {
        try {
          await heartbeat();
          const started = await api(request);
          seenActiveJob.current = started.id;
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
          await refresh();
        } finally { manualOperation = false; notify(); }
      } catch (err) {
        setError(err.message);
        if (request.action === 'install' && ['check-first', 'release-changed'].includes(err?.message)) {
          staleChecks.set(target, Date.now());
          await api({ action: 'check', name: target }).catch(() => {});
        }
        await refresh().catch(() => {});
      } finally { setWorking(false); }
    }
    async function showNotes() {
      if (notesOpen) { setNotesOpen(false); return; }
      setNotesOpen(true); setNotes(null); setLoadingNotes(true); setError('');
      try { setNotes(await api({ action: 'notes', name: target, version: row.release.version })); } catch (error) { setError(error.message); } finally { setLoadingNotes(false); }
    }
    if (inline && (!snapshot || !row || !original)) return null;
    if (!snapshot) return h('p', { className: 'dshw w-muted' }, t('正在读取更新状态…', 'Loading update status…'));
    if (!row || !original) return h(W.Status, null, t('此插件尚未安装或已从当前 profile 移除。', 'This plugin is not installed in the current profile.'));
    const title = language() === 'en' ? original.labelEn : original.label;
    const ownPage = pageState(true), unconfirmed = ['unknown', 'restore-failed'].includes(snapshot.job?.state);
    const staleWindows = (snapshot.pages.clients || []).some(client => !client.fresh);
    const pageBusy = ownPage.busy || (snapshot.pages.clients || []).some(client => client.id !== id && client.busy);
    const installLocked = working || activeJob() || unconfirmed || snapshot.updaterRestart || snapshot.preferenceError || !snapshot.activity.known
      || snapshot.activity.busy || snapshot.pages.dirty || ownPage.dirty || pageBusy || !snapshot.pages.known;
    const checkingThis = checking || snapshot.checkingNames?.includes(target);
    const managed = row.sourceKind === 'registry';
    const showUpdate = managed && row.available;
    const deferred = prefs.deferredUntil > Date.now();
    const ignored = !!row.release?.version && prefs.ignoredVersion === row.release.version;
    const actionableUpdate = showUpdate && !deferred && !ignored;
    const canConfirm = showUpdate && row.release?.version === selectedVersion && !installLocked && !row.loadError;
    const isSuite = target === '@stardustlc/dsh-suite';
    const jobResult = job?.outcome?.result;
    const jobReason = reasonOf(job);
    const jobActiveThis = !!job && ['verifying', 'installing', 'cancelling'].includes(job.state);
    const canCancel = jobActiveThis && !['applying', 'restoring'].includes(job.phase);
    const jobAttentionThis = !!job && ['restart-required', 'restored', 'restore-failed', 'unknown', 'failed'].includes(job.state) && (unconfirmed || dismissedJobId !== job.id);
    const jobJustCompleted = !!job && job.state === 'complete' && seenActiveJob.current === job.id && dismissedJobId !== job.id;
    const canSuggestAuto = !!job && job.state === 'complete' && !jobReason && job.mode !== 'automatic' && (!prefs.autoInstall || prefs.autoScope !== 'compatible') && managed && !snapshot.preferenceError && dismissedJobId !== job.id;
    const inlineJobVisible = jobActiveThis || jobAttentionThis || jobJustCompleted;
    if (inline && !actionableUpdate && !inlineJobVisible && !working && !checking && !error && !dialog && !notesOpen) return null;
    const notesSection = notesOpen && h('section', { className: 'updates-notes', 'aria-label': t('更新记录', 'Release notes') },
      h('strong', null, target + ' · ' + (notes?.version || row.release?.version || '')),
      loadingNotes ? h('p', { className: 'w-muted updates-note' }, t('正在读取…', 'Loading…'))
        : notes?.text ? h('pre', { tabIndex: 0, role: 'region', 'aria-label': t('更新记录内容', 'Release notes content') }, h('code', null, notes.text))
        : h('p', { className: 'w-muted updates-note' }, t('未找到此版本的独立更新记录。', 'No separate notes were found for this version.')),
      notes?.url && h('a', { href: notes.url, target: '_blank', rel: 'noreferrer noopener' }, t('查看仓库更新记录', 'View repository changelog')));
    const windowsDialog = dialog === 'windows' && h(W.Dialog, { title: t('断开的窗口都已关闭？', 'Are the disconnected windows closed?'), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      h('div', { className: 'w-stack' }, h('p', null, t('只清除超过 45 秒未回应的其他窗口记录。请先确认它们已经关闭；仍在使用的窗口请保存修改并刷新。当前或仍在回应的窗口保护会保留。', 'Only other windows silent for over 45 seconds are cleared. Confirm that they are closed; save and refresh windows still in use. Current and responsive windows remain protected.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')), h(W.Button, { onClick: () => { setDialog(null); void perform(() => api({ ...pageState(true), action: 'reconfirm-windows', confirmation: 'other-stale-windows-are-closed' })); } }, t('已关闭，重新确认状态', 'They are closed; reconfirm')))));
    const confirmDialog = ['automatic', 'install'].includes(dialog) && h(W.Dialog, { title: dialog === 'automatic' ? (isSuite ? t('允许 Suite 空闲时自动热更新？', 'Allow idle automatic updates for Suite?') : t('允许这个插件空闲时自动热更新？', 'Allow idle automatic updates for this plugin?')) : (isSuite ? t('确认更新 Suite 整包', 'Confirm Suite bundle update') : t('确认更新此插件', 'Confirm this plugin update')), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), isSuite && h('p', null, t('此处设置作用于 Suite 整包（包含 18 个组件）。独立安装的其他插件不受影响。', 'This setting applies to the whole Suite (including its 18 components). Other independently installed plugins are unaffected.')), h('p', null, t('你正在主动启用自动安装。只处理通过当前 DSH 与 Node 兼容性校验的稳定版本（含功能小版本与补丁，跨主版本仍需手动确认）；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation for compatible stable releases (minor and patch updates matching this DSH and Node runtime; major upgrades still require manual confirmation). Running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('支持热更新时原地重载，不会自动重启 DSH；其他插件不会跟着开启，可随时关闭。', 'Hot-reloads in place when supported and never restarts DSH automatically. Other plugins remain unchanged; turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true, autoScope: 'compatible' }, 'enable-idle-compatible-updates')); } }, t('允许空闲自动热更新', 'Allow idle automatic updates')))) :
      h('div', { className: 'w-stack' },
        isSuite && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        h('p', { className: 'updates-version' }, target + ' · ' + row.version + ' → ' + selectedVersion),
        h('p', null, selectedVersion === row.release?.version ? t('Harness 会热更新并重新加载；需要手动重启时，更新区会显示宿主结果，停用状态会保留。', 'Harness hot-updates and reloads in place. If a manual restart is needed, it appears in the update result; disabled status is preserved.') : (showUpdate && row.release?.version ? message('release-changed') : message('check-first'))),
        h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')),
          showUpdate && row.release?.version && row.release.version !== selectedVersion
            ? h(W.Button, { variant: 'primary', disabled: installLocked || row.loadError, onClick: () => { setError(''); setSelectedVersion(row.release.version); } }, t('更新为 v', 'Use v') + row.release.version)
            : h(W.Button, { variant: 'primary', disabled: !canConfirm, onClick: () => runOperation({ action: 'install', name: target, version: selectedVersion, confirmation: 'update-installed-plugin' }) }, t('安装此版本', 'Install this version')))));
    const checkButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : isSuite ? t('检查整包更新', 'Check Suite updates') : t('检查更新', 'Check for updates'));
    const recheckButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : t('重新检查', 'Check again'));
    const primary = showUpdate
      ? h(W.Button, { variant: 'primary', className: 'is-sm', icon: 'download', disabled: installLocked || row.loadError, onClick: () => { setError(''); if (job && !jobActiveThis && !unconfirmed) setDismissedJobId(job.id); setSelectedVersion(row.release.version); setDialog('install'); } }, (isSuite ? t('更新 Suite 至 v', 'Update Suite to v') : t('更新至 v', 'Update to v')) + row.release.version)
      : managed ? checkButton() : null;
    if (inline) {
      const lockHint = unconfirmed ? message('operation-unconfirmed')
        : snapshot.updaterRestart ? message('restart-required')
        : snapshot.preferenceError ? message('preferences-unreadable')
        : (snapshot.pages.dirty || ownPage.dirty) ? t('请先保存修改后再更新', 'Save changes before updating')
        : (snapshot.activity.busy || pageBusy) ? t('当前任务或对话框结束后可更新', 'Finish active task or dialog to update')
        : (!snapshot.activity.known || !snapshot.pages.known) ? t('等待窗口状态确认', 'Waiting for window confirmation')
        : '';
      return h(FooterFrame, { name, label: title, inline: true, head: h('div', { className: 'updates-bar' },
        h('div', { className: 'updates-bar-info' },
          inlineJobVisible
            ? h(React.Fragment, null,
              h('span', { className: 'updates-pill' + (jobActiveThis ? ' is-accent' : ['failed', 'restore-failed', 'unknown', 'restored'].includes(job.state) ? ' is-error' : '') }, jobLabel(job)),
              job.to && h('span', { className: 'updates-mono' }, (isSuite ? 'dsh-suite ' : '') + job.from + ' → ' + job.to),
              jobReason && h('span', { className: 'updates-inline-msg is-error' }, message(jobReason)))
            : actionableUpdate ? h(React.Fragment, null,
              h('span', { className: 'updates-pill is-accent' }, isSuite ? t('Suite 新版本', 'Suite update') : t('有新版本', 'Update available')),
              h('span', { className: 'updates-mono' }, (isSuite ? 'dsh-suite ' : '') + 'v' + row.version + ' → v' + row.release.version),
              lockHint && h('span', { className: 'w-muted' }, '· ' + lockHint)) : null,
          error && h('span', { className: 'updates-inline-msg is-error', role: 'alert' }, message(error))),
        h('div', { className: 'updates-bar-actions' },
          staleWindows && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDialog('windows') }, t('确认已关闭窗口', 'Confirm closed windows')),
          canCancel && h(W.Button, { className: 'is-sm', disabled: job?.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')),
          !jobActiveThis && error === 'check-first' && managed && recheckButton(actionableUpdate ? 'ghost' : 'primary'),
          !jobActiveThis && actionableUpdate && row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版', 'Ignore')),
          !jobActiveThis && actionableUpdate && primary,
          !jobActiveThis && !actionableUpdate && canSuggestAuto && h(W.Button, { variant: 'primary', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates')),
          !jobActiveThis && !actionableUpdate && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => { setError(''); setNotesOpen(false); if (job) setDismissedJobId(job.id); } }, t('关闭', 'Dismiss')))) },
        notesSection, windowsDialog, confirmDialog);
    }
    function progress() {
      if (!job || (!jobActiveThis && !unconfirmed && dismissedJobId === job.id)) return null;
      if (job.state === 'complete' && !jobReason) {
        return job.to ? h('div', null,
          h('p', { className: 'w-muted updates-note' }, '✓ ' + jobLabel(job) + ' · ' + job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动更新', ' · Automatic update') : '')),
          canSuggestAuto && h('div', { className: 'updates-auto-nudge' },
            h('span', null, t('以后有兼容新版本时，需要空闲自动热更新吗？', 'Auto-install future compatible updates while idle?')),
            h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('开启空闲自动热更新', 'Enable idle auto-updates')),
            h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDismissedJobId(job.id) }, t('关闭', 'Dismiss')))) : null;
      }
      return h('section', { className: 'w-section', role: 'status', 'aria-label': t('更新进度', 'Update progress') },
        h('h3', null, jobLabel(job)),
        job.to && h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动更新', ' · Automatic update') : '')),
        job.state === 'restart-required' && jobResult?.restartReason === 'package-moved' && h('p', { className: 'w-muted updates-note' }, t('新版已就绪；因多个独立插件共用底层依赖，请先手动重启一次 DSH 生效后再继续更新其他插件。', 'Installed; because standalone plugins share dependencies, restart DSH once before updating additional plugins.')),
        jobReason && h(W.Status, { tone: 'error' }, message(jobReason)),
        h('div', { className: 'updates-bar-actions', style: { marginTop: '6px' } },
          canCancel && h(W.Button, { className: 'is-sm', disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')),
          !jobActiveThis && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => setDismissedJobId(job.id) }, t('关闭提示', 'Dismiss'))));
    }
    function windowControls() {
      if (!staleWindows) return null;
      return h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { className: 'is-sm', onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows')));
    }
    const incompatibleText = row.release && !row.release.compatible ? t('新版本暂不兼容当前环境：', 'Latest release is incompatible with this environment: ') + requirement(row.release) + (row.release.required ? ' (' + row.release.required + ')' : '') : '';
    const optionsSection = h('details', { className: 'updates-options' },
      h('summary', null, !original.bundledBy ? t('自动更新与提醒', 'Auto-update & reminders') : t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? (prefs.autoScope === 'compatible' ? t('空闲自动热更新：兼容版', 'Idle auto-update: compatible') : t('空闲自动热更新：仅补丁', 'Idle auto-update: patches')) : t('空闲自动热更新：关', 'Idle auto-update: off')),
      h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: isSuite ? t('自动检查 Suite 整包更新', 'Automatically check Suite updates') : t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，每 6 小时最多一次。只影响这个安装包，关闭后仍可手动检查。', 'On by default, at most every 6 hours. This affects only this bundle; manual checks remain available.'))),
        h('div', null, h(W.Switch, { label: isSuite ? t('空闲时自动热更新 Suite 兼容版本', 'Auto-install compatible Suite updates while idle') : t('空闲时自动热更新兼容版本', 'Auto-install compatible updates while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => event.target.checked ? (setError(''), setDialog('automatic')) : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅在空闲且无未保存修改时热更新兼容稳定版（含功能小版本与补丁，不含跨主版本）。其他插件的开关不变。', 'Off by default. Explicitly enable compatible stable updates (minor and patch, excluding major) while idle with no unsaved changes. Other plugins’ settings stay unchanged.')), prefs.autoInstall && prefs.autoScope !== 'compatible' && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => { setError(''); setDialog('automatic'); } }, t('升级为包含兼容功能小版本', 'Include compatible minor updates')))));
    const errorStatus = error && h(W.Status, { tone: 'error' }, error === 'check-first' && managed ? h('div', { className: 'updates-bar-actions' }, h('span', null, message(error)), recheckButton('ghost')) : message(error));
    const linksNav = (() => {
      const ownRepo = repoUrl(original.name), suiteRepo = repoUrl('@stardustlc/dsh-suite'), starRepo = isSuite ? suiteRepo : ownRepo;
      if (!ownRepo && !starRepo) return null;
      return h('nav', { className: 'updates-links', 'aria-label': t('开源仓库与反馈', 'Repository and feedback') },
        starRepo && h('a', { href: starRepo, target: '_blank', rel: 'noreferrer noopener' }, isSuite ? t('★ 觉得好用？在 GitHub 给 dsh-suite 点个 Star', '★ Useful? Star dsh-suite on GitHub') : t('★ 觉得好用？在 GitHub 点个 Star', '★ Useful? Star on GitHub')),
        ownRepo && h('a', { href: ownRepo + '/issues', target: '_blank', rel: 'noreferrer noopener' }, t('提交建议 / 问题反馈', 'Feedback & issues')),
        isSuite && original.name !== '@stardustlc/dsh-suite' && ownRepo && h('a', { href: ownRepo, target: '_blank', rel: 'noreferrer noopener' }, t('组件仓库', 'Component repo')),
        !isSuite && suiteRepo && h('a', { href: suiteRepo, target: '_blank', rel: 'noreferrer noopener' }, t('了解 dsh-suite（18 合 1 组合包）', 'Explore dsh-suite (18-in-1 bundle)')));
    })();
    if (!original.bundledBy) {
      // Native bundle detail pages in DSH already render their own Version & Source sections
      // ("重新检查", version list & "更新" button). Keep only non-duplicative auto-update preferences,
      // inline changelog notes, compatibility/error diagnostics, and GitHub feedback links here.
      return h(FooterFrame, { name, label: title, supplement: true, head: h('div', { className: 'updates-compact-bar' },
        optionsSection,
        (row.release || (showUpdate && (!deferred || !ignored))) && h('div', { className: 'updates-head-actions' },
          row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          showUpdate && !deferred && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('推迟提醒 24h', 'Snooze 24h')),
          showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版提醒', 'Mute reminder')))) },
        notesSection,
        incompatibleText && h(W.Status, null, incompatibleText),
        errorStatus, snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
        snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有插件更新等待手动重启后生效；空闲自动热更新已暂停，建议先重启一次 DSH 再继续更新其他共用依赖的插件。', 'An update awaits a manual restart; idle auto-updates are paused. Restart DSH once before updating other plugins that share dependencies.')),
        prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
        (prefs.autoInstall || jobActiveThis) && windowControls(),
        jobActiveThis && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
        jobActiveThis && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
        deferred && h('p', { className: 'w-muted updates-note' }, t('已推迟此插件的工作台更新提示 24 小时。', 'Workbench update notices for this plugin are snoozed for 24 hours.')),
        unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
        progress(),
        linksNav,
        windowsDialog, confirmDialog
      );
    }
    const status = !managed ? t('本地 / 外部来源，保留原安装方式', 'Local / external source; keep original install method') : row.loadError ? t('加载异常，请先检查原生插件管理', 'Loading error; check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed; retry available') : incompatibleText || (row.available ? (ignored ? t('已忽略提醒，仍可手动更新', 'Reminder ignored; manual update available') : t('有兼容的新版本', 'Compatible update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet'));
    return h(FooterFrame, { name, label: title, head: h('div', { className: 'updates-head' },
      h('div', null,
        h('div', { className: 'updates-title-row' }, h('h2', null, t('随 Suite 整包管理', 'Managed via Suite bundle')), h('span', { className: 'updates-mono updates-badge' }, original.name + ' · v' + original.version)),
        h('p', { className: 'w-muted updates-meta-line' }, status, row.checkedAt ? ' · ' + t('上次检查：', 'Last checked: ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN') : ''),
        h('p', { className: 'updates-version updates-note' }, target + ' · v' + row.version, row.release?.version && row.release.version !== row.version ? ' → v' + row.release.version : '')),
      h('div', { className: 'updates-head-actions' },
        showUpdate && checkButton('ghost'),
        row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
        showUpdate && !deferred && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
        showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')),
        primary)) },
      notesSection,
      optionsSection,
      errorStatus, snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有插件更新等待手动重启后生效；空闲自动热更新已暂停。', 'An update awaits a manual restart; idle auto-updates are paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      windowControls(),
      (showUpdate || jobActiveThis) && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
      (showUpdate || jobActiveThis) && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      deferred && h(W.Status, null, t('已推迟 Suite 提醒和自动安装 24 小时，仍可手动更新。', 'Suite reminders and automatic installation are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      progress(),
      linksNav,
      windowsDialog, confirmDialog
    );
  }
  function InlineFooter({ name }) { return h(Panel, { name, inline: true }); }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name, inline: false }) : null;
  }
  function register() {
    if (!alive) return;
    if (!registered) {
      registered = true; pool.clients.add(client);
      ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'stardustlc.plugin-update-footer', order: 1000 }, NativeFooter));
      notify();
    }
  }
  async function poll() {
    if (inPoll || !alive || !shared.refs.size) return;
    inPoll = true;
    try { await refresh(); register(); await heartbeat(); }
    catch { /* Owner-only controls stay absent for guests and unsupported hosts. */ }
    finally { inPoll = false; }
  }
  const timer = setInterval(() => { void poll(); }, 15000), first = setTimeout(() => { void poll(); }, 100);
  const client = { t, Footer: InlineFooter, NativeFooter, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (!footer) return false; footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); return true; }, has: name => registered && !!originalRow(name), row: rowFor, dispose() {
    close(); alive = false; clearTimeout(first); clearInterval(timer); pool.clients.delete(client);
    pool.listeners.delete(guardChanged); listeners.clear();
    for (const event of ['pointerdown', 'keydown', 'input']) document.removeEventListener(event, interaction, true);
    window.removeEventListener('pagehide', close);
    for (const controller of requests) controller.abort();
    for (const listener of pool.viewListeners) listener();
  } };
  return client;
}

/* STARDUSTLC_UPDATE_CLIENT_BODY_START */
// Generated from templates/client.js, templates/panels/, templates/style-switcher.js, templates/themes-and-motion.css and templates/workbench-ui.js. Edit the sources.
(function () {
const DSH_THEMES_AND_MOTION_CSS = "/* ==========================================================================\n * DeepSeek Harness (>=0.2.2-rc.3) Unified Workbench Themes & Motion System v3\n * Shared across STARDUSTLC666 workbench plugins:\n *   dsh-email, dsh-calendar, dsh-cite, dsh-dream, dsh-code-security,\n *   dsh-rss, dsh-ppt, dsh-remotion, dsh-hyperframes\n *\n * Design Principles:\n * 1. NEVER TOO DARK: Airy daylight defaults; when host `body[data-ds-dark-theme]`\n *    is active under `harness`, soften to breathable slate (#1f232b / #272c36),\n *    never pitch black (#000 / #090a0f / #151517).\n * 2. 13 SWITCHABLE PRESETS via `[data-dsh-style]` + 8 FONT PAIRINGS via `[data-dsh-font]`:\n *    - `harness`   (原生清透 / Native Airy)\n *    - `cream`     (米白纸感 / Warm Cream — stacked paper, dashed rows, bookmark tab)\n *    - `claude`    (Claude 暖书卷 / Claude Warmth — editorial serif, paper grain, borderless cards)\n *    - `pixel8bit` (8-Bit 掌机 / Bright 8-Bit — dot-matrix header, 2px borders, ▶ cursor, pixel progress)\n *    - `mint`      (晴空薄荷 / Airy Mint — mint daylight wash, white cards, emerald gradient primary)\n *    - `glass`     (晴昼琉璃 / Daylight Glass — visionOS-style vivid aurora mesh, deep frosted panes, indigo glow primary)\n *    - `eink`      (护眼墨水屏 / E-Ink Paper — matte warm paper, #171716 ink, 60ms snappy transitions)\n *    - `blueprint` (工程晒图 / Blueprint — cyanotype grid, Prussian #0d3b66 ink, safety-orange #e05a2b, `+` ticks)\n *    - `risograph` (波普孔版 / Riso Zine — halftone header, 2px #18181b outlines, #ff3e7f/#2563eb offset shadows)\n *    - `win98`     (云母流光 / Mica Fluent — Windows 11 Mica backdrop, 4px/8px Fluent radii, #005fb8 accent; id kept for saved prefs)\n *    - `songhui`   (宋韵朱砂 / Song Xuan — gold-flecked Xuan paper, 3px double #b83b2a masthead, seal stamps)\n *    - `frutiger`  (晴空水晶 / Aqua Crystal — liquid-crystal panes with edge refraction, aqua pills)\n *    - `gazette`   (铅字晨报 / Gazette — warm newsprint, 4px double #161514 masthead, 1px column rules, #9b1c1c seal)\n *    - Dual-layer Chinese + Latin typography per preset + independent `[data-dsh-font]` overrides\n *      (`auto`, `songkai`, `fangsong`, `poster`, `retro98`, `serif`, `arcade`, `modern`)\n * 3. SHARED v3 LAYOUT & MOTION PRIMITIVES:\n *    - Unified 48px Single-Row Header (`.dsh-header`) + compact `.dsh-style-switcher` + `.dsh-font-trigger`\n *    - Sliding Tab Indicator (`.dsh-tablist` + `.dsh-tab-indicator`) + 140ms Panel Enter\n *    - Resizable Split Pane (`.dsh-split-pane`, `.dsh-split-resizer`, <760px auto-stack)\n *    - Theme-Tinted Shimmer Skeleton (`.dsh-skeleton`)\n *    - Row Hover Quick-Action Bar (`.dsh-row-actions`)\n *    - Calm Compact Update Strip (`[data-plugin-update-footer]`)\n * 4. PORTALED OVERLAY SYNC + `prefers-reduced-motion` + `forced-colors` compliance.\n * ========================================================================== */\n\n/* --------------------------------------------------------------------------\n * 1. Motion Timing & Base Token Fallbacks (Standalone + Host Safe)\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]),\n:where([data-dsh-portal-synced]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) {\n  --dsh-ease-out: cubic-bezier(0.22, 1, 0.36, 1);\n  --dsh-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n  /* Standard cubic-bezier fallback before linear() physics spring */\n  --dsh-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);\n  --dsh-motion-fast: 140ms;\n  --dsh-motion-base: 200ms;\n  --dsh-motion-dialog: 220ms;\n  --dsh-control-border-width: 0.5px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);\n  --dsh-card-shadow: none;\n  --dsh-card-hover-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);\n  --dsh-font-display: \"Segoe UI Variable Display\", \"Segoe UI\", \"PingFang SC\", \"HarmonyOS Sans SC\", \"MiSans\", \"Microsoft YaHei UI\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-body: \"Segoe UI Variable Text\", \"Segoe UI\", \"PingFang SC\", \"HarmonyOS Sans SC\", \"MiSans\", \"Microsoft YaHei UI\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, \"Microsoft YaHei UI\", monospace;\n  --dsh-display-weight: 650;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsh-serif-font: \"Palatino Linotype\", Georgia, \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", \"STSong\", \"华文宋体\", serif;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n@supports (transition-timing-function: linear(0, 1)) {\n  :where([data-dsh-style]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) {\n    --dsh-ease-spring: linear(\n      0, 0.402 7.4%, 0.711 15.3%, 0.929 23.7%, 1.008 28.2%,\n      1.067 33%, 1.099 36.9%, 1.12 41%, 1.13 45.4%, 1.13 50.1%,\n      1.111 58.5%, 1.019 83.2%, 1.004 91.3%, 1\n    );\n  }\n}\n\n/* Electron / macOS 0.2.2+ window-drag-regions rule:\n * Exclude ONLY the visible overlay owner box itself (never `[data-window-drag-exclude] *`,\n * so scrolled/clipped descendants cannot register offscreen no-drag rects over headers). */\n[data-window-drag-exclude] {\n  -webkit-app-region: no-drag;\n}\n\n/* --------------------------------------------------------------------------\n * 2. Preset 1: `harness` — 原生清透 / Native Airy\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"harness\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"harness\"], :has([data-dsh-style=\"harness\"])) {\n  --dsh-font-display: \"Segoe UI Variable Display\", \"Segoe UI\", \"PingFang SC\", \"HarmonyOS Sans SC\", \"MiSans\", \"Microsoft YaHei UI\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-body: \"Segoe UI Variable Text\", \"Segoe UI\", \"PingFang SC\", \"HarmonyOS Sans SC\", \"MiSans\", \"Microsoft YaHei UI\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, \"Microsoft YaHei UI\", monospace;\n  --dsh-display-weight: 650;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:where(body:not([data-ds-dark-theme])) [data-dsh-style=\"harness\"],\n:where(body:not([data-ds-dark-theme])) :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style=\"harness\"]) {\n  color-scheme: light;\n  accent-color: var(--dsw-alias-state-business-primary, #4176e6);\n}\n\n/* Standalone fallbacks when host ui-theme stylesheet is not mounted (e.g. jsdom / preview) */\n:root:not([data-dsh-host-tokens]) [data-dsh-style=\"harness\"] {\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 8px;\n  --dsw-radius-md: 12px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n}\n\nbody:not([data-ds-dark-theme]) [data-dsh-style=\"harness\"] {\n  --dsh-surface-spotlight: rgba(65, 118, 230, 0.06);\n}\n\n/* NEVER TOO DARK: Soft breathable slate when host dark mode is active in `harness` mode */\nbody[data-ds-dark-theme] [data-dsh-style=\"harness\"],\nbody[data-ds-dark-theme] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"harness\"], :has([data-dsh-style=\"harness\"])) {\n  color-scheme: dark;\n  accent-color: #7aaaff;\n  --dsw-alias-bg-base: #1f232b;\n  --dsw-alias-bg-layer-1: #272c36;\n  --dsw-alias-bg-layer-2: #2f3542;\n  --dsw-alias-bg-layer-3: #373e4d;\n  --dsw-alias-bg-overlay: #2a303c;\n  --dsw-alias-bg-module-platform: #2c323e;\n  --dsw-alias-settings-card-fill: #262b35;\n  --dsw-alias-settings-card-stroke: rgba(226, 232, 240, 0.12);\n  --dsw-specific-menu: rgba(39, 44, 54, 0.96);\n  --dsw-alias-border-l1: rgba(226, 232, 240, 0.09);\n  --dsw-alias-border-l2: rgba(226, 232, 240, 0.15);\n  --dsw-alias-border-l3: rgba(226, 232, 240, 0.22);\n  --dsw-alias-border-l4: rgba(226, 232, 240, 0.28);\n  --dsw-alias-label-primary: #eef2f7;\n  --dsw-alias-label-secondary: #b6c0cf;\n  --dsw-alias-label-tertiary: #8d98ab;\n  --dsw-alias-label-dimmed: #737e91;\n  --dsw-alias-brand-primary: #7aaaff;\n  --dsw-alias-brand-text: #eef2f7;\n  --dsw-alias-state-business-primary: #7aaaff;\n  --dsw-alias-state-business-tertiary: rgba(122, 170, 255, 0.16);\n  --dsw-alias-link: #8bb6ff;\n  --dsw-alias-button-primary-fill: #5b8def;\n  --dsw-alias-button-primary-hover: #6f9cf4;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(226, 232, 240, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(226, 232, 240, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(122, 170, 255, 0.15);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.16);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-label: #fcd34d;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.15);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-elevation-panel: 0 4px 16px rgba(10, 14, 22, 0.28), 0 0 0 1px rgba(226, 232, 240, 0.12);\n  --dsw-elevation-prominent: 0 14px 38px rgba(10, 14, 22, 0.42), 0 0 0 1px rgba(226, 232, 240, 0.16);\n  --dsh-button-hover-shadow: 0 2px 8px rgba(10, 14, 22, 0.25);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(10, 14, 22, 0.32);\n  --dsh-surface-spotlight: rgba(122, 170, 255, 0.10);\n}\n\n/* --------------------------------------------------------------------------\n * 3. Preset 2: `cream` — 米白纸感 / Warm Cream (Deepened Materiality)\n *    - Stacked-paper double-edge card shadow\n *    - Dashed notebook row dividers\n *    - Warm bookmark-style active tab accent\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"cream\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"cream\"], :has([data-dsh-style=\"cream\"])) {\n  color-scheme: light;\n  accent-color: #9e5829;\n  --dsw-alias-bg-base: #faf7f0;\n  --dsw-alias-bg-layer-1: #f3efe4;\n  --dsw-alias-bg-layer-2: #eae3d3;\n  --dsw-alias-bg-layer-3: #e0d7c3;\n  --dsw-alias-bg-overlay: #fcfaf4;\n  --dsw-alias-bg-module-platform: #efe9da;\n  --dsw-alias-settings-card-fill: #fdfbf6;\n  --dsw-alias-settings-card-stroke: #d4c8ae;\n  --dsw-specific-menu: rgba(252, 250, 244, 0.97);\n  --dsw-alias-border-l1: #e6dec8;\n  --dsw-alias-border-l2: #d4c8ae;\n  --dsw-alias-border-l3: #c0b193;\n  --dsw-alias-border-l4: #ad9c7c;\n  --dsw-alias-label-primary: #2b2620;\n  --dsw-alias-label-secondary: #655b4e;\n  --dsw-alias-label-tertiary: #857968;\n  --dsw-alias-label-dimmed: #9c907f;\n  --dsw-alias-brand-primary: #9e5829;\n  --dsw-alias-brand-text: #2b2620;\n  --dsw-alias-state-business-primary: #a65e2e;\n  --dsw-alias-state-business-tertiary: rgba(166, 94, 46, 0.13);\n  --dsw-alias-link: #934e20;\n  --dsw-alias-button-primary-fill: #9e5829;\n  --dsw-alias-button-primary-hover: #86481e;\n  --dsw-alias-button-primary-ink: #fffdf9;\n  --dsw-alias-interactive-bg-hover: rgba(108, 84, 50, 0.075);\n  --dsw-alias-interactive-bg-active: rgba(166, 94, 46, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(166, 94, 46, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 56, 44, 0.11);\n  --dsw-alias-state-error-primary: #b9382c;\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-label: #8c3d08;\n  --dsw-alias-state-warn-tertiary: #fdefd6;\n  --dsw-alias-state-success-primary: #2a6f4e;\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 9px;\n  --dsw-radius-md: 13px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n  --dsw-elevation-panel: 0 1px 2px rgba(68, 52, 32, 0.06), 3px 3px 0 #ebe3d1, 0 0 0 1px rgba(180, 164, 138, 0.42);\n  --dsw-elevation-prominent: 0 14px 34px rgba(68, 52, 32, 0.14), 3px 3px 0 #ebe3d1, 0 0 0 1px rgba(180, 164, 138, 0.48);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(84, 62, 34, 0.09);\n  --dsh-card-shadow: 0 1px 2px rgba(68, 52, 32, 0.06), 3px 3px 0 #ebe3d1;\n  --dsh-card-hover-shadow: 0 4px 10px rgba(68, 52, 32, 0.10), 4px 4px 0 #e2d7be;\n  --dsh-surface-spotlight: rgba(166, 94, 46, 0.08);\n  --dsh-font-display: \"Trebuchet MS\", \"STKaiti\", \"华文楷体\", \"Noto Serif SC SemiBold\", serif;\n  --dsh-font-body: \"Source Sans 3\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"cream\"] :where([data-dsh-card], .dsh-card) {\n  border-color: var(--dsw-alias-border-l2);\n  box-shadow: var(--dsh-card-shadow);\n}\n\n[data-dsh-style=\"cream\"] :where([data-dsh-row], .dsh-row) {\n  border-block-end: 1px dashed var(--dsw-alias-border-l2);\n}\n\n[data-dsh-style=\"cream\"] [role=\"tab\"][aria-selected=\"true\"] {\n  background: rgba(158, 88, 41, 0.10);\n  color: #7d4119;\n  box-shadow: inset 0 2px 0 rgba(158, 88, 41, 0.22);\n}\n\n[data-dsh-style=\"cream\"] [role=\"tab\"][aria-selected=\"true\"]::after {\n  border-block-end-color: #9e5829;\n  border-block-end-width: 2.5px;\n}\n\n/* --------------------------------------------------------------------------\n * 4. Preset 3: `claude` — Claude 暖书卷 / Claude Warmth (Deepened Materiality)\n *    - Editorial serif on headings, reader/detail titles & card titles (`[data-dsh-serif]`)\n *    - Subtle warm paper texture\n *    - Soft borderless surface cards\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"claude\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"claude\"], :has([data-dsh-style=\"claude\"])) {\n  color-scheme: light;\n  accent-color: #c96442;\n  --dsw-alias-bg-base: #f5f4ed;\n  --dsw-alias-bg-layer-1: #ece9df;\n  --dsw-alias-bg-layer-2: #e3dfd2;\n  --dsw-alias-bg-layer-3: #d8d3c3;\n  --dsw-alias-bg-overlay: #faf9f4;\n  --dsw-alias-bg-module-platform: #e7e3d6;\n  --dsw-alias-settings-card-fill: #faf9f4;\n  --dsw-alias-settings-card-stroke: transparent;\n  --dsw-specific-menu: rgba(250, 249, 244, 0.97);\n  --dsw-alias-border-l1: #e4e0d3;\n  --dsw-alias-border-l2: #d5d0c3;\n  --dsw-alias-border-l3: #c1bbb0;\n  --dsw-alias-border-l4: #aba495;\n  --dsw-alias-label-primary: #1f1e1b;\n  --dsw-alias-label-secondary: #5d5a51;\n  --dsw-alias-label-tertiary: #7b776c;\n  --dsw-alias-label-dimmed: #948f83;\n  --dsw-alias-brand-primary: #c96442;\n  --dsw-alias-brand-text: #1f1e1b;\n  --dsw-alias-state-business-primary: #c96442;\n  --dsw-alias-state-business-tertiary: rgba(201, 100, 66, 0.14);\n  --dsw-alias-link: #b35030;\n  --dsw-alias-button-primary-fill: #c96442;\n  --dsw-alias-button-primary-hover: #b25232;\n  --dsw-alias-button-primary-ink: #faf9f5;\n  --dsw-alias-interactive-bg-hover: rgba(31, 30, 27, 0.055);\n  --dsw-alias-interactive-bg-active: rgba(201, 100, 66, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(201, 100, 66, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(180, 48, 42, 0.11);\n  --dsw-alias-state-error-primary: #b4302a;\n  --dsw-alias-state-warn-primary: #b85d19;\n  --dsw-alias-state-warn-label: #8c430c;\n  --dsw-alias-state-warn-tertiary: #f7e8d6;\n  --dsw-alias-state-success-primary: #2d6a4f;\n  --dsw-radius-xs: 7px;\n  --dsw-radius-sm: 10px;\n  --dsw-radius-md: 14px;\n  --dsw-radius-lg: 18px;\n  --dsw-radius-xl: 22px;\n  --dsw-elevation-panel: 0 2px 12px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.18);\n  --dsw-elevation-prominent: 0 16px 38px rgba(31, 30, 27, 0.13), 0 2px 8px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.24);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 7px rgba(31, 30, 27, 0.08);\n  --dsh-card-shadow: 0 1px 3px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.13);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(31, 30, 27, 0.08), 0 0 0 1px rgba(145, 139, 126, 0.20);\n  --dsh-surface-spotlight: rgba(201, 100, 66, 0.08);\n  --dsh-font-display: \"Palatino Linotype\", Georgia, \"Noto Serif SC SemiBold\", \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Subtle warm paper grain texture */\n[data-dsh-style=\"claude\"] {\n  background-color: var(--dsw-alias-bg-base);\n  background-image:\n    radial-gradient(rgba(31, 30, 27, 0.024) 0.75px, transparent 0),\n    linear-gradient(180deg, rgba(255, 253, 247, 0.45), rgba(236, 233, 223, 0.25));\n  background-size: 16px 16px, 100% 100%;\n}\n\n/* Soft borderless surface cards */\n[data-dsh-style=\"claude\"] :where([data-dsh-card], .dsh-card) {\n  background: var(--dsw-alias-settings-card-fill);\n  border-color: transparent;\n  box-shadow: var(--dsh-card-shadow);\n}\n\n/* Editorial display font applied to workbench headings, reader/detail titles & card titles (overrideable via [data-dsh-font]) */\n[data-dsh-style=\"claude\"] :where(\n  header h1,\n  [data-dsh-editorial-heading],\n  [data-dsh-serif],\n  [data-dsh-card] :is(h2, h3, .dsh-card-title),\n  .dsh-card :is(h2, h3, .dsh-card-title),\n  [data-dsh-reader] :is(h1, h2),\n  .dsh-reader :is(h1, h2)\n),\n:where([role=\"dialog\"], dialog):where([data-dsh-style=\"claude\"], :has([data-dsh-style=\"claude\"])) header h2 {\n  font-family: var(--dsh-font-display);\n  font-weight: var(--dsh-display-weight, 700);\n  letter-spacing: var(--dsh-display-tracking, -0.01em);\n}\n\n/* --------------------------------------------------------------------------\n * 5. Preset 4: `pixel8bit` — 8-Bit 掌机 / Bright 8-Bit (Deepened Materiality)\n *    - 1px dot-matrix header pattern (`6px 6px`)\n *    - 2px solid #1e2826 borders + 2px 2px 0 pixel shadows\n *    - Animated `▶` active row cursor + stepped pixel progress helper\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"pixel8bit\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) {\n  color-scheme: light;\n  accent-color: #2e7d5b;\n  --dsw-alias-bg-base: #f4f6e8;\n  --dsw-alias-bg-layer-1: #e7eed2;\n  --dsw-alias-bg-layer-2: #dbe5c0;\n  --dsw-alias-bg-layer-3: #cedaad;\n  --dsw-alias-bg-overlay: #f9fbf0;\n  --dsw-alias-bg-module-platform: #e2ebc9;\n  --dsw-alias-settings-card-fill: #edf2dc;\n  --dsw-alias-settings-card-stroke: #1e2826;\n  --dsw-specific-menu: #f9fbf0;\n  --dsw-alias-border-l1: #7e9478;\n  --dsw-alias-border-l2: #1e2826;\n  --dsw-alias-border-l3: #1e2826;\n  --dsw-alias-border-l4: #1e2826;\n  --dsw-alias-label-primary: #1e2826;\n  --dsw-alias-label-secondary: #3d514c;\n  --dsw-alias-label-tertiary: #58706a;\n  --dsw-alias-label-dimmed: #6e857f;\n  --dsw-alias-brand-primary: #2e7d5b;\n  --dsw-alias-brand-text: #1e2826;\n  --dsw-alias-state-business-primary: #2e7d5b;\n  --dsw-alias-state-business-tertiary: rgba(46, 125, 91, 0.18);\n  --dsw-alias-link: #226448;\n  --dsw-alias-button-primary-fill: #2e7d5b;\n  --dsw-alias-button-primary-hover: #24674a;\n  --dsw-alias-button-primary-ink: #f4f6e8;\n  --dsw-alias-interactive-bg-hover: #dfe9c4;\n  --dsw-alias-interactive-bg-active: #cfe0ad;\n  --dsw-alias-interactive-bg-hover-accent: rgba(46, 125, 91, 0.16);\n  --dsw-alias-interactive-bg-hover-danger: rgba(217, 91, 67, 0.18);\n  --dsw-alias-state-error-primary: #d95b43;\n  --dsw-alias-state-warn-primary: #c47614;\n  --dsw-alias-state-warn-label: #7a4808;\n  --dsw-alias-state-warn-tertiary: #f6e7b4;\n  --dsw-alias-state-success-primary: #2e7d5b;\n  --dsh-pixel-accent-secondary: #d95b43;\n  --dsw-radius-xs: 0px;\n  --dsw-radius-sm: 0px;\n  --dsw-radius-md: 0px;\n  --dsw-radius-lg: 0px;\n  --dsw-radius-xl: 0px;\n  --dsw-corner-shape: square;\n  --dsw-elevation-panel: 2px 2px 0px #1e2826;\n  --dsw-elevation-prominent: 4px 4px 0px #1e2826;\n  --dsh-control-border-width: 2px;\n  --dsh-button-shadow: 2px 2px 0px #1e2826;\n  --dsh-button-hover-shadow: 3px 3px 0px #1e2826;\n  --dsh-card-shadow: 2px 2px 0px #1e2826;\n  --dsh-card-hover-shadow: 4px 4px 0px #1e2826;\n  --dsh-surface-spotlight: rgba(46, 125, 91, 0.12);\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.03em;\n  --dsh-body-tracking: 0.03em;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Subtle 1px dot-matrix header pattern (`6px 6px`) */\n[data-dsh-style=\"pixel8bit\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background-color: var(--dsw-alias-bg-layer-1);\n  background-image: radial-gradient(rgba(30, 40, 38, 0.14) 1px, transparent 0);\n  background-size: 6px 6px;\n  border-block-end: 2px solid #1e2826;\n}\n\n/* Crisp 0px corners, 2px solid borders, and arcade shadows in `pixel8bit` */\n[data-dsh-style=\"pixel8bit\"] :where(button, input, select, textarea, [role=\"button\"], [role=\"tab\"], [role=\"menuitem\"], [role=\"menuitemradio\"], [data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button, input, select, textarea, [role=\"menuitem\"], [role=\"menuitemradio\"]) {\n  border-radius: 0px !important;\n  corner-shape: square;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 2px solid #1e2826;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  border: 2px solid #1e2826;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea) {\n  border-width: 2px;\n  border-color: #1e2826;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) {\n  border: 2px solid #1e2826 !important;\n  box-shadow: 4px 4px 0px #1e2826 !important;\n  backdrop-filter: none;\n}\n\n[data-dsh-style=\"pixel8bit\"] [role=\"tab\"][aria-selected=\"true\"]::after,\n[data-dsh-style=\"pixel8bit\"] .dsh-tab-indicator {\n  border-block-end-color: #d95b43;\n  border-block-end-width: 3px;\n}\n\n/* Animated `▶` active row cursor (`[data-dsh-row][data-active=\"true\"]` or `.dsh-pixel-cursor`) */\n.dsh-pixel-cursor {\n  display: none;\n  flex: none;\n  font-size: 10px;\n  line-height: 1;\n  color: var(--dsh-pixel-accent-secondary, #d95b43);\n}\n\n@keyframes dsh-pixel-cursor-nudge {\n  0%, 100% { translate: 0px 0px; }\n  50% { translate: 2px 0px; }\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) {\n  background-color: var(--dsw-alias-interactive-bg-active);\n  box-shadow: inset 3px 0 0 #d95b43;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]):not(:has(.dsh-pixel-cursor))::before {\n  content: \"▶\";\n  display: inline-block;\n  flex: none;\n  margin-inline-end: 6px;\n  font-size: 10px;\n  line-height: 1;\n  color: #d95b43;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) .dsh-pixel-cursor {\n  display: inline-flex;\n  align-items: center;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]):not(:has(.dsh-pixel-cursor))::before,\n  [data-dsh-style=\"pixel8bit\"] :where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) .dsh-pixel-cursor {\n    animation: dsh-pixel-cursor-nudge 760ms steps(2, end) infinite;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 6. Preset 5: `mint` — 晴空薄荷 / Airy Mint (v4 refresh)\n *    - Fresh mint daylight wash with soft sky corner glow\n *    - Crisp white cards on pale mint layers, emerald gradient primary\n *    - Modern Segoe UI Variable + YaHei UI typography (no monospace)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"mint\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"mint\"], :has([data-dsh-style=\"mint\"])) {\n  color-scheme: light;\n  accent-color: #0f8f6a;\n  --dsw-alias-bg-base: #f6fbf9;\n  --dsw-alias-bg-layer-1: #eef7f3;\n  --dsw-alias-bg-layer-2: #e1f0e9;\n  --dsw-alias-bg-layer-3: #d0e7dd;\n  --dsw-alias-bg-overlay: #ffffff;\n  --dsw-alias-bg-module-platform: #e9f5f0;\n  --dsw-alias-settings-card-fill: #ffffff;\n  --dsw-alias-settings-card-stroke: #d5eae1;\n  --dsw-specific-menu: rgba(255, 255, 255, 0.96);\n  --dsw-alias-border-l1: #ddeee7;\n  --dsw-alias-border-l2: #c9e2d7;\n  --dsw-alias-border-l3: #a9cfbf;\n  --dsw-alias-border-l4: #86b9a5;\n  --dsw-alias-label-primary: #0e2a23;\n  --dsw-alias-label-secondary: #44625a;\n  --dsw-alias-label-tertiary: #62807a;\n  --dsw-alias-label-dimmed: #85a097;\n  --dsw-alias-brand-primary: #0f8f6a;\n  --dsw-alias-brand-text: #0e2a23;\n  --dsw-alias-state-business-primary: #0f8f6a;\n  --dsw-alias-state-business-tertiary: rgba(16, 185, 129, 0.14);\n  --dsw-alias-link: #0a7ea4;\n  --dsw-alias-button-primary-fill: #0f8f6a;\n  --dsw-alias-button-primary-hover: #0b7a5a;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(15, 143, 106, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(16, 185, 129, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(16, 185, 129, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(225, 29, 72, 0.10);\n  --dsw-alias-state-error-primary: #e11d48;\n  --dsw-alias-state-warn-primary: #c2700c;\n  --dsw-alias-state-warn-label: #8a4f06;\n  --dsw-alias-state-warn-tertiary: #fdf3dc;\n  --dsw-alias-state-success-primary: #0f8f6a;\n  --dsh-mint-sky-accent: #0a7ea4;\n  --dsw-radius-xs: 7px;\n  --dsw-radius-sm: 10px;\n  --dsw-radius-md: 14px;\n  --dsw-radius-lg: 18px;\n  --dsw-radius-xl: 22px;\n  --dsw-elevation-panel: 0 1px 2px rgba(14, 60, 46, 0.05), 0 6px 20px rgba(14, 60, 46, 0.07), 0 0 0 1px rgba(15, 143, 106, 0.10);\n  --dsw-elevation-prominent: 0 2px 6px rgba(14, 60, 46, 0.06), 0 18px 44px rgba(14, 60, 46, 0.14), 0 0 0 1px rgba(15, 143, 106, 0.12);\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: 0 1px 1.5px rgba(14, 60, 46, 0.06);\n  --dsh-button-hover-shadow: 0 2px 8px rgba(15, 143, 106, 0.14);\n  --dsh-card-shadow: 0 1px 2px rgba(14, 60, 46, 0.04), 0 4px 14px rgba(14, 60, 46, 0.05);\n  --dsh-card-hover-shadow: 0 2px 4px rgba(14, 60, 46, 0.05), 0 12px 28px rgba(15, 143, 106, 0.12);\n  --dsh-surface-spotlight: rgba(16, 185, 129, 0.07);\n  --dsh-font-display: \"Segoe UI Variable Display\", \"Segoe UI\", \"PingFang SC\", \"HarmonyOS Sans SC\", \"MiSans\", \"Microsoft YaHei UI\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-body: \"Segoe UI Variable Text\", \"Segoe UI\", \"PingFang SC\", \"HarmonyOS Sans SC\", \"MiSans\", \"Microsoft YaHei UI\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, \"Microsoft YaHei UI\", monospace;\n  --dsh-display-weight: 650;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"mint\"] {\n  background-color: #f6fbf9;\n  background-image:\n    radial-gradient(70% 55% at 100% 0%, rgba(167, 243, 208, 0.38) 0%, transparent 62%),\n    radial-gradient(55% 50% at 0% 100%, rgba(186, 230, 253, 0.32) 0%, transparent 66%);\n}\n\n[data-dsh-style=\"mint\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: rgba(255, 255, 255, 0.72);\n  -webkit-backdrop-filter: blur(12px) saturate(140%);\n  backdrop-filter: blur(12px) saturate(140%);\n  border-block-end-color: #d5eae1;\n}\n\n[data-dsh-style=\"mint\"] :where([data-dsh-card], .dsh-card) {\n  background: #ffffff;\n  border-color: #ddeee7;\n  box-shadow: var(--dsh-card-shadow);\n}\n\n[data-dsh-style=\"mint\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary, .dsh-header-badge) {\n  background: linear-gradient(135deg, #14b083 0%, #0f8f6a 55%, #0b7a63 100%);\n  color: #ffffff;\n  border-color: transparent;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 2px 8px rgba(15, 143, 106, 0.28);\n}\n\n[data-dsh-style=\"mint\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) {\n  background-color: #ffffff;\n  box-shadow: 0 1px 2px rgba(14, 60, 46, 0.06), 0 0 0 1px rgba(15, 143, 106, 0.16), inset 3px 0 0 #10b981;\n}\n\n[data-dsh-style=\"mint\"] .dsh-progress-bar {\n  background: linear-gradient(90deg, #34d399 0%, #0f8f6a 100%);\n}\n\n/* --------------------------------------------------------------------------\n * 7. Preset 6: `glass` — 晴昼琉璃 / Daylight Glass (v4 refresh)\n *    - visionOS-style daylight: vivid indigo / rose / teal / amber aurora mesh\n *    - Deep frosted panes (`blur(24px) saturate(180%)`) with white specular rims\n *    - Indigo-violet gradient primary with soft glow, modern sans typography\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"glass\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"glass\"], :has([data-dsh-style=\"glass\"])) {\n  color-scheme: light;\n  accent-color: #5b5bd6;\n  --dsw-alias-bg-base: #eef1fb;\n  --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.50);\n  --dsw-alias-bg-layer-2: rgba(255, 255, 255, 0.62);\n  --dsw-alias-bg-layer-3: rgba(255, 255, 255, 0.74);\n  --dsw-alias-bg-overlay: #ffffff;\n  --dsw-alias-bg-module-platform: rgba(255, 255, 255, 0.46);\n  --dsw-alias-settings-card-fill: rgba(255, 255, 255, 0.58);\n  --dsw-alias-settings-card-stroke: rgba(255, 255, 255, 0.85);\n  --dsw-specific-menu: rgba(255, 255, 255, 0.88);\n  --dsw-alias-border-l1: rgba(99, 102, 241, 0.10);\n  --dsw-alias-border-l2: rgba(99, 102, 241, 0.17);\n  --dsw-alias-border-l3: rgba(79, 70, 229, 0.27);\n  --dsw-alias-border-l4: rgba(67, 56, 202, 0.40);\n  --dsw-alias-label-primary: #151a33;\n  --dsw-alias-label-secondary: #464d6e;\n  --dsw-alias-label-tertiary: #646b8b;\n  --dsw-alias-label-dimmed: #878dab;\n  --dsw-alias-brand-primary: #5b5bd6;\n  --dsw-alias-brand-text: #151a33;\n  --dsw-alias-state-business-primary: #5b5bd6;\n  --dsw-alias-state-business-tertiary: rgba(99, 102, 241, 0.14);\n  --dsw-alias-link: #4f46e5;\n  --dsw-alias-button-primary-fill: #5b5bd6;\n  --dsw-alias-button-primary-hover: #4c4ac7;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(255, 255, 255, 0.55);\n  --dsw-alias-interactive-bg-active: rgba(255, 255, 255, 0.82);\n  --dsw-alias-interactive-bg-hover-accent: rgba(99, 102, 241, 0.10);\n  --dsw-alias-interactive-bg-hover-danger: rgba(225, 29, 72, 0.10);\n  --dsw-alias-state-error-primary: #e11d48;\n  --dsw-alias-state-warn-primary: #c2610c;\n  --dsw-alias-state-warn-label: #8a4306;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.22);\n  --dsw-alias-state-success-primary: #059669;\n  --dsw-radius-xs: 10px;\n  --dsw-radius-sm: 12px;\n  --dsw-radius-md: 16px;\n  --dsw-radius-lg: 20px;\n  --dsw-radius-xl: 24px;\n  --dsw-elevation-panel: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 8px 32px rgba(49, 46, 129, 0.10), 0 0 0 1px rgba(255, 255, 255, 0.6);\n  --dsw-elevation-prominent: inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 24px 60px rgba(49, 46, 129, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.7);\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85), 0 1px 3px rgba(49, 46, 129, 0.08);\n  --dsh-button-hover-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 4px 14px rgba(79, 70, 229, 0.16);\n  --dsh-card-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 8px 30px rgba(49, 46, 129, 0.08);\n  --dsh-card-hover-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 16px 40px rgba(49, 46, 129, 0.14);\n  --dsh-surface-spotlight: rgba(255, 255, 255, 0.5);\n  --dsh-font-display: \"Segoe UI Variable Display\", \"Segoe UI\", \"PingFang SC\", \"HarmonyOS Sans SC\", \"MiSans\", \"Microsoft YaHei UI\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-body: \"Segoe UI Variable Text\", \"Segoe UI\", \"PingFang SC\", \"HarmonyOS Sans SC\", \"MiSans\", \"Microsoft YaHei UI\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, \"Microsoft YaHei UI\", monospace;\n  --dsh-display-weight: 650;\n  --dsh-display-tracking: -0.012em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"glass\"] {\n  background-color: #eef1fb;\n  background-image:\n    radial-gradient(42% 55% at 6% 10%, rgba(129, 140, 248, 0.45) 0%, transparent 70%),\n    radial-gradient(38% 48% at 94% 4%, rgba(244, 114, 182, 0.32) 0%, transparent 70%),\n    radial-gradient(48% 52% at 80% 96%, rgba(45, 212, 191, 0.32) 0%, transparent 70%),\n    radial-gradient(40% 44% at 24% 100%, rgba(251, 191, 36, 0.20) 0%, transparent 70%);\n}\n\n[data-dsh-style=\"glass\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"glass\"], :has([data-dsh-style=\"glass\"])) {\n  background: rgba(255, 255, 255, 0.55);\n  -webkit-backdrop-filter: blur(24px) saturate(180%);\n  backdrop-filter: blur(24px) saturate(180%);\n  border-color: rgba(255, 255, 255, 0.78);\n  box-shadow: var(--dsh-card-shadow);\n}\n\n[data-dsh-style=\"glass\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: rgba(255, 255, 255, 0.42);\n  -webkit-backdrop-filter: blur(24px) saturate(180%);\n  backdrop-filter: blur(24px) saturate(180%);\n  border-block-end-color: rgba(255, 255, 255, 0.72);\n  box-shadow: 0 1px 0 rgba(99, 102, 241, 0.06);\n}\n\n[data-dsh-style=\"glass\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary, .dsh-header-badge) {\n  background: linear-gradient(135deg, #6d6ff0 0%, #5b5bd6 50%, #7c4ddb 100%);\n  color: #ffffff;\n  border-color: rgba(255, 255, 255, 0.25);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 6px 18px rgba(91, 91, 214, 0.32);\n}\n\n[data-dsh-style=\"glass\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) {\n  background-color: rgba(255, 255, 255, 0.80);\n  box-shadow: inset 0 1px 0 #ffffff, 0 4px 16px rgba(49, 46, 129, 0.09);\n}\n\n[data-dsh-style=\"glass\"] [role=\"tab\"][aria-selected=\"true\"] {\n  background: rgba(255, 255, 255, 0.70);\n  color: var(--dsw-alias-label-primary);\n  box-shadow: inset 0 1px 0 #ffffff, 0 2px 8px rgba(49, 46, 129, 0.08);\n}\n\n[data-dsh-style=\"glass\"] .dsh-progress-bar {\n  background: linear-gradient(90deg, #818cf8 0%, #5b5bd6 55%, #c084fc 100%);\n}\n\n@supports not (backdrop-filter: blur(1px)) {\n  [data-dsh-style=\"glass\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"glass\"], :has([data-dsh-style=\"glass\"])) {\n    background: rgba(255, 255, 255, 0.92);\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 8. Preset 7: `eink` — 护眼墨水屏 / E-Ink Paper (NEW!)\n *    - Warm matte e-paper (`#F2F1EC` base, `#EAE8E1` layer, `#F7F6F2` card)\n *    - High-contrast `#171716` charcoal ink, crisp `1px solid #9E9C93` rules\n *    - `2px–4px` sharp corners, ultra-snappy `60ms` transitions, zero chromatic distraction\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"eink\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"eink\"], :has([data-dsh-style=\"eink\"])) {\n  color-scheme: light;\n  accent-color: #171716;\n  --dsw-alias-bg-base: #f2f1ec;\n  --dsw-alias-bg-layer-1: #eae8e1;\n  --dsw-alias-bg-layer-2: #e1dfd6;\n  --dsw-alias-bg-layer-3: #d6d3c9;\n  --dsw-alias-bg-overlay: #f7f6f2;\n  --dsw-alias-bg-module-platform: #eae8e1;\n  --dsw-alias-settings-card-fill: #f7f6f2;\n  --dsw-alias-settings-card-stroke: #9e9c93;\n  --dsw-specific-menu: #f7f6f2;\n  --dsw-alias-border-l1: #c5c2b8;\n  --dsw-alias-border-l2: #9e9c93;\n  --dsw-alias-border-l3: #78766e;\n  --dsw-alias-border-l4: #54534d;\n  --dsw-alias-label-primary: #171716;\n  --dsw-alias-label-secondary: #484742;\n  --dsw-alias-label-tertiary: #66645d;\n  --dsw-alias-label-dimmed: #807e76;\n  --dsw-alias-brand-primary: #171716;\n  --dsw-alias-brand-text: #171716;\n  --dsw-alias-state-business-primary: #171716;\n  --dsw-alias-state-business-tertiary: rgba(23, 23, 22, 0.10);\n  --dsw-alias-link: #171716;\n  --dsw-alias-button-primary-fill: #171716;\n  --dsw-alias-button-primary-hover: #2f2f2c;\n  --dsw-alias-button-primary-ink: #f7f6f2;\n  --dsw-alias-interactive-bg-hover: rgba(23, 23, 22, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(23, 23, 22, 0.12);\n  --dsw-alias-interactive-bg-hover-accent: rgba(23, 23, 22, 0.08);\n  --dsw-alias-interactive-bg-hover-danger: rgba(23, 23, 22, 0.10);\n  --dsw-alias-state-error-primary: #2d2c28;\n  --dsw-alias-state-warn-primary: #45443e;\n  --dsw-alias-state-warn-label: #171716;\n  --dsw-alias-state-warn-tertiary: #e6e4db;\n  --dsw-alias-state-success-primary: #242422;\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 3px;\n  --dsw-radius-md: 4px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-elevation-panel: 0 0 0 1px #9e9c93;\n  --dsw-elevation-prominent: 0 2px 0 #9e9c93, 0 0 0 1px #78766e;\n  --dsh-control-border-width: 1px;\n  --dsh-motion-fast: 60ms;\n  --dsh-motion-base: 60ms;\n  --dsh-motion-dialog: 60ms;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: none;\n  --dsh-card-shadow: none;\n  --dsh-card-hover-shadow: none;\n  --dsh-surface-spotlight: rgba(23, 23, 22, 0.06);\n  --dsh-font-display: \"Palatino Linotype\", Georgia, \"Noto Serif SC SemiBold\", \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"eink\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  border: 1px solid #9e9c93;\n  box-shadow: none;\n}\n\n[data-dsh-style=\"eink\"] :where([data-dsh-row], .dsh-row) {\n  border-block-end: 1px solid #c5c2b8;\n}\n\n[data-dsh-style=\"eink\"] :where(button, [role=\"button\"], [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row) {\n  translate: none !important;\n  scale: none !important;\n  transition-duration: 60ms;\n}\n\n/* --------------------------------------------------------------------------\n * 9. Preset 8: `blueprint` — 工程晒图 / Blueprint (NEW!)\n *    - Light cyanotype drafting paper (`#eaf3fb`) + dual millimeter grid (`24px` + `6px`)\n *    - Prussian engineering blue (`#0d3b66`) ink & `1px solid #1b5e8a` crisp rules\n *    - Industrial safety-orange (`#e05a2b`) primary accent + technical monospace\n *    - Tiny `+` crosshair registration ticks on cards\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"blueprint\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"blueprint\"], :has([data-dsh-style=\"blueprint\"])) {\n  color-scheme: light;\n  accent-color: #e05a2b;\n  --dsw-alias-bg-base: #eaf3fb;\n  --dsw-alias-bg-layer-1: #f4f9fe;\n  --dsw-alias-bg-layer-2: #dfeef9;\n  --dsw-alias-bg-layer-3: #cfe3f4;\n  --dsw-alias-bg-overlay: #f7fbff;\n  --dsw-alias-bg-module-platform: #e3f0fa;\n  --dsw-alias-settings-card-fill: rgba(244, 249, 254, 0.92);\n  --dsw-alias-settings-card-stroke: #1b5e8a;\n  --dsw-specific-menu: rgba(247, 251, 255, 0.98);\n  --dsw-alias-border-l1: rgba(27, 94, 138, 0.28);\n  --dsw-alias-border-l2: #1b5e8a;\n  --dsw-alias-border-l3: #0d3b66;\n  --dsw-alias-border-l4: #092b4c;\n  --dsw-alias-label-primary: #0d3b66;\n  --dsw-alias-label-secondary: #1d4e78;\n  --dsw-alias-label-tertiary: #3b6f99;\n  --dsw-alias-label-dimmed: #5b89ad;\n  --dsw-alias-brand-primary: #e05a2b;\n  --dsw-alias-brand-text: #0d3b66;\n  --dsw-alias-state-business-primary: #e05a2b;\n  --dsw-alias-state-business-tertiary: rgba(224, 90, 43, 0.14);\n  --dsw-alias-link: #0d3b66;\n  --dsw-alias-button-primary-fill: #e05a2b;\n  --dsw-alias-button-primary-hover: #c94b20;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(27, 94, 138, 0.08);\n  --dsw-alias-interactive-bg-active: rgba(224, 90, 43, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(224, 90, 43, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 45, 38, 0.12);\n  --dsw-alias-state-error-primary: #b92d26;\n  --dsw-alias-state-warn-primary: #c05614;\n  --dsw-alias-state-warn-label: #7c3408;\n  --dsw-alias-state-warn-tertiary: #fce9d8;\n  --dsw-alias-state-success-primary: #156d5b;\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 2px;\n  --dsw-radius-md: 3px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-elevation-panel: 0 0 0 1px #1b5e8a;\n  --dsw-elevation-prominent: 0 8px 24px rgba(13, 59, 102, 0.14), 0 0 0 1px #1b5e8a;\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 0 #1b5e8a;\n  --dsh-card-shadow: 0 0 0 1px #1b5e8a;\n  --dsh-card-hover-shadow: 0 3px 0 #1b5e8a;\n  --dsh-surface-spotlight: rgba(27, 94, 138, 0.09);\n  --dsh-font-display: \"Cascadia Mono SemiBold\", \"Cascadia Mono\", \"STZhongsong\", \"华文中宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-body: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.02em;\n  --dsh-body-tracking: 0.02em;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"blueprint\"] {\n  background-color: #eaf3fb;\n  background-image:\n    linear-gradient(to right, rgba(18, 78, 120, 0.09) 1px, transparent 1px),\n    linear-gradient(to bottom, rgba(18, 78, 120, 0.09) 1px, transparent 1px),\n    linear-gradient(to right, rgba(18, 78, 120, 0.045) 1px, transparent 1px),\n    linear-gradient(to bottom, rgba(18, 78, 120, 0.045) 1px, transparent 1px);\n  background-size: 24px 24px, 24px 24px, 6px 6px, 6px 6px;\n}\n\n[data-dsh-style=\"blueprint\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: rgba(244, 249, 254, 0.90);\n  border-block-end: 1px solid #1b5e8a;\n}\n\n[data-dsh-style=\"blueprint\"] :where([data-dsh-card], .dsh-card) {\n  position: relative;\n  border: 1px solid #1b5e8a;\n  background: rgba(244, 249, 254, 0.92);\n}\n\n[data-dsh-style=\"blueprint\"] :where([data-dsh-card], .dsh-card):not([role=\"tab\"])::after {\n  content: \"+\";\n  position: absolute;\n  inset-block-start: 4px;\n  inset-inline-end: 6px;\n  font-family: ui-monospace, \"Cascadia Mono\", Menlo, Consolas, monospace;\n  font-size: 11px;\n  line-height: 1;\n  color: #e05a2b;\n  opacity: 0.78;\n  pointer-events: none;\n}\n\n[data-dsh-style=\"blueprint\"] :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 1px solid #1b5e8a;\n}\n\n/* --------------------------------------------------------------------------\n * 10. Preset 9: `risograph` — 波普孔版 / Riso Zine (NEW!)\n *     - Warm printmaking paper (`#faf6ee`), bold `2px solid #18181b` outlines\n *     - Vibrant offset hard shadows (`3px 3px 0 #18181b` buttons, `4px 4px 0 #2563eb`/`#ff3e7f` cards/dialogs)\n *     - Subtle halftone dot pattern (`7px 7px`) on header\n *     - Electric pink `#ff3e7f` & marker-yellow `#fde047` accents + `translate(2px, 2px)` shadow-collapse press\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"risograph\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) {\n  color-scheme: light;\n  accent-color: #ff3e7f;\n  --dsw-alias-bg-base: #faf6ee;\n  --dsw-alias-bg-layer-1: #f5efe2;\n  --dsw-alias-bg-layer-2: #ede4d1;\n  --dsw-alias-bg-layer-3: #e3d7be;\n  --dsw-alias-bg-overlay: #fffdf7;\n  --dsw-alias-bg-module-platform: #f5efe2;\n  --dsw-alias-settings-card-fill: #fffdf7;\n  --dsw-alias-settings-card-stroke: #18181b;\n  --dsw-specific-menu: #fffdf7;\n  --dsw-alias-border-l1: #d4cbb8;\n  --dsw-alias-border-l2: #18181b;\n  --dsw-alias-border-l3: #18181b;\n  --dsw-alias-border-l4: #18181b;\n  --dsw-alias-label-primary: #18181b;\n  --dsw-alias-label-secondary: #3f3f46;\n  --dsw-alias-label-tertiary: #52525b;\n  --dsw-alias-label-dimmed: #71717a;\n  --dsw-alias-brand-primary: #ff3e7f;\n  --dsw-alias-brand-text: #18181b;\n  --dsw-alias-state-business-primary: #ff3e7f;\n  --dsw-alias-state-business-tertiary: rgba(255, 62, 127, 0.14);\n  --dsw-alias-link: #2563eb;\n  --dsw-alias-button-primary-fill: #ff3e7f;\n  --dsw-alias-button-primary-hover: #e62e6d;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(253, 224, 71, 0.38);\n  --dsw-alias-interactive-bg-active: #fde047;\n  --dsw-alias-interactive-bg-hover-accent: rgba(37, 99, 235, 0.14);\n  --dsw-alias-interactive-bg-hover-danger: rgba(255, 62, 127, 0.18);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-warn-primary: #ca8a04;\n  --dsw-alias-state-warn-label: #713f12;\n  --dsw-alias-state-warn-tertiary: #fef08a;\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-radius-xs: 3px;\n  --dsw-radius-sm: 4px;\n  --dsw-radius-md: 6px;\n  --dsw-radius-lg: 8px;\n  --dsw-radius-xl: 10px;\n  --dsw-elevation-panel: 4px 4px 0px #2563eb;\n  --dsw-elevation-prominent: 4px 4px 0px #ff3e7f;\n  --dsh-control-border-width: 2px;\n  --dsh-button-shadow: 3px 3px 0px #18181b;\n  --dsh-button-hover-shadow: 4px 4px 0px #2563eb;\n  --dsh-card-shadow: 4px 4px 0px #2563eb;\n  --dsh-card-hover-shadow: 5px 5px 0px #ff3e7f;\n  --dsh-surface-spotlight: rgba(253, 224, 71, 0.35);\n  --dsh-font-display: Impact, \"Arial Black\", \"Noto Sans SC Black\", \"SimHei\", \"黑体\", sans-serif;\n  --dsh-font-body: \"Source Sans 3\", \"Noto Sans SC Medium\", \"Noto Sans SC\", sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 900;\n  --dsh-display-tracking: -0.02em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"risograph\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background-color: #fffdf7;\n  background-image: radial-gradient(rgba(255, 62, 127, 0.15) 1px, transparent 0);\n  background-size: 7px 7px;\n  border-block-end: 2px solid #18181b;\n}\n\n[data-dsh-style=\"risograph\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 2px solid #18181b;\n  box-shadow: 3px 3px 0px #18181b;\n}\n\n[data-dsh-style=\"risograph\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  border: 2px solid #18181b;\n  box-shadow: 4px 4px 0px #2563eb;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) {\n  border: 2px solid #18181b !important;\n  box-shadow: 4px 4px 0px #ff3e7f !important;\n}\n\n[data-dsh-style=\"risograph\"] [role=\"tab\"][aria-selected=\"true\"] {\n  background: #fde047;\n  color: #18181b;\n  font-weight: 700;\n}\n\n[data-dsh-style=\"risograph\"] [role=\"tab\"][aria-selected=\"true\"]::after,\n[data-dsh-style=\"risograph\"] .dsh-tab-indicator {\n  border-block-end-color: #ff3e7f;\n  border-block-end-width: 3px;\n}\n\n/* --------------------------------------------------------------------------\n * 11. Preset 10: `win98` — 云母流光 / Mica Fluent (v4: replaces Retro 98)\n *     The `win98` id is kept so saved preferences keep working.\n *     - Windows 11 Fluent \"Mica\": softly tinted desktop backdrop, translucent layers\n *     - 4px controls / 8px cards & flyouts, bottom-stroke control elevation\n *     - Fluent accent `#005fb8`, pill nav indicator, acrylic menus & dialogs\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"win98\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) {\n  color-scheme: light;\n  accent-color: #005fb8;\n  --dsw-alias-bg-base: #eff1f5;\n  --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.50);\n  --dsw-alias-bg-layer-2: #e8eaee;\n  --dsw-alias-bg-layer-3: #dde0e6;\n  --dsw-alias-bg-overlay: #ffffff;\n  --dsw-alias-bg-module-platform: rgba(255, 255, 255, 0.40);\n  --dsw-alias-settings-card-fill: rgba(255, 255, 255, 0.72);\n  --dsw-alias-settings-card-stroke: rgba(0, 0, 0, 0.06);\n  --dsw-specific-menu: rgba(252, 252, 252, 0.88);\n  --dsw-alias-border-l1: rgba(0, 0, 0, 0.06);\n  --dsw-alias-border-l2: rgba(0, 0, 0, 0.10);\n  --dsw-alias-border-l3: rgba(0, 0, 0, 0.16);\n  --dsw-alias-border-l4: rgba(0, 0, 0, 0.45);\n  --dsw-alias-label-primary: #1a1a1a;\n  --dsw-alias-label-secondary: #5c5c5c;\n  --dsw-alias-label-tertiary: #6f6f6f;\n  --dsw-alias-label-dimmed: #8a8a8a;\n  --dsw-alias-brand-primary: #005fb8;\n  --dsw-alias-brand-text: #1a1a1a;\n  --dsw-alias-state-business-primary: #005fb8;\n  --dsw-alias-state-business-tertiary: rgba(0, 95, 184, 0.10);\n  --dsw-alias-link: #005fb8;\n  --dsw-alias-button-primary-fill: #005fb8;\n  --dsw-alias-button-primary-hover: #196ebf;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(0, 0, 0, 0.037);\n  --dsw-alias-interactive-bg-active: rgba(0, 0, 0, 0.06);\n  --dsw-alias-interactive-bg-hover-accent: rgba(0, 95, 184, 0.08);\n  --dsw-alias-interactive-bg-hover-danger: rgba(196, 43, 28, 0.08);\n  --dsw-alias-state-error-primary: #c42b1c;\n  --dsw-alias-state-warn-primary: #9d5d00;\n  --dsw-alias-state-warn-label: #6b3f00;\n  --dsw-alias-state-warn-tertiary: #fff4ce;\n  --dsw-alias-state-success-primary: #0f7b0f;\n  --dsw-radius-xs: 4px;\n  --dsw-radius-sm: 4px;\n  --dsw-radius-md: 8px;\n  --dsw-radius-lg: 8px;\n  --dsw-radius-xl: 8px;\n  --dsw-elevation-panel: 0 2px 4px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.06);\n  --dsw-elevation-prominent: 0 8px 16px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.06);\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.10);\n  --dsh-button-hover-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.10);\n  --dsh-card-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);\n  --dsh-card-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  --dsh-surface-spotlight: rgba(0, 0, 0, 0.03);\n  --dsh-font-display: \"Segoe UI Variable Display\", \"Segoe UI\", \"Microsoft YaHei UI\", \"PingFang SC\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-body: \"Segoe UI Variable Text\", \"Segoe UI\", \"Microsoft YaHei UI\", \"PingFang SC\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", Consolas, \"Microsoft YaHei UI\", monospace;\n  --dsh-display-weight: 600;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Mica: softly wallpaper-tinted backdrop */\n[data-dsh-style=\"win98\"] {\n  background-color: #eff1f5;\n  background-image: linear-gradient(135deg, #e6ecf6 0%, #f3f1f0 55%, #eeedf4 100%);\n}\n\n[data-dsh-style=\"win98\"] :where(.dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: rgba(255, 255, 255, 0.45);\n  border-block-end: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n[data-dsh-style=\"win98\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  background: rgba(255, 255, 255, 0.72);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: var(--dsh-card-shadow);\n}\n\n/* Fluent accent button: solid accent + subtle darker bottom stroke */\n[data-dsh-style=\"win98\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary) {\n  background: #005fb8;\n  color: #ffffff;\n  border-color: rgba(255, 255, 255, 0.08);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.28);\n}\n\n[data-dsh-style=\"win98\"] .dsh-header-badge {\n  background: linear-gradient(135deg, #0a7fd9 0%, #005fb8 100%);\n  color: #ffffff;\n  border-radius: 6px;\n}\n\n/* NavigationView-style pill selection indicator */\n[data-dsh-style=\"win98\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) {\n  background:\n    linear-gradient(#005fb8, #005fb8) 1px 50% / 3px 16px no-repeat,\n    rgba(0, 0, 0, 0.05);\n}\n\n[data-dsh-style=\"win98\"] [role=\"tab\"][aria-selected=\"true\"]::after {\n  inset-inline: calc(50% - 8px);\n  border-block-end-width: 3px;\n  border-block-end-color: #005fb8;\n  border-radius: 3px;\n}\n\n/* Fluent text box: bottom stroke that turns accent on focus */\n[data-dsh-style=\"win98\"] :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea) {\n  background-color: rgba(255, 255, 255, 0.78);\n  border-block-end-color: rgba(0, 0, 0, 0.42);\n}\n\n[data-dsh-style=\"win98\"] :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea):focus {\n  background-color: #ffffff;\n  border-block-end-color: #005fb8;\n  box-shadow: inset 0 -1px 0 #005fb8;\n}\n\n/* Acrylic flyouts & dialogs */\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"win98\"], :has([data-dsh-style=\"win98\"])) {\n  background: rgba(252, 252, 252, 0.86);\n  -webkit-backdrop-filter: blur(30px) saturate(125%);\n  backdrop-filter: blur(30px) saturate(125%);\n}\n\n[data-dsh-style=\"win98\"] .dsh-progress-bar {\n  background: #005fb8;\n}\n\n/* --------------------------------------------------------------------------\n * 12. Preset 11: `songhui` — 宋韵朱砂 / Song Xuan (NEW!)\n *     - Warm gold-flecked Xuan paper (`#f7f3e8`, subtle `18px` gold-dust radial dots)\n *     - Double cinnabar masthead border (`3px double #b83b2a`)\n *     - Cinnabar seal-stamp primary buttons (`#b83b2a` with `#fbf9f2` ink, `2px` crisp corners)\n *     - Classical Songti / serif typography\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"songhui\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"songhui\"], :has([data-dsh-style=\"songhui\"])) {\n  color-scheme: light;\n  accent-color: #b83b2a;\n  --dsw-alias-bg-base: #f7f3e8;\n  --dsw-alias-bg-layer-1: #f0ead9;\n  --dsw-alias-bg-layer-2: #e7dec8;\n  --dsw-alias-bg-layer-3: #dcd0b4;\n  --dsw-alias-bg-overlay: #fbf9f2;\n  --dsw-alias-bg-module-platform: #ede6d4;\n  --dsw-alias-settings-card-fill: #fbf9f2;\n  --dsw-alias-settings-card-stroke: #d4c4a2;\n  --dsw-specific-menu: #fbf9f2;\n  --dsw-alias-border-l1: #e4dac2;\n  --dsw-alias-border-l2: #cfbda0;\n  --dsw-alias-border-l3: #b8a382;\n  --dsw-alias-border-l4: #9d8765;\n  --dsw-alias-label-primary: #252019;\n  --dsw-alias-label-secondary: #5c5142;\n  --dsw-alias-label-tertiary: #7d705e;\n  --dsw-alias-label-dimmed: #998c79;\n  --dsw-alias-brand-primary: #b83b2a;\n  --dsw-alias-brand-text: #252019;\n  --dsw-alias-state-business-primary: #b83b2a;\n  --dsw-alias-state-business-tertiary: rgba(184, 59, 42, 0.12);\n  --dsw-alias-link: #9e2f20;\n  --dsw-alias-button-primary-fill: #b83b2a;\n  --dsw-alias-button-primary-hover: #9f3021;\n  --dsw-alias-button-primary-ink: #fbf9f2;\n  --dsw-alias-interactive-bg-hover: rgba(184, 59, 42, 0.065);\n  --dsw-alias-interactive-bg-active: rgba(184, 59, 42, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(184, 59, 42, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(184, 59, 42, 0.15);\n  --dsw-alias-state-error-primary: #a62b1c;\n  --dsw-alias-state-warn-primary: #9c6216;\n  --dsw-alias-state-warn-label: #704309;\n  --dsw-alias-state-warn-tertiary: #f7ecd1;\n  --dsw-alias-state-success-primary: #2e664b;\n  --dsw-radius-xs: 2px;\n  --dsw-radius-sm: 2px;\n  --dsw-radius-md: 3px;\n  --dsw-radius-lg: 4px;\n  --dsw-radius-xl: 4px;\n  --dsw-elevation-panel: 0 2px 10px rgba(66, 52, 32, 0.06), 0 0 0 1px #cfbda0;\n  --dsw-elevation-prominent: 0 12px 30px rgba(66, 52, 32, 0.14), 0 0 0 1px #b8a382;\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(184, 59, 42, 0.12);\n  --dsh-card-shadow: 0 1px 2px rgba(66, 52, 32, 0.05);\n  --dsh-card-hover-shadow: 0 6px 16px rgba(66, 52, 32, 0.09);\n  --dsh-surface-spotlight: rgba(184, 59, 42, 0.07);\n  --dsh-font-display: \"STZhongsong\", \"华文中宋\", \"Noto Serif SC Black\", \"SimSun\", \"宋体\", serif;\n  --dsh-font-body: \"Palatino Linotype\", \"STKaiti\", \"华文楷体\", \"KaiTi\", \"楷体\", \"Noto Serif SC\", serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, \"STFangsong\", \"华文仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.04em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Gold-flecked Xuan paper */\n[data-dsh-style=\"songhui\"] {\n  background-color: #f7f3e8;\n  background-image:\n    radial-gradient(rgba(196, 152, 64, 0.18) 1px, transparent 0),\n    radial-gradient(rgba(196, 152, 64, 0.11) 0.75px, transparent 0);\n  background-size: 18px 18px, 29px 29px;\n  background-position: 0 0, 9px 7px;\n}\n\n/* Double cinnabar masthead border */\n[data-dsh-style=\"songhui\"] :where(.pageHeader, .dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: rgba(251, 249, 242, 0.90);\n  border-block-end: 3px double #b83b2a;\n}\n\n/* Cinnabar seal-stamp primary buttons & badge */\n[data-dsh-style=\"songhui\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary, .dsh-header-badge) {\n  background: #b83b2a;\n  color: #fbf9f2;\n  border-color: #9e2f20;\n  border-radius: 2px;\n  box-shadow: inset 0 0 0 1px rgba(251, 249, 242, 0.28);\n}\n\n/* --------------------------------------------------------------------------\n * 13. Preset 12: `frutiger` — 晴空水晶 / Aqua Crystal (v4 refresh)\n *     - Clear sky-aqua daylight with a white sun bloom\n *     - \"Liquid crystal\" panes: light blur, high saturation, bright edge refraction\n *       (top-left specular + bottom-right rim) instead of the old split gloss\n *     - Pill controls, smooth aqua primary with inner depth & glow\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"frutiger\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"frutiger\"], :has([data-dsh-style=\"frutiger\"])) {\n  color-scheme: light;\n  accent-color: #0284c7;\n  --dsw-alias-bg-base: #e4f4ff;\n  --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.40);\n  --dsw-alias-bg-layer-2: rgba(255, 255, 255, 0.55);\n  --dsw-alias-bg-layer-3: rgba(255, 255, 255, 0.70);\n  --dsw-alias-bg-overlay: #fbfdff;\n  --dsw-alias-bg-module-platform: rgba(255, 255, 255, 0.36);\n  --dsw-alias-settings-card-fill: rgba(255, 255, 255, 0.42);\n  --dsw-alias-settings-card-stroke: rgba(255, 255, 255, 0.90);\n  --dsw-specific-menu: rgba(244, 251, 255, 0.90);\n  --dsw-alias-border-l1: rgba(14, 165, 233, 0.14);\n  --dsw-alias-border-l2: rgba(14, 165, 233, 0.24);\n  --dsw-alias-border-l3: rgba(2, 132, 199, 0.36);\n  --dsw-alias-border-l4: rgba(3, 105, 161, 0.50);\n  --dsw-alias-label-primary: #072a44;\n  --dsw-alias-label-secondary: #2b5675;\n  --dsw-alias-label-tertiary: #4b7593;\n  --dsw-alias-label-dimmed: #6f94ae;\n  --dsw-alias-brand-primary: #0284c7;\n  --dsw-alias-brand-text: #072a44;\n  --dsw-alias-state-business-primary: #0284c7;\n  --dsw-alias-state-business-tertiary: rgba(14, 165, 233, 0.16);\n  --dsw-alias-link: #0369a1;\n  --dsw-alias-button-primary-fill: #0284c7;\n  --dsw-alias-button-primary-hover: #0369a1;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(255, 255, 255, 0.50);\n  --dsw-alias-interactive-bg-active: rgba(255, 255, 255, 0.78);\n  --dsw-alias-interactive-bg-hover-accent: rgba(56, 189, 248, 0.16);\n  --dsw-alias-interactive-bg-hover-danger: rgba(225, 29, 72, 0.10);\n  --dsw-alias-state-error-primary: #e11d48;\n  --dsw-alias-state-warn-primary: #c2610c;\n  --dsw-alias-state-warn-label: #8a4306;\n  --dsw-alias-state-warn-tertiary: rgba(253, 224, 71, 0.30);\n  --dsw-alias-state-success-primary: #0d9488;\n  --dsw-radius-xs: 12px;\n  --dsw-radius-sm: 999px;\n  --dsw-radius-md: 20px;\n  --dsw-radius-lg: 24px;\n  --dsw-radius-xl: 28px;\n  --dsw-elevation-panel: inset 1px 1px 0 rgba(255, 255, 255, 0.95), inset -1px -1px 0 rgba(255, 255, 255, 0.45), 0 10px 30px rgba(2, 132, 199, 0.12);\n  --dsw-elevation-prominent: inset 1px 1px 0 rgba(255, 255, 255, 0.98), inset -1px -1px 0 rgba(255, 255, 255, 0.5), 0 24px 56px rgba(2, 132, 199, 0.20);\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(255, 255, 255, 0.35), 0 2px 8px rgba(2, 132, 199, 0.10);\n  --dsh-button-hover-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 rgba(255, 255, 255, 0.4), 0 6px 16px rgba(2, 132, 199, 0.18);\n  --dsh-card-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.95), inset -1px -1px 0 rgba(255, 255, 255, 0.4), 0 10px 30px rgba(2, 132, 199, 0.10);\n  --dsh-card-hover-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.98), inset -1px -1px 0 rgba(255, 255, 255, 0.45), 0 18px 40px rgba(2, 132, 199, 0.16);\n  --dsh-surface-spotlight: rgba(255, 255, 255, 0.45);\n  --dsh-font-display: \"Segoe UI Variable Display\", \"Segoe UI\", \"PingFang SC\", \"HarmonyOS Sans SC\", \"MiSans\", \"Microsoft YaHei UI\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-body: \"Segoe UI Variable Text\", \"Segoe UI\", \"PingFang SC\", \"HarmonyOS Sans SC\", \"MiSans\", \"Microsoft YaHei UI\", \"Noto Sans SC\", system-ui, sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, \"Microsoft YaHei UI\", monospace;\n  --dsh-display-weight: 650;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"frutiger\"] {\n  background-color: #e4f4ff;\n  background-image:\n    radial-gradient(50% 42% at 16% 0%, rgba(255, 255, 255, 0.95) 0%, transparent 70%),\n    radial-gradient(45% 55% at 100% 30%, rgba(56, 189, 248, 0.30) 0%, transparent 70%),\n    radial-gradient(55% 50% at 0% 100%, rgba(34, 211, 238, 0.26) 0%, transparent 70%),\n    linear-gradient(180deg, #dff2ff 0%, #eef9ff 50%, #e2f5ff 100%);\n}\n\n[data-dsh-style=\"frutiger\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"frutiger\"], :has([data-dsh-style=\"frutiger\"])) {\n  background: linear-gradient(160deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.32) 100%);\n  -webkit-backdrop-filter: blur(16px) saturate(210%) brightness(1.04);\n  backdrop-filter: blur(16px) saturate(210%) brightness(1.04);\n  border-color: rgba(255, 255, 255, 0.85);\n  box-shadow: var(--dsh-card-shadow);\n}\n\n[data-dsh-style=\"frutiger\"] :where(.dsh-header, [data-dsh-header]) {\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 1px 0 rgba(14, 165, 233, 0.10);\n}\n\n[data-dsh-style=\"frutiger\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"frutiger\"], :has([data-dsh-style=\"frutiger\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border-radius: 999px;\n  border: 1px solid rgba(255, 255, 255, 0.9);\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.46) 100%);\n  box-shadow: var(--dsh-button-shadow);\n}\n\n[data-dsh-style=\"frutiger\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary, .dsh-header-badge) {\n  border-radius: 999px;\n  border: 1px solid rgba(255, 255, 255, 0.45);\n  color: #ffffff;\n  background: linear-gradient(180deg, #4cc3fa 0%, #0ea5e9 45%, #0284c7 100%);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -2px 6px rgba(3, 105, 161, 0.35), 0 6px 18px rgba(14, 165, 233, 0.35);\n}\n\n[data-dsh-style=\"frutiger\"] :where([data-dsh-row], .dsh-row):where([data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) {\n  background-color: rgba(255, 255, 255, 0.72);\n  box-shadow: inset 1px 1px 0 #ffffff, 0 4px 14px rgba(2, 132, 199, 0.10);\n}\n\n[data-dsh-style=\"frutiger\"] [role=\"tab\"][aria-selected=\"true\"] {\n  background: rgba(255, 255, 255, 0.66);\n  border-radius: 999px;\n  color: var(--dsw-alias-label-primary);\n  box-shadow: inset 0 1px 0 #ffffff, 0 2px 8px rgba(2, 132, 199, 0.12);\n}\n\n[data-dsh-style=\"frutiger\"] [role=\"tab\"][aria-selected=\"true\"]::after {\n  inset-inline: 40%;\n  border-radius: 3px;\n}\n\n[data-dsh-style=\"frutiger\"] .dsh-progress-bar {\n  background: linear-gradient(90deg, #67e8f9 0%, #0ea5e9 55%, #0284c7 100%);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);\n}\n\n@supports not (backdrop-filter: blur(1px)) {\n  [data-dsh-style=\"frutiger\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel, .dsh-header, [data-dsh-header]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"frutiger\"], :has([data-dsh-style=\"frutiger\"])) {\n    background: rgba(255, 255, 255, 0.92);\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 14. Preset 13: `gazette` — 铅字晨报 / Gazette\n *     - Warm newsprint base (`#f6f3ec`), `#ede8dd` layer, `#faf8f3` card, `#161514` ink\n *     - `4px double #161514` masthead border on `.pageHeader` / `.dsh-header`\n *     - Crisp `1px solid #161514` column rules, `0px–2px` editorial corners\n *     - `#9b1c1c` crimson seal/editorial accent & high-contrast ink buttons\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"gazette\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"gazette\"], :has([data-dsh-style=\"gazette\"])) {\n  color-scheme: light;\n  accent-color: #9b1c1c;\n  --dsw-alias-bg-base: #f6f3ec;\n  --dsw-alias-bg-layer-1: #ede8dd;\n  --dsw-alias-bg-layer-2: #e3dccd;\n  --dsw-alias-bg-layer-3: #d6cebc;\n  --dsw-alias-bg-overlay: #faf8f3;\n  --dsw-alias-bg-module-platform: #ebe5d8;\n  --dsw-alias-settings-card-fill: #faf8f3;\n  --dsw-alias-settings-card-stroke: #161514;\n  --dsw-specific-menu: #faf8f3;\n  --dsw-alias-border-l1: #cec6b6;\n  --dsw-alias-border-l2: #161514;\n  --dsw-alias-border-l3: #161514;\n  --dsw-alias-border-l4: #161514;\n  --dsw-alias-label-primary: #161514;\n  --dsw-alias-label-secondary: #43403c;\n  --dsw-alias-label-tertiary: #635f59;\n  --dsw-alias-label-dimmed: #827d75;\n  --dsw-alias-brand-primary: #9b1c1c;\n  --dsw-alias-brand-text: #161514;\n  --dsw-alias-state-business-primary: #9b1c1c;\n  --dsw-alias-state-business-tertiary: rgba(155, 28, 28, 0.12);\n  --dsw-alias-link: #9b1c1c;\n  --dsw-alias-button-primary-fill: #161514;\n  --dsw-alias-button-primary-hover: #2d2b28;\n  --dsw-alias-button-primary-ink: #faf8f3;\n  --dsw-alias-interactive-bg-hover: rgba(22, 21, 20, 0.06);\n  --dsw-alias-interactive-bg-active: rgba(155, 28, 28, 0.11);\n  --dsw-alias-interactive-bg-hover-accent: rgba(155, 28, 28, 0.10);\n  --dsw-alias-interactive-bg-hover-danger: rgba(155, 28, 28, 0.14);\n  --dsw-alias-state-error-primary: #9b1c1c;\n  --dsw-alias-state-warn-primary: #9a5b08;\n  --dsw-alias-state-warn-label: #6e3f04;\n  --dsw-alias-state-warn-tertiary: #f6ead2;\n  --dsw-alias-state-success-primary: #1f5c3a;\n  --dsw-radius-xs: 0px;\n  --dsw-radius-sm: 1px;\n  --dsw-radius-md: 2px;\n  --dsw-radius-lg: 2px;\n  --dsw-radius-xl: 2px;\n  --dsw-elevation-panel: 0 1px 0 #161514, 0 0 0 1px #161514;\n  --dsw-elevation-prominent: 3px 3px 0 #161514, 0 0 0 1px #161514;\n  --dsh-control-border-width: 1px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 0 #161514;\n  --dsh-card-shadow: none;\n  --dsh-card-hover-shadow: 2px 2px 0 #161514;\n  --dsh-surface-spotlight: rgba(155, 28, 28, 0.06);\n  --dsh-font-display: Garamond, Georgia, \"STZhongsong\", \"华文中宋\", \"Noto Serif SC Black\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, \"Courier New\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n[data-dsh-style=\"gazette\"] {\n  background-color: #f6f3ec;\n}\n\n/* Broadsheet 4px double masthead border */\n[data-dsh-style=\"gazette\"] :where(.pageHeader, .dsh-header, [data-dsh-header], .dsh-wb-header) {\n  background: #faf8f3;\n  border-block-end: 4px double #161514;\n}\n\n/* Crisp 1px solid #161514 column rules & editorial cards */\n[data-dsh-style=\"gazette\"] :where([data-dsh-card], .dsh-card, [data-dsh-panel], .dsh-panel) {\n  background: #faf8f3;\n  border: 1px solid #161514;\n  border-radius: 2px;\n  box-shadow: none;\n}\n\n[data-dsh-style=\"gazette\"] :where([data-dsh-row], .dsh-row) {\n  border-block-end: 1px solid #161514;\n}\n\n[data-dsh-style=\"gazette\"] .dsh-split-leading {\n  border-inline-end: 1px solid #161514;\n}\n\n[data-dsh-style=\"gazette\"] .dsh-split-resizer::before {\n  background: #161514;\n}\n\n/* 0px–2px editorial corners, crimson seal accent & high-contrast ink buttons */\n[data-dsh-style=\"gazette\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"gazette\"], :has([data-dsh-style=\"gazette\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 1px solid #161514;\n  border-radius: 1px;\n}\n\n[data-dsh-style=\"gazette\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary) {\n  background: #161514;\n  color: #faf8f3;\n  border-color: #161514;\n}\n\n[data-dsh-style=\"gazette\"] :where(.dsh-wb-btn-primary, .dsh-btn-primary):hover:not(:disabled) {\n  background: #9b1c1c;\n  border-color: #9b1c1c;\n}\n\n[data-dsh-style=\"gazette\"] .dsh-header-badge {\n  background: #9b1c1c;\n  color: #faf8f3;\n  border-radius: 1px;\n}\n\n[data-dsh-style=\"gazette\"] [role=\"tab\"][aria-selected=\"true\"]::after,\n[data-dsh-style=\"gazette\"] .dsh-tab-indicator {\n  border-block-end-color: #9b1c1c;\n  border-block-end-width: 2.5px;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"gazette\"], :has([data-dsh-style=\"gazette\"])) {\n  border: 1px solid #161514 !important;\n  border-radius: 2px !important;\n}\n\n/* --------------------------------------------------------------------------\n * 14b. Independent `[data-dsh-font]` Overrides & Dual-Layer Typography Rules\n *      When `data-dsh-font=\"auto\"` (or unset), each `[data-dsh-style]` uses its\n *      own Windows-verified Chinese + Latin signature font stack.\n * -------------------------------------------------------------------------- */\n:root[data-dsh-font=\"songkai\"] [data-dsh-style],\n:root[data-dsh-font=\"songkai\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"songkai\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"songkai\"],\n[data-dsh-portal-synced][data-dsh-font=\"songkai\"] {\n  --dsh-font-display: \"STZhongsong\", \"华文中宋\", \"Noto Serif SC Black\", \"SimSun\", \"宋体\", serif;\n  --dsh-font-body: \"Palatino Linotype\", \"STKaiti\", \"华文楷体\", \"KaiTi\", \"楷体\", \"Noto Serif SC\", serif;\n  --dsh-font-mono: \"Cascadia Mono\", Consolas, \"STFangsong\", \"华文仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.04em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"fangsong\"] [data-dsh-style],\n:root[data-dsh-font=\"fangsong\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"fangsong\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"fangsong\"],\n[data-dsh-portal-synced][data-dsh-font=\"fangsong\"] {\n  --dsh-font-display: \"Cascadia Mono SemiBold\", \"Cascadia Mono\", \"STZhongsong\", \"华文中宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-body: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"STFangsong\", \"华文仿宋\", \"FangSong\", \"仿宋\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.02em;\n  --dsh-body-tracking: 0.02em;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"poster\"] [data-dsh-style],\n:root[data-dsh-font=\"poster\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"poster\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"poster\"],\n[data-dsh-portal-synced][data-dsh-font=\"poster\"] {\n  --dsh-font-display: Impact, \"Arial Black\", \"Noto Sans SC Black\", \"SimHei\", \"黑体\", sans-serif;\n  --dsh-font-body: \"Source Sans 3\", \"Noto Sans SC Medium\", \"Noto Sans SC\", sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 900;\n  --dsh-display-tracking: -0.02em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"retro98\"] [data-dsh-style],\n:root[data-dsh-font=\"retro98\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"retro98\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"retro98\"],\n[data-dsh-portal-synced][data-dsh-font=\"retro98\"] {\n  --dsh-font-display: Tahoma, \"SimSun\", \"NSimSun\", \"宋体\", \"新宋体\", sans-serif;\n  --dsh-font-body: Tahoma, \"SimSun\", \"NSimSun\", \"宋体\", \"新宋体\", sans-serif;\n  --dsh-font-mono: \"Fixedsys\", Consolas, \"Courier New\", \"SimSun\", \"宋体\", monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"serif\"] [data-dsh-style],\n:root[data-dsh-font=\"serif\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"serif\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"serif\"],\n[data-dsh-portal-synced][data-dsh-font=\"serif\"] {\n  --dsh-font-display: \"Palatino Linotype\", Georgia, \"Noto Serif SC SemiBold\", \"Noto Serif SC\", \"STZhongsong\", \"华文中宋\", serif;\n  --dsh-font-body: Georgia, \"Noto Serif SC\", \"STSong\", \"华文宋体\", serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: -0.01em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"arcade\"] [data-dsh-style],\n:root[data-dsh-font=\"arcade\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"arcade\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"arcade\"],\n[data-dsh-portal-synced][data-dsh-font=\"arcade\"] {\n  --dsh-font-display: \"Cascadia Code SemiBold\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-body: \"Cascadia Code\", \"Cascadia Mono\", \"YouYuan\", \"幼圆\", \"Noto Sans SC\", monospace;\n  --dsh-font-mono: \"Cascadia Mono\", \"Cascadia Code\", \"YouYuan\", \"幼圆\", Consolas, monospace;\n  --dsh-display-weight: 700;\n  --dsh-display-tracking: 0.015em;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n:root[data-dsh-font=\"modern\"] [data-dsh-style],\n:root[data-dsh-font=\"modern\"] [data-dsh-portal-synced],\n:root[data-dsh-font=\"modern\"] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]),\n[data-dsh-style][data-dsh-font=\"modern\"],\n[data-dsh-portal-synced][data-dsh-font=\"modern\"] {\n  --dsh-font-display: \"Source Sans 3\", \"Segoe UI\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif;\n  --dsh-font-body: \"Source Sans 3\", \"Segoe UI\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif;\n  --dsh-font-mono: \"Cascadia Code\", \"Cascadia Mono\", Consolas, \"Microsoft YaHei UI\", monospace;\n  --dsh-display-weight: 650;\n  --dsh-display-tracking: normal;\n  --dsh-body-tracking: normal;\n  --dsw-font-family: var(--dsh-font-body);\n  --dsw-font-markdown-base: var(--dsh-font-body);\n}\n\n/* Dual-layer body typography application (workbench + form controls + portaled menus/modals) */\n:where([data-dsh-style], [data-dsh-portal-synced]),\n:where([data-dsh-style], [data-dsh-portal-synced]) :where(button, input, select, textarea),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(button, input, select, textarea) {\n  font-family: var(--dsh-font-body);\n  letter-spacing: var(--dsh-body-tracking, normal);\n}\n\n/* Dual-layer display typography application (headings, tabs, header title, editorial titles) */\n:where([data-dsh-style], [data-dsh-portal-synced]) :where(\n  h1,\n  h2,\n  h3,\n  [role=\"tab\"],\n  .dsh-header-title,\n  [data-dsh-serif],\n  [data-dsh-editorial-heading],\n  [data-dsh-card] :is(h2, h3, .dsh-card-title),\n  .dsh-card :is(h2, h3, .dsh-card-title),\n  [data-dsh-reader] :is(h1, h2),\n  .dsh-reader :is(h1, h2)\n),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(h1, h2, h3, header h2, [role=\"tab\"], [data-dsh-serif]) {\n  font-family: var(--dsh-font-display);\n  font-weight: var(--dsh-display-weight, 700);\n  letter-spacing: var(--dsh-display-tracking, normal);\n}\n\n/* Monospace code typography */\n:where([data-dsh-style], [data-dsh-portal-synced]) :where(code, pre, kbd, samp),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style], [data-dsh-portal-synced], :has([data-dsh-style])) :where(code, pre, kbd, samp) {\n  font-family: var(--dsh-font-mono);\n}\n\n/* --------------------------------------------------------------------------\n * 11. Interactive Dynamics: Tactile Button Physics & Active States\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(button, [role=\"button\"]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"]) {\n  /* Identity transforms prevent mid-interaction stacking-context shifts */\n  translate: 0px 0px;\n  scale: 1;\n  transition-property: background-color, border-color, color, box-shadow, opacity, translate, scale;\n  transition-duration: var(--dsh-motion-fast);\n  transition-timing-function: var(--dsh-ease-out);\n}\n\n/* Visible active style on open menu triggers */\n:where([data-dsh-style]) :where(button, [role=\"button\"])[aria-expanded=\"true\"]:not(:disabled):not([aria-disabled=\"true\"]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"])[aria-expanded=\"true\"]:not(:disabled):not([aria-disabled=\"true\"]) {\n  background-color: var(--dsw-alias-interactive-bg-active);\n  color: var(--dsw-alias-label-primary);\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  @media (hover: hover) {\n    :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not([role=\"switch\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not([role=\"switch\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: 0px -0.5px;\n    }\n\n    [data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: -1px -1px;\n      box-shadow: 3px 3px 0px #1e2826;\n      transition-timing-function: steps(2, end);\n      transition-duration: 70ms;\n    }\n\n    [data-dsh-style=\"risograph\"] :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: -1px -1px;\n      box-shadow: 4px 4px 0px #2563eb;\n    }\n  }\n\n  /* Tactile spring press on standard themes */\n  :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"switch\"]), [role=\"button\"]):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"risograph\"])) :where(button:not([role=\"switch\"]), [role=\"button\"]):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    scale: 0.965;\n    translate: 0px 0.5px;\n    transition-duration: 80ms;\n  }\n\n  /* Stepped 8-Bit arcade press (`translate(1px, 1px)` + crisp 1px pixel shadow) */\n  [data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    translate: 1px 1px !important;\n    scale: 1 !important;\n    box-shadow: 1px 1px 0px #1e2826 !important;\n    transition-timing-function: steps(2, end);\n    transition-duration: 50ms;\n  }\n\n  /* Risograph shadow-collapse button press (`translate(2px, 2px)`) */\n  [data-dsh-style=\"risograph\"] :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"risograph\"], :has([data-dsh-style=\"risograph\"])) :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    translate: 2px 2px !important;\n    scale: 1 !important;\n    box-shadow: 1px 1px 0px #18181b !important;\n    transition-duration: 60ms;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 12. Small-Button SVG Icon Micro-Animations\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(button, [role=\"button\"], summary) svg,\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"], summary) svg {\n  translate: 0px 0px;\n  rotate: 0deg;\n  scale: 1;\n  transform-origin: center;\n}\n\n@keyframes dsh-icon-spin {\n  to {\n    rotate: 360deg;\n  }\n}\n\n@keyframes dsh-icon-wiggle {\n  0% { rotate: 0deg; }\n  25% { rotate: -12deg; }\n  55% { rotate: 10deg; }\n  80% { rotate: -5deg; }\n  100% { rotate: 0deg; }\n}\n\n@keyframes dsh-icon-pop {\n  0% { scale: 1; }\n  45% { scale: 1.26; }\n  75% { scale: 0.94; }\n  100% { scale: 1; }\n}\n\n@keyframes dsh-icon-bounce {\n  0%, 100% { translate: 0px 0px; }\n  45% { translate: 0px 2.5px; }\n  75% { translate: 0px -1px; }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]) :where(button, [role=\"button\"], summary) svg,\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"], summary) svg {\n    transition:\n      translate var(--dsh-motion-base) var(--dsh-ease-spring),\n      rotate 240ms var(--dsh-ease-spring),\n      scale var(--dsh-motion-base) var(--dsh-ease-spring);\n  }\n\n  /* 1) `down` / chevron: 180deg flip on `[aria-expanded=\"true\"]` or `details[open]` */\n  :where([data-dsh-style]) :where([aria-expanded=\"true\"], [data-open=\"true\"], details[open] > summary) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]) :where([aria-expanded=\"true\"], [data-open=\"true\"]) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]) {\n    rotate: 180deg;\n  }\n\n  /* 2) `refresh` / `sync`: smooth 180deg spin on hover, continuous spin when busy */\n  :where([data-dsh-style]) :where(button, [role=\"button\"])[aria-busy=\"true\"] :is(svg[data-dsh-icon=\"refresh\"], svg[data-dsh-icon=\"sync\"], svg[data-icon=\"refresh\"], svg[data-icon=\"sync\"]),\n  :where([data-dsh-style]) :is(svg[data-dsh-icon=\"refresh\"], svg[data-icon=\"refresh\"])[data-spinning=\"true\"] {\n    animation: dsh-icon-spin 0.85s linear infinite;\n  }\n\n  @media (hover: hover) {\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"refresh\"], svg[data-dsh-icon=\"sync\"], svg[data-dsh-icon=\"reload\"], svg[data-icon=\"refresh\"], svg[data-icon=\"sync\"], svg[data-icon=\"reload\"]) {\n      rotate: 180deg;\n    }\n\n    /* 3) `plus` / `close`: crisp 90deg turn */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"plus\"], svg[data-dsh-icon=\"add\"], svg[data-dsh-icon=\"close\"], svg[data-dsh-icon=\"x\"], svg[data-icon=\"plus\"], svg[data-icon=\"add\"], svg[data-icon=\"close\"], svg[data-icon=\"x\"]) {\n      rotate: 90deg;\n    }\n\n    /* 4) `send` / `external` / `link`: forward/diagonal glide */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], a):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"send\"], svg[data-dsh-icon=\"external\"], svg[data-dsh-icon=\"link\"], svg[data-icon=\"send\"], svg[data-icon=\"external\"], svg[data-icon=\"link\"]) {\n      translate: 2px -1.5px;\n    }\n\n    /* 5) `reply` / `left` / `undo`: leading glide */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"reply\"], svg[data-dsh-icon=\"left\"], svg[data-dsh-icon=\"undo\"], svg[data-icon=\"reply\"], svg[data-icon=\"left\"], svg[data-icon=\"undo\"]) {\n      translate: -2px 0px;\n    }\n\n    /* 6) `right` / `play`: trailing nudge & pulse */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"right\"], svg[data-icon=\"right\"]) {\n      translate: 2px 0px;\n    }\n\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"play\"], svg[data-icon=\"play\"]) {\n      translate: 1.5px 0px;\n      scale: 1.14;\n    }\n\n    /* 7) `trash` / `delete`: tactile warning wiggle */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"trash\"], svg[data-dsh-icon=\"delete\"], svg[data-icon=\"trash\"], svg[data-icon=\"delete\"]) {\n      animation: dsh-icon-wiggle 360ms var(--dsh-ease-in-out);\n    }\n\n    /* 8) `star` / `check` / `copy` / `bookmark`: spring pop */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"star\"], svg[data-dsh-icon=\"check\"], svg[data-dsh-icon=\"copy\"], svg[data-dsh-icon=\"bookmark\"], svg[data-icon=\"star\"], svg[data-icon=\"check\"], svg[data-icon=\"copy\"], svg[data-icon=\"bookmark\"]) {\n      scale: 1.18;\n    }\n\n    /* 9) `download` / `export`: vertical bounce */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"download\"], svg[data-dsh-icon=\"export\"], svg[data-icon=\"download\"], svg[data-icon=\"export\"]) {\n      animation: dsh-icon-bounce 420ms var(--dsh-ease-out);\n    }\n\n    /* 10) `palette` / `sparkles` / `edit`: playful tilt */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"palette\"], svg[data-dsh-icon=\"sparkles\"], svg[data-dsh-icon=\"edit\"], svg[data-icon=\"palette\"], svg[data-icon=\"sparkles\"], svg[data-icon=\"edit\"]) {\n      rotate: -12deg;\n      scale: 1.08;\n    }\n\n    /* Closed chevron gentle downward cue on hover */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"])[aria-expanded=\"false\"]:hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]) {\n      translate: 0px 1.5px;\n    }\n  }\n\n  /* Pop feedback when toggled into active/pressed/checked state */\n  :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where([aria-pressed=\"true\"], [aria-checked=\"true\"], [data-active=\"true\"], [data-copied=\"true\"]) :is(svg[data-dsh-icon=\"star\"], svg[data-dsh-icon=\"check\"], svg[data-dsh-icon=\"copy\"], svg[data-icon=\"star\"], svg[data-icon=\"check\"], svg[data-icon=\"copy\"]) {\n    animation: dsh-icon-pop 300ms var(--dsh-ease-spring);\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 13. v3 Layout Primitives: Unified 48px Single-Row Header\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(.dsh-header, [data-dsh-header]) {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  min-height: 48px;\n  padding: 6px 14px;\n  flex: none;\n  min-width: 0;\n  background: var(--dsw-alias-bg-base);\n  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n}\n\n.dsh-header-leading {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n  flex: 1 1 auto;\n}\n\n.dsh-header-brand {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n  flex: none;\n  white-space: nowrap;\n}\n\n.dsh-header-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  width: 24px;\n  height: 24px;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: var(--dsw-alias-button-primary-fill, #4176e6);\n  color: var(--dsw-alias-button-primary-ink, #ffffff);\n}\n\n.dsh-header-title {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: var(--dsh-display-weight, 650);\n  line-height: 1.25;\n  color: var(--dsw-alias-label-primary);\n  white-space: nowrap;\n}\n\n.dsh-header-tabs {\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  flex: 1 1 auto;\n}\n\n.dsh-header-actions {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex: none;\n  white-space: nowrap;\n}\n\n@container (max-width: 759px) {\n  :where([data-dsh-style]) :where(.dsh-header, [data-dsh-header]) {\n    flex-wrap: wrap;\n    padding-block: 6px;\n  }\n\n  .dsh-header-leading {\n    flex-wrap: wrap;\n    gap: 6px 10px;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 14. v3 Tabs: Sliding Indicator + 140ms `@starting-style` Panel Entrance\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where([role=\"tablist\"], .dsh-tablist) {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  min-width: 0;\n  overflow-x: auto;\n  scrollbar-width: thin;\n}\n\n:where([data-dsh-style]) [role=\"tab\"] {\n  position: relative;\n  flex: none;\n  white-space: nowrap;\n}\n\n/* Static fallback underline when sliding indicator is not active (or in forced-colors) */\n:where([data-dsh-style]) [role=\"tab\"][aria-selected=\"true\"]::after {\n  content: \"\";\n  position: absolute;\n  inset-inline: 6px;\n  inset-block-end: 0;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary);\n  pointer-events: none;\n}\n\n[data-dsh-style] :where([data-dsh-tablist][data-indicator-ready=\"true\"], .dsh-tablist[data-indicator-ready=\"true\"]) [role=\"tab\"][aria-selected=\"true\"]::after {\n  opacity: 0;\n}\n\n.dsh-tab-indicator {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-end: 0;\n  height: 2px;\n  width: var(--dsh-tab-w, 0px);\n  translate: var(--dsh-tab-x, 0px) 0px;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary);\n  border-radius: 2px 2px 0 0;\n  pointer-events: none;\n  opacity: 0;\n  transition:\n    translate 180ms var(--dsh-ease-out),\n    width 180ms var(--dsh-ease-out),\n    opacity 120ms ease-out;\n}\n\n[data-indicator-ready=\"true\"] > .dsh-tab-indicator {\n  opacity: 1;\n}\n\n.dsh-tablist-pill > .dsh-tab-indicator {\n  inset-block: 3px;\n  height: auto;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary);\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: var(--dsw-alias-interactive-bg-active);\n  z-index: 0;\n}\n\n.dsh-tablist-pill > [role=\"tab\"] {\n  z-index: 1;\n}\n\n[data-dsh-style=\"eink\"] .dsh-tab-indicator {\n  transition-duration: 60ms;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-tab-indicator {\n  border-radius: 0px !important;\n  transition-timing-function: steps(4, end);\n}\n\n/* 140ms `@starting-style` + keyframe fade-in for active tab panels */\n@keyframes dsh-tab-panel-enter {\n  from {\n    opacity: 0;\n    translate: 0px 4px;\n  }\n  to {\n    opacity: 1;\n    translate: 0px 0px;\n  }\n}\n\n:where([data-dsh-style]) :where(.dsh-tab-panel, [data-dsh-tab-panel]):not([hidden]) {\n  opacity: 1;\n  translate: 0px 0px;\n  transition:\n    opacity 140ms var(--dsh-ease-out),\n    translate 140ms var(--dsh-ease-out);\n  animation: dsh-tab-panel-enter 140ms var(--dsh-ease-out);\n}\n\n@starting-style {\n  :where([data-dsh-style]) :where(.dsh-tab-panel, [data-dsh-tab-panel]):not([hidden]) {\n    opacity: 0;\n    translate: 0px 4px;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 15. v3 Resizable Split Pane (`.dsh-split-pane` + `.dsh-split-resizer`)\n *     - Pointer-capture drag + double-click reset + ArrowLeft/ArrowRight\n *     - Auto-stack fallback below 760px container/viewport width\n * -------------------------------------------------------------------------- */\n.dsh-split-pane {\n  display: flex;\n  flex: 1 1 auto;\n  min-width: 0;\n  min-height: 0;\n  width: 100%;\n}\n\n.dsh-split-leading {\n  flex: none;\n  min-width: 0;\n  min-height: 0;\n  width: var(--dsh-split-size, 320px);\n}\n\n.dsh-split-trailing {\n  flex: 1 1 auto;\n  min-width: 0;\n  min-height: 0;\n}\n\n.dsh-split-resizer {\n  position: relative;\n  flex: none;\n  width: 9px;\n  min-height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: col-resize;\n  touch-action: none;\n  user-select: none;\n  background: transparent;\n  outline: none;\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"] {\n  width: 100%;\n  height: 9px;\n  min-height: 9px;\n  cursor: row-resize;\n}\n\n.dsh-split-resizer::before {\n  content: \"\";\n  width: 1px;\n  height: 100%;\n  background: var(--dsw-alias-border-l2);\n  transition:\n    width 120ms var(--dsh-ease-out),\n    background-color 120ms var(--dsh-ease-out);\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"]::before {\n  width: 100%;\n  height: 1px;\n}\n\n.dsh-split-resizer::after {\n  content: \"\";\n  position: absolute;\n  width: 3px;\n  height: 28px;\n  border-radius: 999px;\n  background: var(--dsw-alias-border-l3);\n  opacity: 0;\n  transition:\n    opacity 120ms var(--dsh-ease-out),\n    background-color 120ms var(--dsh-ease-out);\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"]::after {\n  width: 28px;\n  height: 3px;\n}\n\n.dsh-split-resizer:hover::before,\n.dsh-split-resizer:focus-visible::before,\n.dsh-split-resizer[data-dragging=\"true\"]::before {\n  width: 2px;\n  background: var(--dsw-alias-state-business-primary);\n}\n\n.dsh-split-resizer[aria-orientation=\"horizontal\"]:is(:hover, :focus-visible, [data-dragging=\"true\"])::before {\n  width: 100%;\n  height: 2px;\n}\n\n.dsh-split-resizer:is(:hover, :focus-visible, [data-dragging=\"true\"])::after {\n  opacity: 1;\n  background: var(--dsw-alias-state-business-primary);\n}\n\n.dsh-split-resizer:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-business-primary);\n  outline-offset: -2px;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-split-resizer::before {\n  width: 2px;\n  background: #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-split-resizer::after {\n  border-radius: 0px;\n}\n\n@container (max-width: 759px) {\n  .dsh-split-pane {\n    flex-direction: column;\n    overflow-y: auto;\n  }\n\n  .dsh-split-leading {\n    width: 100% !important;\n    max-width: 100%;\n    flex: none;\n  }\n\n  .dsh-split-resizer {\n    display: none;\n  }\n}\n\n@media (max-width: 759px) {\n  .dsh-split-pane {\n    flex-direction: column;\n    overflow-y: auto;\n  }\n\n  .dsh-split-leading {\n    width: 100% !important;\n    max-width: 100%;\n    flex: none;\n  }\n\n  .dsh-split-resizer {\n    display: none;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 16. v3 Theme-Tinted Shimmer Skeleton & Pixel Progress Helpers\n * -------------------------------------------------------------------------- */\n@keyframes dsh-skeleton-shimmer {\n  0% { background-position: 100% 0; }\n  100% { background-position: -100% 0; }\n}\n\n.dsh-skeleton-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: 100%;\n}\n\n.dsh-skeleton {\n  display: block;\n  width: 100%;\n  height: 12px;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background-color: var(--dsw-alias-bg-layer-2, #e5e7eb);\n  background-image: linear-gradient(\n    90deg,\n    var(--dsw-alias-bg-layer-2, #e5e7eb) 0%,\n    color-mix(in oklab, var(--dsw-alias-bg-overlay, #ffffff) 82%, var(--dsw-alias-state-business-primary, #4176e6) 18%) 48%,\n    var(--dsw-alias-bg-layer-2, #e5e7eb) 100%\n  );\n  background-size: 220% 100%;\n  background-position: 100% 0;\n}\n\n.dsh-skeleton-circle {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  flex: none;\n}\n\n.dsh-skeleton-card {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 12px 14px;\n  border-radius: var(--dsw-radius-md, 12px);\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l1);\n  background: var(--dsw-alias-bg-layer-1);\n}\n\n.dsh-skeleton-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 10px;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]:not([data-dsh-style=\"eink\"])) .dsh-skeleton[data-animated=\"true\"] {\n    animation: dsh-skeleton-shimmer 1.35s var(--dsh-ease-in-out) infinite;\n  }\n\n  [data-dsh-style=\"pixel8bit\"] .dsh-skeleton[data-animated=\"true\"] {\n    border-radius: 0px !important;\n    border: 1px solid #1e2826;\n    animation-timing-function: steps(4, end);\n  }\n}\n\n[data-dsh-style=\"eink\"] .dsh-skeleton {\n  background-image: none;\n  border: 1px solid #c5c2b8;\n}\n\n/* Stepped pixel progress helper */\n.dsh-progress {\n  position: relative;\n  width: 100%;\n  height: 6px;\n  overflow: clip;\n  border-radius: 999px;\n  background: var(--dsw-alias-bg-layer-2);\n}\n\n.dsh-progress-bar {\n  height: 100%;\n  width: var(--dsh-progress-value, 0%);\n  border-radius: inherit;\n  background: var(--dsw-alias-state-business-primary);\n  transition: width 200ms var(--dsh-ease-out);\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-progress {\n  height: 10px;\n  border-radius: 0px !important;\n  border: 2px solid #1e2826;\n  background: var(--dsw-alias-bg-layer-1);\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-progress-bar {\n  border-radius: 0px !important;\n  background: repeating-linear-gradient(\n    90deg,\n    #2e7d5b 0px,\n    #2e7d5b 6px,\n    #24674a 6px,\n    #24674a 8px\n  );\n  transition-timing-function: steps(8, end);\n}\n\n/* --------------------------------------------------------------------------\n * 17. v3 Interactive Cards, Rows, Quick-Action Bar & Top-Layer Dialog Entrance\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where([data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row) {\n  translate: 0px 0px;\n  transition:\n    background-color var(--dsh-motion-fast) var(--dsh-ease-out),\n    border-color var(--dsh-motion-fast) var(--dsh-ease-out),\n    box-shadow var(--dsh-motion-base) var(--dsh-ease-out),\n    translate var(--dsh-motion-base) var(--dsh-ease-out);\n}\n\n/* Row Hover Quick-Action Bar (`.dsh-row-actions`) */\n.dsh-row-actions {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  flex: none;\n  translate: 0px 0px;\n  transition:\n    opacity var(--dsh-motion-fast) var(--dsh-ease-out),\n    translate var(--dsh-motion-fast) var(--dsh-ease-out);\n}\n\n@media (hover: hover) {\n  :where([data-dsh-row], .dsh-row) .dsh-row-actions:not([data-always-visible=\"true\"]) {\n    opacity: 0;\n    translate: 4px 0px;\n    pointer-events: none;\n  }\n\n  :where([data-dsh-row], .dsh-row):is(:hover, :focus-within, [data-active=\"true\"], [data-selected=\"true\"], [aria-selected=\"true\"]) .dsh-row-actions {\n    opacity: 1;\n    translate: 0px 0px;\n    pointer-events: auto;\n  }\n}\n\n@media (hover: hover) and (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"]):not([data-dsh-style=\"eink\"]):not([data-dsh-style=\"risograph\"])) :where([data-dsh-card], .dsh-card):hover {\n    translate: 0px -1.5px;\n    box-shadow: var(--dsh-card-hover-shadow);\n  }\n\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-card], .dsh-card):hover {\n    translate: -1px -1px;\n    box-shadow: 4px 4px 0px #1e2826;\n  }\n\n  [data-dsh-style=\"risograph\"] :where([data-dsh-card], .dsh-card):hover {\n    translate: -1px -1px;\n    box-shadow: 5px 5px 0px #ff3e7f;\n  }\n\n  :where([data-dsh-style]) :where([data-dsh-row], .dsh-row):hover:not([data-selected=\"true\"]):not([aria-selected=\"true\"]):not([data-active=\"true\"]) {\n    background-color: var(--dsh-surface-spotlight, var(--dsw-alias-interactive-bg-hover));\n  }\n}\n\n/* Modal / Dialog & Popover Top-Layer Entrance + Scroll Containment */\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n  overscroll-behavior: contain;\n  opacity: 1;\n  transition-property: opacity, scale, translate, display, overlay;\n  transition-duration: var(--dsh-motion-dialog);\n  transition-timing-function: var(--dsh-ease-out);\n  /* Separate declaration after transition so older parsers never drop transitions */\n  transition-behavior: allow-discrete;\n}\n\n@starting-style {\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    opacity: 0;\n  }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    scale: 1;\n    translate: 0px 0px;\n  }\n\n  @starting-style {\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n      scale: 0.965;\n      translate: 0px 6px;\n    }\n  }\n}\n\ndialog[open]::backdrop {\n  overflow: hidden;\n  overscroll-behavior: contain;\n}\n\n/* --------------------------------------------------------------------------\n * 18. v3 Calm Compact Update Strip (`[data-plugin-update-footer]`)\n *     Keeps `@stardustlc/dsh-updates` footer compact at bottom without\n *     crushing or cutting off `flex: 1` split-pane columns.\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) [data-plugin-update-footer] {\n  flex: none;\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 32px;\n  margin: 0;\n  padding: 6px 14px;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 6px 12px;\n  font-size: 12px;\n  line-height: 1.4;\n  color: var(--dsw-alias-label-secondary);\n  background: var(--dsw-alias-bg-layer-1);\n  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n}\n\n:where([data-dsh-style]) [data-plugin-update-footer] :where(button, a) {\n  min-height: 24px;\n  font-size: 11.5px;\n}\n\n:where([data-dsh-style]) [data-show-updates=\"false\"] [data-plugin-update-footer] {\n  display: none;\n}\n\n/* --------------------------------------------------------------------------\n * 19. Unified Header Style & Font Switcher Chrome (`.dsh-style-switcher`)\n * -------------------------------------------------------------------------- */\n.dsh-style-switcher {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n  flex: none;\n  white-space: nowrap;\n}\n\n.dsh-style-trigger.dsh-style-trigger,\n.dsh-font-trigger.dsh-font-trigger {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 28px;\n  height: 28px;\n  padding-inline: 8px;\n  width: auto;\n  flex-shrink: 0;\n  font-size: 12px;\n  line-height: 18px;\n  font-weight: 500;\n  color: var(--dsw-alias-label-secondary);\n  background: var(--dsw-alias-bg-layer-1);\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-sm, 8px);\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.dsh-font-trigger.dsh-font-trigger {\n  gap: 5px;\n  padding-inline: 7px;\n}\n\n.dsh-font-glyph {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  min-width: 16px;\n  height: 16px;\n  padding-inline: 3px;\n  border-radius: var(--dsw-radius-xs, 4px);\n  background: var(--dsw-alias-state-business-tertiary, rgba(65, 118, 230, 0.12));\n  color: var(--dsw-alias-state-business-primary, var(--dsw-alias-label-primary));\n  font-family: var(--dsh-font-display);\n  font-size: 10.5px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.dsh-style-label,\n.dsh-font-label {\n  white-space: nowrap;\n  line-height: 1;\n}\n\n@media (hover: hover) {\n  .dsh-style-trigger.dsh-style-trigger:hover:not(:disabled),\n  .dsh-font-trigger.dsh-font-trigger:hover:not(:disabled) {\n    color: var(--dsw-alias-label-primary);\n    background: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n.dsh-style-swatch {\n  display: inline-block;\n  flex: none;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  corner-shape: round;\n  background: var(--dsh-swatch-color, var(--dsw-alias-state-business-primary));\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.16);\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-style-swatch {\n  border-radius: 0px !important;\n  corner-shape: square;\n  box-shadow: 1px 1px 0px #1e2826;\n}\n\n.dsh-style-fallback-wrap {\n  position: relative;\n  display: inline-flex;\n}\n\n.dsh-style-fallback-menu {\n  position: absolute;\n  inset-block-start: calc(100% + 4px);\n  inset-inline-end: 0;\n  z-index: 2147483001;\n  display: grid;\n  gap: 2px;\n  min-width: 186px;\n  max-height: min(420px, 70dvh);\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  padding: 4px;\n  background: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-base));\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-md, 12px);\n  box-shadow: var(--dsw-elevation-prominent);\n}\n\n.dsh-style-fallback-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n  min-height: 28px;\n  padding: 4px 8px;\n  border: 0;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: transparent;\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  font-size: 12px;\n  text-align: start;\n  cursor: pointer;\n}\n\n.dsh-style-fallback-item-leading {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 0;\n}\n\n.dsh-style-fallback-item[aria-checked=\"true\"] {\n  background: var(--dsw-alias-interactive-bg-active);\n  font-weight: 600;\n}\n\n@media (hover: hover) {\n  .dsh-style-fallback-item:hover:not(:disabled) {\n    background: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n/* Fallback Modal & Menu Chrome (when host `@deepseek-ai/dsh-client-ui-primitives` is absent) */\n.dsh-fallback-modal-root {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n  display: grid;\n  place-items: center;\n  padding: 16px;\n}\n\n.dsh-fallback-modal-mask {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.36);\n}\n\n.dsh-fallback-modal-dialog {\n  position: relative;\n  z-index: 1;\n  max-width: min(560px, calc(100dvw - 32px));\n  max-height: calc(100dvh - 32px);\n  overflow: clip;\n  display: flex;\n  flex-direction: column;\n  border-radius: var(--dsw-radius-md, 12px);\n  background: var(--dsw-alias-bg-layer-1, #f8fafc);\n  color: var(--dsw-alias-label-primary, #1f232b);\n  box-shadow: var(--dsw-elevation-prominent);\n}\n\n/* --------------------------------------------------------------------------\n * 20. Accessibility: Reduced Motion & Windows High Contrast (Forced Colors)\n * -------------------------------------------------------------------------- */\n@media (prefers-reduced-motion: reduce) {\n  :where([data-dsh-style]) :where(button, [role=\"button\"], [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row, .dsh-row-actions, .dsh-tab-panel, [data-dsh-tab-panel]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"]) {\n    translate: none !important;\n    scale: none !important;\n    animation: none !important;\n    transition-property: background-color, border-color, color, opacity;\n    transition-duration: 90ms;\n  }\n\n  :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], summary) svg,\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-row], .dsh-row)::before,\n  [data-dsh-style=\"pixel8bit\"] .dsh-pixel-cursor {\n    animation: none !important;\n    transition: none !important;\n    translate: none !important;\n    scale: none !important;\n  }\n\n  .dsh-tab-indicator {\n    transition-property: opacity;\n    transition-duration: 90ms;\n  }\n\n  .dsh-skeleton {\n    animation: none !important;\n    background-image: none;\n  }\n\n  /* Short, non-spatial fade only for top-layer dialogs under reduced motion */\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    scale: none !important;\n    translate: none !important;\n    transition-duration: 100ms;\n  }\n}\n\n@media (forced-colors: active) {\n  :where([data-dsh-style]) :where(button, input, select, textarea, [data-dsh-card], .dsh-card),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], :has([data-dsh-style])) {\n    border: 1px solid ButtonText;\n  }\n\n  :where([data-dsh-style]) [role=\"tab\"][aria-selected=\"true\"]::after {\n    opacity: 1 !important;\n    border-block-end: 3px solid Highlight;\n  }\n\n  .dsh-tab-indicator {\n    background: transparent !important;\n    border-block-end: 3px solid Highlight;\n  }\n\n  .dsh-split-resizer::before,\n  .dsh-split-resizer::after {\n    background: ButtonText;\n  }\n\n  .dsh-skeleton {\n    border: 1px solid GrayText;\n    background: Canvas;\n  }\n}\n";
/**
 * DeepSeek Harness (>=0.2.2-rc.3) Unified Style Switcher, Layout & Motion Primitives v3
 * Shared across STARDUSTLC666 workbench plugins:
 *   dsh-email, dsh-calendar, dsh-cite, dsh-dream, dsh-code-security,
 *   dsh-rss, dsh-ppt, dsh-remotion, dsh-hyperframes
 *
 * Zero external runtime imports: accepts `React` and optional `require` so this
 * module can be bundled via esbuild IIFE or inlined into classic DSH client
 * scripts without requiring `react` in plugin `node_modules` or triggering
 * eager UI `require()` calls during `window.__ModuleLoader__.load`.
 */

const DSH_STYLE_STORAGE_KEY = 'dsh-stardust:ui-style';
const DSH_STYLE_EVENT = 'dsh-stardust-style';
const DSH_DEFAULT_STYLE = 'harness';

const DSH_FONT_STORAGE_KEY = 'dsh-stardust:ui-font';
const DSH_FONT_EVENT = 'dsh-stardust-font';
const DSH_DEFAULT_FONT = 'auto';

const DSH_FONTS = Object.freeze([
  Object.freeze({
    id: 'arcade',
    zh: '幼圆等宽',
    zhShort: '幼圆',
    en: 'YouYuan Mono',
    enShort: 'YouYuan',
  }),
  Object.freeze({
    id: 'auto',
    zh: '跟随风格专属字（默认）',
    zhShort: '专属字',
    en: 'Match Style Font (Default)',
    enShort: 'Style Font',
  }),
  Object.freeze({
    id: 'songkai',
    zh: '中宋+楷书',
    zhShort: '中宋楷',
    en: 'Song + Kai',
    enShort: 'Song+Kai',
  }),
  Object.freeze({
    id: 'fangsong',
    zh: '工程仿宋',
    zhShort: '仿宋',
    en: 'Blueprint FangSong',
    enShort: 'FangSong',
  }),
  Object.freeze({
    id: 'poster',
    zh: '重磅画报黑',
    zhShort: '画报黑',
    en: 'Poster Sans',
    enShort: 'Poster',
  }),
  Object.freeze({
    id: 'retro98',
    zh: '千禧新宋',
    zhShort: '新宋98',
    en: 'Retro 98 SimSun',
    enShort: 'Retro 98',
  }),
  Object.freeze({
    id: 'serif',
    zh: '思源书宋',
    zhShort: '书宋',
    en: 'Book Serif',
    enShort: 'Serif',
  }),
  Object.freeze({
    id: 'modern',
    zh: '现代思源黑',
    zhShort: '思源黑',
    en: 'Modern Sans',
    enShort: 'Modern',
  }),
]);

const DSH_STYLES = Object.freeze([
  Object.freeze({
    id: 'harness',
    zh: '原生清透',
    zhShort: '原生',
    en: 'Native Airy',
    enShort: 'Native',
    swatch: '#4176e6',
    surface: '#f8fafc',
  }),
  Object.freeze({
    id: 'cream',
    zh: '米白纸感',
    zhShort: '米白色',
    en: 'Warm Cream',
    enShort: 'Cream',
    swatch: '#9e5829',
    surface: '#faf7f0',
  }),
  Object.freeze({
    id: 'claude',
    zh: 'Claude 暖书卷',
    zhShort: 'Claude风',
    en: 'Claude Warmth',
    enShort: 'Claude',
    swatch: '#c96442',
    surface: '#f5f4ed',
  }),
  Object.freeze({
    id: 'pixel8bit',
    zh: '8-Bit 掌机',
    zhShort: '8-Bit',
    en: 'Bright 8-Bit',
    enShort: '8-Bit',
    swatch: '#2e7d5b',
    surface: '#f4f6e8',
  }),
  Object.freeze({
    id: 'mint',
    zh: '晴空薄荷',
    zhShort: '薄荷',
    en: 'Airy Mint',
    enShort: 'Mint',
    swatch: '#0f8f6a',
    surface: '#f6fbf9',
  }),
  Object.freeze({
    id: 'glass',
    zh: '晴昼琉璃',
    zhShort: '琉璃',
    en: 'Daylight Glass',
    enShort: 'Glass',
    swatch: '#5b5bd6',
    surface: '#eef1fb',
  }),
  Object.freeze({
    id: 'eink',
    zh: '护眼墨水屏',
    zhShort: '墨水屏',
    en: 'E-Ink Paper',
    enShort: 'E-Ink',
    swatch: '#171716',
    surface: '#f2f1ec',
  }),
  Object.freeze({
    id: 'blueprint',
    zh: '工程晒图',
    zhShort: '晒图',
    en: 'Blueprint',
    enShort: 'Blueprint',
    swatch: '#0d3b66',
    surface: '#eaf3fb',
  }),
  Object.freeze({
    id: 'risograph',
    zh: '波普孔版',
    zhShort: '孔版',
    en: 'Riso Zine',
    enShort: 'Riso',
    swatch: '#ff3e7f',
    surface: '#faf6ee',
  }),
  Object.freeze({
    id: 'win98',
    zh: '云母流光',
    zhShort: '云母',
    en: 'Mica Fluent',
    enShort: 'Mica',
    swatch: '#005fb8',
    surface: '#eff1f5',
  }),
  Object.freeze({
    id: 'songhui',
    zh: '宋韵朱砂',
    zhShort: '宋韵',
    en: 'Song Xuan',
    enShort: 'Song',
    swatch: '#b83b2a',
    surface: '#f7f3e8',
  }),
  Object.freeze({
    id: 'frutiger',
    zh: '晴空水晶',
    zhShort: '水晶',
    en: 'Aqua Crystal',
    enShort: 'Aqua',
    swatch: '#0ea5e9',
    surface: '#e4f4ff',
  }),
  Object.freeze({
    id: 'gazette',
    zh: '铅字晨报',
    zhShort: '晨报',
    en: 'Gazette',
    enShort: 'Gazette',
    swatch: '#9b1c1c',
    surface: '#f6f3ec',
  }),
]);

const VALID_STYLE_IDS = new Set(DSH_STYLES.map(preset => preset.id));
const VALID_FONT_IDS = new Set(DSH_FONTS.map(preset => preset.id));

function resolveWindow(win) {
  if (win && typeof win === 'object') return win;
  return typeof window !== 'undefined' ? window : null;
}

function resolveReact(explicitReact) {
  if (explicitReact && typeof explicitReact.createElement === 'function') return explicitReact;
  if (typeof globalThis !== 'undefined' && globalThis.React && typeof globalThis.React.createElement === 'function') {
    return globalThis.React;
  }
  return null;
}

function clampNumber(value, min, max) {
  const lo = Number.isFinite(min) ? min : 0;
  const hi = Number.isFinite(max) ? Math.max(lo, max) : lo;
  const num = Number(value);
  if (!Number.isFinite(num)) return lo;
  return Math.min(hi, Math.max(lo, num));
}

function normalizeDshStyle(value) {
  const key = typeof value === 'string' ? value.trim() : '';
  return VALID_STYLE_IDS.has(key) ? key : DSH_DEFAULT_STYLE;
}

function getDshStylePreset(value) {
  const id = normalizeDshStyle(value);
  return DSH_STYLES.find(preset => preset.id === id) || DSH_STYLES[0];
}

function readDshStyle(win) {
  const target = resolveWindow(win);
  if (!target) return DSH_DEFAULT_STYLE;
  try {
    const raw = target.localStorage?.getItem(DSH_STYLE_STORAGE_KEY);
    return normalizeDshStyle(raw);
  } catch {
    return DSH_DEFAULT_STYLE;
  }
}

function normalizeDshFont(value) {
  const key = typeof value === 'string' ? value.trim() : '';
  return VALID_FONT_IDS.has(key) ? key : DSH_DEFAULT_FONT;
}

function getDshFontPreset(value) {
  const id = normalizeDshFont(value);
  return DSH_FONTS.find(preset => preset.id === id) || DSH_FONTS[0];
}

function readDshFont(win) {
  const target = resolveWindow(win);
  if (!target) return DSH_DEFAULT_FONT;
  try {
    const raw = target.localStorage?.getItem(DSH_FONT_STORAGE_KEY);
    return normalizeDshFont(raw);
  } catch {
    return DSH_DEFAULT_FONT;
  }
}

/**
 * Stamps `[data-dsh-style]`, `[data-dsh-font]`, and `[data-window-drag-exclude]` onto
 * any currently open portaled `[role="dialog"]` / `[role="menu"]` surfaces in
 * `document.body` that were synced via `createOverlaySyncRef` or carry
 * `[data-dsh-portal-synced]`, plus `[data-dsh-font]` onto `document.documentElement`.
 */
function syncPortaledOverlays(style, doc, font) {
  const normalized = normalizeDshStyle(style);
  const normalizedFont = normalizeDshFont(font ?? readDshFont());
  const targetDoc = doc || (typeof document !== 'undefined' ? document : null);
  if (!targetDoc) return;
  if (targetDoc.documentElement && typeof targetDoc.documentElement.setAttribute === 'function') {
    targetDoc.documentElement.setAttribute('data-dsh-font', normalizedFont);
  }
  if (typeof targetDoc.querySelectorAll !== 'function') return;
  for (const el of targetDoc.querySelectorAll('[data-dsh-portal-synced]')) {
    el.setAttribute('data-dsh-style', normalized);
    el.setAttribute('data-dsh-font', normalizedFont);
    if (!el.hasAttribute('data-window-drag-exclude')) {
      el.setAttribute('data-window-drag-exclude', '');
    }
  }
}

function syncPortaledFont(font, doc) {
  const normalizedFont = normalizeDshFont(font);
  const targetDoc = doc || (typeof document !== 'undefined' ? document : null);
  if (!targetDoc) return;
  if (targetDoc.documentElement && typeof targetDoc.documentElement.setAttribute === 'function') {
    targetDoc.documentElement.setAttribute('data-dsh-font', normalizedFont);
  }
  if (typeof targetDoc.querySelectorAll !== 'function') return;
  for (const el of targetDoc.querySelectorAll('[data-dsh-portal-synced], [data-dsh-style]')) {
    el.setAttribute('data-dsh-font', normalizedFont);
  }
}

function writeDshStyle(nextStyle, win) {
  const normalized = normalizeDshStyle(nextStyle);
  const target = resolveWindow(win);
  if (target) {
    try {
      target.localStorage?.setItem(DSH_STYLE_STORAGE_KEY, normalized);
    } catch {
      // Restricted storage: keep in-memory + custom event sync working.
    }
    syncPortaledOverlays(normalized, target.document, readDshFont(target));
    if (typeof target.dispatchEvent === 'function') {
      try {
        const CustomEventCtor = target.CustomEvent || (typeof CustomEvent === 'function' ? CustomEvent : null);
        if (CustomEventCtor) {
          target.dispatchEvent(new CustomEventCtor(DSH_STYLE_EVENT, { detail: { style: normalized } }));
        } else if (typeof Event === 'function') {
          const ev = new Event(DSH_STYLE_EVENT);
          ev.detail = { style: normalized };
          target.dispatchEvent(ev);
        }
      } catch {
        // Ignore synthetic event errors in minimal VM environments.
      }
    }
  }
  return normalized;
}

function writeDshFont(nextFont, win) {
  const normalized = normalizeDshFont(nextFont);
  const target = resolveWindow(win);
  if (target) {
    try {
      target.localStorage?.setItem(DSH_FONT_STORAGE_KEY, normalized);
    } catch {
      // Restricted storage: keep in-memory + custom event sync working.
    }
    syncPortaledFont(normalized, target.document);
    if (typeof target.dispatchEvent === 'function') {
      try {
        const CustomEventCtor = target.CustomEvent || (typeof CustomEvent === 'function' ? CustomEvent : null);
        if (CustomEventCtor) {
          target.dispatchEvent(new CustomEventCtor(DSH_FONT_EVENT, { detail: { font: normalized } }));
        } else if (typeof Event === 'function') {
          const ev = new Event(DSH_FONT_EVENT);
          ev.detail = { font: normalized };
          target.dispatchEvent(ev);
        }
      } catch {
        // Ignore synthetic event errors in minimal VM environments.
      }
    }
  }
  return normalized;
}

function subscribeDshStyle(onChange, win) {
  const target = resolveWindow(win);
  if (!target || typeof target.addEventListener !== 'function' || typeof onChange !== 'function') {
    return () => {};
  }
  const onCustom = event => {
    const next = normalizeDshStyle(event?.detail?.style ?? readDshStyle(target));
    syncPortaledOverlays(next, target.document, readDshFont(target));
    onChange(next);
  };
  const onStorage = event => {
    if (event && event.key !== null && event.key !== undefined && event.key !== DSH_STYLE_STORAGE_KEY) {
      return;
    }
    const next = normalizeDshStyle(event?.newValue ?? readDshStyle(target));
    syncPortaledOverlays(next, target.document, readDshFont(target));
    onChange(next);
  };
  target.addEventListener(DSH_STYLE_EVENT, onCustom);
  target.addEventListener('storage', onStorage);
  return () => {
    target.removeEventListener(DSH_STYLE_EVENT, onCustom);
    target.removeEventListener('storage', onStorage);
  };
}

function subscribeDshFont(onChange, win) {
  const target = resolveWindow(win);
  if (!target || typeof target.addEventListener !== 'function' || typeof onChange !== 'function') {
    return () => {};
  }
  const onCustom = event => {
    const next = normalizeDshFont(event?.detail?.font ?? readDshFont(target));
    syncPortaledFont(next, target.document);
    onChange(next);
  };
  const onStorage = event => {
    if (event && event.key !== null && event.key !== undefined && event.key !== DSH_FONT_STORAGE_KEY) {
      return;
    }
    const next = normalizeDshFont(event?.newValue ?? readDshFont(target));
    syncPortaledFont(next, target.document);
    onChange(next);
  };
  target.addEventListener(DSH_FONT_EVENT, onCustom);
  target.addEventListener('storage', onStorage);
  return () => {
    target.removeEventListener(DSH_FONT_EVENT, onCustom);
    target.removeEventListener('storage', onStorage);
  };
}

/**
 * React hook returning `[style, setStyle]`, synced across plugins, tabs, and
 * portaled dialogs via `localStorage['dsh-stardust:ui-style']` + `dsh-stardust-style`.
 * Safe in minimal VM registration tests where `React.useState` may be absent.
 */
function useDshStyle(React, win) {
  if (!React || typeof React.useState !== 'function') {
    return [readDshStyle(win), next => writeDshStyle(next, win)];
  }
  const [style, setStyleState] = React.useState(() => readDshStyle(win));
  if (typeof React.useEffect === 'function') {
    React.useEffect(() => {
      const current = readDshStyle(win);
      setStyleState(prev => (prev === current ? prev : current));
      syncPortaledOverlays(current, resolveWindow(win)?.document, readDshFont(win));
      return subscribeDshStyle(next => {
        setStyleState(prev => (prev === next ? prev : next));
      }, win);
    }, [win]);
  }
  const setStyle = next => {
    const resolved = typeof next === 'function' ? next(style) : next;
    const applied = writeDshStyle(resolved, win);
    setStyleState(applied);
    return applied;
  };
  return [style, setStyle];
}

/**
 * React hook returning `[font, setFont]`, synced via `localStorage['dsh-stardust:ui-font']`
 * + `dsh-stardust-font` and applied via `[data-dsh-font]`.
 */
function useDshFont(React, win) {
  if (!React || typeof React.useState !== 'function') {
    return [readDshFont(win), next => writeDshFont(next, win)];
  }
  const [font, setFontState] = React.useState(() => readDshFont(win));
  if (typeof React.useEffect === 'function') {
    React.useEffect(() => {
      const current = readDshFont(win);
      setFontState(prev => (prev === current ? prev : current));
      syncPortaledFont(current, resolveWindow(win)?.document);
      return subscribeDshFont(next => {
        setFontState(prev => (prev === next ? prev : next));
      }, win);
    }, [win]);
  }
  const setFont = next => {
    const resolved = typeof next === 'function' ? next(font) : next;
    const applied = writeDshFont(resolved, win);
    setFontState(applied);
    return applied;
  };
  return [font, setFont];
}

/**
 * Callback ref for elements rendered inside host `@deepseek-ai/dsh-client-ui-primitives`
 * `Modal` or `Menu` portals (`createPortal(..., document.body)`).
 * Host `Modal` and `Menu` do not spread arbitrary `data-*` props onto their outer
 * `<div role="dialog">` / `<div role="menu">` wrapper, so attaching this ref to an
 * inner header/body wrapper promotes `data-dsh-style`, `data-dsh-font`, and
 * `data-window-drag-exclude` onto the portaled overlay frame itself.
 */
function createOverlaySyncRef(style, font) {
  const normalized = normalizeDshStyle(style);
  const normalizedFont = normalizeDshFont(font ?? readDshFont());
  return node => {
    if (!node || typeof node.setAttribute !== 'function') return;
    node.setAttribute('data-dsh-style', normalized);
    node.setAttribute('data-dsh-font', normalizedFont);
    node.setAttribute('data-window-drag-exclude', '');
    node.setAttribute('data-dsh-portal-synced', 'true');
    if (typeof node.closest === 'function') {
      const overlay = node.closest('[role="dialog"], [role="alertdialog"], [role="menu"], dialog');
      if (overlay) {
        overlay.setAttribute('data-dsh-style', normalized);
        overlay.setAttribute('data-dsh-font', normalizedFont);
        overlay.setAttribute('data-window-drag-exclude', '');
        overlay.setAttribute('data-dsh-portal-synced', 'true');
      }
    }
  };
}

/**
 * Shared crisp 24x24 stroke icons for workbench headers, buttons, and micro-animations.
 */
const DSH_ICON_PATHS = Object.freeze({
  mail: ['M3 5h18v14H3z', 'm3 6 9 7 9-7'],
  inbox: ['M4 13 6 5h12l2 8v6H4z', 'M4 13h5l1 3h4l1-3h5'],
  send: ['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13'],
  search: ['M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z', 'm16 16 5 5'],
  plus: ['M12 5v14M5 12h14'],
  refresh: ['M20 7a9 9 0 1 0 1 8', 'M20 2v5h-5'],
  close: ['m6 6 12 12M18 6 6 18'],
  left: ['m14 5-7 7 7 7'],
  right: ['m10 5 7 7-7 7'],
  down: ['m5 9 7 7 7-7'],
  download: ['M12 3v12m-5-5 5 5 5-5', 'M4 16v5h16v-5'],
  file: ['M4 3h10l6 6v12H4z', 'M14 3v6h6M8 13h8M8 17h6'],
  folder: ['M3 5h7l2 3h9v12H3z'],
  edit: ['m15 4 5 5-10 10-6 1 1-6Z', 'm13 6 5 5'],
  trash: ['M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7'],
  info: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 11v6M12 7h.01'],
  check: ['m5 12 4 4L19 6'],
  star: ['m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z'],
  reply: ['m9 5-7 7 7 7v-5h6c3 0 5 2 6 5 0-8-4-11-12-11Z'],
  lock: ['M5 10h14v11H5z', 'M8 10V7a4 4 0 0 1 8 0v3M12 14v3'],
  clip: ['m8 13 6-6a2.5 2.5 0 0 1 3.5 3.5l-7 7a4 4 0 0 1-5.7-5.7l8-8a5 5 0 0 1 7.1 7.1l-8 8'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M12 6v6l4 2'],
  image: ['M3 4h18v16H3z', 'm3 17 6-6 5 5 2-2 5 5M16 8h.01'],
  copy: ['M9 9h10v11H9z', 'M5 15H4V4h10v1'],
  external: ['M14 4h6v6', 'M10 14 20 4', 'M18 13v6H5V6h6'],
  link: ['M10 13a5 5 0 0 0 7.1 0l2.8-2.8a5 5 0 0 0-7.1-7.1L11 4.9', 'M14 11a5 5 0 0 0-7.1 0l-2.8 2.8a5 5 0 0 0 7.1 7.1L13 19.1'],
  play: ['m7 5 12 7-12 7Z'],
  palette: ['M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a2 2 0 0 1 0-4h4a5 5 0 0 0 5-5c0-2.2-4-4-9-4Z', 'M7.5 10.5h.01M10.5 7.5h.01M14.5 7.5h.01'],
  sparkles: ['m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8Z', 'M19 15v4M17 17h4'],
  calendar: ['M4 6h16v14H4z', 'M8 3v4M16 3v4M4 10h16'],
  shield: ['M12 3 5 6v6c0 5 3.4 8.3 7 9 3.6-.7 7-4 7-9V6Z'],
  rss: ['M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z', 'M4 11a9 9 0 0 1 9 9', 'M4 5a15 15 0 0 1 15 15'],
  grip: ['M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01'],
});

function renderDshIcon(React, { name = 'file', size = 16, paths = DSH_ICON_PATHS, ...props } = {}) {
  const h = React.createElement;
  const segments = paths[name] || DSH_ICON_PATHS[name] || DSH_ICON_PATHS.file;
  return h(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.65,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
      focusable: 'false',
      'data-dsh-icon': name,
      ...props,
    },
    segments.map((d, index) => h('path', { key: index, d })),
  );
}

/**
 * Measures the active `[role="tab"][aria-selected="true"]` inside a `[role="tablist"]`
 * and drives CSS variables `--dsh-tab-x` / `--dsh-tab-w` for `.dsh-tab-indicator`.
 * Falls back cleanly to static `::after` border underline when layout is unavailable (jsdom)
 * or under `@media (forced-colors: active)`.
 */
function useSlidingTabIndicator(React, activeValue, options = {}) {
  const tablistRef = typeof React?.useRef === 'function' ? React.useRef(null) : { current: null };
  const [metrics, setMetrics] = typeof React?.useState === 'function'
    ? React.useState({ x: 0, width: 0, ready: false })
    : [{ x: 0, width: 0, ready: false }, () => {}];

  const syncIndicator = () => {
    const list = tablistRef.current;
    if (!list || typeof list.querySelector !== 'function') return;
    const activeTab = list.querySelector('[role="tab"][aria-selected="true"]');
    if (!activeTab) {
      list.setAttribute?.('data-indicator-ready', 'false');
      setMetrics(prev => (prev.ready ? { x: 0, width: 0, ready: false } : prev));
      return;
    }
    let x = typeof activeTab.offsetLeft === 'number' ? activeTab.offsetLeft : 0;
    let width = typeof activeTab.offsetWidth === 'number' ? activeTab.offsetWidth : 0;
    if (!width && typeof activeTab.getBoundingClientRect === 'function' && typeof list.getBoundingClientRect === 'function') {
      const tabRect = activeTab.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      if (tabRect && listRect && tabRect.width > 0) {
        width = tabRect.width;
        x = tabRect.left - listRect.left + (list.scrollLeft || 0);
      }
    }
    const ready = width > 0;
    if (list.style && typeof list.style.setProperty === 'function') {
      list.style.setProperty('--dsh-tab-x', `${Math.round(x)}px`);
      list.style.setProperty('--dsh-tab-w', `${Math.round(width)}px`);
    }
    list.setAttribute?.('data-indicator-ready', ready ? 'true' : 'false');
    setMetrics(prev => (
      prev.x === Math.round(x) && prev.width === Math.round(width) && prev.ready === ready
        ? prev
        : { x: Math.round(x), width: Math.round(width), ready }
    ));
  };

  const effectHook = typeof React?.useLayoutEffect === 'function'
    ? React.useLayoutEffect
    : (typeof React?.useEffect === 'function' ? React.useEffect : null);

  if (effectHook) {
    const deps = Array.isArray(options?.deps) ? [activeValue, ...options.deps] : [activeValue];
    effectHook(() => {
      syncIndicator();
      const list = tablistRef.current;
      const win = resolveWindow(options?.win);
      let ro = null;
      if (list && typeof win?.ResizeObserver === 'function') {
        try {
          ro = new win.ResizeObserver(() => syncIndicator());
          ro.observe(list);
        } catch {
          ro = null;
        }
      }
      if (win && typeof win.addEventListener === 'function') {
        win.addEventListener('resize', syncIndicator);
      }
      return () => {
        ro?.disconnect?.();
        if (win && typeof win.removeEventListener === 'function') {
          win.removeEventListener('resize', syncIndicator);
        }
      };
    }, deps);
  }

  const indicatorStyle = {
    '--dsh-tab-x': `${metrics.x}px`,
    '--dsh-tab-w': `${metrics.width}px`,
  };

  return {
    tablistRef,
    ready: metrics.ready,
    indicatorStyle,
    tablistProps: {
      ref: tablistRef,
      'data-dsh-tablist': '',
      'data-indicator-ready': metrics.ready ? 'true' : 'false',
    },
    indicatorProps: {
      className: 'dsh-tab-indicator',
      'aria-hidden': 'true',
      style: indicatorStyle,
    },
    syncIndicator,
  };
}

/**
 * Resizable split-pane hook with `localStorage` persistence, clamping, reset,
 * and ready-to-spread `resizerProps` for `DshSplitResizer`.
 */
function useResizableSplit(
  React,
  { key, initial = 320, min = 220, max = 560, orientation = 'vertical', reverse = false, win } = {},
) {
  const clampedInitial = clampNumber(initial, min, max);
  const readStored = () => {
    const target = resolveWindow(win);
    if (!key || !target) return clampedInitial;
    try {
      const raw = target.localStorage?.getItem(key);
      if (raw == null || raw === '') return clampedInitial;
      const parsed = Number(raw);
      return Number.isFinite(parsed) ? clampNumber(parsed, min, max) : clampedInitial;
    } catch {
      return clampedInitial;
    }
  };

  const writeStored = nextSize => {
    const clamped = Math.round(clampNumber(nextSize, min, max));
    const target = resolveWindow(win);
    if (key && target) {
      try {
        target.localStorage?.setItem(key, String(clamped));
      } catch {
        // Ignore restricted storage errors.
      }
    }
    return clamped;
  };

  const hasHooks = Boolean(React && typeof React.useState === 'function');
  const [size, setSizeState] = hasHooks ? React.useState(() => readStored()) : [readStored(), () => {}];
  const [isDragging, setIsDragging] = hasHooks ? React.useState(false) : [false, () => {}];

  const setSize = next => {
    const resolved = typeof next === 'function' ? next(size) : next;
    const applied = writeStored(resolved);
    setSizeState(applied);
    return applied;
  };

  const reset = () => {
    const applied = writeStored(clampedInitial);
    setSizeState(applied);
    return applied;
  };

  return {
    size,
    width: size,
    setSize,
    reset,
    isDragging,
    setIsDragging,
    paneStyle: { '--dsh-split-size': `${size}px` },
    resizerProps: {
      value: size,
      initial: clampedInitial,
      min,
      max,
      orientation,
      reverse,
      onChange: setSize,
      onReset: reset,
      onDraggingChange: setIsDragging,
    },
  };
}

function renderDshSplitResizer(
  React,
  {
    value = 320,
    initial,
    min = 220,
    max = 560,
    orientation = 'vertical',
    reverse = false,
    step = 16,
    label = 'Resize pane',
    onChange,
    onReset,
    onDraggingChange,
    className,
    style,
    ...rest
  } = {},
) {
  const R = resolveReact(React);
  if (!R) return null;
  const h = R.createElement;
  const dragRef = typeof R.useRef === 'function' ? R.useRef(null) : { current: null };
  const [dragging, setDragging] = typeof R.useState === 'function' ? R.useState(false) : [false, () => {}];

  const isHorizontal = orientation === 'horizontal';
  const clampedValue = Math.round(clampNumber(value, min, max));

  const setDragActive = active => {
    setDragging(active);
    onDraggingChange?.(active);
  };

  const cleanupWindowListeners = () => {
    const drag = dragRef.current;
    if (drag?.cleanup) {
      drag.cleanup();
    }
    dragRef.current = null;
  };

  if (typeof R.useEffect === 'function') {
    R.useEffect(() => cleanupWindowListeners, []);
  }

  const updateFromClientPos = (clientX, clientY) => {
    const drag = dragRef.current;
    if (!drag) return;
    const rawDelta = isHorizontal ? (clientY - drag.startY) : (clientX - drag.startX);
    const delta = reverse ? -rawDelta : rawDelta;
    const next = Math.round(clampNumber(drag.startValue + delta, min, max));
    onChange?.(next);
  };

  const handlePointerDown = event => {
    if (event?.button !== undefined && event.button !== 0) return;
    event?.preventDefault?.();
    const targetEl = event?.currentTarget;
    const pointerId = event?.pointerId;
    const startX = Number(event?.clientX ?? 0);
    const startY = Number(event?.clientY ?? 0);

    cleanupWindowListeners();

    let captured = false;
    if (targetEl && typeof targetEl.setPointerCapture === 'function' && pointerId !== undefined) {
      try {
        targetEl.setPointerCapture(pointerId);
        captured = true;
      } catch {
        captured = false;
      }
    }

    const win = resolveWindow();
    let cleanup = null;
    if (!captured && win && typeof win.addEventListener === 'function') {
      const onWinMove = moveEvent => updateFromClientPos(Number(moveEvent.clientX ?? 0), Number(moveEvent.clientY ?? 0));
      const onWinUp = () => {
        cleanupWindowListeners();
        setDragActive(false);
      };
      win.addEventListener('pointermove', onWinMove);
      win.addEventListener('mousemove', onWinMove);
      win.addEventListener('pointerup', onWinUp);
      win.addEventListener('mouseup', onWinUp);
      win.addEventListener('pointercancel', onWinUp);
      cleanup = () => {
        win.removeEventListener('pointermove', onWinMove);
        win.removeEventListener('mousemove', onWinMove);
        win.removeEventListener('pointerup', onWinUp);
        win.removeEventListener('mouseup', onWinUp);
        win.removeEventListener('pointercancel', onWinUp);
      };
    }

    dragRef.current = { startX, startY, startValue: clampedValue, pointerId, captured, cleanup };
    setDragActive(true);
  };

  const handlePointerMove = event => {
    if (!dragRef.current) return;
    updateFromClientPos(Number(event?.clientX ?? 0), Number(event?.clientY ?? 0));
  };

  const handlePointerEnd = event => {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.captured && event?.currentTarget && typeof event.currentTarget.releasePointerCapture === 'function' && drag.pointerId !== undefined) {
      try {
        event.currentTarget.releasePointerCapture(drag.pointerId);
      } catch {
        // Ignore release errors when pointer already detached.
      }
    }
    cleanupWindowListeners();
    setDragActive(false);
  };

  const handleKeyDown = event => {
    const key = event?.key;
    const deltaStep = event?.shiftKey ? step * 2 : step;
    const dir = reverse ? -1 : 1;
    let next = null;
    if ((!isHorizontal && key === 'ArrowLeft') || (isHorizontal && key === 'ArrowUp')) {
      next = clampNumber(clampedValue - deltaStep * dir, min, max);
    } else if ((!isHorizontal && key === 'ArrowRight') || (isHorizontal && key === 'ArrowDown')) {
      next = clampNumber(clampedValue + deltaStep * dir, min, max);
    } else if (key === 'Home') {
      next = min;
    } else if (key === 'End') {
      next = max;
    }
    if (next !== null) {
      event?.preventDefault?.();
      onChange?.(Math.round(next));
    }
  };

  const handleDoubleClick = () => {
    if (typeof onReset === 'function') {
      onReset();
    } else if (initial !== undefined) {
      onChange?.(Math.round(clampNumber(initial, min, max)));
    }
  };

  return h('div', {
    ...rest,
    role: 'separator',
    tabIndex: 0,
    'aria-orientation': orientation,
    'aria-label': label,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': clampedValue,
    'data-dsh-resizer': '',
    'data-dragging': dragging ? 'true' : 'false',
    'data-window-drag-exclude': '',
    className: ['dsh-split-resizer', className].filter(Boolean).join(' '),
    style,
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerEnd,
    onPointerCancel: handlePointerEnd,
    onLostPointerCapture: handlePointerEnd,
    onKeyDown: handleKeyDown,
    onDoubleClick: handleDoubleClick,
  });
}

function createSplitResizerComponent(React) {
  return function DshSplitResizerWithReact(props) {
    return renderDshSplitResizer(React, props);
  };
}

function DshSplitResizer(props = {}) {
  const { React: explicitReact, ...rest } = props;
  return renderDshSplitResizer(resolveReact(explicitReact), rest);
}

/**
 * Theme-tinted shimmer skeleton helper (`DshSkeleton` / `createSkeletonComponent` / `renderDshSkeleton`).
 * Honors `prefers-reduced-motion: reduce` and `eink` zero-distraction mode automatically via CSS.
 */
function renderDshSkeleton(
  React,
  {
    variant = 'text',
    lines = 3,
    width,
    height,
    radius,
    animated = true,
    label,
    className,
    style,
    ...rest
  } = {},
) {
  const R = resolveReact(React);
  if (!R) return null;
  const h = R.createElement;
  const a11yProps = label
    ? { role: 'status', 'aria-busy': 'true', 'aria-label': label }
    : { 'aria-hidden': 'true' };

  const baseBar = (barWidth, barHeight, key) =>
    h('span', {
      key,
      className: 'dsh-skeleton',
      'data-dsh-skeleton': variant,
      'data-animated': animated ? 'true' : 'false',
      style: {
        width: barWidth ?? width,
        height: barHeight ?? height,
        borderRadius: radius,
      },
    });

  if (variant === 'circle') {
    return h('span', {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton', 'dsh-skeleton-circle', className].filter(Boolean).join(' '),
      'data-dsh-skeleton': 'circle',
      'data-animated': animated ? 'true' : 'false',
      style: { width, height, ...style },
    });
  }

  if (variant === 'rect') {
    return h('span', {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton', className].filter(Boolean).join(' '),
      'data-dsh-skeleton': 'rect',
      'data-animated': animated ? 'true' : 'false',
      style: { width, height: height ?? '80px', borderRadius: radius, ...style },
    });
  }

  if (variant === 'row') {
    return h(
      'div',
      {
        ...a11yProps,
        ...rest,
        className: ['dsh-skeleton-row', className].filter(Boolean).join(' '),
        style,
      },
      h('span', {
        className: 'dsh-skeleton dsh-skeleton-circle',
        'data-dsh-skeleton': 'circle',
        'data-animated': animated ? 'true' : 'false',
      }),
      h(
        'div',
        { className: 'dsh-skeleton-group' },
        baseBar('58%', '12px', 'r1'),
        baseBar('84%', '10px', 'r2'),
      ),
    );
  }

  if (variant === 'card') {
    return h(
      'div',
      {
        ...a11yProps,
        ...rest,
        className: ['dsh-skeleton-card', className].filter(Boolean).join(' '),
        style,
      },
      baseBar('46%', '14px', 'c1'),
      baseBar('100%', '11px', 'c2'),
      baseBar('74%', '11px', 'c3'),
    );
  }

  const count = Math.max(1, Math.round(Number(lines) || 1));
  if (count === 1) {
    return h('span', {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton', className].filter(Boolean).join(' '),
      'data-dsh-skeleton': 'text',
      'data-animated': animated ? 'true' : 'false',
      style: { width, height, borderRadius: radius, ...style },
    });
  }

  const bars = [];
  for (let i = 0; i < count; i += 1) {
    const isLast = i === count - 1;
    bars.push(baseBar(isLast ? '68%' : '100%', height, `l-${i}`));
  }
  return h(
    'div',
    {
      ...a11yProps,
      ...rest,
      className: ['dsh-skeleton-group', className].filter(Boolean).join(' '),
      style,
    },
    bars,
  );
}

function createSkeletonComponent(React) {
  return function DshSkeletonWithReact(props) {
    return renderDshSkeleton(React, props);
  };
}

function DshSkeleton(props = {}) {
  const { React: explicitReact, ...rest } = props;
  return renderDshSkeleton(resolveReact(explicitReact), rest);
}

const primitivesByReact = new WeakMap();

/**
 * Lazily resolves `@deepseek-ai/dsh-client-ui-primitives` on render and supplies
 * semantic, accessible HTML fallbacks when running in standalone `jsdom` or `node:vm`
 * tests where host UI primitives are not mounted.
 *
 * IMPORTANT: Call ONLY inside component render paths — never eagerly inside
 * `window.__ModuleLoader__.load({ factory })` or `apply(ctx)`.
 */
function resolveHostPrimitives(React, requireFn) {
  const h = React.createElement;
  let host = null;
  if (typeof requireFn === 'function') {
    try {
      host = requireFn('@deepseek-ai/dsh-client-ui-primitives') || null;
    } catch {
      host = null;
    }
  }

  // Keep component types stable while still discovering host changes on render.
  let primitivesByHost = primitivesByReact.get(React);
  if (!primitivesByHost) {
    primitivesByHost = new Map();
    primitivesByReact.set(React, primitivesByHost);
  }
  const cached = primitivesByHost.get(host);
  if (cached) return cached;

  function FallbackButton({ variant = 'ghost', size = 'md', icon, className, children, type = 'button', ...rest }) {
    const cls = ['dsh-btn', `dsh-btn-${variant}`, `dsh-btn-${size}`, className].filter(Boolean).join(' ');
    return h(
      'button',
      { type, className: cls, ...rest },
      icon != null ? h('span', { className: 'dsh-fallback-btn-icon' }, icon) : null,
      children,
    );
  }

  function FallbackInput({ icon, className, ...rest }) {
    const cls = ['dsh-fallback-input-wrap', className].filter(Boolean).join(' ');
    return h(
      'span',
      { className: cls },
      icon != null ? h('span', { className: 'dsh-fallback-input-icon' }, icon) : null,
      h('input', rest),
    );
  }

  function FallbackCheckbox({ checked = false, onChange, label, disabled = false, title, className, ...rest }) {
    return h(
      'label',
      { className, title },
      h('input', {
        type: 'checkbox',
        checked: Boolean(checked),
        disabled,
        onChange: event => onChange?.(Boolean(event?.target?.checked)),
        ...rest,
      }),
      h('span', null, label),
    );
  }

  function FallbackSwitch({ checked = false, onChange, label, disabled = false, title, className }) {
    return h(
      'button',
      {
        type: 'button',
        role: 'switch',
        'aria-checked': Boolean(checked),
        'aria-label': label,
        title,
        disabled,
        className,
        onClick: () => onChange?.(!checked),
      },
      h('span', null),
    );
  }

  function FallbackSegmentedControl({ id, value, options = [], onChange, label, disabled = false, className }) {
    return h(
      'div',
      { role: 'tablist', 'aria-label': label, className },
      options.map(opt => {
        const selected = opt.value === value;
        return h(
          'button',
          {
            key: opt.value,
            id: id ? `${id}-${opt.value}` : undefined,
            type: 'button',
            role: 'tab',
            'aria-selected': selected,
            tabIndex: selected ? 0 : -1,
            disabled: disabled || Boolean(opt.disabled),
            onClick: () => {
              if (!disabled && !opt.disabled && opt.value !== value) onChange?.(opt.value);
            },
          },
          opt.label,
        );
      }),
    );
  }

  function renderPortalSyncNode(styleValue, fontValue) {
    const syncStyle = normalizeDshStyle(styleValue ?? readDshStyle());
    const syncFont = normalizeDshFont(fontValue ?? readDshFont());
    return h('span', {
      key: '__dsh_portal_sync__',
      ref: createOverlaySyncRef(syncStyle, syncFont),
      hidden: true,
      'aria-hidden': 'true',
      'data-dsh-style': syncStyle,
      'data-dsh-font': syncFont,
    });
  }

  function FallbackMenu({
    open = false,
    anchor,
    items = [],
    children,
    selectedId,
    onSelect,
    onClose,
    footer,
    className,
    listClassName,
    dshStyle,
    dshFont,
  }) {
    const style = normalizeDshStyle(dshStyle ?? readDshStyle());
    const font = normalizeDshFont(dshFont ?? readDshFont());
    return h(
      'div',
      { className: ['dsh-style-fallback-wrap', className].filter(Boolean).join(' ') },
      anchor,
      open
        ? h(
            'div',
            {
              role: 'menu',
              'data-dsh-style': style,
              'data-dsh-font': font,
              'data-window-drag-exclude': '',
              'data-dsh-portal-synced': 'true',
              className: ['dsh-style-fallback-menu', listClassName].filter(Boolean).join(' '),
              onKeyDown: event => {
                if (event?.key === 'Escape') {
                  event.stopPropagation?.();
                  onClose?.();
                }
              },
            },
            items.map(item => {
              const stylePreset = VALID_STYLE_IDS.has(item.id) ? getDshStylePreset(item.id) : null;
              return h(
                'button',
                {
                  key: item.id,
                  type: 'button',
                  role: 'menuitemradio',
                  'aria-checked': item.id === selectedId,
                  disabled: Boolean(item.disabled),
                  className: 'dsh-style-fallback-item',
                  onClick: () => {
                    if (!item.disabled) {
                      onSelect?.(item.id);
                      onClose?.();
                    }
                  },
                },
                h(
                  'span',
                  { className: 'dsh-style-fallback-item-leading' },
                  stylePreset
                    ? h('span', {
                        className: 'dsh-style-swatch',
                        'aria-hidden': 'true',
                        style: { '--dsh-swatch-color': stylePreset.swatch },
                      })
                    : null,
                  h('span', null, item.label),
                ),
                item.id === selectedId ? h('span', { 'aria-hidden': 'true' }, '✓') : null,
              );
            }),
            children,
            footer,
          )
        : null,
    );
  }

  function FallbackModal({
    open = true,
    onClose,
    title,
    closeLabel = 'Close',
    children,
    footer,
    className,
    contentClassName,
    onKeyDownCapture,
    headless = false,
    dshStyle,
    dshFont,
  }) {
    if (!open) return null;
    const style = normalizeDshStyle(dshStyle ?? readDshStyle());
    const font = normalizeDshFont(dshFont ?? readDshFont());
    return h(
      'div',
      {
        className: 'dsh-fallback-modal-root',
        role: 'presentation',
        'data-dsh-style': style,
        'data-dsh-font': font,
        'data-window-drag-exclude': '',
        'data-dsh-portal-synced': 'true',
        onKeyDownCapture,
        // Let nested menus/editors consume Escape before the enclosing dialog.
        onKeyDown: event => {
          if (!event?.defaultPrevented && event?.key === 'Escape') {
            event.stopPropagation?.();
            onClose?.();
          }
        },
      },
      h('div', { className: 'dsh-fallback-modal-mask', 'aria-hidden': 'true', onClick: onClose }),
      h(
        'div',
        {
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': title,
          tabIndex: -1,
          'data-dsh-style': style,
          'data-dsh-font': font,
          'data-window-drag-exclude': '',
          'data-dsh-portal-synced': 'true',
          className: ['dsh-fallback-modal-dialog', className].filter(Boolean).join(' '),
        },
        headless
          ? children
          : h(
              React.Fragment || 'div',
              null,
              h(
                'header',
                null,
                h('h2', null, title),
                h('button', { type: 'button', 'aria-label': closeLabel, onClick: onClose }, '×'),
              ),
              h('div', { className: contentClassName }, children),
              footer ? h('footer', null, footer) : null,
            ),
      ),
    );
  }

  const WrappedMenu = host?.Menu
    ? function HostMenuWithStyle({ dshStyle, dshFont, children, ...menuProps }) {
        if (!menuProps.open) {
          return children !== undefined ? h(host.Menu, menuProps, children) : h(host.Menu, menuProps);
        }
        const syncNode = renderPortalSyncNode(dshStyle, dshFont);
        return children !== undefined && children !== null
          ? h(host.Menu, menuProps, children, syncNode)
          : h(host.Menu, menuProps, syncNode);
      }
    : FallbackMenu;

  const WrappedModal = host?.Modal
    ? function HostModalWithStyle({ dshStyle, dshFont, children, ...modalProps }) {
        if (!modalProps.open) {
          return children !== undefined ? h(host.Modal, modalProps, children) : h(host.Modal, modalProps);
        }
        const syncNode = renderPortalSyncNode(dshStyle, dshFont);
        return children !== undefined && children !== null
          ? h(host.Modal, modalProps, children, syncNode)
          : h(host.Modal, modalProps, syncNode);
      }
    : FallbackModal;

  const resolved = {
    ...(host || {}),
    isFallback: !host,
    Button: host?.Button || FallbackButton,
    Input: host?.Input || FallbackInput,
    Checkbox: host?.Checkbox || FallbackCheckbox,
    Switch: host?.Switch || FallbackSwitch,
    SegmentedControl: host?.SegmentedControl || FallbackSegmentedControl,
    Menu: WrappedMenu,
    Modal: WrappedModal,
  };
  primitivesByHost.set(host, resolved);
  return resolved;
}

/**
 * Compact standalone Font Pairing Switcher (`FontSwitcher`), synced via
 * `localStorage['dsh-stardust:ui-font']` + `dsh-stardust-font` and `[data-dsh-font]`.
 */
function createFontSwitcherComponent(React, requireFn) {
  const h = React.createElement;
  return function FontSwitcher({
    font: controlledFont,
    style: controlledStyle,
    onChange,
    lang = 'zh',
    id = 'dsh-font-switcher',
    compact = true,
    disabled = false,
    align = 'end',
    className,
    open: controlledOpen,
    onOpenChange,
  } = {}) {
    const [syncedFont, setSyncedFont] = useDshFont(React);
    const [syncedStyle] = useDshStyle(React);
    const activeFont = normalizeDshFont(controlledFont ?? syncedFont);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const [internalOpen, setInternalOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
    const open = controlledOpen !== undefined ? Boolean(controlledOpen) : internalOpen;
    const setOpen = next => {
      const resolved = typeof next === 'function' ? next(open) : Boolean(next);
      if (controlledOpen === undefined) setInternalOpen(resolved);
      onOpenChange?.(resolved);
    };
    const isZh = String(lang || '').toLowerCase().startsWith('zh');
    const preset = getDshFontPreset(activeFont);
    const P = resolveHostPrimitives(React, requireFn);
    const triggerLabel = isZh ? `字体搭配：${preset.zh}` : `Font pairing: ${preset.en}`;
    const visibleText = compact
      ? (isZh ? preset.zhShort : preset.enShort)
      : (isZh ? preset.zh : preset.en);
    const items = DSH_FONTS.map(option => ({
      id: option.id,
      label: isZh ? `${option.zh} (${option.enShort})` : `${option.en}`,
    }));
    const selectFont = nextId => {
      const applied = writeDshFont(nextId);
      setSyncedFont(applied);
      onChange?.(applied);
      setOpen(false);
    };

    return h(P.Menu, {
      open: open && !disabled,
      selectedId: activeFont,
      dshStyle: activeStyle,
      dshFont: activeFont,
      items,
      align,
      portal: !P.isFallback,
      autoFocus: true,
      minWidthFromAnchor: true,
      className,
      onClose: () => setOpen(false),
      onSelect: selectFont,
      anchor: h(
        P.Button,
        {
          id,
          variant: 'outline',
          size: 'sm',
          disabled,
          className: 'dsh-font-trigger',
          'aria-label': triggerLabel,
          'aria-haspopup': 'menu',
          'aria-expanded': Boolean(open && !disabled),
          title: triggerLabel,
          onClick: () => setOpen(prev => !prev),
          onKeyDown: event => {
            if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
              event.preventDefault?.();
              setOpen(true);
            }
          },
        },
        h('span', { className: 'dsh-font-glyph', 'aria-hidden': 'true' }, isZh ? '字' : 'Aa'),
        h('span', { className: 'dsh-font-label' }, visibleText),
        renderDshIcon(React, { name: 'down', size: 13 }),
      ),
    });
  };
}

/**
 * Ready-made 13-preset Style Switcher + compact Font Pairing Switcher (`StyleSwitcher`).
 * Renders the style menu trigger with a live color swatch alongside the compact
 * font-pairing trigger (`showFontSwitcher = true` by default), syncing via
 * `localStorage['dsh-stardust:ui-style']` / `['dsh-stardust:ui-font']` and custom events.
 */
function createStyleSwitcherComponent(React, requireFn) {
  const h = React.createElement;
  const FontSwitcher = createFontSwitcherComponent(React, requireFn);
  return function StyleSwitcher({
    style: controlledStyle,
    font: controlledFont,
    onChange,
    onFontChange,
    showFontSwitcher = true,
    lang = 'zh',
    id = 'dsh-style-switcher',
    compact = false,
    disabled = false,
    align = 'end',
    className,
  } = {}) {
    const [syncedStyle, setSyncedStyle] = useDshStyle(React);
    const [syncedFont] = useDshFont(React);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const activeFont = normalizeDshFont(controlledFont ?? syncedFont);
    const [open, setOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
    const [fontOpen, setFontOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
    const isZh = String(lang || '').toLowerCase().startsWith('zh');
    const preset = getDshStylePreset(activeStyle);
    const P = resolveHostPrimitives(React, requireFn);
    const triggerLabel = isZh ? `界面风格：${preset.zh}` : `UI style: ${preset.en}`;
    const visibleText = compact
      ? (isZh ? preset.zhShort : preset.enShort)
      : (isZh ? preset.zh : preset.en);
    const items = DSH_STYLES.map(option => ({
      id: option.id,
      label: isZh ? `${option.zh} (${option.enShort})` : `${option.en}`,
    }));
    const selectStyle = nextId => {
      const applied = writeDshStyle(nextId);
      setSyncedStyle(applied);
      onChange?.(applied);
      setOpen(false);
    };

    return h(
      'div',
      {
        className: ['dsh-style-switcher', className].filter(Boolean).join(' '),
        'data-window-drag-exclude': '',
      },
      h(P.Menu, {
        open: open && !disabled,
        selectedId: activeStyle,
        dshStyle: activeStyle,
        dshFont: activeFont,
        items,
        align,
        portal: !P.isFallback,
        autoFocus: true,
        minWidthFromAnchor: true,
        onClose: () => setOpen(false),
        onSelect: selectStyle,
        anchor: h(
          P.Button,
          {
            id,
            variant: 'outline',
            size: 'sm',
            disabled,
            className: 'dsh-style-trigger',
            'aria-label': triggerLabel,
            'aria-haspopup': 'menu',
            'aria-expanded': Boolean(open && !disabled),
            title: triggerLabel,
            onClick: () => {
              setFontOpen(false);
              setOpen(prev => !prev);
            },
            onKeyDown: event => {
              if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                event.preventDefault?.();
                setFontOpen(false);
                setOpen(true);
              }
            },
          },
          h('span', {
            className: 'dsh-style-swatch',
            'aria-hidden': 'true',
            style: { '--dsh-swatch-color': preset.swatch },
          }),
          h('span', { className: 'dsh-style-label' }, visibleText),
          renderDshIcon(React, { name: 'down', size: 14 }),
        ),
      }),
      showFontSwitcher
        ? h(FontSwitcher, {
            id: `${id}-font`,
            font: controlledFont,
            style: activeStyle,
            onChange: onFontChange,
            lang,
            compact: true,
            disabled,
            align,
            open: fontOpen && !disabled,
            onOpenChange: next => {
              if (next) setOpen(false);
              setFontOpen(next);
            },
          })
        : null,
    );
  };
}

/* DSH Workbench UI v3 — DeepSeek Harness (>=0.2.2-rc.3) Host Primitives,
 * 13-Style Theme Switcher (`harness`, `cream`, `claude`, `pixel8bit`, `mint`,
 * `glass`, `eink`, `blueprint`, `risograph`, `win98`, `songhui`, `frutiger`, `gazette`),
 * 8 Font Pairings (`arcade` default, `auto`, `songkai`, `fangsong`, `poster`, `retro98`, `serif`, `modern`),
 * Unified 48px Single-Row Header, Sliding Tab Indicator, Resizable Split Panes,
 * Theme-Tinted Shimmer Skeletons, Row Hover Quick Actions, and Calm Update Strip.
 */
function createWorkbenchUI(React, require) {
  const h = React.createElement;
  const cx = (...values) => values.filter(Boolean).join(' ');
  const useSafeId = (fallback = 'dsh-wb-id') => (typeof React.useId === 'function' ? React.useId() : fallback);
  const useSafeState = initial => (
    typeof React.useState === 'function'
      ? React.useState(initial)
      : [typeof initial === 'function' ? initial() : initial, () => {}]
  );
  const useSafeRef = initial => (typeof React.useRef === 'function' ? React.useRef(initial) : { current: initial });
  const useSafeEffect = (fn, deps) => {
    if (typeof React.useEffect === 'function') React.useEffect(fn, deps);
  };

  // Lazy host primitive resolution: NEVER call require('@deepseek-ai/dsh-client-ui-primitives') eagerly!
  const primitives = () => resolveHostPrimitives(React, require);
  const StyleSwitcher = createStyleSwitcherComponent(React, require);
  const FontSwitcher = createFontSwitcherComponent(React, require);
  const DshSplitResizer = createSplitResizerComponent(React);
  const Skeleton = createSkeletonComponent(React);

  const WORKBENCH_ICON_PATHS = Object.freeze({
    ...DSH_ICON_PATHS,
    filter: ['M4 5h16M7 12h10M10 19h4'],
    upload: ['M12 16V4m-5 5 5-5 5 5', 'M4 16v5h16v-5'],
    more: ['M5 12h.01M12 12h.01M19 12h.01'],
    settings: [
      'm9 3-.7 2.4-2 .9L4 5.8 2.5 8.4l1.7 1.8v2.3L2.5 14 4 17l2.5-.4 1.9 1L9 20h3l.8-2.4 2-1 2.5.4 1.5-2.7-1.7-1.9v-2.2l1.7-1.8-1.5-2.6-2.5.4-2-1L12 3Z',
      'M14 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z',
    ],
    book: ['M4 4h6a3 3 0 0 1 2 2v15a4 4 0 0 0-4-2H4z', 'M20 4h-6a3 3 0 0 0-2 2v15a4 4 0 0 1 4-2h4z'],
    slides: ['M3 4h18v13H3z', 'M12 17v4M8 21h8'],
    layers: ['M5 3h16v16H5z', 'M2 7v15h15'],
    video: ['M3 5h12v14H3z', 'm15 10 6-4v12l-6-4'],
    quote: ['M4 12h6v7H3v-7c0-4 2-6 5-7M15 12h6v7h-7v-7c0-4 2-6 5-7'],
  });

  function Icon({ name = 'file', size = 16, ...props }) {
    return renderDshIcon(React, { name, size, paths: WORKBENCH_ICON_PATHS, ...props });
  }

  function Button({
    children,
    icon,
    iconSize = 15,
    variant = 'outline',
    size = 'sm',
    spinning = false,
    copied = false,
    className,
    ...props
  }) {
    const P = primitives();
    const resolvedVariant = variant || 'outline';
    const hostVariant = resolvedVariant === 'danger'
      ? 'ghost'
      : (resolvedVariant === 'primary' || resolvedVariant === 'ghost' ? resolvedVariant : 'outline');
    return h(
      P.Button,
      {
        variant: hostVariant,
        size,
        'aria-busy': spinning ? 'true' : props['aria-busy'],
        'data-copied': copied ? 'true' : props['data-copied'],
        ...props,
        className: cx('dsh-wb-btn', 'dsh-wb-btn-' + resolvedVariant, className),
        icon: icon ? h(Icon, { name: icon, size: iconSize, 'data-spinning': spinning ? 'true' : undefined }) : undefined,
      },
      children,
    );
  }

  function IconButton({ label, icon, iconSize = 16, variant = 'ghost', size = 'sm', spinning = false, className, ...props }) {
    return h(Button, {
      ...props,
      icon,
      iconSize,
      variant,
      size,
      spinning,
      className: cx('dsh-wb-icon-btn', className),
      'aria-label': label,
      title: props.title ?? label,
    });
  }

  function Input({ icon, className, ...props }) {
    const P = primitives();
    return h(P.Input, {
      ...props,
      icon: icon ? h(Icon, { name: icon, size: 15 }) : undefined,
      className: cx('dsh-wb-input', className),
    });
  }

  function Checkbox({ label, checked = false, onChange, hiddenLabel = false, disabled = false, className, id, ...props }) {
    const P = primitives();
    const fallbackId = useSafeId('dsh-wb-chk');
    const inputId = id || fallbackId;
    if (P.isFallback) {
      return h(
        'label',
        { htmlFor: inputId, className: cx('dsh-wb-checkbox', hiddenLabel && 'dsh-wb-checkbox-hidden', className), title: props.title },
        h('input', {
          ...props,
          id: inputId,
          type: 'checkbox',
          checked: Boolean(checked),
          disabled: Boolean(disabled),
          onChange: event => onChange?.(Boolean(event?.target?.checked)),
        }),
        h('span', null, label),
      );
    }
    return h(P.Checkbox, {
      ...props,
      id: inputId,
      checked: Boolean(checked),
      disabled: Boolean(disabled),
      label,
      className: cx('dsh-wb-checkbox', hiddenLabel && 'dsh-wb-checkbox-hidden', className),
      onChange: next => {
        const value = typeof next === 'boolean' ? next : Boolean(next?.target?.checked);
        onChange?.(value);
      },
    });
  }

  function Switch({ label, checked = false, onChange, disabled = false, className }) {
    const P = primitives();
    return h(
      'div',
      { className: cx('dsh-wb-switch-row', className) },
      h(P.Switch, {
        checked: Boolean(checked),
        disabled: Boolean(disabled),
        label,
        className: 'dsh-wb-switch',
        onChange: next => {
          const value = typeof next === 'boolean' ? next : Boolean(next?.target?.checked);
          onChange?.(value);
        },
      }),
      h('span', { className: 'dsh-wb-switch-text' }, label),
    );
  }

  function ChoiceMenu({
    label,
    id,
    value,
    items = [],
    onChange,
    disabled = false,
    children,
    className,
    align = 'start',
    icon,
  }) {
    const [open, setOpen] = useSafeState(false);
    const [style] = useDshStyle(React);
    const [font] = useDshFont(React);
    const P = primitives();
    const currentValue = String(value ?? '');
    const selected = items.find(item => String(item.id) === currentValue);
    return h(
      'div',
      { className: cx('dsh-wb-choice', className), 'data-window-drag-exclude': '' },
      h(P.Menu, {
        open: Boolean(open && !disabled),
        selectedId: currentValue,
        dshStyle: style,
        dshFont: font,
        items: items.map(item => ({ ...item, id: String(item.id) })),
        align,
        portal: !P.isFallback,
        autoFocus: true,
        minWidthFromAnchor: true,
        className: 'dsh-wb-menu',
        onClose: () => setOpen(false),
        onSelect: next => {
          setOpen(false);
          if (String(next) !== currentValue) onChange?.(next);
        },
        anchor: h(
          Button,
          {
            id,
            variant: 'outline',
            className: 'dsh-wb-menu-btn',
            disabled: Boolean(disabled || items.length === 0),
            'aria-label': label,
            'aria-haspopup': 'menu',
            'aria-expanded': Boolean(open && !disabled),
            onClick: () => setOpen(prev => !prev),
            onKeyDown: event => {
              if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                event.preventDefault?.();
                setOpen(true);
              }
            },
          },
          icon ? h(Icon, { name: icon, size: 14 }) : null,
          h('span', { className: 'dsh-wb-menu-value' }, children ?? selected?.label ?? label),
          h(Icon, { name: 'down', size: 14 }),
        ),
      }),
    );
  }

  function Search({ label, value = '', onChange, clearLabel = 'Clear', disabled = false, className, ...props }) {
    const id = useSafeId('dsh-wb-search');
    const hasValue = String(value || '').length > 0;
    return h(
      'div',
      { className: cx('dsh-wb-search', className) },
      h(Input, {
        type: 'search',
        id,
        icon: 'search',
        'aria-label': label,
        placeholder: label,
        value,
        disabled,
        onChange,
        ...props,
      }),
      hasValue && !disabled
        ? h(IconButton, {
            icon: 'close',
            iconSize: 13,
            label: clearLabel,
            className: 'dsh-wb-search-clear',
            onClick: () => onChange?.({ target: { value: '' } }),
          })
        : null,
    );
  }

  const tourSessionDone = new Set();

  function readTourDone(storageKey) {
    if (!storageKey) return false;
    if (tourSessionDone.has(storageKey)) return true;
    try {
      return typeof window !== 'undefined' && window.localStorage?.getItem(storageKey) === 'done';
    } catch {
      return false;
    }
  }

  function writeTourDone(storageKey) {
    if (!storageKey) return;
    tourSessionDone.add(storageKey);
    try {
      if (typeof window !== 'undefined') window.localStorage?.setItem(storageKey, 'done');
    } catch {
      // Ignore storage quota / security errors.
    }
  }

  function computeTourLayout(target, preferredSide, cardEl) {
    const vw = (typeof window !== 'undefined' && window.innerWidth) || 1280;
    const vh = (typeof window !== 'undefined' && window.innerHeight) || 800;
    const cw = cardEl?.offsetWidth || 320;
    const ch = cardEl?.offsetHeight || 196;
    const pad = 5;
    const gap = 12;
    const raw = target?.getBoundingClientRect?.();
    if (!target) {
      return {
        spotlight: null,
        side: 'center',
        left: Math.max(12, Math.round((vw - cw) / 2)),
        top: Math.max(12, Math.round((vh - ch) / 2)),
        arrowX: 28,
        arrowY: 24,
      };
    }
    const hasBox = Boolean(raw && (raw.width > 0 || raw.height > 0));
    const rect = hasBox ? raw : { left: 120, top: 72, width: 140, height: 32 };
    const spotlight = {
      left: Math.round(rect.left - pad),
      top: Math.round(rect.top - pad),
      width: Math.round(rect.width + pad * 2),
      height: Math.round(rect.height + pad * 2),
    };
    const spaceBottom = vh - spotlight.top - spotlight.height;
    const spaceTop = spotlight.top;
    const spaceRight = vw - spotlight.left - spotlight.width;
    const spaceLeft = spotlight.left;
    let side = preferredSide || 'bottom';
    if (side === 'right' && spaceRight < cw + gap + 12) {
      side = spaceBottom >= ch + gap + 12 ? 'bottom' : spaceLeft >= cw + gap + 12 ? 'left' : 'top';
    } else if (side === 'left' && spaceLeft < cw + gap + 12) {
      side = spaceRight >= cw + gap + 12 ? 'right' : 'bottom';
    } else if (side === 'bottom' && spaceBottom < ch + gap + 12 && spaceTop > spaceBottom) {
      side = 'top';
    } else if (side === 'top' && spaceTop < ch + gap + 12 && spaceBottom > spaceTop) {
      side = 'bottom';
    }
    let left = spotlight.left;
    let top = spotlight.top + spotlight.height + gap;
    if (side === 'top') top = spotlight.top - ch - gap;
    else if (side === 'right') { left = spotlight.left + spotlight.width + gap; top = spotlight.top; }
    else if (side === 'left') { left = spotlight.left - cw - gap; top = spotlight.top; }
    left = Math.round(Math.max(12, Math.min(vw - cw - 12, left)));
    top = Math.round(Math.max(12, Math.min(vh - ch - 12, top)));
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return {
      spotlight,
      side,
      left,
      top,
      arrowX: Math.round(Math.max(18, Math.min(cw - 18, centerX - left))),
      arrowY: Math.round(Math.max(18, Math.min(ch - 18, centerY - top))),
    };
  }

  function CoachmarkTour({
    rootRef,
    steps = [],
    step = 0,
    manual = false,
    style = 'harness',
    font = DSH_DEFAULT_FONT,
    lang = 'zh',
    layout: rawLayout,
    setLayout,
    onStep,
    onClose,
    onCopyPrompt,
  }) {
    const layerRef = useSafeRef(null);
    const cardRef = useSafeRef(null);
    const nextBtnRef = useSafeRef(null);
    const copyTimerRef = useSafeRef(null);
    const [copied, setCopied] = useSafeState(false);
    const [copyNotice, setCopyNotice] = useSafeState('');
    const titleId = useSafeId('dsh-wb-tour') + '-title';
    const isEn = String(lang || '').toLowerCase().startsWith('en');
    const l = (zh, en) => (isEn ? en : zh);
    const current = steps[Math.max(0, Math.min(steps.length - 1, step))] || {};
    const layout = rawLayout && typeof rawLayout === 'object' && rawLayout.side
      ? rawLayout
      : { spotlight: null, side: current.side || 'bottom', left: 24, top: 76, arrowX: 28, arrowY: 24 };

    useSafeEffect(() => () => {
      if (copyTimerRef.current && typeof clearTimeout === 'function') clearTimeout(copyTimerRef.current);
    }, []);

    useSafeEffect(() => {
      const node = layerRef.current;
      if (!node) return undefined;
      try {
        node.setAttribute?.('popover', 'manual');
        node.showPopover?.();
      } catch {
        // Ignore when Popover API is unavailable in synthetic test DOM.
      }
      return () => {
        try { node.hidePopover?.(); } catch {}
      };
    }, []);

    function queryTourTarget(scope, selector) {
      if (!scope || !selector || typeof scope.querySelector !== 'function') return null;
      try {
        return scope.querySelector(selector);
      } catch {
        try {
          const escaped = String(selector).replace(/(^|[\s,>+~(])#([^\s,>+~()[\]]+)/g, (_, prefix, id) => {
            const esc = typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(id) : null;
            return prefix + (esc ? '#' + esc : '[id="' + id.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"]');
          });
          return scope.querySelector(escaped);
        } catch {
          return null;
        }
      }
    }

    useSafeEffect(() => {
      function measure() {
        const scope = rootRef?.current || (typeof document !== 'undefined' ? document : null);
        if (!scope || typeof scope.querySelector !== 'function') return;
        const target = queryTourTarget(scope, current.selector)
          || queryTourTarget(scope, current.fallback)
          || null;
        setLayout?.(computeTourLayout(target, current.side, cardRef.current));
      }
      measure();
      const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(measure) : null;
      if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
        return () => {
          if (raf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf);
        };
      }
      window.addEventListener('resize', measure, { passive: true });
      window.addEventListener('scroll', measure, true);
      return () => {
        if (raf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf);
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', measure, true);
      };
    }, [step, current.selector, current.fallback, current.side]);

    useSafeEffect(() => {
      if (!manual) return;
      const btn = nextBtnRef.current || cardRef.current?.querySelector?.('[data-tour-next]');
      btn?.focus?.();
    }, [manual, step]);

    async function handleCopy() {
      if (!current.prompt) return;
      const copyFn = onCopyPrompt || writeClipboardText;
      const ok = await copyFn(current.prompt);
      if (ok !== false) {
        if (copyTimerRef.current && typeof clearTimeout === 'function') clearTimeout(copyTimerRef.current);
        setCopied(true);
        let msg = l('已复制指令，粘贴到对话发送即可', 'Prompt copied — paste into chat');
        if (msg === lastWbCopyAnnouncement) msg += '\u00A0';
        lastWbCopyAnnouncement = msg;
        setCopyNotice(msg);
        if (typeof setTimeout === 'function') {
          const timer = setTimeout(() => {
            setCopied(false);
            setCopyNotice('');
          }, 1800);
          timer?.unref?.();
          copyTimerRef.current = timer;
        }
      }
    }

    const isLast = step >= steps.length - 1;
    const isCopied = copied === true;
    function finish() { onClose?.(manual); }
    function onKeyDown(event) {
      if (event.isComposing || event.nativeEvent?.isComposing) return;
      if (event.key === 'Escape') { event.preventDefault?.(); event.stopPropagation?.(); finish(); }
      else if (event.key === 'ArrowRight' && !isLast) { event.preventDefault?.(); onStep?.(step + 1, true); }
      else if (event.key === 'ArrowLeft' && step > 0) { event.preventDefault?.(); onStep?.(step - 1, true); }
    }

    return h(
      'div',
      {
        ref: layerRef,
        className: 'dsh-wb-tour-layer',
        'data-dsh-style': style,
        'data-dsh-font': normalizeDshFont(font),
        'data-wb-tour': current.id || String(step),
        'data-window-drag-exclude': '',
      },
      layout.spotlight
        ? h('div', {
            className: 'dsh-wb-tour-spotlight',
            'data-tour-spotlight': current.id || String(step),
            'aria-hidden': 'true',
            style: {
              left: layout.spotlight.left + 'px',
              top: layout.spotlight.top + 'px',
              width: layout.spotlight.width + 'px',
              height: layout.spotlight.height + 'px',
            },
          })
        : h('div', { className: 'dsh-wb-tour-backdrop', 'aria-hidden': 'true' }),
      h(
        'div',
        {
          ref: cardRef,
          role: 'dialog',
          'aria-modal': 'false',
          'aria-labelledby': titleId,
          tabIndex: -1,
          onKeyDown,
          className: 'dsh-wb-tour-card',
          'data-side': layout.side,
          'data-tour-card': current.id || String(step),
          style: {
            left: layout.left + 'px',
            top: layout.top + 'px',
            '--arrow-x': layout.arrowX + 'px',
            '--arrow-y': layout.arrowY + 'px',
          },
        },
        h('span', { className: 'dsh-wb-tour-arrow', 'data-tour-arrow': layout.side, 'aria-hidden': 'true' }),
        h(
          'div',
          { className: 'dsh-wb-tour-head' },
          h(
            'div',
            { className: 'dsh-wb-tour-step-meta' },
            h('span', { className: 'dsh-wb-tour-badge' }, (step + 1) + ' / ' + steps.length),
            h(
              'span',
              { className: 'dsh-wb-tour-dots', 'aria-hidden': 'true' },
              steps.map((item, idx) =>
                h('span', {
                  key: item.id || idx,
                  className: 'dsh-wb-tour-dot',
                  'data-active': idx === step ? 'true' : undefined,
                }),
              ),
            ),
          ),
          h('button', { type: 'button', className: 'dsh-wb-tour-skip', 'data-tour-skip': '', onClick: finish }, l('跳过', 'Skip')),
        ),
        h('h2', { id: titleId, className: 'dsh-wb-tour-title', 'data-dsh-editorial-heading': '' }, current.title),
        h('p', { className: 'dsh-wb-tour-desc' }, current.desc),
        current.prompt
          ? h(
              'div',
              { className: 'dsh-wb-tour-inline-action' },
              h(
                Button,
                {
                  type: 'button',
                  variant: 'outline',
                  icon: isCopied ? 'check' : 'copy',
                  copied: isCopied,
                  'data-copy-prompt': current.prompt,
                  'data-copied': isCopied ? 'true' : undefined,
                  title: current.prompt,
                  onClick: () => { void handleCopy(); },
                },
                isCopied ? l('已复制', 'Copied') : (current.promptLabel || l('复制对话指令', 'Copy prompt')),
              ),
              h(
                'span',
                {
                  className: 'dsh-wb-copy-status',
                  role: 'status',
                  'data-visible': isCopied ? 'true' : undefined,
                },
                typeof copyNotice === 'string' ? copyNotice : '',
              ),
            )
          : null,
        h(
          'div',
          { className: 'dsh-wb-tour-footer' },
          step > 0
            ? h(Button, { type: 'button', variant: 'ghost', onClick: () => onStep?.(step - 1, true), 'data-tour-prev': '' }, l('上一步', 'Back'))
            : h('span', null),
          h(
            'div',
            { className: 'dsh-wb-tour-nav' },
            h(
              Button,
              {
                ref: nextBtnRef,
                type: 'button',
                variant: 'primary',
                'data-tour-next': '',
                onClick: () => (isLast ? finish() : onStep?.(step + 1, true)),
              },
              isLast ? l('完成引导', 'Done') : l('下一步', 'Next'),
            ),
          ),
        ),
      ),
    );
  }

  function Page({
    title,
    subtitle,
    icon = 'shield',
    lang = 'zh',
    navigation,
    toolbar,
    actions,
    children,
    workbench = false,
    showUpdates = true,
    className,
    rootRef: externalRootRef,
    style: controlledStyle,
    font: controlledFont,
    onStyleChange,
    onFontChange,
    styleSwitcherId,
    tourSteps = null,
    tourStorageKey = 'dsh-wb.tour.v1',
    onTourCopyPrompt,
    modalOpen = false,
    ...props
  }) {
    const [syncedStyle, setSyncedStyle] = useDshStyle(React);
    const [syncedFont, setSyncedFont] = useDshFont(React);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const activeFont = normalizeDshFont(controlledFont ?? syncedFont);
    const pageRootRef = useSafeRef(null);
    const triggerRef = useSafeRef(null);
    const [tour, setTour] = useSafeState({ open: false, step: 0, manual: false });
    const [tourLayout, setTourLayout] = useSafeState(null);
    const hasTour = Array.isArray(tourSteps) && tourSteps.length > 0;
    const isEn = String(lang || '').toLowerCase().startsWith('en');

    useSafeEffect(() => {
      if (!workbench || !hasTour || modalOpen || readTourDone(tourStorageKey)) return undefined;
      if (typeof setTimeout !== 'function') return undefined;
      const timer = setTimeout(() => {
        const hasModalInDom = typeof document !== 'undefined' && Boolean(document.querySelector?.('[role="dialog"][aria-modal="true"], dialog[open]:not([popover])'));
        if (!hasModalInDom && !readTourDone(tourStorageKey)) {
          setTour({ open: true, step: 0, manual: false });
        }
      }, 280);
      timer?.unref?.();
      return () => {
        if (typeof clearTimeout === 'function') clearTimeout(timer);
      };
    }, [workbench, hasTour, modalOpen, tourStorageKey]);

    useSafeEffect(() => {
      if (modalOpen && tour.open) {
        setTour(prev => (prev.open ? { ...prev, open: false } : prev));
      }
    }, [modalOpen, tour.open]);

    function closeTour(restoreFocus = false) {
      writeTourDone(tourStorageKey);
      setTour(prev => ({ ...prev, open: false }));
      if (restoreFocus && typeof setTimeout === 'function') {
        const timer = setTimeout(() => {
          const btn = triggerRef.current || pageRootRef.current?.querySelector?.('[data-tour-trigger]');
          btn?.focus?.();
        }, 0);
        timer?.unref?.();
      }
    }

    const bindPageRef = node => {
      pageRootRef.current = node;
      if (typeof externalRootRef === 'function') externalRootRef(node);
      else if (externalRootRef && typeof externalRootRef === 'object') externalRootRef.current = node;
    };

    return h(
      'section',
      {
        ...props,
        ref: bindPageRef,
        className: cx('dsh-wb-page', !workbench && 'dsh-wb-embedded', className),
        'data-dsh-style': activeStyle,
        'data-dsh-font': activeFont,
        'data-main': workbench ? 'true' : 'false',
      },
      h(Styles, { key: 'dsh-wb-styles' }),
      h(
        'header',
        { className: 'dsh-wb-header dsh-header', 'data-dsh-header': '' },
        h(
          'div',
          { className: 'dsh-header-leading' },
          h(
            'div',
            { className: 'dsh-header-brand' },
            h('span', { className: 'dsh-header-badge dsh-wb-brand', 'aria-hidden': 'true' }, h(Icon, { name: icon, size: 14 })),
            h('h1', { className: 'dsh-header-title dsh-wb-title', 'data-dsh-editorial-heading': '' }, title),
          ),
          navigation ? h('div', { className: 'dsh-header-tabs' }, navigation) : null,
        ),
        h(
          'div',
          { className: 'dsh-header-actions dsh-wb-header-actions', 'data-window-drag-exclude': '' },
          actions,
          hasTour
            ? h(
                Button,
                {
                  ref: triggerRef,
                  type: 'button',
                  variant: 'ghost',
                  className: 'dsh-wb-tour-trigger',
                  'data-tour-trigger': '',
                  'aria-label': isEn ? 'Interactive guide' : '使用引导',
                  'aria-expanded': Boolean(tour.open),
                  title: isEn ? 'Interactive guide' : '使用引导',
                  onClick: () => (tour.open && tour.manual ? closeTour(true) : setTour({ open: true, step: 0, manual: true })),
                },
                isEn ? '? Tour' : '? 引导',
              )
            : null,
          h(StyleSwitcher, {
            id: styleSwitcherId,
            style: activeStyle,
            font: activeFont,
            showFontSwitcher: true,
            lang,
            compact: true,
            onChange: next => {
              setSyncedStyle(next);
              onStyleChange?.(next);
            },
            onFontChange: next => {
              setSyncedFont(next);
              onFontChange?.(next);
            },
          }),
        ),
      ),
      toolbar ? h('div', { className: 'dsh-wb-subbar' }, toolbar) : null,
      h('div', { className: 'dsh-wb-body', 'data-show-updates': showUpdates ? 'true' : 'false' }, children),
      hasTour && tour.open && !modalOpen
        ? h(CoachmarkTour, {
            rootRef: pageRootRef,
            steps: tourSteps,
            step: tour.step,
            manual: tour.manual,
            style: activeStyle,
            font: activeFont,
            lang,
            layout: tourLayout,
            setLayout: setTourLayout,
            onStep: (next, isManual) => setTour({ open: true, step: next, manual: Boolean(isManual) }),
            onClose: closeTour,
            onCopyPrompt: onTourCopyPrompt,
          })
        : null,
    );
  }

  function Tabs({ items = [], value, onChange, label, id: customId, children, footer, className }) {
    const baseId = customId || useSafeId('dsh-wb-tabs');
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
    const itemKey = items.map(item => `${item.id}:${item.count ?? ''}`).join('|');
    const tabs = useSlidingTabIndicator(React, active, { deps: [itemKey] });
    function onKeyDown(event, index) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault?.();
      const step = event.key === 'ArrowRight' ? 1 : -1;
      const next = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : (index + step + items.length) % items.length;
      if (items[next]) {
        onChange?.(items[next].id);
        event.currentTarget?.parentElement?.querySelectorAll?.('[role="tab"]')?.[next]?.focus?.();
      }
    }
    const tablist = h(
      'div',
      {
        ...tabs.tablistProps,
        className: cx('dsh-wb-tabs', 'dsh-tablist', 'dsh-tablist-pill', className),
        role: 'tablist',
        'aria-label': label,
      },
      items.map((item, index) =>
        h(
          Button,
          {
            key: item.id,
            variant: 'ghost',
            icon: item.icon,
            role: 'tab',
            id: baseId + '-tab-' + item.id,
            'aria-controls': baseId + '-panel',
            'aria-selected': active === item.id,
            tabIndex: active === item.id ? 0 : -1,
            className: 'dsh-wb-tab',
            onClick: () => onChange?.(item.id),
            onKeyDown: event => onKeyDown(event, index),
          },
          h('span', null, item.label),
          item.count !== undefined ? h('span', { className: 'dsh-wb-count' }, item.count) : null,
        ),
      ),
      h('span', tabs.indicatorProps),
    );
    if (children === undefined && footer === undefined) return tablist;
    return h(
      'div',
      { className: 'dsh-wb-tabs-layout' },
      tablist,
      h(
        'div',
        {
          key: active,
          className: 'dsh-wb-tab-panel dsh-tab-panel',
          'data-dsh-tab-panel': '',
          id: baseId + '-panel',
          role: 'tabpanel',
          'aria-labelledby': baseId + '-tab-' + active,
        },
        children,
        footer,
      ),
    );
  }

  function TabPanel({ id, activeTab, children, className }) {
    return h(
      'div',
      {
        className: cx('dsh-wb-tab-panel', 'dsh-tab-panel', className),
        'data-dsh-tab-panel': '',
        id: id + '-panel',
        role: 'tabpanel',
        'aria-labelledby': id + '-tab-' + activeTab,
      },
      children,
    );
  }

  function Status({ children, tone = 'info', action, className }) {
    if (!children) return null;
    return h(
      'div',
      {
        className: cx('dsh-wb-status', className),
        'data-tone': tone,
        role: tone === 'error' ? 'alert' : 'status',
        'aria-live': tone === 'error' ? 'assertive' : 'polite',
      },
      h(Icon, { name: tone === 'success' ? 'check' : 'info', size: 16 }),
      h('div', { className: 'dsh-wb-status-text' }, children),
      action ? h('div', { className: 'dsh-wb-status-action' }, action) : null,
    );
  }

  function Empty({ title, children, action = null, icon = 'file', className }) {
    return h(
      'div',
      { className: cx('dsh-wb-empty', className) },
      h('span', { className: 'dsh-wb-empty-icon', 'aria-hidden': 'true' }, h(Icon, { name: icon, size: 22 })),
      h('h2', null, title),
      children ? h('div', { className: 'dsh-wb-empty-desc' }, children) : null,
      action ? h('div', { className: 'dsh-wb-actions' }, action) : null,
    );
  }

  function Split({
    list,
    detail,
    selected,
    onBack,
    backLabel,
    className,
    listWidth = 360,
    splitKey,
    minWidth = 240,
    maxWidth = 560,
    resizerLabel = 'Resize list pane',
  }) {
    const ref = useSafeRef(null);
    const split = useResizableSplit(React, {
      key: splitKey,
      initial: listWidth,
      min: minWidth,
      max: maxWidth,
    });
    useSafeEffect(() => {
      if (!selected || !ref.current || !(ref.current.clientWidth <= 760)) return;
      const heading = ref.current.querySelector?.('.dsh-wb-detail h2');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus?.({ preventScroll: true });
      }
    }, [selected]);
    return h(
      'div',
      {
        ref,
        className: cx('dsh-wb-split', 'dsh-split-pane', className),
        'data-selected': selected ? 'true' : 'false',
        style: { ...split.paneStyle, '--dsh-list-width': split.size + 'px' },
      },
      h('div', { className: 'dsh-wb-master dsh-split-leading' }, list),
      h(DshSplitResizer, { ...split.resizerProps, label: resizerLabel }),
      h(
        'div',
        { className: 'dsh-wb-detail dsh-split-trailing' },
        selected
          ? h(
              Button,
              { className: 'dsh-wb-back', icon: 'left', variant: 'ghost', onClick: onBack },
              backLabel,
            )
          : null,
        detail,
      ),
    );
  }

  function Row({ title, meta, description, active, onClick, children, actions, status, statusTone, className, disabled, serif = true }) {
    return h(
      'div',
      {
        className: cx('dsh-wb-row', 'dsh-row', active && 'is-selected', className),
        'data-dsh-row': '',
        'data-active': active ? 'true' : 'false',
        'data-selected': active ? 'true' : 'false',
      },
      children ? h('div', { className: 'dsh-wb-row-select' }, children) : null,
      h(
        'button',
        {
          type: 'button',
          className: 'dsh-wb-row-btn',
          onClick,
          disabled,
          'aria-pressed': Boolean(active),
        },
        h(
          'span',
          { className: 'dsh-wb-row-head' },
          h(
            'span',
            { className: 'dsh-wb-row-title-wrap' },
            h('span', { className: 'dsh-pixel-cursor', 'aria-hidden': 'true' }, '▶'),
            h('strong', serif ? { 'data-dsh-serif': '' } : null, title),
          ),
          status ? h('span', { className: 'dsh-wb-tag', 'data-tone': statusTone }, status) : null,
        ),
        meta ? h('span', { className: 'dsh-wb-row-meta' }, meta) : null,
        description ? h('span', { className: 'dsh-wb-row-desc' }, description) : null,
      ),
      actions ? h('div', { className: 'dsh-row-actions', 'data-window-drag-exclude': '' }, actions) : null,
    );
  }

  function Details({ summary, children, open, className }) {
    return h(
      'details',
      { className: cx('dsh-wb-details', className), open },
      h(
        'summary',
        { className: 'dsh-wb-summary' },
        h('span', null, summary),
        h(Icon, { name: 'down', size: 14 }),
      ),
      h('div', { className: 'dsh-wb-details-body' }, children),
    );
  }

  let lastWbCopyAnnouncement = '';

  function legacyClipboardWrite(text) {
    try {
      if (typeof document === 'undefined' || typeof document.createElement !== 'function' || typeof document.execCommand !== 'function' || !document.body?.append) {
        return false;
      }
      const field = Object.assign(document.createElement('textarea'), { value: text });
      field.setAttribute('readonly', '');
      field.style.cssText = 'position:fixed;inset-block-start:0;opacity:0';
      document.body.append(field);
      field.select?.();
      try { return Boolean(document.execCommand('copy')); } finally { field.remove?.(); }
    } catch {
      return false;
    }
  }

  async function writeClipboardText(text) {
    if (!text) return false;
    try {
      if (typeof navigator !== 'undefined' && typeof navigator?.clipboard?.writeText === 'function') {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fall through to legacy textarea copy when clipboard API rejects.
    }
    return legacyClipboardWrite(text);
  }

  function CopyPrompt({
    prompt,
    label,
    copiedLabel = 'Copied',
    statusText = 'Copied to clipboard',
    failedText = 'Copy failed',
    variant = 'outline',
    size = 'sm',
    className,
    onCopied,
  }) {
    const text = typeof prompt === 'string' ? prompt.trim() : '';
    const [copied, setCopied] = useSafeState(false);
    const [failed, setFailed] = useSafeState(false);
    const [announcement, setAnnouncement] = useSafeState('');
    const timerRef = useSafeRef(null);
    useSafeEffect(() => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }, []);
    if (!text) return null;

    const isCopied = copied === true;
    const isFailed = failed === true;
    const triggerCopy = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      writeClipboardText(text).then(ok => {
        setCopied(ok);
        setFailed(!ok);
        let msg = ok ? statusText : failedText;
        if (msg === lastWbCopyAnnouncement) msg += '\u00A0';
        lastWbCopyAnnouncement = msg;
        setAnnouncement(msg);
        if (ok) onCopied?.(text);
        if (typeof setTimeout === 'function') {
          const timer = setTimeout(() => {
            setCopied(false);
            setFailed(false);
            setAnnouncement('');
          }, 2000);
          timer?.unref?.();
          timerRef.current = timer;
        }
      });
    };

    return h(
      'span',
      { className: cx('dsh-wb-copy-wrap', className) },
      h(
        Button,
        {
          type: 'button',
          variant,
          size,
          icon: isCopied ? 'check' : 'copy',
          copied: isCopied,
          'data-copied': isCopied ? 'true' : undefined,
          'data-failed': isFailed ? 'true' : undefined,
          'data-copy-prompt': text,
          title: text,
          onClick: triggerCopy,
        },
        isCopied ? copiedLabel : (label || text),
      ),
      h(
        'span',
        {
          className: 'dsh-wb-copy-status',
          role: 'status',
          'data-visible': isCopied || isFailed ? 'true' : undefined,
        },
        typeof announcement === 'string' ? announcement : '',
      ),
      isFailed ? h('code', { className: 'dsh-wb-copy-fallback', tabIndex: 0 }, text) : null,
    );
  }

  function Dialog({ title, children, onClose, closeLabel = 'Close', className, busy = false, footer, tone, wide = false }) {
    const [style] = useDshStyle(React);
    const [font] = useDshFont(React);
    const titleId = useSafeId('dsh-wb-dialog-title');
    const P = primitives();
    const close = () => {
      if (!busy) onClose?.();
    };
    return h(
      P.Modal,
      {
        open: true,
        headless: true,
        dshStyle: style,
        dshFont: font,
        title,
        closeLabel,
        onClose: close,
        backdropBlur: false,
        className: cx('dsh-wb-dialog', wide && 'dsh-wb-dialog-wide', className),
      },
      h(Styles, { key: 'dsh-wb-dialog-styles' }),
      h(
        'div',
        {
          ref: createOverlaySyncRef(style, font),
          className: 'dsh-wb-dialog-frame',
          'data-dsh-style': style,
          'data-dsh-font': font,
          'data-window-drag-exclude': '',
        },
        h(
          'header',
          { className: 'dsh-wb-dialog-header' },
          h('h2', { id: titleId, 'data-tone': tone, 'data-dsh-editorial-heading': '' }, title),
          h(IconButton, { icon: 'close', label: closeLabel, disabled: busy, onClick: close }),
        ),
        h('div', { className: 'dsh-wb-dialog-body', 'aria-busy': busy ? 'true' : undefined }, children),
        footer ? h('footer', { className: 'dsh-wb-dialog-footer' }, footer) : null,
      ),
    );
  }

  function register(ctx, { id, label, icon, component, inject, order = 50 }) {
    ctx.slots.inject('main', () =>
      ctx.slots.register(
        { name: 'main', key: id, inject: () => ({ ...(inject?.() || {}), workbench: true }) },
        component,
      ),
    );
    ctx.slots.inject('sidebar.panellist', () =>
      ctx.slots.register({ name: 'sidebar.panellist', id, order, label }, function WorkbenchIcon({ size }) {
        return h(Icon, { name: icon, size });
      }),
    );
  }

  const WORKBENCH_V2_CSS = `
.dsh-wb-page,
.dsh-wb-dialog-frame,
.dsh-wb-tour-layer {
  --w-bg-base: var(--dsw-alias-bg-base, #ffffff);
  --w-bg-1: var(--dsw-alias-bg-layer-1, #f8fafc);
  --w-bg-2: var(--dsw-alias-bg-layer-2, #f1f5f9);
  --w-border: var(--dsw-alias-border-l2, #e2e8f0);
  --w-border-strong: var(--dsw-alias-border-l3, #cbd5e1);
  --w-ink: var(--dsw-alias-label-primary, #1e293b);
  --w-muted: var(--dsw-alias-label-secondary, #526075);
  --w-tertiary: var(--dsw-alias-label-tertiary, #64748b);
  --w-accent: var(--dsw-alias-state-business-primary, #4176e6);
  --dsh-plugin-workbench-accent: var(--w-accent);
  --w-accent-soft: var(--dsw-alias-interactive-bg-hover-accent, rgba(65, 118, 230, 0.10));
  --w-hover: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.045));
  --w-active: var(--dsw-alias-interactive-bg-active, rgba(65, 118, 230, 0.11));
  --w-primary-fill: var(--dsw-alias-button-primary-fill, #3b6fe0);
  --w-primary-hover: var(--dsw-alias-button-primary-hover, #2f5fc8);
  --w-primary-ink: var(--dsw-alias-button-primary-ink, #ffffff);
  --w-danger: var(--dsw-alias-state-error-primary, #c6392f);
  --w-danger-soft: var(--dsw-alias-interactive-bg-hover-danger, rgba(198, 57, 47, 0.10));
  --w-warn: var(--dsw-alias-state-warn-primary, #b45309);
  --w-warn-label: var(--dsw-alias-state-warn-label, #92400e);
  --w-warn-soft: var(--dsw-alias-state-warn-tertiary, #fef3c7);
  --w-success: var(--dsw-alias-state-success-primary, #1f7a53);
  --w-link: var(--dsw-alias-link, #2f63d4);
  --w-radius-xs: var(--dsw-radius-xs, 6px);
  --w-radius-sm: var(--dsw-radius-sm, 8px);
  --w-radius-md: var(--dsw-radius-md, 12px);
  box-sizing: border-box;
  color: var(--w-ink);
  font-family: var(--dsh-font-body, var(--dsh-font-family-content, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif));
  font-size: 13px;
  line-height: 20px;
  text-align: start;
}

.dsh-wb-page *,
.dsh-wb-page *::before,
.dsh-wb-page *::after,
.dsh-wb-dialog-frame *,
.dsh-wb-dialog-frame *::before,
.dsh-wb-dialog-frame *::after,
.dsh-wb-tour-layer *,
.dsh-wb-tour-layer *::before,
.dsh-wb-tour-layer *::after {
  box-sizing: border-box;
}

.dsh-wb-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  min-width: 0;
  padding-block-start: var(--dsh-frame-top-clearance, 0px);
  padding-inline-start: var(--dsh-frame-leading-clearance, 0px);
  background-color: var(--w-bg-base);
  container-type: inline-size;
  container-name: dsh-workbench;
}

.dsh-wb-embedded {
  height: min(740px, 82dvh);
  padding: 0;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-radius: var(--w-radius-md);
  overflow: clip;
}

.dsh-wb-header {
  min-height: 48px;
}

.dsh-wb-brand,
.dsh-wb-empty-icon {
  display: grid;
  place-items: center;
  flex: none;
  color: var(--w-accent);
  background: var(--w-accent-soft);
  border-radius: var(--w-radius-sm);
}

:where(.dsh-header-badge.dsh-wb-brand) {
  width: 24px;
  height: 24px;
  border-radius: var(--w-radius-xs);
  background: var(--w-primary-fill);
  color: var(--w-primary-ink);
}

.dsh-wb-header-actions,
.dsh-wb-actions,
.dsh-wb-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.dsh-wb-header-actions {
  margin-inline-start: auto;
  justify-content: flex-end;
  flex: none;
  flex-wrap: nowrap;
  gap: 6px;
}

.dsh-wb-subbar {
  display: flex;
  flex: none;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: var(--w-bg-1);
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.dsh-wb-body,
.dsh-wb-tabs-layout,
.dsh-wb-tab-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.dsh-wb-body {
  overflow: auto;
  overscroll-behavior: contain;
}

.dsh-wb-body:has(> .dsh-wb-tab-panel) {
  overflow: hidden;
}

.dsh-wb-body > [data-plugin-update-footer],
.dsh-wb-tab-panel > [data-plugin-update-footer] {
  flex: none;
  box-sizing: border-box;
  width: 100%;
  min-height: 32px;
  margin: 0;
  padding: 6px 14px;
  background: var(--w-bg-1);
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.dsh-wb-body[data-show-updates="false"] [data-plugin-update-footer] {
  display: none;
}

.dsh-wb-tabs {
  display: flex;
  flex: none;
  align-items: center;
  gap: 2px;
  min-width: 0;
  overflow-x: auto;
  padding: 4px 14px;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-base);
}

.dsh-header .dsh-wb-tabs {
  padding: 0;
  border-block-end: 0;
  background: transparent;
}

.dsh-wb-tab {
  flex: none;
  min-height: 30px;
  padding: 4px 10px;
  border: 0;
  border-radius: var(--w-radius-xs);
  background: transparent;
  color: var(--w-muted);
  font-weight: 550;
  white-space: nowrap;
  box-shadow: none;
}

.dsh-wb-tab[aria-selected="true"] {
  color: var(--w-ink);
  font-weight: 650;
}

.dsh-wb-tabs:not([data-indicator-ready="true"]) .dsh-wb-tab[aria-selected="true"] {
  background: var(--w-hover);
}

.dsh-wb-tab-panel {
  overflow: auto;
  overscroll-behavior: contain;
}

.dsh-wb-tab-panel:has(> .dsh-wb-split) {
  overflow: hidden;
}

.dsh-wb-count,
.dsh-wb-tag {
  display: inline-flex;
  align-items: center;
  flex: none;
  padding: 1px 7px;
  border-radius: var(--w-radius-xs);
  background: var(--w-bg-2);
  color: var(--w-muted);
  font-size: 11.5px;
  line-height: 17px;
  font-weight: 550;
}

.dsh-wb-tag[data-tone="error"],
.dsh-wb-tag[data-tone="critical"],
.dsh-wb-tag[data-tone="high"] {
  background: var(--w-danger-soft);
  color: var(--w-danger);
}

.dsh-wb-tag[data-tone="warn"],
.dsh-wb-tag[data-tone="medium"] {
  background: var(--w-warn-soft);
  color: var(--w-warn-label);
}

.dsh-wb-tag[data-tone="success"] {
  background: var(--w-accent-soft);
  color: var(--w-success);
}

/* Buttons (both host primitives().Button and semantic FallbackButton) */
.dsh-wb-btn.dsh-wb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: auto;
  min-height: 30px;
  padding: 4px 11px;
  border-radius: var(--w-radius-sm);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  font-weight: 550;
  cursor: pointer;
  text-align: center;
  white-space: normal;
  text-decoration: none;
}

.dsh-wb-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dsh-wb-btn-outline {
  background: var(--w-bg-base);
  color: var(--w-ink);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  box-shadow: var(--dsh-button-shadow, none);
}

.dsh-wb-btn-ghost {
  background: transparent;
  color: var(--w-muted);
  border: var(--dsh-control-border-width, 0.5px) solid transparent;
}

.dsh-wb-btn-primary {
  background: var(--w-primary-fill);
  color: var(--w-primary-ink);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-primary-fill);
  box-shadow: var(--dsh-button-shadow, none);
}

.dsh-wb-btn-danger {
  background: var(--w-bg-base);
  color: var(--w-danger);
  border: var(--dsh-control-border-width, 0.5px) solid color-mix(in oklab, var(--w-danger) 32%, var(--w-border));
}

.dsh-wb-icon-btn.dsh-wb-icon-btn {
  flex: none;
  width: 30px;
  min-width: 30px;
  padding-inline: 0;
}

.dsh-fallback-btn-icon {
  display: inline-grid;
  place-items: center;
  flex: none;
}

@media (hover: hover) {
  .dsh-wb-btn-outline:hover:not(:disabled) {
    background: var(--w-hover);
    border-color: var(--w-accent);
  }
  .dsh-wb-btn-ghost:hover:not(:disabled) {
    background: var(--w-hover);
    color: var(--w-ink);
  }
  .dsh-wb-btn-primary:hover:not(:disabled) {
    background: var(--w-primary-hover);
    border-color: var(--w-primary-hover);
  }
  .dsh-wb-btn-danger:hover:not(:disabled) {
    background: var(--w-danger-soft);
    border-color: var(--w-danger);
  }
}

/* Inputs, Textareas, Checkboxes & Choice Menus */
.dsh-wb-input.dsh-wb-input,
.dsh-fallback-input-wrap.dsh-wb-input {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  width: 100%;
  min-height: 32px;
  padding: 3px 10px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  border-radius: var(--w-radius-sm);
  background: var(--w-bg-base);
  color: var(--w-ink);
  box-shadow: none;
}

.dsh-fallback-input-icon {
  display: inline-grid;
  place-items: center;
  flex: none;
  color: var(--w-tertiary);
}

.dsh-wb-input > input {
  flex: 1;
  min-width: 0;
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  padding: 2px 0;
}

.dsh-wb-input:focus-within,
.dsh-wb-textarea:focus-visible {
  border-color: var(--w-accent);
  outline: 2px solid var(--w-accent);
  outline-offset: 1px;
}

.dsh-wb-textarea {
  width: 100%;
  min-width: 0;
  min-height: 120px;
  padding: 8px 11px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  border-radius: var(--w-radius-sm);
  background: var(--w-bg-base);
  color: var(--w-ink);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  resize: vertical;
}

.dsh-wb-checkbox.dsh-wb-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 2px 0;
  color: var(--w-ink);
  cursor: pointer;
  font-size: 13px;
}

.dsh-wb-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  flex: none;
  accent-color: var(--w-accent);
}

.dsh-wb-checkbox-hidden > span {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.dsh-wb-choice {
  display: block;
  min-width: 0;
}

.dsh-wb-choice > .dsh-style-fallback-wrap,
.dsh-wb-menu.dsh-wb-menu {
  display: block;
  width: 100%;
  min-width: 0;
}

.dsh-wb-menu-btn.dsh-wb-menu-btn {
  width: 100%;
  min-height: 32px;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 10px;
  text-align: start;
}

.dsh-wb-menu-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsh-wb-search {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.dsh-wb-search-clear.dsh-wb-search-clear {
  position: absolute;
  inset-inline-end: 3px;
  width: 24px;
  min-width: 24px;
  min-height: 24px;
}

.dsh-wb-search:has(.dsh-wb-search-clear) .dsh-wb-input {
  padding-inline-end: 28px;
}

/* Status Banner */
.dsh-wb-status {
  display: flex;
  flex: none;
  align-items: flex-start;
  gap: 8px;
  margin: 10px 18px 0;
  padding: 9px 12px;
  border-radius: var(--w-radius-sm);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-1);
  color: var(--w-muted);
  font-size: 12.5px;
  line-height: 19px;
}

.dsh-wb-status > svg {
  flex: none;
  margin-block-start: 1.5px;
}

.dsh-wb-status-text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.dsh-wb-status[data-tone="error"] {
  background: var(--w-danger-soft);
  border-color: color-mix(in oklab, var(--w-danger) 28%, var(--w-border));
  color: var(--w-danger);
}

.dsh-wb-status[data-tone="warn"] {
  background: var(--w-warn-soft);
  color: var(--w-warn-label);
}

.dsh-wb-status[data-tone="success"] {
  background: var(--w-accent-soft);
  color: var(--w-success);
}

/* Empty State */
.dsh-wb-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 200px;
  flex: 1;
  padding: 28px 18px;
  text-align: center;
  overflow-wrap: anywhere;
}

.dsh-wb-empty-icon {
  width: 44px;
  height: 44px;
  margin-block-end: 4px;
}

.dsh-wb-empty > h2 {
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  font-weight: 600;
  color: var(--w-ink);
}

.dsh-wb-empty-desc {
  max-width: 44ch;
  color: var(--w-muted);
  font-size: 13px;
  line-height: 20px;
}

/* Master-Detail Split & Interactive Rows */
.dsh-wb-split {
  display: flex;
  flex: 1;
  min-height: 0;
  min-width: 0;
  width: 100%;
}

.dsh-wb-master {
  display: flex;
  flex-direction: column;
  flex: none;
  width: var(--dsh-split-size, var(--dsh-list-width, 360px));
  min-width: 0;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  background: transparent;
}

.dsh-wb-detail {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  overflow-wrap: anywhere;
  padding: 20px 24px;
  background: transparent;
}

@media (prefers-reduced-motion: no-preference) {
  .dsh-wb-detail > article {
    opacity: 1;
    translate: 0px 0px;
    transition: opacity var(--dsh-motion-base, 200ms) var(--dsh-ease-out),
      translate var(--dsh-motion-base, 200ms) var(--dsh-ease-out);
  }
  @starting-style {
    .dsh-wb-detail > article {
      opacity: 0;
      translate: 0px 4px;
    }
  }
}

.dsh-wb-master-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 10px 14px;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-1);
}

.dsh-wb-row {
  display: flex;
  align-items: stretch;
  min-width: 0;
  position: relative;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-inline-start: 3px solid transparent;
}

.dsh-wb-row.is-selected {
  background: var(--w-active);
  border-inline-start-color: var(--w-accent);
}

.dsh-wb-row.is-selected .dsh-wb-tag:not([data-tone]) {
  background: var(--w-accent-soft);
  color: var(--w-accent);
}

.dsh-wb-row-select {
  display: flex;
  align-items: flex-start;
  padding: 14px 0 0 12px;
}

.dsh-wb-row-btn.dsh-wb-row-btn {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
  min-width: 0;
  padding: 12px 14px;
  border: 0 !important;
  box-shadow: none !important;
  background: transparent;
  color: inherit;
  text-align: start;
  cursor: pointer;
}

.dsh-wb-row > .dsh-row-actions {
  align-self: center;
  padding-inline-end: 8px;
}

.dsh-wb-row > .dsh-row-actions .dsh-wb-icon-btn.dsh-wb-icon-btn {
  width: 26px;
  min-width: 26px;
  min-height: 26px;
}

.dsh-wb-row-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.dsh-wb-row-title-wrap {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
}

.dsh-wb-row-title-wrap > strong {
  font-size: 13.5px;
  line-height: 19px;
  font-weight: 600;
  color: var(--w-ink);
  overflow-wrap: anywhere;
}

.dsh-wb-row-meta,
.dsh-wb-row-desc {
  color: var(--w-muted);
  font-size: 12px;
  line-height: 18px;
  overflow-wrap: anywhere;
}

.dsh-wb-row-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dsh-wb-back.dsh-wb-back {
  display: none;
  align-self: flex-start;
  margin-block-end: 12px;
}

/* Details Disclosure with Animated Chevron */
.dsh-wb-details {
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  padding-block: 14px;
}

.dsh-wb-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  list-style: none;
  font-size: 13px;
  font-weight: 600;
  color: var(--w-ink);
}

.dsh-wb-summary::-webkit-details-marker {
  display: none;
}

.dsh-wb-details-body {
  padding-block-start: 10px;
}

/* Interactive Spotlight + Directional Arrow CoachmarkTour & CopyPrompt */
[popover]:is(:popover-open, .\\:popover-open) {
  display: block;
}

.dsh-wb-tour-trigger.dsh-wb-tour-trigger {
  font-weight: 600;
}

.dsh-wb-tour-layer {
  --tour-accent: var(--dsw-alias-state-business-primary, #4176e6);
  --tour-bg: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-base, #ffffff));
  --tour-ink: var(--dsw-alias-label-primary, #1b2230);
  --tour-muted: var(--dsw-alias-label-secondary, #5b667a);
  --tour-border: var(--dsw-alias-border-l2, #d8e0ec);
  --tour-radius: var(--dsw-radius-md, 12px);
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  overflow: visible;
  pointer-events: none;
  z-index: 2147483000;
  color: var(--tour-ink);
  font-size: 13px;
  line-height: 1.55;
  font-family: var(--dsh-font-body, var(--ds-font-family-ui, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif));
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] {
  --tour-radius: 0px;
}

.dsh-wb-tour-spotlight {
  position: fixed;
  pointer-events: none;
  border-radius: calc(var(--tour-radius) * 0.75 + 2px);
  box-shadow:
    0 0 0 2px var(--tour-accent),
    0 0 0 5px color-mix(in oklab, var(--tour-accent) 22%, transparent),
    0 0 0 9999px rgba(15, 23, 42, 0.26);
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-spotlight {
  border-radius: 0px;
}

.dsh-wb-tour-backdrop {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: rgba(15, 23, 42, 0.24);
}

.dsh-wb-tour-card {
  position: fixed;
  inset: auto;
  margin: 0;
  width: min(328px, calc(100dvw - 24px));
  max-block-size: calc(100dvh - 24px);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 13px 15px 12px;
  border: 1px solid var(--tour-border);
  border-radius: var(--tour-radius);
  background: var(--tour-bg);
  color: var(--tour-ink);
  box-shadow: var(--dsw-elevation-prominent, 0 16px 40px rgba(15, 23, 42, 0.18));
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-card {
  border-width: 2px;
  border-color: #1e2826;
  box-shadow: 4px 4px 0px #1e2826;
}

.dsh-wb-tour-arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--tour-bg);
  transform: rotate(45deg);
  pointer-events: none;
}

.dsh-wb-tour-card[data-side="bottom"] > .dsh-wb-tour-arrow {
  top: -6px;
  left: calc(var(--arrow-x, 28px) - 5px);
  border-top: 1px solid var(--tour-border);
  border-left: 1px solid var(--tour-border);
}

.dsh-wb-tour-card[data-side="top"] > .dsh-wb-tour-arrow {
  bottom: -6px;
  left: calc(var(--arrow-x, 28px) - 5px);
  border-bottom: 1px solid var(--tour-border);
  border-right: 1px solid var(--tour-border);
}

.dsh-wb-tour-card[data-side="right"] > .dsh-wb-tour-arrow {
  left: -6px;
  top: calc(var(--arrow-y, 24px) - 5px);
  border-bottom: 1px solid var(--tour-border);
  border-left: 1px solid var(--tour-border);
}

.dsh-wb-tour-card[data-side="left"] > .dsh-wb-tour-arrow {
  right: -6px;
  top: calc(var(--arrow-y, 24px) - 5px);
  border-top: 1px solid var(--tour-border);
  border-right: 1px solid var(--tour-border);
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-card[data-side="bottom"] > .dsh-wb-tour-arrow {
  border-top: 2px solid #1e2826;
  border-left: 2px solid #1e2826;
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-card[data-side="top"] > .dsh-wb-tour-arrow {
  border-bottom: 2px solid #1e2826;
  border-right: 2px solid #1e2826;
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-card[data-side="right"] > .dsh-wb-tour-arrow {
  border-bottom: 2px solid #1e2826;
  border-left: 2px solid #1e2826;
}

.dsh-wb-tour-layer[data-dsh-style="pixel8bit"] .dsh-wb-tour-card[data-side="left"] > .dsh-wb-tour-arrow {
  border-top: 2px solid #1e2826;
  border-right: 2px solid #1e2826;
}

.dsh-wb-tour-card[data-side="center"] > .dsh-wb-tour-arrow {
  display: none;
}

.dsh-wb-tour-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.dsh-wb-tour-step-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dsh-wb-tour-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px 7px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  background: color-mix(in oklab, var(--tour-accent) 14%, transparent);
  color: var(--tour-accent);
}

.dsh-wb-tour-dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.dsh-wb-tour-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--tour-border);
}

.dsh-wb-tour-dot[data-active="true"] {
  width: 14px;
  background: var(--tour-accent);
}

.dsh-wb-tour-skip {
  min-block-size: 24px;
  min-inline-size: 24px;
  padding: 2px 6px;
  border: 0;
  border-radius: var(--dsw-radius-xs, 6px);
  background: transparent;
  color: var(--tour-muted);
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
}

.dsh-wb-tour-skip:hover {
  color: var(--tour-ink);
  background: var(--dsw-alias-interactive-bg-hover, rgba(15, 23, 42, 0.05));
}

.dsh-wb-tour-title {
  margin: 0;
  font-size: 14px;
  line-height: 1.38;
  font-weight: 650;
  color: var(--tour-ink);
}

.dsh-wb-tour-desc {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--tour-muted);
}

.dsh-wb-tour-inline-action {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding-block-start: 2px;
}

.dsh-wb-tour-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-block-start: 2px;
  padding-block-start: 8px;
  border-block-start: 0.5px solid var(--tour-border);
}

.dsh-wb-tour-nav {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-inline-start: auto;
}

@media (pointer: coarse) {
  .dsh-wb-tour-skip {
    min-block-size: 32px;
    padding: 4px 10px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .dsh-wb-tour-spotlight {
    transition:
      top 0.24s cubic-bezier(0.22, 1, 0.36, 1),
      left 0.24s cubic-bezier(0.22, 1, 0.36, 1),
      width 0.24s cubic-bezier(0.22, 1, 0.36, 1),
      height 0.24s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .dsh-wb-tour-card {
    transition: top 0.22s cubic-bezier(0.22, 1, 0.36, 1), left 0.22s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .dsh-wb-tour-dot {
    transition: width 0.2s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dsh-wb-tour-spotlight,
  .dsh-wb-tour-card,
  .dsh-wb-tour-dot {
    transition: none;
  }
}

.dsh-wb-prompt-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
}

.dsh-wb-empty .dsh-wb-prompt-chips {
  justify-content: center;
}

.dsh-wb-copy-wrap {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  max-width: 100%;
}

.dsh-wb-copy-status {
  font-size: 11.5px;
  line-height: 17px;
  color: var(--w-muted);
  opacity: 0;
  pointer-events: none;
  max-inline-size: 0;
  overflow: clip;
  white-space: nowrap;
  transition: opacity 0.16s ease;
}

.dsh-wb-copy-status[data-visible="true"] {
  opacity: 1;
  max-inline-size: 280px;
  padding: 2px 6px;
  border-radius: var(--w-radius-xs);
  background: var(--w-bg-2);
}

.dsh-wb-copy-fallback {
  display: inline-block;
  max-width: 100%;
  padding: 2px 6px;
  border-radius: var(--w-radius-xs);
  background: var(--w-bg-2);
  color: var(--w-ink);
  font: 11.5px/1.5 var(--dsh-font-mono, ui-monospace, SFMono-Regular, Consolas, monospace);
  overflow-wrap: anywhere;
  user-select: text;
}

/* Portaled / Fallback Modal Dialog */
.dsh-wb-dialog.dsh-wb-dialog {
  box-sizing: border-box;
  width: min(560px, 100%);
  max-height: 100%;
  min-height: 0;
  padding: 0;
  gap: 0;
  border: 0;
  background: var(--w-bg-1);
  box-shadow: var(--dsw-elevation-prominent);
}

.dsh-wb-dialog-wide.dsh-wb-dialog-wide {
  width: min(860px, 100%);
  max-width: min(860px, calc(100dvw - 32px));
}

.dsh-wb-dialog-frame {
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: calc(100dvh - 40px);
  background: var(--w-bg-1);
  color: var(--w-ink);
}

.dsh-wb-dialog-header,
.dsh-wb-dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: none;
  gap: 8px;
  padding: 12px 18px;
  background: var(--w-bg-base);
}

.dsh-wb-dialog-header {
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.dsh-wb-dialog-header > h2 {
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  font-weight: 650;
  color: var(--w-ink);
}

.dsh-wb-dialog-header > h2[data-tone="warn"] {
  color: var(--w-warn);
}

.dsh-wb-dialog-body {
  min-height: 0;
  min-width: 0;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 18px;
}

.dsh-wb-dialog-footer {
  flex-wrap: wrap;
  justify-content: flex-end;
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

/* Focus Indicators */
.dsh-wb-page :focus-visible,
.dsh-wb-dialog-frame :focus-visible,
.dsh-wb-tour-layer :focus-visible {
  outline: 2px solid var(--w-accent);
  outline-offset: 2px;
}

/* Container Queries */
@container dsh-workbench (max-width: 760px) {
  .dsh-wb-header {
    flex-wrap: wrap;
    padding: 6px 12px;
  }
  .dsh-wb-header-actions {
    width: 100%;
    margin-inline-start: 0;
    justify-content: flex-start;
  }
  .dsh-wb-tabs {
    padding-inline: 8px;
  }
  .dsh-wb-tab-panel:has(> .dsh-wb-split) {
    overflow: auto;
  }
  .dsh-wb-split {
    display: flex;
    flex-direction: column;
    min-height: 360px;
  }
  .dsh-wb-split > .dsh-split-resizer {
    display: none;
  }
  .dsh-wb-split[data-selected="false"] > .dsh-wb-detail {
    display: none;
  }
  .dsh-wb-split[data-selected="true"] > .dsh-wb-master {
    display: none;
  }
  .dsh-wb-master {
    width: 100% !important;
    flex: 1;
    border-inline-end: 0;
  }
  .dsh-wb-detail {
    padding: 16px 14px;
  }
  .dsh-wb-back.dsh-wb-back {
    display: inline-flex;
  }
}
`;

  const styles = WORKBENCH_V2_CSS + '\n' + DSH_THEMES_AND_MOTION_CSS;

  function ensureStylesInHead() {
    if (typeof document === 'undefined' || !document.head || typeof document.querySelector !== 'function') {
      return false;
    }
    const id = 'dsh-workbench-ui-v3';
    if (!document.querySelector('style[data-plugin-css="' + id + '"]')) {
      const styleEl = document.createElement('style');
      styleEl.setAttribute('data-plugin-css', id);
      styleEl.textContent = styles;
      document.head.appendChild(styleEl);
    }
    return true;
  }

  function Styles() {
    useSafeEffect(() => {
      ensureStylesInHead();
    }, []);
    if (ensureStylesInHead()) return null;
    return h('style', { 'data-plugin-css': 'dsh-workbench-ui-v3' }, styles);
  }

  return {
    Icon,
    Button,
    IconButton,
    Input,
    Checkbox,
    Switch,
    ChoiceMenu,
    Search,
    Page,
    Tabs,
    TabPanel,
    Status,
    Empty,
    Split,
    SplitResizer: DshSplitResizer,
    Skeleton,
    Row,
    Details,
    CopyPrompt,
    CoachmarkTour,
    computeTourLayout,
    writeClipboardText,
    Dialog,
    StyleSwitcher,
    FontSwitcher,
    Styles,
    register,
    primitives,
    styles,
    DSH_STYLES,
    DSH_DEFAULT_STYLE,
    normalizeDshStyle,
    getDshStylePreset,
    useDshStyle,
    readDshStyle,
    writeDshStyle,
    subscribeDshStyle,
    DSH_FONTS,
    DSH_DEFAULT_FONT,
    normalizeDshFont,
    getDshFontPreset,
    useDshFont,
    readDshFont,
    writeDshFont,
    subscribeDshFont,
    syncPortaledFont,
    syncPortaledOverlays,
    createOverlaySyncRef,
    useResizableSplit,
    useSlidingTabIndicator,
  };
}

// Editable browser entry. Build with node scripts/build-client.mjs.
// Browser source, distributed directly; the TypeScript build preserves this file.
window.__ModuleLoader__.load(__stardustUpdatesWrap({ id: 'dsh-code-security', factory: require => {
        const React = require('react'), { useState, useEffect, useRef, useMemo } = React, h = React.createElement;
        const W = createWorkbenchUI(React, require);
/** 「检查工具」的自检结果：用户点了按钮就必须看到检查项，而不是只有引擎徽标。 */
function HealthReport({ result }) {
  const checks = Array.isArray(result?.checks) ? result.checks : [];
  const engines = Array.isArray(result?.configuredEngines) ? result.configuredEngines : [];
  return h(
    'div',
    { className: 'secw-health', 'data-dsh-card': '' },
    h(
      W.Status,
      { tone: result.ok === false ? 'error' : 'success', className: 'secw-inline-status' },
      result.ok === false
        ? t('自检发现问题：按下面的检查项逐条处理。', 'Self-check found issues. Work through the checks below.')
        : t('自检正常：下面是本次检查实际使用的配置与目录。', 'Self-check passed. These are the settings and paths this run uses.'),
    ),
    h(
      'ul',
      { className: 'secw-checklist' },
      checks.map((check, index) =>
        h(
          'li',
          { key: index, 'data-ok': check.ok !== false },
          h('strong', null, String(check.name) + t('：', ': ')),
          String(check.detail ?? ''),
        ),
      ),
    ),
    h(
      'p',
      { className: 'secw-muted' },
      t('已选引擎：', 'Selected engines: ') +
        (engines.length ? engines.map(engine => names[engine] || engine).join(', ') : t('无（只用内置规则）', 'None (built-in rules only)')),
    ),
  );
}

function SecurityPromptChip({ prompt, label, variant = 'outline', className }) {
  return h(W.CopyPrompt, {
    prompt,
    label,
    variant,
    className,
    copiedLabel: t('已复制', 'Copied'),
    statusText: t('已复制指令，粘贴到对话发送即可', 'Prompt copied — paste into chat'),
    failedText: t('复制失败', 'Copy failed'),
  });
}

function filterFindingsLocal(list, freshSet, activeFilter) {
  const rows = Array.isArray(list) ? list : [];
  if (activeFilter === 'new') return rows.filter(f => freshSet?.has?.(f.id));
  if (activeFilter === 'critical') return rows.filter(f => f.severity === 'critical');
  if (activeFilter === 'high') return rows.filter(f => f.severity === 'high');
  if (activeFilter === 'medium') return rows.filter(f => f.severity === 'medium');
  if (activeFilter === 'low') return rows.filter(f => f.severity === 'low');
  if (activeFilter === 'high-risk') return rows.filter(f => ['critical', 'high'].includes(f.severity));
  return rows;
}

function remediationHint(finding) {
  const cwe = String(finding?.cwe || '').toUpperCase();
  const rule = String(finding?.ruleId || '').toUpperCase();
  if (finding?.engine === 'betterleaks' || cwe === 'CWE-798' || rule.startsWith('SEC-3')) {
    return t(
      '立即轮换受影响密钥并改为环境变量或密钥管理服务注入；核对是否为公开常量或测试夹具，修复后点击「复查修复」确认关闭。',
      'Rotate the exposed secret and load credentials from environment or a secret vault; verify test fixtures, then click Recheck fixes.',
    );
  }
  if (cwe === 'CWE-78') {
    return t(
      '避免将外部输入拼接进 shell 命令字符串，优先改用参数数组（如 execFile / spawn 且 shell: false）并对参数做白名单校验。',
      'Avoid interpolating untrusted input into shell commands; use argument arrays (execFile / spawn with shell: false) and strict allowlists.',
    );
  }
  if (cwe === 'CWE-79') {
    return t(
      '优先使用安全的文本插值而非直接写入 HTML；确需富文本渲染时使用未经遮蔽的 DOMPurify 净化并核对页面上下文。',
      'Prefer safe text interpolation over raw HTML sinks; when rendering HTML, sanitize with trusted DOMPurify for the exact DOM context.',
    );
  }
  if (cwe === 'CWE-89') {
    return t(
      '使用参数化查询或预编译语句绑定变量，不要将请求参数直接拼接进 SQL 文本。',
      'Use parameterized queries or prepared statements instead of concatenating request input into SQL strings.',
    );
  }
  if (cwe === 'CWE-95' || cwe === 'CWE-94') {
    return t(
      '移除 eval / new Function 等动态代码求值，改用结构化解析器、安全表达式白名单或显式映射表。',
      'Replace dynamic evaluation (eval / new Function) with structured parsers, allowlisted expressions, or explicit dispatch tables.',
    );
  }
  return t(
    '核对触发路径与输入边界，优先在源头做类型与范围校验；完成修改后点击「复查修复」对同一范围闭环重验。',
    'Verify trigger conditions and input boundaries, patch at the root cause, and click Recheck fixes on the same scope to confirm closure.',
  );
}

function computePosture(report, allFindings) {
  if (report?.complete === false) {
    return { score: 50, tone: 'warn', label: t('检查未完成', 'INCOMPLETE') };
  }
  const list = Array.isArray(allFindings) ? allFindings : [];
  if (!list.length) {
    return { score: 100, tone: 'ok', label: t('态势正常', 'NOMINAL') };
  }
  let penalty = 0;
  let hasCritOrHigh = false;
  let hasMed = false;
  for (const f of list) {
    if (f.severity === 'critical') {
      penalty += 26;
      hasCritOrHigh = true;
    } else if (f.severity === 'high') {
      penalty += 16;
      hasCritOrHigh = true;
    } else if (f.severity === 'medium') {
      penalty += 8;
      hasMed = true;
    } else {
      penalty += 3;
    }
  }
  const score = Math.max(8, Math.min(98, 100 - penalty));
  if (hasCritOrHigh) return { score, tone: 'danger', label: t('高危告警', 'ALERT') };
  if (hasMed) return { score, tone: 'warn', label: t('需要关注', 'CAUTION') };
  return { score, tone: 'ok', label: t('低风险提示', 'ADVISORY') };
}

function SecurityResults({
  report,
  findings,
  fresh,
  filter,
  setFilter,
  limit,
  setLimit,
  viewMode: controlledViewMode,
  setViewMode: controlledSetViewMode,
  busy,
  loading,
  disabled = false,
  onRun,
  download,
  onOpen,
  onCopy,
  copiedId,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [localFilter, setLocalFilter] = useState('all');
  const [localViewMode, setLocalViewMode] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? window.localStorage?.getItem('dsh-code-security:view-mode') : null;
      return saved === 'list' ? 'list' : 'cockpit';
    } catch {
      return 'cockpit';
    }
  });
  const viewMode = controlledViewMode || localViewMode;
  const setViewMode = next => {
    const mode = next === 'list' ? 'list' : 'cockpit';
    if (controlledSetViewMode) controlledSetViewMode(mode);
    else {
      setLocalViewMode(mode);
      try {
        if (typeof window !== 'undefined') window.localStorage?.setItem('dsh-code-security:view-mode', mode);
      } catch {}
    }
  };
  const activeFilter = setFilter ? (filter || 'all') : localFilter;
  const applyFilter = next => {
    if (setFilter) setFilter(next);
    else setLocalFilter(next);
    setLimit?.(50);
    setSelectedId(null);
  };

  const allFindings = Array.isArray(report?.findings) ? report.findings : (Array.isArray(findings) ? findings : []);
  const displayedFindings = setFilter ? (Array.isArray(findings) ? findings : []) : filterFindingsLocal(allFindings, fresh, activeFilter);
  const activeIndex = displayedFindings.length
    ? Math.max(0, displayedFindings.findIndex(finding => finding.id === selectedId))
    : -1;
  const active = activeIndex >= 0 ? displayedFindings[activeIndex] : null;
  const visible = displayedFindings.slice(0, limit);

  if (loading && !report) {
    return h(
      'div',
      { className: 'secw-skeleton-split dsh-split-pane' },
      h(
        'div',
        { className: 'secw-skeleton-list dsh-split-leading', style: { '--dsh-split-size': '370px' } },
        [0, 1, 2, 3, 4].map(i => h(W.Skeleton, { key: i, variant: 'row' })),
      ),
      h(
        'div',
        { className: 'secw-skeleton-detail dsh-split-trailing' },
        h(W.Skeleton, { variant: 'card', label: t('正在载入检查结果…', 'Loading scan results…') }),
        h(W.Skeleton, { variant: 'text', lines: 4 }),
      ),
    );
  }
  if (!report?.hasScan) {
    const actionDisabled = Boolean(disabled || busy || loading);
    return h(
      W.Empty,
      {
        title: t('尚未检查此项目', 'This project has not been checked'),
        icon: 'shield',
        action: h(
          'div',
          { className: 'secw-empty-stack' },
          h(
            'div',
            { className: 'dsh-wb-actions secw-empty-ctas' },
            h(
              W.Button,
              {
                variant: 'primary',
                icon: 'shield',
                disabled: actionDisabled,
                'data-sec-empty-action': 'scan',
                onClick: () => onRun?.('scan'),
              },
              t('检查代码', 'Scan code'),
            ),
            h(
              W.Button,
              {
                variant: 'outline',
                icon: 'search',
                disabled: actionDisabled,
                'data-sec-empty-action': 'diff',
                onClick: () => onRun?.('diff'),
              },
              t('检查改动', 'Check changes'),
            ),
          ),
          h(
            'div',
            { className: 'dsh-wb-prompt-chips' },
            h(SecurityPromptChip, {
              prompt: t(
                '审查当前 Git 改动的安全问题，给出触发条件、文件位置和脱敏证据',
                'Review current Git changes for security issues with triggers, file locations, and redacted evidence',
              ),
              label: t('复制指令：审查 Git 改动', 'Copy prompt: Check Git diff'),
            }),
            h(SecurityPromptChip, {
              prompt: t(
                '检查这个项目的安全问题并按高风险优先汇总',
                'Check this project for security issues and prioritize high-risk findings',
              ),
              label: t('复制指令：全仓巡检', 'Copy prompt: Scan project'),
            }),
          ),
        ),
      },
      t(
        '直接点击下方按钮开始本地检查（内置规则无需额外安装），或一键复制指令发到项目聊天。',
        'Start a local check right below (built-in rules need no extra installation), or copy a prompt into your project chat.',
      ),
    );
  }

  const filterItems = [
    { id: 'all', label: t('全部问题', 'All findings') },
    { id: 'new', label: t('仅新增', 'New only') },
    { id: 'high-risk', label: t('高风险（严重+高）', 'High risk (Crit+High)') },
    { id: 'critical', label: t('严重', 'Critical') },
    { id: 'high', label: t('高', 'High') },
    { id: 'medium', label: t('中', 'Medium') },
    { id: 'low', label: t('低', 'Low') },
  ];
  const newCount = Object.values(report.newCounts || {}).reduce((a, b) => a + Number(b), 0) || (fresh?.size || 0);
  const acceptedCount = Object.values(report.acceptedCounts || {}).reduce((a, b) => a + Number(b), 0);
  const scopePath = report.scope?.target || report.target || '.';
  const isDiffScope = report.scope?.kind === 'diff' || String(report.mode || '').startsWith('diff');

  const viewToggle = h(
    'div',
    {
      className: 'secw-view-toggle',
      role: 'group',
      'aria-label': t('结果视图模式', 'Results view mode'),
      'data-tour': 'sec-view-toggle',
      'data-window-drag-exclude': '',
    },
    h(
      'button',
      {
        type: 'button',
        className: 'secw-view-toggle-btn',
        'data-sec-view-toggle': 'cockpit',
        'data-active': viewMode === 'cockpit' ? 'true' : 'false',
        'aria-pressed': viewMode === 'cockpit',
        onClick: () => setViewMode('cockpit'),
      },
      t('仪器台', 'Cockpit'),
    ),
    h(
      'button',
      {
        type: 'button',
        className: 'secw-view-toggle-btn',
        'data-sec-view-toggle': 'list',
        'data-active': viewMode === 'list' ? 'true' : 'false',
        'aria-pressed': viewMode === 'list',
        onClick: () => setViewMode('list'),
      },
      t('列表', 'List'),
    ),
  );

  // IMPORTANT: First child MUST remain div.security-report-meta for saved-context & accessibility contract!
  const reportMetaEl = h(
    'div',
    { className: 'security-report-meta' },
    h(
      'p',
      { className: 'secw-muted' },
      h('strong', null, t('最近检查：', 'Last checked: ')),
      report.time && Number.isFinite(Date.parse(report.time))
        ? h('time', { dateTime: report.time }, new Date(report.time).toLocaleString(english() ? 'en-US' : 'zh-CN'))
        : t('时间未知', 'Unknown time'),
      ' · ' + t('范围：', 'Scope: ') + scopePath,
      ' · ' + (isDiffScope ? t('Git 改动', 'Git changes') : t('文件扫描', 'File scan')),
    ),
    h(
      'p',
      { className: 'secw-muted' },
      t(
        '这是保存的检查结果，更新插件不会自动重扫。“新增”指尚未接受的命中，测试夹具和公开常量需核对用途。',
        'These are saved results; plugin updates do not rerun checks. “New” means not accepted in the baseline. Review test fixtures and public constants in context.',
      ),
    ),
  );

  const statusAndToggleBar = h(
    'div',
    { className: 'secw-status-bar' },
    h(
      W.Status,
      { tone: report.complete === false ? 'warn' : report.passed ? 'success' : 'info', className: 'secw-status-flex' },
      h(
        'strong',
        null,
        report.complete === false
          ? t('检查未完成', 'Check incomplete')
          : report.passed
            ? t('未发现达到阈值的新增问题', 'No new findings reached the threshold')
            : t('有问题需要核对', 'Findings need review'),
      ),
      ' · ' + t('新增 ', 'New ') + newCount + ' · ' + t('已接受 ', 'Accepted ') + acceptedCount,
    ),
    viewToggle,
  );

  if (viewMode === 'list') {
    return h(
      React.Fragment,
      null,
      reportMetaEl,
      statusAndToggleBar,
      h(W.Split, {
        listWidth: 370,
        splitKey: 'dsh-code-security:split-width',
        minWidth: 260,
        maxWidth: 560,
        resizerLabel: t('调整问题列表宽度', 'Resize findings list'),
        selected: selectedId && displayedFindings.some(finding => finding.id === selectedId) ? selectedId : null,
        onBack: () => setSelectedId(null),
        backLabel: t('返回问题列表', 'Back to findings'),
        list: h(
          'div',
          { className: 'secw-master-pane' },
          h(
            'div',
            { className: 'dsh-wb-master-toolbar' },
            h(W.ChoiceMenu, {
              icon: 'filter',
              label: t('问题筛选', 'Filter findings'),
              value: activeFilter,
              items: filterItems,
              className: 'secw-filter-menu',
              onChange: next => applyFilter(next),
            }),
          ),
          busy
            ? h(
                'div',
                { className: 'secw-busy-skeleton' },
                h(W.Skeleton, { variant: 'row', label: t('正在更新检查结果…', 'Updating scan results…') }),
              )
            : null,
          visible.map(finding =>
            h(W.Row, {
              key: finding.id,
              title: describeFinding(finding).title,
              active: finding.id === active?.id,
              meta: finding.file + ':' + finding.line,
              description: describeFinding(finding).detail,
              status: risk(finding.severity),
              statusTone: finding.severity,
              onClick: () => setSelectedId(finding.id),
              className: 'security-list-' + finding.severity,
              actions: h(
                React.Fragment,
                null,
                h(W.IconButton, {
                  icon: copiedId === finding.id ? 'check' : 'copy',
                  copied: copiedId === finding.id,
                  label: copiedId === finding.id ? t('已复制', 'Copied') : t('复制位置', 'Copy location'),
                  'data-sec-quick-action': 'copy',
                  onClick: () => onCopy?.(finding),
                }),
                h(W.IconButton, {
                  icon: 'external',
                  label: t('打开文件', 'Open file'),
                  'data-sec-quick-action': 'open',
                  onClick: () => onOpen?.(finding),
                }),
              ),
            }),
          ),
          !displayedFindings.length ? h(W.Empty, { title: t('此筛选下没有问题。', 'No findings match this filter.'), icon: 'shield' }) : null,
          displayedFindings.length > limit
            ? h(
                'div',
                { className: 'secw-more-wrap' },
                h(W.Button, { className: 'security-more', onClick: () => setLimit?.(n => n + 50) }, t('显示更多', 'Show more')),
              )
            : null,
          (report.findingsTotal ?? 0) > 200
            ? h(
                'p',
                { className: 'secw-muted security-list-note' },
                t('面板最多展示 200 项，完整结果请导出报告。', 'The panel shows up to 200 findings. Export the full report for all results.'),
              )
            : null,
        ),
        detail: h(
          React.Fragment,
          null,
          active
            ? h(FindingCard, {
                key: active.id,
                finding: active,
                fresh: fresh.has(active.id),
                copied: copiedId === active.id,
                onOpen,
                onCopy,
              })
            : h(W.Empty, { title: t('没有匹配的问题', 'No matching findings'), icon: 'shield' }),
          h(W.Details, { summary: t('检查覆盖范围', 'Check coverage'), className: 'secw-coverage-details' }, h(Coverage, { rows: report.coverage })),
          h(
            'div',
            { className: 'secw-detail-footer' },
            h(W.Button, { icon: 'download', disabled: busy, onClick: () => download?.('sarif') }, t('下载 SARIF', 'Download SARIF')),
            h(W.Button, { icon: 'download', disabled: busy, onClick: () => download?.('markdown') }, t('下载 Markdown', 'Download Markdown')),
          ),
        ),
      }),
    );
  }

  // DEFAULT BESPOKE VIEW: 精密雷达态势仪 (Braun / Teenage Engineering Hardware Instrument Cockpit)
  const counts = {
    all: allFindings.length,
    critical: allFindings.filter(f => f.severity === 'critical').length,
    high: allFindings.filter(f => f.severity === 'high').length,
    medium: allFindings.filter(f => f.severity === 'medium').length,
    low: allFindings.filter(f => f.severity === 'low').length,
    new: allFindings.filter(f => fresh?.has?.(f.id)).length,
  };
  const posture = computePosture(report, allFindings);
  const arcTotal = 141.4; // approx pi * 45
  const arcOffset = Number((arcTotal * (1 - posture.score / 100)).toFixed(1));
  const actionDisabled = Boolean(disabled || busy || loading);

  const matrixPageStart = activeIndex >= 0 ? Math.floor(activeIndex / 24) * 24 : 0;
  const matrixSlice = displayedFindings.slice(matrixPageStart, matrixPageStart + 24);
  const matrixOverflow = Math.max(0, displayedFindings.length - (matrixPageStart + 24));
  const ledSlots = Array.from({ length: 24 }, (_, idx) => matrixSlice[idx] || null);

  const stepFinding = delta => {
    if (!displayedFindings.length) return;
    const base = activeIndex >= 0 ? activeIndex : 0;
    const nextIdx = (base + delta + displayedFindings.length) % displayedFindings.length;
    setSelectedId(displayedFindings[nextIdx].id);
  };

  const filterKeys = [
    { id: 'all', label: t('全部', 'ALL'), count: counts.all, tone: 'neutral' },
    { id: 'critical', label: t('严重', 'CRIT'), count: counts.critical, tone: 'critical' },
    { id: 'high', label: t('高', 'HIGH'), count: counts.high, tone: 'high' },
    { id: 'medium', label: t('中', 'MED'), count: counts.medium, tone: 'medium' },
    { id: 'low', label: t('低', 'LOW'), count: counts.low, tone: 'low' },
    { id: 'new', label: t('新增', 'NEW'), count: counts.new, tone: 'warn' },
  ];

  const activeInfo = active ? describeFinding(active) : null;
  const snippetLines = active ? String(active.snippet || '').split(/\r?\n/) : [];
  const startLineNum = Math.max(1, Number(active?.line) || 1);
  const fixPrompt = active
    ? t(
        '请核对并修复 ' + active.file + ':' + active.line + ' 的安全问题（' + active.ruleId + ' / ' + active.cwe + '），修完后对同一范围复查确认关闭',
        'Review and fix the security finding at ' + active.file + ':' + active.line + ' (' + active.ruleId + ' / ' + active.cwe + '), then recheck the same scope',
      )
    : '';

  return h(
    React.Fragment,
    null,
    reportMetaEl,
    statusAndToggleBar,
    h(
      'div',
      { className: 'secw-cockpit-stage', 'data-sec-view': 'cockpit' },
      // Industrial Hardware Instrument Deck (Braun / Teenage Engineering ceramic bezel + recessed dark-olive OLED)
      h(
        'section',
        { className: 'secw-cockpit-deck', 'data-dsh-card': '', 'aria-label': t('安全雷达态势仪器台', 'Security radar telemetry instrument deck') },
        h(
          'div',
          { className: 'secw-deck-chassis-head' },
          h(
            'div',
            { className: 'secw-deck-model' },
            h('span', { className: 'secw-power-led', 'data-tone': posture.tone, 'aria-hidden': 'true' }),
            h('span', { className: 'secw-deck-serial' }, 'OP-SEC // RADAR-24'),
            h('span', { className: 'secw-deck-edition' }, t('精密态势监测仪', 'TELEMETRY COCKPIT')),
          ),
          h(
            'div',
            { className: 'secw-deck-louvers', 'aria-hidden': 'true' },
            [0, 1, 2, 3, 4, 5].map(i => h('span', { key: i, className: 'secw-louver-dot' })),
          ),
        ),
        // Recessed Dark-Olive OLED Screen
        h(
          'div',
          { className: 'secw-oled-screen', 'data-sec-oled': '', 'data-tour': 'sec-oled-radar' },
          // Left OLED Bay: Posture Gauge + Total/New + Live Scope + Active Rule Telemetry
          h(
            'div',
            { className: 'secw-oled-bay secw-oled-left' },
            h(
              'div',
              { className: 'secw-oled-bay-head' },
              h('span', { className: 'secw-oled-kicker' }, t('态势总览 · POSTURE', 'SECURITY POSTURE')),
              h('span', { className: 'secw-oled-badge', 'data-tone': posture.tone }, posture.label),
            ),
            h(
              'div',
              { className: 'secw-posture-row' },
              h(
                'div',
                { className: 'secw-gauge-wrap', 'aria-label': t('安全态势指数 ', 'Security posture score ') + posture.score },
                h(
                  'svg',
                  { className: 'secw-gauge-svg', viewBox: '0 0 110 64', 'aria-hidden': 'true' },
                  h('path', { className: 'secw-gauge-track', d: 'M 10 56 A 45 45 0 0 1 100 56' }),
                  h('path', {
                    className: 'secw-gauge-arc',
                    'data-tone': posture.tone,
                    d: 'M 10 56 A 45 45 0 0 1 100 56',
                    style: { strokeDasharray: String(arcTotal), strokeDashoffset: String(arcOffset) },
                  }),
                ),
                h(
                  'div',
                  { className: 'secw-gauge-value', 'data-tone': posture.tone },
                  h('strong', null, String(posture.score)),
                  h('small', null, '/100'),
                ),
              ),
              h(
                'div',
                { className: 'secw-oled-counters' },
                h(
                  'div',
                  { className: 'secw-oled-stat' },
                  h('span', { className: 'secw-oled-stat-label' }, t('命中总数', 'TOTAL')),
                  h('strong', { className: 'secw-oled-stat-val', 'data-tone': allFindings.length ? 'amber' : 'mint' }, String(allFindings.length)),
                ),
                h(
                  'div',
                  { className: 'secw-oled-stat' },
                  h('span', { className: 'secw-oled-stat-label' }, t('未接受新增', 'NEW')),
                  h('strong', { className: 'secw-oled-stat-val', 'data-tone': newCount ? 'vermilion' : 'mint' }, String(newCount)),
                ),
                h(
                  'div',
                  { className: 'secw-oled-stat' },
                  h('span', { className: 'secw-oled-stat-label' }, t('当前筛选', 'MATCH')),
                  h('strong', { className: 'secw-oled-stat-val', 'data-tone': 'mint' }, String(displayedFindings.length)),
                ),
              ),
            ),
            h(
              'div',
              { className: 'secw-oled-telemetry' },
              h(
                'div',
                { className: 'secw-oled-line' },
                h('span', { className: 'secw-oled-key' }, 'SCOPE'),
                h('code', { className: 'secw-oled-val' }, scopePath + ' [' + (isDiffScope ? 'GIT DIFF' : 'WORKSPACE') + ']'),
              ),
              h(
                'div',
                { className: 'secw-oled-line' },
                h('span', { className: 'secw-oled-key' }, 'RULE'),
                h(
                  'code',
                  { className: 'secw-oled-val', 'data-tone': active ? active.severity : 'mint', 'data-sec-oled-rule': '' },
                  active
                    ? (active.ruleId || 'RULE') + ' · ' + (active.cwe || 'CWE') + ' · ' + risk(active.severity)
                    : t('NO SIGNAL · 通道静默', 'NO SIGNAL · ALL CLEAR'),
                ),
              ),
            ),
          ),
          // Right OLED Bay: Interactive 24-Dot LED Scan Matrix
          h(
            'div',
            { className: 'secw-oled-bay secw-oled-right' },
            h(
              'div',
              { className: 'secw-oled-bay-head' },
              h('span', { className: 'secw-oled-kicker' }, t('24 通道 LED 雷达阵列', '24-DOT LED SCAN MATRIX')),
              h(
                'span',
                { className: 'secw-oled-coord' },
                activeIndex >= 0
                  ? 'CH ' + String(activeIndex + 1).padStart(2, '0') + ' / ' + String(displayedFindings.length).padStart(2, '0')
                  : '24 / 24 OK',
              ),
            ),
            h(
              'div',
              { className: 'secw-led-matrix', role: 'group', 'aria-label': t('24 点安全命中矩阵', '24-dot finding matrix') },
              ledSlots.map((item, slotIdx) => {
                if (!item) {
                  return h(
                    'span',
                    {
                      key: 'slot-' + slotIdx,
                      className: 'secw-led-dot secw-led-healthy',
                      'data-sec-led-slot': slotIdx,
                      'data-state': 'healthy',
                      'aria-hidden': 'true',
                    },
                    h('span', { className: 'secw-led-core' }),
                  );
                }
                const isSelected = item.id === active?.id;
                const info = describeFinding(item);
                const slotLabel = `${item.ruleId || 'SEC'} · ${item.file}:${item.line} (${risk(item.severity)}) — ${info.title}`;
                return h(
                  'button',
                  {
                    key: item.id,
                    type: 'button',
                    className: 'secw-led-dot secw-led-lit',
                    'data-sec-led-slot': slotIdx,
                    'data-sec-finding-id': item.id,
                    'data-severity': item.severity,
                    'data-active': isSelected ? 'true' : 'false',
                    'aria-pressed': isSelected,
                    'aria-label': slotLabel,
                    title: slotLabel,
                    onClick: () => setSelectedId(item.id),
                  },
                  h('span', { className: 'secw-led-core', 'aria-hidden': 'true' }),
                );
              }),
            ),
            h(
              'div',
              { className: 'secw-led-legend' },
              h('span', { className: 'secw-legend-item', 'data-sev': 'high' }, h('i', { 'aria-hidden': 'true' }), t('严重/高', 'Crit/High')),
              h('span', { className: 'secw-legend-item', 'data-sev': 'medium' }, h('i', { 'aria-hidden': 'true' }), t('中', 'Med')),
              h('span', { className: 'secw-legend-item', 'data-sev': 'low' }, h('i', { 'aria-hidden': 'true' }), t('低', 'Low')),
              h('span', { className: 'secw-legend-item', 'data-sev': 'healthy' }, h('i', { 'aria-hidden': 'true' }), t('正常', 'OK')),
              matrixOverflow > 0
                ? h('span', { className: 'secw-legend-overflow' }, '+' + matrixOverflow + ' ' + t('更多', 'more'))
                : null,
            ),
          ),
        ),
        // Mechanical Keycap Control Row
        h(
          'div',
          { className: 'secw-keycap-row', 'data-tour': 'sec-keycaps' },
          h(
            'div',
            { className: 'secw-keycap-bank secw-filter-keys', role: 'group', 'aria-label': t('严重级别机械筛选键', 'Severity filter keys') },
            filterKeys.map(key => {
              const pressed = activeFilter === key.id;
              return h(
                'button',
                {
                  key: key.id,
                  type: 'button',
                  className: 'secw-keycap',
                  'data-sec-filter-key': key.id,
                  'data-tone': key.tone,
                  'data-active': pressed ? 'true' : 'false',
                  'aria-pressed': pressed,
                  onClick: () => applyFilter(key.id),
                },
                h('span', { className: 'secw-key-led', 'aria-hidden': 'true' }),
                h('span', { className: 'secw-key-label' }, key.label),
                h('span', { className: 'secw-key-count' }, String(key.count)),
              );
            }),
          ),
          h(
            'div',
            { className: 'secw-keycap-bank secw-transport-keys' },
            h(
              'button',
              {
                type: 'button',
                className: 'secw-keycap secw-keycap-vermilion',
                'data-sec-cockpit-action': 'scan',
                disabled: actionDisabled,
                onClick: () => onRun?.('scan'),
              },
              h('span', { className: 'secw-key-glyph', 'aria-hidden': 'true' }, '▶'),
              h('span', { className: 'secw-key-label' }, t('检查代码', 'Scan code')),
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'secw-keycap secw-keycap-util',
                'data-sec-cockpit-action': 'verify',
                disabled: actionDisabled || !report?.hasScan,
                onClick: () => onRun?.('verify'),
              },
              h('span', { className: 'secw-key-label' }, t('复查修复', 'Recheck fixes')),
            ),
            h(
              'div',
              { className: 'secw-stepper-group', role: 'group', 'aria-label': t('命中条目步进器', 'Finding stepper') },
              h(
                'button',
                {
                  type: 'button',
                  className: 'secw-keycap secw-keycap-step',
                  'data-sec-stepper': 'prev',
                  disabled: displayedFindings.length <= 1,
                  onClick: () => stepFinding(-1),
                },
                '◀ ' + t('上一条', 'Prev'),
              ),
              h(
                'span',
                { className: 'secw-stepper-readout' },
                displayedFindings.length ? String(activeIndex + 1).padStart(2, '0') + '/' + String(displayedFindings.length).padStart(2, '0') : '00/00',
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'secw-keycap secw-keycap-step',
                  'data-sec-stepper': 'next',
                  disabled: displayedFindings.length <= 1,
                  onClick: () => stepFinding(1),
                },
                t('下一条', 'Next') + ' ▶',
              ),
            ),
          ),
        ),
      ),
      busy
        ? h(
            'div',
            { className: 'secw-busy-skeleton' },
            h(W.Skeleton, { variant: 'row', label: t('正在更新检查结果…', 'Updating scan results…') }),
          )
        : null,
      // Code Microscope Inspection Bay directly beneath the OLED deck
      h(
        'section',
        { className: 'secw-microscope', 'data-dsh-card': '', 'data-sec-microscope': '', 'data-tour': 'sec-microscope', 'aria-label': t('代码显微检视舱', 'Code microscope inspection bay') },
        active
          ? h(
              'article',
              { className: 'secw-microscope-body', 'data-severity': active.severity },
              h(
                'header',
                { className: 'secw-microscope-head' },
                h(
                  'div',
                  { className: 'secw-microscope-title-block' },
                  h(
                    'div',
                    { className: 'secw-microscope-tags' },
                    h('span', { className: 'dsh-wb-tag', 'data-tone': active.severity }, risk(active.severity)),
                    h('span', { className: 'dsh-wb-tag', 'data-tone': fresh?.has?.(active.id) ? 'warn' : undefined }, fresh?.has?.(active.id) ? t('新增', 'New') : t('已接受', 'Accepted')),
                    h('span', { className: 'secw-microscope-rule-pill' }, (active.ruleId || 'SEC') + ' · ' + (active.cwe || 'CWE')),
                  ),
                  h('h2', { className: 'secw-microscope-title', 'data-dsh-editorial-heading': '', 'data-dsh-serif': '' }, activeInfo.title),
                ),
                h(
                  'div',
                  { className: 'secw-microscope-loc-badge', 'data-sec-microscope-loc': '' },
                  h('span', { className: 'secw-loc-dot', 'data-severity': active.severity, 'aria-hidden': 'true' }),
                  h('code', null, active.file + ':' + active.line),
                ),
              ),
              // High-Contrast Framed Code Evidence Slice with Glowing Fault Marker
              h(
                'div',
                { className: 'secw-microscope-code-frame', role: 'region', 'aria-label': t('脱敏代码证据切片', 'Redacted code evidence slice') },
                h(
                  'div',
                  { className: 'secw-code-frame-bar' },
                  h('span', null, 'MICROSCOPE // ' + active.file),
                  h('span', { className: 'secw-code-frame-line' }, 'LN ' + active.line + ' · ' + (active.evidence === 'dataflow' ? 'DATAFLOW' : 'PATTERN')),
                ),
                h(
                  'div',
                  { className: 'secw-code-slice' },
                  snippetLines.map((lineText, idx) => {
                    const isFault = idx === 0;
                    return h(
                      'div',
                      { key: idx, className: isFault ? 'secw-code-line secw-code-line-fault' : 'secw-code-line' },
                      h('span', { className: 'secw-code-marker', 'aria-hidden': 'true' }, isFault ? '▶' : ' '),
                      h('span', { className: 'secw-code-ln', 'aria-hidden': 'true' }, String(startLineNum + idx)),
                      h('code', { className: 'secw-code-text' }, lineText || ' '),
                    );
                  }),
                ),
              ),
              // Explanation + Remediation Guidance
              h(
                'div',
                { className: 'secw-microscope-notes' },
                h(
                  'div',
                  { className: 'secw-note-card' },
                  h('h3', null, t('证据与触发说明', 'Evidence & Trigger')),
                  h('p', null, activeInfo.detail),
                  h(
                    'p',
                    { className: 'secw-muted' },
                    t('置信度：', 'Confidence: ') +
                      risk(active.confidence) +
                      ' · ' +
                      t('来源：', 'Sources: ') +
                      (active.sources || [active.engine || 'builtin']).map(engine => (engine === 'builtin' ? t('内置规则', 'Built-in rules') : names[engine] || engine)).join(', '),
                  ),
                ),
                h(
                  'div',
                  { className: 'secw-note-card secw-note-remediation' },
                  h('h3', null, t('修复建议', 'Remediation Guidance')),
                  h('p', null, remediationHint(active)),
                ),
              ),
              // Raised Mechanical Action Keys
              h(
                'div',
                { className: 'secw-microscope-actions' },
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'secw-keycap secw-keycap-action',
                    'data-sec-microscope-action': 'copy',
                    'data-copied': copiedId === active.id ? 'true' : undefined,
                    onClick: () => onCopy?.(active),
                  },
                  h(W.Icon, { name: copiedId === active.id ? 'check' : 'copy', size: 14 }),
                  h('span', null, copiedId === active.id ? t('已复制', 'Copied') : t('复制位置', 'Copy location')),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'secw-keycap secw-keycap-action',
                    'data-sec-microscope-action': 'open',
                    onClick: () => onOpen?.(active),
                  },
                  h(W.Icon, { name: 'external', size: 14 }),
                  h('span', null, t('打开文件', 'Open file')),
                ),
                h(SecurityPromptChip, {
                  className: 'secw-microscope-prompt',
                  prompt: fixPrompt,
                  label: t('复制修复指令', 'Copy fix prompt'),
                }),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'secw-keycap secw-keycap-action',
                    'data-sec-microscope-action': 'sarif',
                    disabled: busy,
                    onClick: () => download?.('sarif'),
                  },
                  h(W.Icon, { name: 'download', size: 14 }),
                  h('span', null, t('下载 SARIF', 'Download SARIF')),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'secw-keycap secw-keycap-action',
                    'data-sec-microscope-action': 'markdown',
                    disabled: busy,
                    onClick: () => download?.('markdown'),
                  },
                  h(W.Icon, { name: 'download', size: 14 }),
                  h('span', null, t('下载 Markdown', 'Download Markdown')),
                ),
              ),
            )
          : h(
              'div',
              { className: 'secw-microscope-standby' },
              h(
                W.Empty,
                {
                  title: activeFilter !== 'all' ? t('此筛选下没有命中信号', 'No matching signals for this filter') : t('雷达通道全部正常', 'All radar channels clear'),
                  icon: 'shield',
                  action: h(
                    'div',
                    { className: 'secw-microscope-actions' },
                    activeFilter !== 'all'
                      ? h(
                          'button',
                          { type: 'button', className: 'secw-keycap secw-keycap-action', onClick: () => applyFilter('all') },
                          t('重置为全部', 'Reset to all'),
                        )
                      : null,
                    h(
                      'button',
                      { type: 'button', className: 'secw-keycap secw-keycap-action', disabled: busy, onClick: () => download?.('sarif') },
                      h(W.Icon, { name: 'download', size: 14 }),
                      h('span', null, t('下载 SARIF', 'Download SARIF')),
                    ),
                    h(
                      'button',
                      { type: 'button', className: 'secw-keycap secw-keycap-action', disabled: busy, onClick: () => download?.('markdown') },
                      h(W.Icon, { name: 'download', size: 14 }),
                      h('span', null, t('下载 Markdown', 'Download Markdown')),
                    ),
                  ),
                },
                t('点击上方机械筛选键切换通道，或点「▶ 检查代码」发起新一轮本地扫描。', 'Use the filter keys above or press ▶ Scan code to start a fresh local scan.'),
              ),
            ),
        h(W.Details, { summary: t('检查覆盖范围', 'Check coverage'), className: 'secw-coverage-details' }, h(Coverage, { rows: report.coverage })),
      ),
    ),
  );
}

const SECURITY_WORKBENCH_CSS = `
.security-workbench {
  min-width: 0;
}

.security-workbench .security-project-inline {
  display: inline-flex;
  align-items: center;
  flex: 0 1 150px;
  min-width: 96px;
  max-width: 158px;
}

.security-workbench .security-project-menu {
  width: 100%;
  min-width: 96px;
  max-width: 100%;
}

.security-workbench .security-project-menu .dsh-wb-menu-btn {
  max-width: 100%;
  overflow: hidden;
}

.security-workbench .security-project-menu .dsh-wb-menu-value {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@container dsh-workbench (max-width: 1180px) {
  .security-workbench .dsh-wb-header {
    flex-wrap: wrap;
    row-gap: 6px;
    column-gap: 8px;
    padding: 6px 12px;
  }

  .security-workbench .dsh-wb-header > .dsh-header-leading {
    flex: 0 0 auto;
    max-width: 100%;
    gap: 6px;
  }

  .security-workbench .dsh-wb-header .dsh-wb-tab {
    padding: 4px 8px;
  }

  .security-workbench .dsh-wb-header > .dsh-wb-header-actions {
    flex: 1 1 auto;
    min-width: 0;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 4px;
  }

  .security-workbench .security-project-inline {
    flex: 0 1 124px;
    min-width: 90px;
    max-width: 132px;
  }

  .security-workbench .security-project-menu {
    min-width: 90px;
  }

  .security-workbench .dsh-wb-header .dsh-wb-btn {
    padding-inline: 8px;
  }
}

@container dsh-workbench (max-width: 760px) {
  .security-workbench .dsh-wb-header {
    align-items: flex-start;
    gap: 6px 12px;
    padding-inline: 12px;
  }

  .security-workbench .dsh-wb-header > .dsh-header-leading {
    flex: 1 1 100%;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    flex-wrap: wrap;
    gap: 6px 10px;
  }

  .security-workbench .dsh-wb-header-actions {
    flex: 1 1 100%;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin-inline-start: 0;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 6px;
  }

  .security-workbench .security-project-inline {
    flex: 1 1 100%;
    width: 100%;
    max-width: none;
    min-width: 0;
  }

  .security-workbench .security-project-menu {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .security-workbench .security-project-menu .dsh-wb-menu-btn {
    width: 100%;
    justify-content: space-between;
  }

  .security-workbench .security-scan-action {
    flex: 1 1 104px;
    width: auto;
    min-width: 104px;
    max-width: 100%;
    min-height: 36px;
    white-space: normal;
  }
}

.security-workbench .security-report-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 16px 2px;
}

.security-workbench .security-report-meta p {
  margin: 0;
}

.security-workbench .secw-busy-progress {
  margin-block-start: 6px;
}

.security-workbench .secw-busy-skeleton {
  padding: 4px 8px;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.security-workbench .secw-skeleton-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  max-width: 680px;
}

.security-workbench .secw-skeleton-split {
  flex: 1;
  min-height: 0;
}

.security-workbench .secw-skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-inline-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.security-workbench .secw-skeleton-detail {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 24px;
}

.security-workbench .secw-muted {
  color: var(--w-muted);
  font-size: 12.5px;
  line-height: 19px;
  margin: 4px 0;
}

.security-workbench .secw-filter-menu {
  flex: 1;
}

.security-workbench .secw-finding-detail {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-block-end: 14px;
}

.security-workbench .secw-detail-title {
  margin: 0;
  font-size: 18px;
  line-height: 25px;
  font-weight: 650;
  color: var(--w-ink);
}

.security-workbench .secw-detail-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.security-workbench .secw-file {
  margin: 0;
  font-family: var(--dsh-font-mono, ui-monospace, SFMono-Regular, Consolas, monospace);
  font-size: 12.5px;
  color: var(--w-muted);
  overflow-wrap: anywhere;
}

.security-workbench .secw-evidence {
  margin: 0;
  max-height: 280px;
  overflow: auto;
  overscroll-behavior: contain;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  padding: 12px 14px;
  border-radius: var(--w-radius-sm);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  background: var(--w-bg-1);
  color: var(--w-ink);
  font: 12.5px/1.65 var(--dsh-font-mono, ui-monospace, SFMono-Regular, Consolas, monospace);
}

.security-workbench .secw-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-block: 14px;
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.security-workbench .secw-section > h3 {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: var(--w-ink);
}

.security-workbench .secw-section > p {
  margin: 0;
}

.security-workbench .secw-detail-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-block-start: auto;
  padding-block-start: 14px;
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.security-workbench .secw-coverage {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 10px;
  margin-block: 6px;
}

.security-workbench .secw-engine {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 11px 13px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-radius: var(--w-radius-sm);
  background: var(--w-bg-1);
  overflow-wrap: anywhere;
}

.security-workbench .secw-engine-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.security-workbench .secw-engine strong {
  font-size: 13px;
  color: var(--w-ink);
}

.security-workbench .secw-engine small {
  color: var(--w-tertiary);
  font-size: 11.5px;
}

.security-workbench .secw-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px 7px;
  border-radius: var(--w-radius-xs);
  background: var(--w-bg-2);
  color: var(--w-muted);
  font-size: 11.5px;
  font-weight: 550;
}

.security-workbench .secw-badge[data-status="completed"] {
  background: var(--w-accent-soft);
  color: var(--w-success);
}

.security-workbench .secw-badge[data-status="failed"],
.security-workbench .secw-badge[data-status="partial"],
.security-workbench .secw-badge[data-status="not-installed"],
.security-workbench .secw-badge[data-status="timed-out"] {
  background: var(--w-danger-soft);
  color: var(--w-danger);
}

.security-workbench .security-settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: min(100%, 820px);
  padding: 20px 18px 28px;
}

.security-workbench .security-settings h3 {
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  font-weight: 650;
}

.security-workbench .secw-fieldset {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 14px 16px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-radius: var(--w-radius-md);
  background: var(--w-bg-1);
}

.security-workbench .secw-fieldset > legend {
  padding-inline: 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--w-muted);
}

.security-workbench .secw-field-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-radius: var(--w-radius-md);
  background: var(--w-bg-1);
}

.security-workbench .secw-field-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.security-workbench .secw-field-head label,
.security-workbench .secw-label {
  font-size: 13px;
  font-weight: 550;
  color: var(--w-ink);
}

.security-workbench .secw-ext-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--w-link);
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  align-self: flex-start;
}

.security-workbench .secw-ext-link:hover {
  text-decoration: underline;
}

.security-workbench .secw-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.security-workbench .secw-health {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-radius: var(--w-radius-md);
  background: var(--w-bg-1);
}

.security-workbench .secw-inline-status {
  margin: 0;
}

.security-workbench .secw-checklist {
  list-style: none;
  padding: 0;
  margin: 4px 0;
}

.security-workbench .secw-checklist li {
  padding: 8px 0;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  font-size: 13px;
  overflow-wrap: anywhere;
}

.security-workbench .secw-checklist li:last-child {
  border-block-end: 0;
}

.security-workbench .secw-checklist li[data-ok="false"] {
  color: var(--w-danger);
}

.security-workbench .secw-vuln-list {
  display: grid;
  gap: 10px;
}

.security-workbench .secw-finding {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-radius: var(--w-radius-md);
  background: var(--w-bg-1);
  overflow-wrap: anywhere;
}

.security-workbench .secw-finding p {
  margin: 0;
}

.security-workbench .secw-more-wrap {
  padding: 12px 14px;
}

.security-workbench .security-list-note {
  padding: 0 14px 14px;
}

.security-workbench .secw-banner-wrap {
  padding: 0 18px;
}

.security-workbench .secw-empty-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 100%;
}

.security-workbench .secw-empty-ctas {
  justify-content: center;
}

[role="dialog"]:has(.security-workbench) {
  width: min(1200px, calc(100dvw - 48px)) !important;
  max-width: 1200px !important;
}

@media (max-width: 620px) {
  [role="dialog"]:has(.security-workbench) {
    width: calc(100dvw - 20px) !important;
    max-width: calc(100dvw - 20px) !important;
  }
}

/* Status + View Toggle Bar (仪器台 / 列表) */
.security-workbench .secw-status-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 12px;
  padding: 4px 16px 8px;
}

.security-workbench .secw-status-flex {
  flex: 1 1 280px;
  margin: 0;
}

.security-workbench .secw-view-toggle {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border-radius: 999px;
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  background: var(--w-bg-2);
  flex: none;
}

.security-workbench .secw-view-toggle-btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--w-muted);
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  padding: 5px 11px;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out),
              color var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out),
              box-shadow var(--dsh-motion-fast, 140ms) var(--dsh-ease-out, ease-out);
}

.security-workbench .secw-view-toggle-btn:hover {
  color: var(--w-ink);
}

.security-workbench .secw-view-toggle-btn[data-active="true"] {
  background: var(--w-bg-base);
  color: var(--w-ink);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.09);
}

/* Braun / Teenage Engineering Hardware Instrument Cockpit (仪器台) */
.security-workbench .secw-cockpit-stage {
  --sec-chassis-bg: #efede8;
  --sec-chassis-edge: #d3cec4;
  --sec-chassis-ink: #24231f;
  --sec-chassis-muted: #656259;
  --sec-key-bg: #faf8f4;
  --sec-key-hover: #ffffff;
  --sec-key-edge: #d7d2c8;
  --sec-key-skirt: #c2bcb0;
  --sec-key-ink: #1f1f1c;
  --sec-key-active-bg: #e7e3da;
  --sec-oled-bg: #171a18;
  --sec-oled-edge: #0f1210;
  --sec-oled-mint: #86efac;
  --sec-oled-amber: #fbbf24;
  --sec-oled-vermilion: #f2542d;
  --sec-oled-sky: #7dd3fc;
  --sec-oled-dim: #738277;

  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 8px 16px 26px;
  min-width: 0;
  flex: 1;
  overflow: auto;
}

/* Soft anodized dark slate adaptation when host dark mode is active */
body[data-ds-dark-theme] [data-dsh-style="harness"] .secw-cockpit-stage {
  --sec-chassis-bg: #2a303b;
  --sec-chassis-edge: #3e4656;
  --sec-chassis-ink: #eef2f7;
  --sec-chassis-muted: #9aa6b8;
  --sec-key-bg: #353d4b;
  --sec-key-hover: #3d4656;
  --sec-key-edge: #4c5669;
  --sec-key-skirt: #1d222b;
  --sec-key-ink: #eef2f7;
  --sec-key-active-bg: #252b35;
}

.security-workbench .secw-cockpit-deck {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 16px 16px;
  border-radius: 14px;
  background: var(--sec-chassis-bg);
  color: var(--sec-chassis-ink);
  border: 1.5px solid var(--sec-chassis-edge);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    0 6px 20px rgba(15, 23, 42, 0.08);
  min-width: 0;
}

.security-workbench .secw-deck-chassis-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.security-workbench .secw-deck-model {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.security-workbench .secw-power-led {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--sec-oled-mint);
  box-shadow: 0 0 8px rgba(134, 239, 172, 0.75);
  flex: none;
}

.security-workbench .secw-power-led[data-tone="warn"] {
  background: var(--sec-oled-amber);
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.75);
}

.security-workbench .secw-power-led[data-tone="danger"] {
  background: var(--sec-oled-vermilion);
  box-shadow: 0 0 9px rgba(242, 84, 45, 0.85);
}

.security-workbench .secw-deck-serial {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.1em;
  color: var(--sec-chassis-ink);
}

.security-workbench .secw-deck-edition {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--sec-chassis-muted);
}

.security-workbench .secw-deck-louvers {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.security-workbench .secw-louver-dot {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--sec-chassis-edge);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.22);
}

/* Recessed Dark-Olive OLED Telemetry Screen */
.security-workbench .secw-oled-screen {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 14px;
  padding: 14px 16px;
  border-radius: 10px;
  background:
    radial-gradient(circle at 15% 15%, rgba(134, 239, 172, 0.06), transparent 52%),
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.015) 0px,
      rgba(255, 255, 255, 0.015) 1px,
      transparent 1px,
      transparent 4px
    ),
    var(--sec-oled-bg);
  color: #e4efe6;
  border: 2px solid var(--sec-oled-edge);
  box-shadow:
    inset 0 3px 12px rgba(0, 0, 0, 0.65),
    0 1px 0 rgba(255, 255, 255, 0.35);
  min-width: 0;
}

.security-workbench .secw-oled-bay {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.security-workbench .secw-oled-right {
  border-inline-start: 1px solid rgba(134, 239, 172, 0.14);
  padding-inline-start: 14px;
}

.security-workbench .secw-oled-bay-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.security-workbench .secw-oled-kicker {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.09em;
  color: var(--sec-oled-dim);
  text-transform: uppercase;
}

.security-workbench .secw-oled-coord {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 11px;
  font-weight: 700;
  color: var(--sec-oled-mint);
  font-variant-numeric: tabular-nums;
}

.security-workbench .secw-oled-badge {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 10.5px;
  font-weight: 750;
  letter-spacing: 0.06em;
  padding: 2px 7px;
  border-radius: 4px;
  border: 1px solid rgba(134, 239, 172, 0.45);
  color: var(--sec-oled-mint);
  background: rgba(134, 239, 172, 0.12);
}

.security-workbench .secw-oled-badge[data-tone="warn"] {
  border-color: rgba(251, 191, 36, 0.5);
  color: var(--sec-oled-amber);
  background: rgba(251, 191, 36, 0.14);
}

.security-workbench .secw-oled-badge[data-tone="danger"] {
  border-color: rgba(242, 84, 45, 0.6);
  color: var(--sec-oled-vermilion);
  background: rgba(242, 84, 45, 0.16);
}

.security-workbench .secw-posture-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.security-workbench .secw-gauge-wrap {
  position: relative;
  width: 112px;
  height: 66px;
  flex: none;
}

.security-workbench .secw-gauge-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.security-workbench .secw-gauge-track {
  fill: none;
  stroke: rgba(134, 239, 172, 0.16);
  stroke-width: 8;
  stroke-linecap: round;
}

.security-workbench .secw-gauge-arc {
  fill: none;
  stroke: var(--sec-oled-mint);
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 260ms var(--dsh-ease-out, ease-out);
}

.security-workbench .secw-gauge-arc[data-tone="warn"] {
  stroke: var(--sec-oled-amber);
}

.security-workbench .secw-gauge-arc[data-tone="danger"] {
  stroke: var(--sec-oled-vermilion);
}

.security-workbench .secw-gauge-value {
  position: absolute;
  inset-inline: 0;
  bottom: 2px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  font-family: var(--dsh-font-mono, monospace);
  color: var(--sec-oled-mint);
  font-variant-numeric: tabular-nums;
}

.security-workbench .secw-gauge-value[data-tone="warn"] {
  color: var(--sec-oled-amber);
}

.security-workbench .secw-gauge-value[data-tone="danger"] {
  color: var(--sec-oled-vermilion);
}

.security-workbench .secw-gauge-value strong {
  font-size: 20px;
  line-height: 1;
}

.security-workbench .secw-gauge-value small {
  font-size: 10px;
  color: var(--sec-oled-dim);
}

.security-workbench .secw-oled-counters {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  flex: 1 1 160px;
  min-width: 0;
}

.security-workbench .secw-oled-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(134, 239, 172, 0.12);
}

.security-workbench .secw-oled-stat-label {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 10px;
  color: var(--sec-oled-dim);
}

.security-workbench .secw-oled-stat-val {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 18px;
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
  color: var(--sec-oled-mint);
}

.security-workbench .secw-oled-stat-val[data-tone="amber"] {
  color: var(--sec-oled-amber);
}

.security-workbench .secw-oled-stat-val[data-tone="vermilion"] {
  color: var(--sec-oled-vermilion);
}

.security-workbench .secw-oled-telemetry {
  display: grid;
  gap: 5px;
  padding-block-start: 8px;
  border-block-start: 1px solid rgba(134, 239, 172, 0.12);
}

.security-workbench .secw-oled-line {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
}

.security-workbench .secw-oled-key {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--sec-oled-dim);
  width: 44px;
  flex: none;
}

.security-workbench .secw-oled-val {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 12px;
  color: var(--sec-oled-mint);
  overflow-wrap: anywhere;
}

.security-workbench .secw-oled-val[data-tone="critical"],
.security-workbench .secw-oled-val[data-tone="high"] {
  color: var(--sec-oled-vermilion);
}

.security-workbench .secw-oled-val[data-tone="medium"] {
  color: var(--sec-oled-amber);
}

.security-workbench .secw-oled-val[data-tone="low"] {
  color: var(--sec-oled-sky);
}

/* Interactive 24-Dot LED Scan Matrix */
.security-workbench .secw-led-matrix {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(134, 239, 172, 0.14);
}

.security-workbench .secw-led-dot {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #101311;
  border-radius: 7px;
  height: 26px;
  padding: 0;
  display: grid;
  place-items: center;
  position: relative;
  transition: transform 120ms var(--dsh-ease-out, ease-out),
              border-color 120ms var(--dsh-ease-out, ease-out),
              box-shadow 120ms var(--dsh-ease-out, ease-out);
}

.security-workbench .secw-led-lit {
  cursor: pointer;
}

.security-workbench .secw-led-lit:hover {
  transform: scale(1.08);
  border-color: rgba(255, 255, 255, 0.45);
}

.security-workbench .secw-led-lit:focus-visible {
  outline: 2px solid var(--sec-oled-mint);
  outline-offset: 2px;
}

.security-workbench .secw-led-core {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: block;
}

.security-workbench .secw-led-healthy .secw-led-core {
  background: rgba(134, 239, 172, 0.34);
  box-shadow: 0 0 6px rgba(134, 239, 172, 0.28);
}

.security-workbench .secw-led-lit[data-severity="critical"] .secw-led-core {
  background: #ff453a;
  box-shadow: 0 0 10px rgba(255, 69, 58, 0.9);
}

.security-workbench .secw-led-lit[data-severity="high"] .secw-led-core {
  background: var(--sec-oled-vermilion);
  box-shadow: 0 0 9px rgba(242, 84, 45, 0.85);
}

.security-workbench .secw-led-lit[data-severity="medium"] .secw-led-core {
  background: var(--sec-oled-amber);
  box-shadow: 0 0 9px rgba(251, 191, 36, 0.82);
}

.security-workbench .secw-led-lit[data-severity="low"] .secw-led-core {
  background: var(--sec-oled-sky);
  box-shadow: 0 0 9px rgba(125, 211, 252, 0.82);
}

.security-workbench .secw-led-lit[data-active="true"] {
  border-color: #ffffff;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 0 0 2px rgba(134, 239, 172, 0.55);
}

.security-workbench .secw-led-legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  font-family: var(--dsh-font-mono, monospace);
  font-size: 10.5px;
  color: var(--sec-oled-dim);
}

.security-workbench .secw-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.security-workbench .secw-legend-item i {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  display: inline-block;
  background: var(--sec-oled-mint);
}

.security-workbench .secw-legend-item[data-sev="high"] i { background: var(--sec-oled-vermilion); }
.security-workbench .secw-legend-item[data-sev="medium"] i { background: var(--sec-oled-amber); }
.security-workbench .secw-legend-item[data-sev="low"] i { background: var(--sec-oled-sky); }
.security-workbench .secw-legend-item[data-sev="healthy"] i { background: rgba(134, 239, 172, 0.55); }

.security-workbench .secw-legend-overflow {
  margin-inline-start: auto;
  color: var(--sec-oled-amber);
  font-weight: 700;
}

/* Raised 3D Physical-Press Mechanical Keycaps */
.security-workbench .secw-keycap-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 12px;
}

.security-workbench .secw-keycap-bank {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
}

.security-workbench .secw-keycap {
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 11px;
  border-radius: 8px;
  border: 1px solid var(--sec-key-edge);
  background: var(--sec-key-bg);
  color: var(--sec-key-ink);
  font: inherit;
  font-size: 12px;
  font-weight: 650;
  line-height: 1.1;
  cursor: pointer;
  box-shadow:
    0 3px 0 var(--sec-key-skirt),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: transform 90ms var(--dsh-ease-out, ease-out),
              box-shadow 90ms var(--dsh-ease-out, ease-out),
              background-color 120ms var(--dsh-ease-out, ease-out);
}

.security-workbench .secw-keycap:hover:not(:disabled) {
  background: var(--sec-key-hover);
}

.security-workbench .secw-keycap:active:not(:disabled),
.security-workbench .secw-keycap[data-active="true"] {
  transform: translateY(2px);
  box-shadow:
    0 1px 0 var(--sec-key-skirt),
    inset 0 1px 2px rgba(0, 0, 0, 0.12);
}

.security-workbench .secw-keycap[data-active="true"] {
  background: var(--sec-key-active-bg);
  border-color: var(--w-accent);
}

.security-workbench .secw-keycap:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.security-workbench .secw-keycap:focus-visible {
  outline: 2px solid var(--w-accent);
  outline-offset: 2px;
}

.security-workbench .secw-key-led {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--sec-chassis-edge);
  flex: none;
}

.security-workbench .secw-keycap[data-active="true"] .secw-key-led {
  background: #22c55e;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.8);
}

.security-workbench .secw-keycap[data-tone="critical"][data-active="true"] .secw-key-led,
.security-workbench .secw-keycap[data-tone="high"][data-active="true"] .secw-key-led {
  background: var(--sec-oled-vermilion);
  box-shadow: 0 0 6px rgba(242, 84, 45, 0.85);
}

.security-workbench .secw-keycap[data-tone="medium"][data-active="true"] .secw-key-led,
.security-workbench .secw-keycap[data-tone="warn"][data-active="true"] .secw-key-led {
  background: var(--sec-oled-amber);
  box-shadow: 0 0 6px rgba(251, 191, 36, 0.85);
}

.security-workbench .secw-keycap[data-tone="low"][data-active="true"] .secw-key-led {
  background: #0ea5e9;
  box-shadow: 0 0 6px rgba(14, 165, 233, 0.85);
}

.security-workbench .secw-key-count {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 11px;
  font-weight: 700;
  color: var(--sec-chassis-muted);
  font-variant-numeric: tabular-nums;
}

/* Signature Teenage Engineering Vermilion-Orange Action Keycap */
.security-workbench .secw-keycap-vermilion {
  background: #f2542d;
  border-color: #d9431e;
  color: #ffffff;
  box-shadow:
    0 3px 0 #a92e11,
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.security-workbench .secw-keycap-vermilion:hover:not(:disabled) {
  background: #fa623c;
}

.security-workbench .secw-keycap-vermilion:active:not(:disabled) {
  box-shadow: 0 1px 0 #a92e11;
}

.security-workbench .secw-stepper-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.security-workbench .secw-stepper-readout {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 11.5px;
  font-weight: 700;
  padding: 5px 8px;
  border-radius: 6px;
  background: var(--sec-oled-bg);
  color: var(--sec-oled-mint);
  font-variant-numeric: tabular-nums;
  border: 1px solid var(--sec-oled-edge);
}

/* Code Microscope Inspection Bay */
.security-workbench .secw-microscope {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 20px;
  border-radius: var(--w-radius-md);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  background: var(--w-bg-1);
  box-shadow: var(--dsh-card-shadow, none);
  min-width: 0;
}

.security-workbench .secw-microscope-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

.security-workbench .secw-microscope-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px 14px;
}

.security-workbench .secw-microscope-title-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  flex: 1 1 280px;
}

.security-workbench .secw-microscope-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.security-workbench .secw-microscope-rule-pill {
  font-family: var(--dsh-font-mono, monospace);
  font-size: 11px;
  font-weight: 650;
  padding: 2px 7px;
  border-radius: var(--w-radius-xs);
  background: var(--w-bg-2);
  color: var(--w-muted);
}

.security-workbench .secw-microscope-title {
  margin: 0;
  font-size: 19px;
  line-height: 1.3;
  font-weight: 700;
  color: var(--w-ink);
  overflow-wrap: anywhere;
}

.security-workbench .secw-microscope-loc-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 11px;
  border-radius: var(--w-radius-sm);
  border: 1px solid var(--w-border-strong);
  background: var(--w-bg-base);
  font-family: var(--dsh-font-mono, monospace);
  font-size: 12px;
  font-weight: 650;
  color: var(--w-ink);
  max-width: 100%;
  overflow-wrap: anywhere;
}

.security-workbench .secw-loc-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--sec-oled-vermilion);
  flex: none;
}

.security-workbench .secw-loc-dot[data-severity="medium"] { background: var(--sec-oled-amber); }
.security-workbench .secw-loc-dot[data-severity="low"] { background: #0ea5e9; }

.security-workbench .secw-microscope-code-frame {
  border-radius: 10px;
  border: 1.5px solid #2b312d;
  background: #161917;
  color: #e6efe8;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.45);
}

.security-workbench .secw-code-frame-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 12px;
  background: #1f2421;
  border-block-end: 1px solid rgba(134, 239, 172, 0.14);
  font-family: var(--dsh-font-mono, monospace);
  font-size: 11px;
  color: #8fa395;
}

.security-workbench .secw-code-frame-line {
  color: var(--sec-oled-mint);
  font-weight: 700;
}

.security-workbench .secw-code-slice {
  padding: 10px 0;
  overflow-x: auto;
  max-height: 260px;
  font-family: var(--dsh-font-mono, monospace);
  font-size: 12.5px;
  line-height: 1.65;
}

.security-workbench .secw-code-line {
  display: grid;
  grid-template-columns: 22px 46px minmax(0, 1fr);
  align-items: baseline;
  padding: 2px 12px 2px 8px;
}

.security-workbench .secw-code-line-fault {
  background: rgba(242, 84, 45, 0.18);
  border-inline-start: 3px solid #f2542d;
  box-shadow: inset 0 0 14px rgba(242, 84, 45, 0.16);
}

.security-workbench .secw-code-marker {
  color: #f2542d;
  font-weight: 800;
  text-align: center;
  text-shadow: 0 0 8px rgba(242, 84, 45, 0.9);
}

.security-workbench .secw-code-ln {
  color: #77877c;
  text-align: right;
  padding-inline-end: 12px;
  user-select: none;
  font-variant-numeric: tabular-nums;
}

.security-workbench .secw-code-text {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  color: #eef5f0;
}

.security-workbench .secw-microscope-notes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.security-workbench .secw-note-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;
  border-radius: var(--w-radius-sm);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-base);
}

.security-workbench .secw-note-card h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 650;
  color: var(--w-ink);
}

.security-workbench .secw-note-card p {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.6;
}

.security-workbench .secw-note-remediation {
  border-inline-start: 3px solid var(--w-accent);
}

.security-workbench .secw-microscope-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding-block-start: 4px;
}

.security-workbench .secw-keycap-action[data-copied="true"] {
  border-color: var(--w-success);
  color: var(--w-success);
}

.security-workbench .secw-microscope-prompt .dsh-wb-btn {
  border-radius: 8px;
  box-shadow: 0 2px 0 var(--sec-key-skirt);
}

/* Theme materiality hooks */
[data-dsh-style="pixel8bit"] .security-workbench .secw-cockpit-deck,
[data-dsh-style="pixel8bit"] .security-workbench .secw-oled-screen,
[data-dsh-style="pixel8bit"] .security-workbench .secw-keycap,
[data-dsh-style="pixel8bit"] .security-workbench .secw-microscope {
  border-radius: 2px;
  border-width: 2px;
}

[data-dsh-style="win98"] .security-workbench .secw-cockpit-deck,
[data-dsh-style="win98"] .security-workbench .secw-oled-screen,
[data-dsh-style="win98"] .security-workbench .secw-keycap,
[data-dsh-style="win98"] .security-workbench .secw-view-toggle,
[data-dsh-style="win98"] .security-workbench .secw-view-toggle-btn {
  border-radius: 0;
}

@media (prefers-reduced-motion: reduce) {
  .security-workbench .secw-keycap,
  .security-workbench .secw-led-dot,
  .security-workbench .secw-gauge-arc,
  .security-workbench .secw-view-toggle-btn {
    transition: none !important;
  }
  .security-workbench .secw-led-lit:hover {
    transform: none !important;
  }
}

@container dsh-workbench (max-width: 820px) {
  .security-workbench .secw-oled-screen {
    grid-template-columns: 1fr;
  }
  .security-workbench .secw-oled-right {
    border-inline-start: 0;
    padding-inline-start: 0;
    border-block-start: 1px solid rgba(134, 239, 172, 0.14);
    padding-block-start: 12px;
  }
  .security-workbench .secw-microscope-notes {
    grid-template-columns: 1fr;
  }
}

@container dsh-workbench (max-width: 560px) {
  .security-workbench .secw-cockpit-stage {
    padding: 6px 10px 22px;
  }
  .security-workbench .secw-led-matrix {
    gap: 5px;
  }
}
`;

let securityHostContext;
        let locale, sidebar;
        const english = () => { try {
            return String(locale?.getSnapshot?.().active || '').startsWith('en');
        }
        catch {
            return false;
        } };
        const t = (zh, en) => english() ? en : zh;
        const statuses = { completed: ['执行完成', 'Completed'], partial: ['部分完成', 'Partial'], failed: ['执行失败', 'Failed'], 'not-installed': ['未安装', 'Not installed'], 'timed-out': ['超时', 'Timed out'], 'not-run': ['未运行', 'Not run'], running: ['正在检查…', 'Checking…'], cancelled: ['已取消', 'Cancelled'] };
        const reasons = { 'executable-missing': ['找不到程序，请安装或设置路径。', 'Executable missing. Install it or set its path.'], 'version-check-failed': ['无法确认工具版本。', 'Could not verify the tool version.'], 'unsupported-version': ['此版本暂不支持，请查看安装说明。', 'Unsupported version. Check the installation guide.'], 'database-unavailable': ['离线漏洞库不可用；请先下载数据库或选择联网审计。', 'Offline database unavailable. Download it or choose an online audit.'], 'invalid-or-truncated-json': ['结果损坏或超过输出上限，请缩小范围重试。', 'The result is invalid or too large. Retry with a smaller scope.'], 'incomplete-coverage': ['部分文件或结果未能检查，不能判定通过。', 'Some files or results were not checked. This is not a pass.'], 'no-eligible-files': ['没有适合此引擎的文件。', 'No eligible files for this engine.'], 'no-lockfiles': ['未找到支持的锁文件，请先生成依赖锁文件。', 'No supported lockfile. Generate a resolved lockfile first.'], 'no-resolved-packages': ['未提取到实际依赖版本。', 'No resolved dependency versions were extracted.'], 'execution-failed': ['工具未完成，请检查安装与网络后重试。', 'The tool did not finish. Check its installation and network.'], 'execution-timeout': ['工具执行超时，可缩小范围后重试。', 'The tool timed out. Retry with a smaller scope.'], 'snapshot-size-limit': ['超过检查体积上限，本次未完成。', 'The scan size limit was reached. This check is incomplete.'] };
        const status = s => { const words = statuses[s]; return words ? t(...words) : s; };
        const reason = s => reasons[s] ? t(...reasons[s]) : s;
        const message = value => { const s = String(value || ''); if (s.includes(' / ')) {
            const parts = s.split(' / ');
            return english() ? parts.at(-1) : parts[0];
        } return english() && /[\u3400-\u9fff]/.test(s) ? 'The operation failed. Refresh and try again.' : s; };
        const names = { get builtin(){return t('内置规则','Built-in rules')}, betterleaks: 'Betterleaks', semgrep: 'Semgrep CE', osv: 'OSV-Scanner' };
        const risk = value => ({ critical: t('严重', 'Critical'), high: t('高', 'High'), medium: t('中', 'Medium'), low: t('低', 'Low') }[value] || value);
        const links = { betterleaks: 'https://github.com/betterleaks/betterleaks/releases/tag/v1.9.0', osv: 'https://github.com/google/osv-scanner/releases/tag/v2.7.0', semgrep: 'https://docs.semgrep.dev/getting-started/quickstart-ce' };
        async function action(body, signal) { const response = await fetch(new URL('api/dsh-code-security/workbench', document.baseURI), { method: 'POST', credentials: 'same-origin', cache: 'no-store', signal, headers: { 'content-type': 'application/json', 'x-dsh-security-action': '1' }, body: JSON.stringify(body) }); let value; try {
            value = await response.json();
        }
        catch {
            throw new Error(t('无法读取服务响应，请检查插件是否加载。', 'Could not read the response. Check that the plugin is loaded.'));
        } if (!response.ok || value.ok === false) {
            const err = new Error(message(value.message || t('操作未完成', 'The operation did not complete.')));
            err.code = value.code;
            throw err;
        } return value; }
        function Coverage({ rows }) {
            return rows?.length ? h('div', { className: 'secw-coverage' }, rows.map(row => h('div', { key: row.engine, className: 'secw-engine', 'data-dsh-card': '' },
                h('div', { className: 'secw-engine-head' },
                    h('strong', null, names[row.engine] || row.engine),
                    h('span', { className: 'secw-badge', 'data-status': row.status }, status(row.status))),
                row.version ? h('small', null, row.version) : null,
                row.reason ? h('p', { className: 'secw-muted' }, reason(row.reason)) : null))) : null;
        }
        function describeFinding(finding) {
            const category = { '0': ['注入与动态执行', 'Injection or dynamic execution'], '1': ['反序列化', 'Deserialization'], '2': ['加密与密钥', 'Cryptography'], '3': ['凭据泄露', 'Credential exposure'], '4': ['配置与权限', 'Configuration and permissions'], '5': ['信息泄露', 'Information exposure'], '6': ['路径与网络', 'Paths and network'] };
            const flows = { 'CWE-78': [['外部输入进入命令执行', 'Input reaches a shell command'], ['请求参数传入了 shell 命令，请核对输入处理并优先使用参数数组。', 'Request input reaches a shell command. Review input handling and prefer argument arrays.']], 'CWE-79': [['外部输入进入 HTML 写入点', 'Input reaches an HTML sink'], ['发现请求输入到 HTML 写入点的数据流，请核对净化处理与实际页面上下文。', 'Request input reaches HTML insertion. Review sanitization and the actual page context.']], 'CWE-89': [['外部输入进入 SQL 文本', 'Input reaches SQL text'], ['请求输入进入 SQL 语句文本，请核对 SQL 构造方式并使用参数化值。', 'Request input reaches SQL text. Review query construction and use parameterized values.']] };
            const flow = finding.evidence === 'dataflow' ? flows[finding.cwe] : null;
            const title = flow ? t(...flow[0]) : finding.engine === 'betterleaks' ? t('疑似凭据泄露', 'Potential credential exposure') : english() && /[\u3400-\u9fff]/.test(finding.title) ? t(...(category[finding.ruleId?.slice(4, 5)] || ['模式提示', 'Code pattern'])) : finding.title;
            const detail = flow ? t(...flow[1]) : english() && /[\u3400-\u9fff]/.test(finding.message) ? 'Review the recorded code pattern; it does not by itself prove exploitability.' : finding.message;
            return { title, detail };
        }
        function ExternalLink({ href, children }) {
            return h('a', { className: 'secw-ext-link', href, target: '_blank', rel: 'noopener noreferrer' },
                h('span', null, children),
                h(W.Icon, { name: 'external', size: 13 }));
        }
        function FindingCard({ finding, fresh, copied, onOpen, onCopy }) {
            const { title, detail } = describeFinding(finding);
            return h('article', { className: 'secw-finding-detail', 'data-severity': finding.severity },
                h('h2', { className: 'secw-detail-title', 'data-dsh-editorial-heading': '', 'data-dsh-serif': '' }, title),
                h('div', { className: 'secw-detail-meta' },
                    h('span', { className: 'dsh-wb-tag', 'data-tone': finding.severity }, risk(finding.severity)),
                    h('span', { className: 'dsh-wb-tag', 'data-tone': fresh ? 'warn' : undefined }, fresh ? t('新增', 'New') : t('已接受', 'Accepted'))),
                h('p', { className: 'secw-file' }, finding.file + ':' + finding.line),
                h('pre', { className: 'secw-evidence', 'data-dsh-card': '', 'aria-label': t('脱敏证据', 'Redacted evidence') }, finding.snippet),
                h('section', { className: 'secw-section' },
                    h('h3', null, t('证据与说明', 'Evidence and explanation')),
                    h('p', null, detail),
                    h('p', { className: 'secw-muted' }, finding.ruleId + ' · ' + finding.cwe + ' · ' + t('置信度：', 'Confidence: ') + risk(finding.confidence) + ' · ' + (finding.evidence === 'dataflow' ? t('数据流证据', 'Data-flow evidence') : t('模式提示', 'Pattern finding'))),
                    h('p', { className: 'secw-muted' }, t('来源：', 'Sources: ') + (finding.sources || [finding.engine || 'builtin']).map(engine => engine === 'builtin' ? t('内置规则', 'Built-in rules') : names[engine] || engine).join(', '))),
                h('section', { className: 'secw-section' },
                    h('h3', null, t('文件位置', 'File location')),
                    h('p', { className: 'secw-file' }, finding.file + ':' + finding.line),
                    h('div', { className: 'dsh-wb-toolbar' },
                        h(W.Button, { icon: copied ? 'check' : 'copy', copied, onClick: () => onCopy(finding) }, copied ? t('已复制', 'Copied') : t('复制位置', 'Copy location')),
                        h(W.Button, { icon: 'external', onClick: () => onOpen(finding) }, t('打开文件', 'Open file')),
                        h(SecurityPromptChip, {
                            prompt: t(
                                '请核对并修复 ' + finding.file + ':' + finding.line + ' 的安全问题（' + finding.ruleId + ' / ' + finding.cwe + '），修完后对同一范围复查确认关闭',
                                'Review and fix the security finding at ' + finding.file + ':' + finding.line + ' (' + finding.ruleId + ' / ' + finding.cwe + '), then recheck the same scope',
                            ),
                            label: t('复制修复指令', 'Copy fix prompt'),
                        }))));
        }
        function Workbench({ workbench = false } = {}) {
            const [activeTab, setActiveTab] = useState('findings'), [switchTo, setSwitchTo] = useState(''), [removeOpen, setRemoveOpen] = useState(false), [copiedId, setCopiedId] = useState('');
            const [resultsViewMode, setResultsViewModeState] = useState(() => {
                try {
                    const saved = typeof window !== 'undefined' ? window.localStorage?.getItem('dsh-code-security:view-mode') : null;
                    return saved === 'list' ? 'list' : 'cockpit';
                } catch {
                    return 'cockpit';
                }
            });
            function setResultsViewMode(next) {
                const mode = next === 'list' ? 'list' : 'cockpit';
                setResultsViewModeState(mode);
                try {
                    if (typeof window !== 'undefined') window.localStorage?.setItem('dsh-code-security:view-mode', mode);
                } catch { }
            }
            const controlId = typeof React.useId === 'function' ? React.useId() : 'secw-ctl';
            const [, repaint] = useState(0), [catalog, setCatalog] = useState([]), [id, setId] = useState(''), [data, setData] = useState(null), [settings, setSettings] = useState({ engines: ['builtin'], enginePaths: {} }), [autoCheck, setAutoCheck] = useState(false), [dirty, setDirty] = useState(false), [job, setJob] = useState(null), [result, setResult] = useState(null), [error, setError] = useState(''), [notice, setNotice] = useState(''), [loading, setLoading] = useState(true), [pendingId, setPendingId] = useState(''), [mode, setMode] = useState('none'), [filter, setFilter] = useState('all'), [limit, setLimit] = useState(50);
            const generation = useRef(0), mounted = useRef(true), requests = useRef(new Set()), copyTimer = useRef(null);
            function request(body) { const ctl = new AbortController(); requests.current.add(ctl); return action(body, ctl.signal).finally(() => requests.current.delete(ctl)); }
            async function open(selected, keepResult = false) {
                const seq = ++generation.current;
                if (!keepResult) setError('');
                setLoading(true);
                setPendingId(String(selected));
                try {
                    const value = await request({ operation: 'open', id: selected });
                    if (!mounted.current || seq !== generation.current) return;
                    setId(selected);
                    setData(value);
                    setSettings(value.settings);
                    setAutoCheck(value.workspace.autoCheck);
                    setDirty(false);
                    setLimit(50);
                    if (!keepResult) setResult(null);
                    setJob(value.activeJob || null);
                }
                catch (e) {
                    if (mounted.current && seq === generation.current) {
                        if (e.code === 'workspace_missing') {
                            let nextId = '';
                            setCatalog(prev => {
                                const rest = prev.filter(w => w.id !== selected);
                                nextId = rest[0]?.id || '';
                                return rest;
                            });
                            setId('');
                            setData(null);
                            setJob(null);
                            setResult(null);
                            setError(message(e.message));
                            if (nextId) void open(nextId);
                        } else {
                            setError(message(e.message));
                        }
                    }
                }
                finally {
                    if (mounted.current && seq === generation.current) {
                        setLoading(false);
                        setPendingId('');
                    }
                }
            }
            useEffect(() => {
                mounted.current = true;
                const off = locale?.subscribe?.(() => repaint(n => n + 1));
                request({ operation: 'list' }).then(value => {
                    if (!mounted.current) return;
                    setCatalog(value.workspaces);
                    if (value.workspaces[0]) void open(value.workspaces[0].id);
                    else setLoading(false);
                }).catch(e => {
                    if (mounted.current) {
                        setError(message(e.message));
                        setLoading(false);
                    }
                });
                return () => {
                    mounted.current = false;
                    generation.current++;
                    clearTimeout(copyTimer.current);
                    requests.current.forEach(c => c.abort());
                    off?.();
                };
            }, []);
            useEffect(() => {
                if (removeOpen || switchTo || dirty || job?.status === 'running')
                    return;
                let inflight = false, cancelled = false;
                function syncWorkspaces() {
                    if (cancelled || inflight || !mounted.current || (typeof document !== 'undefined' && document.visibilityState === 'hidden'))
                        return;
                    inflight = true;
                    request({ operation: 'list' }).then(value => {
                        if (cancelled || !mounted.current || !Array.isArray(value?.workspaces))
                            return;
                        const live = value.workspaces;
                        setCatalog(live);
                        if (id && !live.some(w => w.id === id)) {
                            setJob(null);
                            setResult(null);
                            setDirty(false);
                            setNotice(t('原工作区目录已不存在，已自动从列表移除。', 'The workspace folder no longer exists on disk and was removed from the list.'));
                            if (live[0]) void open(live[0].id);
                            else { setId(''); setData(null); }
                        } else if (!id && live[0] && !loading) {
                            void open(live[0].id);
                        }
                    }).catch(() => { /* silent background sync */ }).finally(() => {
                        inflight = false;
                    });
                }
                const onFocus = () => syncWorkspaces();
                const onVisibility = () => { if (typeof document === 'undefined' || document.visibilityState !== 'hidden') syncWorkspaces(); };
                if (typeof window !== 'undefined' && window.addEventListener)
                    window.addEventListener('focus', onFocus);
                if (typeof document !== 'undefined' && document.addEventListener)
                    document.addEventListener('visibilitychange', onVisibility);
                const timer = typeof setInterval === 'function' ? setInterval(syncWorkspaces, 8000) : null;
                timer?.unref?.();
                return () => {
                    cancelled = true;
                    if (timer != null && typeof clearInterval === 'function') clearInterval(timer);
                    if (typeof window !== 'undefined' && window.removeEventListener)
                        window.removeEventListener('focus', onFocus);
                    if (typeof document !== 'undefined' && document.removeEventListener)
                        document.removeEventListener('visibilitychange', onVisibility);
                };
            }, [id, loading, removeOpen, switchTo, dirty, job?.status]);
            useEffect(() => {
                if (!job || job.status !== 'running' || !id) return;
                let ended = false, timer;
                const selected = id;
                async function poll() {
                    try {
                        const value = await request({ operation: 'job', id: selected, job: job.id });
                        if (ended || !mounted.current) return;
                        if (value.job.status === 'running') timer = setTimeout(poll, 800);
                        else {
                            setJob(value.job);
                            setResult(value.job.result || null);
                            if (value.job.error) setError(message(value.job.error));
                            void open(selected, true);
                        }
                    }
                    catch (e) {
                        if (!ended && mounted.current) {
                            setError(message(e.message));
                            setJob(null);
                        }
                    }
                }
                timer = setTimeout(poll, 300);
                return () => { ended = true; clearTimeout(timer); };
            }, [job?.id, job?.status, id]);
            const busy = job?.status === 'running', report = data?.report;
            const fresh = useMemo(() => new Set((report?.newFindings || []).map(f => f.id)), [report?.newFindings]);
            const findings = useMemo(() => {
                const list = report?.findings || [];
                if (filter === 'new') return list.filter(f => fresh.has(f.id));
                if (filter === 'critical') return list.filter(f => f.severity === 'critical');
                if (filter === 'high') return list.filter(f => f.severity === 'high');
                if (filter === 'medium') return list.filter(f => f.severity === 'medium');
                if (filter === 'low') return list.filter(f => f.severity === 'low');
                if (filter === 'high-risk') return list.filter(f => ['critical', 'high'].includes(f.severity));
                return list;
            }, [report?.findings, fresh, filter]);
            async function removeCurrentWorkspace() {
                if (!id) return;
                setError(''); setNotice('');
                try {
                    const value = await request({ operation: 'remove-workspace', id });
                    if (!mounted.current) return;
                    const rest = value.workspaces || [];
                    setRemoveOpen(false);
                    setCatalog(rest);
                    setJob(null);
                    setResult(null);
                    setDirty(false);
                    setNotice(t('已从工作台移除该项目记录（未删除任何本地文件）。', 'Workspace removed from the list (no local files were deleted).'));
                    if (rest[0]) void open(rest[0].id);
                    else { setId(''); setData(null); }
                }
                catch (e) {
                    if (mounted.current) setError(message(e.message));
                }
            }
            async function run(name) {
                setError(''); setNotice(''); setResult(null);
                try {
                    const value = await request({ operation: 'start', id, action: name, ...(name === 'deps' ? { audit: mode } : {}) });
                    if (mounted.current) setJob(value.job);
                }
                catch (e) {
                    if (mounted.current) setError(message(e.message));
                }
            }
            async function save() {
                setError('');
                try {
                    const paths = Object.fromEntries(Object.entries(settings.enginePaths).map(([k, v]) => [k, v.trim()]).filter(([, v]) => v));
                    const value = await request({ operation: 'settings', id, engines: settings.engines, enginePaths: paths, autoCheck, ...(settings.osvDatabaseDir?.trim() ? { osvDatabaseDir: settings.osvDatabaseDir.trim() } : {}) });
                    if (!mounted.current) return false;
                    setData(value);
                    setSettings(value.settings);
                    setAutoCheck(value.workspace.autoCheck);
                    setDirty(false);
                    setNotice(t('设置已保存。', 'Settings saved.'));
                    return true;
                }
                catch (e) {
                    if (mounted.current) setError(message(e.message));
                    return false;
                }
            }
            async function download(format) {
                setError('');
                try {
                    const value = await request({ operation: 'export', id, format });
                    const url = URL.createObjectURL(new Blob([value.text], { type: format === 'sarif' ? 'application/sarif+json' : 'text/markdown;charset=utf-8' })), a = document.createElement('a');
                    a.href = url;
                    a.download = value.filename;
                    document.body.append(a);
                    a.click();
                    a.remove();
                    setTimeout(() => URL.revokeObjectURL(url), 30000);
                    setNotice(t('报告已请求下载。', 'Report download requested.'));
                }
                catch (e) {
                    setError(message(e.message));
                }
            }
            async function location(finding, copy) {
                setError('');
                try {
                    const value = await request({ operation: 'location', id, finding: finding.id });
                    if (copy) {
                        const copiedOk = await W.writeClipboardText(value.path + ':' + value.line);
                        if (!copiedOk) throw new Error(t('无法访问剪贴板，请手动复制文件位置。', 'Clipboard access is unavailable. Copy the file location manually.'));
                        setCopiedId(finding.id);
                        clearTimeout(copyTimer.current);
                        copyTimer.current = setTimeout(() => { if (mounted.current) setCopiedId(''); }, 1600);
                        setNotice(t('文件位置已复制。', 'File location copied.'));
                        return;
                    }
                    const navigation = securityHostContext?.get?.('uiWorkspace') || securityHostContext?.uiWorkspace;
                    const right = securityHostContext?.get?.('sidebarRight') || sidebar;
                    if (!right?.openResource || !value.sessionId || !navigation?.openSession)
                        throw new Error(t('请先打开对应聊天，或复制文件位置。', 'Open the corresponding chat first, or copy the file location.'));
                    const file = value.path.replace(/\\/g, '/').split('/').map(s => encodeURIComponent(s).replace(/%3A/ig, ':')).join('/');
                    navigation.openSession(value.sessionId);
                    await new Promise(resolve => requestAnimationFrame(resolve));
                    if (right.mounted?.getSnapshot?.() !== value.sessionId) throw new Error(t('请先打开对应聊天，或复制文件位置。', 'Open the corresponding chat first, or copy the file location.'));
                    right.openResource('dsh-resource://file/session/' + encodeURIComponent(value.sessionId) + '/' + file, { params: { line: value.line } });
                }
                catch (e) {
                    if (mounted.current) setError(message(e.message));
                }
            }
            const disabled = busy || loading || dirty;
            // Update protection: dsh-code-security
            __stardustUpdatesGuard(React, "dsh-code-security", { dirty, busy: busy || loading });
            const updateControls = typeof __stardustUpdatesFooter === 'function'
              ? __stardustUpdatesFooter(React, 'dsh-code-security') : null;

            const projectSwitcher = catalog.length ? h('div', { className: 'security-project-inline', 'data-tour': 'sec-project' },
                h(W.ChoiceMenu, {
                    id: controlId + '-project',
                    icon: 'folder',
                    label: t('项目', 'Project'),
                    value: id,
                    disabled: loading,
                    className: 'security-project-menu',
                    items: catalog.map(w => ({ id: w.id, label: w.label + ' — ' + w.root })),
                    onChange: next => {
                        if (dirty) setSwitchTo(next);
                        else void open(next);
                    },
                })) : null;

            const secTabsId = controlId + '-tabs';
            const auditModes = [
                { id: 'none', label: t('仅列出依赖（离线）', 'Dependency inventory (offline)') },
                { id: 'offline', label: t('已知漏洞（本地数据库）', 'Known vulnerabilities (local database)') },
                { id: 'online', label: t('已知漏洞（联网）', 'Known vulnerabilities (online)') },
            ];
            const securityTourSteps = [
                {
                    id: 'oled-radar',
                    selector: '[data-tour="sec-oled-radar"]',
                    fallback: '[data-tour="sec-scan"], [data-sec-empty-action="scan"], [data-copy-prompt]',
                    side: 'bottom',
                    title: t('仪器台 / 列表切换与 24-LED 雷达态势屏', 'Cockpit / List toggle & 24-LED OLED radar'),
                    desc: t(
                        '默认进入 Braun/TE 硬件仪器台：左侧 OLED 显示安全态势分、范围与规则遥测，右侧 24 点 LED 雷达矩阵按严重度点亮——点击任意亮灯立即定位该问题；也可一键切回经典「列表」视图。',
                        'Default hardware cockpit: left OLED tracks posture, scope & active rule telemetry; right 24-dot LED matrix lights up by severity—click any lit dot to inspect it, or switch to List view anytime.',
                    ),
                    ...(!report?.hasScan
                        ? {
                              prompt: t(
                                  '检查这个项目的安全问题，给出触发条件、文件位置和脱敏证据',
                                  'Check this project for security issues with triggers, file locations, and redacted evidence',
                              ),
                              promptLabel: t('复制：检查这个项目', 'Copy: Check this project'),
                          }
                        : {}),
                },
                {
                    id: 'keycaps',
                    selector: '[data-tour="sec-keycaps"]',
                    fallback: '[data-tour="sec-scan"], [data-tour="sec-project"]',
                    side: 'bottom',
                    title: t('机械筛选键、▶ 检查代码与复查闭环', 'Mechanical filter keys, ▶ Scan & Recheck'),
                    desc: t(
                        '用「全部 / 严重 / 高 / 中 / 低 / 新增」3D 机械键实时过滤通道，点朱红「▶ 检查代码」发起本地扫描、用「◀ 上一条 / 下一条 ▶」步进检视，修完后点「复查修复」闭环确认。',
                        'Filter channels with 3D mechanical keys (All/Crit/High/Med/Low/New), trigger scans with vermilion ▶ Scan code, step through hits, and close the loop with Recheck fixes.',
                    ),
                },
                {
                    id: 'microscope',
                    selector: '[data-tour="sec-microscope"]',
                    fallback: '#' + secTabsId + '-tab-findings',
                    side: 'top',
                    title: t('代码显微检视舱与修复指令导出', 'Code Microscope evidence & fix actions'),
                    desc: t(
                        'OLED 下方显微舱展示文件行号、故障高亮代码切片、触发说明与 CWE 修复建议，并支持一键复制位置、打开文件、复制修复指令或下载 SARIF / Markdown。',
                        'Inspect file:line badges, fault-highlighted code slices, CWE remediation guidance, and 1-click Copy location, Open file, Copy fix prompt, or SARIF/Markdown exports.',
                    ),
                },
                {
                    id: 'dependencies',
                    selector: '#' + secTabsId + '-tab-dependencies',
                    fallback: '[data-tour="sec-scan"]',
                    side: 'bottom',
                    title: t('依赖清单与离线 / 联网 OSV 漏洞核查', 'Dependency inventory & OSV audits'),
                    desc: t(
                        '在「依赖检查」盘点锁文件依赖，按需切换本地离线漏洞库或联网查询 OSV（不上传项目源码），也可在「工具与设置」接入 Betterleaks / Semgrep CE。',
                        'Inventory lockfile packages in Dependencies and audit against a local database or online OSV without uploading source code, or configure optional engines in Tools and settings.',
                    ),
                },
                {
                    id: 'theme-font',
                    selector: '.dsh-style-switcher',
                    fallback: '[data-dsh-header]',
                    side: 'bottom',
                    title: t('13 套工作台风格与 8 套字体搭配', '13 workbench styles & 8 font pairings'),
                    desc: t(
                        '右上角可自由切换 13 套工作台风格（深色宿主自动柔和适配为深板岩阳极金属机身）与 8 套中英文字体搭配，跨插件实时同步。',
                        'Switch between 13 bright styles (auto-adapting to anodized dark slate in dark mode) and 8 font pairings synced across plugins.',
                    ),
                },
            ];

            return h(W.Page, {
                workbench,
                icon: 'shield',
                lang: english() ? 'en' : 'zh',
                title: t('代码安全', 'Code security'),
                className: 'secw security-workbench',
                navigation: catalog.length ? h(W.Tabs, {
                    id: secTabsId,
                    label: t('代码安全视图', 'Code security views'),
                    value: activeTab,
                    onChange: setActiveTab,
                    items: [
                        { id: 'findings', label: t('检查结果', 'Findings'), count: report?.findings?.length },
                        { id: 'dependencies', label: t('依赖检查', 'Dependencies') },
                        { id: 'settings', label: t('工具与设置', 'Tools and settings') },
                    ],
                }) : null,
                tourSteps: securityTourSteps,
                tourStorageKey: 'dsh-code-security.tour.v1',
                modalOpen: Boolean(switchTo || removeOpen),
                onTourCopyPrompt: async text => {
                    const ok = await W.writeClipboardText(text);
                    if (ok) {
                        setNotice(t('已复制指令，粘贴到对话发送即可。', 'Prompt copied — paste into chat.'));
                    }
                    return ok;
                },
                actions: catalog.length ? h(React.Fragment, null,
                    projectSwitcher,
                    h(W.Button, { className: 'security-scan-action', variant: 'primary', icon: 'shield', 'data-tour': 'sec-scan', disabled, onClick: () => run('scan') }, t('检查代码', 'Scan code')),
                    h(W.Button, { className: 'security-scan-action', icon: 'search', disabled, onClick: () => run('diff') }, t('检查改动', 'Check changes')),
                    h(W.Button, { className: 'security-scan-action', icon: 'check', 'data-tour': 'sec-verify', disabled: disabled || !report?.hasScan, onClick: () => run('verify') }, t('复查修复', 'Recheck fixes')),
                    h(W.IconButton, { icon: 'refresh', spinning: busy || loading, label: t('刷新结果', 'Refresh results'), disabled: busy || loading || dirty, onClick: () => open(id) }),
                    h(W.IconButton, { icon: 'trash', label: t('移出项目列表', 'Remove workspace from list'), disabled: busy || loading || !id, onClick: () => setRemoveOpen(true) })) : null,
            },
                h('style', { 'data-plugin-css': 'dsh-code-security/workbench' }, SECURITY_WORKBENCH_CSS),
                h(W.Status, { tone: 'error' }, error),
                h(W.Status, { tone: 'success' }, notice),
                loading && data && pendingId && pendingId !== id ? h(W.Status, null, t('正在载入所选项目，载入完成前下面是上一个项目的结果。', 'Loading the selected project. The results below are still from the previous project until it finishes.')) : null,
                busy ? h(W.Status, {
                    action: h(W.Button, { icon: 'close', onClick: () => request({ operation: 'cancel', id, job: job.id }).catch(e => setError(message(e.message))) }, t('取消检查', 'Cancel check')),
                },
                    h('span', null, t('正在检查，可以关闭面板，稍后回来查看结果。', 'Checking. You can close this panel and return for the result.')),
                    h('div', { className: 'dsh-progress secw-busy-progress', 'aria-hidden': 'true' },
                        h('div', { className: 'dsh-progress-bar', style: { '--dsh-progress-value': '65%' } }))) : null,
                result?.coverage && 'closedCount' in result && result.complete === false ? h('div', { className: 'secw-banner-wrap' }, h(Coverage, { rows: Array.isArray(result.coverage) ? result.coverage : [result.coverage] })) : null,
                result?.configurationError ? h(W.Status, { tone: 'error' }, message(result.configurationError)) : null,
                result && 'closedCount' in result ? h(W.Status, { tone: result.complete === false ? 'warn' : 'success' }, result.complete === false ? t('复查未完成，未判定任何问题已修复。', 'Recheck incomplete. No finding was marked fixed.') : t('本次复查：关闭 ', 'This recheck: closed ') + result.closedCount + ' · ' + t('仍存在 ', 'remaining ') + result.remainingCount + ' · ' + t('新增 ', 'new ') + result.freshCount) : null,
                !catalog.length && loading ? h('div', { className: 'secw-skeleton-wrap' },
                    h(W.Skeleton, { variant: 'card', label: t('正在载入项目…', 'Loading projects…') }),
                    h(W.Skeleton, { variant: 'row' }),
                    h(W.Skeleton, { variant: 'row' }),
                    h(W.Skeleton, { variant: 'row' }))
                : !catalog.length ? h(W.Empty, {
                    title: t('还没有检查过的项目', 'No checked projects yet'),
                    icon: 'shield',
                    action: h('div', { className: 'secw-empty-stack' },
                        h('div', { className: 'dsh-wb-prompt-chips' },
                            h(SecurityPromptChip, {
                                variant: 'primary',
                                prompt: t(
                                    '检查这个项目的安全问题，给出触发条件、文件位置和脱敏证据',
                                    'Check this project for security issues with triggers, file locations, and redacted evidence',
                                ),
                                label: t('复制：检查这个项目', 'Copy: Check this project'),
                            }),
                            h(SecurityPromptChip, {
                                prompt: t(
                                    '审查当前 Git 改动的安全问题，只报告有触发条件和代码证据的结果',
                                    'Review current Git changes for security issues with concrete triggers and code evidence',
                                ),
                                label: t('复制：审查 Git 改动', 'Copy: Check Git diff'),
                            }),
                            h(W.Button, { icon: 'refresh', onClick: () => {
                                setLoading(true);
                                request({ operation: 'list' }).then(v => {
                                    if (!mounted.current) return;
                                    setCatalog(v.workspaces);
                                    if (v.workspaces[0]) void open(v.workspaces[0].id);
                                    else setLoading(false);
                                }).catch(e => {
                                    if (mounted.current) { setError(message(e.message)); setLoading(false); }
                                });
                            } }, t('刷新项目', 'Refresh projects')))),
                }, t('一键复制下方指令发到目标仓库对话即可启动首次检查，项目随后会自动出现在这里。', 'Copy a prompt below in one click and send it in a project chat — the project will appear here automatically.')) :
                h(W.TabPanel, { key: activeTab, id: secTabsId, activeTab },
                    activeTab === 'settings' ? h('section', { className: 'security-settings' },
                        h('div', null,
                            h('h3', null, t('增强工具与自动检查', 'Enhanced tools and automatic checks')),
                            h('p', { className: 'secw-muted' }, t('增强工具可选。未安装时仍可用内置规则；已选择但未完成的引擎不会算作通过。', 'Enhanced tools are optional. Built-in checks remain available; an incomplete selected engine is never counted as a pass.'))),
                        h('fieldset', { className: 'secw-fieldset', disabled: busy, 'data-dsh-card': '' },
                            h('legend', null, t('代码检查引擎', 'Code scanning engines')),
                            ['builtin', 'betterleaks', 'semgrep'].map(engine => h(W.Checkbox, {
                                key: engine,
                                label: names[engine],
                                checked: settings.engines.includes(engine),
                                disabled: busy,
                                onChange: checked => {
                                    setSettings(s => ({ ...s, engines: checked ? [...s.engines, engine] : s.engines.filter(x => x !== engine) }));
                                    setDirty(true);
                                },
                            }))),
                        ['betterleaks', 'semgrep', 'osv'].map(engine => h('div', { key: engine, className: 'secw-field-card', 'data-dsh-card': '' },
                            h('div', { className: 'secw-field-head' },
                                h('label', { htmlFor: controlId + '-path-' + engine }, names[engine] + t(' 程序路径（可选）', ' executable path (optional)')),
                                h(ExternalLink, { href: links[engine] }, t('官方安装说明', 'Official installation'))),
                            h(W.Input, {
                                id: controlId + '-path-' + engine,
                                icon: 'file',
                                value: settings.enginePaths[engine] || '',
                                disabled: busy,
                                placeholder: t('已加入 PATH 时可留空', 'Leave empty when available on PATH'),
                                onChange: e => {
                                    const value = e.target.value;
                                    setSettings(s => ({ ...s, enginePaths: { ...s.enginePaths, [engine]: value } }));
                                    setDirty(true);
                                },
                            }))),
                        h('div', { className: 'secw-field-card', 'data-dsh-card': '' },
                            h('div', { className: 'secw-field-head' },
                                h('label', { htmlFor: controlId + '-database' }, t('离线漏洞库缓存目录（可选）', 'Offline database cache directory (optional)')),
                                h(ExternalLink, { href: 'https://google.github.io/osv-scanner/usage/offline-mode/' }, t('离线数据库说明', 'Offline database guide'))),
                            h(W.Input, {
                                id: controlId + '-database',
                                icon: 'folder',
                                value: settings.osvDatabaseDir || '',
                                disabled: busy,
                                placeholder: t('留空使用 OSV 默认缓存', 'Leave empty for the default OSV cache'),
                                onChange: e => { setSettings(s => ({ ...s, osvDatabaseDir: e.target.value })); setDirty(true); },
                            }),
                            h('p', { className: 'secw-muted' }, t('OSV 2.7 使用缓存目录/osv-scalibr/npm/all.zip；数据库由用户预先下载。', 'OSV 2.7 uses cache/osv-scalibr/npm/all.zip. Download the database beforehand.'))),
                        h('div', { className: 'secw-field-card', 'data-dsh-card': '' },
                            h(W.Checkbox, {
                                label: t('每轮完成后检查改动', 'Check changes after each turn'),
                                checked: autoCheck,
                                disabled: busy,
                                onChange: checked => { setAutoCheck(checked); setDirty(true); },
                            }),
                            h('p', { className: 'secw-muted' }, t('自动检查仅用内置规则，包含 Git 未跟踪的新文件。结果单独保存；新增高风险模式会在后续对话中提醒。', 'Automatic checks use built-in rules and include untracked Git files. Results are stored separately; new high-risk patterns are surfaced in later conversations.')),
                            data?.automatic ? h('p', { className: 'secw-muted' }, data.automatic.problem ? t('最近自动检查未完成，请手动检查改动并核对 Git 工作区。', 'The last automatic check did not complete. Check changes manually and verify the Git workspace.') : t('最近自动检查：', 'Last automatic check: ') + new Date(data.automatic.time).toLocaleString(english() ? 'en-US' : 'zh-CN') + ' · ' + t('高风险提示 ', 'High-risk patterns ') + data.automatic.highRisk) : null),
                        h('div', { className: 'secw-tools' },
                            h(W.Button, { variant: 'primary', icon: 'check', disabled: busy || !dirty, onClick: save }, t('保存设置', 'Save settings')),
                            h(W.Button, { icon: 'close', disabled: busy || !dirty, onClick: () => { setSettings(data.settings); setAutoCheck(data.workspace.autoCheck); setDirty(false); } }, t('取消修改', 'Cancel edits')),
                            h(W.Button, { icon: 'shield', disabled, onClick: () => run('health') }, t('检查工具', 'Check tools'))),
                        dirty ? h('p', { className: 'secw-muted' }, t('设置尚未保存，请保存后再检查。', 'Save your settings before starting a check.')) : null,
                        busy && !result?.checks && !result?.engines ? h(W.Skeleton, { variant: 'card', label: t('正在检查工具…', 'Checking tools…') }) : null,
                        result?.engines ? h(Coverage, { rows: result.engines }) : null,
                        result?.checks ? h(HealthReport, { result }) : null,
                        result?.database ? h('div', { className: 'secw-field-card', 'data-dsh-card': '' },
                            h('p', { className: 'secw-file' }, result.database.directory),
                            result.database.available ? result.database.databases.map(db => h('p', { key: db.ecosystem, className: 'secw-muted' }, db.ecosystem + ' · ' + t('缓存文件修改时间：', 'Cache file modified: ') + new Date(db.fileModifiedAt).toLocaleString(english() ? 'en-US' : 'zh-CN'))) : h('p', { className: 'secw-muted' }, t('未找到离线漏洞库。', 'No offline database was found.')),
                            h('p', { className: 'secw-muted' }, t('文件时间不代表库中每条漏洞的更新日期。', 'A file timestamp does not establish the freshness of every advisory.'))) : null)
                    : activeTab === 'dependencies' ? h('section', { className: 'security-settings' },
                        h('div', null,
                            h('h3', null, t('依赖与已知漏洞', 'Dependencies and known vulnerabilities')),
                            h('p', { className: 'secw-muted' }, mode === 'online' ? t('联网审计会向 OSV 查询包名、版本等依赖信息；不上传源码。', 'Online auditing queries OSV with package names, versions and dependency metadata; source code is not uploaded.') : t('清单检查只看依赖声明，不代表不存在已知漏洞。离线漏洞审计需要预先下载数据库。', 'An inventory is not a vulnerability audit. Offline auditing requires a previously downloaded database.'))),
                        h('div', { className: 'secw-field-card', 'data-dsh-card': '' },
                            h('span', { className: 'secw-label', id: controlId + '-audit-label' }, t('检查方式', 'Check mode')),
                            h(W.ChoiceMenu, {
                                id: controlId + '-audit',
                                icon: 'filter',
                                label: t('检查方式', 'Check mode'),
                                value: mode,
                                disabled: busy,
                                items: auditModes,
                                onChange: setMode,
                            }),
                            h('div', { className: 'secw-tools' },
                                h(W.Button, { variant: 'primary', icon: 'search', disabled, onClick: () => run('deps') }, t('检查依赖', 'Check dependencies')))),
                        busy && !result?.dependencies ? h(W.Skeleton, { variant: 'card', label: t('正在检查依赖…', 'Checking dependencies…') }) : null,
                        result?.dependencies ? h('div', { className: 'secw-vuln-list' },
                            h('p', null, t('发现依赖：', 'Dependencies: ') + (result.dependenciesTotal ?? result.dependencies.length)),
                            ...(result.warnings || []).map((warning, i) => h(W.Status, { key: i, tone: 'warn', className: 'secw-inline-status' }, message(warning))),
                            result.audit ? h(React.Fragment, null,
                                h(Coverage, { rows: [result.audit.coverage] }),
                                h('p', null, t('已知漏洞：', 'Known vulnerabilities: ') + (result.audit.vulnerabilitiesTotal ?? result.audit.vulnerabilities.length)),
                                result.audit.vulnerabilities.map((v, i) => h('article', { key: v.id + v.package + i, className: 'secw-finding', 'data-dsh-card': '' },
                                    h('strong', null, v.package + '@' + v.version),
                                    h('p', null, v.summary),
                                    h('p', { className: 'secw-muted' }, t('修复版本：', 'Fixed versions: ') + (v.fixedVersions?.join(', ') || t('暂无', 'Not available'))),
                                    h(ExternalLink, { href: v.url }, v.id)))) : null) : null)
                    : h(SecurityResults, { report, findings, fresh, filter, setFilter, limit, setLimit, viewMode: resultsViewMode, setViewMode: setResultsViewMode, busy, loading, disabled, onRun: run, download, copiedId, onOpen: f => location(f, false), onCopy: f => location(f, true) })),
                updateControls,
                switchTo ? h(W.Dialog, {
                    title: t('设置尚未保存', 'Unsaved settings'),
                    tone: 'warn',
                    closeLabel: t('继续编辑', 'Keep editing'),
                    onClose: () => setSwitchTo(''),
                    footer: h(React.Fragment, null,
                        h(W.Button, { onClick: () => setSwitchTo('') }, t('继续编辑', 'Keep editing')),
                        h(W.Button, { variant: 'danger', icon: 'trash', onClick: () => { const next = switchTo; setSwitchTo(''); void open(next); } }, t('放弃修改并切换', 'Discard and switch')),
                        h(W.Button, { variant: 'primary', icon: 'check', onClick: async () => { if (await save()) { const next = switchTo; setSwitchTo(''); void open(next); } } }, t('保存并切换', 'Save and switch'))),
                }, h('p', null, t('切换项目之前，选择如何处理当前修改。', 'Choose what to do with the current settings before switching projects.'))) : null,
                removeOpen && id ? h(W.Dialog, {
                    title: t('移出工作区列表', 'Remove workspace from list'),
                    tone: 'warn',
                    closeLabel: t('取消', 'Cancel'),
                    onClose: () => setRemoveOpen(false),
                    footer: h(React.Fragment, null,
                        h(W.Button, { onClick: () => setRemoveOpen(false) }, t('取消', 'Cancel')),
                        h(W.Button, { variant: 'danger', icon: 'trash', disabled: busy, onClick: removeCurrentWorkspace }, t('确认移出列表', 'Confirm remove'))),
                },
                    h('p', null, t('将从代码安全工作台移除当前工作区记录并关闭其自动检查，不会删除硬盘上的任何项目文件。之后在对话中再次扫描即可重新登记。', 'Removes this workspace from the Code Security list and turns off automatic checks for it. No files on disk are deleted; scan the workspace again in chat to re-register it.')),
                    data?.workspace?.root ? h('p', { className: 'secw-file' }, data.workspace.root) : null) : null);
        }
        function apply(ctx) {
            securityHostContext = ctx;
            W.register(ctx, { id: 'dsh-code-security.workbench', label: () => t('代码安全', 'Code security'), icon: 'shield', component: Workbench, order: 59 });
            try { locale = ctx.get?.('locale') || ctx.locale; } catch { locale = ctx.locale; }
            try { sidebar = ctx.get?.('sidebarRight') || ctx.sidebarRight; } catch { }
            ctx.slots.inject('settings.section', () => ctx.slots.register({ name: 'settings.section', id: 'dsh-code-security', order: 59, label: () => t('代码安全', 'Code security'), inject: () => ({}) }, Workbench));
        }
        return { inject: ['slots', 'locale'], apply };
    } },{"name":"dsh-code-security","version":"0.1.0","hasWorkbench":true,"packageVersion":"0.10.5","label":"代码安全","labelEn":"Code Security","suiteComponent":true,"sectionIds":["dsh-code-security"],"iconData":"data:image/webp;base64,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"}));

})();

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();
