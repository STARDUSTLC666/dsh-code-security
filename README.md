# dsh-code-security

[English](README.en.md)

![dsh-code-security 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/assets/cover-whale-girl.png)

对代码与 Git 改动进行本地静态安全检查，并追踪修复结果。

[![npm](https://img.shields.io/npm/v/dsh-code-security)](https://www.npmjs.com/package/dsh-code-security) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-downloads.svg)](https://www.npmjs.com/package/dsh-code-security)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-code-security/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-code-security/pulls)。

更新并重启 DSH 后，可从原生侧栏打开新版工作台，原设置入口继续保留。详见[工作台说明与验收范围](docs/WORKBENCH.md)。

## 功能

- 扫描文件、目录或 Git diff，报告规则、位置与代码证据。
- 在 DSH 设置中查看新增问题、检查覆盖、脱敏证据，并复查修复结果。
- 可选 Betterleaks 密钥检测、Semgrep CE 数据流规则、OSV 依赖漏洞审计。
- 导出 Markdown / SARIF，维护基线；可按项目开启安静的自动改动检查。

## 安装

桌面版可在「插件」面板按包名 `dsh-code-security` 安装。已配置 dsh 命令时也可使用：

```bash
dsh plugin --profile desktop add dsh-code-security
```

网页版把命令中的 `desktop` 改为 `web`。安装后重启 DSH。

## 开始使用

安装后可说：“审查当前 Git 改动的安全问题，给出位置和证据，再复查修复结果。”之后可在「设置 → 代码安全」查看项目与检查结果。

## 依赖与配置

默认仅运行本地内置规则。增强程序由用户自行安装，未安装也可使用基础检查。联网依赖审计需明确选择；自动检查默认关闭。完整检测到的密钥会在返回、保存和导出前脱敏。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-code-security/issues)

## 插件更新

需要 DSH 0.2.1-rc.3 或更新版本。每个插件在自己的页面或设置项提供检查、更新记录与确认安装入口，开关独立保存。自动检查默认开启；**自动安装默认关闭**，只有明确授权后，兼容的稳定补丁才会在空闲且没有未保存修改时安装。可单独关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 安装的组件会明确提示通过 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](LICENSE)
