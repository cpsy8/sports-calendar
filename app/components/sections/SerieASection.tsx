"use client";

import { TeamLogo } from "../TeamLogo";

export function SerieASection() {
  const standings = [
    { pos: 1, code: "INT", name: "Inter Milan", color: "#1d428a", p: 28, w: 21, d: 4, l: 3, gd: "+38", pts: 67 },
    { pos: 2, code: "NAP", name: "Napoli", color: "#1a78cf", p: 28, w: 19, d: 5, l: 4, gd: "+28", pts: 62 },
    { pos: 3, code: "JUV", name: "Juventus", color: "#000", p: 28, w: 17, d: 7, l: 4, gd: "+22", pts: 58 },
    { pos: 4, code: "MIL", name: "AC Milan", color: "#ac1b2f", p: 28, w: 16, d: 5, l: 7, gd: "+15", pts: 53 },
    { pos: 5, code: "LAZ", name: "Lazio", color: "#87ceeb", textColor: "#000", p: 28, w: 14, d: 6, l: 8, gd: "+10", pts: 48 },
    { pos: 6, code: "FIO", name: "Fiorentina", color: "#7b2d8e", p: 28, w: 13, d: 7, l: 8, gd: "+6", pts: 46 },
  ];

  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: "#008fd5" }} />
        <div className="hero-icon">🇮🇹</div>
        <div className="hero-text">
          <h2>SERIE A</h2>
          <p>Italy — 2025/26 Season</p>
        </div>
        <div className="hero-badge" style={{ background: "#008fd520", color: "#008fd5" }}>
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
                      <TeamLogo code={row.code} sport="football" leagueCode="seriea" color={row.color} />
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
            { home: { code: "INT", name: "Inter", color: "#1d428a" }, away: { code: "JUV", name: "Juventus", color: "#000" }, date: "SUN, 30 MAR", time: "20:45", venue: "San Siro" },
            { home: { code: "MIL", name: "AC Milan", color: "#ac1b2f" }, away: { code: "NAP", name: "Napoli", color: "#1a78cf" }, date: "SAT, 29 MAR", time: "18:00", venue: "San Siro" },
            { home: { code: "LAZ", name: "Lazio", color: "#87ceeb", textColor: "#000" }, away: { code: "FIO", name: "Fiorentina", color: "#7b2d8e" }, date: "SAT, 29 MAR", time: "15:00", venue: "Olimpico" },
          ].map((f, i) => (
            <div className="fixture-item" key={i}>
              <div className="fixture-teams">
                <div className="fixture-team">
                  <TeamLogo code={f.home.code} sport="football" leagueCode="seriea" color={f.home.color} />
                  {f.home.name}
                </div>
                <div className="fixture-team">
                  <TeamLogo code={f.away.code} sport="football" leagueCode="seriea" color={f.away.color} />
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
