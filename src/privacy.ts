/** Findings crossing the scanner boundary never contain complete credentials. */
import { createHash } from 'node:crypto'
import path from 'node:path'
import type { Finding } from './scanner.js'

export function evidenceFingerprint(finding: Pick<Finding, 'ruleId' | 'file' | 'snippet'> & { fingerprint?: string }): string {
  if (/^[a-f0-9]{64}$/.test(finding.fingerprint ?? '')) return finding.fingerprint!
  const file = finding.file.split(path.sep).join('/').replace(/^(?:\.\/)+/, '')
  return createHash('sha256').update(finding.ruleId + '|' + file + '|' + finding.snippet.trim()).digest('hex')
}

export function redactText(text: string): string {
  return text
    .replace(/-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----[\s\S]*?(?:-----END (?:[A-Z]+ )?PRIVATE KEY-----|$)/g, '[REDACTED PRIVATE KEY]')
    .replace(/((?:[\w.-]*(?:password|passwd|pwd|secret|token|api[_-]?key|access[_-]?key|authorization)[\w.-]*)["']?\s*[:=]\s*)(["'`])([^\r\n]*?)(?:\2|$)/gim, '$1$2[REDACTED]$2')
    .replace(/((?:[\w.-]*(?:password|passwd|pwd|secret|token|api[_-]?key|access[_-]?key|authorization)[\w.-]*)["']?\s*[:=]\s*)(?!["'`\s]|\[REDACTED\b)[^\s,;}\]]+/gi, '$1[REDACTED]')
    .replace(/(^\s*[A-Z0-9_]*(?:KEY|TOKEN|SECRET|PASSWORD|PASS)[A-Z0-9_]*\s*=\s*)([^\r\n]+)/gm, '$1[REDACTED]')
    .replace(/\b(?:gh[pousr]_[A-Za-z0-9_]{16,}|github_pat_[A-Za-z0-9_]{20,}|sk-(?:proj-)?[A-Za-z0-9_-]{16,}|AKIA[A-Z0-9]{16})\b/g, '[REDACTED]')
    .replace(/(\bBearer\s+)[A-Za-z0-9._~+\/-]{12,}/gi, '$1[REDACTED]')
    .replace(/(https?:\/\/)[^\s/@]+:[^\s/@]+@/g, '$1[REDACTED]@')
}

export function protectFinding(finding: Finding): Finding {
  const fingerprint = evidenceFingerprint(finding)
  let snippet = redactText(finding.snippet)
  if (finding.ruleId === 'SEC-203') snippet = snippet.replace(/(["'])([^\r\n]*?)\1/g, '$1[REDACTED]$1')
  // Entropy/external secret rules can identify values without an assignment.
  if (finding.ruleId === 'SEC-304' || finding.engine === 'betterleaks') snippet = '[REDACTED SECRET]'
  if (finding.ruleId === 'SEC-303') snippet = '[REDACTED PRIVATE KEY]'
  if (finding.ruleId === 'SEC-305') snippet = snippet.replace(/(=)[\s\S]*/, '$1[REDACTED]')
  return { id: finding.id, ruleId: finding.ruleId, file: finding.file, line: finding.line,
    severity: finding.severity, confidence: finding.confidence, cwe: finding.cwe,
    ...(finding.endLine === undefined ? {} : { endLine: finding.endLine }),
    ...(finding.engine === undefined ? {} : { engine: finding.engine }),
    ...(finding.evidence === undefined ? {} : { evidence: finding.evidence }),
    ...(finding.sources === undefined ? {} : { sources: finding.sources }),
    fingerprint, snippet, message: redactText(finding.message), title: redactText(finding.title) }
}
