# dsh-secure-review

> Every agent code change passes a local security scan before delivery.

A DeepSeek Harness plugin for AI code security review: deterministic rule engine, git-diff incremental review, fix-verify loop, and policy gate. Methodology borrows from Codex security skills (evidence-first findings, severity ordering, supply-chain layers). Zero runtime dependencies.

## Tools

| Tool | Purpose | Write |
| :-- | :-- | :-- |
| `secure_scan` | Scan files with CWE/severity/line/snippet evidence | state |
| `secure_diff` | Review only added lines of git diff | state |
| `secure_fix_verify` | Compare with baseline: closed / remaining / fresh | state |
| `secure_report` | Aggregate by rule/file with gate verdict | no |
| `secure_policy_show` | Show .secure-review.json | no |
| `secure_policy_set` | Replace policy JSON | approval |

30+ deterministic rules: injection, deserialization, weak crypto, secrets, dangerous config, sensitive logging, path traversal, SSRF.

```bash
dsh plugin --profile web add dsh-secure-review
```

MIT
