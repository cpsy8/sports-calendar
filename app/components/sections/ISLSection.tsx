"use client";

import { useState, useEffect } from "react";
import { TeamLogo } from "../TeamLogo";
import { competitionLogoUrl } from "../../lib/image-utils";
import {
  fetchFootballStandings,
  fetchFootballFixtures,
  type FootballStandingRow,
  type FootballFixtureRow,
} from "../../lib/fetch-standings-client";
import { teamCode, teamColor, formatFixtureDate, formatGD, todayStr } from "../../lib/team-meta";
import { NewsTab } from "../NewsTab";

type Tab = "news" | "fixtures" | "standings" | "stats" | "teams";

const TABS: { id: Tab; label: string }[] = [
  { id: "news", label: "News" },
  { id: "fixtures", label: "Fixtures" },
  { id: "standings", label: "Standings" },
  { id: "stats", label: "Stats" },
  { id: "teams", label: "Teams" },
];

const ACCENT = "#ff6f00";
const LEAGUE = "isl";

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="fade-in fd1" style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            padding: "0.4rem 1.1rem",
            borderRadius: "20px",
            border: active === tab.id ? "none" : "1px solid var(--border-subtle)",
            background: active === tab.id ? ACCENT : "transparent",
            color: active === tab.id ? "#fff" : "var(--text-secondary)",
            fontWeight: active === tab.id ? 700 : 500,
            fontSize: "0.78rem",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="card fade-in" style={{ textAlign: "center", padding: "3rem 1.5rem", color: "var(--text-muted)" }}>
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🚧</div>
      <div style={{ fontWeight: 600 }}>{label} — Coming soon</div>
    </div>
  );
}

function Loading() {
  return <div style={{ color: "var(--text-muted)", padding: "1rem 0", fontSize: "0.85rem" }}>Loading…</div>;
}

export function ISLSection() {
  const [activeTab, setActiveTab] = useState<Tab>("news");
  const [standings, setStandings] = useState<FootballStandingRow[]>([]);
  const [upcoming, setUpcoming] = useState<FootballFixtureRow[]>([]);
  const [recent, setRecent] = useState<FootballFixtureRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = todayStr();
    Promise.all([
      fetchFootballStandings("Indian Super League"),
      fetchFootballFixtures("ISL", "scheduled", 5, today),
      fetchFootballFixtures("ISL", "finished", 4),
    ]).then(([s, u, r]) => {
      setStandings(s);
      setUpcoming(u);
      setRecent(r);
      setLoading(false);
    });
  }, []);

  const matchday = standings.length > 0 ? Math.max(...standings.map((r) => r.played)) : null;

  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: ACCENT }} />
        <div className="hero-icon"><img src={competitionLogoUrl("ISL") ?? ""} alt="ISL" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
        <div className="hero-text">
          <h2>INDIAN SUPER LEAGUE</h2>
          <p>India — 2025/26 Season</p>
        </div>
        {matchday !== null && (
          <div className="hero-badge" style={{ background: "#ff6f0020", color: ACCENT }}>
            Matchday {matchday}
          </div>
        )}
      </div>

      <TabBar active={activeTab} onChange={setActiveTab} />

      {activeTab === "news" && <NewsTab competition="Indian Super League" accent={ACCENT} />}

      {activeTab === "fixtures" && (
        <div className="grid-12 fade-in fd2">
          <div className="card span-6">
            <div className="card-header">
              <div className="card-title">Upcoming Fixtures</div>
            </div>
            {loading ? <Loading /> : upcoming.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No upcoming fixtures.</div>
            ) : upcoming.map((f) => {
              const hCode = teamCode(f.home_team);
              const aCode = teamCode(f.away_team);
              return (
                <div className="fixture-item" key={f.id}>
                  <div className="fixture-teams">
                    <div className="fixture-team">
                      <TeamLogo code={hCode} sport="football" leagueCode={LEAGUE} color={teamColor(hCode)} />
                      {f.home_team}
                    </div>
                    <div className="fixture-team">
                      <TeamLogo code={aCode} sport="football" leagueCode={LEAGUE} color={teamColor(aCode)} />
                      {f.away_team}
                    </div>
                  </div>
                  <div className="fixture-meta">
                    <div className="fixture-date">{formatFixtureDate(f.date)}</div>
                    <div className="fixture-time">{f.kickoff}</div>
                    {f.venue && <div className="fixture-venue">{f.venue}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card span-6">
            <div className="card-header">
              <div className="card-title">Recent Results</div>
            </div>
            {loading ? <Loading /> : recent.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No results yet.</div>
            ) : recent.map((r) => {
              const hCode = teamCode(r.home_team);
              const aCode = teamCode(r.away_team);
              return (
                <div className="result-card" key={r.id}>
                  <div className="result-label">{formatFixtureDate(r.date)}</div>
                  <div className="result-row">
                    <div className="fixture-team">
                      <TeamLogo code={hCode} sport="football" leagueCode={LEAGUE} color={teamColor(hCode)} />
                      {r.home_team}
                    </div>
                    <div className="fixture-score">{r.home_score} — {r.away_score}</div>
                    <div className="fixture-team">
                      <TeamLogo code={aCode} sport="football" leagueCode={LEAGUE} color={teamColor(aCode)} />
                      {r.away_team}
                    </div>
                  </div>
                  <div className="result-ft">FT{r.venue ? ` • ${r.venue}` : ""}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "standings" && (
        <div className="grid-12 fade-in fd2">
          <div className="card span-12">
            <div className="card-header">
              <div className="card-title">Standings</div>
            </div>
            {loading ? <Loading /> : standings.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No standings data yet.</div>
            ) : (
              <table className="standings-table">
                <thead>
                  <tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr>
                </thead>
                <tbody>
                  {standings.map((row) => {
                    const code = teamCode(row.team);
                    return (
                      <tr key={row.position}>
                        <td><span className="pos-num">{row.position}</span></td>
                        <td>
                          <div className="team-cell">
                            <TeamLogo code={code} sport="football" leagueCode={LEAGUE} color={teamColor(code)} />
                            {row.team}
                          </div>
                        </td>
                        <td>{row.played}</td><td>{row.won}</td><td>{row.drawn}</td><td>{row.lost}</td>
                        <td>{formatGD(row.goal_difference)}</td>
                        <td className="points-cell">{row.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {activeTab === "stats" && <Placeholder label="Stats" />}
      {activeTab === "teams" && <Placeholder label="Teams" />}
    </>
  );
}
