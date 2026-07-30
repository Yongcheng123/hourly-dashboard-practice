const checks = [
  ["Spend freshness", "2 min"],
  ["Conversion freshness", "17 min"],
  ["Rows validated", "99.8%"],
];

export function DataQualityPanel() {
  return (
    <article className="card quality-card">
      <div className="card-heading">
        <div>
          <h2>Data quality</h2>
          <p className="subtle">Source readiness and freshness</p>
        </div>
        <span className="score">Healthy</span>
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
