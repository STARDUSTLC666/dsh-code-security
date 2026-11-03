> 完整使用说明。首页已按用途、安装和操作流程重新整理；这里保留详细参数、限制、更新规则与历史验证链接。

# dsh-code-security

[English](../README.en.md)

![dsh-code-security 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/assets/cover-whale-girl.png)

在 DSH 中检查代码与 Git 改动，查看问题证据并复核修复。内置本地静态规则，可选使用 Semgrep、Betterleaks 和 OSV；检查结果区分发现、跳过和未完成项。

[![npm](https://img.shields.io/npm/v/dsh-code-security)](https://www.npmjs.com/package/dsh-code-security) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-downloads.svg)](https://www.npmjs.com/package/dsh-code-security) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-total-downloads.svg)](https://www.npmjs.com/package/dsh-code-security)

[下载统计说明](https://github.com/STARDUSTLC666/dsh-suite/blob/npm-downloads/README.md)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-code-security/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-code-security/pulls)。

从 DSH 原生侧栏打开工作台；配置与操作边界见[工作台说明](WORKBENCH.md)。

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

1. 在目标仓库的 DSH 会话中，说明要检查整个项目还是当前 Git 改动。
2. 例如：“审查当前改动的安全问题，只报告有触发条件和代码证据的结果。”
3. 从左侧栏“代码安全”打开报告，查看文件、行号、规则与证据；可选扫描器按说明另外准备。
4. 修复后对同一范围重新检查；保留误报原因和仍待人工判断的项目。

## 依赖与配置

默认仅运行本地内置规则。增强程序由用户自行安装，未安装也可使用基础检查。联网依赖审计需明确选择；自动检查默认关闭。完整检测到的密钥会在返回、保存和导出前脱敏。

详细配置、工具参数与排错见[使用说明](USAGE.md)。从源码独立开发时，Node 要求以 [package.json](../package.json) 为准。

## 文档

- [使用与排错](USAGE.md)
- [更新记录](../CHANGELOG.md)
- [验证范围与历史记录](VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-code-security/issues)

## 插件更新

需要 DSH 0.2.1-rc.3 或更新版本。更新控件直接位于原有工作台内容末尾；没有工作台的插件，位于原生插件详情页底部。检查、更新记录和偏好在原地展开，不增加独立更新页面或设置菜单。自动检查默认开启；**自动安装默认关闭**，明确授权后才会在空闲且没有未保存修改时安装兼容的稳定补丁。开关按插件独立保存，可关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 组件在当前页面底部明确说明并操作 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](../LICENSE)
