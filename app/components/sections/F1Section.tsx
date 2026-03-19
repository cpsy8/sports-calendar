const DRIVERS = [
  { pos: 1, name: "Russell", pct: 100, color: "#00d2be", pts: 25 },
  { pos: 2, name: "Antonelli", pct: 72, color: "#00d2be", pts: 18 },
  { pos: 3, name: "Leclerc", pct: 60, color: "#dc0000", pts: 15 },
  { pos: 4, name: "Hamilton", pct: 48, color: "#dc0000", pts: 12 },
  { pos: 5, name: "Norris", pct: 40, color: "#ff8700", pts: 10 },
  { pos: 6, name: "Verstappen", pct: 32, color: "#3671C6", pts: 8 },
  { pos: 7, name: "Bearman", pct: 24, color: "#B6BABD", pts: 6 },
  { pos: 8, name: "Lindblad", pct: 16, color: "#6692FF", pts: 4 },
  { pos: 9, name: "Bortoleto", pct: 8, color: "#52E252", pts: 2 },
  { pos: 10, name: "Gasly", pct: 5, color: "#2293D1", pts: 1 },
];

const CONSTRUCTORS = [
  { pos: 1, name: "McLaren", color: "#ff8700", pts: 151 },
  { pos: 2, name: "Mercedes", color: "#00d2be", pts: 93 },
  { pos: 3, name: "Red Bull", color: "#3671C6", pts: 71 },
  { pos: 4, name: "Ferrari", color: "#dc0000", pts: 57 },
  { pos: 5, name: "Haas", color: "#B6BABD", pts: 20 },
  { pos: 6, name: "Williams", color: "#37BEDD", pts: 19 },
  { pos: 7, name: "Aston Martin", color: "#358C75", pts: 10 },
  { pos: 8, name: "RB / VCARB", color: "#6692FF", pts: 7 },
  { pos: 9, name: "Alpine", color: "#2293D1", pts: 6 },
  { pos: 10, name: "Sauber / Audi", color: "#52E252", pts: 6 },
];

const RACES = [
  { round: "R1", flag: "🇦🇺", name: "Australian GP", circuit: "Melbourne", dates: "06–08 MAR", status: "completed" as const },
  { round: "R2", flag: "🇨🇳", name: "Chinese GP", circuit: "Shanghai", dates: "13–15 MAR", status: "completed" as const },
  { round: "R3", flag: "🇯🇵", name: "Japanese GP", circuit: "Suzuka", dates: "27–29 MAR", status: "next" as const },
  { round: "R4", flag: "🇧🇭", name: "Bahrain GP", circuit: "Sakhir", dates: "10–12 APR", status: "upcoming" as const },
  { round: "R5", flag: "🇸🇦", name: "Saudi Arabian GP", circuit: "Jeddah", dates: "17–19 APR", status: "upcoming" as const },
  { round: "R6", flag: "🇺🇸", name: "Miami GP", circuit: "Miami", dates: "01–03 MAY", status: "upcoming" as const },
  { round: "R7", flag: "🇨🇦", name: "Canadian GP", circuit: "Montreal", dates: "22–24 MAY", status: "upcoming" as const },
  { round: "R8", flag: "🇲🇨", name: "Monaco GP", circuit: "Monte Carlo", dates: "05–07 JUN", status: "upcoming" as const },
];

export function F1Section() {
  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: "#e10600" }} />
        <div className="hero-icon">🏎️</div>
        <div className="hero-text">
          <h2>FORMULA 1</h2>
          <p>2026 World Championship</p>
        </div>
        <div className="hero-badge" style={{ background: "#e1060020", color: "#e10600" }}>
          Round 3 of 24
        </div>
      </div>

      <div className="stat-row fade-in fd1">
        <div className="stat-card" style={{ borderTop: "3px solid #e10600" }}>
          <div className="stat-value" style={{ color: "#e10600" }}>24</div>
          <div className="stat-label">Races</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid #00d2be" }}>
          <div className="stat-value" style={{ color: "#00d2be" }}>2</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid #f59e0b" }}>
          <div className="stat-value" style={{ color: "#f59e0b" }}>22</div>
          <div className="stat-label">Remaining</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid var(--accent-purple)" }}>
          <div className="stat-value" style={{ color: "var(--accent-purple)" }}>10</div>
          <div className="stat-label">Teams</div>
        </div>
      </div>

      <div className="grid-12 fade-in fd2">
        <div className="card span-7">
          <div className="card-header">
            <div className="card-title">Driver Standings</div>
            <button className="card-action">Full Standings →</button>
          </div>
          {DRIVERS.map((d) => (
            <div className="driver-bar-row" key={d.pos}>
              <div className="driver-bar-pos">{d.pos}</div>
              <div className="driver-bar-name">{d.name}</div>
              <div className="driver-bar-track">
                <div
                  className="driver-bar-fill"
                  style={{
                    width: `${d.pct}%`,
                    background: `linear-gradient(90deg, ${d.color}, ${d.color}88)`,
                  }}
                >
                  {d.pts}
                </div>
              </div>
              <div className="driver-bar-pts">{d.pts}</div>
            </div>
          ))}
        </div>

        <div className="card span-5">
          <div className="card-header">
            <div className="card-title">Constructor Standings</div>
          </div>
          <table className="standings-table">
            <thead>
              <tr><th>#</th><th>Team</th><th>Pts</th></tr>
            </thead>
            <tbody>
              {CONSTRUCTORS.map((c) => (
                <tr key={c.pos}>
                  <td><span className="pos-num">{c.pos}</span></td>
                  <td>
                    <div className="team-cell">
                      <div className="driver-team-line" style={{ background: c.color }} />
                      {c.name}
                    </div>
                  </td>
                  <td className="points-cell">{c.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-12 fade-in fd3" style={{ marginTop: "1.5rem" }}>
        <div className="card span-12">
          <div className="card-header">
            <div className="card-title">2026 Race Calendar</div>
            <button className="card-action">Full Calendar →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 2rem" }}>
            {RACES.map((r) => (
              <div className="race-item" key={r.round}>
                <div className="race-round">{r.round}</div>
                <div className="race-flag">{r.flag}</div>
                <div className="race-info">
                  <div className="race-name">{r.name}</div>
                  <div className="race-circuit">{r.circuit}</div>
                </div>
                <div>
                  <div className="race-date">{r.dates}</div>
                  <div className={`race-status ${r.status}`}>
                    {r.status === "next" ? "NEXT" : r.status === "completed" ? "Done" : "Upcoming"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
