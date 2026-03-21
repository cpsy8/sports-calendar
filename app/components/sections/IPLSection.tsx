"use client";

import { TeamLogo } from "../TeamLogo";

const IPL_TABLE = [
  { pos: 1, code: "CSK", name: "Chennai Super Kings", color: "#FCCA06", textColor: "#000", p: 4, w: 3, l: 1, nrr: "+0.85", pts: 6 },
  { pos: 2, code: "MI", name: "Mumbai Indians", color: "#004BA0", p: 4, w: 3, l: 1, nrr: "+0.72", pts: 6 },
  { pos: 3, code: "RCB", name: "Royal Challengers", color: "#EC1C24", p: 4, w: 3, l: 1, nrr: "+0.54", pts: 6 },
  { pos: 4, code: "KKR", name: "Kolkata Knight Riders", color: "#3A225D", p: 4, w: 2, l: 2, nrr: "+0.30", pts: 4 },
  { pos: 5, code: "GT", name: "Gujarat Titans", color: "#1C4480", p: 4, w: 2, l: 2, nrr: "+0.12", pts: 4 },
  { pos: 6, code: "RR", name: "Rajasthan Royals", color: "#EA1A85", p: 4, w: 2, l: 2, nrr: "-0.08", pts: 4 },
  { pos: 7, code: "SRH", name: "Sunrisers Hyderabad", color: "#F7A721", textColor: "#000", p: 4, w: 1, l: 3, nrr: "-0.42", pts: 2 },
  { pos: 8, code: "DC", name: "Delhi Capitals", color: "#00008B", p: 4, w: 1, l: 3, nrr: "-0.55", pts: 2 },
  { pos: 9, code: "PBKS", name: "Punjab Kings", color: "#AA4545", p: 4, w: 1, l: 3, nrr: "-0.68", pts: 2 },
  { pos: 10, code: "LSG", name: "Lucknow Super Giants", color: "#A72056", p: 3, w: 0, l: 3, nrr: "-0.92", pts: 0 },
];

const SCORECARDS = [
  {
    match: "Match 15 • CSK vs MI",
    status: "live" as const,
    batting: { team: "CSK", code: "CSK", color: "#FCCA06", textColor: "#000", score: "142/4", overs: "(15.2)" },
    bowling: { team: "MI", code: "MI", color: "#004BA0", score: "168/7", overs: "(20)" },
    result: "CSK need 27 runs from 28 balls",
  },
  {
    match: "Match 14 • RCB vs KKR",
    status: "completed" as const,
    batting: { team: "RCB", code: "RCB", color: "#EC1C24", score: "201/5", overs: "(20)" },
    bowling: { team: "KKR", code: "KKR", color: "#3A225D", score: "198/8", overs: "(20)" },
    result: "Royal Challengers won by 3 runs",
  },
  {
    match: "Match 13 • GT vs SRH",
    status: "completed" as const,
    batting: { team: "GT", code: "GT", color: "#1C4480", score: "187/4", overs: "(20)" },
    bowling: { team: "SRH", code: "SRH", color: "#F7A721", textColor: "#000", score: "154/9", overs: "(20)" },
    result: "Gujarat Titans won by 33 runs",
  },
];

const UPCOMING = [
  { home: { code: "RR", name: "Rajasthan Royals", color: "#EA1A85" }, away: { code: "DC", name: "Delhi Capitals", color: "#00008B" }, date: "THU, 19 MAR", time: "19:30 IST", venue: "Sawai Mansingh" },
  { home: { code: "PBKS", name: "Punjab Kings", color: "#AA4545" }, away: { code: "LSG", name: "Lucknow SG", color: "#A72056" }, date: "FRI, 20 MAR", time: "19:30 IST", venue: "Mullanpur" },
  { home: { code: "KKR", name: "Kolkata KR", color: "#3A225D" }, away: { code: "GT", name: "Gujarat Titans", color: "#1C4480" }, date: "SAT, 21 MAR", time: "15:30 IST", venue: "Eden Gardens" },
];

