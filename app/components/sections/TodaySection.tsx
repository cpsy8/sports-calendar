"use client";

import { useState, useEffect } from "react";
import { fetchFixturesClient } from "../../lib/fetch-fixtures-client";
import type { Fixture } from "../../lib/fixtures";

function getTodayStr() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatDateLong(dateStr: string) {
  const [y, m, day] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Group fixtures by competition label */
function groupByComp(fixtures: Fixture[]): Map<string, Fixture[]> {
  const map = new Map<string, Fixture[]>();
  for (const f of fixtures) {
    const key = f.sport === "f1" ? "Formula 1" : f.competition;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(f);
  }
  return map;
}

const COMP_ACCENT: Record<string, string> = {
  "Premier League": "#3dffa2",
  "UEFA Champions League": "#ffd700",
  "La Liga": "#ff4b44",
  "Serie A": "#008fd5",
  "Bundesliga": "#d20515",
  "Ligue 1": "#2293D1",
  "Indian Super League": "#f5a623",
  "UEFA Europa League": "#f97316",
  "Formula 1": "#e10600",
};

function accentFor(comp: string): string {
  return COMP_ACCENT[comp] ?? "#8b5cf6";
}

function StatusBadge({ status }: { status: Fixture["status"] }) {
  if (status === "live") {
    return (
      <span style={{
        fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase",
        padding: "0.15rem 0.45rem", borderRadius: "6px", letterSpacing: "1px",
        background: "var(--accent-f1)", color: "#fff",
        animation: "pulse-live 1.5s infinite",
      }}>
        LIVE
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span style={{
        fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase",
        padding: "0.15rem 0.45rem", borderRadius: "6px", letterSpacing: "1px",
        background: "#22c55e20", color: "#22c55e",
      }}>
        FT
      </span>
    );
  }
  return null;
}

function FootballRow({ fixture }: { fixture: Fixture }) {
  const isScheduled = fixture.status === "scheduled";
  return (
    <div className="fixture-item">
      <div className="fixture-teams">
        <div className="fixture-team">{fixture.homeTeam}</div>
        <div className="fixture-team">{fixture.awayTeam}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <StatusBadge status={fixture.status} />
        {isScheduled ? (
          <div className="fixture-time">{fixture.kickoff}</div>
        ) : (
          <div className="fixture-score">
            {fixture.homeScore ?? 0} — {fixture.awayScore ?? 0}
          </div>
        )}
        {fixture.venue && (
          <div className="fixture-venue" style={{ display: "none" }}>{fixture.venue}</div>
        )}
      </div>
    </div>
  );
}

function F1Row({ fixture }: { fixture: Fixture }) {
  return (
    <div className="fixture-item">
      <div className="fixture-teams">
        <div className="fixture-team" style={{ fontWeight: 700 }}>
          {fixture.awayTeam} Grand Prix
        </div>
        <div className="fixture-team" style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>
          {fixture.homeTeam}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <StatusBadge status={fixture.status} />
        <div className="fixture-time">{fixture.kickoff}</div>
      </div>
    </div>
  );
}

function CompCard({ comp, fixtures }: { comp: string; fixtures: Fixture[] }) {
  const accent = accentFor(comp);
  return (
    <div className="card" style={{ borderTop: `3px solid ${accent}` }}>
      <div className="card-header" style={{ marginBottom: "0.6rem" }}>
        <div className="card-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="cdot" style={{ background: accent, width: "8px", height: "8px" }} />
          {comp}
        </div>
        <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
          {fixtures.length} match{fixtures.length !== 1 ? "es" : ""}
        </span>
      </div>
      {fixtures.map((f) =>
        f.sport === "f1"
          ? <F1Row key={f.id} fixture={f} />
          : <FootballRow key={f.id} fixture={f} />
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="card" style={{ opacity: 0.5 }}>
      <div style={{ height: "0.9rem", background: "var(--bg-secondary)", borderRadius: "4px", width: "40%", marginBottom: "1rem" }} />
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid var(--border-subtle)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ height: "0.75rem", background: "var(--bg-secondary)", borderRadius: "4px", width: "120px" }} />
            <div style={{ height: "0.75rem", background: "var(--bg-secondary)", borderRadius: "4px", width: "100px" }} />
          </div>
          <div style={{ height: "0.75rem", background: "var(--bg-secondary)", borderRadius: "4px", width: "40px" }} />
        </div>
      ))}
    </div>
  );
}

