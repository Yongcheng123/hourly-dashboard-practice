"use client";

import { useMemo, useState } from "react";
import {
  defaultChimeSource,
  getDashboard,
} from "../../data/mockDashboard";
import { AlertPanel } from "../../features/alerts/AlertPanel";
import { BreakdownTable } from "../../features/breakdown/BreakdownTable";
import { DataQualityPanel } from "../../features/data-quality/DataQualityPanel";
import { FilterBar } from "../../features/filters/FilterBar";
import { HourlyChart } from "../../features/hourly-chart/HourlyChart";
import { InsightsPanel } from "../../features/insights/InsightsPanel";
import { KpiCards } from "../../features/kpis/KpiCards";
import { WorkshopStatus } from "../../features/workshop-status/WorkshopStatus";
import { RawHourlyTable } from "./RawHourlyTable";
import { SourceComparisonTable } from "./SourceComparisonTable";

export function DashboardShell() {
  const [source, setSource] = useState(defaultChimeSource);
  const [date, setDate] = useState("2026-07-28");

  const dashboard = useMemo(
    () => getDashboard(source, date),
    [source, date],
  );
  const contextLabel = useMemo(
    () => `${dashboard.sourceName} · ${date}`,
    [dashboard.sourceName, date],
  );

  return (
    <div className="dashboard">
      <aside className="sidebar" aria-label="Dashboard navigation">
        <div className="brand">
          <div className="brand-mark">HP</div>
          <div>
            <strong>Hourly Pulse</strong>
            <span>Operations cockpit</span>
          </div>
        </div>
        <p className="nav-label">Workspace</p>
        <button className="nav-item active">⌁ <span>Overview</span></button>
        <button className="nav-item">↗ <span>Analysis</span></button>
        <button className="nav-item">⚑ <span>Alerts</span></button>
        <p className="nav-label">Workshop</p>
        <button className="nav-item">✓ <span>Task status</span></button>
        <div className="sidebar-note">
          <b>Chime snapshot</b>
          <span>Three FeedTV sources, five report dates, all 18 metrics.</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Performance control room</p>
            <h1>Hourly performance</h1>
            <p className="subtle">{contextLabel} · {dashboard.rawRows.length}/24 hourly rows · EST</p>
          </div>
          <span className="live-pill"><span className="live-dot" />Snapshot ready</span>
        </header>

        <FilterBar
          source={source}
          date={date}
          onSourceChange={setSource}
          onDateChange={setDate}
        />
        <KpiCards items={dashboard.kpis} />

        <SourceComparisonTable
          rows={dashboard.comparison}
          selectedSource={dashboard.sourceId}
        />

        <section className="grid-main">
          <HourlyChart points={dashboard.hourly} />
          <AlertPanel alerts={dashboard.alerts} />
        </section>

        <RawHourlyTable
          rows={dashboard.rawRows}
          sourceName={dashboard.sourceName}
        />

        <section className="grid-bottom">
          <BreakdownTable rows={dashboard.breakdown} />
          <div className="stack">
            <InsightsPanel points={dashboard.hourly} />
            <DataQualityPanel rowCount={dashboard.rawRows.length} />
            <WorkshopStatus />
          </div>
        </section>
      </main>
    </div>
  );
}
