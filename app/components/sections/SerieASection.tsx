"use client";

import { useState, useEffect } from "react";
import { TeamLogo } from "../TeamLogo";
import {
  fetchFootballStandings,
  fetchFootballFixtures,
  type FootballStandingRow,
  type FootballFixtureRow,
} from "../../lib/fetch-standings-client";
import { teamCode, teamColor, formatFixtureDate, formatGD, todayStr } from "../../lib/team-meta";

const ACCENT = "#008fd5";
const LEAGUE = "seriea";

function Loading() {
  return <div style={{ color: "var(--text-muted)", padding: "1rem 0", fontSize: "0.85rem" }}>Loading…</div>;
}

export function SerieASection() {
  const [standings, setStandings] = useState<FootballStandingRow[]>([]);
  const [upcoming, setUpcoming] = useState<FootballFixtureRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = todayStr();
    Promise.all([
      fetchFootballStandings("Serie A"),
      fetchFootballFixtures("SRA", "scheduled", 5, today),
    ]).then(([s, u]) => {
      setStandings(s);
      setUpcoming(u);
      setLoading(false);
    });
  }, []);

  const matchday = standings.length > 0 ? Math.max(...standings.map((r) => r.played)) : null;

  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: ACCENT }} />
        <div className="hero-icon">🇮🇹</div>
        <div className="hero-text">
          <h2>SERIE A</h2>
          <p>Italy — 2025/26 Season</p>
        </div>
        {matchday !== null && (
          <div className="hero-badge" style={{ background: "#008fd520", color: ACCENT }}>
            Matchday {matchday}
          </div>
        )}
      </div>

      <div className="grid-12 fade-in fd1">
        <div className="card span-7">
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

        <div className="card span-5">
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
      </div>
    </>
  );
}
