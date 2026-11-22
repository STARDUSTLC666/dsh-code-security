# 更新记录

## 0.10.0 (2026-11-22)

- **全新默认「精密雷达态势仪（OP-SEC Hardware Instrument Cockpit）」工作台视图**：
  - `检查结果` 默认呈现 Braun / Teenage Engineering 灵感硬件仪器台：暖陶瓷机身（深色宿主自动柔和适配为阳极深板岩金属）、凹陷深橄榄 OLED 态势屏（左侧安全态势仪表盘、总数/新增计数、范围与规则遥测；右侧 **24 点可点击 LED 雷达矩阵**，点击任意亮灯立即定位下方代码显微舱）。
  - 新增 3D 物理按压机械键帽控制行（`全部 / 严重 / 高 / 中 / 低 / 新增` 带 LED 指示灯筛选键、朱红 `▶ 检查代码`、`复查修复`、`◀ 上一条 / 下一条 ▶` 步进器）与 **代码显微检视舱**（`文件:行` 徽章、故障高亮代码切片、CWE 修复建议及机械操作键），顶部支持 **`仪器台 / 列表`** 一键切换回经典双栏视图。
  - 修复 `1280×800` 中窄窗口下顶栏项目选择器与标签页挤压重叠问题，完整保留 `0.9.7` 窄屏与弹窗适配。
  - 全面更新 5 步 `? 引导`（`CoachmarkTour`）、中英文使用流程文档、流程示意 SVG 与实机截图。
- **New Default OP-SEC Hardware Instrument Cockpit View**:
  - **Findings** now defaults to a Braun / Teenage Engineering inspired hardware cockpit: warm ceramic bezel (auto-adapting to anodized dark slate in dark mode), recessed dark-olive OLED telemetry display (Security Posture gauge, live scope & active rule telemetry, plus an interactive **24-dot LED Scan Matrix** where clicking any lit LED selects that finding immediately), 3D mechanical severity filter & transport keycaps (`▶ Scan code`, `Recheck fixes`, `◀ Prev / Next ▶`), and a **Code Microscope Inspection Bay** with fault-highlighted code slices, CWE remediation guidance, and 1-click actions — with a compact **`Cockpit / List`** toggle to return to classic split view anytime.
  - Eliminated header tab / project-selector overlap at `1280×800` viewports while preserving `0.9.7` narrow-panel responsiveness.
  - Updated the 5-step `? Tour`, Chinese/English usage flows, workflow SVGs, and README screenshots.

## 0.9.7 (2026-11-21)

- 修复窄工作台中项目选择器挤压操作按钮并将刷新/外观控件裁出可见区域的问题；扫描按钮在小窗口自动换行且保持可操作宽度。
- 窄窗口中的安全工作台确认弹窗使用视口宽度布局，避免依赖项按钮与操作被边缘裁切。
- Fix the security workbench header overflowing narrow host panels: project selection, scan actions and appearance controls now wrap into visible rows.
- Size the unsaved-settings confirmation dialog to the narrow viewport so its actions remain visible.

## 0.9.6 (2026-11-20)

- 升级共享更新组件至 0.2.10，移除跨插件右下角浮动提醒，保留工作台及插件详情页更新控制。

- 扫描源码、依赖与差异时按块读取并重新校验实际字节预算与取消；证据/外部诊断先脱敏再截断，保留既有基线指纹。

## 0.9.5 (2026-11-20)

- 更新共享更新组件至 0.2.9：取消在最终空闲检查期间到达时，不再启动插件更新；补齐提前取消及失败响应流的清理。扫描规则、权限及数据格式保持兼容。


- 修复显式扫描/依赖目标通过父目录联接或越界路径读取工作区外文件的问题；在读取文件或写状态前拒绝，保留工作区内绝对路径和正常路径折叠。

## 0.9.4 (2026-11-20)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.7`：对话页「有新版本」提醒浮卡支持无交互 15 秒自动收起（悬停、聚焦、查看记录或确认弹窗时自动暂停，安装成功提示 6 秒收起，安装中/失败/需要重启仍保持常驻不隐藏）。
- Upgrade `@stardustlc/dsh-updates` to `0.2.7`: auto-dismiss idle update reminder cards after 15s and silent complete cards after 6s while pausing on hover/focus/notes/dialogs and keeping active, failed, or restart-required cards pinned.

