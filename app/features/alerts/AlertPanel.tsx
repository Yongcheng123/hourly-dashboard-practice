import type { Alert } from "../../types/dashboard";

export function AlertPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <article className="card alert-card">
      <div className="section-heading">
        <div>
          <h2>Needs attention</h2>
          <p className="subtle">{alerts.length} active signals</p>
        </div>
        <span className="chip">Live rules</span>
      </div>
      <div className="alert-list">
        {alerts.map((alert) => (
          <div className="alert-item" key={alert.title}>
            <span className={`severity ${alert.severity}`}>
              {alert.severity === "high" ? "High" : "Watch"}
            </span>
            <strong>{alert.title}</strong>
            <p>{alert.detail}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
