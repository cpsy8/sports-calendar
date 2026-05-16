"use client";

import { useEffect, useState } from "react";
import {
  fetchFootballTeams,
  type FootballTeamRow,
} from "../lib/fetch-teams-client";
import { TeamDetailView } from "./TeamDetailView";

interface TeamsTabProps {
  competitionShort: string;
  leagueCode: string;
  accent: string;
}

function TeamCrest({ url, name, accent }: { url: string | null; name: string; accent: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  if (!url || failed) {
    return (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 8,
          background: `${accent}22`,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "0.95rem",
        }}
      >
        {initials || "?"}
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={`${name} crest`}
      width={64}
      height={64}
      loading="lazy"
      style={{ objectFit: "contain" }}
      onError={() => setFailed(true)}
    />
  );
}

export function TeamsTab({ competitionShort, leagueCode, accent }: TeamsTabProps) {
  const [teams, setTeams] = useState<FootballTeamRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<FootballTeamRow | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchFootballTeams(competitionShort).then((data) => {
      if (cancelled) return;
      setTeams(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [competitionShort]);

  if (selectedTeam) {
    return (
      <TeamDetailView
        team={selectedTeam}
        accent={accent}
        leagueCode={leagueCode}
        onBack={() => setSelectedTeam(null)}
      />
    );
  }

  return (
    <div className="grid-12 fade-in fd2">
      <div className="card span-12">
        <div className="card-header">
          <div className="card-title">Teams</div>
        </div>

        {loading ? (
          <div style={{ color: "var(--text-muted)", padding: "1rem 0", fontSize: "0.85rem" }}>
            Loading…
          </div>
        ) : teams.length === 0 ? (
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            No team data yet.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(140px, 100%), 1fr))",
              gap: "0.75rem",
            }}
          >
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem 0.75rem",
                  borderRadius: 10,
                  border: "1px solid var(--border-subtle)",
                  background: "var(--card-bg, transparent)",
                  cursor: "pointer",
                  transition: "transform 0.15s, border-color 0.15s, background 0.15s",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <TeamCrest url={team.crest} name={team.name} accent={accent} />
                <div style={{ fontWeight: 600, fontSize: "0.82rem", lineHeight: 1.25 }}>
                  {team.name}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.25,
                  }}
                >
                  {team.short_name ?? team.tla ?? ""}
                  {team.venue ? <>
                    <br />
                    {team.venue}
                  </> : null}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
