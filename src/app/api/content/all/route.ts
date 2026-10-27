import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/content";

/**
 * GET /api/content/all — returns ALL content in a SINGLE request.
 *
 * The assembly lives in @/lib/content (getAllContent) so server
 * components can seed the same payload without an HTTP round-trip.
 * This handler keeps the original behaviour: fresh DB read on every
 * call (client-side 60s localStorage cache sits in front of it).
 */
export async function GET() {
  try {
    const data = await getAllContent();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Batch content API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}