## 0.9.3 (2026-11-20)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.6`：端到端验收修复浮卡与日历按钮重叠、详情页/工作台挂载时瞬时让位及 `package-moved` / 包管理器报错诊断文案，继续保持过期检查自动刷新与 `bundle-in-use` 指导。
- Upgrade `@stardustlc/dsh-updates` to `0.2.6`: E2E-verified fixes for floating Calendar FAB clearance, immediate reminder yield on native detail/workbench mount, and clearer `package-moved` / package-manager error messages, alongside auto-refresh and `bundle-in-use` guidance.

## 0.9.2 (2026-11-20)

- 在备用弹窗中，子菜单优先处理 Escape，避免误关外层表单。
- Let nested controls consume Escape before closing a fallback dialog.

## 0.9.1 (2026-11-19)

- 修复工作台弹窗及备用控件重挂载造成的失焦；原 issue #2 的遮挡场景仍待有效复现信息，不将此版本宣称为该遮挡问题的确认修复。
- Preserve modal/control identity and focus. The separately reported occlusion scenario still needs reproduction details.

## 0.9.0 (2026-11-18)

- **Workbench UI v3 + 13 套明亮工作台主题 + 8 套双层中英字体搭配**：
  - 统一 48px 单行顶栏、滑动标签指示器、可拖拽记忆宽度的分栏分割线、主题色微光骨架屏与列表行悬浮快捷操作（复制位置 / 打开文件）。
  - 扩展至 **13 套明亮主题**（新增晴昼琉璃、护眼墨水屏、工程晒图、波普孔版、千禧复古、宋韵朱砂、晴空水晶、铅字晨报 `gazette`）与 **8 套 Windows 验证双层中英字体搭配**（默认 `arcade` 幼圆等宽 `Cascadia Code + YouYuan`，支持 `auto` 跟随风格专属字、`songkai`、`fangsong`、`poster`、`retro98`、`serif`、`modern` 独立切换与弹层同步）。
  - 修复 `CoachmarkTour` 对带冒号 `React.useId()` 选择器的安全转义。
- **Workbench UI v3 + 13 Bright Themes + 8 Dual-Layer Chinese/Latin Font Pairings**:
  - Unified 48px single-row header, sliding tab indicator, persistent resizable split panes, theme-tinted shimmer skeletons, and row hover quick actions (Copy location / Open file).
  - Expanded to **13 bright presets** (`harness`, `cream`, `claude`, `pixel8bit`, `mint`, `glass`, `eink`, `blueprint`, `risograph`, `win98`, `songhui`, `frutiger`, `gazette`) and **8 Windows-verified dual-layer font pairings** with `arcade` (YouYuan Mono) as default and independent `[data-dsh-font]` switcher synced across portaled menus and dialogs.
  - Safely escape colon-containing `React.useId()` selectors in `CoachmarkTour`.

## 0.8.7 (2026-11-18)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.5`：独立安装插件详情页底栏去重（保留组合包组件委派与对话页热更新卡片），补齐 `bundle-in-use` 组合包占用提示说明，并在检查结果过期或远端版本变更时自动刷新元数据，彻底消除 `check-first` 卡顿。
- Upgrade `@stardustlc/dsh-updates` to `0.2.5`: deduplicate standalone native plugin detail footers while keeping Suite delegation and in-chat reminder cards, surface clear `bundle-in-use` guidance, and automatically refresh expired update checks without `check-first` stalls.

## 0.8.6 (2026-11-18)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.4`：对话页新增一键热更新提醒卡片，自动检查周期缩短至 6 小时，手动热更新后可顺手开启包含兼容功能小版本的空闲自动更新。
- Upgrade `@stardustlc/dsh-updates` to `0.2.4`: add an actionable in-chat hot-update reminder card, 6-hour background update checks, compatible minor+patch idle auto-updates, and a post-update opt-in prompt.

## 0.8.5 (2026-11-18)

- **交互式聚光灯 + 自动转向箭头分步引导（Coachmark Tour）**：顶栏新增 `? 引导` 按钮，首次进入工作台温和引导一次（跳过或完成后写入 `localStorage` 永久不再打扰），支持真实按钮聚光灯高亮、视口边缘自动翻转小箭头、键盘 `←`/`→`/`Esc` 导航与气泡内一键复制对话指令；移除占高度的静态折叠流程说明框。
- **Interactive Spotlight + Directional Arrow Coachmark Tour**: add a header **? Tour** trigger with one-time non-intrusive first-visit onboarding (`localStorage` persisted), live target spotlighting, auto-flipping directional arrows, keyboard `←`/`→`/`Esc` navigation, and inline 1-click prompt copy, replacing the static collapsible workflow box.

