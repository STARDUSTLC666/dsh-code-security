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
      splitKey: 'dsh-code-security:split-width',
      minWidth: 260,
      maxWidth: 560,
      resizerLabel: t('调整问题列表宽度', 'Resize findings list'),
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

.security-workbench .security-project-inline {
  display: inline-flex;
  align-items: center;
  min-width: 110px;
  max-width: 170px;
}

.security-workbench .security-project-menu {
  width: 100%;
  min-width: 110px;
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
`;
