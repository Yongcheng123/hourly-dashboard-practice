import type { Kpi } from "../../types/dashboard";

export function KpiCards({ items }: { items: Kpi[] }) {
  return (
    <section className="kpi-grid" aria-label="Key performance indicators">
      {items.map((item) => (
        <article className="card kpi-card" key={item.label}>
          <span className="kpi-label">{item.label}</span>
          <div className="kpi-value">{item.value}</div>
          <span className={`trend ${item.direction === "down" ? "down" : ""}`}>
            {item.delta} vs. prior day
          </span>
        </article>
      ))}
    </section>
  );
}
