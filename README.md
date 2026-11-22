**简体中文** · [English](README.en.md)

# Code Security

**看清改动中的安全问题，再核对修复结果。**

DeepSeek Harness（`>=0.2.2-rc.3`）代码安全工作台：**默认「精密雷达态势仪（OP-SEC Hardware Instrument Cockpit）」** Braun / Teenage Engineering 暖陶瓷机身 + 凹陷深橄榄 OLED 态势屏 + 可交互 24 点 LED 雷达矩阵 + 3D 机械筛选键 + 代码显微检视舱（支持一键切回经典「列表」双栏视图）。覆盖本地静态扫描、Git 改动审查、依赖漏洞检查与修复复核，可选接入 Betterleaks / Semgrep CE / OSV-Scanner；内置 13 套明亮风格（深色宿主自动柔和适配深板岩金属机身）与 8 套字体搭配（默认幼圆等宽），跨插件实时同步。

[![npm](https://img.shields.io/npm/v/dsh-code-security)](https://www.npmjs.com/package/dsh-code-security) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-downloads.svg)](https://www.npmjs.com/package/dsh-code-security) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-code-security-total-downloads.svg)](https://www.npmjs.com/package/dsh-code-security)

**[安装使用](#安装) · [使用流程](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/REFERENCE.zh.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/workflow-zh-light.svg" alt="看清改动中的安全问题，再核对修复结果。 · 流程示意" width="100%">
</picture>

## 功能

- **精密雷达态势仪（默认）+ 经典列表一键切换**：`检查结果` 默认呈现硬件仪器台——左侧 OLED 态势仪表盘显示安全态势分、范围与规则遥测，右侧 **24 点可点击 LED 雷达矩阵** 按严重度点亮，点击任意亮灯立即在下方 **代码显微检视舱** 定位故障代码切片与 CWE 修复建议；支持 **`仪器台 / 列表`** 一键切换。
- 检查文件、目录或 Git 改动，并对依赖清单执行离线清单或 OSV 漏洞检查。
- 顶部支持 13 套明亮工作台风格与 8 套字体搭配（默认幼圆等宽）一键切换，配有 `? 引导` 分步导览、微交互动效与减少动态效果适配。
- 机械键帽控制行一键触发朱红 **`▶ 检查代码`**、**`复查修复`** 与 `◀ 上一条 / 下一条 ▶` 步进检视，并支持导出 Markdown 或 SARIF 报告。

<details>
<summary>查看实际示例</summary>

![workbench example](https://raw.githubusercontent.com/STARDUSTLC666/dsh-code-security/master/docs/assets/intro/screen-zh.webp)

图片来自验证环境的真实工作台界面，使用示例数据。

</details>

## 安装

在 DSH 桌面版「插件」面板安装 `dsh-code-security`。已配置命令行时也可使用：

```bash
dsh plugin --profile desktop add dsh-code-security
```

网页版把 `desktop` 改为 `web`；安装后重启对应的 DSH。宿主要求以包声明 `>=0.2.2-rc.3` 为准。

## 开始使用

推荐按 **「▶ 扫描全仓或改动 → 雷达点阵 + 显微检视 → 复制修复指令 → 复查修复闭环」** 4 步巡检流使用（随时可点右上角 `? 引导` 交互导览）：

1. **▶ 扫描全仓或改动**：从左侧栏打开「代码安全」选择工作区，直接点击朱红机械键 **「▶ 检查代码」** 或顶栏 **「检查改动」** 发起本地检查（内置规则开箱即用，无需额外安装），也可在项目聊天里用一键指令启动首次扫描。
2. **雷达点阵定位 + 显微舱看证据**：在默认 **「仪器台」** 视图下，通过左侧 OLED 查看态势分与规则遥测，点击右侧 **24 点 LED 雷达矩阵** 中任意严重度亮灯（或按「全部 / 严重 / 高 / 中 / 低 / 新增」机械键过滤与 `◀ 上一条 / 下一条 ▶` 步进），在下方 **代码显微检视舱** 核对 `文件:行` 徽章、高亮故障代码切片与 CWE 修复建议；也可点 **`仪器台 / 列表`** 切回经典双栏列表。
3. **让助手修漏洞**：点击显微舱底部的 **「复制修复指令」**（或「复制位置」「打开文件」）粘贴到项目聊天，让助手结合上下文改为参数化查询、安全命令数组或移除硬编码凭据。
4. **复查修复与报告归档**：修完后点击 **「复查修复」** 对同一范围重验问题是否关闭且无新增风险，并可一键下载 SARIF 或 Markdown 报告留存。

常用对话指令（工作台内支持一键复制）：

- `审查当前 Git 改动的安全问题，给出触发条件、文件位置和脱敏证据`
- `检查这个项目的安全问题并按高风险优先汇总`
- `根据当前安全检查结果逐项修复高风险问题，修完后对同一范围复查确认关闭`

## 开始前要知道

Betterleaks、Semgrep CE 与 OSV 是可选增强；扫描报告不能证明项目没有漏洞。

配置、完整工具与排错见[详细使用说明](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/REFERENCE.zh.md)。

## 插件更新

在工作台或原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；是否安装、何时重启由你决定。Suite 管理的组件随整包更新。[查看更新规则](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/REFERENCE.zh.md)。

## 文档

- [详细使用、配置与边界](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/REFERENCE.zh.md)
- [更新记录](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/CHANGELOG.md)
- [验证范围与历史](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/docs/VALIDATION.md)

## 反馈与贡献

如果插件帮到了你，欢迎 Star，让更多人发现它。问题和建议请提交 [Issues](https://github.com/STARDUSTLC666/dsh-code-security/issues)，也欢迎代码与文档 [PR](https://github.com/STARDUSTLC666/dsh-code-security/pulls)。反馈时附上版本与复现步骤，并移除凭据。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-code-security/blob/master/LICENSE)

<a id="依赖与配置"></a>
