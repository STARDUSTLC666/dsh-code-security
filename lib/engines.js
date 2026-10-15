/** Optional scanners run over bounded, owned snapshots; no project rules or install scripts. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { homedir, tmpdir } from 'node:os';
import { protectFinding, redactText } from './privacy.js';
import { sanitizedHtmlLines } from './syntax.js';
const rulePath = (file) => fileURLToPath(new URL('../rules/' + file, import.meta.url));
const command = (id, cfg) => cfg.enginePaths[id] ?? (id === 'osv' ? 'osv-scanner' : id);
const canonical = (file) => process.platform === 'win32' ? path.resolve(file).toLowerCase() : path.resolve(file);
const missing = (error) => /ENOENT|not found|cannot find|找不到|不存在/i.test(String(error?.code ?? '') + ' ' + String(error?.message ?? error));
/** File modification dates describe the cache, not the age of every advisory inside it. */
export async function databaseHealth(cfg) {
    const defaultRoot = process.platform === 'win32' ? process.env.LOCALAPPDATA : process.platform === 'darwin' ? path.join(homedir(), 'Library', 'Caches') : process.env.XDG_CACHE_HOME || path.join(homedir(), '.cache');
    const root = cfg.osvDatabaseDir || process.env.OSV_SCALIBR_LOCAL_DB_CACHE_DIRECTORY || process.env.OSV_SCANNER_LOCAL_DB_CACHE_DIRECTORY || defaultRoot || tmpdir();
    const directory = path.join(root, 'osv-scalibr'), databases = [];
    try {
        for (const entry of (await fs.readdir(directory, { withFileTypes: true })).slice(0, 200)) {
            if (!entry.isDirectory() || entry.isSymbolicLink())
                continue;
            try {
                const info = await fs.lstat(path.join(directory, entry.name, 'all.zip'));
                if (info.isFile() && !info.isSymbolicLink())
                    databases.push({ ecosystem: entry.name, fileModifiedAt: info.mtime.toISOString() });
            }
            catch { /* An ecosystem without an archive is unavailable. */ }
        }
    }
    catch { /* A missing/unreadable cache is reported as unavailable, never an empty audit. */ }
    return { directory, available: databases.length > 0, databases };
}
export async function probeEngine(engine, cfg, runner, signal) {
    let owned;
    try {
        signal?.throwIfAborted();
        if (engine === 'semgrep')
            owned = await snapshot([], cfg);
        const result = await runner.run([command(engine, cfg), engine === 'betterleaks' ? 'version' : '--version', ...(engine === 'semgrep' ? ['--metrics=off', '--disable-version-check'] : [])], { timeoutMs: Math.min(8000, cfg.engineTimeoutMs), signal,
            ...(owned ? { env: { SEMGREP_APP_TOKEN: '', SEMGREP_SETTINGS_FILE: path.join(owned.dir, '.semgrep-settings.yml'), SEMGREP_SEND_METRICS: 'off', SEMGREP_ENABLE_VERSION_CHECK: '0' } } : {}) });
        signal?.throwIfAborted();
        if (result.signal || result.exitCode !== 0)
            return { engine, status: missing(result.stderr) ? 'not-installed' : 'failed', reason: 'version-check-failed' };
        const version = /\b\d+\.\d+\.\d+\b/.exec(result.stdout)?.[0];
        if (!version || !version.startsWith(engine === 'osv' ? '2.' : '1.'))
            return { engine, status: 'failed', reason: 'unsupported-version' };
        return { engine, status: 'completed', version };
    }
    catch (error) {
        signal?.throwIfAborted();
        return { engine, status: missing(error) ? 'not-installed' : 'failed', reason: missing(error) ? 'executable-missing' : 'version-check-failed' };
    }
    finally {
        await owned?.dispose();
    }
}
async function snapshot(documents, cfg) {
    const parent = path.resolve(cfg.stateDir, 'engine-tmp');
    await fs.mkdir(parent, { recursive: true });
    const dir = await fs.mkdtemp(path.join(parent, 'scan-')), files = new Map();
    let bytes = 0, skipped = 0;
    try {
        for (const [i, doc] of documents.entries()) {
            if (Buffer.byteLength(doc.text) > cfg.maxFileBytes || bytes + Buffer.byteLength(doc.text) > 64 * 1024 * 1024 || files.size >= cfg.maxFiles) {
                skipped++;
                continue;
            }
            const normalized = doc.file.replace(/\\/g, '/');
            const relative = !path.isAbsolute(normalized) && !normalized.split('/').some(p => p === '..' || p.includes(':')) ? normalized : 'external/' + i + '/' + path.basename(normalized);
            const file = path.resolve(dir, relative);
            if (!file.startsWith(dir + path.sep))
                throw new Error('Invalid snapshot path');
            await fs.mkdir(path.dirname(file), { recursive: true });
            await fs.writeFile(file, doc.text, { flag: 'wx', mode: 0o600 });
            files.set(canonical(file), doc);
            bytes += Buffer.byteLength(doc.text);
        }
        return { dir, files, skipped, async dispose() { if (path.dirname(dir) !== parent || !path.basename(dir).startsWith('scan-'))
                throw new Error('Invalid owned snapshot'); await fs.rm(dir, { recursive: true, force: true }); } };
    }
    catch (error) {
        if (path.dirname(dir) === parent && path.basename(dir).startsWith('scan-'))
            await fs.rm(dir, { recursive: true, force: true });
        throw error;
    }
}
function documentFor(name, dir, files) {
    if (typeof name !== 'string')
        return undefined;
    return files.get(canonical(path.isAbsolute(name) ? name : path.resolve(dir, name)));
}
function validLine(value) { return Number.isSafeInteger(value) && value >= 1; }
function selected(doc, start, end) {
    return !doc.selectedLines || [...doc.selectedLines].some(line => line >= start && line <= end);
}
function normalizeFindings(engine, report, dir, files) {
    const rows = engine === 'betterleaks' ? report : report?.results;
    if (!Array.isArray(rows))
        throw new Error('invalid-json-schema');
    const findings = [];
    let incomplete = engine === 'semgrep' && (!Array.isArray(report.errors) || report.errors.length > 0);
    const lines = new Map([...files.values()].map(doc => [doc, doc.text.split(/\r?\n/)]));
    const sanitized = new Map();
    if (rows.length > 5000)
        incomplete = true;
    for (const row of rows.slice(0, 5000)) {
        const doc = documentFor(engine === 'betterleaks' ? row.File : row.path, dir, files);
        const line = engine === 'betterleaks' ? row.StartLine : row.start?.line;
        const endLine = engine === 'betterleaks' ? row.EndLine : row.end?.line;
        const rule = engine === 'betterleaks' ? row.RuleID : row.check_id;
        if (!doc || !validLine(line) || !validLine(endLine) || endLine < line || endLine > lines.get(doc).length || typeof rule !== 'string' || rule.length > 300) {
            incomplete = true;
            continue;
        }
        if (!selected(doc, line, endLine))
            continue;
        if (engine === 'semgrep' && rule === 'dsh-js-html-input') {
            if (!sanitized.has(doc))
                sanitized.set(doc, sanitizedHtmlLines(doc.text));
            if (sanitized.get(doc).has(line))
                continue;
        }
        const snippet = lines.get(doc).slice(line - 1, endLine).join('\n').slice(0, 200);
        const message = engine === 'betterleaks' ? row.Description : row.extra?.message;
        const title = engine === 'betterleaks' ? '检测到平台格式的密钥' : typeof message === 'string' ? message.slice(0, 200) : rule;
        const cwe = engine === 'betterleaks' ? 'CWE-798' : String(row.extra?.metadata?.cwe?.[0] ?? row.extra?.metadata?.cwe ?? 'CWE-20').match(/CWE-\d+/)?.[0] ?? 'CWE-20';
        const severity = engine === 'betterleaks' ? 'high' : row.extra?.severity === 'ERROR' ? 'high' : row.extra?.severity === 'INFO' ? 'low' : 'medium';
        const finding = { id: 'EXT-' + createHash('sha256').update(engine + '|' + rule + '|' + doc.file + '|' + line).digest('hex').slice(0, 12), ruleId: engine + ':' + rule, engine,
            title, cwe, severity, confidence: engine === 'betterleaks' ? row.Attributes?.confidence === 'low' ? 'low' : 'high' : row.extra?.metadata?.confidence === 'HIGH' ? 'high' : 'medium',
            evidence: engine === 'semgrep' ? 'dataflow' : 'pattern', file: doc.file, line, endLine, snippet, message: typeof message === 'string' ? message.slice(0, 2000) : title };
        findings.push(protectFinding(finding));
    }
    return { findings, incomplete };
}
async function execute(engine, args, cfg, runner, dir, signal) {
    signal?.throwIfAborted();
    const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(new Error('engine timed out')), cfg.engineTimeoutMs);
    const databaseRoot = cfg.osvDatabaseDir || process.env.OSV_SCALIBR_LOCAL_DB_CACHE_DIRECTORY || process.env.OSV_SCANNER_LOCAL_DB_CACHE_DIRECTORY;
    try {
        const result = await runner.run([command(engine, cfg), ...args], { cwd: dir, timeoutMs: cfg.engineTimeoutMs, signal: signal ? AbortSignal.any([signal, ctl.signal]) : ctl.signal,
            ...(engine === 'osv' && databaseRoot ? { env: { OSV_SCANNER_LOCAL_DB_CACHE_DIRECTORY: databaseRoot, OSV_SCALIBR_LOCAL_DB_CACHE_DIRECTORY: databaseRoot } } : engine === 'semgrep' ? { env: { SEMGREP_APP_TOKEN: '', SEMGREP_SETTINGS_FILE: path.join(dir, '.semgrep-settings.yml'), SEMGREP_SEND_METRICS: 'off', SEMGREP_ENABLE_VERSION_CHECK: '0' } } : {}) });
        signal?.throwIfAborted();
        if (ctl.signal.aborted || result.signal)
            return { coverage: { engine, status: 'timed-out', reason: 'execution-timeout' } };
        if (result.exitCode !== 0 && result.exitCode !== 1)
            return { coverage: { engine, status: 'failed', reason: engine === 'osv' && /database|cache|offline/i.test(result.stderr) ? 'database-unavailable' : 'execution-failed' } };
        try {
            return { report: JSON.parse(result.stdout.replace(/^\uFEFF/, '').trim()), exitCode: result.exitCode };
        }
        catch {
            return { coverage: { engine, status: 'failed', reason: 'invalid-or-truncated-json' } };
        }
    }
    catch (error) {
        signal?.throwIfAborted();
        return { coverage: { engine, status: missing(error) ? 'not-installed' : ctl.signal.aborted ? 'timed-out' : 'failed', reason: missing(error) ? 'executable-missing' : ctl.signal.aborted ? 'execution-timeout' : 'execution-failed' } };
    }
    finally {
        clearTimeout(timer);
    }
}
export async function scanExternal(engine, documents, cfg, runner, signal) {
    const started = Date.now(), health = await probeEngine(engine, cfg, runner, signal);
    signal?.throwIfAborted();
    if (health.status !== 'completed')
        return { findings: [], coverage: health };
    if (!documents.length)
        return { findings: [], coverage: { ...health, status: 'not-run', reason: 'no-eligible-files' } };
    const owned = await snapshot(documents, cfg);
    try {
        const args = engine === 'betterleaks' ? ['dir', owned.dir, '--config', rulePath('betterleaks.toml'), '--validation=false', '--redact=100', '--no-banner', '--no-color', '--ignore-gitleaks-allow', '--max-archive-depth=0', '--max-decode-depth=0', '--report-format=json', '--report-path=-', '--timeout', String(Math.ceil(cfg.engineTimeoutMs / 1000))]
            : ['scan', '--config', rulePath('semgrep.yml'), '--metrics=off', '--disable-version-check', '--no-git-ignore', '--no-rewrite-rule-ids', '--json', '--quiet', '--max-target-bytes', String(cfg.maxFileBytes), '--timeout', '15', owned.dir];
        const run = await execute(engine, args, cfg, runner, owned.dir, signal);
        if (run.coverage)
            return { findings: [], coverage: { ...run.coverage, version: health.version } };
        try {
            const normalized = normalizeFindings(engine, run.report, owned.dir, owned.files);
            return { findings: normalized.findings, coverage: { ...health, status: normalized.incomplete || owned.skipped ? 'partial' : 'completed', ...(normalized.incomplete || owned.skipped ? { reason: 'incomplete-coverage' } : {}), findingsCount: normalized.findings.length, durationMs: Date.now() - started } };
        }
        catch {
            return { findings: [], coverage: { ...health, status: 'failed', reason: 'invalid-json-schema' } };
        }
    }
    finally {
        await owned.dispose();
    }
}
export function mergeFindings(findings) {
    const grouped = new Map();
    const rank = { critical: 4, high: 3, medium: 2, low: 1 };
    const confidenceRank = { high: 3, medium: 2, low: 1 };
    for (const finding of findings) {
        const key = finding.file + '|' + finding.line + '|' + finding.cwe;
        const previous = grouped.get(key);
        if (!previous)
            grouped.set(key, { ...finding, sources: [finding.engine ?? 'builtin'] });
        else
            grouped.set(key, { ...previous, severity: rank[finding.severity] > rank[previous.severity] ? finding.severity : previous.severity,
                confidence: confidenceRank[finding.confidence] > confidenceRank[previous.confidence] ? finding.confidence : previous.confidence, evidence: finding.evidence === 'dataflow' ? 'dataflow' : previous.evidence,
                sources: [...new Set([...(previous.sources ?? []), finding.engine ?? 'builtin'])] });
    }
    return [...grouped.values()].sort((a, b) => rank[b.severity] - rank[a.severity] || a.file.localeCompare(b.file) || a.line - b.line);
}
export async function auditDependencies(documents, mode, cfg, runner, signal) {
    const health = await probeEngine('osv', cfg, runner, signal);
    signal?.throwIfAborted();
    if (health.status !== 'completed')
        return { mode, coverage: health, packagesScanned: 0, vulnerabilities: [] };
    if (!documents.length)
        return { mode, coverage: { ...health, status: 'not-run', reason: 'no-lockfiles' }, packagesScanned: 0, vulnerabilities: [] };
    const owned = await snapshot(documents, cfg);
    try {
        const args = ['scan', 'source', '--recursive', '--no-ignore', '--format=json', '--all-packages', '--no-resolve', '--no-call-analysis=go', '--no-call-analysis=rust', '--config', rulePath('osv.toml'), ...(mode === 'offline' ? ['--offline'] : []), owned.dir];
        const run = await execute('osv', args, cfg, runner, owned.dir, signal);
        if (run.coverage)
            return { mode, coverage: { ...run.coverage, version: health.version }, packagesScanned: 0, vulnerabilities: [] };
        if (!Array.isArray(run.report?.results))
            return { mode, coverage: { ...health, status: 'failed', reason: 'invalid-json-schema' }, packagesScanned: 0, vulnerabilities: [] };
        let packagesScanned = 0, incomplete = owned.skipped > 0;
        const vulnerabilities = [];
        for (const source of run.report.results) {
            const doc = documentFor(source.source?.path, owned.dir, owned.files);
            if (!doc || !Array.isArray(source.packages)) {
                incomplete = true;
                continue;
            }
            for (const item of source.packages) {
                const pkg = item.package;
                if (typeof pkg?.name !== 'string' || typeof pkg.version !== 'string') {
                    incomplete = true;
                    continue;
                }
                // OSV intentionally does not query public advisories for local packages.
                if (typeof pkg.purl === 'string' && /[?&]source=LOCAL(?:&|$)/i.test(pkg.purl)) {
                    incomplete = true;
                    continue;
                }
                packagesScanned++;
                for (const vuln of item.vulnerabilities ?? []) {
                    if (typeof vuln.id !== 'string') {
                        incomplete = true;
                        continue;
                    }
                    const fixedVersions = (vuln.affected ?? []).filter((a) => a.package?.name === pkg.name && a.package?.ecosystem === pkg.ecosystem).flatMap((a) => (a.ranges ?? []).flatMap((r) => (r.events ?? []).flatMap((e) => typeof e.fixed === 'string' ? [e.fixed] : [])));
                    vulnerabilities.push({ id: vuln.id, aliases: Array.isArray(vuln.aliases) ? vuln.aliases.filter((x) => typeof x === 'string') : [], package: redactText(pkg.name), version: redactText(pkg.version), ecosystem: pkg.ecosystem,
                        file: doc.file, summary: redactText(String(vuln.summary ?? vuln.id).slice(0, 2000)), severity: vuln.database_specific?.severity ?? vuln.ecosystem_specific?.severity ?? 'unknown', fixedVersions: [...new Set(fixedVersions)].slice(0, 50), url: 'https://osv.dev/vulnerability/' + encodeURIComponent(vuln.id) });
                }
            }
        }
        return { mode, coverage: { ...health, status: incomplete ? 'partial' : packagesScanned ? 'completed' : 'not-run', ...(incomplete ? { reason: 'incomplete-coverage' } : !packagesScanned ? { reason: 'no-resolved-packages' } : {}), findingsCount: vulnerabilities.length }, packagesScanned, vulnerabilities };
    }
    finally {
        await owned.dispose();
    }
}
