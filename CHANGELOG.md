# 更新记录

[返回简介](README.md) · [使用说明](docs/USAGE.md) · [验证记录](docs/VALIDATION.md)

[历史英文记录](docs/CHANGELOG.en.md)

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
