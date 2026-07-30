type FilterBarProps = {
  account: string;
  date: string;
  onAccountChange: (value: string) => void;
  onDateChange: (value: string) => void;
};

export function FilterBar({
  account,
  date,
  onAccountChange,
  onDateChange,
}: FilterBarProps) {
  return (
    <section className="filter-bar" aria-label="Dashboard filters">
      <div className="field">
        <label htmlFor="account">Account</label>
        <select
          id="account"
          value={account}
          onChange={(event) => onAccountChange(event.target.value)}
        >
          <option>All accounts</option>
          <option>Northstar Mobile</option>
          <option>Atlas Streaming</option>
          <option>Nova Commerce</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="date">Report date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="timezone">Timezone</label>
        <select id="timezone" defaultValue="America/New_York">
          <option>America/New_York</option>
          <option>America/Los_Angeles</option>
          <option>Asia/Shanghai</option>
        </select>
      </div>
      <button className="secondary-button" type="button">Export view</button>
    </section>
  );
}
