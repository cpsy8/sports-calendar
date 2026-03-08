/**
 * Browser-safe fixture fetching.
 *
 * - Production (static build / GitHub Pages): queries Supabase directly.
 * - Development: calls the local /api/fixtures route → Docker Postgres.
 */
import { createSupabaseClient } from "./supabase-client";
import type { Fixture } from "./fixtures";

export type SportId = "all" | "football" | "f1";

function mapF1Status(status: string): Fixture["status"] {
  if (status === "scheduled") return "scheduled";
  if (["practice", "qualifying", "race"].includes(status)) return "live";
  return "finished";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFootballRow(row: Record<string, any>): Fixture {
  const dateStr = typeof row.date === "string"
    ? row.date.split("T")[0]
    : (row.date as Date).toISOString().split("T")[0];
  return {
    id: String(row.id),
    sport: "football",
    homeTeam: row.home_team,
    awayTeam: row.away_team,
    competition: row.competition,
    competitionShort: row.competition_short,
    kickoff: row.kickoff,
    date: dateStr,
    venue: row.venue ?? undefined,
    status: row.status as Fixture["status"],
    homeScore: row.home_score ?? undefined,
    awayScore: row.away_score ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapF1Row(row: Record<string, any>): Fixture {
  const dateStr = typeof row.date === "string"
    ? row.date.split("T")[0]
    : (row.date as Date).toISOString().split("T")[0];
  return {
    id: String(row.id),
    sport: "f1",
    homeTeam: row.circuit,
    awayTeam: row.country,
    competition: `Round ${row.round}`,
    competitionShort: "F1",
    kickoff: "14:00",
    date: dateStr,
    venue: row.country,
    status: mapF1Status(row.status),
  };
}

async function fetchFromSupabase(sportId: SportId): Promise<Fixture[]> {
  const supabase = createSupabaseClient();
  if (!supabase) return [];

  const allFixtures: Fixture[] = [];

  if (sportId === "f1" || sportId === "all") {
    const { data } = await supabase
      .from("f1_fixtures")
      .select("*")
      .order("date", { ascending: true });
    if (data) allFixtures.push(...data.map(mapF1Row));
  }

  if (sportId === "football" || sportId === "all") {
    const { data } = await supabase
      .from("football_fixtures")
      .select("*")
      .order("date", { ascending: true })
      .order("kickoff", { ascending: true });
    if (data) allFixtures.push(...data.map(mapFootballRow));
  }

  allFixtures.sort((a, b) => {
    const d = a.date.localeCompare(b.date);
    return d !== 0 ? d : a.kickoff.localeCompare(b.kickoff);
  });

  return allFixtures;
}

export async function fetchFixturesClient(sportId: SportId = "all"): Promise<{
  fixtures: Fixture[];
  updatedAt: string;
}> {
  const updatedAt = new Date().toISOString();

  if (process.env.NODE_ENV === "production") {
    // Static export (GitHub Pages): no API routes available, query Supabase directly.
    const fixtures = await fetchFromSupabase(sportId);
    return { fixtures, updatedAt };
  }

  // Local dev: delegate to the API route which reads from Docker Postgres.
  const res = await fetch(`/api/fixtures?sport=${sportId}`);
  if (!res.ok) return { fixtures: [], updatedAt };
  return res.json();
}
