# dsh-code-security usage guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Current improvements

Relative stateDir defaults to .code-security in the session workspace. Concurrent scans retain both histories. Damaged records must be inspected after backup rather than silently recreated. Scans skip symlinks and junctions; static rules do not replace a full security audit.

0.3.8 (2026-10-12): incremental reviews decode Git's quoted paths and check added private keys, `.env` secrets and disabled audit settings. Three context lines on each side support existing next-line suppressions and multiline settings; only evidence intersecting added lines is reported. Multiline locations point to the match's first line. Staged reviews use index content rather than later working-tree edits.

Full, directly selected file and incremental scans share default and policy exclusions. Paths and Git scope are relative to the session workspace, including nested workspaces. `filesScanned` counts reviewed files and `filesSkipped` includes exclusions; incremental results also provide `filesChanged` and reviewed `addedLines`. Git output uses fixed colors/prefixes and disables external diff/textconv helpers. Invalid `base`/`staged` arguments and malformed or incomplete hunks fail without replacing scan state.

Saved evidence with a legacy `./` path prefix still matches baselines. File-level findings now use actual matching snippets; older baselines that saved the beginning of an entire file may require a fresh scan and human review before acceptance.

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
