import { drizzle } from "drizzle-orm/node-postgres";
import { createSupabaseClient } from "./supabase-client";
import { getPostgresPool } from "./postgres-client";
import { footballFixtures, f1Fixtures } from "./db-schema";
import type { Fixture } from "./fixtures";

export type SportId = "all" | "football" | "f1";

function mapF1Status(f1Status: string): Fixture["status"] {
  if (f1Status === "scheduled") return "scheduled";
  if (["practice", "qualifying", "race"].includes(f1Status)) return "live";
  return "finished"; // completed, cancelled
}

function mapRowToFixture(
  row: typeof footballFixtures.$inferSelect,
): Fixture {
  const dateStr =
    typeof row.date === "string"
      ? row.date.split("T")[0]
      : (row.date as Date).toISOString().split("T")[0];
  return {
    id: String(row.id),
    homeTeam: row.homeTeam,
    awayTeam: row.awayTeam,
    competition: row.competition,
    competitionShort: row.competitionShort,
    kickoff: row.kickoff,
    date: dateStr,
    venue: row.venue ?? undefined,
    status: row.status as Fixture["status"],
    homeScore: row.homeScore ?? undefined,
    awayScore: row.awayScore ?? undefined,
  };
}

function mapF1RowToFixture(row: typeof f1Fixtures.$inferSelect): Fixture {
  const dateStr =
    typeof row.date === "string"
      ? row.date.split("T")[0]
      : (row.date as Date).toISOString().split("T")[0];
  return {
    id: String(row.id),
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

async function fetchFromPostgres(sportId: SportId): Promise<Fixture[]> {
  const pool = getPostgresPool();
  if (!pool) return [];

  const db = drizzle(pool);
  const allFixtures: Fixture[] = [];

  if (sportId === "f1" || sportId === "all") {
    const rows = await db
      .select()
      .from(f1Fixtures)
      .orderBy(f1Fixtures.date);
    allFixtures.push(...rows.map(mapF1RowToFixture));
  }

  if (sportId === "football" || sportId === "all") {
    const rows = await db
      .select()
      .from(footballFixtures)
      .orderBy(footballFixtures.date, footballFixtures.kickoff);
    allFixtures.push(...rows.map(mapRowToFixture));
  }

  allFixtures.sort((a, b) => {
    const d = a.date.localeCompare(b.date);
    return d !== 0 ? d : a.kickoff.localeCompare(b.kickoff);
  });

  return allFixtures;
}

async function fetchFromSupabase(): Promise<Fixture[]> {
  const supabase = createSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("fixtures")
    .select("*")
    .order("date", { ascending: true })
    .order("kickoff", { ascending: true });

  if (error || !data) return [];
  return data.map(mapRowToFixture);
}

/**
 * Fetch fixtures from the appropriate source:
 * - Production (`NODE_ENV === "production"`): Supabase
 * - Development / all other envs: local Postgres (Docker)
 */
export async function fetchFixtures(sportId: SportId = "all"): Promise<{
  fixtures: Fixture[];
  updatedAt: string;
}> {
  const updatedAt = new Date().toISOString();

  // Production: read from Supabase
  if (process.env.NODE_ENV === "production") {
    try {
      const fixtures = await fetchFromSupabase();
      return { fixtures, updatedAt };
    } catch {
      return { fixtures: [], updatedAt };
    }
  }

  // Development / non-production: read from local Postgres
  try {
    const fixtures = await fetchFromPostgres(sportId);
    return { fixtures, updatedAt };
  } catch {
    return { fixtures: [], updatedAt };
  }
}
