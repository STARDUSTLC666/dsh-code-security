/**
 * 十个面向模型的安全审查工具：
 * secure_scan / secure_diff / secure_fix_verify / secure_report / secure_export /
 * secure_baseline / secure_deps / secure_policy_show / secure_policy_set / secure_health。
 *
 * @module dsh-code-security/tools
 */
import { writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { optionalString, requiredString } from './config.js';
import { buildExtraTools } from './extra.js';
import { loadPolicy, normalizePolicy, POLICY_FILE, savePolicy } from './policy.js';
import { ruleCategory } from './rules.js';
import { compareFingerprints, countFindings, findingFingerprint, loadState, saveState, splitByBaseline } from './state.js';
import { runSourceCheck, sourceEngines } from './audit.js';
import { probeEngine, databaseHealth } from './engines.js';
const SEVERITY_ORDER = { critical: 4, high: 3, medium: 2, low: 1 };
const PACKAGE_VERSION = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version;
function compileParameters(spec) {
    const properties = {};
    const required = [];
    for (const [key, prop] of Object.entries(spec)) {
        if (prop?.required === true)
            required.push(key);
        const node = {};
        if (typeof prop?.type === 'string')
            node.type = prop.type;
        if (typeof prop?.description === 'string')
            node.description = prop.description;
        if (prop?.enum !== undefined)
            node.enum = prop.enum;
        if (prop?.items !== undefined)
            node.items = prop.items;
        properties[key] = node;
    }
    return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) };
}
/** Reject ambiguous scopes before reading files, running git, or replacing scan state. */
export function scanArguments(raw, allowed = ['target', 'engines']) {
    if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
        throw new Error('扫描参数必须是对象。请用 { target: "文件或目录" } 限定范围；扫描整个工作区请传 {}。');
    }
    const args = raw;
    const unknown = Object.keys(args).filter(key => !allowed.includes(key));
    if (unknown.length > 0) {
        throw new Error('不支持的扫描参数：' + unknown.join('、') + '。请使用 target 指定一个文件或目录；仅省略 target 或使用 target: "." 才扫描整个工作区。');
    }
    if (Object.hasOwn(args, 'target') && (typeof args.target !== 'string' || args.target.trim() === '')) {
        throw new Error('扫描参数 target 必须是非空的文件或目录字符串。扫描整个工作区请省略 target 或使用 "."。');
    }
    if (Object.hasOwn(args, 'base') && (typeof args.base !== 'string' || args.base.trim() === '' || args.base.trim().startsWith('-') || args.base.includes('\0'))) {
        throw new Error('扫描参数 base 必须是非空的 Git ref，不能是 Git 命令选项。');
    }
    if (Object.hasOwn(args, 'staged') && typeof args.staged !== 'boolean') {
        throw new Error('扫描参数 staged 必须是布尔值 true 或 false。');
    }
    if (Object.hasOwn(args, 'includeUntracked') && typeof args.includeUntracked !== 'boolean')
        throw new Error('includeUntracked 必须是布尔值');
    return args;
}
const findingSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }, ruleId: { type: 'string' }, title: { type: 'string' }, cwe: { type: 'string' },
        severity: { type: 'string' }, confidence: { type: 'string' }, file: { type: 'string' }, line: { type: 'integer' },
        snippet: { type: 'string' }, message: { type: 'string' },
    },
    additionalProperties: true,
};
const countsSchema = {
    type: 'object',
    properties: { critical: { type: 'integer' }, high: { type: 'integer' }, medium: { type: 'integer' }, low: { type: 'integer' } },
    additionalProperties: true,
};
const scanSchema = {
    type: 'object',
    properties: {
        root: { type: 'string' }, filesScanned: { type: 'integer' }, filesSkipped: { type: 'integer' },
        filesChanged: { type: 'integer' }, addedLines: { type: 'integer' },
        findings: { type: 'array', items: findingSchema }, counts: countsSchema, passed: { type: 'boolean' },
        failOn: { type: 'string' }, durationMs: { type: 'integer' },
        newFindings: { type: 'array', items: findingSchema }, newCounts: countsSchema,
        acceptedFindings: { type: 'array', items: findingSchema },
        baseline: { oneOf: [{ type: 'object', additionalProperties: true }, { type: 'null' }] },
    },
    additionalProperties: true,
};
function verdictOf(findings, failOn) {
    const threshold = SEVERITY_ORDER[failOn];
    return !findings.some((finding) => SEVERITY_ORDER[finding.severity] >= threshold);
}
function baselineSummary(value) {
    const rec = (value ?? {});
    return {
        fresh: Array.isArray(rec.newFindings) ? rec.newFindings : [],
        accepted: Array.isArray(rec.acceptedFindings) ? rec.acceptedFindings : [],
    };
}
function renderFindings(_args, value) {
    const rec = (value ?? {});
    const findings = Array.isArray(rec.findings) ? rec.findings : [];
    const counts = rec.counts;
    const split = baselineSummary(value);
    const lines = [
        '安全审查：' + (rec.passed === true ? '通过' : '未通过'),
        '文件 ' + String(rec.filesScanned ?? 0) + ' 个，发现 ' + findings.length + ' 个问题（critical ' + String(counts?.critical ?? 0) + ' / high ' + String(counts?.high ?? 0) + ' / medium ' + String(counts?.medium ?? 0) + ' / low ' + String(counts?.low ?? 0) + '）；基线外新增 ' + split.fresh.length + ' 个。',
    ];
    if (typeof rec.filesSkipped === 'number' && rec.filesSkipped > 0)
        lines.push('已跳过 ' + rec.filesSkipped + ' 项；跳过项不计入已扫描文件数。');
    for (const finding of findings) {
        lines.push('- ' + finding.file + ':' + finding.line + ' [' + finding.severity + '] ' + finding.ruleId + ' ' + finding.title);
    }
    return [{ type: 'text', text: lines.join('\n') }];
}
export function buildSecureTools(cfg, cwd, runner) {
    return buildWorkspaceTools(cfg, cwd, runner).map(tool => ({ ...tool, async execute(args, exec) {
            const context = exec;
            const signal = context?.signal;
            signal?.throwIfAborted();
            const workspace = context?.agent?.session?.header?.cwd || cwd;
            const resolved = { ...cfg, stateDir: cfg.stateDirRelative ? path.resolve(workspace, cfg.stateDirRelative) : cfg.stateDir };
            const scopedRunner = { run: (argv, options) => runner.run(argv, { ...options, cwd: options?.cwd ?? workspace, signal: options?.signal && signal ? AbortSignal.any([options.signal, signal]) : options?.signal ?? signal }) };
            const selected = buildWorkspaceTools(resolved, workspace, scopedRunner, signal).find(row => row.name === tool.name);
            return selected.execute(args, exec);
        } }));
}
function buildWorkspaceTools(cfg, cwd, runner, signal) {
    const stateDir = cfg.stateDir;
    const secureScan = {
        name: 'secure_scan',
        description: '扫描工作区（或指定文件/目录），用确定性规则检测注入、弱加密、硬编码密钥、危险配置等问题。使用 target 字符串限定范围，不接受 paths/files 等参数；{} 表示整个工作区。结果写入 .code-security 状态供 secure_fix_verify 对比。',
        parameters: { ...compileParameters({
                target: { type: 'string', description: '要扫描的文件或目录（可选，缺省扫描整个工作区）。' },
                engines: { type: 'array', items: { type: 'string', enum: ['builtin', 'betterleaks', 'semgrep'] }, description: '可选引擎，默认使用配置（初始仅 builtin）。' },
            }), additionalProperties: false },
        output: { schema: scanSchema, render: renderFindings },
        async execute(rawArgs) {
            const args = scanArguments(rawArgs);
            const target = optionalString(args, 'target');
            const policy = await loadPolicy(cwd);
            const failOn = policy.failOn ?? cfg.failOn;
            const engines = sourceEngines(args.engines, cfg.engines);
            const result = await runSourceCheck({ kind: 'scan', ...(target ? { target } : {}) }, cfg, cwd, runner, engines, policy, signal);
            const state = await loadState(stateDir);
            const counts = countFindings(result.findings);
            const split = splitByBaseline(result.findings, state.baseline);
            const entry = {
                mode: target === undefined ? 'scan' : 'scan:' + target,
                target: target ?? '.',
                time: new Date().toISOString(),
                filesScanned: result.filesScanned,
                findings: result.findings,
                fingerprints: result.findings.map(findingFingerprint),
                counts,
                complete: result.complete, coverage: result.coverage, engines, scope: result.scope,
            };
            const stateFile = await saveState(stateDir, entry, signal);
            return { ...result, counts, newFindings: split.fresh, newCounts: countFindings(split.fresh), acceptedFindings: split.accepted, baseline: state.baseline, passed: result.complete && verdictOf(split.fresh, failOn), failOn, stateFile };
        },
        timeoutMs: 120000,
    };
    const secureDiff = {
        name: 'secure_diff',
        description: '结合少量上下文审查 git diff，只报告涉及新增行的问题（默认 HEAD，即未提交改动）。base 可用 Git ref；staged=true 审查已暂存改动；target 可限定文件。范围与路径相对当前会话工作区，遵守项目排除策略。结果同样写入状态。',
        parameters: { ...compileParameters({
                base: { type: 'string', description: 'git 基线（默认 HEAD）。' },
                target: { type: 'string', description: '限定文件路径（可选）。' },
                staged: { type: 'boolean', description: '审查已暂存改动（git diff --cached，默认 false）。' },
                includeUntracked: { type: 'boolean', description: '同时检查未跟踪的新文件（默认 false，staged 模式不包含它们）。' },
                engines: { type: 'array', items: { type: 'string', enum: ['builtin', 'betterleaks', 'semgrep'] }, description: '可选增强引擎；同样只报告涉及新增行的问题。' },
            }), additionalProperties: false },
        output: { schema: scanSchema, render: renderFindings },
        async execute(rawArgs) {
            const args = scanArguments(rawArgs, ['base', 'target', 'staged', 'engines', 'includeUntracked']);
            const base = optionalString(args, 'base') ?? 'HEAD';
            const target = optionalString(args, 'target');
            const policy = await loadPolicy(cwd);
            const failOn = policy.failOn ?? cfg.failOn;
            const engines = sourceEngines(args.engines, cfg.engines);
            const result = await runSourceCheck({ kind: 'diff', base, staged: args.staged === true, ...(args.includeUntracked === true ? { includeUntracked: true } : {}), ...(target ? { target } : {}) }, cfg, cwd, runner, engines, policy, signal);
            const state = await loadState(stateDir);
            const counts = countFindings(result.findings);
            const split = splitByBaseline(result.findings, state.baseline);
            const entry = {
                mode: 'diff:' + base,
                target: target ?? '.',
                time: new Date().toISOString(),
                filesScanned: result.filesScanned,
                findings: result.findings,
                fingerprints: result.findings.map(findingFingerprint),
                counts,
                complete: result.complete, coverage: result.coverage, engines, scope: result.scope,
            };
            await saveState(stateDir, entry, signal);
            return { ...result, counts, newFindings: split.fresh, newCounts: countFindings(split.fresh), acceptedFindings: split.accepted, baseline: state.baseline, passed: result.complete && verdictOf(split.fresh, failOn), failOn };
        },
        timeoutMs: 60000,
    };
    const secureFixVerify = {
        name: 'secure_fix_verify',
        description: '按上次相同范围与引擎复查，输出已关闭、仍存在、新增问题。只有完整复查才更新状态和判定关闭；规则不再命中不等同于相关测试通过。',
        parameters: { ...compileParameters({
                target: { type: 'string', description: '复扫文件或目录（可选，缺省扫描整个工作区）。' },
                engines: { type: 'array', items: { type: 'string', enum: ['builtin', 'betterleaks', 'semgrep'] }, description: '默认沿用上次扫描引擎；需与上次相同，避免未执行就宣称修好。' },
            }), additionalProperties: false },
        output: {
            schema: {
                type: 'object',
                properties: {
                    baselineMissing: { type: 'boolean' }, baselineTime: { type: 'string' },
                    closedCount: { type: 'integer' }, remainingCount: { type: 'integer' }, freshCount: { type: 'integer' },
                    closed: { type: 'array', items: findingSchema }, remaining: { type: 'array', items: findingSchema }, fresh: { type: 'array', items: findingSchema },
                    passed: { type: 'boolean' },
                },
                additionalProperties: true,
            },
            render: (_args, value) => {
                const rec = (value ?? {});
                return [{ type: 'text', text: '修复验证：关闭 ' + String(rec.closedCount ?? 0) + '，仍存在 ' + String(rec.remainingCount ?? 0) + '，新增 ' + String(rec.freshCount ?? 0) + '。' }];
            },
        },
        async execute(rawArgs) {
            const args = scanArguments(rawArgs);
            const target = optionalString(args, 'target');
            const policy = await loadPolicy(cwd);
            const state = await loadState(stateDir);
            const engines = sourceEngines(args.engines, state.last?.engines ?? cfg.engines);
            if (state.last && !state.last.scope && state.last.mode.startsWith('diff:'))
                throw new Error('旧版增量记录缺少完整范围，请先重新执行 secure_diff / Rerun secure_diff to upgrade this legacy diff record before rechecking');
            const scope = state.last?.scope ?? { kind: 'scan', ...(state.last?.target && state.last.target !== '.' ? { target: state.last.target } : {}) };
            if (target !== undefined && path.resolve(cwd, target) !== path.resolve(cwd, scope.target ?? '.'))
                throw new Error('复查范围必须与上次扫描相同；请先对新范围执行 secure_scan');
            if (state.last?.engines && [...engines].sort().join() !== [...state.last.engines].sort().join())
                throw new Error('复查引擎必须与上次扫描相同');
            const result = await runSourceCheck(scope, cfg, cwd, runner, engines, policy, signal);
            if (state.last === null) {
                return { baselineMissing: true, baselineTime: '', closedCount: 0, remainingCount: 0, freshCount: result.findings.length, closed: [], remaining: [], fresh: result.findings, passed: false };
            }
            const current = result.findings.map(findingFingerprint);
            const cmp = compareFingerprints(state.last.findings.map(findingFingerprint), current);
            const byFingerprint = new Map(result.findings.map((finding) => [findingFingerprint(finding), finding]));
            const closed = result.complete ? cmp.closed.map((fp) => state.last.findings.find((finding) => findingFingerprint(finding) === fp)).filter((x) => x !== undefined) : [];
            const remaining = cmp.remaining.map((fp) => byFingerprint.get(fp)).filter((x) => x !== undefined);
            const fresh = cmp.fresh.map((fp) => byFingerprint.get(fp)).filter((x) => x !== undefined);
            if (result.complete)
                await saveState(stateDir, {
                    ...state.last, time: new Date().toISOString(), mode: 'verify:' + scope.kind,
                    filesScanned: result.filesScanned, findings: result.findings,
                    fingerprints: current, counts: countFindings(result.findings),
                    complete: true, coverage: result.coverage, engines, scope,
                }, signal);
            return {
                baselineMissing: false,
                baselineTime: state.last.time,
                closedCount: closed.length,
                remainingCount: remaining.length,
                freshCount: fresh.length,
                complete: result.complete, coverage: result.coverage,
                unverified: result.complete ? [] : state.last.findings,
                closed, remaining, fresh,
                passed: result.complete && fresh.length === 0 && remaining.length === 0,
            };
        },
        timeoutMs: 120000,
    };
    const secureReport = {
        name: 'secure_report',
        description: '汇总最近一次扫描状态与策略：按严重度/规则/文件聚合，返回门禁结论与历史趋势。',
        parameters: compileParameters({}),
        output: {
            schema: {
                type: 'object',
                properties: {
                    hasScan: { type: 'boolean' }, stateFile: { type: 'string' }, policy: { type: 'object', additionalProperties: true },
                    counts: countsSchema, byRule: { type: 'array', items: { type: 'object', additionalProperties: true } },
                    byFile: { type: 'array', items: { type: 'object', additionalProperties: true } },
                    passed: { type: 'boolean' }, historyCount: { type: 'integer' },
                },
                additionalProperties: true,
            },
            render: (_args, value) => {
                const rec = (value ?? {});
                return [{ type: 'text', text: '安全报告：' + (rec.hasScan === true ? '最近扫描包含 ' + String(rec.counts?.critical ?? 0) + ' 个 critical。' : '尚无扫描记录，请先 secure_scan。') }];
            },
        },
        async execute() {
            const state = await loadState(stateDir);
            const policy = await loadPolicy(cwd);
            if (state.last === null) {
                return { hasScan: false, stateFile: '', policy, counts: { critical: 0, high: 0, medium: 0, low: 0 }, byRule: [], byFile: [], passed: false, historyCount: state.history.length };
            }
            const last = state.last;
            const byRule = new Map();
            const byFile = new Map();
            for (const finding of last.findings) {
                byRule.set(finding.ruleId, (byRule.get(finding.ruleId) ?? 0) + 1);
                byFile.set(finding.file, (byFile.get(finding.file) ?? 0) + 1);
            }
            const failOn = policy.failOn ?? cfg.failOn;
            const split = splitByBaseline(last.findings, state.baseline);
            return {
                hasScan: true,
                time: last.time, scope: last.scope, engines: last.engines ?? ['builtin'],
                stateFile: stateDir,
                policy,
                counts: last.counts,
                baseline: state.baseline,
                newCounts: countFindings(split.fresh),
                acceptedCounts: countFindings(split.accepted),
                byRule: [...byRule.entries()].sort((a, b) => b[1] - a[1]).map(([rule, count]) => ({ rule, count, category: ruleCategory(rule) })),
                byFile: [...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 50).map(([file, count]) => ({ file, count })),
                passed: last.complete !== false && verdictOf(split.fresh, failOn),
                complete: last.complete !== false, coverage: last.coverage ?? [], findings: last.findings,
                newFindings: split.fresh, acceptedFindings: split.accepted,
                historyCount: state.history.length,
            };
        },
        timeoutMs: 10000,
    };
    const policyShow = {
        name: 'secure_policy_show',
        description: '查看当前项目的 .code-security.json 策略：排除目录、忽略规则与门禁阈值。',
        parameters: compileParameters({}),
        output: {
            schema: { type: 'object', properties: { file: { type: 'string' }, policy: { type: 'object', additionalProperties: true } }, additionalProperties: true },
            render: (_args, value) => {
                const rec = (value ?? {});
                return [{ type: 'text', text: '策略文件：' + String(rec.file ?? '') }];
            },
        },
        async execute() {
            const policy = await loadPolicy(cwd);
            return { file: path.join(cwd, POLICY_FILE), policy };
        },
        timeoutMs: 10000,
    };
    const policySet = {
        name: 'secure_policy_set',
        description: '写入新的 .code-security.json 策略（JSON 文本）。会整体替换当前策略，写操作默认需要审批。',
        parameters: compileParameters({
            policy: { type: 'string', required: true, description: '完整策略 JSON 文本（必填）。' },
        }),
        output: {
            schema: { type: 'object', properties: { file: { type: 'string' }, policy: { type: 'object', additionalProperties: true } }, additionalProperties: true },
            render: (_args, value) => {
                const rec = (value ?? {});
                return [{ type: 'text', text: '策略已写入：' + String(rec.file ?? '') }];
            },
        },
        async execute(rawArgs) {
            const args = (rawArgs ?? {});
            const text = requiredString(args, 'policy', '策略 JSON');
            let parsed;
            try {
                parsed = JSON.parse(text);
            }
            catch {
                throw new Error('policy 参数不是合法 JSON。');
            }
            const policy = normalizePolicy((parsed ?? {}));
            const file = await savePolicy(cwd, policy, signal);
            return { file, policy };
        },
        timeoutMs: 10000,
    };
    const secureExport = {
        name: 'secure_export',
        description: '把最近一次扫描结果导出为 SARIF 2.1.0 或 Markdown。path 可选：提供时写入文件（写操作需要审批）。',
        parameters: compileParameters({
            format: { type: 'string', enum: ['sarif', 'markdown'], description: '导出格式（默认 sarif）。' },
            path: { type: 'string', description: '输出文件路径（可选，缺省只返回文本）。' },
        }),
        output: {
            schema: {
                type: 'object',
                properties: { format: { type: 'string' }, path: { type: 'string' }, text: { type: 'string' }, findingCount: { type: 'integer' } },
                additionalProperties: true,
            },
            render: (_args, value) => {
                const rec = (value ?? {});
                return [{ type: 'text', text: '已导出 ' + String(rec.findingCount ?? 0) + ' 条发现（' + String(rec.format ?? '') + '）。' }];
            },
        },
        async execute(rawArgs) {
            const args = (rawArgs ?? {});
            const format = args.format === 'markdown' ? 'markdown' : 'sarif';
            const target = optionalString(args, 'path');
            const state = await loadState(stateDir);
            if (state.last === null)
                throw new Error('尚无扫描结果，请先执行 secure_scan 或 secure_diff。');
            const text = format === 'sarif' ? buildSarif(state.last.findings, cwd) : buildMarkdown(state.last.findings, state.last.target);
            signal?.throwIfAborted();
            const destination = target === undefined ? undefined : path.resolve(cwd, target);
            if (destination !== undefined)
                await writeFile(destination, text, { encoding: 'utf8', mode: 0o600, signal });
            return { format, path: destination ?? '', text, findingCount: state.last.findings.length };
        },
        timeoutMs: 30000,
    };
    const secureHealth = {
        name: 'secure_health',
        description: 'dsh-code-security 自检：汇总扫描配置（文件数/体积上限、严重度门禁、状态目录）并确认工作目录可用。遇到问题时先运行本工具定位。',
        parameters: compileParameters({}),
        output: {
            schema: { type: 'object', additionalProperties: true },
            render: (_args, value) => {
                const rec = (value ?? {});
                const rawChecks = Array.isArray(rec.checks) ? rec.checks : [];
                const lines = ['dsh-code-security 自检' + (rec.ok === true ? '：正常。' : '：发现问题。')];
                for (const item of rawChecks) {
                    const c = (item ?? {});
                    lines.push('- ' + String(c.name) + '：' + (c.ok === true ? '✅ ' + String(c.detail ?? '') : '❌ ' + String(c.detail ?? '')));
                }
                return [{ type: 'text', text: lines.join('\n') }];
            },
        },
        async execute(rawArgs) {
            const checks = [];
            checks.push({ name: '扫描上限', ok: true, detail: 'maxFiles=' + cfg.maxFiles + '，maxFileBytes=' + cfg.maxFileBytes });
            checks.push({ name: '严重度门禁', ok: true, detail: 'failOn=' + cfg.failOn });
            checks.push({ name: '状态目录', ok: true, detail: cfg.stateDir });
            checks.push({ name: '工作目录', ok: cwd !== '', detail: cwd });
            const engines = await Promise.all(['osv', 'betterleaks', 'semgrep'].map(engine => probeEngine(engine, cfg, runner)));
            return { ok: true, plugin: 'dsh-code-security', checks, engines, configuredEngines: cfg.engines, database: await databaseHealth(cfg) };
        },
    };
    return [secureScan, secureDiff, secureFixVerify, secureReport, secureExport, ...buildExtraTools(cfg, cwd, signal, runner), policyShow, policySet, secureHealth];
}
function buildMarkdown(findings, target) {
    const lines = ['# 安全审查报告', '', '目标：' + target, '', '| 严重度 | 规则 | CWE | 文件:行 | 说明 |', '| :-- | :-- | :-- | :-- | :-- |'];
    for (const finding of findings) {
        lines.push('| ' + finding.severity + ' | ' + finding.ruleId + ' | ' + finding.cwe + ' | ' + finding.file + ':' + finding.line + ' | ' + finding.message + ' |');
    }
    return lines.join('\n') + '\n';
}
function buildSarif(findings, cwd) {
    const rules = new Map();
    const results = findings.map((finding, index) => {
        rules.set(finding.ruleId, { id: finding.ruleId, name: finding.title, shortDescription: { text: finding.title } });
        return {
            ruleId: finding.ruleId,
            level: finding.severity === 'critical' || finding.severity === 'high' ? 'error' : finding.severity === 'medium' ? 'warning' : 'note',
            message: { text: finding.message },
            locations: [{ physicalLocation: { artifactLocation: { uri: finding.file.replace(/\\/g, '/').split('/').map(encodeURIComponent).join('/'), uriBaseId: 'ROOTPATH' }, region: { startLine: finding.line } } }],
            partialFingerprints: { primaryLocationLineHash: finding.id + ':' + String(index) },
        };
    });
    return JSON.stringify({
        version: '2.1.0',
        $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
        runs: [{
                tool: { driver: { name: 'dsh-code-security', version: PACKAGE_VERSION, informationUri: 'https://github.com/STARDUSTLC666/dsh-code-security', rules: [...rules.values()] } },
                originalUriBaseIds: { ROOTPATH: { uri: pathToFileURL(path.resolve(cwd) + path.sep).href } },
                results,
            }],
    }, null, 2);
}
