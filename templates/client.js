// Editable browser entry. Build with node scripts/build-client.mjs.
// Browser source, distributed directly; the TypeScript build preserves this file.
window.__ModuleLoader__.load({ id: 'dsh-code-security', factory: require => {
        const React = require('react'), { useState, useEffect, useRef, useMemo } = React, h = React.createElement;
        const W = createWorkbenchUI(React);
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
        function Coverage({ rows }) { return rows?.length ? h('div', { className: 'secw-coverage' }, rows.map(row => h('div', { key: row.engine, className: 'secw-engine' }, h('strong', null, names[row.engine] || row.engine), h('span', { className: 'secw-badge', 'data-status': row.status }, status(row.status)), row.version ? h('small', null, row.version) : null, row.reason ? h('p', { className: 'secw-muted' }, reason(row.reason)) : null))) : null; }
        function describeFinding(finding) {

            const category = { '0': ['注入与动态执行', 'Injection or dynamic execution'], '1': ['反序列化', 'Deserialization'], '2': ['加密与密钥', 'Cryptography'], '3': ['凭据泄露', 'Credential exposure'], '4': ['配置与权限', 'Configuration and permissions'], '5': ['信息泄露', 'Information exposure'], '6': ['路径与网络', 'Paths and network'] };
            const flows = { 'CWE-78': [['外部输入进入命令执行', 'Input reaches a shell command'], ['请求参数传入了 shell 命令，请核对输入处理并优先使用参数数组。', 'Request input reaches a shell command. Review input handling and prefer argument arrays.']], 'CWE-79': [['外部输入进入 HTML 写入点', 'Input reaches an HTML sink'], ['发现请求输入到 HTML 写入点的数据流，请核对净化处理与实际页面上下文。', 'Request input reaches HTML insertion. Review sanitization and the actual page context.']], 'CWE-89': [['外部输入进入 SQL 文本', 'Input reaches SQL text'], ['请求输入进入 SQL 语句文本，请核对 SQL 构造方式并使用参数化值。', 'Request input reaches SQL text. Review query construction and use parameterized values.']] };
            const flow = finding.evidence === 'dataflow' ? flows[finding.cwe] : null;
            const title = flow ? t(...flow[0]) : finding.engine === 'betterleaks' ? t('疑似凭据泄露', 'Potential credential exposure') : english() && /[\u3400-\u9fff]/.test(finding.title) ? t(...(category[finding.ruleId?.slice(4, 5)] || ['模式提示', 'Code pattern'])) : finding.title;
            const detail = flow ? t(...flow[1]) : english() && /[\u3400-\u9fff]/.test(finding.message) ? 'Review the recorded code pattern; it does not by itself prove exploitability.' : finding.message;

return {title,detail};
}
function FindingCard({finding,fresh,onOpen,onCopy}) {
 const {title,detail}=describeFinding(finding);
 return h('article',{className:'secw-finding-detail','data-severity':finding.severity},
 h('h2',{className:'w-detail-title'},title),h('div',{className:'w-detail-meta'},h('span',{className:'w-tag'},risk(finding.severity)),h('span',{className:'w-tag'},fresh?t('新增','New'):t('已接受','Accepted'))),
 h('p',{className:'secw-file'},finding.file+':'+finding.line),h('pre',{'aria-label':t('脱敏证据','Redacted evidence')},finding.snippet),
 h('section',{className:'w-section'},h('h3',null,t('证据与说明','Evidence and explanation')),h('p',null,detail),
 h('p',{className:'w-muted'},finding.ruleId+' · '+finding.cwe+' · '+t('置信度：','Confidence: ')+risk(finding.confidence)+' · '+(finding.evidence==='dataflow'?t('数据流证据','Data-flow evidence'):t('模式提示','Pattern finding'))),
 h('p',{className:'w-muted'},t('来源：','Sources: ')+(finding.sources||[finding.engine||'builtin']).map(engine=>engine==='builtin'?t('内置规则','Built-in rules'):names[engine]||engine).join(', '))),
 h('section',{className:'w-section'},h('h3',null,t('文件位置','File location')),h('p',{className:'secw-file'},finding.file+':'+finding.line),
 h('div',{className:'w-toolbar'},h(W.Button,{icon:'copy',onClick:()=>onCopy(finding)},t('复制位置','Copy location')),h(W.Button,{icon:'external',onClick:()=>onOpen(finding)},t('打开文件','Open file')))));
}
        function Workbench({workbench=false}={}) {
const [activeTab,setActiveTab]=useState('findings'),[switchTo,setSwitchTo]=useState(''); const controlId=React.useId();
            const [, repaint] = useState(0), [catalog, setCatalog] = useState([]), [id, setId] = useState(''), [data, setData] = useState(null), [settings, setSettings] = useState({ engines: ['builtin'], enginePaths: {} }), [autoCheck, setAutoCheck] = useState(false), [dirty, setDirty] = useState(false), [job, setJob] = useState(null), [result, setResult] = useState(null), [error, setError] = useState(''), [notice, setNotice] = useState(''), [loading, setLoading] = useState(true), [mode, setMode] = useState('none'), [filter, setFilter] = useState('all'), [limit, setLimit] = useState(50);
            const generation = useRef(0), mounted = useRef(true), requests = useRef(new Set());
            function request(body) { const ctl = new AbortController(); requests.current.add(ctl); return action(body, ctl.signal).finally(() => requests.current.delete(ctl)); }
            async function open(selected, keepResult = false) { const seq = ++generation.current; if (!keepResult)
                setError(''); setLoading(true); try {
                const value = await request({ operation: 'open', id: selected });
                if (!mounted.current || seq !== generation.current)
                    return;
                setId(selected);
                setData(value);
                setSettings(value.settings);
                setAutoCheck(value.workspace.autoCheck);
                setDirty(false);
                setLimit(50);
                if (!keepResult)
                    setResult(null);
                setJob(value.activeJob || null);
            }
            catch (e) {
                if (mounted.current && seq === generation.current)
                    setError(message(e.message));
            }
            finally {
                if (mounted.current && seq === generation.current)
                    setLoading(false);
            } }
            useEffect(() => { mounted.current = true; const off = locale?.subscribe?.(() => repaint(n => n + 1)); request({ operation: 'list' }).then(value => { if (!mounted.current)
                return; setCatalog(value.workspaces); if (value.workspaces[0])
                void open(value.workspaces[0].id);
            else
                setLoading(false); }).catch(e => { if (mounted.current) {
                setError(message(e.message));
                setLoading(false);
            } }); return () => { mounted.current = false; generation.current++; requests.current.forEach(c => c.abort()); off?.(); }; }, []);
            useEffect(() => { if (!job || job.status !== 'running' || !id)
                return; let ended = false, timer; const selected = id; async function poll() { try {
                const value = await request({ operation: 'job', id: selected, job: job.id });
                if (ended || !mounted.current)
                    return;
                if (value.job.status === 'running')
                    timer = setTimeout(poll, 800);
                else {
                    setJob(value.job);
                    setResult(value.job.result || null);
                    if (value.job.error)
                        setError(message(value.job.error));
                    void open(selected, true);
                }
            }
            catch (e) {
                if (!ended && mounted.current) {
                    setError(message(e.message));
                    setJob(null);
                }
            } } timer = setTimeout(poll, 300); return () => { ended = true; clearTimeout(timer); }; }, [job?.id, job?.status, id]);
            const busy = job?.status === 'running', report = data?.report;
            const fresh = useMemo(() => new Set((report?.newFindings || []).map(f => f.id)), [report?.newFindings]);
            const findings = useMemo(() => { const list = report?.findings || []; return filter === 'new' ? list.filter(f => fresh.has(f.id)) : filter === 'high' ? list.filter(f => ['critical', 'high'].includes(f.severity)) : list; }, [report?.findings, fresh, filter]);
            async function run(name) { setError(''); setNotice(''); setResult(null); try {
                const value = await request({ operation: 'start', id, action: name, ...(name === 'deps' ? { audit: mode } : {}) });
                if (mounted.current)
                    setJob(value.job);
            }
            catch (e) {
                if (mounted.current)
                    setError(message(e.message));
            } }
            async function save() { setError(''); try {
                const paths = Object.fromEntries(Object.entries(settings.enginePaths).map(([k, v]) => [k, v.trim()]).filter(([, v]) => v));
                const value = await request({ operation: 'settings', id, engines: settings.engines, enginePaths: paths, autoCheck, ...(settings.osvDatabaseDir?.trim() ? { osvDatabaseDir: settings.osvDatabaseDir.trim() } : {}) });
                if (!mounted.current)
                    return;
                setData(value);
                setSettings(value.settings);
                setDirty(false);
                setNotice(t('设置已保存。', 'Settings saved.')); return true;
            }
            catch (e) {
                if (mounted.current)
                    setError(message(e.message));
return false;
            } }
            async function download(format) { setError(''); try {
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
            } }
            async function location(finding, copy) { setError(''); try {
                const value = await request({ operation: 'location', id, finding: finding.id });
                if (copy) {
                    await navigator.clipboard.writeText(value.path + ':' + value.line);
                    setNotice(t('文件位置已复制。', 'File location copied.'));
                    return;
                }
                const navigation=securityHostContext?.get?.('uiWorkspace') || securityHostContext?.uiWorkspace;
const right=securityHostContext?.get?.('sidebarRight') || sidebar;
if (!right?.openResource || !value.sessionId || !navigation?.openSession)
                    throw new Error(t('请先打开对应聊天，或复制文件位置。', 'Open the corresponding chat first, or copy the file location.'));
                const file = value.path.replace(/\\/g, '/').split('/').map(s => encodeURIComponent(s).replace(/%3A/ig, ':')).join('/');
                navigation.openSession(value.sessionId);
await new Promise(resolve=>requestAnimationFrame(resolve));
if(right.mounted?.getSnapshot?.() !== value.sessionId) throw new Error(t('请先打开对应聊天，或复制文件位置。','Open the corresponding chat first, or copy the file location.'));
right.openResource('dsh-resource://file/session/' + encodeURIComponent(value.sessionId) + '/' + file, { params: { line: value.line } });
            }
            catch (e) {
                if (mounted.current)
                    setError(message(e.message));
            } }
            const disabled = busy || loading || dirty;
            return h(W.Page,{workbench,title:t('代码安全','Code security'),subtitle:t('检查改动、核对证据并跟踪修复。','Check changes, review evidence and track fixes.'),className:'secw security-workbench',actions:catalog.length?h(React.Fragment,null,
 h(W.Button,{variant:'primary',disabled, onClick:()=>run('scan')},t('检查代码','Scan code')),h(W.Button,{disabled,onClick:()=>run('diff')},t('检查改动','Check changes')),
 h(W.Button,{disabled:disabled || !report?.hasScan,onClick:()=>run('verify')},t('复查修复','Recheck fixes')),h(W.IconButton,{icon:'refresh',label:t('刷新结果','Refresh results'),disabled:busy || loading || dirty,onClick:()=>open(id)})) : null},
 h('style',null,css),h('style',null,SECURITY_WORKBENCH_CSS),h(W.Status,{tone:'error'},error),h(W.Status,{tone:'success'},notice),
 catalog.length ? h('div',{className:'security-project'},h('label',{htmlFor:controlId+'-project'},t('项目','Project')),h('select',{id:controlId+'-project',value:id,disabled:loading,onChange:event=>{if(dirty)setSwitchTo(event.target.value);else void open(event.target.value);}},catalog.map(w=>h('option',{key:w.id,value:w.id},w.label+' — '+w.root)))) : null,
 busy ? h(W.Status,null,t('正在检查，可以关闭面板，稍后回来查看结果。','Checking. You can close this panel and return for the result.'),h(W.Button,{onClick:()=>request({operation:'cancel',id,job:job.id}).catch(e=>setError(message(e.message)))},t('取消检查','Cancel check'))) : null,
 result?.coverage && 'closedCount' in result && result.complete === false ? h(Coverage, { rows: Array.isArray(result.coverage) ? result.coverage : [result.coverage] }) : null,
result?.configurationError ? h('div', { className: 'secw-error', role: 'alert' }, message(result.configurationError)) : null,
result && 'closedCount' in result ? h('div', { className: 'secw-notice' }, result.complete === false ? t('复查未完成，未判定任何问题已修复。', 'Recheck incomplete. No finding was marked fixed.') : t('本次复查：关闭 ', 'This recheck: closed ') + result.closedCount + ' · ' + t('仍存在 ', 'remaining ') + result.remainingCount + ' · ' + t('新增 ', 'new ') + result.freshCount) : null,
 !catalog.length ? h(W.Empty,{title:loading?t('正在载入…','Loading…'):t('还没有检查过的项目','No checked projects yet'),icon:'shield',action:!loading?h(W.Button,{onClick:()=>{setLoading(true);request({operation:'list'}).then(v=>{if(!mounted.current)return;setCatalog(v.workspaces);if(v.workspaces[0])void open(v.workspaces[0].id);else setLoading(false);}).catch(e=>{if(mounted.current){setError(message(e.message));setLoading(false);}});}},t('刷新项目','Refresh projects')):null},t('在项目聊天中说：“检查这个项目的安全问题。”项目随后会出现在这里。','In a project chat, ask: “Check this project for security issues.” It will then appear here.')) :
 h(W.Tabs,{label:t('代码安全视图','Code security views'),value:activeTab,onChange:setActiveTab,items:[{id:'findings',label:t('检查结果','Findings')},{id:'dependencies',label:t('依赖检查','Dependencies')},{id:'settings',label:t('工具与设置','Tools and settings')}]},
 activeTab === 'settings' ? h('section',{className:'security-settings'},h('h3',null,t('增强工具与自动检查','Enhanced tools and automatic checks')),h('p', { className: 'secw-muted' }, t('增强工具可选。未安装时仍可用内置规则；已选择但未完成的引擎不会算作通过。', 'Enhanced tools are optional. Built-in checks remain available; an incomplete selected engine is never counted as a pass.')),
h('fieldset', { disabled: busy }, h('legend', null, t('代码检查引擎', 'Code scanning engines')), ['builtin', 'betterleaks', 'semgrep'].map(engine => h('label', { key: engine, className: 'secw-choice' }, h('input', { type: 'checkbox', checked: settings.engines.includes(engine), onChange: e => { setSettings(s => ({ ...s, engines: e.target.checked ? [...s.engines, engine] : s.engines.filter(x => x !== engine) })); setDirty(true); } }), names[engine]))),
['betterleaks', 'semgrep', 'osv'].map(engine => h('div', { key: engine }, h('label', { htmlFor: controlId+'-path-' + engine }, names[engine] + t(' 程序路径（可选）', ' executable path (optional)')), h('input', { id: controlId+'-path-' + engine, value: settings.enginePaths[engine] || '', disabled: busy, placeholder: t('已加入 PATH 时可留空', 'Leave empty when available on PATH'), onChange: e => { const value = e.target.value; setSettings(s => ({ ...s, enginePaths: { ...s.enginePaths, [engine]: value } })); setDirty(true); } }), h('a', { href: links[engine], target: '_blank', rel: 'noopener noreferrer' }, t('官方安装说明', 'Official installation')))),
h('label', { htmlFor: controlId+'-database' }, t('离线漏洞库缓存目录（可选）', 'Offline database cache directory (optional)')),
h('input', { id: controlId+'-database', value: settings.osvDatabaseDir || '', disabled: busy, placeholder: t('留空使用 OSV 默认缓存', 'Leave empty for the default OSV cache'), onChange: e => { setSettings(s => ({ ...s, osvDatabaseDir: e.target.value })); setDirty(true); } }),
h('p', { className: 'secw-muted' }, t('OSV 2.7 使用缓存目录/osv-scalibr/npm/all.zip；数据库由用户预先下载。', 'OSV 2.7 uses cache/osv-scalibr/npm/all.zip. Download the database beforehand.')),
h('a', { href: 'https://google.github.io/osv-scanner/usage/offline-mode/', target: '_blank', rel: 'noopener noreferrer' }, t('离线数据库说明', 'Offline database guide')),
h('label', { className: 'secw-choice' }, h('input', { type: 'checkbox', checked: autoCheck, disabled: busy, onChange: e => { setAutoCheck(e.target.checked); setDirty(true); } }), t('每轮完成后检查改动', 'Check changes after each turn')),
h('p', { className: 'secw-muted' }, t('自动检查仅用内置规则，包含 Git 未跟踪的新文件。结果单独保存；新增高风险模式会在后续对话中提醒。', 'Automatic checks use built-in rules and include untracked Git files. Results are stored separately; new high-risk patterns are surfaced in later conversations.')),
data?.automatic ? h('p', { className: 'secw-muted' }, data.automatic.problem ? t('最近自动检查未完成，请手动检查改动并核对 Git 工作区。', 'The last automatic check did not complete. Check changes manually and verify the Git workspace.') : t('最近自动检查：', 'Last automatic check: ') + new Date(data.automatic.time).toLocaleString(english() ? 'en-US' : 'zh-CN') + ' · ' + t('高风险提示 ', 'High-risk patterns ') + data.automatic.highRisk) : null,
h('div', { className: 'secw-tools' }, h('button', { disabled: busy || !dirty, onClick: save }, t('保存设置', 'Save settings')), h('button', { disabled: busy || !dirty, onClick: () => { setSettings(data.settings); setAutoCheck(data.workspace.autoCheck); setDirty(false); } }, t('取消修改', 'Cancel edits')), h('button', { disabled, onClick: () => run('health') }, t('检查工具', 'Check tools'))),
dirty ? h('p', { className: 'secw-muted' }, t('设置尚未保存，请保存后再检查。', 'Save your settings before starting a check.')) : null,
result?.engines ? h(Coverage, { rows: result.engines }) : null,
result?.database ? h('div', null, h('p', { className: 'secw-file' }, result.database.directory), result.database.available ? result.database.databases.map(db => h('p', { key: db.ecosystem, className: 'secw-muted' }, db.ecosystem + ' · ' + t('缓存文件修改时间：', 'Cache file modified: ') + new Date(db.fileModifiedAt).toLocaleString(english() ? 'en-US' : 'zh-CN'))) : h('p', { className: 'secw-muted' }, t('未找到离线漏洞库。', 'No offline database was found.')), h('p', { className: 'secw-muted' }, t('文件时间不代表库中每条漏洞的更新日期。', 'A file timestamp does not establish the freshness of every advisory.'))) : null) : activeTab === 'dependencies' ? h('section',{className:'security-settings'},h('h3',null,t('依赖与已知漏洞','Dependencies and known vulnerabilities')),h('label', { htmlFor: controlId+'-audit' }, t('检查方式', 'Check mode')),
h('select', { id: controlId+'-audit', value: mode, disabled: busy, onChange: e => setMode(e.target.value) }, h('option', { value: 'none' }, t('仅列出依赖（离线）', 'Dependency inventory (offline)')), h('option', { value: 'offline' }, t('已知漏洞（本地数据库）', 'Known vulnerabilities (local database)')), h('option', { value: 'online' }, t('已知漏洞（联网）', 'Known vulnerabilities (online)'))),
h('p', { className: 'secw-muted' }, mode === 'online' ? t('联网审计会向 OSV 查询包名、版本等依赖信息；不上传源码。', 'Online auditing queries OSV with package names, versions and dependency metadata; source code is not uploaded.') : t('清单检查只看依赖声明，不代表不存在已知漏洞。离线漏洞审计需要预先下载数据库。', 'An inventory is not a vulnerability audit. Offline auditing requires a previously downloaded database.')),
h('button', { disabled, onClick: () => run('deps') }, t('检查依赖', 'Check dependencies')),
result?.dependencies ? h('div', null, h('p', null, t('发现依赖：', 'Dependencies: ') + (result.dependenciesTotal ?? result.dependencies.length)), ...(result.warnings || []).map((warning, i) => h('p', { key: i, className: 'secw-error' }, message(warning))), result.audit ? h(React.Fragment, null, h(Coverage, { rows: [result.audit.coverage] }), h('p', null, t('已知漏洞：', 'Known vulnerabilities: ') + (result.audit.vulnerabilitiesTotal ?? result.audit.vulnerabilities.length)), result.audit.vulnerabilities.map((v, i) => h('article', { key: v.id + v.package + i, className: 'secw-finding' }, h('strong', null, v.package + '@' + v.version), h('p', null, v.summary), h('p', null, t('修复版本：', 'Fixed versions: ') + (v.fixedVersions?.join(', ') || t('暂无', 'Not available'))), h('a', { href: v.url, target: '_blank', rel: 'noopener noreferrer' }, v.id)))) : null) : null) : h(SecurityResults,{report,findings,fresh,filter,setFilter,limit,setLimit,busy,loading,download,onOpen:f=>location(f,false),onCopy:f=>location(f,true)})),
 switchTo ? h(W.Dialog,{title:t('设置尚未保存','Unsaved settings'),closeLabel:t('继续编辑','Keep editing'),onClose:()=>setSwitchTo('')},h('p',null,t('切换项目之前，选择如何处理当前修改。','Choose what to do with the current settings before switching projects.')),h('div',{className:'w-toolbar'},
 h(W.Button,{variant:'primary',onClick:async()=>{if(await save()){const next=switchTo;setSwitchTo('');void open(next);}}},t('保存并切换','Save and switch')),
 h(W.Button,{onClick:()=>{const next=switchTo;setSwitchTo('');void open(next);}},t('放弃修改并切换','Discard and switch')),
 h(W.Button,{onClick:()=>setSwitchTo('')},t('继续编辑','Keep editing')))) : null);
        }
        const css = `.secw{max-width:1060px;min-width:0;margin:auto;font:14px/1.6 system-ui,sans-serif;color:var(--dsw-alias-label-primary,#253047)}.secw *{box-sizing:border-box}.secw h2{font-size:22px;margin:0}.secw h3{font-size:17px;margin:0 0 8px}.secw p{margin:7px 0}.secw label{display:block;margin:8px 0 4px}.secw button,.secw select,.secw input:not([type=checkbox]){font:inherit;color:inherit;border:1px solid var(--dsw-alias-border-l3,#d3dbe5);border-radius:8px;background:var(--dsw-alias-bg-layer-1,#fff);padding:8px 10px;max-width:100%}.secw input:not([type=checkbox]),.secw select{width:100%;min-width:0}.secw button{cursor:pointer;white-space:normal}.secw button:disabled{opacity:.5;cursor:default}.secw .secw-primary{background:#245ee9;color:#fff;border-color:#245ee9}.secw .secw-tools,.secw .secw-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:12px 0}.secw .secw-tools select{width:auto;max-width:100%}.secw .secw-muted{color:var(--dsw-alias-label-secondary,#64718a);font-size:13px}.secw .secw-card,.secw .secw-finding{border:1px solid var(--dsw-alias-border-l3,#d3dbe5);border-radius:11px;padding:14px;margin:12px 0;overflow-wrap:anywhere;background:var(--dsw-alias-bg-layer-1,#fff)}.secw .secw-finding[data-severity=critical],.secw .secw-finding[data-severity=high]{border-left:4px solid #c04836}.secw .secw-coverage{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin:10px 0}.secw .secw-engine{border:1px solid var(--dsw-alias-border-l3,#d3dbe5);border-radius:9px;padding:10px;overflow-wrap:anywhere}.secw .secw-engine strong{margin-right:8px}.secw .secw-engine small{display:block;color:var(--dsw-alias-label-secondary,#64718a)}.secw .secw-badge{display:inline-block;background:var(--dsw-alias-bg-layer-2,#f0f3f8);border-radius:5px;padding:1px 6px;font-size:12px}.secw .secw-badge[data-status=failed],.secw .secw-badge[data-status=partial]{color:#b33928}.secw .secw-error{background:#fff0ed;color:#973321;padding:10px;border-radius:8px;overflow-wrap:anywhere}.secw .secw-notice{background:#edf4ff;color:#17468c;padding:10px;border-radius:8px}.secw .secw-choice{display:flex;align-items:center;gap:8px}.secw fieldset{border:1px solid var(--dsw-alias-border-l3,#d3dbe5);border-radius:8px;margin:12px 0}.secw summary{cursor:pointer;font-weight:600}.secw pre{white-space:pre-wrap;overflow-wrap:anywhere;max-height:160px;overflow:auto;background:var(--dsw-alias-bg-layer-2,#f3f5f9);padding:10px;border-radius:6px}.secw .secw-file{font-family:ui-monospace,monospace;overflow-wrap:anywhere}.secw a{color:#245ee9}.secw :focus-visible{outline:3px solid #78a8ff;outline-offset:2px}[role=dialog]:has(.secw){width:min(1200px,calc(100vw - 48px))!important;max-width:1200px!important}@media(max-width:700px){[role=dialog]:has(.secw){width:100%!important;max-width:100%!important;flex-direction:column!important}[role=dialog]:has(.secw) nav{width:100%!important;flex-basis:auto!important;max-height:140px;overflow:auto;border-right:0}[role=dialog]:has(.secw) nav>div:has(>button){display:flex;flex-direction:row!important;flex-wrap:wrap;flex-shrink:0;gap:4px}[role=dialog]:has(.secw)>nav+div{min-width:0;width:100%}[role=dialog]:has(.secw)>nav+div>div:has(.secw){padding:12px!important;min-width:0}.secw .secw-coverage{grid-template-columns:1fr}}`;
        function apply(ctx) {
securityHostContext=ctx;W.register(ctx,{id:'dsh-code-security.workbench',label:()=>t('代码安全','Code security'),icon:'shield',component:Workbench,order:59});
 try {
            locale = ctx.get?.('locale') || ctx.locale;
        }
        catch {
            locale = ctx.locale;
        } try {
            sidebar = ctx.get?.('sidebarRight') || ctx.sidebarRight;
        }
        catch { } ctx.slots.inject('settings.section', () => ctx.slots.register({ name: 'settings.section', id: 'dsh-code-security', order: 59, label: () => t('代码安全', 'Code security'), inject: () => ({}) }, Workbench)); }
        return { inject: ['slots', 'locale'], apply };
    } });
