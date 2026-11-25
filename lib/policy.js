/**
 * 项目策略文件 .code-security.json：排除目录、忽略规则与门禁阈值。
 *
 * @module dsh-code-security/policy
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { boundedFile, workspaceTarget } from './workspace.js';
export const DEFAULT_POLICY = Object.freeze({
    version: 1,
    exclude: [],
    ignore: [],
});
export const POLICY_FILE = '.code-security.json';
const MAX_POLICY_FILE_BYTES = 256 * 1024;
const MAX_POLICY_EXCLUDES = 256;
const MAX_POLICY_IGNORES = 512;
const MAX_POLICY_PATTERN_LENGTH = 1024;
const MAX_POLICY_PATTERN_TOTAL_LENGTH = 32 * 1024;
export function policyPath(cwd) {
    return path.join(cwd, POLICY_FILE);
}
export async function loadPolicy(cwd) {
    try {
        const file = await workspaceTarget(cwd, POLICY_FILE);
        const stat = await fs.lstat(file);
        if (!stat.isFile() || stat.isSymbolicLink())
            throw new Error('安全策略必须是工作区内的普通文件 / Security policy must be a regular file inside the workspace');
        const workspaceRoot = await fs.realpath(cwd);
        const text = (await boundedFile(file, MAX_POLICY_FILE_BYTES, undefined, stat, workspaceRoot)).toString('utf8');
        const parsed = JSON.parse(text);
        const obj = (parsed ?? {});
        return normalizePolicy(obj);
    }
    catch (error) {
        if (error.code !== 'ENOENT')
            throw new Error('安全策略无法读取或格式无效，原文件已保留：' + (error instanceof Error ? error.message : String(error)));
        return { ...DEFAULT_POLICY, exclude: [...DEFAULT_POLICY.exclude], ignore: [] };
    }
}
export function normalizePolicy(obj) {
    const excludeRaw = Array.isArray(obj.exclude) ? obj.exclude : [];
    const ignoreRaw = Array.isArray(obj.ignore) ? obj.ignore : [];
    if (excludeRaw.length > MAX_POLICY_EXCLUDES)
        throw new Error('安全策略排除项超过数量上限。');
    if (ignoreRaw.length > MAX_POLICY_IGNORES)
        throw new Error('安全策略忽略项超过数量上限。');
    let patternLength = 0;
    const checkedPattern = (value, label) => {
        if (typeof value !== 'string')
            throw new Error(label + '必须是字符串。');
        if (value.length > MAX_POLICY_PATTERN_LENGTH)
            throw new Error(label + '超过长度上限。');
        patternLength += value.length;
        if (patternLength > MAX_POLICY_PATTERN_TOTAL_LENGTH)
            throw new Error('安全策略 glob 总长度超过上限。');
        globToRegex(value);
        return value;
    };
    const exclude = excludeRaw.map(value => checkedPattern(value, '安全策略排除项'));
    const ignore = [];
    for (const item of ignoreRaw) {
        if (typeof item !== 'object' || item === null)
            continue;
        const rec = item;
        if (!(typeof rec.ruleId === 'string' && rec.ruleId.trim() !== '') && !(typeof rec.file === 'string' && rec.file.trim() !== ''))
            throw new Error('每条忽略规则必须指定 ruleId 或 file，空规则不能禁用全部检查。');
        ignore.push({
            ruleId: typeof rec.ruleId === 'string' && rec.ruleId !== '' ? rec.ruleId : undefined,
            file: typeof rec.file === 'string' && rec.file !== '' ? checkedPattern(rec.file, '安全策略文件模式') : undefined,
            reason: typeof rec.reason === 'string' ? rec.reason : '',
        });
    }
    const failOn = obj.failOn === 'critical' || obj.failOn === 'high' || obj.failOn === 'medium' || obj.failOn === 'low' ? obj.failOn : undefined;
    return { version: 1, exclude, ignore, failOn };
}
export async function savePolicy(cwd, policy, signal) {
    signal?.throwIfAborted();
    const contents = JSON.stringify(policy, null, 2) + '\n';
    if (Buffer.byteLength(contents) > MAX_POLICY_FILE_BYTES)
        throw new Error('安全策略超过 256 KiB 大小上限，原文件已保留。');
    const file = policyPath(cwd);
    const tmp = file + '.tmp-' + randomUUID();
    try {
        await fs.writeFile(tmp, contents, { flag: 'wx', mode: 0o600, signal });
        signal?.throwIfAborted();
        await fs.rename(tmp, file);
    }
    finally {
        await fs.unlink(tmp).catch(() => { });
    }
    return file;
}
const GLOB_CACHE_LIMIT = 256;
const GLOB_CACHE_MAX_LENGTH = 4096;
const globCache = new Map();
function globToRegex(glob) {
    if (glob.length > MAX_POLICY_PATTERN_LENGTH)
        throw new Error('安全策略 glob 模式超过长度上限。');
    const cached = globCache.get(glob);
    if (cached) {
        globCache.delete(glob);
        globCache.set(glob, cached);
        return cached;
    }
    let source = '';
    for (let index = 0; index < glob.length; index++) {
        if (glob[index] !== '*') {
            source += /[.*+?^${}()|[\]\\]/.test(glob[index]) ? '\\' + glob[index] : glob[index];
            continue;
        }
        if (glob[index + 1] === '*') {
            source += '.*';
            index++;
        }
        else
            source += '[^/]*';
    }
    const regex = new RegExp('(^|/)' + source + '($|/)');
    if (glob.length <= GLOB_CACHE_MAX_LENGTH) {
        if (globCache.size >= GLOB_CACHE_LIMIT)
            globCache.delete(globCache.keys().next().value);
        globCache.set(glob, regex);
    }
    return regex;
}
export function policyExcludesDir(policy, rel) {
    return policy.exclude.some((pattern) => globToRegex(pattern).test(rel));
}
export function policyIgnores(policy, ruleId, file) {
    return policy.ignore.some((item) => {
        if (item.ruleId !== undefined && item.ruleId !== ruleId)
            return false;
        if (item.file !== undefined && !globToRegex(item.file).test(file))
            return false;
        return true;
    });
}
