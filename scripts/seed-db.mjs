#!/usr/bin/env node
/**
 * Seed Supabase with dummy fixtures.
 * Requires: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local
 * Run: node --env-file=.env.local scripts/seed-db.mjs
 * Or: npm run db:seed
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

const DUMMY_FIXTURES = [
  { home_team: "Arsenal", away_team: "Liverpool", competition: "Premier League", competition_short: "EPL", kickoff: "16:30", date: "today", venue: "Emirates Stadium", status: "scheduled" },
  { home_team: "Manchester City", away_team: "Chelsea", competition: "Premier League", competition_short: "EPL", kickoff: "13:30", date: "today", venue: "Etihad Stadium", status: "scheduled" },
  { home_team: "Real Madrid", away_team: "Barcelona", competition: "La Liga", competition_short: "LaLiga", kickoff: "20:00", date: "tomorrow", venue: "Santiago Bernabeu", status: "scheduled" },
  { home_team: "Bayern Munich", away_team: "Borussia Dortmund", competition: "Bundesliga", competition_short: "Bundesliga", kickoff: "18:30", date: "today", venue: "Allianz Arena", status: "live", home_score: 2, away_score: 1 },
  { home_team: "Inter Milan", away_team: "Juventus", competition: "Serie A", competition_short: "Serie A", kickoff: "20:45", date: "today+2", venue: "San Siro", status: "scheduled" },
  { home_team: "Paris Saint-Germain", away_team: "Marseille", competition: "Ligue 1", competition_short: "Ligue 1", kickoff: "21:00", date: "tomorrow", venue: "Parc des Princes", status: "scheduled" },
  { home_team: "Manchester United", away_team: "Tottenham", competition: "Premier League", competition_short: "EPL", kickoff: "15:00", date: "yesterday", venue: "Old Trafford", status: "finished", home_score: 1, away_score: 2 },
  { home_team: "Atletico Madrid", away_team: "Sevilla", competition: "La Liga", competition_short: "LaLiga", kickoff: "18:30", date: "today+2", venue: "Wanda Metropolitano", status: "scheduled" },
  { home_team: "AC Milan", away_team: "Napoli", competition: "Serie A", competition_short: "Serie A", kickoff: "20:45", date: "yesterday", venue: "San Siro", status: "finished", home_score: 2, away_score: 0 },
  { home_team: "Ajax", away_team: "PSV Eindhoven", competition: "Eredivisie", competition_short: "Eredivisie", kickoff: "19:45", date: "tomorrow", venue: "Johan Cruyff Arena", status: "scheduled" },
  { home_team: "Arsenal", away_team: "Chelsea", competition: "Premier League", competition_short: "EPL", kickoff: "12:00", date: "today+3", venue: "Emirates Stadium", status: "scheduled" },
  { home_team: "Barcelona", away_team: "Atletico Madrid", competition: "La Liga", competition_short: "LaLiga", kickoff: "15:00", date: "today+3", venue: "Camp Nou", status: "scheduled" },
  { home_team: "Borussia Dortmund", away_team: "RB Leipzig", competition: "Bundesliga", competition_short: "Bundesliga", kickoff: "17:30", date: "yesterday", venue: "Signal Iduna Park", status: "finished", home_score: 3, away_score: 1 },
  { home_team: "Juventus", away_team: "AC Milan", competition: "Serie A", competition_short: "Serie A", kickoff: "20:45", date: "tomorrow", venue: "Allianz Stadium", status: "scheduled" },
  { home_team: "Lyon", away_team: "Monaco", competition: "Ligue 1", competition_short: "Ligue 1", kickoff: "21:00", date: "today+2", venue: "Groupama Stadium", status: "scheduled" },
];

function resolveDate(rel) {
  const today = new Date();
  const d = new Date(today);
  if (rel === "today") return d;
  if (rel === "tomorrow") { d.setDate(d.getDate() + 1); return d; }
  if (rel === "yesterday") { d.setDate(d.getDate() - 1); return d; }
  if (rel.startsWith("today+")) { d.setDate(d.getDate() + parseInt(rel.replace("today+", ""), 10)); return d; }
  return d;
}

const rows = DUMMY_FIXTURES.map((f) => {
  const d = resolveDate(f.date);
  return {
    home_team: f.home_team,
    away_team: f.away_team,
    competition: f.competition,
    competition_short: f.competition_short,
    kickoff: f.kickoff,
    date: d.toISOString().split("T")[0],
    venue: f.venue,
    status: f.status,
    home_score: f.home_score ?? null,
    away_score: f.away_score ?? null,
  };
});

async function seed() {
  const { data, error } = await supabase.from("fixtures").insert(rows).select("id");

  if (error) {
    console.error("Seed failed:", error.message);
    if (error.message?.includes("relation") && error.message?.includes("does not exist")) {
      console.error("\nThe 'fixtures' table does not exist. Run supabase/setup.sql in Supabase SQL Editor first.");
    }
    process.exit(1);
  }

  console.log(`Seeded ${data?.length ?? rows.length} fixtures.`);
}

seed();
