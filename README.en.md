# dsh-code-security

[中文](README.md)

![dsh-code-security whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/assets/cover-whale-girl.png)

Run local static security checks on code or Git changes and verify fixes.

[![npm](https://img.shields.io/npm/v/dsh-code-security)](https://www.npmjs.com/package/dsh-code-security) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-downloads.svg)](https://www.npmjs.com/package/dsh-code-security)

## What it does

- Scan files, directories or Git diffs with locations and code evidence.
- Recheck fixes and manage baselines or scan policy.
- Export Markdown or SARIF reports and inspect dependency manifests.

## Install

In DSH Desktop, install `dsh-code-security` from the Plugins panel. If the bundled dsh command is available:

```bash
dsh plugin --profile desktop add dsh-code-security
```

For the web version, replace `desktop` with `web`. Restart DSH after installation.

## Start using it

Ask: “Review the current Git diff for security findings, show evidence and recheck the fixes.”

## Requirements and configuration

Deterministic rules run locally. See the usage guide for rule coverage, baselines and policy configuration.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](docs/USAGE.en.md). For standalone development, follow the Node requirement in [package.json](package.json).

## Documentation

- [Usage and troubleshooting](docs/USAGE.en.md)
- [Changelog](CHANGELOG.md)
- [Validation scope and history](docs/VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-code-security/issues)

## License

[MIT](LICENSE)
