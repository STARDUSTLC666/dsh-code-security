[简体中文](README.md) · **English**

# Code Security

**Inspect security findings and verify the fixes.**

Code security workbench for DeepSeek Harness (`>=0.2.2-rc.3`): local static checks, Git diff review, dependency auditing, and fix verification with optional Betterleaks / Semgrep CE / OSV-Scanner integration. Features Workbench UI v2 with 5 synced light/warm themes (Native Airy / Warm Cream / Claude Warmth / Bright 8-Bit / Airy Mint), soft-slate dark adaptation, and tactile micro-animations.

[![npm](https://img.shields.io/npm/v/dsh-code-security)](https://www.npmjs.com/package/dsh-code-security) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-downloads.svg)](https://www.npmjs.com/package/dsh-code-security) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-total-downloads.svg)](https://www.npmjs.com/package/dsh-code-security)

**[Install](#install) · [Workflow](#start-using-it) · [Full guide](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/REFERENCE.en.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-en-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-en-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-en-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-en-light.svg" alt="Inspect security findings and verify the fixes. · workflow illustration" width="100%">
</picture>

## Features

- Scan files, directories, or a Git diff, and audit dependency manifests offline or against OSV.
- Inspect locations, rules, coverage, and redacted evidence in a DeepSeek Harness `>=0.2.2-rc.3` Workbench UI v2 panel.
- Switch between 5 synced workbench themes (Native Airy, Warm Cream, Claude Warmth, Bright 8-Bit, Airy Mint) with micro-animations and reduced-motion support.
- Recheck the same scope after fixes and export Markdown or SARIF reports when needed.

<details>
<summary>See an example</summary>

![workbench example](https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/screen-en.webp)

Captured from the live DeepSeek Harness workbench using demo data.

</details>

## Install

Open **Plugins** in the DSH desktop app and install `dsh-code-security`. If the CLI is available:

```bash
dsh plugin --profile desktop add dsh-code-security
```

For the web profile, replace `desktop` with `web`. Restart that DSH profile after installation. The package’s DSH requirement is `>=0.2.2-rc.3`.

## Start using it

Follow the **4-Step Security Loop (Check diff → Inspect evidence → Fix in chat → Recheck & archive)**:

1. **Check diff or scan code**: Trigger your first check from a project chat (using the 1-click copy prompts in the empty state), or click **Scan code** / **Check changes** directly inside the **Code security** workbench (built-in rules work out of the box).
2. **Inspect the evidence chain**: Review file lines, data-flow or pattern explanations, and redacted snippets in **Findings** to separate real vulnerabilities from test fixtures or intentional constants.
3. **Ask the assistant to fix**: Click **Copy fix prompt** on any finding (or open **? Tour** in the header) and paste into your project chat so the assistant patches the root cause in context.
4. **Recheck & archive**: Click **Recheck fixes** on the same scope to verify closure and ensure no new findings were introduced, then export Markdown or SARIF reports as needed.

Handy chat prompts (1-click copyable in the workbench):

- `Review current Git changes for security issues with triggers, file locations, and redacted evidence`
- `Check this project for security issues and prioritize high-risk findings`
- `Fix high-risk findings from the latest security check, then recheck the same scope to confirm closure`

## Before you start

Betterleaks, Semgrep CE and OSV are optional additions; a scan does not prove the absence of vulnerabilities.

Configuration, detailed tools and troubleshooting: [full reference](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/REFERENCE.en.md).

## Plugin updates

Check updates at the bottom of the workbench or native plugin details. Automatic checks are on by default; **automatic installation is off**. You choose whether to install and when to restart. Suite-managed components update with their bundle. [Update behavior](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/REFERENCE.en.md).

## Documentation

- [Full usage, configuration and limits](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/REFERENCE.en.md)
- [Release notes](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/CHANGELOG.md)
- [Validation scope and history](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/VALIDATION.md)

## Feedback and contributions

If the plugin helps, a Star makes it easier for others to discover. Report problems or suggest improvements in [Issues](https://github.com/STARDUSTLC666/dsh-code-security/issues); code and documentation [PRs](https://github.com/STARDUSTLC666/dsh-code-security/pulls) are welcome. Include versions and reproduction steps, and remove credentials from reports.

## License

[MIT](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/LICENSE)

<a id="what-it-does"></a>
<a id="requirements-and-configuration"></a>
