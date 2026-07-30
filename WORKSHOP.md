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

Replace only `<YOUR_MOBIUS_USER_NAME>`. In ClickClack `#general`, mention your
own bot, paste the prompt in the same message, and move the remaining
conversation into that message's thread.

```text
开始 Hourly Dashboard Workshop 阶段二。

我的 Mobius 用户名：<YOUR_MOBIUS_USER_NAME>
父 Issue：THU-1
Repo：https://github.com/Yongcheng123/hourly-dashboard-practice
PR Base：integration/workshop

请持续执行到 PR 创建完成；只有缺少 Access 或遇到真实阻塞时才问我。

1. 刷新 THU-1 的直接子 Issues，随机认领一个满足以下条件的任务：
   无 Assignee、状态为 Todo/Backlog、没有他人的 TAKEN 评论。
   将它分配给我的 Mobius 用户名，改为 In Progress，评论 TAKEN，并重新读取确认。
   如果被别人抢先认领，选择另一个；没有可用任务时停止。

2. 阅读该 Issue 的完整描述和 Acceptance Criteria，以及 Repo 中的
   WORKSHOP.md 和 CONTRIBUTING.md。Issue 是允许修改文件和验收范围的权威来源。
   在 Mobius 评论 PLAN，然后直接开始开发。

3. Fork 或 Clone Repo，以 upstream/integration/workshop 为起点创建：
   feat/<ISSUE_ID>-<SHORT_NAME>
   只修改 Issue 允许的文件，不扩大任务范围。

4. 完成功能并运行 npm run lint 和 npm test；只在允许范围内修复问题。

5. Commit、Push，并向
   Yongcheng123/hourly-dashboard-practice:integration/workshop 创建 PR。
   PR 标题必须包含 Mobius Issue ID。

6. 在 Mobius 评论 READY，包含 Branch、PR URL、修改文件、测试结果和风险，
   然后把 Issue 改为 In Review。
   遇到阻塞时先评论 BLOCKED，再向我说明需要的 Access 或决策。

7. 最后只报告 Issue、Branch、PR、测试结果和人工检查事项。不要自行合并 PR。
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
