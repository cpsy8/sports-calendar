"use client";

import { TeamLogo } from "../TeamLogo";

export function BundesligaSection() {
  const standings = [
    { pos: 1, code: "BAY", name: "Bayern Munich", color: "#dc0000", p: 26, w: 20, d: 3, l: 3, gd: "+45", pts: 63 },
    { pos: 2, code: "BVB", name: "Dortmund", color: "#fde047", textColor: "#000", p: 26, w: 17, d: 5, l: 4, gd: "+28", pts: 56 },
    { pos: 3, code: "LEV", name: "Bayer Leverkusen", color: "#e30613", p: 26, w: 16, d: 6, l: 4, gd: "+25", pts: 54 },
    { pos: 4, code: "LEI", name: "RB Leipzig", color: "#004b8d", p: 26, w: 14, d: 5, l: 7, gd: "+14", pts: 47 },
    { pos: 5, code: "WOB", name: "Wolfsburg", color: "#1e5128", p: 26, w: 12, d: 7, l: 7, gd: "+8", pts: 43 },
    { pos: 6, code: "STU", name: "Stuttgart", color: "#e1000f", p: 26, w: 12, d: 5, l: 9, gd: "+5", pts: 41 },
  ];

  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: "#d20515" }} />
        <div className="hero-icon">🇩🇪</div>
        <div className="hero-text">
          <h2>BUNDESLIGA</h2>
          <p>Germany — 2025/26 Season</p>
        </div>
        <div className="hero-badge" style={{ background: "#d2051520", color: "#d20515" }}>
          Matchday 26
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
                      <TeamLogo code={row.code} sport="football" leagueCode="bundesliga" color={row.color} />
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
            { home: { code: "BAY", name: "Bayern", color: "#dc0000" }, away: { code: "BVB", name: "Dortmund", color: "#fde047", textColor: "#000" }, date: "SAT, 29 MAR", time: "18:30", venue: "Allianz Arena" },
            { home: { code: "LEV", name: "Leverkusen", color: "#e30613" }, away: { code: "LEI", name: "RB Leipzig", color: "#004b8d" }, date: "SUN, 30 MAR", time: "15:30", venue: "BayArena" },
            { home: { code: "STU", name: "Stuttgart", color: "#e1000f" }, away: { code: "WOB", name: "Wolfsburg", color: "#1e5128" }, date: "SAT, 29 MAR", time: "15:30", venue: "MHP Arena" },
          ].map((f, i) => (
            <div className="fixture-item" key={i}>
              <div className="fixture-teams">
                <div className="fixture-team">
                  <TeamLogo code={f.home.code} sport="football" leagueCode="bundesliga" color={f.home.color} />
                  {f.home.name}
                </div>
                <div className="fixture-team">
                  <TeamLogo code={f.away.code} sport="football" leagueCode="bundesliga" color={f.away.color} />
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
