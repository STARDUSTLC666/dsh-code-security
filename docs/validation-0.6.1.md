# 0.6.1 验证记录

日期：2026-10-26。官方 Windows 宿主：DSH 0.2.1-rc.3。

## 行为变化

移除旧 Git 不支持隔离属性时的无保护重试；明确返回检查未完成，并建议升级 Git 或改用全文件扫描，避免执行仓库过滤器后仍误报通过。

## 验证与限制

- Windows 本地：85 项，82 通过、3 跳过；没有把跳过计为通过。
- 真实当前 Git 的 fsmonitor/clean filter 防护及阳性对照通过；不支持 --attr-source 的旧 Git 通过注入执行器模拟，未安装旧二进制。3 项外部扫描器检查明确跳过。
- GitHub 的跨平台 CI 和 npm 发布完整性以该版本工作流及 registry 为准；本记录不把本地测试等同于已发布。

## English

Unsupported Git attribute isolation fails closed with upgrade or full-file-scan guidance. The previous unprotected diff retry is removed, so an incomplete scan cannot be presented as a pass.

Runtime/account limits are listed above. Synthetic peers and model adapters do not establish live account delivery or model quality.
