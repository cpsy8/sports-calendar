"use client";

import { TeamLogo } from "../TeamLogo";

export function PremierLeagueSection() {
  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: "#3dffa2" }} />
        <div className="hero-icon">⚽</div>
        <div className="hero-text">
          <h2>PREMIER LEAGUE</h2>
          <p>England&apos;s top flight — 2025/26 Season</p>
        </div>
        <div className="hero-badge" style={{ background: "#3dffa220", color: "#3dffa2" }}>
          Matchweek 29
        </div>
      </div>

      <div className="stat-row fade-in fd1">
        <div className="stat-card" style={{ borderTop: "3px solid #3dffa2" }}>
          <div className="stat-value" style={{ color: "#3dffa2" }}>29</div>
          <div className="stat-label">Matchweek</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid var(--accent-blue)" }}>
          <div className="stat-value" style={{ color: "var(--accent-blue)" }}>285</div>
          <div className="stat-label">Matches Played</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid var(--accent-purple)" }}>
          <div className="stat-value" style={{ color: "var(--accent-purple)" }}>812</div>
          <div className="stat-label">Goals Scored</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid #f59e0b" }}>
          <div className="stat-value" style={{ color: "#f59e0b" }}>2.85</div>
          <div className="stat-label">Goals / Match</div>
        </div>
      </div>

      <div className="grid-12 fade-in fd2">
        <div className="card span-7">
          <div className="card-header">
            <div className="card-title">
              Standings <span className="card-subtitle">— Top 8</span>
            </div>
            <button className="card-action">Full Table →</button>
          </div>
          <table className="standings-table">
            <thead>
              <tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr>
            </thead>
            <tbody>
              {[
                { pos: 1, code: "LIV", name: "Liverpool", color: "#c8102e", p: 29, w: 22, d: 5, l: 2, gd: "+42", pts: 71 },
                { pos: 2, code: "ARS", name: "Arsenal", color: "#ef0107", p: 29, w: 19, d: 6, l: 4, gd: "+35", pts: 63 },
                { pos: 3, code: "MCI", name: "Man City", color: "#6cabdd", p: 29, w: 18, d: 5, l: 6, gd: "+30", pts: 59 },
                { pos: 4, code: "TOT", name: "Tottenham", color: "#132257", p: 29, w: 16, d: 6, l: 7, gd: "+18", pts: 54 },
                { pos: 5, code: "CHE", name: "Chelsea", color: "#034694", p: 29, w: 15, d: 7, l: 7, gd: "+14", pts: 52 },
                { pos: 6, code: "AVL", name: "Aston Villa", color: "#670e36", p: 29, w: 14, d: 5, l: 10, gd: "+8", pts: 47 },
                { pos: 7, code: "NEW", name: "Newcastle", color: "#241f20", p: 29, w: 13, d: 7, l: 9, gd: "+10", pts: 46 },
                { pos: 8, code: "BHA", name: "Brighton", color: "#274488", p: 29, w: 12, d: 8, l: 9, gd: "+5", pts: 44 },
              ].map((row) => (
                <tr key={row.pos}>
                  <td><span className="pos-num">{row.pos}</span></td>
                  <td>
                    <div className="team-cell">
                      <TeamLogo code={row.code} sport="football" leagueCode="epl" color={row.color} />
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
            <button className="card-action">View All →</button>
          </div>
          {[
            { home: { code: "LIV", name: "Liverpool", color: "#c8102e" }, away: { code: "MCI", name: "Man City", color: "#6cabdd" }, date: "SAT, 22 MAR", time: "20:00", venue: "Anfield" },
            { home: { code: "ARS", name: "Arsenal", color: "#ef0107" }, away: { code: "CHE", name: "Chelsea", color: "#034694" }, date: "SUN, 23 MAR", time: "17:30", venue: "Emirates" },
            { home: { code: "MUN", name: "Man United", color: "#da291c" }, away: { code: "TOT", name: "Tottenham", color: "#132257" }, date: "SUN, 23 MAR", time: "15:00", venue: "Old Trafford" },
            { home: { code: "NEW", name: "Newcastle", color: "#241f20" }, away: { code: "AVL", name: "Aston Villa", color: "#670e36" }, date: "SAT, 29 MAR", time: "15:00", venue: "St James' Park" },
            { home: { code: "BHA", name: "Brighton", color: "#274488" }, away: { code: "NFO", name: "Nott'm Forest", color: "#d71920" }, date: "SAT, 29 MAR", time: "15:00", venue: "AMEX" },
          ].map((f, i) => (
            <div className="fixture-item" key={i}>
              <div className="fixture-teams">
                <div className="fixture-team">
                  <TeamLogo code={f.home.code} sport="football" leagueCode="epl" color={f.home.color} />
                  {f.home.name}
                </div>
                <div className="fixture-team">
                  <TeamLogo code={f.away.code} sport="football" leagueCode="epl" color={f.away.color} />
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

      <div className="grid-12 fade-in fd3" style={{ marginTop: "1.5rem" }}>
        <div className="card span-12">
          <div className="card-header">
            <div className="card-title">Recent Results</div>
            <button className="card-action">All Results →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "0.8rem" }}>
            {[
              { label: "MW 28", home: { code: "LIV", name: "Liverpool", color: "#c8102e" }, score: "2 — 1", away: { code: "BHA", name: "Brighton", color: "#274488" }, venue: "Anfield" },
              { label: "MW 28", home: { code: "ARS", name: "Arsenal", color: "#ef0107" }, score: "3 — 0", away: { code: "NFO", name: "Forest", color: "#d71920" }, venue: "Emirates" },
              { label: "MW 28", home: { code: "MCI", name: "Man City", color: "#6cabdd" }, score: "1 — 1", away: { code: "CHE", name: "Chelsea", color: "#034694" }, venue: "Etihad" },
              { label: "MW 28", home: { code: "TOT", name: "Spurs", color: "#132257" }, score: "4 — 1", away: { code: "SOU", name: "Southampton", color: "#e30613" }, venue: "Tottenham" },
            ].map((r, i) => (
              <div className="result-card" key={i}>
                <div className="result-label">{r.label}</div>
                <div className="result-row">
                  <div className="fixture-team">
                    <TeamLogo code={r.home.code} sport="football" leagueCode="epl" color={r.home.color} />
                    {r.home.name}
                  </div>
                  <div className="fixture-score">{r.score}</div>
                  <div className="fixture-team">
                    <TeamLogo code={r.away.code} sport="football" leagueCode="epl" color={r.away.color} />
                    {r.away.name}
                  </div>
                </div>
                <div className="result-ft">FT • {r.venue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
