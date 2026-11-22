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
