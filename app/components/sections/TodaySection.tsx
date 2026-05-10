"use client";

import { useState, useEffect } from "react";
import { fetchFixturesByISTDateRange } from "../../lib/fetch-fixtures-client";
import { istTodayStr, addDaysToDateStr } from "../../lib/timezone";
import type { Fixture } from "../../lib/fixtures";

/* ---- Accent per competition ---- */
const COMP_ACCENT: Record<string, string> = {
  "Premier League":        "var(--acc-epd)",
  "UEFA Champions League": "var(--acc-ucc)",
  "La Liga":               "var(--acc-laliga)",
  "Serie A":               "#008fd5",
  "Bundesliga":            "#d20515",
  "Ligue 1":               "#2293D1",
  "Indian Super League":   "#f5a623",
  "UEFA Europa League":    "#f97316",
  "Formula 1":             "var(--acc-f1)",
};
function accentFor(comp: string) {
  return COMP_ACCENT[comp] ?? "#8b5cf6";
}

/* ---- Small atoms ---- */
function LivePill() {
  return <span className="live-pill">Live</span>;
}

function TeamCrest({
  name,
  color,
}: {
  name: string;
  color: string;
}) {
  const abbr = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return (
    <div
      className="crest"
      style={{ "--c": color } as React.CSSProperties}
      aria-label={name}
    >
      {abbr}
    </div>
  );
}

function teamColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffff;
  const hue = h % 360;
  return `hsl(${hue} 55% 38%)`;
}

/* ---- Match row ---- */
function MatchRow({ fixture }: { fixture: Fixture }) {
  const isLive = fixture.status === "live";
  const isResult = fixture.status === "finished";
  const isF1 = fixture.sport === "f1";
  const compLabel = isF1 ? "Formula 1" : fixture.competition;
  const accent = accentFor(compLabel);

  const homeWin = isResult && (fixture.homeScore ?? 0) > (fixture.awayScore ?? 0);
  const awayWin = isResult && (fixture.awayScore ?? 0) > (fixture.homeScore ?? 0);

  return (
    <div className="match-row">
      {/* Time column */}
      <div className="match-time">
        {isLive ? (
          <>
            <span className="day" style={{ color: "var(--live)" }}>● Live</span>
            <span style={{ color: "var(--ink)" }}>{fixture.kickoff}</span>
          </>
        ) : isResult ? (
          <>
            <span className="day">FT</span>
            <span>{fixture.kickoff}</span>
          </>
        ) : (
          <>
            <span className="day">KO</span>
            <span>{fixture.kickoff}</span>
          </>
        )}
      </div>

      {/* Teams column */}
      <div className="match-teams">
        {isF1 ? (
          <div className="match-team">
            <TeamCrest name={fixture.awayTeam} color="var(--acc-f1)" />
            <span className="name">{fixture.awayTeam} GP · {fixture.homeTeam}</span>
          </div>
        ) : (
          <>
            <div className={`match-team${isResult && awayWin ? " dim" : ""}`}>
              <TeamCrest name={fixture.homeTeam} color={teamColor(fixture.homeTeam)} />
              <span className="name">{fixture.homeTeam}</span>
              {(isLive || isResult) && (
                <span className="score">{fixture.homeScore ?? 0}</span>
              )}
            </div>
            <div className={`match-team${isResult && homeWin ? " dim" : ""}`}>
              <TeamCrest name={fixture.awayTeam} color={teamColor(fixture.awayTeam)} />
              <span className="name">{fixture.awayTeam}</span>
              {(isLive || isResult) && (
                <span className="score">{fixture.awayScore ?? 0}</span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Meta column */}
      <div className="match-meta" style={{ "--accent": accent } as React.CSSProperties}>
        <span
          className="event-tag"
          style={{ "--accent": accent } as React.CSSProperties}
        >
          {fixture.competitionShort ?? compLabel}
        </span>
        {fixture.venue && (
          <div
            style={{
              fontSize: 10,
              color: "var(--ink-4)",
              marginTop: 4,
              maxWidth: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {fixture.venue}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Day stat block ---- */
function DayStat({
  label,
  value,
  sub,
  live,
}: {
  label: string;
  value: number;
  sub: string;
  live?: boolean;
}) {
  return (
    <div style={{ padding: "6px 22px", minWidth: 130 }}>
      <div
        style={{
          fontSize: 10.5,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
          fontWeight: 600,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {live && (
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 99,
              background: "var(--live)",
              display: "inline-block",
            }}
          />
        )}
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--display)",
          fontWeight: 800,
          fontSize: 36,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 6 }}>{sub}</div>
    </div>
  );
}

/* ---- Column card ---- */
function MatchColumn({
  title,
  count,
  countLabel,
  link,
  fixtures,
  loading,
  titleColor,
}: {
  title: string;
  count: number;
  countLabel?: string;
  link?: string;
  fixtures: Fixture[];
  loading: boolean;
  titleColor?: string;
}) {
  return (
    <div className="card">
      <div className="card-hd">
        <div className="card-hd-l">
          <h3 style={titleColor ? { color: titleColor } : {}}>
            {titleColor && (
              <span style={{ marginRight: 6 }}>●</span>
            )}
            {title}
          </h3>
          <span className="count">{countLabel ?? count}</span>
        </div>
        {link && (
          <a href="#" onClick={(e) => e.preventDefault()}>
            {link}
          </a>
        )}
      </div>

      {loading ? (
        <div style={{ padding: "32px 18px", textAlign: "center", color: "var(--ink-4)", fontSize: 13 }}>
          Loading…
        </div>
      ) : fixtures.length === 0 ? (
        <div style={{ padding: "32px 18px", textAlign: "center", color: "var(--ink-4)", fontSize: 13 }}>
          None right now
        </div>
      ) : (
        fixtures.slice(0, 6).map((f) => <MatchRow key={`${f.sport}-${f.id}`} fixture={f} />)
      )}
    </div>
  );
}

/* ---- Upcoming fixture card (big fixtures section) ---- */
function UpcomingCard({ fixture }: { fixture: Fixture }) {
  const isF1 = fixture.sport === "f1";
  const compLabel = isF1 ? "Formula 1" : fixture.competition;
  const accent = accentFor(compLabel);

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        "--accent": accent,
      } as React.CSSProperties}
    >
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid var(--hairline)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          className="event-tag"
          style={{ "--accent": accent } as React.CSSProperties}
        >
          {fixture.competitionShort ?? compLabel}
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            color: "var(--ink-4)",
          }}
        >
          {fixture.date}
        </span>
      </div>
      <div style={{ padding: "18px 16px", flex: 1 }}>
        {isF1 ? (
          <div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "-0.015em",
                lineHeight: 1.05,
                marginBottom: 4,
              }}
            >
              {fixture.awayTeam}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{fixture.homeTeam}</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <TeamCrest name={fixture.homeTeam} color={teamColor(fixture.homeTeam)} />
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 17,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {fixture.homeTeam}
              </span>
            </div>
            <span
              style={{
                fontSize: 10,
                fontFamily: "var(--mono)",
                color: "var(--ink-4)",
                marginLeft: 38,
              }}
            >
              vs
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <TeamCrest name={fixture.awayTeam} color={teamColor(fixture.awayTeam)} />
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 17,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {fixture.awayTeam}
              </span>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--hairline)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11.5,
        }}
      >
        <span style={{ color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
          {fixture.kickoff} IST
        </span>
        {fixture.venue && (
          <span style={{ color: "var(--ink-4)", fontSize: 11 }}>{fixture.venue}</span>
        )}
      </div>
    </div>
  );
}

