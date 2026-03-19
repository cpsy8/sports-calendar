export function LaLigaSection() {
  const standings = [
    { pos: 1, code: "BAR", name: "Barcelona", color: "#004d98", p: 28, w: 22, d: 4, l: 2, gd: "+48", pts: 70 },
    { pos: 2, code: "RMA", name: "Real Madrid", color: "#fff", textColor: "#000", border: "1px solid #333", p: 28, w: 19, d: 5, l: 4, gd: "+32", pts: 62 },
    { pos: 3, code: "ATM", name: "Atlético Madrid", color: "#cb3524", p: 28, w: 17, d: 6, l: 5, gd: "+20", pts: 57 },
    { pos: 4, code: "RSO", name: "Real Sociedad", color: "#005ea5", p: 28, w: 14, d: 8, l: 6, gd: "+12", pts: 50 },
    { pos: 5, code: "VIL", name: "Villarreal", color: "#fde047", textColor: "#000", p: 28, w: 13, d: 7, l: 8, gd: "+8", pts: 46 },
    { pos: 6, code: "BET", name: "Real Betis", color: "#005ba1", p: 28, w: 12, d: 8, l: 8, gd: "+3", pts: 44 },
  ];

  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: "#ff4b44" }} />
        <div className="hero-icon">🇪🇸</div>
        <div className="hero-text">
          <h2>LA LIGA</h2>
          <p>Spain — 2025/26 Season</p>
        </div>
        <div className="hero-badge" style={{ background: "#ff4b4420", color: "#ff4b44" }}>
          Matchday 28
        </div>
      </div>

      <div className="grid-12 fade-in fd1">
        <div className="card span-7">
          <div className="card-header">
            <div className="card-title">Standings</div>
            <button className="card-action">Full Table →</button>
          </div>
          <table className="standings-table">
            <thead>
              <tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.pos}>
                  <td><span className="pos-num">{row.pos}</span></td>
                  <td>
                    <div className="team-cell">
                      <div className="team-badge" style={{ background: row.color, color: row.textColor ?? "#fff", border: row.border }}>{row.code}</div>
                      {row.name}
                    </div>
                  </td>
                  <td>{row.p}</td><td>{row.w}</td><td>{row.d}</td><td>{row.l}</td>
                  <td>{row.gd}</td><td className="points-cell">{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card span-5">
          <div className="card-header">
            <div className="card-title">Upcoming Fixtures</div>
          </div>
          {[
            { home: { code: "RMA", name: "Real Madrid", color: "#fff", textColor: "#000", border: "1px solid #333" }, away: { code: "BAR", name: "Barcelona", color: "#004d98" }, date: "SUN, 30 MAR", time: "21:00", venue: "Bernabéu" },
            { home: { code: "ATM", name: "Atlético", color: "#cb3524" }, away: { code: "VIL", name: "Villarreal", color: "#fde047", textColor: "#000" }, date: "SAT, 29 MAR", time: "18:30", venue: "Metropolitano" },
            { home: { code: "RSO", name: "R. Sociedad", color: "#005ea5" }, away: { code: "BET", name: "Real Betis", color: "#005ba1" }, date: "SAT, 29 MAR", time: "16:15", venue: "Anoeta" },
          ].map((f, i) => (
            <div className="fixture-item" key={i}>
              <div className="fixture-teams">
                <div className="fixture-team">
                  <div className="team-badge" style={{ background: f.home.color, color: f.home.textColor ?? "#fff", border: f.home.border }}>{f.home.code}</div>
                  {f.home.name}
                </div>
                <div className="fixture-team">
                  <div className="team-badge" style={{ background: f.away.color, color: f.away.textColor ?? "#fff" }}>{f.away.code}</div>
                  {f.away.name}
                </div>
              </div>
              <div className="fixture-meta">
                <div className="fixture-date">{f.date}</div>
                <div className="fixture-time">{f.time}</div>
                <div className="fixture-venue">{f.venue}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
