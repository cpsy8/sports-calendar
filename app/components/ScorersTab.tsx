"use client";

import { useState, useEffect, useMemo } from "react";
import {
  fetchFootballScorers,
  type FootballScorerRow,
} from "../lib/fetch-standings-client";

type View = "goals" | "assists";

function accentTextColor(accent: string): string {
  // Heuristic: lightish accents use black; dark/saturated accents use white.
  const hex = accent.replace("#", "");
  if (hex.length !== 6) return "#fff";
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#000" : "#fff";
}

interface ScorersTabProps {
  competitionShort: string;
  accent: string;
}

export function ScorersTab({ competitionShort, accent }: ScorersTabProps) {
  const [view, setView] = useState<View>("goals");
  const [rows, setRows] = useState<FootballScorerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchFootballScorers(competitionShort).then((data) => {
      if (cancelled) return;
      setRows(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [competitionShort]);

  const displayRows = useMemo(() => {
    if (view === "goals") return rows;
    return [...rows]
      .sort((a, b) => {
        const ad = a.assists ?? 0;
        const bd = b.assists ?? 0;
        if (bd !== ad) return bd - ad;
        return b.goals - a.goals;
      })
      .slice(0, 20);
  }, [rows, view]);

  const textColor = accentTextColor(accent);

  const toggleButton = (id: View, label: string) => {
    const active = view === id;
    return (
      <button
        key={id}
        onClick={() => setView(id)}
        style={{
          padding: "0.4rem 1.1rem",
          borderRadius: "20px",
          border: active ? "none" : "1px solid var(--border-subtle)",
          background: active ? accent : "transparent",
          color: active ? textColor : "var(--text-secondary)",
          fontWeight: active ? 700 : 500,
          fontSize: "0.78rem",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="grid-12 fade-in fd2">
      <div className="card span-12">
        <div
          className="card-header"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}
        >
          <div className="card-title">{view === "goals" ? "Top Scorers" : "Top Assists"}</div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {toggleButton("goals", "Top Scorers")}
            {toggleButton("assists", "Top Assists")}
          </div>
        </div>

        {loading ? (
          <div style={{ color: "var(--text-muted)", padding: "1rem 0", fontSize: "0.85rem" }}>
            Loading…
          </div>
        ) : displayRows.length === 0 ? (
          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            No scorer data yet.
          </div>
        ) : (
          <table className="standings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Team</th>
                <th>MP</th>
                <th>Goals</th>
                <th>Assists</th>
                {view === "goals" && <th>Pens</th>}
              </tr>
            </thead>
            <tbody>
              {displayRows.map((row, idx) => (
                <tr key={`${row.playerName}-${row.teamName}-${idx}`}>
                  <td><span className="pos-num">{view === "goals" ? row.position : idx + 1}</span></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{row.playerName}</div>
                    {row.playerPosition && (
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                        {row.playerPosition}
                      </div>
                    )}
                  </td>
                  <td>{row.teamName}</td>
                  <td>{row.playedMatches}</td>
                  <td className="points-cell">{row.goals}</td>
                  <td>{row.assists ?? 0}</td>
                  {view === "goals" && <td>{row.penalties ?? 0}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
