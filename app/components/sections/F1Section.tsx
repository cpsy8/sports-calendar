"use client";

import { useState, useEffect } from "react";
import {
  fetchF1DriverStandings,
  fetchF1ConstructorStandings,
  fetchF1Calendar,
  fetchF1RaceResults,
  type F1DriverRow,
  type F1ConstructorRow,
  type F1RaceRow,
  type F1RaceResultRow,
} from "../../lib/fetch-standings-client";
import { F1_TEAM_COLORS, todayStr } from "../../lib/team-meta";
import { NewsTab } from "../NewsTab";

type Tab = "news" | "schedule" | "teams" | "drivers";

const TABS: { id: Tab; label: string }[] = [
  { id: "news", label: "News" },
  { id: "schedule", label: "F1 Schedule" },
  { id: "teams", label: "Teams" },
  { id: "drivers", label: "Drivers" },
];

const ACCENT = "#e10600";

const COUNTRY_FLAGS: Record<string, string> = {
  Australia: "🇦🇺", China: "🇨🇳", Japan: "🇯🇵", Bahrain: "🇧🇭",
  "Saudi Arabia": "🇸🇦", USA: "🇺🇸", "United States": "🇺🇸",
  Canada: "🇨🇦", Monaco: "🇲🇨", Spain: "🇪🇸", Austria: "🇦🇹",
  "Great Britain": "🇬🇧", "United Kingdom": "🇬🇧", Hungary: "🇭🇺",
  Belgium: "🇧🇪", Netherlands: "🇳🇱", Italy: "🇮🇹", Azerbaijan: "🇦🇿",
  Singapore: "🇸🇬", Mexico: "🇲🇽", Brazil: "🇧🇷", "Las Vegas": "🇺🇸",
  Qatar: "🇶🇦", UAE: "🇦🇪", "Abu Dhabi": "🇦🇪", "United Arab Emirates": "🇦🇪",
};

function driverLastName(fullName: string): string {
  const parts = fullName.trim().split(" ");
  return parts[parts.length - 1];
}

function raceDisplayStatus(
  race: F1RaceRow,
  today: string,
  nextScheduledRound: number | null,
): "completed" | "next" | "upcoming" | "live" {
  if (race.status === "completed" || race.status === "cancelled") return "completed";
  if (["practice", "qualifying", "race"].includes(race.status)) return "live";
  if (race.round === nextScheduledRound) return "next";
  return "upcoming";
}

function formatRaceDate(dateStr: string): string {
  const [, m, d] = dateStr.split("-").map(Number);
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return `${String(d).padStart(2, "0")} ${months[m - 1]}`;
}

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