## 0.8.4 (2026-11-18)

- 同步 `@stardustlc/dsh-updates` 0.2.3：侧边栏工作台平时默认隐藏底部更新栏（零高度占用），仅在检测到兼容新版本或执行更新时浮现单行精简提示条；完整更新设置与检查入口统一保留在 DSH「插件」详情页底部。
- Sync `@stardustlc/dsh-updates` 0.2.3: keep the sidebar workbench update footer hidden by default when up-to-date, surfacing a single-line compact strip only for actionable updates or active jobs while retaining full controls in native Plugin Details.

## 0.8.3 (2026-11-18)

- 未扫描项目空状态内置「检查代码 / 检查改动」主操作按钮，漏洞卡片新增一键「复制修复指令」，并补齐可折叠四步安全巡检闭环指引与场景指令。
- Add inline **Scan code** and **Check changes** primary CTAs inside unscanned project states, contextual **Copy fix prompt** actions on finding cards, and a collapsible 4-step security workflow guide.

## 0.8.2 (2026-11-18)

- 更新区底部新增克制、无打扰的 GitHub 点赞与问题反馈快捷链接，并完善中英文检索关键词。
- Add subtle, non-intrusive GitHub Star and issue feedback links in the update footer, and expand search keywords.

## 0.8.1 (2026-11-18)

- 同步 `@stardustlc/dsh-updates` 0.2.1：恢复 Suite 整包统一更新（移除独立拆包迁移），保留整包与独立插件的原地热更新与失败自动回滚。
- Sync `@stardustlc/dsh-updates` 0.2.1: restore unified Suite bundle updates (removing standalone conversion) while retaining in-place hot reload and automatic rollback.

## 0.8.0 (2026-11-18)

- 升级至 Workbench UI v2 并深度适配 DeepSeek Harness `>=0.2.2-rc.3`：按需接入宿主组件（`Button`、`Input`、`Checkbox`、`Menu`、`Modal`）并保留独立测试回退，遵循窗口顶部与侧栏留白变量及弹层拖拽排除区域，支持 Cordis 4 `ctx.effect` 热重载卸载清理。
- 新增五套共享界面风格切换（原生清透、米白纸感、Claude 暖书卷、8-Bit 像素、晴空薄荷），默认明亮通透，宿主深色模式下采用柔和石板色底面，并与弹层菜单实时同步；补齐小按钮微交互动画与减少动态效果无障碍适配。
- Upgrade to Workbench UI v2 for DeepSeek Harness `>=0.2.2-rc.3`: integrate lazy host UI primitives with standalone fallbacks, window-chrome clearances, overlay drag exclusions, and Cordis 4 `ctx.effect` unload cleanup.
- Add 5 synced `[data-dsh-style]` theme presets (`harness`, `cream`, `claude`, `pixel8bit`, `mint`) with airy daylight defaults, soft-slate dark mode adaptation, tactile button/icon micro-animations, and `prefers-reduced-motion` support.

## 0.7.14 (2026-11-17)

- 版本与更新随当前工作台内容滚动，展开更新选项时保留工具设置和检查结果的可操作空间。
- Scroll the update controls with the active workbench tab so expanded options leave room for settings and findings.

## 0.7.13 (2026-11-17)

- 在工作台单独检查和安装兼容版本。自动安装默认关闭，可为该插件开启空闲时的稳定补丁更新。
- Check and install compatible versions separately from the workbench. Automatic installation is off by default. Enable it for this plugin to apply stable patches while idle.

## 0.7.12 (2026-11-14)

- 适配 DSH 0.2.2-rc.3：最低 Harness 版本声明提升至 0.2.2-rc.3，运行时代码未变。
- Support DSH 0.2.2-rc.3: raise the minimum Harness declaration to 0.2.2-rc.3; runtime code is unchanged.

## 0.7.11 (2026-11-06)

- 结果顶部显示最近检查时间、范围和方式，说明保存记录与“新增”命中的含义，避免把旧报告误认为升级后新发现的漏洞。
- 高熵检测区分带摘要字段名的 SHA 摘要、版本化用途标识与 URL 路径；同样内容放入凭据字段或未知上下文时仍需核对，测试目录不会自动豁免。
- 私钥基线指纹绑定完整材料；替换或新增私钥后重新提示，报告仍全程脱敏。旧版仅按 BEGIN 行保存的私钥基线需重新核对一次。
- Show saved scan time and scope, reduce structured public-metadata false positives, and bind private-key acceptance to full material without exposing it.

## 0.7.10 (2026-11-04)

