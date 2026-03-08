// Local dev only — in production (static export / GitHub Pages), the client
// queries Supabase directly and never calls this route.
// `force-static` lets the static export build succeed; DATABASE_URL won't be
// set in CI so fetchFixtures() returns [] which is fine.
export const dynamic = "force-static";

import { NextRequest } from "next/server";
import { fetchFixtures, type SportId } from "@/app/lib/fetch-fixtures";

const VALID_SPORTS: SportId[] = ["all", "football", "f1"];

export async function GET(request: NextRequest) {
  const sport = request.nextUrl.searchParams.get("sport") ?? "all";
  const sportId: SportId = VALID_SPORTS.includes(sport as SportId)
    ? (sport as SportId)
    : "all";

  const { fixtures, updatedAt } = await fetchFixtures(sportId);
  return Response.json({ fixtures, updatedAt });
}
