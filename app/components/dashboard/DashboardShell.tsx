"use client";

import { useMemo, useState } from "react";
import { getDashboardForDate } from "../../data/mockDashboard";
import { AlertPanel } from "../../features/alerts/AlertPanel";
import { BreakdownTable } from "../../features/breakdown/BreakdownTable";
import { DataQualityPanel } from "../../features/data-quality/DataQualityPanel";
import { FilterBar } from "../../features/filters/FilterBar";
import { HourlyChart } from "../../features/hourly-chart/HourlyChart";
import { InsightsPanel } from "../../features/insights/InsightsPanel";
import { KpiCards } from "../../features/kpis/KpiCards";
import { WorkshopStatus } from "../../features/workshop-status/WorkshopStatus";

export function DashboardShell() {
  const [account, setAccount] = useState("Chime · Freewheel FM · LG PMP");
  const [date, setDate] = useState("2026-07-28");

  const dashboard = useMemo(() => getDashboardForDate(date), [date]);
  const contextLabel = useMemo(
    () => `${account} · ${date}`,
    [account, date],
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
          <span>Five original FeedTV days. No live credentials required.</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Performance control room</p>
            <h1>Hourly performance</h1>
            <p className="subtle">{contextLabel} · 24 hourly rows · EST</p>
          </div>
          <span className="live-pill"><span className="live-dot" />Snapshot ready</span>
        </header>

        <FilterBar
          account={account}
          date={date}
          onAccountChange={setAccount}
          onDateChange={setDate}
        />
        <KpiCards items={dashboard.kpis} />

        <section className="grid-main">
          <HourlyChart points={dashboard.hourly} />
          <AlertPanel alerts={dashboard.alerts} />
        </section>

        <section className="grid-bottom">
          <BreakdownTable rows={dashboard.breakdown} />
          <div className="stack">
            <InsightsPanel points={dashboard.hourly} />
            <DataQualityPanel />
            <WorkshopStatus />
          </div>
        </section>
      </main>
    </div>
  );
}