- 同步共享界面：嵌入设置时继承宿主底色，输入框跟随主题，空状态保持可读宽度；新版 DSH 可显示插件设置图标。
- Align embedded surfaces, themed inputs, readable empty states and optional native settings icons.


## 0.7.9 (2026-11-03)

- 工作台展示 secure_health 的检查项；切换项目显示载入反馈；使用说明补齐排错。
- The workbench shows secure_health checks, switching projects shows loading feedback, and troubleshooting docs are added.
- 同步共享 workbench-ui v1.1：Page 外的 Empty / Dialog / Status 自带样式与 `.dshw` 主题作用域，Status 新增 warn 色调。
- Sync workbench-ui v1.1: Empty / Dialog / Status now carry their own styles and `.dshw` theme scope outside Page, and Status gains a warn tone.

## 0.7.8 (2026-10-30)

- 重整中英文首页：用途、三步流程图、安装入口与操作示例；详细配置与边界集中到完整说明。
- 保留下载统计、独立更新选择、问题反馈和贡献入口；原封面与运行功能保留。
- Refresh bilingual landing pages, workflow artwork, quick starts and reference navigation.


## 0.7.7 (2026-10-30)

- 原生插件列表与详情新增专门生成的鲸鱼娘图标：大头像、独立功能符号、透明留白，适合 30 / 36 px 显示；原封面保留。
- Add purpose-made whale-girl artwork with a distinct function emblem, transparent padding and small-size readability; preserve the original cover.


[返回简介](README.md) · [使用说明](docs/USAGE.md) · [验证记录](docs/VALIDATION.md)

[历史英文记录](docs/CHANGELOG.en.md)

## 0.7.6 (2026-10-29)

- 补齐中英文使用流程：准备、入口、具体操作与结果核对；新增累计 npm 下载徽章并保留月统计。
- Add practical getting-started workflows and lifetime npm download badges alongside monthly counts.

## 0.7.5 (2026-10-29)

- 同步仓库与 npm 的简明介绍、中英文 README 和反馈入口；本次为文档与包元数据更新。
- Sync npm descriptions and both README guides with the repository, including issue and pull-request links.

## 0.7.4 (2026-10-28)

- 补全 Git 属性隔离：屏蔽全局属性文件和系统属性；info/attributes 含有效规则时停止 diff 并提示未完成，可改用全文件扫描。
- 防止 clean 过滤器或 binary 属性隐藏危险文本，linked worktree 同样检查 common Git 目录；失败时保留先前扫描记录。

## 0.7.3 (2026-10-27)

- 修复分批更新时的新旧更新控件混用：保留原页面、草稿与安装保护，空闲后接管旧控制器，兼容旧入口。

## 0.7.2 (2026-10-27)

- 更新控件移至原有工作台或原生插件详情页底部；更新记录与选项原地展开，移除独立更新菜单与页面。
- 保留原页面操作与草稿，自动安装默认关闭；安装前确认，遇到未保存修改或运行任务时暂停。

## 0.7.1 (2026-10-27)

- Keep this component's own update entry visible when installed transitively through Suite. Confirm whole-Suite update scope before opening its controls.
- Keep automatic installation off by default and preserve independent installation behavior.

## 0.7.0 (2026-10-26)

- Add this plugin’s own update controls and independent preferences. Automatic installation stays off until explicitly enabled.
- Confirm manual installs, preserve local sources and disabled state, pause for tasks or unsaved changes, and use native DSH recovery without forced restarts.
- Require the public DSH 0.2.1-rc.3 update APIs; Suite components remain managed through Suite.

## 0.6.1（2026-10-26）

- 移除旧 Git 不支持隔离属性时的无保护重试；明确返回检查未完成，并建议升级 Git 或改用全文件扫描，避免执行仓库过滤器后仍误报通过。
- Windows 回归 82 项通过、3 项跳过；宿主与未验收范围见[本次记录](docs/validation-0.6.1.md)。

## 0.6.0（2026-10-25）

- 安全检查主工作台，问题、证据、覆盖与工具配置分开；切项目保护未保存设置，并通过原生会话打开文件。
- 提供 DSH 原生侧栏入口，保留设置页；统一中英、深浅色、窄屏、键盘焦点与真实空/失败状态。
- 浏览器源码移至 templates/client.js、templates/panels/ 与共享组件，独立构建为 lib/client.js；移除重复的首次引导。
- 官方 DSH 0.2.1-rc.3 Web 逐项实际操作验收，账户模拟和未验收范围见 [工作台说明](docs/WORKBENCH.md)。

