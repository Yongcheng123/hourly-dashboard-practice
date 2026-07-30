import type { DashboardData } from "../types/dashboard";

export const mockDashboard: DashboardData = {
  kpis: [
    { label: "Spend", value: "$84.2K", delta: "+8.4%", direction: "up" },
    { label: "Conversions", value: "3,148", delta: "+12.1%", direction: "up" },
    { label: "CPA", value: "$26.75", delta: "-3.2%", direction: "up" },
    { label: "Pacing", value: "96.4%", delta: "-1.8%", direction: "down" },
  ],
  hourly: [
    { hour: "00", spend: 39, conversions: 31, expectedSpend: 36 },
    { hour: "02", spend: 43, conversions: 35, expectedSpend: 40 },
    { hour: "04", spend: 31, conversions: 27, expectedSpend: 33 },
    { hour: "06", spend: 48, conversions: 39, expectedSpend: 45 },
    { hour: "08", spend: 66, conversions: 54, expectedSpend: 61 },
    { hour: "10", spend: 73, conversions: 62, expectedSpend: 68 },
    { hour: "12", spend: 84, conversions: 76, expectedSpend: 78 },
    { hour: "14", spend: 92, conversions: 68, expectedSpend: 83 },
    { hour: "16", spend: 80, conversions: 72, expectedSpend: 79 },
    { hour: "18", spend: 88, conversions: 79, expectedSpend: 86 },
    { hour: "20", spend: 70, conversions: 64, expectedSpend: 73 },
    { hour: "22", spend: 58, conversions: 52, expectedSpend: 61 },
  ],
  alerts: [
    {
      severity: "high",
      title: "CPA spike · 14:00",
      detail: "CPA is 29% above the seven-day baseline for the selected account.",
    },
    {
      severity: "medium",
      title: "Pacing below target",
      detail: "Two campaigns may underspend by more than 8% before day end.",
    },
    {
      severity: "medium",
      title: "Late conversion signal",
      detail: "Conversion freshness is currently 17 minutes behind spend data.",
    },
  ],
  breakdown: [
    { name: "Mobile app", spend: "$37.8K", conversions: 1492, cpa: "$25.34", share: 45 },
    { name: "Mobile web", spend: "$21.1K", conversions: 752, cpa: "$28.06", share: 25 },
    { name: "Desktop", spend: "$17.7K", conversions: 639, cpa: "$27.70", share: 21 },
    { name: "CTV", spend: "$7.6K", conversions: 265, cpa: "$28.68", share: 9 },
  ],
};
