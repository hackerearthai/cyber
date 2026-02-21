import { NextRequest, NextResponse } from "next/server";
import { CHROME_STORE_URL } from "@/lib/constants";

// In-memory store for demo purposes.
// Swap this for a real DB (e.g. Supabase, Postgres) in production.
let installClicks: { timestamp: string; source: string; userAgent: string }[] =
  [];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const source: string = body.source ?? "unknown";
  const userAgent = req.headers.get("user-agent") ?? "unknown";

  installClicks.push({
    timestamp: new Date().toISOString(),
    source,
    userAgent,
  });

  return NextResponse.json({ success: true, total: installClicks.length });
}

export async function GET() {
  return NextResponse.json({
    total: installClicks.length,
    recentClicks: installClicks.slice(-20),
    chromeStoreUrl: CHROME_STORE_URL,
  });
}
