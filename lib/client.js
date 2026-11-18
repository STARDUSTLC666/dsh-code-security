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
  const key = Symbol.for('stardustlc.plugin-updates.client.v1'), pools = globalThis[key] ||= new WeakMap(), root = host.root || host;
  if (typeof root.plugin !== 'function') return;
  let record = pools.get(root);
  if (!record) {
    record = { refs: new Map(), timer: null, version: participant.version, alive: true, hold: false, uiRevision: 6, migration: Promise.resolve() };
    pools.set(root, record);
    __stardustUpdatesActivate(record, pools, root, React, require);
  } else if ((record.uiRevision || 0) < 6 && !record.upgrading) {
    // An earlier loaded participant may still own an older client revision. Keep
    // its references and draft guards, wait for any admitted install, then
    // replace that one client fiber instead of running two window heartbeats.
    const shared = record;
    const previousMigration = record.migration;
    record.upgrading = record.migration = Promise.resolve(previousMigration).then(async () => {
      while (shared.alive && shared.hold) await new Promise(resolve => setTimeout(resolve, 500));
      if (!shared.alive || !shared.refs.size) return;
      await shared.fiber?.dispose?.();
      if (!shared.refs.size) return;
      shared.alive = true; shared.uiRevision = 6; pools.set(root, shared);
      __stardustUpdatesActivate(shared, pools, root, React, require);
    }).catch(() => { /* The original page remains usable if host disposal fails. */ });
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
  const { useState, useEffect, useRef } = React, id = crypto.randomUUID(), listeners = new Set(), pool = __stardustUpdatesGuards(), requests = new Set(), notified = new Set(), knownRows = new Map();
  let alive = true, registered = false, state = null, lastInteraction = Date.now(), inPoll = false, manualOperation = false, legacyHint = null;
  const language = () => String(ctx.locale?.getSnapshot?.().active || '').startsWith('en') ? 'en' : 'zh';
  const t = (zh, en) => language() === 'en' ? en : zh;
  const REPOS = { 'dsh-calendar': 'dsh-calendar', 'dsh-cite': 'dsh-cite', 'dsh-code-security': 'dsh-code-security', 'dsh-codex-port': 'dsh-codex-port', 'deepseek-computer-use': 'deepseek-computer-use', 'dsh-dingtalk': 'dsh-dingtalk', '@stardustlc/dsh-docker': 'dsh-docker', '@stardustlc/dsh-dream': 'dsh-dream', 'dsh-email': 'dsh-email', 'dsh-ffmpeg': 'dsh-ffmpeg', 'dsh-flakefinder': 'dsh-flakefinder', 'dsh-hyperframes': 'dsh-hyperframes', 'dsh-minimal-ptc': 'dsh-minimal-ptc', 'dsh-ppt': 'dsh-ppt', 'dsh-remotion': 'dsh-remotion', '@stardustlc/dsh-review': 'dsh-review', 'dsh-rss': 'dsh-rss', 'dsh-slack': 'dsh-slack', 'dsh-sql': 'dsh-sql', '@stardustlc/dsh-suite': 'dsh-suite', 'dsh-voice': 'dsh-voice' };
  const repoUrl = pkg => Object.hasOwn(REPOS, pkg) ? 'https://github.com/STARDUSTLC666/' + REPOS[pkg] : null;
  const preferences = name => state?.preferences.packages[name] || { checkEnabled: true, autoInstall: false, deferredUntil: 0, ignoredVersion: null };
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
  async function refresh() { const next = await api(); if (alive) { state = __stardustUpdatesDisplayRows(__stardustUpdatesSuiteRows(next, shared.refs.values()), knownRows); notify(); } return next; }
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
      'release-changed': t('发布信息已变化，本次未安装。请重新检查。', 'Release metadata changed. Nothing was installed; check again.'),
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
    })[code] || t('操作未完成，请刷新后重试。DSH 不会因此自动重启。', 'The operation could not be completed. Refresh and retry. DSH will not restart automatically.');
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
    + '@media(pointer:coarse){.plugin-updates-footer .w-button.is-sm{min-block-size:32px;min-height:32px;padding:5px 11px}}'
    + '@media(prefers-reduced-motion:no-preference){.plugin-updates-footer .updates-options>summary::before{transition:rotate .18s ease}.plugin-updates-footer details::details-content{transition:block-size .22s ease,content-visibility .22s ease allow-discrete}}'
    + '@media(max-width:600px){.plugin-updates-footer .updates-head{gap:8px}.plugin-updates-footer .w-toolbar{gap:6px;flex-wrap:wrap}.plugin-updates-footer .w-button{max-width:100%}}';
  function FooterFrame({ name, label, inline = false, head, children }) {
    return h('section', { className: 'dshw plugin-updates-footer' + (inline ? ' is-inline' : ''), 'data-plugin-update-footer': name, 'aria-label': label + t(' · 版本与更新', ' · Version and updates') },
      h('style', null, W.styles),
      h('style', null, FOOTER_CSS),
      head, children);
  }
  function Panel({ name, inline = false }) {
    const snapshot = useSnapshot(), [error, setError] = useState(''), [working, setWorking] = useState(false), [checking, setChecking] = useState(false), [dialog, setDialog] = useState(null), [selectedVersion, setSelectedVersion] = useState(null), [notes, setNotes] = useState(null), [notesOpen, setNotesOpen] = useState(false), [loadingNotes, setLoadingNotes] = useState(false), [dismissedJobId, setDismissedJobId] = useState(null);
    const seenActiveJob = useRef ? useRef(null) : { current: null };
    const row = rowFor(name), original = originalRow(name), target = row?.name || name, prefs = preferences(target), job = snapshot?.job?.name === target ? snapshot.job : null;
    if (job && ['verifying', 'installing', 'cancelling'].includes(job.state)) seenActiveJob.current = job.id;
    async function perform(callback) { setError(''); setWorking(true); try { await callback(); await refresh(); } catch (error) { setError(error.message); await refresh().catch(() => {}); } finally { setWorking(false); } }
    async function save(changes, consent) { await api({ action: 'preferences', name: target, revision: state.preferences.revision, changes, consent }); }
    async function check() { setError(''); setChecking(true); try { await api({ action: 'check', name: target }); await refresh(); } catch (error) { setError(error.message); } finally { setChecking(false); } }
    async function runOperation(request) {
      setDialog(null); manualOperation = true; notify();
      await perform(async () => {
        try {
          await heartbeat();
          const started = await api(request);
          seenActiveJob.current = started.id;
          while (alive) {
            await new Promise(resolve => setTimeout(resolve, 800)); await heartbeat(); await refresh();
            if (state.job?.id !== started.id) throw new Error('operation-unconfirmed');
            if (!activeJob()) break;
          }
        } finally { manualOperation = false; notify(); }
      });
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
    const jobReason = job ? job.reason || (jobResult?.pendingBuilds || jobResult?.failureKind === 'build-blocked' ? 'build-blocked' : jobResult?.error?.code) : null;
    const jobActiveThis = !!job && ['verifying', 'installing', 'cancelling'].includes(job.state);
    const canCancel = jobActiveThis && !['applying', 'restoring'].includes(job.phase);
    const jobAttentionThis = !!job && ['restart-required', 'restored', 'restore-failed', 'unknown', 'failed'].includes(job.state) && (unconfirmed || dismissedJobId !== job.id);
    const jobJustCompleted = !!job && job.state === 'complete' && seenActiveJob.current === job.id && dismissedJobId !== job.id;
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
    const confirmDialog = ['automatic', 'install'].includes(dialog) && h(W.Dialog, { title: dialog === 'automatic' ? (isSuite ? t('允许 Suite 自动安装补丁？', 'Allow automatic patches for Suite?') : t('允许这个插件自动安装补丁？', 'Allow automatic patches for this plugin?')) : (isSuite ? t('确认更新 Suite 整包', 'Confirm Suite bundle update') : t('确认更新此插件', 'Confirm this plugin update')), closeLabel: t('关闭', 'Close'), onClose: () => setDialog(null) },
      dialog === 'automatic' ? h('div', { className: 'w-stack' }, h('p', null, (language() === 'en' ? row.labelEn : row.label) + ' · ' + target), isSuite && h('p', null, t('此处设置作用于 Suite 整包（包含 18 个组件）。独立安装的其他插件不受影响。', 'This setting applies to the whole Suite (including its 18 components). Other independently installed plugins are unaffected.')), h('p', null, t('你正在主动启用自动安装。只处理兼容的稳定补丁；有任务、未保存修改、未知窗口或等待重启时暂停。', 'You are explicitly enabling automatic installation. Only compatible stable patches qualify; running tasks, unsaved changes, unknown windows or a pending restart pause it.')), h('p', null, t('支持热更新时原地重载，不会自动重启 DSH；其他插件不会跟着开启，可随时关闭。', 'Hot-reloads in place when supported and never restarts DSH automatically. Other plugins remain unchanged; turn it off anytime.')), h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('保持关闭', 'Keep off')), h(W.Button, { variant: 'primary', onClick: () => { setDialog(null); void perform(() => save({ checkEnabled: true, autoInstall: true }, 'enable-idle-patch-updates')); } }, t('允许自动安装补丁', 'Allow automatic patches')))) :
      h('div', { className: 'w-stack' },
        isSuite && h('p', null, t('此处操作的是 Suite 整包，包含 18 个组件。独立安装的其他插件不受影响。', 'This action applies to the whole Suite, including its 18 components. Other independently installed plugins are unaffected.')),
        h('p', { className: 'updates-version' }, target + ' · ' + row.version + ' → ' + selectedVersion),
        h('p', null, selectedVersion === row.release?.version ? t('Harness 会热更新并重新加载；需要手动重启时，更新区会显示宿主结果，停用状态会保留。', 'Harness hot-updates and reloads in place. If a manual restart is needed, it appears in the update result; disabled status is preserved.') : message('check-first')),
        h('div', { className: 'w-toolbar' }, h(W.Button, { onClick: () => setDialog(null) }, t('取消', 'Cancel')),
          h(W.Button, { variant: 'primary', disabled: !canConfirm, onClick: () => runOperation({ action: 'install', name: target, version: selectedVersion, confirmation: 'update-installed-plugin' }) }, t('安装此版本', 'Install this version')))));
    const checkButton = variant => h(W.Button, { variant, className: 'is-sm', icon: 'refresh', disabled: checkingThis || !managed, onClick: check }, checkingThis ? t('正在检查…', 'Checking…') : isSuite ? t('检查整包更新', 'Check Suite updates') : t('检查更新', 'Check for updates'));
    const primary = showUpdate
      ? h(W.Button, { variant: 'primary', className: 'is-sm', icon: 'download', disabled: installLocked || row.loadError, onClick: () => { setSelectedVersion(row.release.version); setDialog('install'); } }, (isSuite ? t('更新 Suite 至 v', 'Update Suite to v') : t('更新至 v', 'Update to v')) + row.release.version)
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
          !jobActiveThis && actionableUpdate && row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
          !jobActiveThis && actionableUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版', 'Ignore')),
          !jobActiveThis && actionableUpdate && primary,
          !jobActiveThis && !actionableUpdate && !unconfirmed && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: () => { setError(''); setNotesOpen(false); if (job) setDismissedJobId(job.id); } }, t('关闭', 'Dismiss')))) },
        notesSection, windowsDialog, confirmDialog);
    }
    function progress() {
      if (!job) return null;
      if (job.state === 'complete' && !jobReason) {
        return job.to ? h('p', { className: 'w-muted updates-note' }, '✓ ' + jobLabel(job) + ' · ' + job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动补丁', ' · Automatic patch') : '')) : null;
      }
      return h('section', { className: 'w-section', role: 'status', 'aria-label': t('更新进度', 'Update progress') },
        h('h3', null, jobLabel(job)),
        job.to && h('p', { className: 'w-muted' }, job.from + ' → ' + job.to + (job.mode === 'automatic' ? t(' · 自动补丁', ' · Automatic patch') : '')),
        jobReason && h(W.Status, { tone: 'error' }, message(jobReason)),
        canCancel && h(W.Button, { className: 'is-sm', disabled: job.state === 'cancelling', onClick: () => perform(() => api({ action: 'cancel', id: job.id })) }, t('取消更新', 'Cancel update')));
    }
    function windowControls() {
      if (!staleWindows) return null;
      return h(W.Status, null, h('p', null, t('有窗口已断开，无法确认是否还有未保存修改。仍在使用的窗口请先保存并刷新；已关闭的窗口可以手动重新确认。', 'A disconnected window may contain unsaved changes. Save and refresh windows still in use. If they are closed, you can confirm that manually.')), h(W.Button, { className: 'is-sm', onClick: () => setDialog('windows') }, t('重新确认已关闭的窗口', 'Confirm closed windows')));
    }
    const status = !managed ? t('本地 / 外部来源，保留原安装方式', 'Local / external source; keep original install method') : row.loadError ? t('加载异常，请先检查原生插件管理', 'Loading error; check native plugin management') : row.error ? t('检查失败，可以重试', 'Check failed; retry available') : row.release && !row.release.compatible ? t('新版本暂不兼容当前环境：', 'Latest release is incompatible with this environment: ') + requirement(row.release) + (row.release.required ? ' (' + row.release.required + ')' : '') : row.available ? (ignored ? t('已忽略提醒，仍可手动更新', 'Reminder ignored; manual update available') : t('有兼容的新版本', 'Compatible update available')) : row.checkedAt ? t('当前已是最新稳定版', 'Latest stable version') : t('尚未检查', 'Not checked yet');
    return h(FooterFrame, { name, label: title, head: h('div', { className: 'updates-head' },
      h('div', null,
        h('div', { className: 'updates-title-row' }, h('h2', null, t('版本与更新', 'Version and updates')), h('span', { className: 'updates-mono updates-badge' }, original.name + ' · v' + original.version)),
        h('p', { className: 'w-muted updates-meta-line' }, status, !row.enabled ? ' · ' + t('当前已停用，更新后仍保持停用。', 'Currently disabled; it will remain disabled after updating.') : '', row.checkedAt ? ' · ' + t('上次检查：', 'Last checked: ') + new Date(row.checkedAt).toLocaleString(language() === 'en' ? 'en-US' : 'zh-CN') : ''),
        (original.bundledBy || row.available) && h('p', { className: 'updates-version updates-note' }, target + ' · v' + row.version, row.release?.version && row.release.version !== row.version ? ' → v' + row.release.version : '', original.bundledBy ? ' · ' + t('随 Suite 整包更新', 'Updated via Suite bundle') : '')),
      h('div', { className: 'updates-head-actions' },
        showUpdate && checkButton('ghost'),
        row.release && h(W.Button, { variant: 'ghost', className: 'is-sm', onClick: showNotes, 'aria-expanded': notesOpen }, t('更新记录', 'Release notes')),
        showUpdate && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'later', name: target, revision: state.preferences.revision })) }, t('明天再提醒', 'Remind me tomorrow')),
        showUpdate && !ignored && h(W.Button, { variant: 'ghost', className: 'is-sm', disabled: working, onClick: () => perform(() => api({ action: 'ignore', name: target, revision: state.preferences.revision, version: row.release.version })) }, t('忽略此版本提醒', 'Ignore this reminder')),
        primary)) },
      notesSection,
      h('details', { className: 'updates-options' }, h('summary', null, t('更新选项', 'Update options'), ' · ', prefs.checkEnabled ? t('自动检查：开', 'Checks: on') : t('自动检查：关', 'Checks: off'), ' · ', prefs.autoInstall ? t('自动安装：开', 'Install: on') : t('自动安装：关', 'Install: off')), h('section', { className: 'updates-settings', 'aria-label': t('这个插件的更新偏好', 'Update preferences for this plugin') },
        h('div', null, h(W.Switch, { label: isSuite ? t('自动检查 Suite 整包更新', 'Automatically check Suite updates') : t('自动检查这个插件的更新', 'Automatically check this plugin'), checked: prefs.checkEnabled, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => perform(() => save({ checkEnabled: event.target.checked })) }), h('p', { className: 'w-muted updates-note' }, t('默认开启，每天最多一次。只影响这个安装包，关闭后仍可手动检查。', 'On by default, at most once daily. This affects only this bundle; manual checks remain available.'))),
        h('div', null, h(W.Switch, { label: isSuite ? t('空闲时自动安装 Suite 补丁', 'Install Suite patches while idle') : t('空闲时自动安装这个插件的补丁', 'Install patches for this plugin while idle'), checked: prefs.autoInstall, disabled: working || !!snapshot.preferenceError || !managed, onChange: event => event.target.checked ? setDialog('automatic') : perform(() => save({ autoInstall: false })) }), h('p', { className: 'w-muted updates-note' }, t('默认关闭。明确开启后，仅空闲且没有未保存修改时安装兼容补丁。其他插件的开关不变。', 'Off by default. Explicitly enable compatible patches while idle with no unsaved changes. Other plugins’ settings stay unchanged.'))))),
      error && h(W.Status, { tone: 'error' }, message(error)), snapshot.preferenceError && h(W.Status, { tone: 'error' }, message('preferences-unreadable')),
      snapshot.pendingRestart && h(W.Status, null, snapshot.updaterRestart ? message('restart-required') : t('已有更新等待手动重启后生效。你可以继续工作，自动安装已暂停。', 'Some updates need a manual restart. Continue your work; automatic installation is paused.')),
      prefs.autoInstall && snapshot.autoReady === false && h(W.Status, null, message('page-not-ready')),
      windowControls(),
      (showUpdate || jobActiveThis) && (snapshot.pages.dirty || ownPage.dirty) && h(W.Status, null, message('page-dirty')),
      (showUpdate || jobActiveThis) && (snapshot.activity.busy || pageBusy) && h(W.Status, null, message(snapshot.activity.busy ? 'busy' : 'page-busy')),
      deferred && h(W.Status, null, t('此插件已推迟提醒和自动安装 24 小时，仍可手动更新。', 'Reminders and automatic installation for this plugin are deferred for 24 hours. Manual updates remain available.')),
      unconfirmed && h(W.Status, { tone: 'error' }, message('operation-unconfirmed')),
      progress(),
      (() => {
        const ownRepo = repoUrl(original.name), suiteRepo = repoUrl('@stardustlc/dsh-suite'), starRepo = isSuite ? suiteRepo : ownRepo;
        if (!ownRepo && !starRepo) return null;
        return h('nav', { className: 'updates-links', 'aria-label': t('开源仓库与反馈', 'Repository and feedback') },
          starRepo && h('a', { href: starRepo, target: '_blank', rel: 'noreferrer noopener' }, isSuite ? t('★ 觉得好用？在 GitHub 给 dsh-suite 点个 Star', '★ Useful? Star dsh-suite on GitHub') : t('★ 觉得好用？在 GitHub 点个 Star', '★ Useful? Star on GitHub')),
          ownRepo && h('a', { href: ownRepo + '/issues', target: '_blank', rel: 'noreferrer noopener' }, t('提交建议 / 问题反馈', 'Feedback & issues')),
          isSuite && original.name !== '@stardustlc/dsh-suite' && ownRepo && h('a', { href: ownRepo, target: '_blank', rel: 'noreferrer noopener' }, t('组件仓库', 'Component repo')),
          !isSuite && suiteRepo && h('a', { href: suiteRepo, target: '_blank', rel: 'noreferrer noopener' }, t('了解 dsh-suite（18 合 1 组合包）', 'Explore dsh-suite (18-in-1 bundle)')));
      })(),
      windowsDialog, confirmDialog
    );
  }
  function InlineFooter({ name }) { return h(Panel, { name, inline: true }); }
  function NativeFooter({ subject }) {
    const snapshot = useSnapshot(), name = __stardustUpdatesDetailName(subject, snapshot?.rows || []);
    return name ? h(Panel, { name, inline: false }) : null;
  }
  function Reminder() {
    useSnapshot();
    const row = state?.rows.find(row => { const prefs = preferences(row.name); return row.available && !row.updating && !row.bundledBy && prefs.checkEnabled && prefs.deferredUntil <= Date.now() && prefs.ignoredVersion !== row.release.version && !notified.has(row.name + '@' + row.release.version); });
    if (!row && !legacyHint) return null;
    let Toast; try { Toast = require('@deepseek-ai/dsh-client-ui-primitives').Toast; } catch { return null; }
    if (!Toast) return null;
    const hint = legacyHint, key = hint ? 'legacy-' + hint : row.name + '@' + row.release.version;
    return h(Toast, { key, text: hint ? hint + t('：请打开「插件」中的此插件详情页，在底部管理更新。', ': open its details in Plugins to manage updates at the bottom.') : (language() === 'en' ? row.labelEn : row.label) + t('有新版本，可在工作台底部或「插件」详情页查看。', ' has an update. Review it at the bottom of its page or in Plugins.'), icon: h(W.Icon, { name: 'refresh', size: 18 }), holdMs: 7000, onDone: () => { if (hint) legacyHint = null; else notified.add(key); notify(); } });
  }
  function register() {
    if (!alive) return;
    if (!registered) {
      registered = true; pool.clients.add(client);
      ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'stardustlc.plugin-update-footer', order: 1000 }, NativeFooter));
      ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'stardustlc.plugin-update-reminder' }, Reminder));
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
  const client = { t, Footer: InlineFooter, NativeFooter, Button: W.Button, open(name) { const footer = [...document.querySelectorAll('[data-plugin-update-footer]')].find(node => node.getAttribute('data-plugin-update-footer') === name); if (footer) footer.scrollIntoView({ block: 'end', behavior: 'smooth' }); else { legacyHint = name; notify(); } }, has: name => registered && !!originalRow(name), row: rowFor, dispose() {
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
const DSH_THEMES_AND_MOTION_CSS = "/* ==========================================================================\n * DeepSeek Harness (>=0.2.2-rc.3) Unified Workbench Themes & Motion System\n * Shared across STARDUSTLC666 workbench plugins:\n *   dsh-email, dsh-calendar, dsh-cite, dsh-dream, dsh-code-security,\n *   dsh-rss, dsh-ppt, dsh-remotion, dsh-hyperframes\n *\n * Design Principles:\n * 1. NEVER TOO DARK: Airy daylight defaults; when host `body[data-ds-dark-theme]`\n *    is active under `harness`, soften to breathable slate (#1f232b / #272c36),\n *    never pitch black (#000 / #090a0f / #151517).\n * 2. 5 SWITCHABLE PRESETS via `[data-dsh-style]`:\n *    - `harness`   (原生清透 / Native Airy)\n *    - `cream`     (米白纸感 / Warm Cream)\n *    - `claude`    (Claude 暖书卷 / Claude Warmth)\n *    - `pixel8bit` (8-Bit 像素 / Bright 8-Bit)\n *    - `mint`      (晴空薄荷 / Airy Mint)\n * 3. PORTALED OVERLAY SYNC: Selectors match both `[data-dsh-style=\"...\"]` roots\n *    AND portaled `[role=\"dialog\"]` / `[role=\"menu\"]` containers carrying or\n *    wrapping `[data-dsh-style=\"...\"]`.\n * 4. COMPOSITOR MOTION & ICON MICRO-ANIMATIONS with full `prefers-reduced-motion`\n *    and `forced-colors` compliance.\n * ========================================================================== */\n\n/* --------------------------------------------------------------------------\n * 1. Motion Timing & Base Token Fallbacks (Standalone + Host Safe)\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) {\n  --dsh-ease-out: cubic-bezier(0.22, 1, 0.36, 1);\n  --dsh-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n  /* Standard cubic-bezier fallback before linear() physics spring */\n  --dsh-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);\n  --dsh-motion-fast: 140ms;\n  --dsh-motion-base: 200ms;\n  --dsh-motion-dialog: 220ms;\n  --dsh-control-border-width: 0.5px;\n  --dsh-button-shadow: none;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);\n  --dsh-card-hover-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);\n}\n\n@supports (transition-timing-function: linear(0, 1)) {\n  :where([data-dsh-style]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) {\n    --dsh-ease-spring: linear(\n      0, 0.402 7.4%, 0.711 15.3%, 0.929 23.7%, 1.008 28.2%,\n      1.067 33%, 1.099 36.9%, 1.12 41%, 1.13 45.4%, 1.13 50.1%,\n      1.111 58.5%, 1.019 83.2%, 1.004 91.3%, 1\n    );\n  }\n}\n\n/* Electron / macOS 0.2.2+ window-drag-regions rule:\n * Exclude ONLY the visible overlay owner box itself (never `[data-window-drag-exclude] *`,\n * so scrolled/clipped descendants cannot register offscreen no-drag rects over headers). */\n[data-window-drag-exclude] {\n  -webkit-app-region: no-drag;\n}\n\n/* --------------------------------------------------------------------------\n * 2. Preset 1: `harness` — 原生清透 / Native Airy\n *    - Daylight: crisp airy white & mist slate; defers to host tokens when set,\n *      with bright standalone fallbacks for tests/previews.\n *    - Host Dark (`body[data-ds-dark-theme]`): softened breathable slate\n *      (`#1f232b` / `#272c36`), overriding DSH's near-black `#151517`.\n * -------------------------------------------------------------------------- */\n:where(body:not([data-ds-dark-theme])) [data-dsh-style=\"harness\"],\n:where(body:not([data-ds-dark-theme])) :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style=\"harness\"]) {\n  color-scheme: light;\n  accent-color: var(--dsw-alias-state-business-primary, #4176e6);\n}\n\n/* Standalone fallbacks when host ui-theme stylesheet is not mounted (e.g. jsdom / preview) */\n:root:not([data-dsh-host-tokens]) [data-dsh-style=\"harness\"] {\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 8px;\n  --dsw-radius-md: 12px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n}\n\nbody:not([data-ds-dark-theme]) [data-dsh-style=\"harness\"] {\n  --dsh-surface-spotlight: rgba(65, 118, 230, 0.06);\n}\n\n/* NEVER TOO DARK: Soft breathable slate when host dark mode is active in `harness` mode */\nbody[data-ds-dark-theme] [data-dsh-style=\"harness\"],\nbody[data-ds-dark-theme] :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"harness\"], :has([data-dsh-style=\"harness\"])) {\n  color-scheme: dark;\n  accent-color: #7aaaff;\n  --dsw-alias-bg-base: #1f232b;\n  --dsw-alias-bg-layer-1: #272c36;\n  --dsw-alias-bg-layer-2: #2f3542;\n  --dsw-alias-bg-layer-3: #373e4d;\n  --dsw-alias-bg-overlay: #2a303c;\n  --dsw-alias-bg-module-platform: #2c323e;\n  --dsw-alias-settings-card-fill: #262b35;\n  --dsw-alias-settings-card-stroke: rgba(226, 232, 240, 0.12);\n  --dsw-specific-menu: rgba(39, 44, 54, 0.96);\n  --dsw-alias-border-l1: rgba(226, 232, 240, 0.09);\n  --dsw-alias-border-l2: rgba(226, 232, 240, 0.15);\n  --dsw-alias-border-l3: rgba(226, 232, 240, 0.22);\n  --dsw-alias-border-l4: rgba(226, 232, 240, 0.28);\n  --dsw-alias-label-primary: #eef2f7;\n  --dsw-alias-label-secondary: #b6c0cf;\n  --dsw-alias-label-tertiary: #8d98ab;\n  --dsw-alias-label-dimmed: #737e91;\n  --dsw-alias-brand-primary: #7aaaff;\n  --dsw-alias-brand-text: #eef2f7;\n  --dsw-alias-state-business-primary: #7aaaff;\n  --dsw-alias-state-business-tertiary: rgba(122, 170, 255, 0.16);\n  --dsw-alias-link: #8bb6ff;\n  --dsw-alias-button-primary-fill: #5b8def;\n  --dsw-alias-button-primary-hover: #6f9cf4;\n  --dsw-alias-button-primary-ink: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(226, 232, 240, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(226, 232, 240, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(122, 170, 255, 0.15);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.16);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-label: #fcd34d;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.15);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-elevation-panel: 0 4px 16px rgba(10, 14, 22, 0.28), 0 0 0 1px rgba(226, 232, 240, 0.12);\n  --dsw-elevation-prominent: 0 14px 38px rgba(10, 14, 22, 0.42), 0 0 0 1px rgba(226, 232, 240, 0.16);\n  --dsh-button-hover-shadow: 0 2px 8px rgba(10, 14, 22, 0.25);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(10, 14, 22, 0.32);\n  --dsh-surface-spotlight: rgba(122, 170, 255, 0.10);\n}\n\n/* --------------------------------------------------------------------------\n * 3. Preset 2: `cream` — 米白纸感 / Warm Cream\n *    (#FAF7F0 / #F3EFE4 paper surfaces, #2B2620 ink, warm amber/sand accents)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"cream\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"cream\"], :has([data-dsh-style=\"cream\"])) {\n  color-scheme: light;\n  accent-color: #9e5829;\n  --dsw-alias-bg-base: #faf7f0;\n  --dsw-alias-bg-layer-1: #f3efe4;\n  --dsw-alias-bg-layer-2: #eae3d3;\n  --dsw-alias-bg-layer-3: #e0d7c3;\n  --dsw-alias-bg-overlay: #fcfaf4;\n  --dsw-alias-bg-module-platform: #efe9da;\n  --dsw-alias-settings-card-fill: #f5f1e6;\n  --dsw-alias-settings-card-stroke: #dfd5be;\n  --dsw-specific-menu: rgba(252, 250, 244, 0.97);\n  --dsw-alias-border-l1: #e6dec8;\n  --dsw-alias-border-l2: #d4c8ae;\n  --dsw-alias-border-l3: #c0b193;\n  --dsw-alias-border-l4: #ad9c7c;\n  --dsw-alias-label-primary: #2b2620;\n  --dsw-alias-label-secondary: #655b4e;\n  --dsw-alias-label-tertiary: #857968;\n  --dsw-alias-label-dimmed: #9c907f;\n  --dsw-alias-brand-primary: #9e5829;\n  --dsw-alias-brand-text: #2b2620;\n  --dsw-alias-state-business-primary: #a65e2e;\n  --dsw-alias-state-business-tertiary: rgba(166, 94, 46, 0.13);\n  --dsw-alias-link: #934e20;\n  --dsw-alias-button-primary-fill: #9e5829;\n  --dsw-alias-button-primary-hover: #86481e;\n  --dsw-alias-button-primary-ink: #fffdf9;\n  --dsw-alias-interactive-bg-hover: rgba(108, 84, 50, 0.075);\n  --dsw-alias-interactive-bg-active: rgba(166, 94, 46, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(166, 94, 46, 0.12);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 56, 44, 0.11);\n  --dsw-alias-state-error-primary: #b9382c;\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-label: #8c3d08;\n  --dsw-alias-state-warn-tertiary: #fdefd6;\n  --dsw-alias-state-success-primary: #2a6f4e;\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 9px;\n  --dsw-radius-md: 13px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n  --dsw-elevation-panel: 0 3px 12px rgba(68, 52, 32, 0.07), 0 0 0 1px rgba(180, 164, 138, 0.35);\n  --dsw-elevation-prominent: 0 14px 34px rgba(68, 52, 32, 0.14), 0 2px 6px rgba(68, 52, 32, 0.06), 0 0 0 1px rgba(180, 164, 138, 0.42);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 6px rgba(84, 62, 34, 0.09);\n  --dsh-card-hover-shadow: 0 8px 20px rgba(84, 62, 34, 0.10);\n  --dsh-surface-spotlight: rgba(166, 94, 46, 0.08);\n}\n\n/* --------------------------------------------------------------------------\n * 4. Preset 3: `claude` — Claude 暖书卷 / Claude Warmth\n *    (#F5F4ED / #ECE9DF parchment, #C96442 terracotta accent, editorial warmth)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"claude\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"claude\"], :has([data-dsh-style=\"claude\"])) {\n  color-scheme: light;\n  accent-color: #c96442;\n  --dsw-alias-bg-base: #f5f4ed;\n  --dsw-alias-bg-layer-1: #ece9df;\n  --dsw-alias-bg-layer-2: #e3dfd2;\n  --dsw-alias-bg-layer-3: #d8d3c3;\n  --dsw-alias-bg-overlay: #faf9f4;\n  --dsw-alias-bg-module-platform: #e7e3d6;\n  --dsw-alias-settings-card-fill: #efece2;\n  --dsw-alias-settings-card-stroke: #dad5c6;\n  --dsw-specific-menu: rgba(250, 249, 244, 0.97);\n  --dsw-alias-border-l1: #e2ded0;\n  --dsw-alias-border-l2: #d0cbc0;\n  --dsw-alias-border-l3: #bcb6a7;\n  --dsw-alias-border-l4: #a69f8f;\n  --dsw-alias-label-primary: #1f1e1b;\n  --dsw-alias-label-secondary: #5d5a51;\n  --dsw-alias-label-tertiary: #7b776c;\n  --dsw-alias-label-dimmed: #948f83;\n  --dsw-alias-brand-primary: #c96442;\n  --dsw-alias-brand-text: #1f1e1b;\n  --dsw-alias-state-business-primary: #c96442;\n  --dsw-alias-state-business-tertiary: rgba(201, 100, 66, 0.14);\n  --dsw-alias-link: #b35030;\n  --dsw-alias-button-primary-fill: #c96442;\n  --dsw-alias-button-primary-hover: #b25232;\n  --dsw-alias-button-primary-ink: #faf9f5;\n  --dsw-alias-interactive-bg-hover: rgba(31, 30, 27, 0.055);\n  --dsw-alias-interactive-bg-active: rgba(201, 100, 66, 0.14);\n  --dsw-alias-interactive-bg-hover-accent: rgba(201, 100, 66, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(180, 48, 42, 0.11);\n  --dsw-alias-state-error-primary: #b4302a;\n  --dsw-alias-state-warn-primary: #b85d19;\n  --dsw-alias-state-warn-label: #8c430c;\n  --dsw-alias-state-warn-tertiary: #f7e8d6;\n  --dsw-alias-state-success-primary: #2d6a4f;\n  --dsw-radius-xs: 7px;\n  --dsw-radius-sm: 10px;\n  --dsw-radius-md: 14px;\n  --dsw-radius-lg: 18px;\n  --dsw-radius-xl: 22px;\n  --dsw-elevation-panel: 0 3px 14px rgba(31, 30, 27, 0.06), 0 0 0 1px rgba(145, 139, 126, 0.28);\n  --dsw-elevation-prominent: 0 16px 38px rgba(31, 30, 27, 0.13), 0 2px 8px rgba(31, 30, 27, 0.05), 0 0 0 1px rgba(145, 139, 126, 0.34);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 7px rgba(31, 30, 27, 0.08);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(31, 30, 27, 0.09);\n  --dsh-surface-spotlight: rgba(201, 100, 66, 0.08);\n}\n\n/* Subtle editorial serif warmth on primary workbench/dialog headings in Claude preset */\n[data-dsh-style=\"claude\"] :where(header h1, [data-dsh-editorial-heading]),\n:where([role=\"dialog\"], dialog):where([data-dsh-style=\"claude\"], :has([data-dsh-style=\"claude\"])) header h2 {\n  font-family: \"Iowan Old Style\", \"Georgia\", \"Songti SC\", \"Noto Serif SC\", var(--dsw-font-family, serif);\n  letter-spacing: -0.01em;\n}\n\n/* --------------------------------------------------------------------------\n * 5. Preset 4: `pixel8bit` — 8-Bit 像素 / Bright 8-Bit\n *    (#F4F6E8 / #E7EED2 pastel arcade, #1E2826 ink, #2E7D5B & #D95B43 accents,\n *     0px radius, 2px solid crisp borders, 2px 2px 0 pixel shadow,\n *     stepped translate(1px, 1px) press — bright & legible!)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"pixel8bit\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) {\n  color-scheme: light;\n  accent-color: #2e7d5b;\n  --dsw-alias-bg-base: #f4f6e8;\n  --dsw-alias-bg-layer-1: #e7eed2;\n  --dsw-alias-bg-layer-2: #dbe5c0;\n  --dsw-alias-bg-layer-3: #cedaad;\n  --dsw-alias-bg-overlay: #f9fbf0;\n  --dsw-alias-bg-module-platform: #e2ebc9;\n  --dsw-alias-settings-card-fill: #edf2dc;\n  --dsw-alias-settings-card-stroke: #1e2826;\n  --dsw-specific-menu: #f9fbf0;\n  --dsw-alias-border-l1: #7e9478;\n  --dsw-alias-border-l2: #1e2826;\n  --dsw-alias-border-l3: #1e2826;\n  --dsw-alias-border-l4: #1e2826;\n  --dsw-alias-label-primary: #1e2826;\n  --dsw-alias-label-secondary: #3d514c;\n  --dsw-alias-label-tertiary: #58706a;\n  --dsw-alias-label-dimmed: #6e857f;\n  --dsw-alias-brand-primary: #2e7d5b;\n  --dsw-alias-brand-text: #1e2826;\n  --dsw-alias-state-business-primary: #2e7d5b;\n  --dsw-alias-state-business-tertiary: rgba(46, 125, 91, 0.18);\n  --dsw-alias-link: #226448;\n  --dsw-alias-button-primary-fill: #2e7d5b;\n  --dsw-alias-button-primary-hover: #24674a;\n  --dsw-alias-button-primary-ink: #f4f6e8;\n  --dsw-alias-interactive-bg-hover: #dfe9c4;\n  --dsw-alias-interactive-bg-active: #cfe0ad;\n  --dsw-alias-interactive-bg-hover-accent: rgba(46, 125, 91, 0.16);\n  --dsw-alias-interactive-bg-hover-danger: rgba(217, 91, 67, 0.18);\n  --dsw-alias-state-error-primary: #d95b43;\n  --dsw-alias-state-warn-primary: #c47614;\n  --dsw-alias-state-warn-label: #7a4808;\n  --dsw-alias-state-warn-tertiary: #f6e7b4;\n  --dsw-alias-state-success-primary: #2e7d5b;\n  --dsh-pixel-accent-secondary: #d95b43;\n  --dsw-radius-xs: 0px;\n  --dsw-radius-sm: 0px;\n  --dsw-radius-md: 0px;\n  --dsw-radius-lg: 0px;\n  --dsw-radius-xl: 0px;\n  --dsw-corner-shape: square;\n  --dsw-elevation-panel: 3px 3px 0px #1e2826;\n  --dsw-elevation-prominent: 4px 4px 0px #1e2826;\n  --dsh-control-border-width: 2px;\n  --dsh-button-shadow: 2px 2px 0px #1e2826;\n  --dsh-button-hover-shadow: 3px 3px 0px #1e2826;\n  --dsh-card-hover-shadow: 4px 4px 0px #1e2826;\n  --dsh-surface-spotlight: rgba(46, 125, 91, 0.12);\n}\n\n/* Crisp 0px corners, 2px solid borders, and arcade shadows in `pixel8bit` */\n[data-dsh-style=\"pixel8bit\"] :where(button, input, select, textarea, [role=\"button\"], [role=\"tab\"], [role=\"menuitem\"], [role=\"menuitemradio\"], [data-dsh-card], [data-dsh-panel]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button, input, select, textarea, [role=\"menuitem\"], [role=\"menuitemradio\"]) {\n  border-radius: 0px !important;\n  corner-shape: square;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]), .dsh-btn),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]), .dsh-btn) {\n  border: 2px solid #1e2826;\n  box-shadow: 2px 2px 0px #1e2826;\n}\n\n[data-dsh-style=\"pixel8bit\"] :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]), select, textarea) {\n  border-width: 2px;\n  border-color: #1e2826;\n}\n\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) {\n  border: 2px solid #1e2826 !important;\n  box-shadow: 4px 4px 0px #1e2826 !important;\n  backdrop-filter: none;\n}\n\n[data-dsh-style=\"pixel8bit\"] [role=\"tab\"][aria-selected=\"true\"]::after {\n  border-block-end-color: #d95b43;\n  border-block-end-width: 3px;\n}\n\n/* --------------------------------------------------------------------------\n * 6. Preset 5: `mint` — 晴空薄荷 / Airy Mint\n *    (#F5FAFB / #EAF3F6 breeze surfaces, #0F766E teal & #0284C7 sky accents)\n * -------------------------------------------------------------------------- */\n[data-dsh-style=\"mint\"],\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"mint\"], :has([data-dsh-style=\"mint\"])) {\n  color-scheme: light;\n  accent-color: #0f766e;\n  --dsw-alias-bg-base: #f5fafb;\n  --dsw-alias-bg-layer-1: #eaf3f6;\n  --dsw-alias-bg-layer-2: #dcebf0;\n  --dsw-alias-bg-layer-3: #cce1e8;\n  --dsw-alias-bg-overlay: #fafdff;\n  --dsw-alias-bg-module-platform: #e3eff3;\n  --dsw-alias-settings-card-fill: #eef6f8;\n  --dsw-alias-settings-card-stroke: #c7dde5;\n  --dsw-specific-menu: rgba(250, 253, 255, 0.97);\n  --dsw-alias-border-l1: #d5e6ec;\n  --dsw-alias-border-l2: #bdd5de;\n  --dsw-alias-border-l3: #9ec0cd;\n  --dsw-alias-border-l4: #7faab9;\n  --dsw-alias-label-primary: #132a2e;\n  --dsw-alias-label-secondary: #426067;\n  --dsw-alias-label-tertiary: #628088;\n  --dsw-alias-label-dimmed: #7c98a0;\n  --dsw-alias-brand-primary: #0f766e;\n  --dsw-alias-brand-text: #132a2e;\n  --dsw-alias-state-business-primary: #0f766e;\n  --dsw-alias-state-business-tertiary: rgba(15, 118, 110, 0.13);\n  --dsw-alias-link: #0284c7;\n  --dsw-alias-button-primary-fill: #0f766e;\n  --dsw-alias-button-primary-hover: #0d635c;\n  --dsw-alias-button-primary-ink: #f5fafb;\n  --dsw-alias-interactive-bg-hover: rgba(15, 118, 110, 0.07);\n  --dsw-alias-interactive-bg-active: rgba(15, 118, 110, 0.13);\n  --dsw-alias-interactive-bg-hover-accent: rgba(2, 132, 199, 0.11);\n  --dsw-alias-interactive-bg-hover-danger: rgba(200, 50, 64, 0.11);\n  --dsw-alias-state-error-primary: #c83240;\n  --dsw-alias-state-warn-primary: #b4690e;\n  --dsw-alias-state-warn-label: #864c07;\n  --dsw-alias-state-warn-tertiary: #fdf1d6;\n  --dsw-alias-state-success-primary: #0f766e;\n  --dsh-mint-sky-accent: #0284c7;\n  --dsw-radius-xs: 6px;\n  --dsw-radius-sm: 9px;\n  --dsw-radius-md: 12px;\n  --dsw-radius-lg: 16px;\n  --dsw-radius-xl: 20px;\n  --dsw-elevation-panel: 0 3px 12px rgba(15, 76, 92, 0.07), 0 0 0 1px rgba(127, 170, 185, 0.28);\n  --dsw-elevation-prominent: 0 14px 34px rgba(15, 76, 92, 0.13), 0 2px 6px rgba(15, 76, 92, 0.05), 0 0 0 1px rgba(127, 170, 185, 0.34);\n  --dsh-control-border-width: 1px;\n  --dsh-button-hover-shadow: 0 2px 7px rgba(15, 118, 110, 0.11);\n  --dsh-card-hover-shadow: 0 8px 22px rgba(2, 132, 199, 0.10);\n  --dsh-surface-spotlight: rgba(2, 132, 199, 0.08);\n}\n\n/* --------------------------------------------------------------------------\n * 7. Interactive Dynamics: Tactile Button Physics & Active States\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(button, [role=\"button\"]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"]) {\n  /* Identity transforms prevent mid-interaction stacking-context shifts */\n  translate: 0px 0px;\n  scale: 1;\n  transition-property: background-color, border-color, color, box-shadow, opacity, translate, scale;\n  transition-duration: var(--dsh-motion-fast);\n  transition-timing-function: var(--dsh-ease-out);\n}\n\n/* Visible active style on open menu triggers (per `menu` guidance) */\n:where([data-dsh-style]) :where(button, [role=\"button\"])[aria-expanded=\"true\"]:not(:disabled):not([aria-disabled=\"true\"]),\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"])[aria-expanded=\"true\"]:not(:disabled):not([aria-disabled=\"true\"]) {\n  background-color: var(--dsw-alias-interactive-bg-active);\n  color: var(--dsw-alias-label-primary);\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  @media (hover: hover) {\n    :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not([role=\"switch\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]):not([role=\"switch\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: 0px -0.5px;\n    }\n\n    [data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]),\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"menuitem\"]):not([role=\"menuitemradio\"]), .dsh-btn):hover:not(:disabled):not([aria-disabled=\"true\"]) {\n      translate: -1px -1px;\n      box-shadow: 3px 3px 0px #1e2826;\n      transition-timing-function: steps(2, end);\n      transition-duration: 70ms;\n    }\n  }\n\n  /* Tactile spring press on non-pixel themes */\n  :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"switch\"]), [role=\"button\"]):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"switch\"]), [role=\"button\"]):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    scale: 0.965;\n    translate: 0px 0.5px;\n    transition-duration: 80ms;\n  }\n\n  /* Stepped 8-Bit arcade press (`translate(1px, 1px)` + crisp 1px pixel shadow) */\n  [data-dsh-style=\"pixel8bit\"] :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style=\"pixel8bit\"], :has([data-dsh-style=\"pixel8bit\"])) :where(button:not([role=\"tab\"]):not([role=\"switch\"]), .dsh-btn):active:not(:disabled):not([aria-disabled=\"true\"]) {\n    translate: 1px 1px !important;\n    scale: 1 !important;\n    box-shadow: 1px 1px 0px #1e2826 !important;\n    transition-timing-function: steps(2, end);\n    transition-duration: 50ms;\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 8. Small-Button SVG Icon Micro-Animations\n *    Works automatically with `svg[data-dsh-icon=\"<name>\"]` or `svg[data-icon=\"<name>\"]`\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) :where(button, [role=\"button\"], summary) svg,\n:where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"], summary) svg {\n  translate: 0px 0px;\n  rotate: 0deg;\n  scale: 1;\n  transform-origin: center;\n}\n\n@keyframes dsh-icon-spin {\n  to {\n    rotate: 360deg;\n  }\n}\n\n@keyframes dsh-icon-wiggle {\n  0% { rotate: 0deg; }\n  25% { rotate: -12deg; }\n  55% { rotate: 10deg; }\n  80% { rotate: -5deg; }\n  100% { rotate: 0deg; }\n}\n\n@keyframes dsh-icon-pop {\n  0% { scale: 1; }\n  45% { scale: 1.26; }\n  75% { scale: 0.94; }\n  100% { scale: 1; }\n}\n\n@keyframes dsh-icon-bounce {\n  0%, 100% { translate: 0px 0px; }\n  45% { translate: 0px 2.5px; }\n  75% { translate: 0px -1px; }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]) :where(button, [role=\"button\"], summary) svg,\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"], summary) svg {\n    transition:\n      translate var(--dsh-motion-base) var(--dsh-ease-spring),\n      rotate 240ms var(--dsh-ease-spring),\n      scale var(--dsh-motion-base) var(--dsh-ease-spring);\n  }\n\n  /* 1) `down` / chevron: 180deg flip on `[aria-expanded=\"true\"]` or `details[open]` */\n  :where([data-dsh-style]) :where([aria-expanded=\"true\"], [data-open=\"true\"], details[open] > summary) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog):has([data-dsh-style]) :where([aria-expanded=\"true\"], [data-open=\"true\"]) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]) {\n    rotate: 180deg;\n  }\n\n  /* 2) `refresh` / `sync`: smooth 180deg spin on hover, continuous spin when busy */\n  :where([data-dsh-style]) :where(button, [role=\"button\"])[aria-busy=\"true\"] :is(svg[data-dsh-icon=\"refresh\"], svg[data-dsh-icon=\"sync\"], svg[data-icon=\"refresh\"], svg[data-icon=\"sync\"]),\n  :where([data-dsh-style]) :is(svg[data-dsh-icon=\"refresh\"], svg[data-icon=\"refresh\"])[data-spinning=\"true\"] {\n    animation: dsh-icon-spin 0.85s linear infinite;\n  }\n\n  @media (hover: hover) {\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"refresh\"], svg[data-dsh-icon=\"sync\"], svg[data-dsh-icon=\"reload\"], svg[data-icon=\"refresh\"], svg[data-icon=\"sync\"], svg[data-icon=\"reload\"]) {\n      rotate: 180deg;\n    }\n\n    /* 3) `plus` / `close`: crisp 90deg turn */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"plus\"], svg[data-dsh-icon=\"add\"], svg[data-dsh-icon=\"close\"], svg[data-dsh-icon=\"x\"], svg[data-icon=\"plus\"], svg[data-icon=\"add\"], svg[data-icon=\"close\"], svg[data-icon=\"x\"]) {\n      rotate: 90deg;\n    }\n\n    /* 4) `send` / `external` / `link`: forward/diagonal glide */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], a):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"send\"], svg[data-dsh-icon=\"external\"], svg[data-dsh-icon=\"link\"], svg[data-icon=\"send\"], svg[data-icon=\"external\"], svg[data-icon=\"link\"]) {\n      translate: 2px -1.5px;\n    }\n\n    /* 5) `reply` / `left` / `undo`: leading glide */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"reply\"], svg[data-dsh-icon=\"left\"], svg[data-dsh-icon=\"undo\"], svg[data-icon=\"reply\"], svg[data-icon=\"left\"], svg[data-icon=\"undo\"]) {\n      translate: -2px 0px;\n    }\n\n    /* 6) `right` / `play`: trailing nudge & pulse */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"right\"], svg[data-icon=\"right\"]) {\n      translate: 2px 0px;\n    }\n\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"play\"], svg[data-icon=\"play\"]) {\n      translate: 1.5px 0px;\n      scale: 1.14;\n    }\n\n    /* 7) `trash` / `delete`: tactile warning wiggle */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"trash\"], svg[data-dsh-icon=\"delete\"], svg[data-icon=\"trash\"], svg[data-icon=\"delete\"]) {\n      animation: dsh-icon-wiggle 360ms var(--dsh-ease-in-out);\n    }\n\n    /* 8) `star` / `check` / `copy` / `bookmark`: spring pop */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"star\"], svg[data-dsh-icon=\"check\"], svg[data-dsh-icon=\"copy\"], svg[data-dsh-icon=\"bookmark\"], svg[data-icon=\"star\"], svg[data-icon=\"check\"], svg[data-icon=\"copy\"], svg[data-icon=\"bookmark\"]) {\n      scale: 1.18;\n    }\n\n    /* 9) `download` / `export`: vertical bounce */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"download\"], svg[data-dsh-icon=\"export\"], svg[data-icon=\"download\"], svg[data-icon=\"export\"]) {\n      animation: dsh-icon-bounce 420ms var(--dsh-ease-out);\n    }\n\n    /* 10) `palette` / `sparkles` / `edit`: playful tilt */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"]):hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"palette\"], svg[data-dsh-icon=\"sparkles\"], svg[data-dsh-icon=\"edit\"], svg[data-icon=\"palette\"], svg[data-icon=\"sparkles\"], svg[data-icon=\"edit\"]) {\n      rotate: -12deg;\n      scale: 1.08;\n    }\n\n    /* Closed chevron gentle downward cue on hover */\n    :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"])[aria-expanded=\"false\"]:hover:not(:disabled):not([aria-disabled=\"true\"]) :is(svg[data-dsh-icon=\"down\"], svg[data-dsh-icon=\"chevron-down\"], svg[data-icon=\"down\"], svg[data-icon=\"chevron-down\"]) {\n      translate: 0px 1.5px;\n    }\n  }\n\n  /* Pop feedback when toggled into active/pressed/checked state */\n  :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where([aria-pressed=\"true\"], [aria-checked=\"true\"], [data-active=\"true\"], [data-copied=\"true\"]) :is(svg[data-dsh-icon=\"star\"], svg[data-dsh-icon=\"check\"], svg[data-dsh-icon=\"copy\"], svg[data-icon=\"star\"], svg[data-icon=\"check\"], svg[data-icon=\"copy\"]) {\n    animation: dsh-icon-pop 300ms var(--dsh-ease-spring);\n  }\n}\n\n/* --------------------------------------------------------------------------\n * 9. Tabs, Interactive Rows, Cards & Top-Layer Dialog/Popover Entrance\n * -------------------------------------------------------------------------- */\n:where([data-dsh-style]) [role=\"tablist\"] {\n  scrollbar-width: thin;\n}\n\n:where([data-dsh-style]) [role=\"tab\"] {\n  position: relative;\n}\n\n/* Non-color border indicator on selected tabs (WCAG 1.4.1 + Forced Colors safe) */\n:where([data-dsh-style]) [role=\"tab\"][aria-selected=\"true\"]::after {\n  content: \"\";\n  position: absolute;\n  inset-inline: 6px;\n  inset-block-end: 0;\n  border-block-end: 2px solid var(--dsw-alias-state-business-primary);\n  pointer-events: none;\n}\n\n/* Interactive workbench cards & list rows */\n:where([data-dsh-style]) :where([data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row) {\n  translate: 0px 0px;\n  transition:\n    background-color var(--dsh-motion-fast) var(--dsh-ease-out),\n    border-color var(--dsh-motion-fast) var(--dsh-ease-out),\n    box-shadow var(--dsh-motion-base) var(--dsh-ease-out),\n    translate var(--dsh-motion-base) var(--dsh-ease-out);\n}\n\n@media (hover: hover) and (prefers-reduced-motion: no-preference) {\n  :where([data-dsh-style]:not([data-dsh-style=\"pixel8bit\"])) :where([data-dsh-card], .dsh-card):hover {\n    translate: 0px -1.5px;\n    box-shadow: var(--dsh-card-hover-shadow);\n  }\n\n  [data-dsh-style=\"pixel8bit\"] :where([data-dsh-card], .dsh-card):hover {\n    translate: -1px -1px;\n    box-shadow: 4px 4px 0px #1e2826;\n  }\n\n  :where([data-dsh-style]) :where([data-dsh-row], .dsh-row):hover:not([data-selected=\"true\"]):not([aria-selected=\"true\"]) {\n    background-color: var(--dsh-surface-spotlight, var(--dsw-alias-interactive-bg-hover));\n  }\n}\n\n/* Modal / Dialog & Popover Top-Layer Entrance + Scroll Containment */\n:where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n  overscroll-behavior: contain;\n  opacity: 1;\n  transition-property: opacity, scale, translate, display, overlay;\n  transition-duration: var(--dsh-motion-dialog);\n  transition-timing-function: var(--dsh-ease-out);\n  /* Separate declaration after transition so older parsers never drop transitions */\n  transition-behavior: allow-discrete;\n}\n\n@starting-style {\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    opacity: 0;\n  }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    scale: 1;\n    translate: 0px 0px;\n  }\n\n  @starting-style {\n    :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n      scale: 0.965;\n      translate: 0px 6px;\n    }\n  }\n}\n\ndialog[open]::backdrop {\n  overflow: hidden;\n  overscroll-behavior: contain;\n}\n\n/* --------------------------------------------------------------------------\n * 10. Unified Header Style Switcher Chrome (`.dsh-style-switcher`)\n * -------------------------------------------------------------------------- */\n.dsh-style-switcher {\n  display: inline-flex;\n  align-items: center;\n  flex: none;\n}\n\n.dsh-style-trigger.dsh-style-trigger {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 28px;\n  padding-inline: 8px;\n  width: auto;\n  font-size: 12px;\n  line-height: 18px;\n  font-weight: 500;\n  color: var(--dsw-alias-label-secondary);\n  background: var(--dsw-alias-bg-layer-1);\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-sm, 8px);\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n@media (hover: hover) {\n  .dsh-style-trigger.dsh-style-trigger:hover:not(:disabled) {\n    color: var(--dsw-alias-label-primary);\n    background: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n.dsh-style-swatch {\n  display: inline-block;\n  flex: none;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  corner-shape: round;\n  background: var(--dsh-swatch-color, var(--dsw-alias-state-business-primary));\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.16);\n}\n\n[data-dsh-style=\"pixel8bit\"] .dsh-style-swatch {\n  border-radius: 0px !important;\n  corner-shape: square;\n  box-shadow: 1px 1px 0px #1e2826;\n}\n\n.dsh-style-fallback-wrap {\n  position: relative;\n  display: inline-flex;\n}\n\n.dsh-style-fallback-menu {\n  position: absolute;\n  inset-block-start: calc(100% + 4px);\n  inset-inline-end: 0;\n  z-index: 2147483001;\n  display: grid;\n  gap: 2px;\n  min-width: 168px;\n  padding: 4px;\n  background: var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-base));\n  border: var(--dsh-control-border-width, 0.5px) solid var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-md, 12px);\n  box-shadow: var(--dsw-elevation-prominent);\n}\n\n.dsh-style-fallback-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n  min-height: 28px;\n  padding: 4px 8px;\n  border: 0;\n  border-radius: var(--dsw-radius-xs, 6px);\n  background: transparent;\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  font-size: 12px;\n  text-align: start;\n  cursor: pointer;\n}\n\n.dsh-style-fallback-item[aria-checked=\"true\"] {\n  background: var(--dsw-alias-interactive-bg-active);\n  font-weight: 600;\n}\n\n@media (hover: hover) {\n  .dsh-style-fallback-item:hover:not(:disabled) {\n    background: var(--dsw-alias-interactive-bg-hover);\n  }\n}\n\n/* Fallback Modal & Menu Chrome (when host `@deepseek-ai/dsh-client-ui-primitives` is absent) */\n.dsh-fallback-modal-root {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n  display: grid;\n  place-items: center;\n  padding: 16px;\n}\n\n.dsh-fallback-modal-mask {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.36);\n}\n\n.dsh-fallback-modal-dialog {\n  position: relative;\n  z-index: 1;\n  max-width: min(560px, calc(100dvw - 32px));\n  max-height: calc(100dvh - 32px);\n  overflow: clip;\n  display: flex;\n  flex-direction: column;\n  border-radius: var(--dsw-radius-md, 12px);\n  background: var(--dsw-alias-bg-layer-1, #f8fafc);\n  color: var(--dsw-alias-label-primary, #1f232b);\n  box-shadow: var(--dsw-elevation-prominent);\n}\n\n/* --------------------------------------------------------------------------\n * 11. Accessibility: Reduced Motion & Windows High Contrast (Forced Colors)\n * -------------------------------------------------------------------------- */\n@media (prefers-reduced-motion: reduce) {\n  :where([data-dsh-style]) :where(button, [role=\"button\"], [data-dsh-card], .dsh-card, [data-dsh-row], .dsh-row),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):has([data-dsh-style]) :where(button, [role=\"button\"]) {\n    translate: none !important;\n    scale: none !important;\n    transition-property: background-color, border-color, color, opacity;\n    transition-duration: 90ms;\n  }\n\n  :where([data-dsh-style], [role=\"dialog\"], [role=\"alertdialog\"], dialog) :where(button, [role=\"button\"], summary) svg {\n    animation: none !important;\n    transition: none !important;\n    translate: none !important;\n    scale: none !important;\n  }\n\n  /* Short, non-spatial fade only for top-layer dialogs under reduced motion */\n  :where([role=\"dialog\"], [role=\"alertdialog\"], dialog[open]):where([data-dsh-style], :has([data-dsh-style])) {\n    scale: none !important;\n    translate: none !important;\n    transition-duration: 100ms;\n  }\n}\n\n@media (forced-colors: active) {\n  :where([data-dsh-style]) :where(button, input, select, textarea),\n  :where([role=\"dialog\"], [role=\"alertdialog\"], [role=\"menu\"], dialog):where([data-dsh-style], :has([data-dsh-style])) {\n    border: 1px solid ButtonText;\n  }\n\n  :where([data-dsh-style]) [role=\"tab\"][aria-selected=\"true\"]::after {\n    border-block-end: 3px solid Highlight;\n  }\n}\n";
/**
 * DeepSeek Harness (>=0.2.2-rc.3) Unified Style Switcher & Safe Host Primitives
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
    zh: '8-Bit 像素',
    zhShort: '8-Bit像素',
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
    swatch: '#0f766e',
    surface: '#f5fafb',
  }),
]);

const VALID_STYLE_IDS = new Set(DSH_STYLES.map(preset => preset.id));

function resolveWindow(win) {
  if (win && typeof win === 'object') return win;
  return typeof window !== 'undefined' ? window : null;
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

/**
 * Stamps `[data-dsh-style]` and `[data-window-drag-exclude]` onto any currently
 * open portaled `[role="dialog"]` / `[role="menu"]` surfaces in `document.body`
 * that were synced via `createOverlaySyncRef` or carry `[data-dsh-portal-synced]`.
 */
function syncPortaledOverlays(style, doc) {
  const normalized = normalizeDshStyle(style);
  const targetDoc = doc || (typeof document !== 'undefined' ? document : null);
  if (!targetDoc || typeof targetDoc.querySelectorAll !== 'function') return;
  for (const el of targetDoc.querySelectorAll('[data-dsh-portal-synced]')) {
    el.setAttribute('data-dsh-style', normalized);
    if (!el.hasAttribute('data-window-drag-exclude')) {
      el.setAttribute('data-window-drag-exclude', '');
    }
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
    syncPortaledOverlays(normalized, target.document);
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

function subscribeDshStyle(onChange, win) {
  const target = resolveWindow(win);
  if (!target || typeof target.addEventListener !== 'function' || typeof onChange !== 'function') {
    return () => {};
  }
  const onCustom = event => {
    const next = normalizeDshStyle(event?.detail?.style ?? readDshStyle(target));
    syncPortaledOverlays(next, target.document);
    onChange(next);
  };
  const onStorage = event => {
    if (event && event.key !== null && event.key !== undefined && event.key !== DSH_STYLE_STORAGE_KEY) {
      return;
    }
    const next = normalizeDshStyle(event?.newValue ?? readDshStyle(target));
    syncPortaledOverlays(next, target.document);
    onChange(next);
  };
  target.addEventListener(DSH_STYLE_EVENT, onCustom);
  target.addEventListener('storage', onStorage);
  return () => {
    target.removeEventListener(DSH_STYLE_EVENT, onCustom);
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
      syncPortaledOverlays(current, resolveWindow(win)?.document);
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
 * Callback ref for elements rendered inside host `@deepseek-ai/dsh-client-ui-primitives`
 * `Modal` or `Menu` portals (`createPortal(..., document.body)`).
 * Host `Modal` and `Menu` do not spread arbitrary `data-*` props onto their outer
 * `<div role="dialog">` / `<div role="menu">` wrapper, so attaching this ref to an
 * inner header/body wrapper promotes `data-dsh-style` and `data-window-drag-exclude`
 * onto the portaled overlay frame itself.
 */
function createOverlaySyncRef(style) {
  const normalized = normalizeDshStyle(style);
  return node => {
    if (!node || typeof node.setAttribute !== 'function') return;
    node.setAttribute('data-dsh-style', normalized);
    node.setAttribute('data-window-drag-exclude', '');
    node.setAttribute('data-dsh-portal-synced', 'true');
    if (typeof node.closest === 'function') {
      const overlay = node.closest('[role="dialog"], [role="alertdialog"], [role="menu"], dialog');
      if (overlay) {
        overlay.setAttribute('data-dsh-style', normalized);
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

  let fallbackControlSeq = 0;
  function FallbackCheckbox({ checked = false, onChange, label, disabled = false, title, className, id, ...rest }) {
    const inputId = id || (typeof React.useId === 'function' ? React.useId() : 'dsh-chk-' + (++fallbackControlSeq));
    return h(
      'label',
      { htmlFor: inputId, className, title },
      h('input', {
        id: inputId,
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

  function renderPortalSyncNode(styleValue) {
    const syncStyle = normalizeDshStyle(styleValue ?? readDshStyle());
    return h('span', {
      key: '__dsh_portal_sync__',
      ref: createOverlaySyncRef(syncStyle),
      hidden: true,
      'aria-hidden': 'true',
      'data-dsh-style': syncStyle,
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
  }) {
    const style = normalizeDshStyle(dshStyle ?? readDshStyle());
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
            items.map(item =>
              h(
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
                h('span', null, item.label),
                item.id === selectedId ? h('span', { 'aria-hidden': 'true' }, '✓') : null,
              ),
            ),
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
  }) {
    if (!open) return null;
    const style = normalizeDshStyle(dshStyle ?? readDshStyle());
    return h(
      'div',
      {
        className: 'dsh-fallback-modal-root',
        role: 'presentation',
        'data-dsh-style': style,
        'data-window-drag-exclude': '',
        'data-dsh-portal-synced': 'true',
        onKeyDownCapture: event => {
          onKeyDownCapture?.(event);
          if (!event?.defaultPrevented && event?.key === 'Escape') {
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
    ? function HostMenuWithStyle({ dshStyle, children, ...menuProps }) {
        if (!menuProps.open) {
          return children !== undefined ? h(host.Menu, menuProps, children) : h(host.Menu, menuProps);
        }
        const syncNode = renderPortalSyncNode(dshStyle);
        return children !== undefined && children !== null
          ? h(host.Menu, menuProps, children, syncNode)
          : h(host.Menu, menuProps, syncNode);
      }
    : FallbackMenu;

  const WrappedModal = host?.Modal
    ? function HostModalWithStyle({ dshStyle, children, ...modalProps }) {
        if (!modalProps.open) {
          return children !== undefined ? h(host.Modal, modalProps, children) : h(host.Modal, modalProps);
        }
        const syncNode = renderPortalSyncNode(dshStyle);
        return children !== undefined && children !== null
          ? h(host.Modal, modalProps, children, syncNode)
          : h(host.Modal, modalProps, syncNode);
      }
    : FallbackModal;

  return {
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
}

/**
 * Ready-made 5-preset Style Switcher component factory (`StyleSwitcher`).
 * Renders a compact header menu button with a live color swatch, localized preset
 * label, `aria-expanded` state, and `down` chevron (which flips 180deg when open),
 * syncing selection via `localStorage['dsh-stardust:ui-style']` + `dsh-stardust-style`.
 */
function createStyleSwitcherComponent(React, requireFn) {
  const h = React.createElement;
  return function StyleSwitcher({
    style: controlledStyle,
    onChange,
    lang = 'zh',
    id = 'dsh-style-switcher',
    compact = false,
    disabled = false,
    align = 'end',
    className,
  } = {}) {
    const [syncedStyle, setSyncedStyle] = useDshStyle(React);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    const [open, setOpen] = typeof React.useState === 'function' ? React.useState(false) : [false, () => {}];
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
            onClick: () => setOpen(prev => !prev),
            onKeyDown: event => {
              if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                event.preventDefault?.();
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
    );
  };
}

/* DSH Workbench UI v2 — DeepSeek Harness (>=0.2.2-rc.3) Host Primitives,
 * 5-Style Theme Switcher (`harness`, `cream`, `claude`, `pixel8bit`, `mint`),
 * Never-Too-Dark Soft Slate Adaptation, and Tactile Micro-Motion.
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

  function Checkbox({ label, checked = false, onChange, hiddenLabel = false, disabled = false, className, ...props }) {
    const P = primitives();
    return h(P.Checkbox, {
      ...props,
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
    rootRef,
    style: controlledStyle,
    onStyleChange,
    styleSwitcherId,
    ...props
  }) {
    const [syncedStyle, setSyncedStyle] = useDshStyle(React);
    const activeStyle = normalizeDshStyle(controlledStyle ?? syncedStyle);
    return h(
      'section',
      {
        ...props,
        ref: rootRef,
        className: cx('dsh-wb-page', !workbench && 'dsh-wb-embedded', className),
        'data-dsh-style': activeStyle,
        'data-main': workbench ? 'true' : 'false',
      },
      h(Styles, { key: 'dsh-wb-styles' }),
      h(
        'header',
        { className: 'dsh-wb-header' },
        h(
          'div',
          { className: 'dsh-wb-heading' },
          h(
            'h1',
            { className: 'dsh-wb-title', 'data-dsh-editorial-heading': '' },
            h('span', { className: 'dsh-wb-brand', 'aria-hidden': 'true' }, h(Icon, { name: icon, size: 16 })),
            h('span', null, title),
          ),
          subtitle ? h('p', { className: 'dsh-wb-subtitle' }, subtitle) : null,
        ),
        navigation,
        h(
          'div',
          { className: 'dsh-wb-header-actions', 'data-window-drag-exclude': '' },
          actions,
          h(StyleSwitcher, {
            id: styleSwitcherId,
            style: activeStyle,
            lang,
            compact: true,
            onChange: next => {
              setSyncedStyle(next);
              onStyleChange?.(next);
            },
          }),
        ),
      ),
      toolbar ? h('div', { className: 'dsh-wb-subbar' }, toolbar) : null,
      h('div', { className: 'dsh-wb-body', 'data-show-updates': showUpdates ? 'true' : 'false' }, children),
    );
  }

  function Tabs({ items = [], value, onChange, label, id: customId, children, footer, className }) {
    const baseId = customId || useSafeId('dsh-wb-tabs');
    const active = items.some(item => item.id === value) ? value : items[0]?.id;
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
      { className: cx('dsh-wb-tabs', className), role: 'tablist', 'aria-label': label },
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
    );
    if (children === undefined && footer === undefined) return tablist;
    return h(
      'div',
      { className: 'dsh-wb-tabs-layout' },
      tablist,
      h(
        'div',
        {
          className: 'dsh-wb-tab-panel',
          id: baseId + '-panel',
          role: 'tabpanel',
          'aria-labelledby': baseId + '-tab-' + active,
        },
        children,
        footer,
      ),
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

  function Split({ list, detail, selected, onBack, backLabel, className, listWidth = 360 }) {
    const ref = useSafeRef(null);
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
        className: cx('dsh-wb-split', className),
        'data-selected': selected ? 'true' : 'false',
        style: { '--dsh-list-width': listWidth + 'px' },
      },
      h('div', { className: 'dsh-wb-master' }, list),
      h(
        'div',
        { className: 'dsh-wb-detail' },
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

  function Row({ title, meta, description, active, onClick, children, status, statusTone, className, disabled }) {
    return h(
      'div',
      {
        className: cx('dsh-wb-row', 'dsh-row', active && 'is-selected', className),
        'data-dsh-row': '',
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
          h('strong', null, title),
          status ? h('span', { className: 'dsh-wb-tag', 'data-tone': statusTone }, status) : null,
        ),
        meta ? h('span', { className: 'dsh-wb-row-meta' }, meta) : null,
        description ? h('span', { className: 'dsh-wb-row-desc' }, description) : null,
      ),
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

  function GuideDetails({ summary, children, open = false, className, ...props }) {
    return h(
      'details',
      { ...props, className: cx('dsh-wb-guide', className), open: open || undefined },
      h('summary', { className: 'dsh-wb-guide-summary' }, summary),
      h('div', { className: 'dsh-wb-guide-body' }, children),
    );
  }

  function Dialog({ title, children, onClose, closeLabel = 'Close', className, busy = false, footer, tone, wide = false }) {
    const [style] = useDshStyle(React);
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
          ref: createOverlaySyncRef(style),
          className: 'dsh-wb-dialog-frame',
          'data-dsh-style': style,
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
.dsh-wb-dialog-frame {
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
  font-family: var(--dsh-font-family-content, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif);
  font-size: 13px;
  line-height: 20px;
  text-align: start;
}

.dsh-wb-page *,
.dsh-wb-page *::before,
.dsh-wb-page *::after,
.dsh-wb-dialog-frame *,
.dsh-wb-dialog-frame *::before,
.dsh-wb-dialog-frame *::after {
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
  background: var(--w-bg-base);
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
  display: flex;
  flex: none;
  min-height: 52px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 18px;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-base);
}

.dsh-wb-heading {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.dsh-wb-title {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  font-weight: 650;
  color: var(--w-ink);
}

.dsh-wb-subtitle {
  margin: 0;
  padding-inline-start: 35px;
  font-size: 12px;
  line-height: 18px;
  color: var(--w-muted);
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

.dsh-wb-brand {
  width: 26px;
  height: 26px;
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
}

.dsh-wb-subbar {
  display: flex;
  flex: none;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
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

.dsh-wb-body > [data-plugin-update-footer],
.dsh-wb-tab-panel > [data-plugin-update-footer] {
  box-sizing: border-box;
  width: min(100%, 960px);
  margin: auto auto 0;
  padding: 14px 20px 22px;
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.dsh-wb-body[data-show-updates="false"] [data-plugin-update-footer] {
  display: none;
}

.dsh-wb-tabs {
  display: flex;
  flex: none;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow-x: auto;
  padding: 6px 18px 0;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-base);
}

.dsh-wb-tab.dsh-wb-tab {
  flex: none;
  min-height: 34px;
  padding: 6px 12px 8px;
  border: 0;
  border-radius: var(--w-radius-xs) var(--w-radius-xs) 0 0;
  background: transparent;
  color: var(--w-muted);
  font-weight: 550;
  white-space: nowrap;
  box-shadow: none;
}

.dsh-wb-tab.dsh-wb-tab[aria-selected="true"] {
  color: var(--w-ink);
  background: var(--w-hover);
  font-weight: 650;
}

.dsh-wb-tab-panel {
  overflow: auto;
  overscroll-behavior: contain;
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

.dsh-wb-btn-outline.dsh-wb-btn-outline {
  background: var(--w-bg-base);
  color: var(--w-ink);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border-strong);
  box-shadow: var(--dsh-button-shadow, none);
}

.dsh-wb-btn-ghost.dsh-wb-btn-ghost {
  background: transparent;
  color: var(--w-muted);
  border: var(--dsh-control-border-width, 0.5px) solid transparent;
}

.dsh-wb-btn-primary.dsh-wb-btn-primary {
  background: var(--w-primary-fill);
  color: var(--w-primary-ink);
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-primary-fill);
  box-shadow: var(--dsh-button-shadow, none);
}

.dsh-wb-btn-danger.dsh-wb-btn-danger {
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
  display: grid;
  grid-template-columns: minmax(250px, var(--dsh-list-width, 360px)) minmax(0, 1fr);
  flex: 1;
  min-height: 440px;
  min-width: 0;
}

.dsh-wb-master {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  border-inline-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-base);
}

.dsh-wb-detail {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  overflow-wrap: anywhere;
  padding: 20px 24px;
  background: var(--w-bg-base);
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
  padding: 12px 14px;
  border-block-end: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  background: var(--w-bg-1);
}

.dsh-wb-row {
  display: flex;
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
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
  width: 100%;
  min-width: 0;
  padding: 13px 14px;
  border: 0 !important;
  box-shadow: none !important;
  background: transparent;
  color: inherit;
  text-align: start;
  cursor: pointer;
}

.dsh-wb-row-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.dsh-wb-row-head > strong {
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

/* Compact Collapsible Human Workflow Guide & CopyPrompt */
.dsh-wb-guide {
  border: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
  border-radius: var(--w-radius-md);
  background: var(--w-bg-1);
  padding: 9px 14px;
  text-align: start;
}

.dsh-wb-guide-summary {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.55ch;
  min-block-size: 24px;
  cursor: pointer;
  font-size: 12.5px;
  line-height: 19px;
  font-weight: 600;
  color: var(--w-ink);
  user-select: none;
}

.dsh-wb-guide-summary::-webkit-details-marker {
  display: none;
}

.dsh-wb-guide-summary::before {
  content: "▸";
  content: "▸" / "";
  display: inline-block;
  flex-shrink: 0;
  color: var(--w-accent);
  rotate: 0deg;
}

.dsh-wb-guide[open] > .dsh-wb-guide-summary::before {
  rotate: 90deg;
}

@media (prefers-reduced-motion: no-preference) {
  .dsh-wb-guide-summary::before {
    transition: rotate 0.18s ease;
  }
}

.dsh-wb-guide-body {
  display: grid;
  gap: 10px;
  margin-block-start: 8px;
  padding-block-start: 8px;
  border-block-start: var(--dsh-control-border-width, 0.5px) solid var(--w-border);
}

.dsh-wb-guide-steps {
  margin: 0;
  padding-inline-start: 18px;
  display: grid;
  gap: 5px;
  color: var(--w-muted);
  font-size: 12.5px;
  line-height: 19px;
}

.dsh-wb-guide-actions,
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
  font: 11.5px/1.5 ui-monospace, SFMono-Regular, Consolas, monospace;
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
.dsh-wb-dialog-frame :focus-visible {
  outline: 2px solid var(--w-accent);
  outline-offset: 2px;
}

/* Container Queries */
@container dsh-workbench (max-width: 960px) {
  .dsh-wb-split {
    grid-template-columns: minmax(230px, 36%) minmax(0, 1fr);
  }
}

@container dsh-workbench (max-width: 760px) {
  .dsh-wb-header {
    flex-wrap: wrap;
    padding: 10px 14px;
  }
  .dsh-wb-subtitle {
    padding-inline-start: 0;
  }
  .dsh-wb-header-actions {
    width: 100%;
    margin-inline-start: 0;
    justify-content: flex-start;
  }
  .dsh-wb-tabs {
    padding-inline: 12px;
  }
  .dsh-wb-split {
    display: flex;
    flex-direction: column;
    min-height: 360px;
  }
  .dsh-wb-split[data-selected="false"] > .dsh-wb-detail {
    display: none;
  }
  .dsh-wb-split[data-selected="true"] > .dsh-wb-master {
    display: none;
  }
  .dsh-wb-master {
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

  const styles = DSH_THEMES_AND_MOTION_CSS + '\n' + WORKBENCH_V2_CSS;

  function ensureStylesInHead() {
    if (typeof document === 'undefined' || !document.head || typeof document.querySelector !== 'function') {
      return false;
    }
    const id = 'dsh-workbench-ui-v2';
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
    return h('style', { 'data-plugin-css': 'dsh-workbench-ui-v2' }, styles);
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
    Status,
    Empty,
    Split,
    Row,
    Details,
    GuideDetails,
    CopyPrompt,
    Dialog,
    StyleSwitcher,
    Styles,
    register,
    primitives,
    styles,
    DSH_STYLES,
    useDshStyle,
    readDshStyle,
    writeDshStyle,
    subscribeDshStyle,
    createOverlaySyncRef,
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

function SecurityWorkflowGuide({ defaultOpen = false }) {
  return h(
    W.GuideDetails,
    {
      open: defaultOpen,
      className: 'secw-workflow-guide',
      'data-sec-workflow-guide': '',
      summary: t(
        '安全巡检 4 步流：扫改动 → 看证据链 → 让助手修漏洞 → 复测归档',
        '4-Step Security Loop: Check diff → Inspect evidence → Fix in chat → Recheck & archive',
      ),
    },
    h(
      'ol',
      { className: 'dsh-wb-guide-steps' },
      h(
        'li',
        null,
        t(
          '扫改动：日常提交前点「检查改动」快速巡检 Git 新增代码；首次接手或发版前点「检查代码」建立全仓基线。',
          'Check diff: Run “Check changes” before commits for fast Git diff checks, or “Scan code” to establish a full baseline.',
        ),
      ),
      h(
        'li',
        null,
        t(
          '看证据链：在「检查结果」核对文件行号、数据流/模式依据与脱敏片段，排除测试夹具或预期公开常量。',
          'Inspect evidence: Review file lines, data-flow or pattern context, and redacted snippets to separate real risks from test fixtures.',
        ),
      ),
      h(
        'li',
        null,
        t(
          '让助手修漏洞：一键复制下方或问题详情里的修复指令发到项目聊天，让助手结合上下文完成安全修复。',
          'Fix in chat: Copy a fix prompt in one click and paste it into your project chat so the assistant patches the root cause.',
        ),
      ),
      h(
        'li',
        null,
        t(
          '复测归档：修完后点「复查修复」对同一范围重验关闭情况，按需下载 Markdown 或 SARIF 报告归档。',
          'Recheck & archive: Click “Recheck fixes” on the same scope to confirm closure, then export Markdown or SARIF reports if needed.',
        ),
      ),
    ),
    h(
      'div',
      { className: 'dsh-wb-guide-actions' },
      h(SecurityPromptChip, {
        variant: 'primary',
        prompt: t(
          '审查当前 Git 改动的安全问题，给出触发条件、文件位置和脱敏证据',
          'Review current Git changes for security issues with triggers, file locations, and redacted evidence',
        ),
        label: t('复制：审查 Git 改动', 'Copy: Check Git diff'),
      }),
      h(SecurityPromptChip, {
        prompt: t(
          '检查这个项目的安全问题并按高风险优先汇总',
          'Check this project for security issues and prioritize high-risk findings',
        ),
        label: t('复制：检查整个项目', 'Copy: Scan project'),
      }),
      h(SecurityPromptChip, {
        prompt: t(
          '根据当前安全检查结果逐项修复高风险问题，修完后对同一范围复查确认关闭',
          'Fix high-risk findings from the latest security check, then recheck the same scope to confirm closure',
        ),
        label: t('复制：让助手修漏洞并复测', 'Copy: Fix & recheck'),
      }),
    ),
  );
}

function SecurityResults({
  report,
  findings,
  fresh,
  filter,
  setFilter,
  limit,
  setLimit,
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
  const active = findings.find(finding => finding.id === selectedId) || findings[0];
  const visible = findings.slice(0, limit);
  if (loading && !report) return h(W.Empty, { title: t('正在载入…', 'Loading…'), icon: 'shield' });
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
    { id: 'high', label: t('高风险', 'High risk') },
  ];
  const newCount = Object.values(report.newCounts || {}).reduce((a, b) => a + Number(b), 0);
  const acceptedCount = Object.values(report.acceptedCounts || {}).reduce((a, b) => a + Number(b), 0);

  return h(
    React.Fragment,
    null,
    h(
      'div',
      { className: 'security-report-meta' },
      h(
        'p',
        { className: 'secw-muted' },
        h('strong', null, t('最近检查：', 'Last checked: ')),
        report.time && Number.isFinite(Date.parse(report.time))
          ? h('time', { dateTime: report.time }, new Date(report.time).toLocaleString(english() ? 'en-US' : 'zh-CN'))
          : t('时间未知', 'Unknown time'),
        ' · ' + t('范围：', 'Scope: ') + (report.scope?.target || report.target || '.'),
        ' · ' +
          (report.scope?.kind === 'diff' || String(report.mode || '').startsWith('diff')
            ? t('Git 改动', 'Git changes')
            : t('文件扫描', 'File scan')),
      ),
      h(
        'p',
        { className: 'secw-muted' },
        t(
          '这是保存的检查结果，更新插件不会自动重扫。“新增”指尚未接受的命中，测试夹具和公开常量需核对用途。',
          'These are saved results; plugin updates do not rerun checks. “New” means not accepted in the baseline. Review test fixtures and public constants in context.',
        ),
      ),
    ),
    h(
      W.Status,
      { tone: report.complete === false ? 'warn' : report.passed ? 'success' : 'info' },
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
    h(W.Split, {
      listWidth: 370,
      selected: selectedId && findings.some(finding => finding.id === selectedId) ? selectedId : null,
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
            value: filter || 'all',
            items: filterItems,
            className: 'secw-filter-menu',
            onChange: next => {
              setFilter?.(next);
              setLimit?.(50);
              setSelectedId(null);
            },
          }),
        ),
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
          }),
        ),
        !findings.length ? h(W.Empty, { title: t('此筛选下没有问题。', 'No findings match this filter.'), icon: 'shield' }) : null,
        findings.length > limit
          ? h(
              'div',
              { className: 'secw-more-wrap' },
              h(W.Button, { className: 'security-more', onClick: () => setLimit(n => n + 50) }, t('显示更多', 'Show more')),
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
          h(W.Button, { icon: 'download', disabled: busy, onClick: () => download('sarif') }, t('下载 SARIF', 'Download SARIF')),
          h(W.Button, { icon: 'download', disabled: busy, onClick: () => download('markdown') }, t('下载 Markdown', 'Download Markdown')),
        ),
      ),
    }),
  );
}

const SECURITY_WORKBENCH_CSS = `
.security-workbench {
  min-width: 0;
}

.security-workbench .security-project {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  width: min(100%, 540px);
}

.security-workbench .security-project-label {
  flex: none;
  font-size: 12px;
  font-weight: 600;
  color: var(--w-muted);
}

.security-workbench .security-project-menu {
  flex: 1;
  min-width: 220px;
}

.security-workbench .security-report-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 18px 2px;
}

.security-workbench .security-report-meta p {
  margin: 0;
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
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
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
  font: 12.5px/1.65 ui-monospace, SFMono-Regular, Consolas, monospace;
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

.security-workbench .secw-guide-wrap {
  padding: 10px 18px 2px;
  width: min(100%, 960px);
}

.security-workbench .secw-empty-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.security-workbench .secw-empty-wrap .secw-guide-wrap {
  margin-inline: auto;
  padding-block-end: 20px;
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
        async function action(body, signal) { const response = await fetch('api/dsh-code-security/workbench', { method: 'POST', credentials: 'same-origin', cache: 'no-store', signal, headers: { 'content-type': 'application/json', 'x-dsh-security-action': '1' }, body: JSON.stringify(body) }); let value; try {
            value = await response.json();
        }
        catch {
            throw new Error(t('无法读取服务响应，请检查插件是否加载。', 'Could not read the response. Check that the plugin is loaded.'));
        } if (!response.ok || value.ok === false)
            throw new Error(message(value.message || t('操作未完成', 'The operation did not complete.'))); return value; }
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
                h('h2', { className: 'secw-detail-title', 'data-dsh-editorial-heading': '' }, title),
                h('div', { className: 'secw-detail-meta' },
                    h('span', { className: 'dsh-wb-tag', 'data-tone': finding.severity }, risk(finding.severity)),
                    h('span', { className: 'dsh-wb-tag', 'data-tone': fresh ? 'warn' : undefined }, fresh ? t('新增', 'New') : t('已接受', 'Accepted'))),
                h('p', { className: 'secw-file' }, finding.file + ':' + finding.line),
                h('pre', { className: 'secw-evidence', 'aria-label': t('脱敏证据', 'Redacted evidence') }, finding.snippet),
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
            const [activeTab, setActiveTab] = useState('findings'), [switchTo, setSwitchTo] = useState(''), [copiedId, setCopiedId] = useState('');
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
                    if (mounted.current && seq === generation.current) setError(message(e.message));
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
                return filter === 'new' ? list.filter(f => fresh.has(f.id)) : filter === 'high' ? list.filter(f => ['critical', 'high'].includes(f.severity)) : list;
            }, [report?.findings, fresh, filter]);
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
                        await navigator.clipboard.writeText(value.path + ':' + value.line);
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

            const projectToolbar = catalog.length ? h('div', { className: 'security-project' },
                h('span', { className: 'security-project-label', id: controlId + '-project-label' }, t('项目', 'Project')),
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

            const auditModes = [
                { id: 'none', label: t('仅列出依赖（离线）', 'Dependency inventory (offline)') },
                { id: 'offline', label: t('已知漏洞（本地数据库）', 'Known vulnerabilities (local database)') },
                { id: 'online', label: t('已知漏洞（联网）', 'Known vulnerabilities (online)') },
            ];

            return h(W.Page, {
                workbench,
                icon: 'shield',
                lang: english() ? 'en' : 'zh',
                title: t('代码安全', 'Code security'),
                subtitle: t('检查改动、核对证据并跟踪修复。', 'Check changes, review evidence and track fixes.'),
                className: 'secw security-workbench',
                toolbar: projectToolbar,
                actions: catalog.length ? h(React.Fragment, null,
                    h(W.Button, { variant: 'primary', icon: 'shield', disabled, onClick: () => run('scan') }, t('检查代码', 'Scan code')),
                    h(W.Button, { icon: 'search', disabled, onClick: () => run('diff') }, t('检查改动', 'Check changes')),
                    h(W.Button, { icon: 'check', disabled: disabled || !report?.hasScan, onClick: () => run('verify') }, t('复查修复', 'Recheck fixes')),
                    h(W.IconButton, { icon: 'refresh', spinning: busy || loading, label: t('刷新结果', 'Refresh results'), disabled: busy || loading || dirty, onClick: () => open(id) })) : null,
            },
                h('style', { 'data-plugin-css': 'dsh-code-security/workbench' }, SECURITY_WORKBENCH_CSS),
                h(W.Status, { tone: 'error' }, error),
                h(W.Status, { tone: 'success' }, notice),
                loading && data && pendingId && pendingId !== id ? h(W.Status, null, t('正在载入所选项目，载入完成前下面是上一个项目的结果。', 'Loading the selected project. The results below are still from the previous project until it finishes.')) : null,
                busy ? h(W.Status, {
                    action: h(W.Button, { icon: 'close', onClick: () => request({ operation: 'cancel', id, job: job.id }).catch(e => setError(message(e.message))) }, t('取消检查', 'Cancel check')),
                }, t('正在检查，可以关闭面板，稍后回来查看结果。', 'Checking. You can close this panel and return for the result.')) : null,
                result?.coverage && 'closedCount' in result && result.complete === false ? h('div', { className: 'secw-banner-wrap' }, h(Coverage, { rows: Array.isArray(result.coverage) ? result.coverage : [result.coverage] })) : null,
                result?.configurationError ? h(W.Status, { tone: 'error' }, message(result.configurationError)) : null,
                result && 'closedCount' in result ? h(W.Status, { tone: result.complete === false ? 'warn' : 'success' }, result.complete === false ? t('复查未完成，未判定任何问题已修复。', 'Recheck incomplete. No finding was marked fixed.') : t('本次复查：关闭 ', 'This recheck: closed ') + result.closedCount + ' · ' + t('仍存在 ', 'remaining ') + result.remainingCount + ' · ' + t('新增 ', 'new ') + result.freshCount) : null,
                !catalog.length ? h('div', { className: 'secw-empty-wrap' },
                    h(W.Empty, {
                        title: loading ? t('正在载入…', 'Loading…') : t('还没有检查过的项目', 'No checked projects yet'),
                        icon: 'shield',
                        action: !loading ? h('div', { className: 'secw-empty-stack' },
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
                                } }, t('刷新项目', 'Refresh projects')))) : null,
                    }, t('一键复制下方指令发到目标仓库对话即可启动首次检查，项目随后会自动出现在这里。', 'Copy a prompt below in one click and send it in a project chat — the project will appear here automatically.')),
                    !loading ? h('div', { className: 'secw-guide-wrap' }, h(SecurityWorkflowGuide, { defaultOpen: true })) : null) :
                h(React.Fragment, null,
                    h('div', { className: 'secw-guide-wrap' }, h(SecurityWorkflowGuide, { defaultOpen: false })),
                    h(W.Tabs, {
                    label: t('代码安全视图', 'Code security views'),
                    value: activeTab,
                    onChange: setActiveTab,
                    footer: updateControls,
                    items: [
                        { id: 'findings', label: t('检查结果', 'Findings'), count: report?.findings?.length },
                        { id: 'dependencies', label: t('依赖检查', 'Dependencies') },
                        { id: 'settings', label: t('工具与设置', 'Tools and settings') },
                    ],
                },
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
                    : h(SecurityResults, { report, findings, fresh, filter, setFilter, limit, setLimit, busy, loading, disabled, onRun: run, download, copiedId, onOpen: f => location(f, false), onCopy: f => location(f, true) }))),
                !catalog.length ? updateControls : null,
                switchTo ? h(W.Dialog, {
                    title: t('设置尚未保存', 'Unsaved settings'),
                    tone: 'warn',
                    closeLabel: t('继续编辑', 'Keep editing'),
                    onClose: () => setSwitchTo(''),
                    footer: h(React.Fragment, null,
                        h(W.Button, { onClick: () => setSwitchTo('') }, t('继续编辑', 'Keep editing')),
                        h(W.Button, { variant: 'danger', icon: 'trash', onClick: () => { const next = switchTo; setSwitchTo(''); void open(next); } }, t('放弃修改并切换', 'Discard and switch')),
                        h(W.Button, { variant: 'primary', icon: 'check', onClick: async () => { if (await save()) { const next = switchTo; setSwitchTo(''); void open(next); } } }, t('保存并切换', 'Save and switch'))),
                }, h('p', null, t('切换项目之前，选择如何处理当前修改。', 'Choose what to do with the current settings before switching projects.'))) : null);
        }
        function apply(ctx) {
            securityHostContext = ctx;
            W.register(ctx, { id: 'dsh-code-security.workbench', label: () => t('代码安全', 'Code security'), icon: 'shield', component: Workbench, order: 59 });
            try { locale = ctx.get?.('locale') || ctx.locale; } catch { locale = ctx.locale; }
            try { sidebar = ctx.get?.('sidebarRight') || ctx.sidebarRight; } catch { }
            ctx.slots.inject('settings.section', () => ctx.slots.register({ name: 'settings.section', id: 'dsh-code-security', order: 59, label: () => t('代码安全', 'Code security'), inject: () => ({}) }, Workbench));
        }
        return { inject: ['slots', 'locale'], apply };
    } },{"name":"dsh-code-security","version":"0.1.0","hasWorkbench":true,"packageVersion":"0.8.4","label":"代码安全","labelEn":"Code Security","suiteComponent":true,"sectionIds":["dsh-code-security"],"iconData":"data:image/webp;base64,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"}));

})();

/* STARDUSTLC_UPDATE_CLIENT_BODY_END */
})();
