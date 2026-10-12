# dsh-code-security 使用说明

[返回简介](../README.md) · [更新记录](../CHANGELOG.md) · [验证记录](VALIDATION.md)

## 本次改进

相对 stateDir 默认在会话工作区的 .code-security。并发扫描保留双方历史；记录损坏时先备份排查，不会默默重建。扫描不跟随符号链接或目录联接；静态规则不能代替完整安全审计。

0.3.8 改进（2026-10-12）：`secure_diff` 支持 Git 转义的中文/特殊文件名，并检查新增私钥、`.env` 敏感项与禁用审计配置。它读取前后各 3 行上下文以处理已有豁免和跨行配置，只报告证据涉及新增行的问题；跨行证据的行号指向匹配的起始行。暂存扫描以暂存区内容为准。

全量、直接指定文件与增量扫描均遵守默认目录排除及策略 `exclude`。文件路径统一相对当前会话工作区；在仓库子目录作为工作区时，增量扫描不包含该目录外的改动。返回的 `filesScanned` 为实际审查的文件数，`filesSkipped` 包含排除项；增量结果另有 `filesChanged` 和实际审查的 `addedLines`。

`base` 必须是非空 Git ref，不能以 `-` 开头；`staged` 必须是布尔值。差异块行数不完整或格式错误会报错，本次不会覆盖已有扫描记录。Git 的颜色/前缀偏好不会改变解析格式，外部 diff 和 textconv 转换器被禁用。

旧记录的 `./` 路径前缀可继续匹配基线。私钥、`.env` 和禁用审计配置现在使用实际匹配片段；旧基线若保存的是文件开头的大段文本，可能被重新识别为新增，需复扫并人工复核后再接受。详见[本轮迭代记录](ITERATION-2026-10-12.md)。

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
pnpm test       # 构建并执行测试
```

## License

MIT（见 [LICENSE](../LICENSE)）
