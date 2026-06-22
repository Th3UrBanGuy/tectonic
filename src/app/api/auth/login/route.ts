import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  comparePassword,
  ensureDefaultAdmin,
  signToken,
  toAuthUser,
  validateEmail,
  sanitizeString,
} from "@/lib/auth";

// Simple in-memory rate limiting (per IP + email)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 failed attempts per 15 min

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry || now - entry.lastAttempt > RATE_LIMIT_WINDOW) {
    loginAttempts.set(key, { count: 1, lastAttempt: now });
    return true;
  }
  entry.count++;
  entry.lastAttempt = now;
  return entry.count <= RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = sanitizeString(String(body?.email ?? "").toLowerCase(), 254);
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Rate limiting — keyed by IP + email
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateLimitKey = `${ip}:${email}`;
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    // Ensure default admin exists (one-time, idempotent)
    await ensureDefaultAdmin();

    const user = await db.user.findUnique({ where: { email } });

    // Check isActive — deactivated users can't login
    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Successful login — reset rate limit for this key
    loginAttempts.delete(rateLimitKey);

    // Update lastLogin timestamp
    await db.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const authUser = toAuthUser(user);
    const token = signToken(authUser);

    return NextResponse.json({
      success: true,
      token,
      expiresIn: "8h",
      user: authUser,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
