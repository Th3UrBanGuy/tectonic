import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  requireAdmin,
  hashPassword,
  toAuthUser,
  validateEmail,
  validatePassword,
  sanitizeString,
} from "@/lib/auth";

// GET /api/auth/users — list all admin users (ADMIN ONLY)
export async function GET(req: Request) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  return NextResponse.json({ users });
}

// POST /api/auth/users — create a new user (ADMIN ONLY)
export async function POST(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const email = sanitizeString(String(body?.email ?? "").toLowerCase(), 254);
    const password = String(body?.password ?? "");
    const name = sanitizeString(String(body?.name ?? ""), 100);
    const role = sanitizeString(String(body?.role ?? "user"), 20);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate password strength
    const pwdCheck = validatePassword(password);
    if (!pwdCheck.valid) {
      return NextResponse.json({ error: pwdCheck.error }, { status: 400 });
    }

    // Only allow valid roles
    if (!["admin", "editor", "viewer", "user"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "A user with that email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await db.user.create({
      data: { email, name, role, passwordHash },
    });

    return NextResponse.json({ user: toAuthUser(user) });
  } catch {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// PUT /api/auth/users — update an existing user (ADMIN ONLY)
export async function PUT(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const id = parseInt(String(body?.id ?? ""), 10);
    if (isNaN(id) || id < 1) {
      return NextResponse.json({ error: "User id is required" }, { status: 400 });
    }

    const data: {
      email?: string;
      name?: string;
      role?: string;
      passwordHash?: string;
    } = {};

    if (body?.email) {
      const email = sanitizeString(String(body.email).toLowerCase(), 254);
      if (!validateEmail(email)) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }
      data.email = email;
    }
    if (body?.name) data.name = sanitizeString(String(body.name), 100);
    if (body?.role) {
      const role = sanitizeString(String(body.role), 20);
      if (!["admin", "editor", "viewer", "user"].includes(role)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
      }
      data.role = role;
    }
    if (body?.password) {
      const pwdCheck = validatePassword(String(body.password));
      if (!pwdCheck.valid) {
        return NextResponse.json({ error: pwdCheck.error }, { status: 400 });
      }
      data.passwordHash = await hashPassword(String(body.password));
    }

    const user = await db.user.update({ where: { id }, data });
    return NextResponse.json({ user: toAuthUser(user) });
  } catch {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE /api/auth/users — delete a user (ADMIN ONLY)
export async function DELETE(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const id = parseInt(String(body?.id ?? ""), 10);
    if (isNaN(id) || id < 1) {
      return NextResponse.json({ error: "User id is required" }, { status: 400 });
    }

    // Prevent self-deletion
    if (id === currentUser.id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    await db.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
