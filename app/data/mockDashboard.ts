import type { DashboardData, Kpi } from "../types/dashboard";
import {
  chimeSources,
  defaultChimeSource,
  getChimeRows,
  getChimeSource,
} from "./chimeCatalog";
import {
  chimeDates,
  type ChimeHourlyRow,
  type ChimeSourceId,
} from "./chimeHourlyWeek";

export { chimeDates, chimeSources, defaultChimeSource };

export type SourceComparisonRow = {
  sourceId: ChimeSourceId;
  sourceName: string;
  rowCount: number;
  impressions: number | null;
  installs: number;
  enrollments: number;
  grossSpend: number;
  grossCpi: number | null;
  cvr: number | null;
};

export type DashboardView = DashboardData & {
  sourceId: ChimeSourceId;
  sourceName: string;
  rawRows: ChimeHourlyRow[];
  comparison: SourceComparisonRow[];
};

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

export function getDashboard(
  sourceId: string,
  date: string,
): DashboardView {
  const selectedDate = chimeDates.includes(date as (typeof chimeDates)[number])
    ? (date as (typeof chimeDates)[number])
    : chimeDates.at(-1)!;
  const source = getChimeSource(sourceId);
  const rows = getChimeRows(source.id, selectedDate);
  const total = last(rows);
  const dateIndex = chimeDates.indexOf(selectedDate);
  const previousRows =
    dateIndex > 0 ? getChimeRows(source.id, chimeDates[dateIndex - 1]) : [];
  const previous = previousRows.length ? last(previousRows) : undefined;
  const maxSpend = Math.max(...rows.map((row) => row.grossSpend), 1);
  const maxInstalls = Math.max(...rows.map((row) => row.installs), 1);
  const priorRows = previousRows.length ? previousRows : rows;
  const dailyTotals = chimeDates.map((day) => ({
    date: day,
    row: last(getChimeRows(source.id, day)),
  }));
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
  const comparison = chimeSources.map((item) => {
    const sourceRows = getChimeRows(item.id, selectedDate);
    const sourceTotal = last(sourceRows);

    return {
      sourceId: item.id,
      sourceName: item.shortName,
      rowCount: sourceRows.length,
      impressions: sourceTotal.impressions,
      installs: sourceTotal.installs,
      enrollments: sourceTotal.enrollTotal,
      grossSpend: sourceTotal.grossSpend,
      grossCpi: sourceTotal.grossCpi,
      cvr: sourceTotal.cvr,
    };
  });

  return {
    sourceId: source.id,
    sourceName: source.name,
    rawRows: rows,
    comparison,
    kpis: [
      makeKpi(
        "Gross spend",
        currency.format(total.grossSpend),
        total.grossSpend,
        previous?.grossSpend,
      ),
      makeKpi(
        "Impressions",
        total.impressions?.toLocaleString() ?? "—",
        total.impressions ?? 0,
        previous?.impressions,
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
      makeKpi(
        "Gross CPM",
        total.grossCpm === null ? "—" : currency.format(total.grossCpm),
        total.grossCpm ?? 0,
        previous?.grossCpm,
        true,
      ),
    ],
    hourly: rows
      .filter((_, index) => index % 2 === 0 || index === rows.length - 1)
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
        severity: rows.length < 24 || missingCells > 0 ? "high" : "medium",
        title:
          rows.length < 24
            ? `Partial source day: ${rows.length}/24 rows`
            : missingCells > 0
              ? `${missingCells} source values unavailable`
              : "All source metrics present",
        detail:
          rows.length < 24
            ? `${source.shortName} contains only ${rows.length} captured hours on ${selectedDate}; this mirrors FeedTV.`
            : missingCells > 0
              ? `FeedTV returned “-” for ${missingCells} metric cells; the snapshot preserves them as null.`
              : `All 24 hourly rows contain the core delivery metrics for ${selectedDate}.`,
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
          "Values are the original three-source Chime FeedTV snapshot for July 24–28, not a live API feed.",
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

export const getDashboardForDate = (date: string) =>
  getDashboard(defaultChimeSource, date);

export const mockDashboard = getDashboard(
  defaultChimeSource,
  chimeDates.at(-1)!,
);
