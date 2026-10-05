# dsh-code-security usage guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Current improvements

Relative stateDir defaults to .code-security in the session workspace. Concurrent scans retain both histories. Damaged records must be inspected after backup rather than silently recreated. Scans skip symlinks and junctions; static rules do not replace a full security audit.

## Tools

| Tool | Purpose | Write |
| :-- | :-- | :-- |
| `secure_scan` | Scan files with CWE/severity/line/snippet evidence | state |
| `secure_diff` | Review only added lines of git diff | state |
| `secure_fix_verify` | Compare with baseline: closed / remaining / fresh | state |
| `secure_report` | Aggregate by rule/file with gate verdict | no |
| `secure_export` | Export SARIF 2.1.0 / Markdown | file write approval |
| `secure_baseline` | Accept current findings as baseline; gate on new issues only | approval |
| `secure_deps` | SBOM-lite: parse dependency manifests and version-risk flags | no |
| `secure_policy_show` | Show .code-security.json | no |
| `secure_policy_set` | Replace policy JSON | approval |

40+ deterministic rules: injection, deserialization, weak crypto (including shell TLS bypass flags), secrets, dangerous config, sensitive logging, path traversal, SSRF.

```bash
dsh plugin --profile web add dsh-code-security
```

## License

MIT (see [LICENSE](../LICENSE))
