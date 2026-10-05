/**
 * 项目策略文件 .code-security.json：排除目录、忽略规则与门禁阈值。
 *
 * @module dsh-code-security/policy
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
export const DEFAULT_POLICY = Object.freeze({
    version: 1,
    exclude: [],
    ignore: [],
});
export const POLICY_FILE = '.code-security.json';
export function policyPath(cwd) {
    return path.join(cwd, POLICY_FILE);
}
export async function loadPolicy(cwd) {
    try {
        const text = await fs.readFile(policyPath(cwd), 'utf8');
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
    const exclude = Array.isArray(obj.exclude) ? obj.exclude.filter((x) => typeof x === 'string') : [];
    const ignoreRaw = Array.isArray(obj.ignore) ? obj.ignore : [];
    const ignore = [];
    for (const item of ignoreRaw) {
        if (typeof item !== 'object' || item === null)
            continue;
        const rec = item;
        if (!(typeof rec.ruleId === 'string' && rec.ruleId.trim() !== '') && !(typeof rec.file === 'string' && rec.file.trim() !== ''))
            throw new Error('每条忽略规则必须指定 ruleId 或 file，空规则不能禁用全部检查。');
        ignore.push({
            ruleId: typeof rec.ruleId === 'string' && rec.ruleId !== '' ? rec.ruleId : undefined,
            file: typeof rec.file === 'string' && rec.file !== '' ? rec.file : undefined,
            reason: typeof rec.reason === 'string' ? rec.reason : '',
        });
    }
    const failOn = obj.failOn === 'critical' || obj.failOn === 'high' || obj.failOn === 'medium' || obj.failOn === 'low' ? obj.failOn : undefined;
    return { version: 1, exclude, ignore, failOn };
}
export async function savePolicy(cwd, policy, signal) {
    signal?.throwIfAborted();
    const file = policyPath(cwd);
    const tmp = file + '.tmp-' + randomUUID();
    try {
        await fs.writeFile(tmp, JSON.stringify(policy, null, 2) + '\n', { flag: 'wx', mode: 0o600, signal });
        signal?.throwIfAborted();
        await fs.rename(tmp, file);
    }
    finally {
        await fs.unlink(tmp).catch(() => { });
    }
    return file;
}
function globToRegex(glob) {
    const escaped = glob.replace(/[.+^$()|{}]/g, '\\$&').replace(/\*\*/g, '§§').replace(/\*/g, '[^/]*').replace(/§§/g, '.*');
    return new RegExp('(^|/)' + escaped + '($|/)');
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
