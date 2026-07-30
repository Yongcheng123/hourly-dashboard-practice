export type HourlyPoint = {
  hour: string;
  spend: number;
  conversions: number;
  expectedSpend: number;
};

export type Kpi = {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down";
};

export type Alert = {
  severity: "high" | "medium";
  title: string;
  detail: string;
};

export type BreakdownRow = {
  name: string;
  spend: string;
  conversions: number;
  cpa: string;
  share: number;
};

export type DashboardData = {
  kpis: Kpi[];
  hourly: HourlyPoint[];
  alerts: Alert[];
  breakdown: BreakdownRow[];
};
