# Hourly Dashboard Practice

A public, fake-data workshop project for practicing multi-person, multi-agent
delivery with Hermes, ClickClack, Mobius, and GitHub.

The repository already contains a working generic hourly dashboard. During the
workshop, each participant improves one isolated feature module, opens a pull
request against `integration/workshop`, and synchronizes progress back to the
matching Mobius issue. A Review Agent checks and combines the pull requests.

## What is already included

- a responsive hourly operations dashboard
- fake performance, conversion, pacing, alert, and device data
- eight isolated feature folders to reduce merge conflicts
- a shared integration branch: `integration/workshop`
- participant and Review Agent prompts
- build, lint, and server-render tests

No production credentials, Beeswax connection, or MCP access is required for
the one-hour exercise.

## Run locally

Requirements: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Verify before opening a pull request:

```bash
npm run lint
npm test
```

## Workshop workflow

1. Finish Phase 1 and confirm your Hermes bot is online in ClickClack.
2. Claim one Mobius issue in the `周四练习` project.
3. Fork this public repository.
4. Create your branch from upstream `integration/workshop`.
5. Ask your Hermes to implement only the files listed in your issue.
6. Push your branch and open a PR back to
   `Yongcheng123/hourly-dashboard-practice:integration/workshop`.
7. Add the PR URL and test result to the Mobius issue.
8. Wait for the Review Agent; do not merge directly to `main`.

Full instructions: [WORKSHOP.md](./WORKSHOP.md)

## Parallel module map

| Mobius | Feature | Primary file |
| --- | --- | --- |
| AI-2381 | KPI cards | `app/features/kpis/KpiCards.tsx` |
| AI-2382 | Hourly chart | `app/features/hourly-chart/HourlyChart.tsx` |
| AI-2383 | Filters | `app/features/filters/FilterBar.tsx` |
| AI-2384 | Alert panel | `app/features/alerts/AlertPanel.tsx` |
| AI-2385 | Device breakdown | `app/features/breakdown/BreakdownTable.tsx` |
| AI-2386 | Analysis insights | `app/features/insights/InsightsPanel.tsx` |
| AI-2387 | Data quality | `app/features/data-quality/DataQualityPanel.tsx` |
| AI-2388 | Workshop status and accessibility | `app/features/workshop-status/WorkshopStatus.tsx` |

### Files participants should not edit

To keep PRs mergeable, participants must not change these unless their Mobius
issue explicitly allows it:

- `app/components/dashboard/DashboardShell.tsx`
- `app/globals.css`
- `app/data/mockDashboard.ts`
- `app/types/dashboard.ts`
- `package.json` and `package-lock.json`

If a shared-file change is necessary, comment `BLOCKED` on the Mobius issue and
ask the host before changing it.

## Data architecture

The UI reads typed fake data from `app/data/mockDashboard.ts`. This deliberately
keeps the workshop independent of internal data systems. A future production
iteration can replace this file with a provider adapter backed by Beeswax MCP,
an API, or a warehouse while keeping the feature components.

## Branches

- `main`: stable workshop baseline and final accepted result
- `integration/workshop`: base branch for all participant PRs
- `feat/<mobius-id>-<short-name>`: one participant branch per issue

## License

MIT. Forking and workshop use are welcome.
