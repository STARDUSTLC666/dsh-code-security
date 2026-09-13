# dsh-code-security

![npm](https://img.shields.io/npm/v/dsh-code-security) ![downloads](https://img.shields.io/npm/dm/dsh-code-security) ![license](https://img.shields.io/github/license/STARDUSTLC666/dsh-code-security) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-code-security?style=social)

> 让 agent 每次改完代码，先过一道本地安全扫描，修复完了才准交付。

DeepSeek Harness AI 代码安全审查插件：确定性规则引擎 + git diff 增量审查 + 修复闭环 + 策略门禁。借鉴 Codex 安全技能的方法论（漏洞分级、证据优先、供应链分层、Agent 安全），实现为可复现工具。零运行时依赖。

## 工具

| 工具 | 作用 | 写操作 |
| :-- | :-- | :-- |
| `secure_scan` | 扫描文件/目录，输出 CWE/严重度/行号/代码片段证据 | 写状态 |
| `secure_diff` | 只审查 git diff 新增行 | 写状态 |
| `secure_fix_verify` | 修复后复扫：关闭 / 仍存在 / 新引入 | 写状态 |
| `secure_report` | 按规则/文件聚合 + 门禁结论 | 否 |
| `secure_export` | 导出 SARIF 2.1.0 / Markdown 报告 | 写文件审批 |
| `secure_baseline` | 接受当前已知问题为基线，之后只按新增判定 | 审批门 |
| `secure_deps` | SBOM-lite：解析依赖清单与版本约束风险 | 否 |
| `secure_policy_show` | 查看 .code-security.json 策略 | 否 |
| `secure_policy_set` | 写入策略（排除/忽略/阈值） | 审批门 |

## 规则覆盖（40+）

- 注入：eval / exec / shell=True / SQL 拼接 / innerHTML
- 反序列化：pickle / yaml.load / ObjectInputStream / Marshal / unserialize
- 加密：弱哈希、ECB、硬编码 IV/密钥、JWT none、TLS 校验关闭、Shell TLS 绕过（curl -k / wget --no-check-certificate / git sslVerify=false）
- 凭据：硬编码密码、令牌、私钥、高熵密钥
- 配置：chmod 777、Docker privileged / latest、npm audit=false、CORS *
- 泄露：敏感日志、错误堆栈外发、路径穿越、SSRF

发现只包含客观证据与 CWE 编号，不附修复建议——修复方案由 agent 基于证据生成。

## 兼容性

已在官方 `@deepseek-ai/dsh@0.1.5-rc.1`、Node `24.16.0` 上验证（2026-09-11）：18 个组件与 Modlens 同载，工具 schema、技能注册及离线只读调用检查通过。采用 `cordis.patch.yml` + `dsh.bundle.patch` 组合包模型。Node 要求与该版本 Harness 一致：22.19 及以上的 22.x，或 24 及以上。外部服务的实际业务操作需按各组件配置单独验证。

2026-09-13 修复：保留宿主 `subprocess.spawn` 的服务对象，避免方法独立传递后因 `this` 丢失而报错。已在官方 `0.1.5-rc.1` 和 `0.1.5-rc.2`、Node `24.16.0` 上验证。`secure_diff` 已通过真实宿主进程服务读取隔离 Git 仓库差异，正确识别变更文件和新增行。

## 安装

```bash
dsh plugin --profile web add dsh-code-security
```

## 卸载

```bash
dsh plugin --profile web remove dsh-code-security
```

卸载后重启 Web 服务。如需彻底清理，可再手动删除自己 profile `cordis.patch.yml` 中覆盖的插件行。


## 使用

```text
secure_scan { target: src }
secure_diff { base: HEAD }
secure_fix_verify { target: src }
secure_baseline { reason: 历史遗留 }
secure_deps { target: . }
```

策略示例（`.code-security.json`）：

```json
{
  "version": 1,
  "exclude": ["vendor/**", "generated/**"],
  "ignore": [{ "ruleId": "SEC-206", "file": "test/**", "reason": "非安全敏感" }],
  "failOn": "high"
}
```

## 工程

```bash
pnpm test       # 构建 + 24 个测试
```

MIT
## License

MIT（见 [LICENSE](LICENSE)）
