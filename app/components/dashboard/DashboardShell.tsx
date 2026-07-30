"use client";

import { useMemo, useState } from "react";
import { mockDashboard } from "../../data/mockDashboard";
import { AlertPanel } from "../../features/alerts/AlertPanel";
import { BreakdownTable } from "../../features/breakdown/BreakdownTable";
import { DataQualityPanel } from "../../features/data-quality/DataQualityPanel";
import { FilterBar } from "../../features/filters/FilterBar";
import { HourlyChart } from "../../features/hourly-chart/HourlyChart";
import { InsightsPanel } from "../../features/insights/InsightsPanel";
import { KpiCards } from "../../features/kpis/KpiCards";
import { WorkshopStatus } from "../../features/workshop-status/WorkshopStatus";

export function DashboardShell() {
  const [account, setAccount] = useState("All accounts");
  const [date, setDate] = useState("2026-07-28");

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
          <b>Mock data mode</b>
          <span>Safe for the workshop. No production credentials required.</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Performance control room</p>
            <h1>Hourly performance</h1>
            <p className="subtle">{contextLabel} · updated 2 minutes ago</p>
          </div>
          <span className="live-pill"><span className="live-dot" />Data healthy</span>
        </header>

        <FilterBar
          account={account}
          date={date}
          onAccountChange={setAccount}
          onDateChange={setDate}
        />
        <KpiCards items={mockDashboard.kpis} />

        <section className="grid-main">
          <HourlyChart points={mockDashboard.hourly} />
          <AlertPanel alerts={mockDashboard.alerts} />
        </section>

        <section className="grid-bottom">
          <BreakdownTable rows={mockDashboard.breakdown} />
          <div className="stack">
            <InsightsPanel points={mockDashboard.hourly} />
            <DataQualityPanel />
            <WorkshopStatus />
          </div>
        </section>
      </main>
    </div>
  );
}
