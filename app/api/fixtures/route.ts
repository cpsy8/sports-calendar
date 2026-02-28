import { generateDummyFixtures } from "@/app/lib/fixtures";
import { NextResponse } from "next/server";

export async function GET() {
  const fixtures = generateDummyFixtures();
  return NextResponse.json({ fixtures, updatedAt: new Date().toISOString() });
}
