/** 「检查工具」的自检结果：用户点了按钮就必须看到检查项，而不是只有引擎徽标。 */
function HealthReport({ result }) {
  const checks = Array.isArray(result?.checks) ? result.checks : [];
  const engines = Array.isArray(result?.configuredEngines) ? result.configuredEngines : [];
  return h('div', { className: 'secw-health' },
    h(W.Status, { tone: result.ok === false ? 'error' : 'success' }, result.ok === false
      ? t('自检发现问题：按下面的检查项逐条处理。', 'Self-check found issues. Work through the checks below.')
      : t('自检正常：下面是本次检查实际使用的配置与目录。', 'Self-check passed. These are the settings and paths this run uses.')),
    h('ul', { className: 'secw-checklist' }, checks.map((check, index) => h('li', { key: index, 'data-ok': check.ok !== false },
      h('strong', null, String(check.name) + t('：', ': ')), String(check.detail ?? '')))),
    h('p', { className: 'secw-muted' }, t('已选引擎：', 'Selected engines: ') + (engines.length ? engines.map(engine => names[engine] || engine).join(', ') : t('无（只用内置规则）', 'None (built-in rules only)')))
  );
}

function SecurityResults({ report, findings, fresh, filter, setFilter, limit, setLimit, busy, loading, download, onOpen, onCopy }) {
  const [selectedId, setSelectedId] = useState(null);
  const active = findings.find(finding => finding.id === selectedId) || findings[0];
  const visible = findings.slice(0, limit);
  if (loading && !report) return h(W.Empty, { title: t('正在载入…', 'Loading…'), icon: 'shield' });
  if (!report?.hasScan) return h(W.Empty, { title: t('尚未检查此项目', 'This project has not been checked'), icon: 'shield' }, t('选择上方的检查方式开始。内置规则无需额外安装。', 'Choose a check above. Built-in rules need no extra installation.'));
  return h(React.Fragment, null,
    h(W.Status, null, h('strong', null, report.complete === false ? t('检查未完成', 'Check incomplete') : report.passed ? t('未发现达到阈值的新增问题', 'No new findings reached the threshold') : t('有问题需要核对', 'Findings need review')),
      ' · ' + t('新增 ', 'New ') + Object.values(report.newCounts || {}).reduce((a, b) => a + Number(b), 0) + ' · ' + t('已接受 ', 'Accepted ') + Object.values(report.acceptedCounts || {}).reduce((a, b) => a + Number(b), 0)),
    h(W.Split, { listWidth: 370, selected: selectedId && findings.some(finding => finding.id === selectedId) ? selectedId : null, onBack: () => setSelectedId(null), backLabel: t('返回问题列表', 'Back to findings'),
      list: h('div', null,
        h('div', { className: 'w-master-toolbar' }, h('select', { 'aria-label': t('问题筛选', 'Filter findings'), value: filter, onChange: event => { setFilter(event.target.value); setLimit(50); setSelectedId(null); } }, h('option', { value: 'all' }, t('全部问题', 'All findings')), h('option', { value: 'new' }, t('仅新增', 'New only')), h('option', { value: 'high' }, t('高风险', 'High risk')))),
        visible.map(finding => h(W.Row, { key: finding.id, title: describeFinding(finding).title, active: finding.id === active?.id, meta: finding.file + ':' + finding.line, description: describeFinding(finding).detail, status: risk(finding.severity), onClick: () => setSelectedId(finding.id), className: 'security-list-' + finding.severity })),
        !findings.length ? h(W.Empty, { title: t('此筛选下没有问题。', 'No findings match this filter.'), icon: 'shield' }) : null,
        findings.length > limit ? h(W.Button, { className: 'security-more', onClick: () => setLimit(n => n + 50) }, t('显示更多', 'Show more')) : null,
        (report.findingsTotal ?? 0) > 200 ? h('p', { className: 'w-muted security-list-note' }, t('面板最多展示 200 项，完整结果请导出报告。', 'The panel shows up to 200 findings. Export the full report for all results.')) : null),
      detail: h(React.Fragment, null,
        active ? h(FindingCard, { key: active.id, finding: active, fresh: fresh.has(active.id), onOpen, onCopy }) : h(W.Empty, { title: t('没有匹配的问题', 'No matching findings'), icon: 'shield' }),
        h('details', { className: 'w-section' }, h('summary', null, t('检查覆盖范围', 'Check coverage')), h(Coverage, { rows: report.coverage }), report.time ? h('p', { className: 'w-muted' }, new Date(report.time).toLocaleString(english() ? 'en-US' : 'zh-CN')) : null),
        h('div', { className: 'w-detail-footer' }, h(W.Button, { icon: 'download', disabled: busy, onClick: () => download('sarif') }, t('下载 SARIF', 'Download SARIF')), h(W.Button, { icon: 'download', disabled: busy, onClick: () => download('markdown') }, t('下载 Markdown', 'Download Markdown')))) }));
}

