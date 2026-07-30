import type { BreakdownRow } from "../../types/dashboard";

export function BreakdownTable({ rows }: { rows: BreakdownRow[] }) {
  return (
    <article className="card table-card">
      <div className="section-heading">
        <div>
          <h2>Five-day daily totals</h2>
          <p className="subtle">Chime snapshot · July 24–28</p>
        </div>
        <span className="chip">Original FeedTV values</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Gross spend</th>
              <th>Installs</th>
              <th>Gross CPI</th>
              <th>5-day share</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td><strong>{row.name}</strong></td>
                <td>{row.spend}</td>
                <td>{row.conversions.toLocaleString()}</td>
                <td>{row.cpa}</td>
                <td>
                  <div className="meter" aria-label={`${row.share}% share`}>
                    <span style={{ width: `${row.share}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
