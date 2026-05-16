"use client";

import { useState, useEffect } from "react";
import {
  fetchFootballScorers,
  type FootballScorerRow,
} from "../lib/fetch-standings-client";

interface ScorersTabProps {
  competitionShort: string;
}

export function ScorersTab({ competitionShort }: ScorersTabProps) {
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

  return (
    <div className="grid-12 fade-in fd2">
      <div className="card span-12">
        <div className="card-header">
          <div className="card-title">Top Scorers</div>
        </div>

        {loading ? (
          <div style={{ color: "var(--text-muted)", padding: "1rem 0", fontSize: "0.85rem" }}>
            Loading…
          </div>
        ) : rows.length === 0 ? (
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
                <th>Pens</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={`${row.playerName}-${row.teamName}-${idx}`}>
                  <td><span className="pos-num">{row.position}</span></td>
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
                  <td>{row.penalties ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
