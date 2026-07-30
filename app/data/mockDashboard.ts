import type { DashboardData, Kpi } from "../types/dashboard";
import {
  chimeDates,
  chimeHourlyRows,
  chimeRowsByDate,
  type ChimeHourlyRow,
} from "./chimeHourlyWeek";

export { chimeDates, chimeHourlyRows };

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentChange = (current: number, previous?: number | null) => {
  if (!previous) return "—";
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
};

const hourNumber = (hour: string) => {
  const value = Number(hour.replace(/[AP]M/, ""));
  if (hour.endsWith("AM")) return value === 12 ? 0 : value;
  return value === 12 ? 12 : value + 12;
};

const last = (rows: ChimeHourlyRow[]) => rows.at(-1)!;

const dailyTotals = chimeDates.map((date) => ({
  date,
  row: last(chimeRowsByDate[date]),
}));

const makeKpi = (
  label: string,
  value: string,
  current: number,
  previous: number | null | undefined,
  lowerIsBetter = false,
): Kpi => {
  const improved = lowerIsBetter
    ? Boolean(previous && current <= previous)
    : Boolean(!previous || current >= previous);

  return {
    label,
    value,
    delta: percentChange(current, previous),
    direction: improved ? "up" : "down",
  };
};

export function getDashboardForDate(date: string): DashboardData {
  const selectedDate = chimeDates.includes(date as (typeof chimeDates)[number])
    ? (date as (typeof chimeDates)[number])
    : chimeDates.at(-1)!;
  const rows = chimeRowsByDate[selectedDate];
  const total = last(rows);
  const dateIndex = chimeDates.indexOf(selectedDate);
  const previous =
    dateIndex > 0 ? last(chimeRowsByDate[chimeDates[dateIndex - 1]]) : undefined;
  const maxSpend = Math.max(...rows.map((row) => row.grossSpend), 1);
  const maxInstalls = Math.max(...rows.map((row) => row.installs), 1);
  const priorRows =
    dateIndex > 0 ? chimeRowsByDate[chimeDates[dateIndex - 1]] : rows;
  const missingCells = rows.reduce(
    (sum, row) =>
      sum +
      [
        row.impressions,
        row.ipm,
        row.netCpm,
        row.grossCpm,
        row.grossCpi,
        row.netCpi,
        row.cvr,
        row.grossCpe,
        row.netCpe,
      ].filter((value) => value === null).length,
    0,
  );
  const weekGrossSpend = dailyTotals.reduce(
    (sum, item) => sum + item.row.grossSpend,
    0,
  );

  return {
    kpis: [
      makeKpi(
        "Gross spend",
        currency.format(total.grossSpend),
        total.grossSpend,
        previous?.grossSpend,
      ),
      makeKpi(
        "Installs",
        total.installs.toLocaleString(),
        total.installs,
        previous?.installs,
      ),
      makeKpi(
        "Enrollments",
        total.enrollTotal.toLocaleString(),
        total.enrollTotal,
        previous?.enrollTotal,
      ),
      makeKpi(
        "Gross CPI",
        total.grossCpi === null ? "—" : currency.format(total.grossCpi),
        total.grossCpi ?? 0,
        previous?.grossCpi,
        true,
      ),
    ],
    hourly: rows
      .filter((_, index) => index % 2 === 0)
      .map((row, index) => ({
        hour: String(hourNumber(row.hour)).padStart(2, "0"),
        spend: Math.max(4, Math.round((row.grossSpend / maxSpend) * 100)),
        conversions: Math.max(
          4,
          Math.round((row.installs / maxInstalls) * 100),
        ),
        expectedSpend: Math.max(
          4,
          Math.round(
            ((priorRows[index * 2]?.grossSpend ?? row.grossSpend) / maxSpend) *
              100,
          ),
        ),
      })),
    alerts: [
      {
        severity: missingCells > 0 ? "high" : "medium",
        title:
          missingCells > 0
            ? `${missingCells} source values unavailable`
            : "All source metrics present",
        detail:
          missingCells > 0
            ? `The Chime sheet returned “-” for ${missingCells} metric cells on ${selectedDate}; the snapshot preserves them as null.`
            : `All 24 Chime hourly rows contain the core delivery metrics for ${selectedDate}.`,
      },
      {
        severity: "medium",
        title: `${total.enrollTotal} total enrollments`,
        detail: `${total.enrollWeb} web and ${total.enrollInApp} in-app enrollments; final CVR is ${total.cvr?.toFixed(2) ?? "—"}%.`,
      },
      {
        severity: "medium",
        title: "Historical workshop snapshot",
        detail:
          "Values are the original Chime FeedTV snapshot for July 24–28, not a live API feed.",
      },
    ],
    breakdown: dailyTotals.map(({ date: day, row }) => ({
      name: day,
      spend: currency.format(row.grossSpend),
      conversions: row.installs,
      cpa: row.grossCpi === null ? "—" : currency.format(row.grossCpi),
      share: Math.round((row.grossSpend / weekGrossSpend) * 100),
    })),
  };
}

export const mockDashboard = getDashboardForDate(chimeDates.at(-1)!);
