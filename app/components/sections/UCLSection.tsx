"use client";

import { TeamLogo } from "../TeamLogo";

export function UCLSection() {
  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: "#ffd700" }} />
        <div className="hero-icon">🏆</div>
        <div className="hero-text">
          <h2>UEFA CHAMPIONS LEAGUE</h2>
          <p>Europe&apos;s elite — 2025/26 Season</p>
        </div>
        <div className="hero-badge" style={{ background: "#ffd70020", color: "#ffd700" }}>
          Quarter-Finals
        </div>
      </div>

      <div className="stat-row fade-in fd1">
        <div className="stat-card" style={{ borderTop: "3px solid #ffd700" }}>
          <div className="stat-value" style={{ color: "#ffd700" }}>QF</div>
          <div className="stat-label">Current Round</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid var(--accent-blue)" }}>
          <div className="stat-value" style={{ color: "var(--accent-blue)" }}>8</div>
          <div className="stat-label">Teams Left</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid var(--accent-purple)" }}>
          <div className="stat-value" style={{ color: "var(--accent-purple)" }}>310</div>
          <div className="stat-label">Goals So Far</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid #22c55e" }}>
          <div className="stat-value" style={{ color: "#22c55e" }}>MAY 30</div>
          <div className="stat-label">Final Date</div>
        </div>
      </div>

      <div className="grid-12 fade-in fd2">
        <div className="card span-6">
          <div className="card-header">
            <div className="card-title">Quarter-Final Fixtures</div>
          </div>
          {[
            { home: { code: "BAR", name: "Barcelona", color: "#004d98" }, away: { code: "BAY", name: "Bayern Munich", color: "#dc0000" }, date: "TUE, 8 APR", time: "21:00 CET", venue: "Camp Nou" },
            { home: { code: "ARS", name: "Arsenal", color: "#ef0107" }, away: { code: "JUV", name: "Juventus", color: "#000" }, date: "TUE, 8 APR", time: "21:00 CET", venue: "Emirates" },
            { home: { code: "LIV", name: "Liverpool", color: "#c8102e" }, away: { code: "INT", name: "Inter Milan", color: "#1d428a" }, date: "WED, 9 APR", time: "21:00 CET", venue: "Anfield" },
            { home: { code: "BVB", name: "Dortmund", color: "#fde047", textColor: "#000" }, away: { code: "CHE", name: "Chelsea", color: "#034694" }, date: "WED, 9 APR", time: "21:00 CET", venue: "Signal Iduna" },
          ].map((f, i) => (
            <div className="fixture-item" key={i}>
              <div className="fixture-teams">
                <div className="fixture-team">
                  <TeamLogo code={f.home.code} sport="football" leagueCode="ucl" color={f.home.color} />
                  {f.home.name}
                </div>
                <div className="fixture-team">
                  <TeamLogo code={f.away.code} sport="football" leagueCode="ucl" color={f.away.color} />
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

        <div className="card span-6">
          <div className="card-header">
            <div className="card-title">Round of 16 Results</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
            {[
              { label: "R16", home: { code: "BAR", name: "Barça", color: "#004d98" }, score: "5–3", away: { code: "TOT", name: "Spurs", color: "#132257" } },
              { label: "R16", home: { code: "ARS", name: "Arsenal", color: "#ef0107" }, score: "4–1", away: { code: "PSV", name: "PSV", color: "#e30613" } },
              { label: "R16", home: { code: "LIV", name: "Liverpool", color: "#c8102e" }, score: "3–2", away: { code: "RMA", name: "Madrid", color: "#fff", textColor: "#000", border: "1px solid #333" } },
              { label: "R16", home: { code: "BAY", name: "Bayern", color: "#dc0000" }, score: "6–2", away: { code: "SPO", name: "Sporting", color: "#009e60" } },
            ].map((r, i) => (
              <div className="result-card" key={i}>
                <div className="result-label">{r.label}</div>
                <div className="result-row">
                  <div className="fixture-team">
                    <TeamLogo code={r.home.code} sport="football" leagueCode="ucl" color={r.home.color} />
                    {r.home.name}
                  </div>
                  <div className="fixture-score">{r.score}</div>
                  <div className="fixture-team">
                    <TeamLogo code={r.away.code} sport="football" leagueCode="ucl" color={r.away.color} />
                    {r.away.name}
                  </div>
                </div>
                <div className="result-ft">Agg</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
