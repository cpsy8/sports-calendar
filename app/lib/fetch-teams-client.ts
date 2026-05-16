import { createSupabaseClient } from "./supabase-client";

export interface FootballTeamRow {
  id: string;
  competition_short: string;
  team_api_id: number;
  name: string;
  short_name: string | null;
  tla: string | null;
  crest: string | null;
  founded: number | null;
  venue: string | null;
  website: string | null;
  club_colors: string | null;
  address: string | null;
  coach_name: string | null;
  coach_nationality: string | null;
  coach_dob: string | null;
  coach_contract_start: string | null;
  coach_contract_until: string | null;
}

export interface FootballPlayerRow {
  id: string;
  team_api_id: number;
  team_name: string;
  competition_short: string;
  player_api_id: number;
  name: string;
  position: string | null;
  dob: string | null;
  nationality: string | null;
  shirt_number: number | null;
}

const TEAM_COLS =
  "id,competition_short,team_api_id,name,short_name,tla,crest,founded,venue,website,club_colors,address,coach_name,coach_nationality,coach_dob,coach_contract_start,coach_contract_until";

const PLAYER_COLS =
  "id,team_api_id,team_name,competition_short,player_api_id,name,position,dob,nationality,shirt_number";

/**
 * Fetch all teams for a given competition, ordered by name asc.
 *
 * `competitionShort` uses the section-internal codes
 * (EPL, LAL, BUN, SRA, LIG, UCL) — same convention as `football_scorers`
 * and `football_fixtures`. The teams pipeline in the my-public-database
 * repo translates football-data.org codes (PL, PD, BL1, SA, FL1, CL) to
 * these short codes before upsert.
 */
export async function fetchFootballTeams(
  competitionShort: string,
): Promise<FootballTeamRow[]> {
  const supabase = createSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("football_teams")
    .select(TEAM_COLS)
    .eq("competition_short", competitionShort)
    .order("name", { ascending: true });
  return (data as FootballTeamRow[]) ?? [];
}

/**
 * Fetch all players for a given team, ordered by position asc, then
 * shirt_number asc (nulls last), then name asc.
 */
export async function fetchFootballPlayersByTeam(
  competitionShort: string,
  teamApiId: number,
): Promise<FootballPlayerRow[]> {
  const supabase = createSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("football_players")
    .select(PLAYER_COLS)
    .eq("competition_short", competitionShort)
    .eq("team_api_id", teamApiId)
    .order("position", { ascending: true })
    .order("shirt_number", { ascending: true, nullsFirst: false })
    .order("name", { ascending: true });
  return (data as FootballPlayerRow[]) ?? [];
}
