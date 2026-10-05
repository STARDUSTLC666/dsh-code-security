# 更新记录

[返回简介](README.md) · [使用说明](docs/USAGE.md) · [验证记录](docs/VALIDATION.md)

[历史英文记录](docs/CHANGELOG.en.md)

## 0.3.7 (2026-10-05)

- 扫描、策略、报告和 git diff 使用当前会话工作区；支持取消并跳过目录联接。锁定合并历史与基线写入，损坏记录和无效策略明确报错并保留原文件。

## 0.3.6 (2026-09-28)

- 更新官方 Harness 0.2.0-rc.1 的兼容声明和共同加载验证；运行时代码未变。验证范围见[验证记录](docs/VALIDATION.md)。

## 0.3.5 (2026-09-28)

扫描参数写错时明确报错，避免把 `paths`、`files` 或空目标误当成扫描整个工作区。修复标准模式中结果卡片误显示“0 个文件、未通过”的问题；文件数量、结论与问题列表现在使用实际扫描结果。

## 更早的改动

完整历史可查阅 [GitHub 提交记录](https://github.com/STARDUSTLC666/dsh-code-security/commits/master)。
