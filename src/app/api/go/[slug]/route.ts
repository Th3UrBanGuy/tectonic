import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/go/[slug] — redirect to original URL and track visit
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const link = await db.shortenedLink.findUnique({
    where: { slug },
  });

  if (!link) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  if (!link.isActive) {
    return new NextResponse("Link is inactive", { status: 410 });
  }

  if (link.expiresAt && new Date() > link.expiresAt) {
    return new NextResponse("Link has expired", { status: 410 });
  }

  if (link.maxVisits && (link.currentVisits || 0) >= link.maxVisits) {
    return new NextResponse("Link has reached maximum visits", { status: 410 });
  }

  // Track visit
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const referrer = req.headers.get("referer") || "Direct";
  const userAgent = req.headers.get("user-agent") || "";

  await Promise.all([
    db.shortenedLink.update({
      where: { id: link.id },
      data: { currentVisits: { increment: 1 } },
    }),
    db.linkVisit.create({
      data: {
        linkId: link.id,
        referrer,
        userAgent,
        ipAddress: ip,
      },
    }),
  ]);

  // Validate redirect URL is safe (http/https only)
  const redirectUrl = link.originalUrl || "/";
  let safeRedirect: URL;
  try {
    safeRedirect = new URL(redirectUrl);
    if (!["http:", "https:"].includes(safeRedirect.protocol)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch {
    // Relative URL — safe to redirect
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.redirect(safeRedirect);
}
