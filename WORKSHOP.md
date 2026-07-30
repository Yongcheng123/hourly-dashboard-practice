# 阶段二——从自动认领 Issue 到 Pull Request

Target duration: 35–40 minutes of a one-hour workshop.

## Preconditions

- your Hermes bot passed the Phase 1 `PONG` test in ClickClack
- Hermes has GitHub and Mobius access after you approve it
- you know your exact Mobius display name

Participants do not manually choose or assign issues. Their Hermes finds an
eligible child under `THU-1`, claims it, keeps Mobius synchronized, implements
the feature, runs tests, and opens the pull request.

## 参与者 Prompt

Replace only `<YOUR_MOBIUS_USER_NAME>` and paste the whole block into your
private Hermes Studio conversation:

```text
你是我在 Hourly Dashboard Workshop 中的开发 Agent。

我的 Mobius 用户名：<YOUR_MOBIUS_USER_NAME>
Mobius 团队：周四练习（THU）
父 Issue：THU-1
代码仓库：https://github.com/Yongcheng123/hourly-dashboard-practice
参与者 PR 的 Base 分支：integration/workshop

请替我完整执行以下流程：

1. 确认你可以读取和更新 Mobius，并且可以使用 GitHub。如果缺少权限，
   立即向我申请 Access；我批准后继续执行，不要静默停止。
2. 读取 THU-1 及其所有直接子 Issue。可认领的 Issue 必须没有 Assignee、
   状态为 Todo 或 Backlog，并且没有其他参与者留下的 TAKEN 评论。
3. 在认领前立即刷新列表，随机选择一个符合条件的 Issue，分配给我提供的准确
   Mobius 用户名，改为 In Progress，并添加包含 Owner、当前 Bot 和时间的
   TAKEN 评论。
4. 验证 Assignee 和状态。如果其他参与者抢先认领，不要覆盖对方，改选另一个。
   如果没有可用 Issue，停止并告诉我。
5. 阅读完整 Issue 和 Acceptance Criteria，直接添加包含允许文件、方案和风险的
   PLAN 评论，不要让我手动填写。
6. Fork 或 Clone 仓库，以 upstream/integration/workshop 为起点创建
   feat/<CLAIMED_ISSUE_ID>-<SHORT_NAME>。
7. 只修改 Issue 允许的文件；除非明确允许，不要修改 DashboardShell、
   RawHourlyTable、SourceComparisonTable、globals.css、Chime 数据文件、
   共享 data/types、package.json 或 lockfile。
8. 使用仓库内置的三张 Chime 固定快照完成功能；不连接实时 API，不伪造
   Agent_B 缺失小时，并保持响应式和可访问。
9. 如遇阻塞，先在 Mobius 添加 BLOCKED 评论，再向我申请 Access 或决策。
10. 运行 npm run lint 和 npm test，并在允许范围内修复失败项。
11. Commit、Push，并向
    Yongcheng123/hourly-dashboard-practice:integration/workshop 创建 PR；
    PR 标题必须包含 Mobius Issue ID。
12. 添加包含 Branch、PR URL、文件、测试和风险的 READY 评论，把 Issue 改为
    In Review；不要让我手动填写。
13. 最后只报告 Issue、Branch、PR、测试和需人工检查的事项。绝不自行合并。
```

## Reserved host task

`THU-7` (Analysis insights) is the most time-consuming module and is already
assigned to `Yongcheng Mu`. Other participants' agents skip it because it has an
assignee.

## Review Agent handoff

When participant PRs are ready, the host grants the Review Agent GitHub and
Mobius access and gives it [REVIEW_AGENT_PROMPT.md](./REVIEW_AGENT_PROMPT.md).

The Review Agent merges compatible PRs into `integration/workshop`, verifies the
combined dashboard, updates the matching Mobius issues, and opens one final PR
from `integration/workshop` to `main`. The host owns final approval.
