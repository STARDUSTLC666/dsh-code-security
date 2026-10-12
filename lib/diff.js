/**
 * git diff 增量扫描：只解析 unified diff 的新增行并映射到新文件行号。
 *
 * @module dsh-code-security/diff
 */
import path from 'node:path';
import { createHash } from 'node:crypto';
import { isExcludedPath, scanLineSet } from './scanner.js';
/** 运行 git diff（默认 HEAD，工作区未提交改动）。 */
export async function runGitDiff(runner, cwd, base, target, timeoutMs = 30000, staged = false) {
    if (typeof base !== 'string' || base.trim() === '' || base.trim().startsWith('-') || base.includes('\0')) {
        throw new Error('参数 base 必须是非空的 Git ref，不能是 Git 命令选项。');
    }
    const argv = ['git', 'diff'];
    if (staged)
        argv.push('--cached');
    argv.push('--no-ext-diff', '--no-textconv', '--no-color', '--relative', '--src-prefix=a/', '--dst-prefix=b/', '--unified=3', '--output-indicator-new=+', '--output-indicator-old=-', '--output-indicator-context= ', base.trim(), '--');
    if (target !== undefined && target.trim() !== '')
        argv.push(target.trim());
    const result = await runner.run(argv, { timeoutMs, cwd });
    if (result.exitCode !== 0 && result.exitCode !== 1) {
        throw new Error('git diff 失败（退出码 ' + String(result.exitCode) + '）：' + result.stderr.trim().split(/\r?\n/).slice(-4).join(' | '));
    }
    if (result.stdout.trim() === '')
        return '';
    return result.stdout;
}
function invalidDiff() {
    return new Error('git diff 不完整或格式无效，无法确认已审查全部新增行。');
}
/** Git quotes unusual path bytes using C escapes, including octal UTF-8. */
function decodeGitPath(value) {
    if (!value.startsWith('"'))
        return value.replace(/\t.*$/, '');
    const chunks = [];
    const escapes = { a: 7, b: 8, f: 12, n: 10, r: 13, t: 9, v: 11, '\\': 92, '"': 34 };
    let literal = '';
    for (let index = 1; index < value.length; index++) {
        const char = value[index];
        if (char === '"') {
            if (!/^(?:\t.*)?$/.test(value.slice(index + 1)))
                throw invalidDiff();
            chunks.push(Buffer.from(literal));
            try {
                return new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks));
            }
            catch {
                throw invalidDiff();
            }
        }
        if (char !== '\\') {
            literal += char;
            continue;
        }
        chunks.push(Buffer.from(literal));
        literal = '';
        const octal = /^[0-7]{1,3}/.exec(value.slice(index + 1));
        if (octal !== null) {
            const byte = Number.parseInt(octal[0], 8);
            if (byte > 255)
                throw invalidDiff();
            chunks.push(Buffer.from([byte]));
            index += octal[0].length;
        }
        else {
            const byte = escapes[value[++index]];
            if (byte === undefined)
                throw invalidDiff();
            chunks.push(Buffer.from([byte]));
        }
    }
    throw invalidDiff();
}
/** 解析 unified diff，返回每个文件的新增行与新行号。 */
export function parseDiff(diff, cwd) {
    const files = [];
    let current = null;
    let newLine = 0;
    let oldRemaining = 0;
    let newRemaining = 0;
    let hasFileHeader = false;
    for (const raw of diff.split(/\r?\n/)) {
        // Interpret hunk bodies before headers: source text may itself start "+++".
        if (oldRemaining > 0 || newRemaining > 0) {
            if (raw.startsWith('\\'))
                continue;
            if (raw.startsWith('+') && newRemaining > 0) {
                current?.added.push({ line: newLine, text: raw.slice(1) });
                newRemaining--;
                newLine++;
            }
            else if (raw.startsWith('-') && oldRemaining > 0) {
                oldRemaining--;
            }
            else if (raw.startsWith(' ') && oldRemaining > 0 && newRemaining > 0) {
                if (current !== null)
                    (current.context ??= []).push({ line: newLine, text: raw.slice(1) });
                oldRemaining--;
                newRemaining--;
                newLine++;
            }
            else {
                throw invalidDiff();
            }
            continue;
        }
        if (raw.startsWith('diff --git ')) {
            current = null;
            hasFileHeader = false;
            continue;
        }
        if (raw.startsWith('+++ ')) {
            const file = decodeGitPath(raw.slice(4));
            if (file !== '/dev/null' && (!file.startsWith('b/') || file.length <= 2))
                throw invalidDiff();
            current = file === '/dev/null' ? null : { file: file.slice(2), added: [] };
            if (current !== null)
                files.push(current);
            hasFileHeader = true;
            newLine = 0;
            continue;
        }
        const hunk = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/.exec(raw);
        if (hunk !== null) {
            if (!hasFileHeader)
                throw invalidDiff();
            oldRemaining = Number(hunk[2] ?? 1);
            newRemaining = Number(hunk[4] ?? 1);
            newLine = Number(hunk[3]);
            if (![oldRemaining, newRemaining, newLine].every(Number.isSafeInteger) || newRemaining > 0 && newLine < 1)
                throw invalidDiff();
            continue;
        }
        if (raw.startsWith('@@') || raw.startsWith('+') || raw.startsWith('-') && !raw.startsWith('--- '))
            throw invalidDiff();
    }
    if (oldRemaining > 0 || newRemaining > 0)
        throw invalidDiff();
    return files;
}
function makeDiffId(ruleId, file, line, snippet) {
    const hash = createHash('sha256').update('diff|' + ruleId + '|' + file + '|' + line + '|' + snippet.slice(0, 80)).digest('hex').slice(0, 10);
    return 'SRD-' + hash;
}
/** 对 diff 新增行执行规则扫描。 */
export function scanDiff(diff, cwd, policy) {
    const parsed = parseDiff(diff, cwd);
    const findings = [];
    let addedLines = 0;
    let filesSkipped = 0;
    for (const file of parsed) {
        const rel = path.isAbsolute(file.file) ? path.relative(cwd, file.file) : file.file;
        if (isExcludedPath(rel, policy)) {
            filesSkipped++;
            continue;
        }
        addedLines += file.added.length;
        const entries = [...(file.context ?? []), ...file.added].sort((a, b) => a.line - b.line);
        findings.push(...scanLineSet(entries, rel, policy, new Set(file.added.map(line => line.line))).map((finding) => ({ ...finding, id: makeDiffId(finding.ruleId, rel, finding.line, finding.snippet) })));
    }
    findings.sort((a, b) => severityOrder(b.severity) - severityOrder(a.severity) || a.file.localeCompare(b.file) || a.line - b.line);
    return { base: 'HEAD', filesChanged: parsed.length, filesScanned: parsed.length - filesSkipped, filesSkipped, addedLines, findings, diff };
}
function severityOrder(severity) {
    return severity === 'critical' ? 4 : severity === 'high' ? 3 : severity === 'medium' ? 2 : 1;
}
