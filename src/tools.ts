/**
 * 六个面向模型的安全审查工具：
 * secure_scan / secure_diff / secure_fix_verify / secure_report / secure_policy_show / secure_policy_set。
 *
 * @module dsh-secure-review/tools
 */

import path from 'node:path'
import { optionalString, requiredString, type ResolvedSecureConfig, type Severity } from './config.js'
import { runGitDiff, scanDiff } from './diff.js'
import { loadPolicy, normalizePolicy, POLICY_FILE, savePolicy, type SecurePolicy } from './policy.js'
import type { ProcessRunner } from './runner.js'
import { scanPath, type Finding } from './scanner.js'
import { compareFingerprints, countFindings, findingFingerprint, loadState, saveState } from './state.js'

export interface ContentBlock {
  type: 'text'
  text: string
}

export interface SecureToolDefinition {
  name: string
  description: string
  parameters: { type: 'object'; properties: Record<string, unknown>; required?: string[] }
  output: { schema: Record<string, unknown>; render(args: unknown, value: unknown): ContentBlock[] }
  execute(args: unknown, exec: unknown): Promise<unknown>
  gate?(exec: unknown, next: () => Promise<unknown>): Promise<unknown>
  timeoutMs?: number
}

const SEVERITY_ORDER: Record<Severity, number> = { critical: 4, high: 3, medium: 2, low: 1 }

function compileParameters(spec: Record<string, any>): { type: 'object'; properties: Record<string, unknown>; required?: string[] } {
  const properties: Record<string, unknown> = {}
  const required: string[] = []
  for (const [key, prop] of Object.entries(spec)) {
    if (prop?.required === true) required.push(key)
    const node: Record<string, unknown> = {}
    if (typeof prop?.type === 'string') node.type = prop.type
    if (typeof prop?.description === 'string') node.description = prop.description
    if (prop?.enum !== undefined) node.enum = prop.enum
    properties[key] = node
  }
  return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) }
}

const findingSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' }, ruleId: { type: 'string' }, title: { type: 'string' }, cwe: { type: 'string' },
    severity: { type: 'string' }, confidence: { type: 'string' }, file: { type: 'string' }, line: { type: 'integer' },
    snippet: { type: 'string' }, message: { type: 'string' },
  },
  additionalProperties: true,
}

const countsSchema = {
  type: 'object',
  properties: { critical: { type: 'integer' }, high: { type: 'integer' }, medium: { type: 'integer' }, low: { type: 'integer' } },
  additionalProperties: true,
}

const scanSchema = {
  type: 'object',
  properties: {
    root: { type: 'string' }, filesScanned: { type: 'integer' }, filesSkipped: { type: 'integer' },
    findings: { type: 'array', items: findingSchema }, counts: countsSchema, passed: { type: 'boolean' },
    failOn: { type: 'string' }, durationMs: { type: 'integer' },
  },
  additionalProperties: true,
}

function verdictOf(findings: Finding[], failOn: Severity): boolean {
  const threshold = SEVERITY_ORDER[failOn]
  return !findings.some((finding) => SEVERITY_ORDER[finding.severity] >= threshold)
}

function renderFindings(value: unknown): ContentBlock[] {
  const rec = (value ?? {}) as Record<string, unknown>
  const findings = Array.isArray(rec.findings) ? rec.findings as Finding[] : []
  const counts = rec.counts as Record<string, unknown> | undefined
  const lines = [
    '安全审查：' + (rec.passed === true ? '通过' : '未通过'),
    '文件 ' + String(rec.filesScanned ?? 0) + ' 个，发现 ' + findings.length + ' 个问题（critical ' + String(counts?.critical ?? 0) + ' / high ' + String(counts?.high ?? 0) + ' / medium ' + String(counts?.medium ?? 0) + ' / low ' + String(counts?.low ?? 0) + '）。',
  ]
  for (const finding of findings) {
    lines.push('- ' + finding.file + ':' + finding.line + ' [' + finding.severity + '] ' + finding.ruleId + ' ' + finding.title)
  }
  return [{ type: 'text', text: lines.join('\n') }]
}

