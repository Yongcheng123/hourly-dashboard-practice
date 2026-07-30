import { chimeSources } from "../../data/chimeCatalog";

type FilterBarProps = {
  source: string;
  date: string;
  onSourceChange: (value: string) => void;
  onDateChange: (value: string) => void;
};

export function FilterBar({
  source,
  date,
  onSourceChange,
  onDateChange,
}: FilterBarProps) {
  return (
    <section className="filter-bar" aria-label="Dashboard filters">
      <div className="field">
        <label htmlFor="source">Chime data source</label>
        <select
          id="source"
          value={source}
          onChange={(event) => onSourceChange(event.target.value)}
        >
          {chimeSources.map((item) => (
            <option value={item.id} key={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="date">Report date</label>
        <input
          id="date"
          type="date"
          min="2026-07-24"
          max="2026-07-28"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="timezone">Timezone</label>
        <select id="timezone" defaultValue="EST">
          <option>EST</option>
        </select>
      </div>
      <button className="secondary-button" type="button">Export view</button>
    </section>
  );
}
