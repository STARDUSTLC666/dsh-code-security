# dsh-code-security 验证记录

本页整理原 README 的历史验证说明，保留当时的版本、日期与范围。自动测试、启动检查、浏览器操作和真实服务验收分别记录，不能相互替代。更详细的版本验收文件仍保留在仓库中。

## 0.4.1（2026-10-15）

79 项 Windows 测试全部通过，包含下列三个真实原生引擎。新增同一行同时命中注入与高熵密钥的回归，确认其他规则的证据、返回值、历史、基线和导出也不再带出原值；截断的字符串使用相同判断。其余功能与客户端沿用 0.4.0 的验收范围。

## 0.4.0（2026-10-15）

本地环境：Windows、Node 24.16.0、官方 npm DSH 0.2.1-alpha.3。全部使用 E 盘隔离目录与合成数据，没有复制用户密钥或修改前台桌面窗口。

- **78 项 Windows 测试通过，无跳过**，包含真实 Betterleaks 1.9.0、Semgrep CE 1.181.0、OSV-Scanner 2.7.0。普通未安装原生引擎的测试运行会明确跳过这三项，不能等同于原生验收。
- **真实原生引擎**：合成令牌/占位符和脱敏、局部变量传播、参数化 SQL、DOMPurify 导入与同名参数、传递依赖的离线公告/修复版本/缺库/损坏锁文件。OSV 另覆盖 Git 忽略了临时目录的真实仓库，避免跳过快照后产生空结果。
- **官方 DSH 网页端实际操作**：项目登记与空态、检查工具、增强扫描、脱敏证据、SARIF 下载、离线漏洞编号/修复版本、缺失程序、取消、修复复查、中文/英文切换、390px 窄屏。浏览器控制插件不可用，使用独立的无头系统 Chrome 与 Playwright；控制台/页面错误为 0，无横向溢出。
- **自动检查回归**：默认关闭、未跟踪文件、手动结果隔离、已接受基线过滤、新一轮取消、过期事件竞态及被动上下文注册；不启动模型或擅自接受基线。
- **发布包安装**：用官方 CLI 将最终本地 tarball 安装到新的隔离 profile，核对版本、十个工具、PEP 621、脱敏、SARIF、客户端及三份规则文件。公开 registry 与 CI 产物的一致性由独立发布流程核对。

**验收边界**：本轮未操作原生桌面窗口；网页版结果不记作桌面端验收。文件预览仅验证了未打开对应聊天时的明确提示，没有完成活动聊天中的文件跳转。已知漏洞在线查询曾在真实 OSV 程序中检查样例依赖；离线匹配使用合成数据库，不代表完整公共漏洞库覆盖或准确率测评。未调用用户的真实模型完成一轮任务。

CI 新增 Windows/Linux × Node 22/24，以及两种系统上的固定原生引擎任务；每个运行结果可在 [Actions](https://github.com/STARDUSTLC666/dsh-code-security/actions) 独立查看。扫描通过、相关功能测试通过、包已发布和桌面操作通过是不同结论。

## 原中文记录

2026-09-13 修复：保留宿主 `subprocess.spawn` 的服务对象，避免方法独立传递后因 `this` 丢失而报错。该路径已在隔离宿主进程服务中实测通过。`secure_diff` 已通过真实宿主进程服务读取隔离 Git 仓库差异，正确识别变更文件和新增行。

## Original English record

2026-09-13 fix: retain the service receiver when calling `subprocess.spawn`, preventing failures caused by passing the method as an unbound callback. Verified against a real isolated host subprocess service. `secure_diff` reads a real isolated Git repository through the host subprocess service and reports the changed file and added line.

## 0.3.6 原验证说明

验证宿主：官方源码构建的 Harness `0.2.0-rc.1`（commit `407e65c8`）+ Node `24.16.0`（2026-09-28）。31 项插件测试在隔离环境全部通过；同一个宿主里 18 个插件共同加载，注册 10 个工具，工具 schema 与健康检查契约通过。本轮未启用真实端口与外部服务。
