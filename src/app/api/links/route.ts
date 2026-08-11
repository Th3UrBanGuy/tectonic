import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

// GET /api/links — list all links
export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const links = await db.shortenedLink.findMany({
    orderBy: { createdAt: "desc" },
  });

  const linkVisits = await db.linkVisit.groupBy({
    by: ["linkId"],
    _count: { id: true },
    orderBy: { linkId: "asc" },
  });

  const visitCounts = new Map(linkVisits.map(v => [v.linkId, v._count.id]));

  return NextResponse.json({
    data: links.map(l => ({
      id: String(l.id),
      originalUrl: l.originalUrl || "",
      slug: l.slug || "",
      shortUrl: l.shortUrl || "",
      password: l.password ? true : false,
      waitingTime: l.waitingTime || 0,
      maxVisits: l.maxVisits || null,
      currentVisits: l.currentVisits || 0,
      isActive: l.isActive !== false,
      expiresAt: l.expiresAt ? l.expiresAt.toISOString() : null,
      createdAt: l.createdAt ? l.createdAt.toISOString() : new Date().toISOString(),
      visitCount: visitCounts.get(l.id) || 0,
    })),
  });
}

// POST /api/links — create a new link
export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { originalUrl, slug, shortUrl, password, waitingTime, maxVisits, expiresAt } = body;

  if (!originalUrl || !slug) {
    return NextResponse.json({ error: "originalUrl and slug are required" }, { status: 400 });
  }

  // Validate URL format — only allow http/https protocols
  try {
    const parsed = new URL(originalUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return NextResponse.json({ error: "Only http and https URLs are allowed" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  // Validate slug format — alphanumeric and hyphens only
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    return NextResponse.json({ error: "Slug can only contain letters, numbers, hyphens, and underscores" }, { status: 400 });
  }

  const existing = await db.shortenedLink.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const link = await db.shortenedLink.create({
    data: {
      originalUrl,
      slug,
      shortUrl: shortUrl || slug,
      password: password || null,
      waitingTime: waitingTime || 0,
      maxVisits: maxVisits || null,
      currentVisits: 0,
      isActive: true,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  return NextResponse.json({
    data: {
      id: String(link.id),
      originalUrl: link.originalUrl,
      slug: link.slug,
      shortUrl: link.shortUrl,
      password: !!link.password,
      waitingTime: link.waitingTime,
      maxVisits: link.maxVisits,
      currentVisits: 0,
      isActive: true,
      expiresAt: link.expiresAt ? link.expiresAt.toISOString() : null,
      createdAt: link.createdAt ? link.createdAt.toISOString() : new Date().toISOString(),
    },
  }, { status: 201 });
}

// PUT /api/links — update a link
export async function PUT(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, originalUrl, slug, shortUrl, password, waitingTime, maxVisits, expiresAt, isActive } = body;

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const updateData: any = {};
  if (originalUrl !== undefined) updateData.originalUrl = originalUrl;
  if (slug !== undefined) updateData.slug = slug;
  if (shortUrl !== undefined) updateData.shortUrl = shortUrl;
  if (password !== undefined) updateData.password = password || null;
  if (waitingTime !== undefined) updateData.waitingTime = waitingTime;
  if (maxVisits !== undefined) updateData.maxVisits = maxVisits;
  if (expiresAt !== undefined) updateData.expiresAt = expiresAt ? new Date(expiresAt) : null;
  if (isActive !== undefined) updateData.isActive = isActive;

  const link = await db.shortenedLink.update({
    where: { id: parseInt(id) },
    data: updateData,
  });

  return NextResponse.json({
    data: {
      id: String(link.id),
      originalUrl: link.originalUrl,
      slug: link.slug,
      shortUrl: link.shortUrl,
      password: !!link.password,
      waitingTime: link.waitingTime,
      maxVisits: link.maxVisits,
      currentVisits: link.currentVisits,
      isActive: link.isActive,
      expiresAt: link.expiresAt ? link.expiresAt.toISOString() : null,
      createdAt: link.createdAt ? link.createdAt.toISOString() : new Date().toISOString(),
    },
  });
}

// DELETE /api/links — delete a link
export async function DELETE(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await db.shortenedLink.delete({ where: { id: parseInt(id) } });

  return NextResponse.json({ success: true });
}
