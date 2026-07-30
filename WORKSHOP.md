# 阶段二——从自动认领 Issue 到 Mobius Patch

Target duration: 35–40 minutes of a one-hour workshop.

## Preconditions

- your Hermes bot passed the Phase 1 `PONG` test in ClickClack
- Hermes has Mobius, Terminal, file-write, and network access
- you know your exact Mobius display name

Participants do not manually choose or assign issues. Their Hermes finds an
eligible child under `THU-1`, claims it, keeps Mobius synchronized, implements
the feature, runs tests, and uploads a Git Patch to Mobius. Participants do not
need GitHub authentication or a PAT.

## 参与者 Prompt

Replace only `<YOUR_MOBIUS_USER_NAME>`. In ClickClack `#general`, mention your
own bot, paste the prompt in the same message, and move the remaining
conversation into that message's thread.

```text
开始 Hourly Dashboard Workshop 阶段二。

我的 Mobius 用户名：<YOUR_MOBIUS_USER_NAME>
父 Issue：THU-1
Repo：https://github.com/Yongcheng123/hourly-dashboard-practice
基线分支：integration/workshop
交付方式：Mobius Patch

请持续执行到 Patch 上传并将 Issue 改为 In Review；只有缺少 Access 或遇到
真实阻塞时才问我。不要索取 GitHub Token。

1. 刷新 THU-1 的直接子 Issues，随机认领一个满足以下条件的任务：
   无 Assignee、状态为 Todo/Backlog、没有他人的 TAKEN 评论。
   将它分配给我的 Mobius 用户名，改为 In Progress，评论 TAKEN，并重新读取确认。
   如果被别人抢先认领，选择另一个；没有可用任务时停止。

2. 阅读该 Issue 的完整描述和 Acceptance Criteria，以及 Repo 中的
   WORKSHOP.md 和 CONTRIBUTING.md。Issue 是允许修改文件和验收范围的权威来源。
   在 Mobius 评论 PLAN，然后直接开始开发。

3. 匿名 Clone 公开 Repo，以 origin/integration/workshop 的最新 Commit 为起点，
   记录准确的 Base Commit SHA，并创建本地分支：
   feat/<ISSUE_ID>-<SHORT_NAME>
   只修改 Issue 允许的文件，不扩大任务范围。

4. 完成功能并运行 npm run lint 和 npm test；只在允许范围内修复问题。

5. 在本地 Commit，不要 Push。生成相对于 Base Commit SHA 的完整 Git Patch：
   <ISSUE_ID>.patch
   Patch 必须包含全部修改且只能涉及 Issue 允许的文件。生成后检查 Patch
   非空，并确认不包含 Token、凭据或其他任务的文件。

6. 使用 Mobius MCP 把 .patch 文件上传到已认领的 Issue。在 Mobius 评论 READY，
   包含 Base Commit SHA、本地 Branch、修改文件、Lint/Test 结果、风险和 Patch
   附件链接，然后把 Issue 改为 In Review。
   如果上传失败或 Patch 无法生成，先评论 BLOCKED，再向我说明真实阻塞。

7. 最后只报告 Issue、Patch 文件名、Mobius 附件链接、READY 评论 ID、测试结果
   和人工检查事项。不要 Push，不要创建或合并 PR。
```

## Reserved host task

`THU-7` (Analysis insights) is the most time-consuming module and is already
assigned to `Yongcheng Mu`. Other participants' agents skip it because it has an
assignee.

## Review Agent handoff

When participant patches are ready, the host grants the Review Agent GitHub and
Mobius access and gives it [REVIEW_AGENT_PROMPT.md](./REVIEW_AGENT_PROMPT.md).

The Review Agent downloads and applies compatible patches to
`integration/workshop`, verifies the combined dashboard, updates the matching
Mobius issues, and opens one final PR from `integration/workshop` to `main`.
The host owns final approval.