export function IPLSection() {
  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: "#f5a623" }} />
        <div className="hero-icon">🏏</div>
        <div className="hero-text">
          <h2>TATA IPL 2026</h2>
          <p>Indian Premier League — Season 19</p>
        </div>
        <div className="hero-badge" style={{ background: "#f5a62320", color: "#f5a623" }}>
          Match 15 Live
        </div>
      </div>

      <div className="stat-row fade-in fd1">
        <div className="stat-card" style={{ borderTop: "3px solid #f5a623" }}>
          <div className="stat-value" style={{ color: "#f5a623" }}>10</div>
          <div className="stat-label">Teams</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid #22c55e" }}>
          <div className="stat-value" style={{ color: "#22c55e" }}>74</div>
          <div className="stat-label">Total Matches</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid var(--accent-blue)" }}>
          <div className="stat-value" style={{ color: "var(--accent-blue)" }}>14</div>
          <div className="stat-label">Played</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid var(--accent-purple)" }}>
          <div className="stat-value" style={{ color: "var(--accent-purple)" }}>8</div>
          <div className="stat-label">Venues</div>
        </div>
      </div>

      <div className="grid-12 fade-in fd2">
        <div className="card span-7">
          <div className="card-header">
            <div className="card-title">Points Table</div>
            <button className="card-action">Full Table →</button>
          </div>
          <table className="standings-table">
            <thead>
              <tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>L</th><th>NRR</th><th>Pts</th></tr>
            </thead>
            <tbody>
              {IPL_TABLE.map((row) => (
                <tr key={row.pos}>
                  <td><span className="pos-num">{row.pos}</span></td>
                  <td>
                    <div className="team-cell">
                      <TeamLogo code={row.code} sport="cricket" leagueCode="ipl" color={row.color} />
                      {row.name}
                    </div>
                  </td>
                  <td>{row.p}</td><td>{row.w}</td><td>{row.l}</td>
                  <td>{row.nrr}</td><td className="points-cell">{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="span-5" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            {SCORECARDS.map((sc, i) => (
              <div className="scorecard" key={i}>
                <div className="scorecard-header">
                  <div className="scorecard-match">{sc.match}</div>
                  <div className={`scorecard-status ${sc.status}`}>
                    {sc.status === "live" ? "LIVE" : "Full Time"}
                  </div>
                </div>
                <div className="scorecard-body">
                  <div className="scorecard-team">
                    <div className="scorecard-team-name">
                      <TeamLogo code={sc.batting.code} sport="cricket" leagueCode="ipl" color={sc.batting.color} />
                      {sc.batting.team}
                    </div>
                    <div>
                      <span className="scorecard-team-score">{sc.batting.score}</span>
                      <span className="scorecard-team-overs">{sc.batting.overs}</span>
                    </div>
                  </div>
                  <div className="scorecard-team">
                    <div className="scorecard-team-name">
                      <TeamLogo code={sc.bowling.code} sport="cricket" leagueCode="ipl" color={sc.bowling.color} />
                      {sc.bowling.team}
                    </div>
                    <div>
                      <span className="scorecard-team-score">{sc.bowling.score}</span>
                      <span className="scorecard-team-overs">{sc.bowling.overs}</span>
                    </div>
                  </div>
                  <div className="scorecard-result">{sc.result}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: "1.4rem" }}>
            <div className="card-header">
              <div className="card-title">Upcoming Matches</div>
            </div>
            {UPCOMING.map((f, i) => (
              <div className="fixture-item" key={i}>
                <div className="fixture-teams">
                  <div className="fixture-team">
                    <TeamLogo code={f.home.code} sport="cricket" leagueCode="ipl" color={f.home.color} />
                    {f.home.name}
                  </div>
                  <div className="fixture-team">
                    <TeamLogo code={f.away.code} sport="cricket" leagueCode="ipl" color={f.away.color} />
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
      </div>
    </>
  );
}