export function buildSecureTools(cfg: ResolvedSecureConfig, cwd: string, runner: ProcessRunner): SecureToolDefinition[] {
  const stateDir = cfg.stateDir

  const secureScan: SecureToolDefinition = {
    name: 'secure_scan',
    description: '扫描工作区（或指定文件/目录），用确定性规则检测注入、弱加密、硬编码密钥、危险配置等问题。结果写入 .secure-review 状态供 secure_fix_verify 对比。',
    parameters: compileParameters({
      target: { type: 'string', description: '要扫描的文件或目录（可选，缺省扫描整个工作区）。' },
    }),
    output: { schema: scanSchema, render: renderFindings },
    async execute(rawArgs: unknown) {
      const args = (rawArgs ?? {}) as Record<string, unknown>
      const target = optionalString(args, 'target')
      const policy = await loadPolicy(cwd)
      const failOn = policy.failOn ?? cfg.failOn
      const result = await scanPath({ cwd, target, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy })
      const counts = countFindings(result.findings)
      const entry = {
        mode: target === undefined ? 'scan' : 'scan:' + target,
        target: target ?? '.',
        time: new Date().toISOString(),
        filesScanned: result.filesScanned,
        findings: result.findings,
        fingerprints: result.findings.map(findingFingerprint),
        counts,
      }
      const stateFile = await saveState(stateDir, entry)
      return { ...result, counts, passed: verdictOf(result.findings, failOn), failOn, stateFile }
    },
    timeoutMs: 120000,
  }

  const secureDiff: SecureToolDefinition = {
    name: 'secure_diff',
    description: '只审查 git diff 的新增行（默认 HEAD，即未提交改动）。base 可用任意 git ref；target 可限定文件。结果同样写入状态。',
    parameters: compileParameters({
      base: { type: 'string', description: 'git 基线（默认 HEAD）。' },
      target: { type: 'string', description: '限定文件路径（可选）。' },
    }),
    output: { schema: scanSchema, render: renderFindings },
    async execute(rawArgs: unknown) {
      const args = (rawArgs ?? {}) as Record<string, unknown>
      const base = optionalString(args, 'base') ?? 'HEAD'
      const target = optionalString(args, 'target')
      const policy = await loadPolicy(cwd)
      const failOn = policy.failOn ?? cfg.failOn
      const diff = await runGitDiff(runner, cwd, base, target)
      const result = scanDiff(diff, cwd, policy)
      const counts = countFindings(result.findings)
      const entry = {
        mode: 'diff:' + base,
        target: target ?? '.',
        time: new Date().toISOString(),
        filesScanned: result.filesChanged,
        findings: result.findings,
        fingerprints: result.findings.map(findingFingerprint),
        counts,
      }
      await saveState(stateDir, entry)
      return { root: base, filesScanned: result.filesChanged, filesSkipped: 0, addedLines: result.addedLines, findings: result.findings, counts, passed: verdictOf(result.findings, failOn), failOn, durationMs: 0 }
    },
    timeoutMs: 60000,
  }

  const secureFixVerify: SecureToolDefinition = {
    name: 'secure_fix_verify',
    description: '复扫并与上次扫描基线对比，输出已关闭、仍存在、新引入的问题指纹。用于修复后确认没有按下葫芦浮起瓢。',
    parameters: compileParameters({
      target: { type: 'string', description: '复扫文件或目录（可选，缺省扫描整个工作区）。' },
    }),
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
        const rec = (value ?? {}) as Record<string, unknown>
        return [{ type: 'text', text: '修复验证：关闭 ' + String(rec.closedCount ?? 0) + '，仍存在 ' + String(rec.remainingCount ?? 0) + '，新增 ' + String(rec.freshCount ?? 0) + '。' }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = (rawArgs ?? {}) as Record<string, unknown>
      const target = optionalString(args, 'target')
      const policy = await loadPolicy(cwd)
      const state = await loadState(stateDir)
      const result = await scanPath({ cwd, target, maxFiles: cfg.maxFiles, maxFileBytes: cfg.maxFileBytes, policy })
      if (state.last === null) {
        return { baselineMissing: true, baselineTime: '', closedCount: 0, remainingCount: 0, freshCount: result.findings.length, closed: [], remaining: [], fresh: result.findings, passed: false }
      }
      const current = result.findings.map(findingFingerprint)
      const cmp = compareFingerprints(state.last.fingerprints, current)
      const byFingerprint = new Map(result.findings.map((finding) => [findingFingerprint(finding), finding]))
      const closed = cmp.closed.map((fp) => state.last!.findings.find((finding) => findingFingerprint(finding) === fp)).filter((x): x is Finding => x !== undefined)
      const remaining = cmp.remaining.map((fp) => byFingerprint.get(fp)).filter((x): x is Finding => x !== undefined)
      const fresh = cmp.fresh.map((fp) => byFingerprint.get(fp)).filter((x): x is Finding => x !== undefined)
      return {
        baselineMissing: false,
        baselineTime: state.last.time,
        closedCount: closed.length,
        remainingCount: remaining.length,
        freshCount: fresh.length,
        closed, remaining, fresh,
        passed: fresh.length === 0 && remaining.length === 0,
      }
    },
    timeoutMs: 120000,
  }

  const secureReport: SecureToolDefinition = {
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
        const rec = (value ?? {}) as Record<string, unknown>
        return [{ type: 'text', text: '安全报告：' + (rec.hasScan === true ? '最近扫描包含 ' + String((rec.counts as Record<string, unknown> | null)?.critical ?? 0) + ' 个 critical。' : '尚无扫描记录，请先 secure_scan。') }]
      },
    },
    async execute() {
      const state = await loadState(stateDir)
      const policy = await loadPolicy(cwd)
      if (state.last === null) {
        return { hasScan: false, stateFile: '', policy, counts: { critical: 0, high: 0, medium: 0, low: 0 }, byRule: [], byFile: [], passed: false, historyCount: state.history.length }
      }
      const last = state.last
      const byRule = new Map<string, number>()
      const byFile = new Map<string, number>()
      for (const finding of last.findings) {
        byRule.set(finding.ruleId, (byRule.get(finding.ruleId) ?? 0) + 1)
        byFile.set(finding.file, (byFile.get(finding.file) ?? 0) + 1)
      }
      const failOn = policy.failOn ?? cfg.failOn
      return {
        hasScan: true,
        stateFile: stateDir,
        policy,
        counts: last.counts,
        byRule: [...byRule.entries()].sort((a, b) => b[1] - a[1]).map(([rule, count]) => ({ rule, count })),
        byFile: [...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 50).map(([file, count]) => ({ file, count })),
        passed: verdictOf(last.findings, failOn),
        historyCount: state.history.length,
      }
    },
    timeoutMs: 10000,
  }

  const policyShow: SecureToolDefinition = {
    name: 'secure_policy_show',
    description: '查看当前项目的 .secure-review.json 策略：排除目录、忽略规则与门禁阈值。',
    parameters: compileParameters({}),
    output: {
      schema: { type: 'object', properties: { file: { type: 'string' }, policy: { type: 'object', additionalProperties: true } }, additionalProperties: true },
      render: (_args, value) => {
        const rec = (value ?? {}) as Record<string, unknown>
        return [{ type: 'text', text: '策略文件：' + String(rec.file ?? '') }]
      },
    },
    async execute() {
      const policy = await loadPolicy(cwd)
      return { file: path.join(cwd, POLICY_FILE), policy }
    },
    timeoutMs: 10000,
  }

  const policySet: SecureToolDefinition = {
    name: 'secure_policy_set',
    description: '写入新的 .secure-review.json 策略（JSON 文本）。会整体替换当前策略，写操作默认需要审批。',
    parameters: compileParameters({
      policy: { type: 'string', required: true, description: '完整策略 JSON 文本（必填）。' },
    }),
    output: {
      schema: { type: 'object', properties: { file: { type: 'string' }, policy: { type: 'object', additionalProperties: true } }, additionalProperties: true },
      render: (_args, value) => {
        const rec = (value ?? {}) as Record<string, unknown>
        return [{ type: 'text', text: '策略已写入：' + String(rec.file ?? '') }]
      },
    },
    async execute(rawArgs: unknown) {
      const args = (rawArgs ?? {}) as Record<string, unknown>
      const text = requiredString(args, 'policy', '策略 JSON')
      let parsed: unknown
      try {
        parsed = JSON.parse(text)
      } catch {
        throw new Error('policy 参数不是合法 JSON。')
      }
      const policy = normalizePolicy((parsed ?? {}) as Record<string, unknown>)
      const file = await savePolicy(cwd, policy)
      return { file, policy }
    },
    timeoutMs: 10000,
  }

  policySet.gate = async (exec: unknown, next: () => Promise<unknown>) => {
    const record = (typeof exec === 'object' && exec !== null ? exec : {}) as Record<string, unknown>
    const approval = record.approval as { request(options: { reason: string }): Promise<string> } | undefined
    if (approval === undefined) return { kind: 'deny', reason: 'secure_policy_set 需要确认，但当前环境没有审批通道。如确需直接写入，请在受控终端手动编辑 .secure-review.json。' }
    const outcome = await approval.request({ reason: '覆盖写入项目 .secure-review.json 安全策略' })
    if (outcome === 'allowed-once') return next()
    if (outcome === 'cancelled') return { kind: 'deny', reason: '策略写入被取消，未执行。' }
    return { kind: 'deny', reason: '策略写入未获批准。' }
  }

  return [secureScan, secureDiff, secureFixVerify, secureReport, policyShow, policySet]
}
