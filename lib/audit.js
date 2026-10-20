import fs from 'node:fs/promises';
import path from 'node:path';
import { policyIgnores } from './policy.js';
import { GIT_SAFE_CONFIG_ARGS, parseDiff, runGitDiff, scanDiff } from './diff.js';
import { isExcludedPath, scanPath } from './scanner.js';
import { mergeFindings, scanExternal } from './engines.js';
export function sourceEngines(value, defaults) {
    if (value === undefined)
        return [...defaults];
    if (!Array.isArray(value) || !value.length || value.length > 3 || value.some(e => !['builtin', 'betterleaks', 'semgrep'].includes(e)) || new Set(value).size !== value.length)
        throw new Error('engines 必须从 builtin、betterleaks、semgrep 中选择，不能重复或为空。');
    return value;
}
export async function runSourceCheck(scope, cfg, cwd, runner, engines, policy, signal) {
    const documents = [];
    let documentBytes = 0, truncated = false;
    const collect = (doc) => { const size = Buffer.byteLength(doc.text); if (documentBytes + size > 64 * 1024 * 1024) {
        truncated = true;
        return;
    } ; documentBytes += size; documents.push(doc); };
    let result;
    if (scope.kind === 'scan')
        result = await scanPath({ cwd, target: scope.target, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy, signal, ...(engines.some(e => e !== 'builtin') ? { onDocument: collect } : {}) });
    else {
        const diff = await runGitDiff(runner, cwd, scope.base, scope.target, 30000, scope.staged);
        const scanned = scanDiff(diff, cwd, policy);
        result = { root: scope.base, ...scanned, durationMs: 0, complete: true, warnings: [] };
        if (engines.some(e => e !== 'builtin')) {
            for (const file of parseDiff(diff, cwd)) {
                signal?.throwIfAborted();
                if (isExcludedPath(file.file, policy) || !file.added.length)
                    continue;
                if (documents.length >= cfg.maxFiles) {
                    truncated = true;
                    break;
                }
                const absolute = path.resolve(cwd, file.file), rel = path.relative(cwd, absolute);
                if (rel.startsWith('..') || path.isAbsolute(rel))
                    throw new Error('增量文件超出当前工作区');
                let text;
                if (scope.staged) {
                    const shown = await runner.run(['git', ...GIT_SAFE_CONFIG_ARGS, 'show', ':./' + file.file], { cwd, timeoutMs: 30000, signal });
                    if (shown.exitCode !== 0)
                        throw new Error('无法读取暂存区文件，请刷新后重试');
                    text = shown.stdout;
                }
                else {
                    const stat = await fs.lstat(absolute);
                    if (!stat.isFile() || stat.isSymbolicLink() || await fs.realpath(absolute) !== absolute)
                        throw new Error('增量文件不是工作区内的普通文件');
                    if (stat.size > cfg.maxFileBytes) {
                        truncated = true;
                        continue;
                    }
                    text = await fs.readFile(absolute, { encoding: 'utf8', signal });
                }
                if (Buffer.byteLength(text) > cfg.maxFileBytes) {
                    truncated = true;
                    continue;
                }
                const lines = text.split(/\r?\n/);
                if (file.added.some(line => lines[line.line - 1] !== line.text))
                    throw new Error('扫描期间文件已变化，请重新扫描；已有记录未覆盖');
                collect({ file: file.file, text, selectedLines: new Set(file.added.map(line => line.line)) });
            }
            if (await runGitDiff(runner, cwd, scope.base, scope.target, 30000, scope.staged) !== diff)
                throw new Error('扫描期间 Git 改动已变化，请重试');
        }
        if (scope.includeUntracked && !scope.staged) {
            const untracked = await runner.run(['git', ...GIT_SAFE_CONFIG_ARGS, 'ls-files', '--others', '--exclude-standard', '-z', '--', scope.target ?? '.'], { cwd, signal, timeoutMs: 30000 });
            if (untracked.exitCode !== 0)
                throw new Error('无法读取未跟踪文件列表');
            if (untracked.stdout && !untracked.stdout.endsWith('\0'))
                throw new Error('未跟踪文件列表不完整，已有记录未覆盖');
            const names = untracked.stdout.split('\0').filter(Boolean);
            for (const name of names) {
                signal?.throwIfAborted();
                if (result.filesScanned >= cfg.maxFiles) {
                    result.complete = false;
                    result.warnings.push('已达到文件数量上限');
                    break;
                }
                if (path.isAbsolute(name) || name.split(/[\\/]/).includes('..'))
                    throw new Error('未跟踪文件超出当前工作区');
                let added = 0;
                const extra = await scanPath({ cwd, target: name, maxFiles: 1, maxFileBytes: cfg.maxFileBytes, policy, signal, onDocument(doc) { added = doc.text.split(/\r?\n/).length; if (engines.some(e => e !== 'builtin'))
                        collect(doc); } });
                result.filesChanged++;
                result.filesScanned += extra.filesScanned;
                result.filesSkipped += extra.filesSkipped;
                result.addedLines += added;
                result.findings.push(...extra.findings);
                result.complete &&= extra.complete;
                result.warnings.push(...extra.warnings);
            }
        }
    }
    const coverage = engines.includes('builtin') ? [{ engine: 'builtin', status: result.complete ? 'completed' : 'partial', findingsCount: result.findings.length, ...(result.complete ? {} : { reason: 'incomplete-coverage' }) }] : [];
    let findings = engines.includes('builtin') ? result.findings : [];
    const external = await Promise.all(engines.filter((e) => e !== 'builtin').map(e => scanExternal(e, documents, cfg, runner, signal)));
    for (const checked of external) {
        findings.push(...checked.findings.filter(f => !policyIgnores(policy, f.ruleId, f.file)));
        coverage.push(truncated && checked.coverage.status === 'completed' ? { ...checked.coverage, status: 'partial', reason: 'snapshot-size-limit' } : checked.coverage);
    }
    if (engines.length > 1)
        findings = mergeFindings(findings);
    const { diff: _privateDiff, base: _base, ...publicResult } = result;
    return { ...publicResult, findings, engines, coverage, complete: result.complete && !truncated && coverage.every(c => c.status === 'completed' || c.status === 'not-run' && c.reason === 'no-eligible-files'), scope };
}
