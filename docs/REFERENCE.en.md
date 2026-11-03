> Full usage reference. The landing page focuses on outcomes, installation and workflows; detailed parameters, limits, update rules and historical validation links remain here.

# dsh-code-security

[中文](../README.md)

![dsh-code-security whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/assets/cover-whale-girl.png)

Inspect code and Git changes from DSH, review finding evidence and verify fixes. Built-in local rules can be complemented by Semgrep, Betterleaks and OSV, with findings, skips and incomplete checks reported separately.

[![npm](https://img.shields.io/npm/v/dsh-code-security)](https://www.npmjs.com/package/dsh-code-security) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-downloads.svg)](https://www.npmjs.com/package/dsh-code-security) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-total-downloads.svg)](https://www.npmjs.com/package/dsh-code-security)

[Download statistics](https://github.com/STARDUSTLC666/dsh-suite/blob/npm-downloads/README.md)

Feedback and contributions are welcome: report [issues](https://github.com/STARDUSTLC666/dsh-code-security/issues) or submit [pull requests](https://github.com/STARDUSTLC666/dsh-code-security/pulls).

Open the workbench from the native DSH sidebar. See the [workbench guide](WORKBENCH.md) for configuration and operating boundaries.

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

1. In the target repository session, choose the whole project or current Git changes.
2. For example: “Review these changes for security issues; report concrete triggers and code evidence.”
3. Open Code security in the sidebar and inspect file locations, rules and evidence; prepare optional scanners separately.
4. Recheck the same scope after fixing it, keeping false-positive reasons and unresolved human decisions.

## Requirements and configuration

Built-in rules run locally by default. Optional programs are installed by the user; basic checks work without them. Online dependency audits require an explicit mode choice, and automatic checks are off by default. Complete detected credentials are redacted before return, persistence and export.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](USAGE.en.md). For standalone development, follow the Node requirement in [package.json](../package.json).

## Documentation

- [Usage and troubleshooting](USAGE.en.md)
- [Changelog](../CHANGELOG.md)
- [Validation scope and history](VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-code-security/issues)

## Plugin updates

Requires DSH 0.2.1-rc.3 or newer. Update controls sit at the bottom of the existing workbench, or native plugin details for plugins without a workbench. Checks, release notes and preferences expand in place, with no separate update page or settings menu. Automatic checks are on by default; **automatic installation is off by default**. Only explicit opt-in permits compatible stable patches while idle with no unsaved changes. Preferences are independent, with per-plugin disable, deferral and ignore controls. No forced DSH restart or upgrade, and local-source installations stay unchanged. Suite components explain and operate on the whole Suite in the same footer.

Older releases need one manual update in native plugin management to acquire these controls. Publishing to npm does not replace an existing user installation.

## License

[MIT](../LICENSE)
