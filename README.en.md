# dsh-code-security

[中文](README.md)

![dsh-code-security whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/assets/cover-whale-girl.png)

Run local static security checks on code or Git changes and verify fixes.

[![npm](https://img.shields.io/npm/v/dsh-code-security)](https://www.npmjs.com/package/dsh-code-security) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-downloads.svg)](https://www.npmjs.com/package/dsh-code-security)

Feedback and contributions are welcome: report [issues](https://github.com/STARDUSTLC666/dsh-code-security/issues) or submit [pull requests](https://github.com/STARDUSTLC666/dsh-code-security/pulls).

## What it does

- Scan files, directories or Git diffs with locations and code evidence.
- Inspect new findings, coverage and redacted evidence in DSH Settings, then recheck fixes.
- Optionally use Betterleaks for secrets, Semgrep CE for data flow and OSV for dependency advisories.
- Export Markdown/SARIF, maintain baselines, and opt into quiet per-project change checks.

## Install

In DSH Desktop, install `dsh-code-security` from the Plugins panel. If the bundled dsh command is available:

```bash
dsh plugin --profile desktop add dsh-code-security
```

For the web version, replace `desktop` with `web`. Restart DSH after installation.

## Start using it

Ask: “Review the current Git diff for security findings, show evidence and recheck the fixes.” Then open **Settings → Code security** to view the project and results.

## Requirements and configuration

Built-in rules run locally by default. Optional programs are installed by the user; basic checks work without them. Online dependency audits require an explicit mode choice, and automatic checks are off by default. Complete detected credentials are redacted before return, persistence and export.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](docs/USAGE.en.md). For standalone development, follow the Node requirement in [package.json](package.json).

## Documentation

- [Usage and troubleshooting](docs/USAGE.en.md)
- [Changelog](CHANGELOG.md)
- [Validation scope and history](docs/VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-code-security/issues)

## License

[MIT](LICENSE)
