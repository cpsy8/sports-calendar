"use client";

import { useState, useEffect } from "react";
import { TeamLogo } from "../TeamLogo";
import { competitionLogoUrl } from "../../lib/image-utils";
import {
  fetchFootballFixtures,
  type FootballFixtureRow,
} from "../../lib/fetch-standings-client";
import { teamCode, teamColor, formatFixtureDate, todayStr } from "../../lib/team-meta";
import { NewsTab } from "../NewsTab";

type Tab = "news" | "fixtures" | "stats" | "teams";

const TABS: { id: Tab; label: string }[] = [
  { id: "news", label: "News" },
  { id: "fixtures", label: "Fixtures" },
  { id: "stats", label: "Stats" },
  { id: "teams", label: "Teams" },
];

const ACCENT = "#ffd700";

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
            color: active === tab.id ? "#000" : "var(--text-secondary)",
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

function FixtureItem({ f, league }: { f: FootballFixtureRow; league: string }) {
  const hCode = teamCode(f.home_team);
  const aCode = teamCode(f.away_team);
  return (
    <div className="fixture-item">
      <div className="fixture-teams">
        <div className="fixture-team">
          <TeamLogo code={hCode} sport="football" leagueCode={league} color={teamColor(hCode)} />
          {f.home_team}
        </div>
        <div className="fixture-team">
          <TeamLogo code={aCode} sport="football" leagueCode={league} color={teamColor(aCode)} />
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
}

export function UCLSection() {
  const [activeTab, setActiveTab] = useState<Tab>("fixtures");
  const [upcoming, setUpcoming] = useState<FootballFixtureRow[]>([]);
  const [results, setResults] = useState<FootballFixtureRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = todayStr();
    Promise.all([
      fetchFootballFixtures("UCL", "scheduled", 8, today),
      fetchFootballFixtures("UCL", "finished", 8),
    ]).then(([u, r]) => {
      setUpcoming(u);
      setResults(r);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: ACCENT }} />
        <div className="hero-icon"><img src={competitionLogoUrl("UCL") ?? ""} alt="UCL" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
        <div className="hero-text">
          <h2>UEFA CHAMPIONS LEAGUE</h2>
          <p>Europe&apos;s elite — 2025/26 Season</p>
        </div>
        <div className="hero-badge" style={{ background: "#ffd70020", color: ACCENT }}>
          UCL
        </div>
      </div>

      <TabBar active={activeTab} onChange={setActiveTab} />

      {activeTab === "news" && <NewsTab competition="UEFA Champions League" accent={ACCENT} />}

      {activeTab === "fixtures" && (
        <div className="grid-12 fade-in fd2">
          <div className="card span-6">
            <div className="card-header">
              <div className="card-title">Upcoming Fixtures</div>
            </div>
            {loading ? <Loading /> : upcoming.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No upcoming fixtures.</div>
            ) : upcoming.map((f) => <FixtureItem key={f.id} f={f} league="ucl" />)}
          </div>

          <div className="card span-6">
            <div className="card-header">
              <div className="card-title">Recent Results</div>
            </div>
            {loading ? <Loading /> : results.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No results yet.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
                {results.map((r) => {
                  const hCode = teamCode(r.home_team);
                  const aCode = teamCode(r.away_team);
                  return (
                    <div className="result-card" key={r.id}>
                      <div className="result-label">{formatFixtureDate(r.date)}</div>
                      <div className="result-row">
                        <div className="fixture-team">
                          <TeamLogo code={hCode} sport="football" leagueCode="ucl" color={teamColor(hCode)} />
                          {r.home_team}
                        </div>
                        <div className="fixture-score">{r.home_score} — {r.away_score}</div>
                        <div className="fixture-team">
                          <TeamLogo code={aCode} sport="football" leagueCode="ucl" color={teamColor(aCode)} />
                          {r.away_team}
                        </div>
                      </div>
                      <div className="result-ft">FT</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "stats" && <Placeholder label="Stats" />}
      {activeTab === "teams" && <Placeholder label="Teams" />}
    </>
  );
}
