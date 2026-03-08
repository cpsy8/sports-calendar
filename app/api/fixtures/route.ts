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
