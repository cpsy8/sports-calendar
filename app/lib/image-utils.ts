/**
 * Deterministic URL builders for Supabase Storage images.
 *
 * Image URLs are constructed from entity codes — no database query needed.
 * If the image doesn't exist at the expected path, the `<TeamLogo>` component
 * handles the 404 gracefully with a fallback.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const BUCKET = "sport-assets";

/**
 * Build the public Supabase Storage URL for a given storage path.
 */
export function getStorageUrl(path: string): string | null {
  if (!SUPABASE_URL) return null;
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

/**
 * Get the logo URL for a team by sport, code, and optional league code.
 *
 * Examples:
 *   teamLogoUrl("football", "ARS", "epl")  → .../team-logos/football/epl/ARS.png
 *   teamLogoUrl("f1", "MCL")               → .../team-logos/f1/MCL.png
 *   teamLogoUrl("cricket", "CSK", "ipl")   → .../team-logos/cricket/ipl/CSK.png
 */
export function teamLogoUrl(
  sport: "football" | "f1" | "cricket",
  code: string,
  leagueCode?: string
): string | null {
  if (sport === "football" && leagueCode) {
    return getStorageUrl(`team-logos/football/${leagueCode}/${code}.png`);
  }
  if (sport === "f1") {
    return getStorageUrl(`team-logos/f1/${code}.png`);
  }
  if (sport === "cricket" && leagueCode) {
    return getStorageUrl(`team-logos/cricket/${leagueCode}/${code}.png`);
  }
  return null;
}

/**
 * Get the logo URL for a competition by its short code.
 *
 * Example: competitionLogoUrl("EPL") → .../competition-logos/EPL.png
 */
export function competitionLogoUrl(code: string): string | null {
  return getStorageUrl(`competition-logos/${code}.png`);
}

/**
 * Get the photo URL for an F1 driver by their 3-letter code.
 *
 * Example: driverPhotoUrl("VER") → .../drivers/VER.png
 */
export function driverPhotoUrl(code: string): string | null {
  return getStorageUrl(`drivers/${code}.png`);
}
