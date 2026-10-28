# Code security guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Unsupported Git

If Git cannot safely isolate attributes, diff scanning reports incomplete instead of falling back to commands that could execute repository filters. Upgrade Git or use the full-file scan; incomplete is not a security pass.

Worktree, global and system attributes are excluded from diff conversion. Effective rules in `info/attributes`, including the common Git directory of linked worktrees, stop diff review because they take precedence over this isolation. No filters are executed and previous scan state is preserved. Use the full-file scan or remove the rules after understanding their purpose; the plugin never edits Git configuration. Blank and comment-only files remain supported.

## Start with a change

Ask in a project chat: “Check the current changes for security issues, show evidence, and recheck the repairs.” Or open **Settings → Code security**, select the project and choose **Scan code** or **Check changes**.

Projects come from host sessions or completed security tools; the browser cannot submit arbitrary filesystem roots. If a project is missing, run a check in its chat and refresh the list. Jobs continue when the panel is closed. Cancellation waits for the scanner and preserves the previous report.

Findings show severity, confidence, rule, location, source engines and redacted evidence. Filter new/high-risk findings, copy locations, download SARIF/Markdown, or open a file while its corresponding project chat is active.

## Optional engines

| Engine | Coverage | Default |
| :-- | :-- | :-- |
| Built-in rules | 40+ injection, deserialization, crypto, secrets, configuration and path/network patterns | Enabled; local |
| Betterleaks 1.9.0 | Platform-specific and generic secret patterns | Optional; live credential validation disabled |
| Semgrep CE 1.181.0 | Original JS/TS command, HTML and SQL taint rules; Python command taint | Optional; local; metrics/version checks disabled |
| OSV-Scanner 2.7.0 | Resolved dependency versions and known advisories | Chosen separately in dependency checks |

Install optional programs yourself, then set their executable paths or add them to PATH. Save settings and click **Check tools**. Engine settings apply to the current DSH profile; automatic checks are enabled per project. The plugin never installs scanners automatically.

A selected engine that is missing, fails, times out or returns incomplete output cannot produce a pass. No eligible files is explicitly shown as not run. Findings at the same location with the same CWE are merged while retaining source engines.

Built-in HTML findings are low-confidence sink patterns. Only a verified lexical dompurify import and a default sanitize call suppress them. Shadowed parameters, changed methods, custom configuration or parse failure are not silently treated as safe. Semgrep CE provides single-file data-flow evidence, not cross-file analysis or proof of exploitability.

## Dependency modes

- **Inventory (offline)** parses npm, PEP 621, Poetry, Python dependency groups, Cargo, Go and other declarations. Parse errors and dynamic declarations are explicit. Version-risk flags are not a CVE audit.
- **Local database** uses OSV's fully offline mode. Missing databases and malformed lockfiles are incomplete checks.
- **Online** explicitly permits querying OSV with package names, resolved versions and dependency metadata. Source code is not uploaded. No package manager, install script or project build is run.

Use package-lock.json, pnpm-lock.yaml, uv.lock or another supported resolved lockfile. A declared version range cannot stand in for an installed version. Local-source packages are not counted as checked against public advisories. Advisory IDs and upstream fixed versions are returned; compatibility still needs testing.

The current OSV 2.7.0 implementation uses `cache/osv-scalibr/npm/all.zip` (PyPI for Python). Enter **cache** in the panel. Download the ecosystem archive from OSV's official export bucket, or use OSV's own database download command beforehand. The 2.7.0 implementation/Windows test differs from its older documentation that still names osv-scanner. Custom cache paths are forwarded using both old and new environment-variable names; 2.7.0 is the version tested here.

Health shows cache file modification times, not advisory freshness guarantees. See the [offline guide](https://google.github.io/osv-scanner/usage/offline-mode/) and [current cache implementation](https://github.com/google/osv-scalibr/blob/5be78a00e3c2/enricher/vulnmatch/osvlocal/matcher.go).

## Quiet automatic checks

Disabled by default. Enable **Check changes after each turn** in the project's enhanced settings:

1. After a main-session turn, debounce for about 1.8 seconds; cancel when a new turn starts.
2. Run only local built-in rules over Git changes and untracked files.
3. Supply new, unaccepted high-risk patterns as untrusted evidence for a later conversation reminder. No popup, new model turn, automatic edit or baseline acceptance.
4. Save automatic results separately, preserving manual enhanced scans and rechecks. Non-Git projects and failures are shown as incomplete.

This is not scheduled monitoring and does not run after DSH exits.

## Tools

| Tool | Main arguments and purpose | Writes |
| :-- | :-- | :-- |
| secure_scan | Optional target and engines array | State |
| secure_diff | base (HEAD), staged, target, includeUntracked (false), engines | State |
| secure_fix_verify | Reuse the previous scope/engines; narrowing is rejected | State only after a complete recheck |
| secure_report | Latest findings, baseline split and coverage | None |
| secure_export | format: sarif/markdown; optional path | Approval when writing a path |
| secure_baseline | Required reason; accept all current findings | Approval |
| secure_deps | target; audit: none/offline/online | Temporary snapshot |
| secure_policy_show | Show project policy | None |
| secure_policy_set | Complete policy JSON | Approval |
| secure_health | Engine versions, settings and cache metadata | None |

Example secure_scan arguments:

```json
{"target":"src","engines":["builtin","betterleaks","semgrep"]}
```

Rechecks retain the previous target, Git base, staging mode and engine selection. An incomplete check closes no previous findings. A rule ceasing to match is separate from application tests passing.

Legacy diff records lack the full scope metadata. Rerun secure_diff once after upgrading before rechecking such a record.

## Scope and state

Defaults: 5,000 files, 2 MiB per file, at most 64 MiB per enhanced snapshot. Build directories, node_modules, .git and .code-security are excluded; symlinks/junctions are not followed. Unreadable/oversized files and parse/output limits are explicitly incomplete. Current scans cover a workspace or Git diff, not every historical commit.

Relative stateDir defaults to the session project's .code-security. Locks and atomic replacement protect concurrent history/baseline writes. Corrupt records are preserved and reported. Legacy findings, history and baselines are migrated to redacted evidence while retaining fingerprints computed from original evidence. Complete detected credentials are not returned to the model or reports.

Policy file: `.code-security.json`.

```json
{"version":1,"exclude":["vendor/**","generated/**"],"ignore":[{"ruleId":"SEC-206","file":"test/**","reason":"Not security-sensitive"}],"failOn":"high"}
```

Git runs with external diff/textconv disabled, and the reviewed repository's own executable config is neutralised too: every git call passes `-c core.fsmonitor=false`, and diff runs with `--attr-source=<empty tree>` so the worktree `.gitattributes` no longer applies (a `filter.<driver>.clean` is neither executed nor able to rewrite the diff). `--attr-source` needs Git 2.40+; older versions fall back to disabling fsmonitor only. Paths are relative to the session workspace. Staged scans read the index and only added-line findings are reported. Invalid arguments, Git refs and incomplete hunks preserve previous state.

## Development and licenses

Run `pnpm test`. Without native executable paths, the three native integration tests are explicitly skipped. Separate CI jobs install pinned, checksum-verified engines on Windows/Linux and use a synthetic offline OSV database.

The plugin and its original rules are [MIT](../LICENSE). Optional programs are not redistributed. See [third-party notices](../THIRD_PARTY_NOTICES.md). Static checks provide reviewable evidence and do not replace application tests or a full security audit.
