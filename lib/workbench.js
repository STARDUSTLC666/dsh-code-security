/** Authenticated operator UI: workspaces come from host sessions/tools, never browser paths. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { homedir } from 'node:os';
import { createHash, randomUUID } from 'node:crypto';
import lockfile from 'proper-lockfile';
import { resolveConfig } from './config.js';
import { loadState } from './state.js';
import { splitByBaseline } from './state.js';
import { redactText } from './privacy.js';
export const SECURITY_WORKBENCH_ROUTE = '/api/dsh-code-security/workbench';
const hash = (text) => createHash('sha256').update(text).digest('hex');
const json = (status, value) => new Response(JSON.stringify(value), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
export class SecurityWorkbench {
    cfg;
    automaticProblems = new Map();
    jobs = new Map();
    tools;
    directory;
    onAutoChanged;
    constructor(cfg, options) {
        this.cfg = cfg;
        this.directory = options.directory ?? path.join(process.env.DSH_HOME || path.join(homedir(), '.dsh'), 'plugins', 'dsh-code-security');
        this.tools = options.tools;
    }
    async catalog() {
        try {
            const file = path.join(this.directory, 'workspaces.json'), stat = await fs.lstat(file);
            if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 2 * 1024 * 1024)
                throw new Error('invalid index');
            const data = JSON.parse(await fs.readFile(file, 'utf8'));
            if (data.version !== 1 || !Array.isArray(data.workspaces) || data.workspaces.length > 100 || data.workspaces.some((w) => !w || typeof w.root !== 'string' || !path.isAbsolute(w.root) || w.id !== hash(w.root) || typeof w.label !== 'string' || typeof w.autoCheck !== 'boolean' || w.sessionId !== undefined && typeof w.sessionId !== 'string') || !data.settings || !Array.isArray(data.settings.engines) || !data.settings.enginePaths)
                throw new Error('invalid index');
            resolveConfig(data.settings);
            return data;
        }
        catch (error) {
            if (error.code !== 'ENOENT')
                throw new Error('工作区索引损坏，原文件已保留 / Workspace index is invalid; the original was preserved');
            return { version: 1, workspaces: [], settings: { engines: this.cfg.engines, enginePaths: { ...this.cfg.enginePaths }, ...(this.cfg.osvDatabaseDir ? { osvDatabaseDir: this.cfg.osvDatabaseDir } : {}) } };
        }
    }
    async update(change) {
        await fs.mkdir(this.directory, { recursive: true });
        const unlock = await lockfile.lock(this.directory, { retries: { retries: 30, minTimeout: 25, maxTimeout: 100 } });
        try {
            const data = await this.catalog();
            change(data);
            const file = path.join(this.directory, 'workspaces.json'), temp = file + '.tmp-' + randomUUID();
            try {
                await fs.writeFile(temp, JSON.stringify(data), { flag: 'wx', mode: 0o600 });
                await fs.rename(temp, file);
            }
            finally {
                await fs.unlink(temp).catch(() => { });
            }
        }
        finally {
            await unlock();
        }
    }
    async remember(workspace, sessionId) {
        if (!path.isAbsolute(workspace))
            return;
        const root = await fs.realpath(workspace);
        if (!(await fs.lstat(root)).isDirectory())
            return;
        await this.update(data => {
            const previous = data.workspaces.find(w => w.id === hash(root));
            data.workspaces = [{ id: hash(root), root, label: path.basename(root) || root, autoCheck: previous?.autoCheck ?? false, ...(sessionId ? { sessionId } : previous?.sessionId ? { sessionId: previous.sessionId } : {}) }, ...data.workspaces.filter(w => w.id !== hash(root))].slice(0, 100);
        });
    }
    async configFor(root) {
        const { settings } = await this.catalog();
        return { ...this.cfg, engines: [...settings.engines], enginePaths: { ...this.cfg.enginePaths, ...settings.enginePaths }, osvDatabaseDir: settings.osvDatabaseDir ?? this.cfg.osvDatabaseDir, stateDir: this.cfg.stateDirRelative ? path.resolve(root, this.cfg.stateDirRelative) : this.cfg.stateDir };
    }
    async autoEnabled(root) { return (await this.catalog()).workspaces.find(w => w.id === hash(root))?.autoCheck === true; }
    automaticProblem(root, reason) { if (reason)
        this.automaticProblems.set(root, reason);
    else
        this.automaticProblems.delete(root); }
    async workspace(id) {
        const row = (await this.catalog()).workspaces.find(w => typeof id === 'string' && w.id === id);
        if (!row || await fs.realpath(row.root) !== row.root)
            throw new Error('请选择已登记的工作区 / Choose a registered workspace');
        return row;
    }
    async report(row) {
        const tools = this.tools(await this.configFor(row.root), row.root);
        return tools.find(t => t.name === 'secure_report').execute({}, {});
    }
    async runAutomatic(root, signal) {
        const cfg = await this.configFor(root);
        const autoCfg = { ...cfg, stateDir: path.join(cfg.stateDir, 'automatic'), stateDirRelative: undefined, engines: ['builtin'] };
        const result = await this.tools(autoCfg, root).find(t => t.name === 'secure_diff').execute({ includeUntracked: true, engines: ['builtin'] }, { signal });
        const manual = await loadState(cfg.stateDir);
        return { ...result, newFindings: splitByBaseline(result.findings, manual.baseline).fresh };
    }
    safeResult(result) {
        if (!result || typeof result !== 'object')
            return result;
        const value = { ...result };
        delete value.baseline;
        for (const name of ['findings', 'newFindings', 'acceptedFindings', 'closed', 'remaining', 'fresh', 'unverified', 'dependencies'])
            if (Array.isArray(value[name])) {
                value[name + 'Total'] = value[name].length;
                value[name] = value[name].slice(0, 200);
            }
        if (value.audit)
            value.audit = { ...value.audit, vulnerabilitiesTotal: value.audit.vulnerabilities.length, vulnerabilities: value.audit.vulnerabilities.slice(0, 200) };
        return value;
    }
    async run(root, name, args, signal) {
        const tools = this.tools(await this.configFor(root), root), selected = tools.find(t => t.name === name);
        if (!selected)
            throw new Error('Unknown security operation');
        return selected.execute(args, { signal });
    }
    async action(body) {
        if (body.operation === 'list')
            return { ok: true, ...await this.catalog() };
        const row = await this.workspace(body.id);
        if (body.operation === 'open') {
            const cfg = await this.configFor(row.root);
            let automatic;
            try {
                const state = await loadState(path.join(cfg.stateDir, 'automatic'));
                automatic = state.last ? { time: state.last.time, complete: state.last.complete !== false, highRisk: state.last.findings.filter(f => f.severity === 'high' || f.severity === 'critical').length } : null;
            }
            catch {
                automatic = { problem: 'automatic-state-invalid' };
            }
            if (this.automaticProblems.has(row.root))
                automatic = { ...automatic, problem: this.automaticProblems.get(row.root) };
            const running = [...this.jobs.values()].find(j => j.workspace === row.id && j.status === 'running');
            return { ok: true, workspace: row, report: this.safeResult(await this.report(row)), settings: (await this.catalog()).settings, automatic, ...(running ? { activeJob: { id: running.id, action: running.action, status: running.status } } : {}) };
        }
        if (body.operation === 'settings') {
            if (typeof body.autoCheck !== 'boolean')
                throw new Error('autoCheck must be boolean');
            const checked = resolveConfig({ engines: body.engines, enginePaths: body.enginePaths, ...(body.osvDatabaseDir === undefined ? {} : { osvDatabaseDir: body.osvDatabaseDir }) });
            await this.update(data => { data.settings = { engines: checked.engines, enginePaths: checked.enginePaths, ...(checked.osvDatabaseDir ? { osvDatabaseDir: checked.osvDatabaseDir } : {}) }; data.workspaces.find(w => w.id === row.id).autoCheck = body.autoCheck; });
            this.onAutoChanged?.(row.root, body.autoCheck);
            return { ok: true, ...await this.action({ operation: 'open', id: row.id }) };
        }
        if (body.operation === 'location') {
            const cfg = await this.configFor(row.root), state = await loadState(cfg.stateDir), finding = state.last?.findings.find(f => f.id === body.finding);
            if (!finding)
                throw new Error('问题已变化，请刷新 / Finding changed; refresh the report');
            const file = path.resolve(row.root, finding.file), rel = path.relative(row.root, file);
            if (rel.startsWith('..') || path.isAbsolute(rel) || await fs.realpath(file) !== file || !(await fs.lstat(file)).isFile())
                throw new Error('不能打开工作区外或已移动的文件 / File is outside the workspace or has moved');
            return { ok: true, path: file, line: finding.line, sessionId: row.sessionId };
        }
        if (body.operation === 'job' || body.operation === 'cancel') {
            const job = this.jobs.get(String(body.job));
            if (!job || job.workspace !== row.id)
                throw new Error('任务已结束或已重启 / Job expired or DSH restarted');
            if (body.operation === 'cancel')
                job.controller.abort(new Error('cancelled by operator'));
            return { ok: true, job: { id: job.id, action: job.action, status: job.status, ...(job.result ? { result: this.safeResult(job.result) } : {}), ...(job.error ? { error: job.error } : {}) } };
        }
        if (body.operation === 'export') {
            if (body.format !== 'sarif' && body.format !== 'markdown')
                throw new Error('Invalid export format');
            const result = await this.run(row.root, 'secure_export', { format: body.format });
            return { ok: true, text: result.text, filename: body.format === 'sarif' ? 'security-report.sarif' : 'security-report.md' };
        }
        if (body.operation === 'start') {
            const actions = { scan: 'secure_scan', diff: 'secure_diff', verify: 'secure_fix_verify', deps: 'secure_deps', health: 'secure_health' };
            const action = String(body.action), tool = actions[action];
            if (!tool)
                throw new Error('不支持此操作 / Unsupported operation');
            if ([...this.jobs.values()].some(j => j.workspace === row.id && j.status === 'running'))
                throw new Error('已有检查正在运行 / A check is already running');
            if (action === 'deps' && !['none', 'offline', 'online'].includes(String(body.audit ?? 'none')))
                throw new Error('Invalid audit mode');
            const args = action === 'deps' ? { audit: body.audit ?? 'none' } : action === 'diff' ? { includeUntracked: true } : {};
            const job = { id: randomUUID(), workspace: row.id, action, status: 'running', controller: new AbortController() };
            this.jobs.set(job.id, job);
            job.work = this.run(row.root, tool, args, job.controller.signal).then(result => { job.result = result; job.status = 'completed'; }, error => { job.status = job.controller.signal.aborted ? 'cancelled' : 'failed'; job.error = job.controller.signal.aborted ? '已取消 / Cancelled' : redactText(error instanceof Error ? error.message : String(error)).slice(0, 2000); });
            if (this.jobs.size > 100)
                for (const [id, old] of this.jobs) {
                    if (old.status !== 'running')
                        this.jobs.delete(id);
                    if (this.jobs.size <= 80)
                        break;
                }
            return { ok: true, job: { id: job.id, action, status: job.status } };
        }
        throw new Error('不支持此操作 / Unsupported operation');
    }
    async fetch(request) {
        if (request.method !== 'POST')
            return json(405, { ok: false, message: 'POST required' });
        const origin = request.headers.get('origin'), site = request.headers.get('sec-fetch-site');
        if (request.headers.get('x-dsh-security-action') !== '1' || request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json' || site && !['same-origin', 'none'].includes(site))
            return json(403, { ok: false, message: '请从安全检查面板操作 / Use the security panel' });
        try {
            if (origin) {
                // DSH's connection adapter uses an internal Request URL; Host retains the browser authority.
                const source = new URL(origin), internal = new URL(request.url), authority = request.headers.get('host') || internal.host;
                if (!['http:', 'https:'].includes(source.protocol) || source.host !== authority || authority === internal.host && source.protocol !== internal.protocol)
                    return json(403, { ok: false, message: '拒绝跨源操作 / Cross-origin request refused' });
            }
            const reader = request.body?.getReader();
            if (!reader)
                throw new Error('Request body missing');
            let size = 0;
            const chunks = [];
            try {
                for (;;) {
                    const part = await reader.read();
                    if (part.done)
                        break;
                    size += part.value.byteLength;
                    if (size > 16384) {
                        await reader.cancel();
                        return json(413, { ok: false, message: 'Request too large' });
                    }
                    ;
                    chunks.push(part.value);
                }
            }
            finally {
                reader.releaseLock();
            }
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
            if (!body || typeof body !== 'object' || Array.isArray(body))
                throw new Error('Invalid operation');
            return json(200, await this.action(body));
        }
        catch (error) {
            return json(400, { ok: false, message: redactText(error instanceof Error ? error.message : String(error)) });
        }
    }
    async dispose() { for (const job of this.jobs.values())
        job.controller.abort(new Error('DSH disposed')); await Promise.allSettled([...this.jobs.values()].map(job => job.work)); }
}
export function installSecurityWorkbench(ctx, workbench) {
    ctx.inject?.(['connection'], (host) => host.connection.fetch.register({ path: SECURITY_WORKBENCH_ROUTE, methods: ['POST'], requestBody: 'buffered', fetch: (request) => workbench.fetch(request) }));
}