export function TodaySection() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  function load() {
    setLoading(true);
    fetchFixturesClient("all")
      .then(({ fixtures: all, updatedAt }) => {
        const today = getTodayStr();
        setFixtures(all.filter((f) => f.date === today));
        setLastUpdated(updatedAt);
      })
      .catch(() => setFixtures([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const todayStr = getTodayStr();
  const grouped = groupByComp(fixtures);
  const liveCount = fixtures.filter((f) => f.status === "live").length;

  return (
    <>
      {/* Hero */}
      <div className="section-hero fade-in">
        <div className="hero-bar" style={{ background: "var(--accent-pl)" }} />
        <div className="hero-icon">📅</div>
        <div className="hero-text">
          <h2>TODAY</h2>
          <p>{formatDateLong(todayStr)}</p>
        </div>
        {liveCount > 0 && (
          <div className="hero-badge" style={{ background: "#e1060020", color: "var(--accent-f1)" }}>
            {liveCount} LIVE
          </div>
        )}
        {lastUpdated && (
          <div style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>
            Updated {new Date(lastUpdated).toLocaleTimeString()}
          </div>
        )}
        <button
          className="icon-btn"
          onClick={load}
          disabled={loading}
          title="Refresh"
          style={{ marginLeft: "auto", opacity: loading ? 0.5 : 1 }}
          aria-label="Refresh fixtures"
        >
          <svg viewBox="0 0 24 24" style={{ transform: loading ? "rotate(360deg)" : "none", transition: loading ? "transform 1s linear" : "none" }}>
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
          </svg>
        </button>
      </div>

      {/* Summary stats */}
      {!loading && fixtures.length > 0 && (
        <div className="stat-row fade-in fd1">
          <div className="stat-card" style={{ borderTop: "3px solid var(--accent-pl)" }}>
            <div className="stat-value" style={{ color: "var(--accent-pl)" }}>{fixtures.length}</div>
            <div className="stat-label">Total Matches</div>
          </div>
          <div className="stat-card" style={{ borderTop: "3px solid var(--accent-f1)" }}>
            <div className="stat-value" style={{ color: "var(--accent-f1)" }}>{liveCount}</div>
            <div className="stat-label">Live Now</div>
          </div>
          <div className="stat-card" style={{ borderTop: "3px solid #22c55e" }}>
            <div className="stat-value" style={{ color: "#22c55e" }}>
              {fixtures.filter((f) => f.status === "finished").length}
            </div>
            <div className="stat-label">Finished</div>
          </div>
          <div className="stat-card" style={{ borderTop: "3px solid var(--text-muted)" }}>
            <div className="stat-value" style={{ color: "var(--text-secondary)" }}>
              {fixtures.filter((f) => f.status === "scheduled").length}
            </div>
            <div className="stat-label">Upcoming</div>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="grid-12 fade-in fd2">
          {[1, 2, 3].map((i) => (
            <div className="span-4" key={i}><SkeletonCard /></div>
          ))}
        </div>
      ) : fixtures.length === 0 ? (
        <div className="card fade-in fd2" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🗓️</div>
          <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>No fixtures today</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Check back later or browse competitions in the other tabs.
          </div>
        </div>
      ) : (
        <div className="grid-12 fade-in fd2">
          {Array.from(grouped.entries()).map(([comp, compFixtures]) => (
            <div className="span-4" key={comp}>
              <CompCard comp={comp} fixtures={compFixtures} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
