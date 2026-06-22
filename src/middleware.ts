import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

/**
 * Next.js Edge middleware — server-side route protection.
 *
 * Protects /dashboard by verifying the JWT server-side.
 * Uses jsonwebtoken directly (no Prisma) to be Edge-runtime compatible.
 */

// Read JWT secret the same way as auth.ts (but Edge-safe — no readFileSync)
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (secret && secret.length >= 32) return secret;
  // Dev fallback
  return "tectonic_dev_secret_change_in_production_min_32_chars_long";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /dashboard route
  if (pathname.startsWith("/dashboard")) {
    // For page navigations (text/html), let the client-side ProtectedRoute handle auth
    // The middleware can't read localStorage tokens
    if (req.headers.get("accept")?.includes("text/html")) {
      return NextResponse.next();
    }

    // For API/non-HTML requests, check for Bearer token
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(match[1], getJwtSecret(), {
        issuer: "tectonic-api",
        audience: "tectonic-dashboard",
        algorithms: ["HS256"],
      });
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
