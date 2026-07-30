import type { BreakdownRow } from "../../types/dashboard";

export function BreakdownTable({ rows }: { rows: BreakdownRow[] }) {
  return (
    <article className="card table-card">
      <div className="section-heading">
        <div>
          <h2>Device breakdown</h2>
          <p className="subtle">Contribution to today&apos;s delivery</p>
        </div>
        <span className="chip">Sorted by spend</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Environment</th>
              <th>Spend</th>
              <th>Conversions</th>
              <th>CPA</th>
              <th>Share</th>
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
