# Phase 2 — Automatic Issue to Pull Request

Target duration: 35–40 minutes of a one-hour workshop.

## Preconditions

- your Hermes bot passed the Phase 1 `PONG` test in ClickClack
- Hermes has GitHub and Mobius access after you approve it
- you know your exact Mobius display name

Participants do not manually choose or assign issues. Their Hermes finds an
eligible child under `THU-1`, claims it, keeps Mobius synchronized, implements
the feature, runs tests, and opens the pull request.

## Participant prompt

Replace only `<YOUR_MOBIUS_USER_NAME>` and paste the whole block into your
private Hermes Studio conversation:

```text
You are my implementation agent for the Hourly Dashboard workshop.

My Mobius user name: <YOUR_MOBIUS_USER_NAME>
Mobius team: 周四练习 (THU)
Parent issue: THU-1
Repository: https://github.com/Yongcheng123/hourly-dashboard-practice
Participant PR base: integration/workshop

Execute the complete workflow for me:

1. Confirm that you can read and update Mobius and can use GitHub. If access is
   missing, ask me for that access and continue after approval. Do not stop silently.
2. Read THU-1 and all direct children. Eligible issues must have no assignee, be
   in Todo or Backlog, and not contain a TAKEN comment from another participant.
3. Refresh immediately before claiming. Randomly choose one eligible issue,
   assign it to my exact Mobius user name, set it to In Progress, and add a
   TAKEN comment with owner, current bot, and current time.
4. Verify the assignee and state. If someone claimed it first, do not overwrite
   them; choose another eligible issue. Stop if none remain.
5. Read the full issue and acceptance criteria. Add a PLAN comment with allowed
   files, approach, and risks. Do not ask me to post that comment manually.
6. Fork or clone the repository and create
   feat/<CLAIMED_ISSUE_ID>-<SHORT_NAME>
   from upstream/integration/workshop.
7. Edit only files allowed by the issue. Do not modify shared shell, CSS,
   data/types, package.json, or lockfile unless explicitly allowed.
8. Implement with fake data, responsive layout, and accessible behavior.
9. If blocked, add a BLOCKED comment to Mobius and then ask me for access or a
   decision. Do not ask me to write the comment manually.
10. Run npm run lint and npm test; fix failures within the allowed scope.
11. Commit, push, and open a PR to
    Yongcheng123/hourly-dashboard-practice:integration/workshop.
    The PR title must include the claimed Mobius issue ID.
12. Add a READY comment with branch, PR URL, files, tests, and risks. Move the
    issue to In Review. Do not ask me to post the comment manually.
13. Report the issue, branch, PR, tests, and human-review items. Never merge.
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
