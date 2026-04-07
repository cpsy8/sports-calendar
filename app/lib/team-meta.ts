/** Maps DB team name → 3-letter display code for TeamLogo */
export const TEAM_CODE_MAP: Record<string, string> = {
  // EPL
  Arsenal: "ARS", "Aston Villa": "AVL", Bournemouth: "BOU", Brentford: "BRE",
  Brighton: "BHA", "Brighton & Hove Albion": "BHA", Chelsea: "CHE",
  "Crystal Palace": "CRY", Everton: "EVE", Fulham: "FUL",
  "Ipswich Town": "IPS", Ipswich: "IPS",
  "Leicester City": "LEI", Leicester: "LEI", Liverpool: "LIV",
  "Manchester City": "MCI", "Manchester United": "MUN",
  "Newcastle United": "NEW", Newcastle: "NEW",
  "Nottingham Forest": "NFO", Southampton: "SOU", Sunderland: "SUN",
  "Tottenham Hotspur": "TOT", Tottenham: "TOT",
  "West Ham United": "WHA", "West Ham": "WHA",
  "Wolverhampton Wanderers": "WOL", Wolverhampton: "WOL", Wolves: "WOL",
  // La Liga
  "Real Madrid": "RMA", Barcelona: "BAR", "Atletico Madrid": "ATM",
  "Atlético Madrid": "ATM", "Athletic Club": "ATH", "Athletic Bilbao": "ATH",
  "Real Sociedad": "RSO", Villarreal: "VIL", "Real Betis": "BET",
  Sevilla: "SEV", Valencia: "VAL", "Celta Vigo": "CEL",
  "Rayo Vallecano": "RAY", Getafe: "GET", Girona: "GIR", Osasuna: "OSA",
  "Deportivo Alavés": "ALA", "Deportivo Alaves": "ALA", "Alavés": "ALA", Alaves: "ALA",
  Espanyol: "ESP", "Las Palmas": "LPA", Mallorca: "MAL",
  "Leganés": "LEG", Leganes: "LEG", "Real Valladolid": "VLD", Valladolid: "VLD",
  // Bundesliga
  "Bayern Munich": "BAY", "Borussia Dortmund": "BVB", "RB Leipzig": "RBL",
  "Bayer Leverkusen": "LEV", "Eintracht Frankfurt": "FRA",
  "SC Freiburg": "FRE", Freiburg: "FRE", "Werder Bremen": "WER",
  "VfB Stuttgart": "STU", Stuttgart: "STU",
  "TSG Hoffenheim": "HFF", Hoffenheim: "HFF",
  "VfL Wolfsburg": "WOB", Wolfsburg: "WOB",
  "Borussia Mönchengladbach": "BMG", "Borussia Monchengladbach": "BMG",
  "Union Berlin": "UNB", "FSV Mainz 05": "MAI", Mainz: "MAI",
  "FC Augsburg": "AUG", Augsburg: "AUG",
  "FC Heidenheim": "HEI", "1. FC Heidenheim": "HEI", Heidenheim: "HEI",
  "FC St. Pauli": "STP", "St. Pauli": "STP",
  "VfL Bochum": "BOC", Bochum: "BOC",
  "Holstein Kiel": "KIE", "1. FC Holstein Kiel": "KIE",
  // Serie A
  "Inter Milan": "INT", Napoli: "NAP", Juventus: "JUV", "AC Milan": "MIL",
  Atalanta: "ATA", Lazio: "LAZ", Roma: "ROM", "AS Roma": "ROM",
  Fiorentina: "FIO", Bologna: "BOL", Torino: "TOR", Udinese: "UDI",
  Genoa: "GEN", Cagliari: "CAG", "Hellas Verona": "VER", Verona: "VER",
  Lecce: "LEC", Parma: "PAR", Empoli: "EMP", Monza: "MON",
  Como: "COM", Venezia: "VEN",
  // IPL
  "Chennai Super Kings": "CSK", "Mumbai Indians": "MI",
  "Royal Challengers Bengaluru": "RCB", "Royal Challengers Bangalore": "RCB",
  "Kolkata Knight Riders": "KKR", "Sunrisers Hyderabad": "SRH",
  "Rajasthan Royals": "RR", "Delhi Capitals": "DC",
  "Punjab Kings": "PBKS", "Gujarat Titans": "GT",
  "Lucknow Super Giants": "LSG",
};