## 0.5.1（2026-10-20）

- 修复审查外来仓库时可能执行对方 `.git/config` 命令的问题：所有 git 调用加上 `-c core.fsmonitor=false`，`secure_diff` 与 `secure_scan` 的 `includeUntracked` 都不再触发被扫仓库的 fsmonitor 命令
- 修复 `filter.<驱动>.clean` 能把新增的危险行从 diff 里删掉、让检查误判「通过」的问题：diff 改用 `--attr-source=<空树>`（Git 2.40+），工作区 `.gitattributes` 不再生效，clean 过滤器既不执行也不参与内容比较；更老的 Git 退回只关闭 fsmonitor
- 新增 4 项回归测试：fsmonitor 不执行、clean 过滤器不执行且藏不掉 `eval(input)`、`--attr-source` 参数、`includeUntracked` 的 `ls-files` 路径；同步更新既有的 argv 断言

## 0.5.0（2026-10-17）

- 设置面板顶部新增「首次使用」分步引导：一次只讲一步，支持上一步/下一步/跳过，看完记在本机不再出现。
- 引导内容与该插件的实际用法一致；可在开发者工具里清掉 `dsh-first-run:dsh-code-security:v1` 重新查看。
## 0.4.1 (2026-10-15)

- 修复同一行同时命中高熵密钥和其他安全规则时，其他规则的证据仍带出原始字符串的问题；所有证据统一使用同一套高熵脱敏判断，也覆盖截断的字符串。
- 回归检查模型返回值、历史、已接受基线、SARIF 与 Markdown，保留原始证据指纹用于跟踪。

## 0.4.0 (2026-10-15)

- 增加 DSH 中英文设置工作台：项目选择、扫描/增量/复查、覆盖情况、问题筛选、脱敏证据、复制位置与报告下载。
- 可选接入 Betterleaks 1.9.0、Semgrep CE 1.181.0 和 OSV-Scanner 2.7.0。扫描使用隔离快照，不执行项目安装/构建脚本；密钥在线验证关闭，OSV 联网查询需要明确选择。
- 增加自有 MIT 数据流规则和可靠的 DOMPurify 绑定判断，区分模式提示与数据流证据。增强差异扫描读取暂存区/工作树实际内容，仅报告涉及新增行的问题。
- 统一脱敏输出、历史、基线和导出，迁移旧记录时保留稳定指纹。修复 PEP 621 等 Python 依赖解析，错误/动态声明不再被当成空的安全清单。
- 可按项目开启每轮结束后的安静增量检查，包含未跟踪文件、取消过期任务，仅为后续对话提供新增高风险提示；手动结果独立保存。
- 复查保留上次范围与引擎，检查不完整时不判定关闭；成功复查更新当前报告。增加 Windows/Linux、Node 22/24 与固定原生引擎的 CI 检查。

## 0.3.8 (2026-10-12)

- 修复增量扫描遗漏中文/转义文件名、私钥、`.env` 敏感项和禁用依赖审计配置的问题，报告真实证据行号。
- 结合有限上下文识别已有豁免和跨行配置，仅报告涉及新增行的问题；校验差异块行数，格式错误或不完整时明确报错。
- 全量、单文件与增量扫描统一排除策略和工作区相对路径，兼容旧记录中 `./` 前缀的基线指纹。
- 固定 Git 输出格式与当前工作区范围，禁用外部 diff/textconv，拒绝被误当成 Git 选项的基线参数和错误类型的 `staged` 参数。
- 补充隔离 Git 回归场景；范围、兼容注意事项及后续计划见[本轮迭代记录](docs/ITERATION-2026-10-12.md)。

## 0.3.7 (2026-10-05)

- 扫描、策略、报告和 git diff 使用当前会话工作区；支持取消并跳过目录联接。锁定合并历史与基线写入，损坏记录和无效策略明确报错并保留原文件。

## 0.3.6 (2026-09-28)

- 更新官方 Harness 0.2.0-rc.1 的兼容声明和共同加载验证；运行时代码未变。验证范围见[验证记录](docs/VALIDATION.md)。

## 0.3.5 (2026-09-28)

扫描参数写错时明确报错，避免把 `paths`、`files` 或空目标误当成扫描整个工作区。修复标准模式中结果卡片误显示“0 个文件、未通过”的问题；文件数量、结论与问题列表现在使用实际扫描结果。

## 更早的改动

完整历史可查阅 [GitHub 提交记录](https://github.com/STARDUSTLC666/dsh-code-security/commits/master)。
