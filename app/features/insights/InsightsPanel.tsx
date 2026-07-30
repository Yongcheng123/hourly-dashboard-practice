import type { HourlyPoint } from "../../types/dashboard";

export function InsightsPanel({ points }: { points: HourlyPoint[] }) {
  const peak = points.reduce((best, point) =>
    point.spend > best.spend ? point : best,
  );

  return (
    <article className="card insight-card">
      <div className="card-heading">
        <div>
          <h2>Analysis</h2>
          <p className="subtle">Explain the numbers, not just the chart</p>
        </div>
      </div>
      <div className="insight-list" style={{ marginTop: 14 }}>
        <div className="insight-item">
          <strong>Peak delivery at {peak.hour}:00</strong>
          <p>Spend index reached {peak.spend}, above the expected curve.</p>
        </div>
        <div className="insight-item">
          <strong>Opportunity window</strong>
          <p>18:00–20:00 shows stable conversion efficiency with available pacing.</p>
        </div>
      </div>
    </article>
  );
}
