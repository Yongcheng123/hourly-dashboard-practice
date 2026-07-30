# Hourly Dashboard Practice

A public, fixed-snapshot workshop project for practicing multi-person, multi-agent
delivery with Hermes, ClickClack, Mobius, and a host-managed GitHub integration.

The repository already contains a working generic hourly dashboard. During the
workshop, each participant improves one isolated feature module and uploads a
Git Patch to the matching Mobius issue. A Review Agent checks and applies the
patches, then creates the final GitHub pull request.

## What is already included

- a responsive hourly operations dashboard
- all three original Chime FeedTV sources for July 24–28, 2026
- six KPI cards, a three-source comparison, hourly chart, and full 18-metric table
- eight isolated feature folders to reduce merge conflicts
- a shared integration branch: `integration/workshop`
- participant and Review Agent prompts
- build, lint, and server-render tests

The captured snapshot needs no production credentials or live Beeswax
connection during the one-hour exercise.

## Run locally

Requirements: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Verify before generating a patch:

```bash
npm run lint
npm test
```

## Workshop workflow

1. Finish Phase 1 and confirm your Hermes bot is online in ClickClack.
2. Give Hermes your exact Mobius display name using the participant prompt.
3. Hermes randomly claims one unassigned child under `THU-1`, assigns it to
   you, moves it to In Progress, and comments TAKEN.
4. Hermes anonymously clones the repo and branches from `integration/workshop`.
5. Hermes implements only the issue-approved files and runs lint/tests.
6. Hermes creates a `.patch`, uploads it to Mobius, comments READY, and moves
   the issue to In Review.
7. The Review Agent applies accepted patches and opens the final PR.

Full instructions: [WORKSHOP.md](./WORKSHOP.md)

## Parallel module map

| Mobius | Feature | Primary file |
| --- | --- | --- |
| THU-2 | KPI cards | `app/features/kpis/KpiCards.tsx` |
| THU-3 | Hourly chart | `app/features/hourly-chart/HourlyChart.tsx` |
| THU-4 | Filters | `app/features/filters/FilterBar.tsx` |
| THU-5 | Alert panel | `app/features/alerts/AlertPanel.tsx` |
| THU-6 | Daily breakdown | `app/features/breakdown/BreakdownTable.tsx` |
| THU-7 | Analysis insights — reserved for Yongcheng | `app/features/insights/InsightsPanel.tsx` |
| THU-8 | Data quality | `app/features/data-quality/DataQualityPanel.tsx` |
| THU-9 | Workshop status and accessibility | `app/features/workshop-status/WorkshopStatus.tsx` |

### Files participants should not edit

To keep patches independently applicable, participants must not change these unless their Mobius
issue explicitly allows it:

- `app/components/dashboard/DashboardShell.tsx`
- `app/components/dashboard/RawHourlyTable.tsx`
- `app/components/dashboard/SourceComparisonTable.tsx`
- `app/globals.css`
- `app/data/chimeAgentB.ts`
- `app/data/chimeCatalog.ts`
- `app/data/chimeHourlyWeek.ts`
- `app/data/chimeLgPmp.ts`
- `app/data/mockDashboard.ts`
- `app/types/dashboard.ts`
- `package.json` and `package-lock.json`

If a shared-file change is necessary, comment `BLOCKED` on the Mobius issue and
ask the host before changing it.

## Data architecture

The UI reads 345 original Chime rows across three FeedTV sources and five
report dates:

- `Chime <> US (Hourly) - LG PMP`: 120 rows
- `Chime <> US Freewheel - FM agent (Hourly) - LG PMP`: 120 rows
- `Chime <> US Freewheel FM Agent_B (Hourly)`: 105 rows

Agent_B contains only nine rows on July 24 in the source; the dashboard
deliberately preserves that partial day and flags it. `app/data/mockDashboard.ts`
adapts the source/date selection into the existing workshop components.
Missing values from FeedTV are preserved as `null`, and all 18 source metrics
are available in the horizontally scrollable hourly table.

This fixed snapshot keeps the workshop independent of internal credentials. A
future production iteration can replace the data module with a provider adapter
backed by Beeswax MCP, an API, or a warehouse while keeping the feature
components.

## Branches

- `main`: stable workshop baseline and final accepted result
- `integration/workshop`: base branch used to generate every participant patch
- `feat/<mobius-id>-<short-name>`: local participant branch used to create a patch

## License

MIT. Forking and workshop use are welcome.
