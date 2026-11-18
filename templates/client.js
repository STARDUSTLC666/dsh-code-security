// Editable browser entry. Build with node scripts/build-client.mjs.
// Browser source, distributed directly; the TypeScript build preserves this file.
window.__ModuleLoader__.load({ id: 'dsh-code-security', factory: require => {
        const React = require('react'), { useState, useEffect, useRef, useMemo } = React, h = React.createElement;
        const W = createWorkbenchUI(React, require);
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
                    id: 'scan',
                    selector: '[data-tour="sec-scan"]',
                    fallback: '[data-tour="sec-project"], [data-sec-empty-action="scan"], [data-copy-prompt]',
                    side: 'bottom',
                    title: t('选择项目与一键安全扫描', 'Select project & run a security check'),
                    desc: t(
                        '切换已收录的工作区后，点「检查代码」扫描全仓或点「检查改动」快速审查 Git 新增代码；首次使用可直接复制下方指令发到项目聊天。',
                        'Pick a workspace and click Scan code or Check changes for Git diffs — or copy the prompt below into a project chat to start.',
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
                    id: 'findings',
                    selector: '#' + secTabsId + '-tab-findings',
                    fallback: '.secw-filter-menu',
                    side: 'bottom',
                    title: t('核对触发条件与脱敏代码证据', 'Inspect triggers & redacted evidence'),
                    desc: t(
                        '在「检查结果」按新增或高风险筛选，核对文件行号、数据流/模式说明与脱敏代码片段，并可一键复制修复指令发回聊天。',
                        'Filter by New or High risk in Findings, inspect file lines and redacted snippets, and copy a 1-click fix prompt into chat.',
                    ),
                },
                {
                    id: 'dependencies',
                    selector: '#' + secTabsId + '-tab-dependencies',
                    fallback: '[data-tour="sec-scan"]',
                    side: 'bottom',
                    title: t('依赖漏洞离线/联网核查', 'Offline & online dependency audits'),
                    desc: t(
                        '在「依赖检查」盘点锁文件依赖，按需切换本地离线数据库或联网查询 OSV 已知漏洞（不上传项目源码）。',
                        'Inventory lockfile packages in Dependencies and audit against a local database or online OSV (source code is never uploaded).',
                    ),
                },
                {
                    id: 'verify',
                    selector: '[data-tour="sec-verify"]',
                    fallback: '#' + secTabsId + '-tab-settings',
                    side: 'bottom',
                    title: t('修复后点击「复查修复」闭环验证', 'Click “Recheck fixes” to close the loop'),
                    desc: t(
                        '助手修完问题后，点「复查修复」对同一范围重验问题是否关闭且无新增，也可在「工具与设置」接入可选增强引擎。',
                        'After patching, click Recheck fixes on the same scope to confirm closure, or configure optional engines in Tools and settings.',
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
                modalOpen: Boolean(switchTo),
                onTourCopyPrompt: async text => {
                    const ok = await W.writeClipboardText(text);
                    if (ok) {
                        setNotice(t('已复制指令，粘贴到对话发送即可。', 'Prompt copied — paste into chat.'));
                    }
                    return ok;
                },
                actions: catalog.length ? h(React.Fragment, null,
                    projectSwitcher,
                    h(W.Button, { variant: 'primary', icon: 'shield', 'data-tour': 'sec-scan', disabled, onClick: () => run('scan') }, t('检查代码', 'Scan code')),
                    h(W.Button, { icon: 'search', disabled, onClick: () => run('diff') }, t('检查改动', 'Check changes')),
                    h(W.Button, { icon: 'check', 'data-tour': 'sec-verify', disabled: disabled || !report?.hasScan, onClick: () => run('verify') }, t('复查修复', 'Recheck fixes')),
                    h(W.IconButton, { icon: 'refresh', spinning: busy || loading, label: t('刷新结果', 'Refresh results'), disabled: busy || loading || dirty, onClick: () => open(id) })) : null,
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
                    : h(SecurityResults, { report, findings, fresh, filter, setFilter, limit, setLimit, busy, loading, disabled, onRun: run, download, copiedId, onOpen: f => location(f, false), onCopy: f => location(f, true) })),
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
    } });