/* ===================================================
   MAIN EXPORT
   =================================================== */
export function TodaySection() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);

  const todayStr = istTodayStr();
  const tomorrowStr = addDaysToDateStr(todayStr, 1);

  function load() {
    setLoading(true);
    fetchFixturesByISTDateRange("all", todayStr, tomorrowStr)
      .then(({ fixtures: range }) => setFixtures(range))
      .catch(() => setFixtures([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Partition fixtures */
  const liveFixtures     = fixtures.filter((f) => f.status === "live");
  const upcomingFixtures = fixtures.filter(
    (f) => f.status === "scheduled" && (f.date === todayStr || f.date === tomorrowStr)
  );
  const resultFixtures   = fixtures.filter((f) => f.status === "finished");

  /* Big upcoming cards — first 4 scheduled */
  const bigFixtures = upcomingFixtures.slice(0, 4);

  /* Date strings for header */
  const now = new Date();
  const dayName  = now.toLocaleDateString("en-US", { weekday: "long" });
  const dateNum  = now.getDate();
  const monthName = now.toLocaleDateString("en-US", { month: "long" });
  const year     = now.getFullYear();

  return (
    <div>
      {/* Page header */}
      <div className="page-hd" style={{ alignItems: "stretch" }}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "var(--ink-3)",
                fontFamily: "var(--mono)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Today
            </span>
            <span style={{ width: 20, height: 1, background: "var(--line-2)" }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>
              {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} IST
            </span>
          </div>
          <h1
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--display)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              {dayName}
            </span>
            <span
              style={{
                color: "var(--ink-4)",
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 32,
              }}
            >
              {dateNum} {monthName} {year}
            </span>
          </h1>
        </div>

        {/* Day stats */}
        {!loading && (
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <DayStat
              label="Today"
              value={fixtures.filter((f) => f.date === todayStr).length}
              sub="All sports"
            />
            <div
              style={{
                width: 1,
                background: "var(--line)",
                alignSelf: "stretch",
                margin: "4px 0",
              }}
            />
            <DayStat
              label="Live now"
              value={liveFixtures.length}
              sub="In progress"
              live
            />
            <div
              style={{
                width: 1,
                background: "var(--line)",
                alignSelf: "stretch",
                margin: "4px 0",
              }}
            />
            <DayStat
              label="Upcoming"
              value={upcomingFixtures.length}
              sub="Today & Tomorrow"
            />
          </div>
        )}
      </div>

      {/* Three-column grid */}
      <div className="grid-3" style={{ marginBottom: 32 }}>
        <MatchColumn
          title="Live now"
          count={liveFixtures.length}
          fixtures={liveFixtures}
          loading={loading}
          titleColor="var(--live)"
        />
        <MatchColumn
          title="Coming up"
          count={upcomingFixtures.length}
          countLabel="Today · Tomorrow"
          link="Full calendar →"
          fixtures={upcomingFixtures}
          loading={loading}
        />
        <MatchColumn
          title="Latest results"
          count={resultFixtures.length}
          countLabel="Last 24h"
          link="All →"
          fixtures={resultFixtures}
          loading={loading}
        />
      </div>

      {/* Big upcoming fixtures */}
      {bigFixtures.length > 0 && (
        <>
          <div className="section-hd">
            <h2>Fixtures ahead</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "var(--ink-3)", fontSize: 13 }}>
                Today &amp; Tomorrow
              </span>
              <button
                className="btn"
                onClick={load}
                disabled={loading}
                style={{ opacity: loading ? 0.5 : 1 }}
                aria-label="Refresh"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
          <div className="grid-4">
            {bigFixtures.map((f) => (
              <UpcomingCard key={`${f.sport}-${f.id}`} fixture={f} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
