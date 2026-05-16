"use client";

import { useEffect, useState } from "react";
import {
  fetchFootballPlayersByTeam,
  type FootballPlayerRow,
  type FootballTeamRow,
} from "../lib/fetch-teams-client";

interface TeamDetailViewProps {
  team: FootballTeamRow;
  accent: string;
  leagueCode: string;
  onBack: () => void;
}

const POSITION_ORDER = ["Goalkeeper", "Defence", "Midfield", "Offence"] as const;

function computeAge(dob: string | null): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

function formatDate(s: string | null): string {
  if (!s) return "—";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function Crest({ url, name, size = 96 }: { url: string | null; name: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (!url || failed) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 12,
          background: "var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          color: "var(--text-muted)",
        }}
      >
        {name.split(" ").map((s) => s[0]).join("").slice(0, 3).toUpperCase()}
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={`${name} crest`}
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      onError={() => setFailed(true)}
    />
  );
}

export function TeamDetailView({ team, accent, onBack }: TeamDetailViewProps) {
  const [players, setPlayers] = useState<FootballPlayerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchFootballPlayersByTeam(team.competition_short, team.team_api_id).then((data) => {
      if (cancelled) return;
      setPlayers(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [team.competition_short, team.team_api_id]);

  const grouped: Record<string, FootballPlayerRow[]> = {};
  for (const p of players) {
    const key = p.position ?? "Other";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  }

  const orderedKeys = [
    ...POSITION_ORDER.filter((k) => grouped[k]),
    ...Object.keys(grouped).filter((k) => !POSITION_ORDER.includes(k as typeof POSITION_ORDER[number])),
  ];

  return (
    <div className="fade-in fd2" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <button
          onClick={onBack}
          style={{
            padding: "0.4rem 0.9rem",
            borderRadius: 20,
            border: "1px solid var(--border-subtle)",
            background: "transparent",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "0.78rem",
          }}
        >
          ← Back to teams
        </button>
      </div>

      <div className="card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          <Crest url={team.crest} name={team.name} size={96} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <h2 style={{ margin: 0, fontSize: "1.5rem", color: accent }}>{team.name}</h2>
            {team.short_name && (
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 2 }}>
                {team.short_name}
                {team.tla ? ` · ${team.tla}` : ""}
              </div>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "0.5rem 1.25rem",
                marginTop: "0.85rem",
                fontSize: "0.8rem",
              }}
            >
              {team.founded && (
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Founded: </span>
                  {team.founded}
                </div>
              )}
              {team.venue && (
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Venue: </span>
                  {team.venue}
                </div>
              )}
              {team.club_colors && (
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Colors: </span>
                  {team.club_colors}
                </div>
              )}
              {team.website && (
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Website: </span>
                  <a
                    href={team.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accent }}
                  >
                    {team.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {team.coach_name && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Coach</div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "0.5rem 1.25rem",
              fontSize: "0.85rem",
            }}
          >
            <div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>Name</div>
              <div style={{ fontWeight: 600 }}>{team.coach_name}</div>
            </div>
            {team.coach_nationality && (
              <div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>Nationality</div>
                <div>{team.coach_nationality}</div>
              </div>
            )}
            {team.coach_dob && (
              <div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>Date of birth</div>
                <div>
                  {formatDate(team.coach_dob)}
                  {computeAge(team.coach_dob) != null && (
                    <span style={{ color: "var(--text-muted)" }}> · {computeAge(team.coach_dob)}y</span>
                  )}
                </div>
              </div>
            )}
            {team.coach_contract_until && (
              <div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>Contract until</div>
                <div>{formatDate(team.coach_contract_until)}</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div className="card-title">Squad</div>
        </div>
        {loading ? (
          <div style={{ color: "var(--text-muted)", padding: "1rem 0", fontSize: "0.85rem" }}>
            Loading…
          </div>
        ) : players.length === 0 ? (
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            No squad data yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {orderedKeys.map((pos) => (
              <div key={pos}>
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    color: accent,
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  {pos}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "0.5rem",
                  }}
                >
                  {grouped[pos].map((p) => {
                    const age = computeAge(p.dob);
                    return (
                      <div
                        key={p.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.65rem",
                          padding: "0.5rem 0.65rem",
                          borderRadius: 8,
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: `${accent}22`,
                            color: accent,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.78rem",
                            flexShrink: 0,
                          }}
                        >
                          {p.shirt_number ?? "—"}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: "0.85rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {p.name}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                            {p.nationality ?? "—"}
                            {age != null && ` · ${age}y`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
