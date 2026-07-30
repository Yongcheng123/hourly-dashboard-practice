import type { ChimeHourlyRow } from "../../data/chimeHourlyWeek";

const money = (value: number | null) =>
  value === null ? "—" : `$${value.toFixed(2)}`;
const number = (value: number | null) =>
  value === null ? "—" : value.toLocaleString();
const rate = (value: number | null) =>
  value === null ? "—" : `${value.toFixed(2)}%`;

export function RawHourlyTable({
  rows,
  sourceName,
}: {
  rows: ChimeHourlyRow[];
  sourceName: string;
}) {
  return (
    <article className="card raw-table-card">
      <div className="section-heading">
        <div>
          <h2>Full hourly metrics</h2>
          <p className="subtle">{sourceName} · original FeedTV snapshot</p>
        </div>
        <span className="chip">{rows.length}/24 hourly rows</span>
      </div>
      <div className="raw-table-scroll" tabIndex={0} aria-label="Scrollable hourly metrics">
        <table className="raw-table">
          <thead>
            <tr>
              <th>Hour</th>
              <th>Impression</th>
              <th>Install</th>
              <th>IPM</th>
              <th>Enroll Web</th>
              <th>Enroll App</th>
              <th>Enroll Total</th>
              <th>Net Spend</th>
              <th>Gross Spend</th>
              <th>Net CPM</th>
              <th>Gross CPM</th>
              <th>Margin %</th>
              <th>Margin $</th>
              <th>Gross CPI</th>
              <th>Net CPI</th>
              <th>CVR</th>
              <th>Gross CPE</th>
              <th>Net CPE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.date}-${row.hour}`}>
                <td><strong>{row.hour} EST</strong></td>
                <td>{number(row.impressions)}</td>
                <td>{row.installs.toLocaleString()}</td>
                <td>{row.ipm?.toFixed(2) ?? "—"}</td>
                <td>{row.enrollWeb}</td>
                <td>{row.enrollInApp}</td>
                <td>{row.enrollTotal}</td>
                <td>{money(row.netSpend)}</td>
                <td>{money(row.grossSpend)}</td>
                <td>{money(row.netCpm)}</td>
                <td>{money(row.grossCpm)}</td>
                <td>{rate(row.marginPercent)}</td>
                <td>{money(row.marginDollars)}</td>
                <td>{money(row.grossCpi)}</td>
                <td>{money(row.netCpi)}</td>
                <td>{rate(row.cvr)}</td>
                <td>{money(row.grossCpe)}</td>
                <td>{money(row.netCpe)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
