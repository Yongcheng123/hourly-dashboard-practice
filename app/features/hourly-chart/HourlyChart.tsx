import type { HourlyPoint } from "../../types/dashboard";

export function HourlyChart({ points }: { points: HourlyPoint[] }) {
  return (
    <article className="card chart-card">
      <div className="section-heading">
        <div>
          <h2>Gross spend vs. installs</h2>
          <p className="subtle">Chime cumulative movement · every two hours</p>
        </div>
        <span className="chip">■ Gross spend &nbsp; ■ Installs</span>
      </div>
      <div className="chart" aria-label="Hourly spend and conversions chart">
        {points.map((point) => (
          <div className="chart-column" key={point.hour}>
            <div className="bars">
              <span
                className="bar"
                style={{ height: `${point.spend}%` }}
                title={`${point.hour}:00 spend index ${point.spend}`}
              />
              <span
                className="bar secondary"
                style={{ height: `${point.conversions}%` }}
                title={`${point.hour}:00 conversion index ${point.conversions}`}
              />
            </div>
            <span className="hour-label">{point.hour}:00</span>
          </div>
        ))}
      </div>
    </article>
  );
}