export const TEAM_COLORS: Record<string, string> = {
  // EPL
  LIV: "#c8102e", ARS: "#ef0107", MCI: "#6cabdd", TOT: "#132257",
  CHE: "#034694", AVL: "#670e36", NEW: "#241f20", BHA: "#274488",
  NFO: "#d71920", WOL: "#FDB913", WHA: "#7A263A", BRE: "#e30613",
  FUL: "#000000", CRY: "#1B458F", BOU: "#da291c", MUN: "#da291c",
  EVE: "#003399", IPS: "#003399", LEI: "#003090", SOU: "#d71920", SUN: "#eb172b",
  // La Liga
  BAR: "#004d98", RMA: "#e8e8e8", ATM: "#cb3524", RSO: "#005ea5",
  VIL: "#fde047", BET: "#005ba1", ATH: "#cc1a1a", SEV: "#d71920",
  GIR: "#c8102e", OSA: "#034694", CEL: "#7ab2e8", RAY: "#e30613",
  MAL: "#d71920", LPA: "#ffd700", GET: "#035AA6", LEG: "#004b8d",
  VAL: "#f5a623", ALA: "#004b8d", ESP: "#0067b1", VLD: "#7b2d8e",
  // Bundesliga
  BAY: "#dc0000", BVB: "#fde047", LEV: "#e30613", RBL: "#004b8d",
  WOB: "#1e5128", STU: "#e1000f", FRA: "#e30613", FRE: "#cc0000",
  UNB: "#cc0000", BMG: "#000000", WER: "#009739", HFF: "#1961AC",
  AUG: "#ba3733", MAI: "#c3212f", HEI: "#CC0000", KIE: "#004a9f",
  BOC: "#005ca9", STP: "#9e3124",
  // Serie A
  INT: "#1d428a", NAP: "#1a78cf", JUV: "#000000", MIL: "#ac1b2f",
  LAZ: "#87ceeb", FIO: "#7b2d8e", ATA: "#1d3f8e", ROM: "#8B0000",
  TOR: "#8B0000", BOL: "#1d428a", UDI: "#000000", GEN: "#cc0000",
  CAG: "#cc0000", EMP: "#005ca9", MON: "#e30613", VER: "#ffdd00",
  PAR: "#f5c518", COM: "#0055a4", VEN: "#1d428a", LEC: "#f5a623",
  // IPL
  CSK: "#FCCA06", MI: "#004BA0", RCB: "#EC1C24", KKR: "#3A225D",
  GT: "#1C4480", RR: "#EA1A85", SRH: "#F7A721", DC: "#00008B",
  PBKS: "#AA4545", LSG: "#A72056",
};

export const F1_TEAM_COLORS: Record<string, string> = {
  McLaren: "#ff8700", Mercedes: "#00d2be",
  "Red Bull Racing": "#3671C6", "Red Bull": "#3671C6",
  Ferrari: "#dc0000", Haas: "#B6BABD", Williams: "#37BEDD",
  "Aston Martin": "#358C75", "Racing Bulls": "#6692FF", RB: "#6692FF",
  Alpine: "#2293D1", Sauber: "#52E252", "Kick Sauber": "#52E252",
  Cadillac: "#cccccc",
};

export function teamCode(name: string): string {
  return TEAM_CODE_MAP[name] ?? name.substring(0, 3).toUpperCase();
}

export function teamColor(code: string): string {
  return TEAM_COLORS[code] ?? "#666666";
}

export function formatFixtureDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return `${days[date.getDay()]}, ${d} ${months[m - 1]}`;
}

export function formatGD(gd: number): string {
  return gd > 0 ? `+${gd}` : String(gd);
}

export function todayStr(): string {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
}
