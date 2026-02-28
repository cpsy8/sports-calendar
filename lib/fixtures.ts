export interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  competitionShort: string;
  kickoff: string;
  venue?: string;
  status: "scheduled" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
}

const FIXTURES: Fixture[] = [
  { id: "1", homeTeam: "Arsenal", awayTeam: "Liverpool", competition: "Premier League", competitionShort: "EPL", kickoff: "16:30", venue: "Emirates Stadium", status: "scheduled" },
  { id: "2", homeTeam: "Manchester City", awayTeam: "Chelsea", competition: "Premier League", competitionShort: "EPL", kickoff: "13:30", venue: "Etihad Stadium", status: "scheduled" },
  { id: "3", homeTeam: "Real Madrid", awayTeam: "Barcelona", competition: "La Liga", competitionShort: "LaLiga", kickoff: "20:00", venue: "Santiago Bernabeu", status: "scheduled" },
  { id: "4", homeTeam: "Bayern Munich", awayTeam: "Borussia Dortmund", competition: "Bundesliga", competitionShort: "Bundesliga", kickoff: "18:30", venue: "Allianz Arena", status: "live", homeScore: 2, awayScore: 1 },
  { id: "5", homeTeam: "Inter Milan", awayTeam: "Juventus", competition: "Serie A", competitionShort: "Serie A", kickoff: "20:45", venue: "San Siro", status: "scheduled" },
  { id: "6", homeTeam: "Paris Saint-Germain", awayTeam: "Marseille", competition: "Ligue 1", competitionShort: "Ligue 1", kickoff: "21:00", venue: "Parc des Princes", status: "scheduled" },
  { id: "7", homeTeam: "Manchester United", awayTeam: "Tottenham", competition: "Premier League", competitionShort: "EPL", kickoff: "15:00", venue: "Old Trafford", status: "finished", homeScore: 1, awayScore: 2 },
  { id: "8", homeTeam: "Atletico Madrid", awayTeam: "Sevilla", competition: "La Liga", competitionShort: "LaLiga", kickoff: "18:30", venue: "Wanda Metropolitano", status: "scheduled" },
  { id: "9", homeTeam: "AC Milan", awayTeam: "Napoli", competition: "Serie A", competitionShort: "Serie A", kickoff: "20:45", venue: "San Siro", status: "scheduled" },
  { id: "10", homeTeam: "Ajax", awayTeam: "PSV Eindhoven", competition: "Eredivisie", competitionShort: "Eredivisie", kickoff: "19:45", venue: "Johan Cruyff Arena", status: "scheduled" },
];

const FIXTURES_BY_DATE: Record<string, Fixture[]> = {};

function getWeekDates(): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = -3; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

const weekDates = getWeekDates();
weekDates.forEach((date, i) => {
  const start = (i * 2) % FIXTURES.length;
  FIXTURES_BY_DATE[date] = [FIXTURES[start], FIXTURES[(start + 1) % FIXTURES.length], ...(i === 3 ? [FIXTURES[(start + 2) % FIXTURES.length]] : [])];
});

export function getFixturesForDate(dateStr: string): Fixture[] {
  return FIXTURES_BY_DATE[dateStr] ?? [];
}

export function getWeekDatesAroundToday(): { date: string; label: string; sublabel: string; isToday: boolean }[] {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 3 + i);
    const dateStr = d.toISOString().split("T")[0];
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });
    return { date: dateStr, label: dayName + " " + dayNum, sublabel: month, isToday: dateStr === todayStr };
  });
}
