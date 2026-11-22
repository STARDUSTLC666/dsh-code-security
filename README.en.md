[简体中文](README.md) · **English**

# Code Security

**Inspect security findings and verify the fixes.**

Code security workbench for DeepSeek Harness (`>=0.2.2-rc.3`): opens by default in the **OP-SEC Hardware Instrument Cockpit** — a Braun / Teenage Engineering inspired warm ceramic deck with a recessed dark-olive OLED posture display, interactive **24-dot LED Scan Matrix**, 3D mechanical filter keycaps, and a **Code Microscope Inspection Bay** (with 1-click toggle back to classic List split view). Supports local static checks, Git diff review, dependency auditing, and fix verification with optional Betterleaks / Semgrep CE / OSV-Scanner, plus 13 synced bright styles (anodized dark-slate adaptation in dark mode) and 8 font pairings (`YouYuan Mono` default).

[![npm](https://img.shields.io/npm/v/dsh-code-security)](https://www.npmjs.com/package/dsh-code-security) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-downloads.svg)](https://www.npmjs.com/package/dsh-code-security) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-total-downloads.svg)](https://www.npmjs.com/package/dsh-code-security)

**[Install](#install) · [Workflow](#start-using-it) · [Full guide](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/REFERENCE.en.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-en-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-en-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-en-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-en-light.svg" alt="Inspect security findings and verify the fixes. · workflow illustration" width="100%">
</picture>

## Features

- **Hardware Instrument Cockpit (default) + 1-click List view**: **Findings** opens with a ceramic telemetry deck housing a recessed OLED posture gauge, active rule telemetry, and an interactive **24-dot LED Scan Matrix** — click any severity-lit LED to load its fault-highlighted evidence slice and CWE guidance into the **Code Microscope** below, or switch to classic **List** view anytime.
- Scan files, directories, or a Git diff, and audit dependency manifests offline or against OSV.
- Switch between 13 synced workbench themes and 8 font pairings (`YouYuan Mono` default) with interactive **? Tour** walkthroughs, micro-animations, and reduced-motion support.
- Mechanical keycap controls for severity filtering (`All/Crit/High/Med/Low/New`), vermilion **▶ Scan code**, **Recheck fixes**, `◀ Prev / Next ▶` stepping, and Markdown / SARIF export.

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

Follow the **4-Step Security Cockpit Loop (Scan code/diff → LED Radar & Code Microscope → Fix in chat → Recheck & archive)** (click **? Tour** in the header anytime for a guided walkthrough):

1. **Scan code or Git diff**: Open **Code security** from the sidebar, pick a workspace, and press the vermilion **▶ Scan code** keycap or **Check changes** (built-in rules work out of the box), or copy a 1-click prompt into your project chat.
2. **Locate on the LED Radar & inspect in the Code Microscope**: In the default **Cockpit** view, read overall posture on the left OLED bay, click any severity-lit dot in the **24-dot LED Matrix** (or filter with the 3D mechanical keycaps and step via **◀ Prev / Next ▶`), and examine the `file:line` badge, fault-highlighted code slice, and CWE remediation guidance below — or toggle **Cockpit / List** for the classic split view.
3. **Ask the assistant to fix**: Click **Copy fix prompt** (or **Copy location** / **Open file**) in the Code Microscope action row and paste into your project chat so the assistant patches the root cause in context.
4. **Recheck & archive**: Press **Recheck fixes** on the same scope to confirm closure with zero regressions, then export SARIF or Markdown reports as needed.

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
