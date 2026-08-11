import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserFromRequest, sanitizeString } from "@/lib/auth";

export async function GET(req: Request) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: dbUser });
}

export async function PUT(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const data: Record<string, string> = {};

    if (body?.name !== undefined) {
      data.name = sanitizeString(String(body.name), 100);
    }
    if (body?.email !== undefined) {
      const email = sanitizeString(String(body.email).toLowerCase(), 254);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }
      // Check if email is taken by another user
      const existing = await db.user.findFirst({
        where: { email, id: { not: user.id } },
      });
      if (existing) {
        return NextResponse.json({ error: "Email already in use" }, { status: 409 });
      }
      data.email = email;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const updated = await db.user.update({
      where: { id: user.id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
