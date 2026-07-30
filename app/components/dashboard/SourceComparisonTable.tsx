import type { SourceComparisonRow } from "../../data/mockDashboard";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function SourceComparisonTable({
  rows,
  selectedSource,
}: {
  rows: SourceComparisonRow[];
  selectedSource: string;
}) {
  return (
    <article className="card source-comparison-card">
      <div className="section-heading">
        <div>
          <h2>Chime source comparison</h2>
          <p className="subtle">Same report date across all three delivery feeds</p>
        </div>
        <span className="chip">3 source tables</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Rows</th>
              <th>Impressions</th>
              <th>Installs</th>
              <th>Enrollments</th>
              <th>Gross spend</th>
              <th>Gross CPI</th>
              <th>CVR</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                className={row.sourceId === selectedSource ? "selected-row" : ""}
                key={row.sourceId}
              >
                <td><strong>{row.sourceName}</strong></td>
                <td>{row.rowCount}/24</td>
                <td>{row.impressions?.toLocaleString() ?? "—"}</td>
                <td>{row.installs.toLocaleString()}</td>
                <td>{row.enrollments.toLocaleString()}</td>
                <td>{currency.format(row.grossSpend)}</td>
                <td>{row.grossCpi === null ? "—" : currency.format(row.grossCpi)}</td>
                <td>{row.cvr === null ? "—" : `${row.cvr.toFixed(2)}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
