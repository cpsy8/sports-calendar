export interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  competitionShort: string;
  kickoff: string; // HH:mm
  date: string; // YYYY-MM-DD
  venue?: string;
  status: "scheduled" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
}

export const COMPETITION_COLORS: Record<string, string> = {
  "Premier League": "teal",
  "La Liga": "violet",
  "Bundesliga": "amber",
  "Serie A": "rose",
  "Ligue 1": "sky",
  "UEFA Champions League": "emerald",
  "Eredivisie": "orange",
  "F1": "red",
};

export const CARD_CLASSES: Record<string, string> = {
  teal: "bg-teal-50 border-teal-200 text-teal-900 dark:bg-teal-950/50 dark:border-teal-800 dark:text-teal-100",
  violet: "bg-violet-50 border-violet-200 text-violet-900 dark:bg-violet-950/50 dark:border-violet-800 dark:text-violet-100",
  amber: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-100",
  rose: "bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/50 dark:border-rose-800 dark:text-rose-100",
  sky: "bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-950/50 dark:border-sky-800 dark:text-sky-100",
  emerald: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-100",
  orange: "bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950/50 dark:border-orange-800 dark:text-orange-100",
  red: "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/50 dark:border-red-800 dark:text-red-100",
};

export function generateDummyFixtures(): Fixture[] {
  const today = new Date();
  const fixtures: Fixture[] = [];

  const matchTemplates = [
    { home: "Arsenal", away: "Liverpool", comp: "Premier League", short: "EPL" },
    { home: "Manchester City", away: "Chelsea", comp: "Premier League", short: "EPL" },
    { home: "Real Madrid", away: "Barcelona", comp: "La Liga", short: "LaLiga" },
    { home: "Bayern Munich", away: "Borussia Dortmund", comp: "Bundesliga", short: "Bundesliga" },
    { home: "Inter Milan", away: "Juventus", comp: "Serie A", short: "Serie A" },
    { home: "Paris Saint-Germain", away: "Marseille", comp: "Ligue 1", short: "Ligue 1" },
    { home: "Manchester United", away: "Tottenham", comp: "Premier League", short: "EPL" },
    { home: "Atletico Madrid", away: "Sevilla", comp: "La Liga", short: "LaLiga" },
    { home: "AC Milan", away: "Napoli", comp: "Serie A", short: "Serie A" },
    { home: "Ajax", away: "PSV Eindhoven", comp: "Eredivisie", short: "Eredivisie" },
  ];

  const times = ["09:00", "12:00", "15:00", "18:00", "20:45", "21:00"];
  const venues = ["Emirates Stadium", "Etihad Stadium", "Santiago Bernabeu", "Allianz Arena", "San Siro", "Parc des Princes", "Old Trafford", "Wanda Metropolitano", "Johan Cruyff Arena"];

  let id = 1;
  for (let d = -14; d <= 14; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const dateStr = date.toISOString().split("T")[0];

    const matchesPerDay = 1 + Math.floor(Math.random() * 3) + (d === 0 ? 2 : 0);
    for (let i = 0; i < matchesPerDay; i++) {
      const t = matchTemplates[(id - 1) % matchTemplates.length];
      const status: Fixture["status"] = d < 0 ? "finished" : d === 0 && i === 0 ? "live" : "scheduled";
      const homeScore = status !== "scheduled" ? Math.floor(Math.random() * 3) : undefined;
      const awayScore = status !== "scheduled" ? Math.floor(Math.random() * 3) : undefined;

      fixtures.push({
        id: String(id++),
        homeTeam: t.home,
        awayTeam: t.away,
        competition: t.comp,
        competitionShort: t.short,
        kickoff: times[i % times.length],
        date: dateStr,
        venue: venues[(id - 1) % venues.length],
        status,
        homeScore,
        awayScore,
      });
    }
  }

  return fixtures;
}
