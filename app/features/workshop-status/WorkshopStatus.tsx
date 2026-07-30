const tasks = [
  ["Framework", "Ready"],
  ["Participant modules", "Open"],
  ["Final review", "Waiting"],
];

export function WorkshopStatus() {
  return (
    <article className="card status-card">
      <div className="card-heading">
        <div>
          <h2>Workshop status</h2>
          <p className="subtle">Mobius → PR → Review Agent</p>
        </div>
      </div>
      <div className="status-list" style={{ marginTop: 10 }}>
        {tasks.map(([label, status]) => (
          <div className="status-row" key={label}>
            <b>{label}</b>
            <span className={`task-pill ${status === "Ready" ? "ready" : ""}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
