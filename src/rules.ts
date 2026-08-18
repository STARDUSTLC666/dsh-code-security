/**
 * 确定性安全规则库。每条规则只报告事实模式，不包含修复建议。
 *
 * @module dsh-code-security/rules
 */

import type { Severity } from './config.js'

export type Language = 'javascript' | 'python' | 'go' | 'java' | 'ruby' | 'php' | 'shell' | 'yaml' | 'dockerfile' | 'json' | 'env' | 'any'

export interface SecurityRule {
  id: string
  title: string
  cwe: string
  severity: Severity
  confidence: 'high' | 'medium' | 'low'
  languages: Language[]
  patterns: RegExp[]
  message: string
  fileLevel?: boolean
}

const JS: Language[] = ['javascript']
const PY: Language[] = ['python']
const JAVA: Language[] = ['java']
const SHELL: Language[] = ['shell']
const YAML: Language[] = ['yaml']
const DOCKER: Language[] = ['dockerfile']
const ALL: Language[] = ['any']

export const RULES: readonly SecurityRule[] = Object.freeze([
  { id: 'SEC-001', title: 'JavaScript eval / Function 动态执行', cwe: 'CWE-95', severity: 'critical', confidence: 'high', languages: JS, patterns: [/\beval\s*\(/, /\bnew\s+Function\s*\(/], message: '发现 eval 或 new Function 动态代码执行。' },
  { id: 'SEC-002', title: 'Node.js exec 使用 shell 执行命令', cwe: 'CWE-78', severity: 'high', confidence: 'high', languages: JS, patterns: [/\bexecSync\s*\(/, /child_process\s*\.\s*exec(?:Sync)?\s*\(/], message: 'child_process exec/execSync 经 shell 解释命令字符串。' },
  { id: 'SEC-003', title: 'Node.js spawn shell: true', cwe: 'CWE-78', severity: 'high', confidence: 'high', languages: JS, patterns: [/\bspawn(?:Sync)?\s*\([^)]*\{\s*shell\s*:\s*true/], message: 'spawn 显式启用了 shell 解释。' },
  { id: 'SEC-004', title: 'Python subprocess shell=True', cwe: 'CWE-78', severity: 'critical', confidence: 'high', languages: PY, patterns: [/\bsubprocess\.(?:run|call|Popen|check_output|check_call)\s*\([^)]*shell\s*=\s*True/], message: 'subprocess 调用启用 shell=True。' },
  { id: 'SEC-005', title: 'Python os.system / popen', cwe: 'CWE-78', severity: 'high', confidence: 'high', languages: PY, patterns: [/\bos\.(?:system|popen)\s*\(/], message: '使用 os.system/os.popen 执行 shell 命令。' },
  { id: 'SEC-006', title: 'Shell 管道下载执行', cwe: 'CWE-78', severity: 'critical', confidence: 'high', languages: SHELL, patterns: [/\bcurl\b[^|\n]*\|\s*(?:sudo\s+)?(?:ba|z|k|da)?sh\b/i, /\bwget\b[^|\n]*\|\s*(?:sudo\s+)?(?:ba|z|k|da)?sh\b/i], message: '下载内容直接通过管道交给 shell 执行。' },
  { id: 'SEC-007', title: 'JavaScript SQL 字符串拼接', cwe: 'CWE-89', severity: 'high', confidence: 'medium', languages: JS, patterns: [/['"](?:SELECT|INSERT|UPDATE|DELETE)\b[^'"]*['"]\s*\+/i, /\bquery\s*=\s*['"][^'"]*['"]\s*\+/i], message: 'SQL 语句与变量拼接，疑似可注入。' },
  { id: 'SEC-008', title: 'Python SQL 字符串格式化', cwe: 'CWE-89', severity: 'high', confidence: 'medium', languages: PY, patterns: [/\.execute\s*\([^)]*(?:%\s*\(|%\s*[a-z_]|\bf\s*['"]|\+\s*str\()/i], message: 'SQL 执行语句使用字符串格式化或拼接。' },
  { id: 'SEC-009', title: 'JavaScript innerHTML / 危险 HTML 注入', cwe: 'CWE-79', severity: 'high', confidence: 'medium', languages: JS, patterns: [/\.innerHTML\s*=/, /\bdangerouslySetInnerHTML\b/], message: '将不可信内容写入 HTML 插值点。' },
  { id: 'SEC-010', title: '开放重定向', cwe: 'CWE-601', severity: 'medium', confidence: 'medium', languages: JS, patterns: [/\bredirect\s*\(\s*(?:req|request)\.(?:query|params|body)/i, /\blocation\s*=\s*(?:req|request)\.(?:query|params|body)/i], message: '跳转目标直接取自请求参数。' },

  { id: 'SEC-101', title: 'Python pickle 反序列化', cwe: 'CWE-502', severity: 'critical', confidence: 'high', languages: PY, patterns: [/\bpickle\.(?:loads?)\s*\(/], message: 'pickle 反序列化不可信数据。' },
  { id: 'SEC-102', title: 'Python yaml.load 不安全解析', cwe: 'CWE-502', severity: 'high', confidence: 'medium', languages: PY, patterns: [/\byaml\.load\s*\(/], message: 'yaml.load 未使用 SafeLoader。' },
  { id: 'SEC-103', title: 'Java 原生反序列化', cwe: 'CWE-502', severity: 'high', confidence: 'medium', languages: JAVA, patterns: [/\bObjectInputStream\b/, /\.readObject\s*\(/], message: '使用 Java 原生对象反序列化。' },
  { id: 'SEC-104', title: 'Ruby 危险反序列化', cwe: 'CWE-502', severity: 'high', confidence: 'medium', languages: ['ruby'], patterns: [/\bMarshal\.load\s*\(/, /\bYAML\.load\s*\(/], message: 'Ruby 反序列化不可信对象。' },
  { id: 'SEC-105', title: 'PHP 反序列化', cwe: 'CWE-502', severity: 'high', confidence: 'medium', languages: ['php'], patterns: [/\bunserialize\s*\(/], message: 'unserialize 处理不可信输入。' },

  { id: 'SEC-201', title: '弱哈希用于安全场景', cwe: 'CWE-328', severity: 'high', confidence: 'medium', languages: ALL, patterns: [/\bcreateHash\s*\(\s*['"]?(?:md5|sha1)['"]?/i, /\bhashlib\.(?:md5|sha1)\s*\(/i, /\b(?:md5|sha1)(?:sum)?\s+/i], message: '使用 MD5 / SHA1 弱哈希。' },
  { id: 'SEC-202', title: 'ECB 分组加密模式', cwe: 'CWE-327', severity: 'high', confidence: 'medium', languages: ALL, patterns: [/aes[-_/]?\d*[-_/]?ecb/i, /['"]AES\/ECB/i], message: '使用 ECB 加密模式。' },
  { id: 'SEC-203', title: '硬编码 IV / 密钥', cwe: 'CWE-321', severity: 'high', confidence: 'medium', languages: ALL, patterns: [/\.createCipher(?:iv)?\s*\([^)]*['"][A-Za-z0-9+/=]{12,}['"]/, /\b(?:iv|key|secret)\s*[:=]\s*['"][A-Za-z0-9+/=]{16,}['"]/i], message: '加密密钥或 IV 以字面量硬编码。' },
  { id: 'SEC-204', title: 'JWT alg none / 不校验签名', cwe: 'CWE-347', severity: 'critical', confidence: 'high', languages: JS, patterns: [/['"]?alg['"]?\s*[:=]\s*['"]?none['"]?/i, /\bjwt\.verify\s*\([^)]*\{\s*algorithms\s*:\s*\[\s*['"]none/i], message: 'JWT 允许 none 算法或未校验签名。' },
  { id: 'SEC-205', title: 'TLS 校验被禁用', cwe: 'CWE-295', severity: 'high', confidence: 'high', languages: ALL, patterns: [/rejectUnauthorized\s*:\s*false/, /\bverify\s*=\s*False/, /InsecureSkipVerify\s*:\s*true/], message: 'TLS 证书校验被显式关闭。' },
  { id: 'SEC-206', title: 'Math.random 用于安全敏感逻辑', cwe: 'CWE-330', severity: 'low', confidence: 'low', languages: JS, patterns: [/\bMath\.random\s*\(/], message: '使用非密码学安全的 Math.random。' },
  { id: 'SEC-207', title: 'Shell 关闭 TLS 证书校验', cwe: 'CWE-295', severity: 'high', confidence: 'high', languages: SHELL, patterns: [/\bcurl\b[^\n]*(?:-k\b|--insecure\b)/, /\bwget\b[^\n]*--no-check-certificate\b/, /\bgit\b[^\n]*-c\s+http\.sslVerify\s*=\s*false\b/i, /\bnpm\b[^\n]*--strict-ssl\s*=\s*false\b/i], message: '命令行下载/访问工具关闭了 TLS 证书校验。' },

  { id: 'SEC-301', title: '硬编码密码', cwe: 'CWE-798', severity: 'critical', confidence: 'high', languages: ALL, patterns: [/(?:password|passwd|pwd)\s*[:=]\s*['"][^'"]{4,}['"]/i], message: '密码以明文硬编码在源码中。' },
  { id: 'SEC-302', title: '硬编码令牌 / API 密钥', cwe: 'CWE-798', severity: 'high', confidence: 'medium', languages: ALL, patterns: [/(?:api[_-]?key|secret[_-]?key|access[_-]?key|auth[_-]?token)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/i], message: '访问令牌或 API 密钥以字面量硬编码。' },
  { id: 'SEC-303', title: '私钥材料', cwe: 'CWE-798', severity: 'critical', confidence: 'high', languages: ALL, patterns: [/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/], message: '检测到私钥文件内容。', fileLevel: true },
  { id: 'SEC-304', title: '疑似高熵密钥', cwe: 'CWE-798', severity: 'medium', confidence: 'medium', languages: ALL, patterns: [], message: '检测到高熵字符串，疑似密钥或令牌。' },

  { id: 'SEC-401', title: 'chmod 777', cwe: 'CWE-732', severity: 'high', confidence: 'high', languages: ALL, patterns: [/(?:chmod|os\.chmod|fs\.chmod)\b[^\n;]*(?:777|0o777|0o?0777)/, /chmod\s+(?:-R\s+)?777/], message: '文件权限设置为 777。' },
  { id: 'SEC-402', title: 'Docker privileged 模式', cwe: 'CWE-250', severity: 'high', confidence: 'high', languages: DOCKER, patterns: [/--privileged/], message: '容器以 privileged 特权模式运行。' },
  { id: 'SEC-403', title: 'CORS 通配符', cwe: 'CWE-942', severity: 'medium', confidence: 'medium', languages: JS, patterns: [/(?:origin|allowedOrigins?)\s*[:=]\s*['"]?\*['"]?/i], message: 'CORS 允许任意来源。' },
  { id: 'SEC-404', title: 'npm 禁用安全审计', cwe: 'CWE-693', severity: 'medium', confidence: 'high', languages: ['json', 'any'], patterns: [/"audit"\s*:\s*false/i, /^audit\s*=\s*false\b/im], message: '依赖审计被显式关闭。', fileLevel: true },
  { id: 'SEC-405', title: '依赖安装使用 force / legacy-peer-deps', cwe: 'CWE-693', severity: 'medium', confidence: 'high', languages: SHELL, patterns: [/--force\b/, /--legacy-peer-deps\b/], message: '包安装使用了会绕过安全/兼容门禁的标志。' },
  { id: 'SEC-406', title: 'Docker 使用 latest 标签', cwe: 'CWE-1104', severity: 'low', confidence: 'high', languages: DOCKER, patterns: [/\bFROM\s+\S+:latest\b/i], message: '基础镜像使用 latest 浮动标签。' },

  { id: 'SEC-501', title: '日志打印敏感变量', cwe: 'CWE-532', severity: 'medium', confidence: 'medium', languages: ALL, patterns: [/(?:console\.log|log\.(?:info|debug)|print|printf|log\b)\s*\([^)]*(?:password|secret|token|api[_-]?key)/i], message: '日志输出包含疑似敏感变量。' },
  { id: 'SEC-502', title: '错误信息包含内部细节', cwe: 'CWE-209', severity: 'low', confidence: 'medium', languages: JS, patterns: [/\.send\s*\(\s*(?:err|error)\.stack/i, /\bres\.(?:json|send)\s*\(\s*(?:err|error)\.message/i], message: '错误响应直接返回堆栈或内部错误消息。' },

  { id: 'SEC-601', title: '路径拼接来自请求参数', cwe: 'CWE-22', severity: 'high', confidence: 'medium', languages: JS, patterns: [/(?:path\.join|readFile(?:Sync)?|writeFile(?:Sync)?|open(?:Sync)?)\s*\([^)]*(?:req|request)\.(?:query|params|body)/i], message: '文件路径由请求参数参与拼接。' },
  { id: 'SEC-602', title: 'SSRF：请求目标来自用户输入', cwe: 'CWE-918', severity: 'high', confidence: 'medium', languages: JS, patterns: [/(?:fetch|axios\.get|axios\(|request\()\s*\(\s*(?:req|request)\.(?:query|params|body)/i], message: '请求 URL 直接取自用户输入。' },

  { id: 'SEC-011', title: 'PHP 命令执行函数', cwe: 'CWE-78', severity: 'critical', confidence: 'high', languages: ['php'], patterns: [/\b(?:system|exec|shell_exec|passthru|proc_open)\s*\(/], message: '使用 PHP 命令执行函数。' },
  { id: 'SEC-012', title: 'Ruby 命令执行函数', cwe: 'CWE-78', severity: 'high', confidence: 'high', languages: ['ruby'], patterns: [/\bsystem\s*\(/, /\bexec\s*\(/, /\bIO\.popen\s*\(/], message: '使用 Ruby 命令执行接口。' },
  { id: 'SEC-013', title: 'Java Runtime.exec / ProcessBuilder', cwe: 'CWE-78', severity: 'high', confidence: 'medium', languages: JAVA, patterns: [/Runtime\.getRuntime\(\)\.exec\s*\(/, /\bnew\s+ProcessBuilder\s*\(/], message: '使用 Java 进程执行接口。' },
  { id: 'SEC-014', title: 'Python eval / exec', cwe: 'CWE-95', severity: 'critical', confidence: 'high', languages: PY, patterns: [/\beval\s*\(/, /\bexec\s*\(/], message: '使用 Python 动态代码执行。' },
  { id: 'SEC-015', title: 'tarfile.extractall 路径穿越', cwe: 'CWE-22', severity: 'high', confidence: 'medium', languages: PY, patterns: [/\.extractall\s*\(/], message: '压缩包提取未做成员路径校验。' },
  { id: 'SEC-016', title: 'JavaScript document.write', cwe: 'CWE-79', severity: 'high', confidence: 'medium', languages: JS, patterns: [/\bdocument\.write\s*\(/], message: '使用 document.write 写入动态内容。' },
  { id: 'SEC-017', title: 'Python 请求目标来自用户输入', cwe: 'CWE-918', severity: 'high', confidence: 'medium', languages: PY, patterns: [/\brequests\.(?:get|post|request)\s*\([^)]*(?:request|params|form|data|input)/i], message: 'HTTP 请求目标可能来自用户输入。' },
  { id: 'SEC-305', title: '.env 包含敏感项', cwe: 'CWE-312', severity: 'high', confidence: 'medium', languages: ['env'], patterns: [/^(?:[A-Z0-9_]*(?:KEY|TOKEN|SECRET|PASSWORD|PASS)[A-Z0-9_]*)\s*=\s*.+/im], message: '.env 文件中包含敏感配置项。', fileLevel: true },
  { id: 'SEC-306', title: 'Node crypto.createCipher 已废弃', cwe: 'CWE-327', severity: 'high', confidence: 'high', languages: JS, patterns: [/\bcrypto\.createCipher\s*\(/], message: '使用已废弃的非认证加密接口。' },
  { id: 'SEC-407', title: 'GitHub Actions 使用浮动分支', cwe: 'CWE-1104', severity: 'low', confidence: 'high', languages: YAML, patterns: [/\buses\s*:\s*\S+@(?:main|master)\b/i], message: 'Action 未锁定到提交 SHA 或版本标签。' },
  { id: 'SEC-408', title: 'Docker USER root', cwe: 'CWE-250', severity: 'low', confidence: 'high', languages: DOCKER, patterns: [/^\s*USER\s+root\b/im], message: '容器默认以 root 用户运行。' },
  { id: 'SEC-603', title: 'Python 文件路径来自用户输入', cwe: 'CWE-22', severity: 'high', confidence: 'medium', languages: PY, patterns: [/\bopen\s*\([^)]*(?:request|params|form|input|filename)/i, /\bos\.path\.join\s*\([^)]*(?:request|params|form|input)/i], message: '文件路径可能由用户输入参与。' },
]);

/** 规则类别：供报告聚合与排序使用。 */
export function ruleCategory(ruleId: string): string {
  const group = ruleId.slice(4, 5)
  const map: Record<string, string> = {
    '0': '注入',
    '1': '反序列化',
    '2': '加密与密钥',
    '3': '凭据泄露',
    '4': '配置与权限',
    '5': '日志与信息泄露',
    '6': '路径与网络',
  }
  return map[group] ?? '其他'
}

export function languageForFile(file: string): Language {
  const name = file.toLowerCase()
  if (/\.(?:js|mjs|cjs|jsx|ts|tsx)$/.test(name)) return 'javascript'
  if (/\.py$/.test(name)) return 'python'
  if (/\.go$/.test(name)) return 'go'
  if (/\.java$/.test(name)) return 'java'
  if (/\.rb$/.test(name)) return 'ruby'
  if (/\.php$/.test(name)) return 'php'
  if (/\.(?:sh|bash|zsh)$/.test(name) || name.endsWith('.bashrc') || name.endsWith('.zshrc')) return 'shell'
  if (/\.(?:ya?ml)$/.test(name)) return 'yaml'
  if (name.endsWith('dockerfile')) return 'dockerfile'
  if (/\.json$/.test(name)) return 'json'
  if (/\.env(?:\..*)?$/.test(name)) return 'env'
  return 'any'
}
