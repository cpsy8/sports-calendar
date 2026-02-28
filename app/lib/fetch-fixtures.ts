import { createSupabaseClient } from "./supabase-client";
import { generateDummyFixtures } from "./fixtures";
import type { Fixture } from "./fixtures";

function mapRowToFixture(row: {
  id: string;
  home_team: string;
  away_team: string;
  competition: string;
  competition_short: string;
  kickoff: string;
  date: string;
  venue?: string | null;
  status: string;
  home_score?: number | null;
  away_score?: number | null;
}): Fixture {
  const dateStr =
    typeof row.date === "string"
      ? row.date.split("T")[0]
      : (row.date as Date).toISOString().split("T")[0];
  return {
    id: String(row.id),
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

export async function fetchFixtures(): Promise<{
  fixtures: Fixture[];
  updatedAt: string;
}> {
  const supabase = createSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("fixtures")
        .select("*")
        .order("date", { ascending: true })
        .order("kickoff", { ascending: true });

      if (!error && data) {
        const fixtures = data.map(mapRowToFixture);
        return { fixtures, updatedAt: new Date().toISOString() };
      }
    } catch {
      // Fall through to dummy data
    }
  }

  return {
    fixtures: generateDummyFixtures(),
    updatedAt: new Date().toISOString(),
  };
}
