/**
 * SBOM-lite：解析常见依赖清单，输出依赖名称、版本约束与风险标记。
 * 只做确定性解析，不联网、不执行包管理器。
 *
 * @module dsh-secure-review/deps
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { DEFAULT_EXCLUDE_DIRS } from './config.js'

export interface DependencyEntry {
  name: string
  spec: string
  manager: 'npm' | 'pypi' | 'go' | 'cargo' | 'composer' | 'ruby'
  file: string
  kind: 'runtime' | 'dev' | 'peer' | 'optional' | 'unknown'
  risk: 'exact' | 'range' | 'unpinned' | 'git' | 'local' | 'wildcard'
  note: string
}

export interface DepsScanResult {
  root: string
  filesScanned: number
  dependencies: DependencyEntry[]
  riskyCount: number
  warnings: string[]
}

const MANIFESTS = ['package.json', 'requirements.txt', 'pyproject.toml', 'go.mod', 'Cargo.toml', 'composer.json', 'Gemfile']

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
}

function riskOfSpec(spec: string): { risk: DependencyEntry['risk']; note: string } {
  const s = spec.trim()
  if (s === '') return { risk: 'unpinned', note: '未声明版本约束' }
  if (s === '*' || /^latest$/i.test(s) || /^x$/i.test(s)) return { risk: 'wildcard', note: '版本约束为通配' }
  if (/^(?:https?|git|git+|github:)/i.test(s)) return { risk: /#([0-9a-f]{7,40})\b/i.test(s) ? 'exact' : 'git', note: /#/.test(s) ? 'git 源已带提交锁定' : 'git 源未锁定到提交' }
  if (/^(?:file|link):/i.test(s)) return { risk: 'local', note: '本地/链接依赖，发布时会失配' }
  if (/^[0-9]+(?:\.[A-Za-z0-9.*-]+)+$/.test(s) || /^==[0-9]/.test(s)) return { risk: 'exact', note: '' }
  if (/[<>=~^]/.test(s) || s.includes('||')) return { risk: 'range', note: '' }
  return { risk: 'unpinned', note: '无法识别版本约束' }
}

function pushDeps(list: DependencyEntry[], entries: Record<string, unknown>, manager: DependencyEntry['manager'], file: string, kind: DependencyEntry['kind']): void {
  for (const [name, rawSpec] of Object.entries(entries)) {
    const spec = typeof rawSpec === 'string' ? rawSpec : ''
    const { risk, note } = riskOfSpec(spec)
    list.push({ name, spec, manager, file, kind, risk, note })
  }
}

function parsePackageJson(text: string, file: string): DependencyEntry[] {
  try {
    const pkg = JSON.parse(text)
    const list: DependencyEntry[] = []
    pushDeps(list, asRecord(pkg.dependencies), 'npm', file, 'runtime')
    pushDeps(list, asRecord(pkg.devDependencies), 'npm', file, 'dev')
    pushDeps(list, asRecord(pkg.peerDependencies), 'npm', file, 'peer')
    pushDeps(list, asRecord(pkg.optionalDependencies), 'npm', file, 'optional')
    return list
  } catch {
    return []
  }
}

function parseRequirements(text: string, file: string): DependencyEntry[] {
  const list: DependencyEntry[] = []
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (line === '' || line.startsWith('#') || line.startsWith('-')) continue
    const m = /^([A-Za-z0-9_.\-]+)(.*)$/.exec(line)
    if (m === null) continue
    const spec = m[2]?.trim() ?? ''
    const { risk, note } = riskOfSpec(spec)
    list.push({ name: m[1]!, spec, manager: 'pypi', file, kind: 'runtime', risk, note })
  }
  return list
}

function parsePyproject(text: string, file: string): DependencyEntry[] {
  const list: DependencyEntry[] = []
  const re = /^\s*([A-Za-z0-9_.\-]+)\s*(?:[<>=!~^]+[^\s,]+)?/gm
  for (const section of text.matchAll(/\[project\.(?:optional-)?dependencies\][\s\S]*?(?=\n\[|$)/g)) {
    for (const line of section[0].split(/\r?\n/)) {
      const trimmed = line.trim()
      if (trimmed === '' || trimmed.startsWith('[')) continue
      const m = /^([A-Za-z0-9_.\-]+)\s*(.*)$/.exec(trimmed.replace(/^"|"$/g, ''))
      if (m === null) continue
      const spec = m[2]?.trim() ?? ''
      const { risk, note } = riskOfSpec(spec)
      list.push({ name: m[1]!, spec, manager: 'pypi', file, kind: 'runtime', risk, note })
    }
  }
  return list
}

function parseGoMod(text: string, file: string): DependencyEntry[] {
  const list: DependencyEntry[] = []
  const re = /^\s*([A-Za-z0-9_.\/\-]+)\s+(v[0-9][^\s]*)/gm
  for (const m of text.matchAll(re)) {
    list.push({ name: m[1]!, spec: m[2]!, manager: 'go', file, kind: 'runtime', risk: 'exact', note: '' })
  }
  return list
}

function parseCargo(text: string, file: string): DependencyEntry[] {
  const list: DependencyEntry[] = []
  for (const line of text.split(/\r?\n/)) {
    const m = /^\s*([A-Za-z0-9_.\-]+)\s*=\s*(.+)$/.exec(line)
    if (m === null) continue
    const spec = m[2]!.trim().replace(/^["']|["']$/g, '')
    const isGit = /git\s*=|branch\s*=|rev\s*=/.test(spec)
    const risk = isGit ? (spec.includes('rev') ? 'exact' : 'git') : 'range'
    list.push({ name: m[1]!, spec, manager: 'cargo', file, kind: 'runtime', risk, note: isGit && !spec.includes('rev') ? 'git 源未锁定 rev' : '' })
  }
  return list
}

function parseComposer(text: string, file: string): DependencyEntry[] {
  const list: DependencyEntry[] = []
  try {
    const pkg = JSON.parse(text)
    for (const [key, entries] of [['require', 'runtime'], ['require-dev', 'dev']] as const) {
      pushDeps(list, asRecord((pkg as Record<string, unknown>)[key]), 'composer', file, entries)
    }
  } catch {
    // ignore malformed
  }
  return list
}

function parseGemfile(text: string, file: string): DependencyEntry[] {
  const list: DependencyEntry[] = []
  for (const m of text.matchAll(/^\s*gem\s+['"]([^'"]+)['"]\s*(?:,\s*['"]([^'"]*)['"]\s*)?/gm)) {
    const spec = m[2] ?? ''
    const { risk, note } = riskOfSpec(spec)
    list.push({ name: m[1]!, spec, manager: 'ruby', file, kind: 'runtime', risk, note })
  }
  return list
}

/** 扫描依赖清单，返回 SBOM-lite 结果。 */
export async function scanDeps(root: string): Promise<DepsScanResult> {
  const dependencies: DependencyEntry[] = []
  const warnings: string[] = []
  let filesScanned = 0

  const visit = async (absolute: string, rel: string): Promise<void> => {
    let stat
    try {
      stat = await fs.stat(absolute)
    } catch {
      return
    }
    if (stat.isDirectory()) {
      if (DEFAULT_EXCLUDE_DIRS.includes(path.basename(absolute))) return
      const entries = await fs.readdir(absolute, { withFileTypes: true })
      for (const entry of entries) await visit(path.join(absolute, entry.name), rel === '' ? entry.name : rel + '/' + entry.name)
      return
    }
    const base = path.basename(absolute)
    if (!MANIFESTS.includes(base)) return
    filesScanned += 1
    let text = ''
    try {
      text = await fs.readFile(absolute, 'utf8')
    } catch {
      warnings.push('无法读取 ' + rel)
      return
    }
    if (base === 'package.json') dependencies.push(...parsePackageJson(text, rel))
    else if (base === 'requirements.txt') dependencies.push(...parseRequirements(text, rel))
    else if (base === 'pyproject.toml') dependencies.push(...parsePyproject(text, rel))
    else if (base === 'go.mod') dependencies.push(...parseGoMod(text, rel))
    else if (base === 'Cargo.toml') dependencies.push(...parseCargo(text, rel))
    else if (base === 'composer.json') dependencies.push(...parseComposer(text, rel))
    else if (base === 'Gemfile') dependencies.push(...parseGemfile(text, rel))
  }

  await visit(root, '')
  dependencies.sort((a, b) => a.file.localeCompare(b.file) || a.name.localeCompare(b.name))
  const risky = dependencies.filter((item) => item.risk !== 'exact' && item.risk !== 'range')
  return { root, filesScanned, dependencies, riskyCount: risky.length, warnings }
}
