import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, validateEmail, sanitizeString } from "@/lib/auth";

// GET /api/contact — list all contact submissions (ADMIN ONLY)
export async function GET(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await db.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ submissions });
}

// POST /api/contact — public submission from the /contact page form
// Rate limited via simple in-memory counter (per-IP)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 10; // 10 submissions per 15 min per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now - entry.lastAttempt > RATE_LIMIT_WINDOW) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }
  entry.count++;
  entry.lastAttempt = now;
  return entry.count <= RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));

    // Input validation with length limits
    const name = sanitizeString(String(body?.name ?? ""), 100);
    const email = sanitizeString(String(body?.email ?? ""), 254);
    const message = sanitizeString(String(body?.message ?? ""), 10000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const phone = body?.phone ? sanitizeString(String(body.phone), 30) : null;
    const subject = body?.department
      ? sanitizeString(String(body.department), 100)
      : "General Inquiry";

    const submission = await db.contactSubmission.create({
      data: { name, email, phone, subject, message, status: "New" },
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error("Contact submission error");
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