const SECURITY_WORKBENCH_CSS = `
.security-workbench.secw{max-width:none;margin:0}.security-workbench .security-project{padding-bottom:14px;max-width:460px}.security-workbench .security-project label{margin:0 0 5px}.security-workbench .security-project select{width:100%}.security-workbench .secw-finding-detail{display:flex;flex-direction:column;gap:16px}.security-workbench .secw-finding-detail .w-detail-title{margin:0!important}.security-workbench .secw-finding-detail pre{max-height:300px;margin:0;font-size:13px;background:var(--w-soft);border:1px solid var(--w-border)}.security-workbench .secw-finding-detail .secw-tools{margin:0}.security-workbench .secw-finding-detail .secw-file{color:var(--w-muted);font-size:13px}.security-workbench .secw-finding-detail .secw-badge{background:var(--w-soft);color:var(--w-muted)}.security-workbench .w-row .w-tag{font-weight:550}.security-workbench .security-list-critical .w-tag,.security-workbench .security-list-high .w-tag{color:var(--dsw-alias-state-error-primary,#af3737)}.security-workbench .security-list-medium .w-tag{color:var(--dsw-alias-state-warn-primary,#946400)}.security-workbench .secw-coverage{display:flex;flex-direction:column;gap:0;margin:0}.security-workbench .secw-engine{border:0;border-bottom:1px solid var(--w-border);border-radius:0;padding:12px 0;background:transparent}.security-workbench .secw-engine:last-child{border:0}.security-workbench .secw-engine strong{font-size:13px}.security-workbench .secw-engine small,.security-workbench .secw-muted{color:var(--w-muted);font-size:12px}.security-workbench .secw-engine p{margin-bottom:0}.security-workbench .secw-badge[data-status=failed],.security-workbench .secw-badge[data-status=partial],.security-workbench .secw-badge[data-status=not-installed],.security-workbench .secw-badge[data-status=timed-out]{color:var(--dsw-alias-state-error-primary,#af3737)}.security-workbench .security-settings{max-width:800px;width:100%;padding:24px 0}.security-workbench .security-settings h3{margin-bottom:16px}.security-workbench .security-settings label{margin:18px 0 6px}.security-workbench .security-settings p{margin-top:10px}.security-workbench .security-settings fieldset{margin:20px 0}.security-workbench .secw-tools>button{min-height:36px;font-size:14px;border-radius:8px;border:1px solid var(--w-border);background:var(--w-bg);color:var(--w-text);padding:8px 12px}.security-workbench .security-settings .secw-tools>button:first-child{background:var(--w-primary);color:var(--w-on-primary);border-color:var(--w-primary)}.security-workbench .security-list-note{padding:16px}.security-workbench .security-more{margin:16px}.security-workbench .secw-error{background:var(--w-soft);color:var(--dsw-alias-state-error-primary,#af3737)}.security-workbench .secw-notice{background:var(--w-soft);color:var(--w-text)}.security-workbench .security-settings .secw-finding{border:0;border-bottom:1px solid var(--w-border);border-radius:0;padding:16px 0}.security-workbench .w-master-toolbar select{width:100%}.security-workbench .secw-health{padding:20px 0}.security-workbench .secw-checklist{list-style:none;padding:0;margin:12px 0}.security-workbench .secw-checklist li{padding:8px 0;border-bottom:1px solid var(--w-border);font-size:13px;overflow-wrap:anywhere}.security-workbench .secw-checklist li:last-child{border:0}.security-workbench .secw-checklist li[data-ok=false]{color:var(--dsw-alias-state-error-primary,#af3737)}
`;
