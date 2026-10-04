# dsh-code-security

[English](README.en.md)

![dsh-code-security 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/assets/cover-whale-girl.png)

对代码与 Git 改动进行本地静态安全检查，并追踪修复结果。

[![npm](https://img.shields.io/npm/v/dsh-code-security)](https://www.npmjs.com/package/dsh-code-security) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-downloads.svg)](https://www.npmjs.com/package/dsh-code-security)

## 功能

- 扫描文件、目录或 Git diff，报告规则、位置与代码证据。
- 复扫修复结果，维护问题基线和检查策略。
- 导出 Markdown / SARIF 报告，检查依赖清单。

## 安装

桌面版可在「插件」面板按包名 `dsh-code-security` 安装。已配置 dsh 命令时也可使用：

```bash
dsh plugin --profile desktop add dsh-code-security
```

网页版把命令中的 `desktop` 改为 `web`。安装后重启 DSH。

## 开始使用

安装后可说：“审查当前 Git 改动的安全问题，给出位置和证据，再复查修复结果。”

## 依赖与配置

默认在本机执行确定性规则检查。规则覆盖与基线、策略配置见使用说明。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-code-security/issues)

## License

[MIT](LICENSE)
