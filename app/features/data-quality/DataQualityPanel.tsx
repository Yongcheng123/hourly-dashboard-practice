export function DataQualityPanel({ rowCount }: { rowCount: number }) {
  const checks = [
    ["Hourly coverage", `${rowCount}/24`],
    ["Chime sources", "3"],
    ["Snapshot dates", "5"],
  ];

  return (
    <article className="card quality-card">
      <div className="card-heading">
        <div>
          <h2>Data quality</h2>
          <p className="subtle">Source readiness and freshness</p>
        </div>
        <span className="score">{rowCount === 24 ? "Complete" : "Partial"}</span>
      </div>
      <div className="quality-list" style={{ marginTop: 10 }}>
        {checks.map(([label, value]) => (
          <div className="quality-row" key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </article>
  );
}
