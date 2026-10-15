/**
 * 扩展工具：secure_baseline（基线接受）与 secure_deps（SBOM-lite）。
 *
 * @module dsh-code-security/extra
 */
import path from 'node:path';
import { optionalString, requiredString } from './config.js';
import { scanDeps } from './deps.js';
import { findingFingerprint, loadState, saveBaseline } from './state.js';
import { scanArguments } from './tools.js';
import { auditDependencies } from './engines.js';
import { loadPolicy } from './policy.js';
import fs from 'node:fs/promises';
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
        properties[key] = node;
    }
    return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) };
}
export function buildExtraTools(cfg, cwd, signal, runner) {
    const stateDir = cfg.stateDir;
    const secureBaseline = {
        name: 'secure_baseline',
        description: '把最近一次扫描的全部问题标记为已接受基线。之后 secure_scan / secure_diff / secure_report 只按基线外的新增问题判定门禁。写操作需要审批。',
        parameters: compileParameters({
            reason: { type: 'string', required: true, description: '接受这些已知问题的原因（会写入状态，例如：历史遗留，计划在 v1.2 修复）。' },
        }),
        output: {
            schema: { type: 'object', properties: { file: { type: 'string' }, acceptedCount: { type: 'integer' }, baseline: { type: 'object', additionalProperties: true } }, additionalProperties: true },
            render: (_args, value) => {
                const rec = (value ?? {});
                return [{ type: 'text', text: '已接受基线：' + String(rec.acceptedCount ?? 0) + ' 个已知问题（' + String(rec.file ?? '') + '）。' }];
            },
        },
        async execute(rawArgs) {
            const args = (rawArgs ?? {});
            const reason = requiredString(args, 'reason', '接受原因');
            const state = await loadState(stateDir);
            if (state.last === null)
                throw new Error('尚无扫描结果，请先执行 secure_scan 或 secure_diff。');
            const baseline = {
                time: new Date().toISOString(),
                target: state.last.target,
                reason,
                findings: state.last.findings,
                fingerprints: state.last.findings.map(findingFingerprint),
                counts: state.last.counts,
            };
            const file = await saveBaseline(stateDir, baseline, signal);
            return { file, acceptedCount: baseline.findings.length, baseline };
        },
        timeoutMs: 10000,
    };
    const secureDeps = {
        name: 'secure_deps',
        description: '解析依赖清单与锁文件。默认仅离线清单；audit=offline 使用本地 OSV 数据库，audit=online 明确允许向 OSV 查询包名/版本等依赖信息。不执行包管理器或安装脚本。清单检查不等于已知漏洞审计。',
        parameters: compileParameters({
            target: { type: 'string', description: '扫描根目录（可选，默认当前工作区）。' },
            audit: { type: 'string', enum: ['none', 'offline', 'online'], description: '默认 none。offline 需要本地漏洞库；online 会向 OSV 查询依赖信息，不上传源码。' },
        }),
        output: {
            schema: {
                type: 'object',
                properties: {
                    root: { type: 'string' }, filesScanned: { type: 'integer' }, riskyCount: { type: 'integer' },
                    dependencies: { type: 'array', items: { type: 'object', additionalProperties: true } },
                    warnings: { type: 'array', items: { type: 'string' } },
                },
                additionalProperties: true,
            },
            render: (_args, value) => {
                const rec = (value ?? {});
                const deps = Array.isArray(rec.dependencies) ? rec.dependencies : [];
                const lines = ['依赖清单扫描：' + deps.length + ' 个依赖，风险项 ' + String(rec.riskyCount ?? 0) + ' 个。'];
                for (const dep of deps) {
                    const row = (dep ?? {});
                    if (row.risk !== 'exact' && row.risk !== 'range')
                        lines.push('- ' + String(row.name ?? '') + ' [' + String(row.risk ?? '') + '] ' + String(row.file ?? ''));
                }
                return [{ type: 'text', text: lines.join('\n') }];
            },
        },
        async execute(rawArgs) {
            const args = scanArguments(rawArgs, ['target', 'audit']);
            const mode = args.audit ?? 'none';
            if (!['none', 'offline', 'online'].includes(String(mode)))
                throw new Error('audit 只支持 none、offline、online');
            const target = optionalString(args, 'target');
            const root = path.resolve(cwd, target ?? '.');
            const documents = [];
            let bytes = 0, truncated = false;
            const rootDir = (await fs.lstat(root)).isDirectory() ? root : path.dirname(root);
            const inventory = await scanDeps(root, { maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, signal, policy: await loadPolicy(cwd),
                ...(mode === 'none' ? {} : { onDocument(doc) { if (bytes + Buffer.byteLength(doc.text) > 64 * 1024 * 1024) {
                        truncated = true;
                        return;
                    } ; bytes += Buffer.byteLength(doc.text); documents.push({ file: path.relative(cwd, path.join(rootDir, doc.file)).split(path.sep).join('/'), text: doc.text }); } }) });
            if (mode === 'none')
                return { ...inventory, audited: false, audit: null };
            if (!runner)
                throw new Error('OSV 审计需要宿主 subprocess 服务');
            const audit = await auditDependencies(documents, mode, cfg, runner, signal);
            if (truncated && audit.coverage.status === 'completed')
                audit.coverage = { ...audit.coverage, status: 'partial', reason: 'snapshot-size-limit' };
            return { ...inventory, audited: audit.coverage.status === 'completed', audit, passed: inventory.complete && audit.coverage.status === 'completed' && audit.vulnerabilities.length === 0 };
        },
        timeoutMs: 30000,
    };
    return [secureBaseline, secureDeps];
}
