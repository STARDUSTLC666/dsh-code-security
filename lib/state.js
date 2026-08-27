/**
 * 扫描状态持久化：供 secure_fix_verify 对比基线，secure_report 汇总历史，
 * 以及 secure_baseline 持久化已接受的基线问题。
 *
 * @module dsh-code-security/state
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const STATE_FILE = 'state.json';
const HISTORY_LIMIT = 50;
export function findingFingerprint(finding) {
    const raw = finding.ruleId + '|' + finding.file + '|' + finding.snippet.trim();
    return createHash('sha256').update(raw).digest('hex');
}
export function statePath(stateDir) {
    return path.join(stateDir, STATE_FILE);
}
export async function loadState(stateDir) {
    try {
        const text = await fs.readFile(statePath(stateDir), 'utf8');
        const parsed = JSON.parse(text);
        const obj = (parsed ?? {});
        const last = isEntry(obj.last) ? obj.last : null;
        const history = Array.isArray(obj.history) ? obj.history.filter(isEntry) : [];
        const baseline = isBaseline(obj.baseline) ? obj.baseline : null;
        return { last, history, baseline };
    }
    catch {
        return { last: null, history: [], baseline: null };
    }
}
function isEntry(value) {
    return typeof value === 'object' && value !== null && Array.isArray(value.findings);
}
function isBaseline(value) {
    return typeof value === 'object' && value !== null && Array.isArray(value.findings) && Array.isArray(value.fingerprints);
}
export async function saveState(stateDir, entry) {
    await fs.mkdir(stateDir, { recursive: true });
    const state = await loadState(stateDir);
    state.last = entry;
    state.history.unshift(entry);
    state.history = state.history.slice(0, HISTORY_LIMIT);
    return writeState(stateDir, state);
}
export async function saveBaseline(stateDir, baseline) {
    await fs.mkdir(stateDir, { recursive: true });
    const state = await loadState(stateDir);
    state.baseline = baseline;
    return writeState(stateDir, state);
}
async function writeState(stateDir, state) {
    const file = statePath(stateDir);
    const tmp = file + '.tmp-' + process.pid;
    await fs.writeFile(tmp, JSON.stringify(state, null, 2), 'utf8');
    await fs.rename(tmp, file);
    return file;
}
export function countFindings(findings) {
    const counts = { critical: 0, high: 0, medium: 0, low: 0 };
    for (const finding of findings)
        counts[finding.severity] += 1;
    return counts;
}
export function compareFingerprints(baseline, current) {
    const oldSet = new Set(baseline);
    const newSet = new Set(current);
    return {
        closed: baseline.filter((x) => !newSet.has(x)),
        remaining: baseline.filter((x) => newSet.has(x)),
        fresh: current.filter((x) => !oldSet.has(x)),
    };
}
/** 根据已接受基线把发现分为新增与已接受。 */
export function splitByBaseline(findings, baseline) {
    if (baseline === null)
        return { fresh: findings, accepted: [] };
    const acceptedSet = new Set(baseline.fingerprints);
    const fresh = [];
    const accepted = [];
    for (const finding of findings) {
        if (acceptedSet.has(findingFingerprint(finding)))
            accepted.push(finding);
        else
            fresh.push(finding);
    }
    return { fresh, accepted };
}