export function F1Section() {
  const [activeTab, setActiveTab] = useState<Tab>("drivers");
  const [drivers, setDrivers] = useState<F1DriverRow[]>([]);
  const [constructors, setConstructors] = useState<F1ConstructorRow[]>([]);
  const [calendar, setCalendar] = useState<F1RaceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRound, setSelectedRound] = useState<F1RaceRow | null>(null);
  const [raceResults, setRaceResults] = useState<F1RaceResultRow[]>([]);
  const [resultsLoading, setResultsLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchF1DriverStandings(),
      fetchF1ConstructorStandings(),
      fetchF1Calendar(),
    ]).then(([d, c, cal]) => {
      setDrivers([...d].sort((a, b) => Number(b.points) - Number(a.points)));
      setConstructors([...c].sort((a, b) => Number(b.points) - Number(a.points)));
      setCalendar(cal);
      setLoading(false);
    });
  }, []);

  function handleRoundClick(race: F1RaceRow) {
    if (race.status !== "completed") return;
    if (selectedRound?.round === race.round) {
      setSelectedRound(null);
      setRaceResults([]);
      return;
    }
    setSelectedRound(race);
    setRaceResults([]);
    setResultsLoading(true);
    fetchF1RaceResults(String(race.season), race.round).then((results) => {
      setRaceResults(results.sort((a, b) => (a.position ?? 99) - (b.position ?? 99)));
      setResultsLoading(false);
    });
  }

  const today = todayStr();
  const maxPts = drivers.length > 0 ? Number(drivers[0].points) : 1;
  const nextScheduledRound = calendar.find(
    (r) => r.status === "scheduled" && r.date >= today,
  )?.round ?? null;

  const currentRound = calendar.filter(
    (r) => r.status === "completed" || ["practice", "qualifying", "race"].includes(r.status),
  ).length;

  return (
    <>
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: ACCENT }} />
        <div className="hero-icon">🏎️</div>
        <div className="hero-text">
          <h2>FORMULA 1</h2>
          <p>2026 World Championship</p>
        </div>
        {calendar.length > 0 && (
          <div className="hero-badge" style={{ background: "#e1060020", color: ACCENT }}>
            Round {currentRound} of {calendar.length}
          </div>
        )}
      </div>

      <TabBar active={activeTab} onChange={setActiveTab} />

      {activeTab === "news" && <NewsTab competition="Formula 1" accent={ACCENT} />}

      {activeTab === "drivers" && (
        <div className="grid-12 fade-in fd2">
          <div className="card span-12">
            <div className="card-header">
              <div className="card-title">Driver Standings</div>
            </div>
            {loading ? <Loading /> : drivers.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No standings data yet.</div>
            ) : drivers.map((d) => {
              const pct = maxPts > 0 ? Math.round((Number(d.points) / maxPts) * 100) : 0;
              const color = F1_TEAM_COLORS[d.team] ?? "#888";
              return (
                <div className="driver-bar-row" key={d.position}>
                  <div className="driver-bar-pos">{d.position}</div>
                  <div className="driver-bar-name">{driverLastName(d.driver)}</div>
                  <div className="driver-bar-track">
                    <div
                      className="driver-bar-fill"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}88)` }}
                    >
                      {Number(d.points) > 0 ? Number(d.points) : ""}
                    </div>
                  </div>
                  <div className="driver-bar-pts">{Number(d.points)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "teams" && (
        <div className="grid-12 fade-in fd2">
          <div className="card span-12">
            <div className="card-header">
              <div className="card-title">Constructor Standings</div>
            </div>
            {loading ? <Loading /> : constructors.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No standings data yet.</div>
            ) : (
              <table className="standings-table">
                <thead>
                  <tr><th>#</th><th>Team</th><th>Pts</th></tr>
                </thead>
                <tbody>
                  {constructors.map((c) => {
                    const color = F1_TEAM_COLORS[c.driver] ?? "#888";
                    return (
                      <tr key={c.position}>
                        <td><span className="pos-num">{c.position}</span></td>
                        <td>
                          <div className="team-cell">
                            <div className="driver-team-line" style={{ background: color }} />
                            {c.driver}
                          </div>
                        </td>
                        <td className="points-cell">{Number(c.points)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {activeTab === "schedule" && (
        <div className="grid-12 fade-in fd2">
          <div className="card span-12">
            <div className="card-header">
              <div className="card-title">2026 Race Calendar</div>
            </div>
            {loading ? <Loading /> : calendar.length === 0 ? (
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No calendar data yet.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 2rem" }}>
                {calendar.map((r) => {
                  const displayStatus = raceDisplayStatus(r, today, nextScheduledRound);
                  const flag = COUNTRY_FLAGS[r.country] ?? "🏁";
                  const isCompleted = r.status === "completed";
                  const isSelected = selectedRound?.round === r.round;
                  return (
                    <div
                      className="race-item"
                      key={r.round}
                      onClick={() => handleRoundClick(r)}
                      style={{
                        cursor: isCompleted ? "pointer" : "default",
                        background: isSelected ? `${ACCENT}15` : undefined,
                        borderRadius: isSelected ? "8px" : undefined,
                        outline: isSelected ? `1px solid ${ACCENT}40` : undefined,
                        transition: "background 0.15s",
                      }}
                    >
                      <div className="race-round">R{r.round}</div>
                      <div className="race-flag">{flag}</div>
                      <div className="race-info">
                        <div className="race-name">{r.country} Grand Prix</div>
                        <div className="race-circuit">{r.circuit}</div>
                      </div>
                      <div>
                        <div className="race-date">{formatRaceDate(r.date)}</div>
                        <div className={`race-status ${displayStatus}`}>
                          {displayStatus === "next" ? "NEXT" : displayStatus === "completed" ? "Done ›" : displayStatus === "live" ? "LIVE" : "Upcoming"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {selectedRound && (
            <div className="card span-12 fade-in" style={{ marginTop: "1rem" }}>
              <div className="card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="card-title">
                  {COUNTRY_FLAGS[selectedRound.country] ?? "🏁"} R{selectedRound.round} — {selectedRound.country} Grand Prix Results
                </div>
                <button
                  onClick={() => { setSelectedRound(null); setRaceResults([]); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "1.1rem" }}
                >
                  ✕
                </button>
              </div>
              {resultsLoading ? <Loading /> : raceResults.length === 0 ? (
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No results available yet.</div>
              ) : (
                <table className="standings-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Driver</th>
                      <th>Team</th>
                      <th>Grid</th>
                      <th>Laps</th>
                      <th>Status</th>
                      <th>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raceResults.map((r, i) => {
                      const color = F1_TEAM_COLORS[r.constructor] ?? "#888";
                      return (
                        <tr key={i}>
                          <td><span className="pos-num">{r.position ?? "—"}</span></td>
                          <td>
                            <div className="team-cell">
                              <div className="driver-team-line" style={{ background: color }} />
                              {r.driver}
                              {r.is_fastest_lap && (
                                <span style={{ marginLeft: "0.4rem", color: "#a855f7", fontSize: "0.7rem", fontWeight: 700 }}>⚡FL</span>
                              )}
                            </div>
                          </td>
                          <td style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{r.constructor}</td>
                          <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{r.grid ?? "—"}</td>
                          <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{r.laps}</td>
                          <td style={{ color: r.status_text === "Finished" ? "var(--text-secondary)" : "#f87171", fontSize: "0.8rem" }}>{r.status_text}</td>
                          <td className="points-cell">{Number(r.points)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
