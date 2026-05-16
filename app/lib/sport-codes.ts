/**
 * Standard short codes used across the app.
 *
 * Only codes that are widely-recognized in the sport are included — no
 * invented abbreviations. Sources: FIFA/UEFA stage codes, football-data.org
 * position taxonomy, common football match-status terminology (FT/HT/LIVE),
 * and standard squad-section plurals used by FotMob, ESPN, and Sofascore.
 */

/**
 * Short code shown as a chip on a player card.
 * football-data.org returns four coarse position values; map each to the
 * universally-used three-letter code.
 */
export const POSITION_CODE: Record<string, string> = {
  Goalkeeper: "GK",
  Defence: "DEF",
  Defender: "DEF",
  Midfield: "MID",
  Midfielder: "MID",
  Offence: "FWD",
  Forward: "FWD",
  Attacker: "FWD",
};

/**
 * Section header (plural) used when grouping a squad by position.
 * football-data.org's "Offence" is non-standard in football — we render
 * the conventional "Forwards" instead.
 */
export const POSITION_GROUP_LABEL: Record<string, string> = {
  Goalkeeper: "Goalkeepers",
  Defence: "Defenders",
  Defender: "Defenders",
  Midfield: "Midfielders",
  Midfielder: "Midfielders",
  Offence: "Forwards",
  Forward: "Forwards",
  Attacker: "Forwards",
};

export const POSITION_ORDER = ["Goalkeeper", "Defence", "Midfield", "Offence"] as const;

export function positionCode(raw: string | null | undefined): string {
  if (!raw) return "—";
  return POSITION_CODE[raw] ?? raw.slice(0, 3).toUpperCase();
}

export function positionGroupLabel(raw: string): string {
  return POSITION_GROUP_LABEL[raw] ?? raw;
}

/**
 * Knockout-stage short codes — the form FIFA/UEFA use in brackets and
 * broadcast graphics. DB keys are already short (group/r32/r16/qf/sf/third/final);
 * this map renders them for display.
 */
export const STAGE_SHORT: Record<string, string> = {
  group: "Group",
  r32: "R32",
  r16: "R16",
  qf: "QF",
  sf: "SF",
  third: "3rd Place",
  final: "Final",
};

export function stageLabel(stage: string | null | undefined, group?: string | null): string {
  if (!stage) return "";
  if (stage === "group" && group) return `Group ${group}`;
  return STAGE_SHORT[stage] ?? stage;
}
