# Phase 2 — Issue to Pull Request

Target duration: 35–40 minutes of a one-hour workshop.

## Preconditions

- your Hermes bot passed the Phase 1 `PONG` test in ClickClack
- you can sign in to GitHub
- Hermes can use Git and GitHub after you approve access
- your Hermes can read and update Mobius issues

## 1. Claim one Mobius issue

Open the Mobius project `周四练习` and parent issue `AI-2380`, choose one open child issue, assign it to
yourself, change its status to `In Progress`, and add:

```text
TAKEN
Owner: <YOUR_NAME>
Hermes bot: @<YOUR_BOT_HANDLE>
Started: <CURRENT_TIME>
```

Only one person should claim each issue.

## 2. Give Hermes the participant prompt

Replace the placeholders and paste the whole block into your private Hermes
Studio conversation:

```text
You are my implementation agent for the Hourly Dashboard workshop.

Mobius issue: <MOBIUS_ISSUE_ID>
Repository: https://github.com/Yongcheng123/hourly-dashboard-practice
Integration base: integration/workshop
My name: <YOUR_NAME>

Please:
1. Read the Mobius issue and repeat its acceptance criteria.
2. Ask me for GitHub/Mobius access if needed. Do not stop silently.
3. Fork or clone the public repository and create:
   feat/<MOBIUS_ISSUE_ID>-<SHORT_NAME>
   from upstream/integration/workshop.
4. Edit only the files allowed by the issue. Do not change shared files or
   dependencies without host approval.
5. Implement the feature with the existing fake data and visual language.
6. Run npm run lint and npm test.
7. Commit and push the branch.
8. Open a pull request to:
   Yongcheng123/hourly-dashboard-practice:integration/workshop
9. Add a Mobius comment with PR URL, changed files, tests, and any risk.
10. Move the Mobius issue to In Review.

Never merge the PR yourself. Stop and ask if credentials or approval are needed.
```

## 3. Keep Mobius synchronized

Use one of these exact comment formats:

```text
PLAN
- Files: <ALLOWED_FILES>
- Approach: <ONE_OR_TWO_SENTENCES>
- Risk: none | <RISK>
```

```text
BLOCKED
- Blocker: <WHAT_IS_MISSING>
- Need from: host | GitHub access | Mobius access | design decision
```

```text
READY
- Branch: <BRANCH_NAME>
- PR: <PR_URL>
- Changed files: <FILES>
- npm run lint: pass | fail
- npm test: pass | fail
- Notes: <OPTIONAL>
```

## 4. Pull request contract

The PR must:

- target `integration/workshop`, not `main`
- mention the Mobius issue identifier
- change only the assigned module unless approved
- pass `npm run lint` and `npm test`
- include a short screenshot or description of the visible result

## 5. Review Agent handoff

When all ready PRs are visible, the host grants the Review Agent GitHub and
Mobius permissions and gives it the prompt in
[REVIEW_AGENT_PROMPT.md](./REVIEW_AGENT_PROMPT.md).

The Review Agent merges compatible PRs into `integration/workshop`, verifies the
combined dashboard, and opens one final PR from `integration/workshop` to
`main`. The host owns final approval.
