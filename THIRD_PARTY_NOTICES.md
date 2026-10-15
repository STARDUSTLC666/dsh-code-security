# Third-party components

The plugin and the original rules in rules/semgrep.yml are MIT licensed.

Runtime dependencies are installed as separate npm packages and retain their own notices:

| Component | Purpose | License |
| :-- | :-- | :-- |
| @babel/parser, @babel/traverse, @babel/types 7.29.x | Parse JavaScript/TypeScript and verify sanitizer bindings | MIT |
| smol-toml 1.9.1 | Parse Python/Rust TOML manifests | BSD-3-Clause |
| proper-lockfile 4.1.2 | Serialize state and workspace-index updates | MIT |

Optional scanner executables are not bundled, copied, downloaded or installed by the plugin. The operator installs them separately:

| Program tested | Upstream license |
| :-- | :-- |
| [Betterleaks 1.9.0](https://github.com/betterleaks/betterleaks/tree/v1.9.0) | MIT |
| [OSV-Scanner 2.7.0](https://github.com/google/osv-scanner/tree/v2.7.0) | Apache-2.0 |
| [Semgrep CE 1.181.0](https://github.com/semgrep/semgrep) | LGPL-2.1 for the CE engine; other components may have separate notices |

Semgrep-maintained registry rules have separate terms. This plugin does not bundle or automatically load those rules. Its four original taint rules are supplied under the plugin's MIT license. See [Semgrep licensing](https://docs.semgrep.dev/licensing).

The CI-only installer downloads checksum-pinned public scanner releases and installs Semgrep in an ephemeral virtual environment. These test programs are not included in the npm artifact. fflate (MIT) is a development dependency used only to create a synthetic offline advisory fixture.
