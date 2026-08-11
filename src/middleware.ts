import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

/**
 * Next.js Edge middleware — route protection + edge caching headers.
 *
 * Protects /dashboard by verifying the JWT server-side.
 * Adds Cache-Control headers for ISR and static pages.
 */

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("FATAL: JWT_SECRET must be set and >= 32 chars in production");
  }
  return "tectonic_dev_secret_change_in_production_min_32_chars_long";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public paths that never need auth
  const publicPaths = ["/api/contact", "/api/content", "/api/og", "/api/go"];
  const isPublicApi = publicPaths.some((p) => pathname.startsWith(p)) && req.method === "GET";
  const isContactPost = pathname.startsWith("/api/contact") && req.method === "POST";

  if (isPublicApi || isContactPost) {
    return addCacheHeaders(req, NextResponse.next());
  }

  // Protect /dashboard and admin API routes
  const needsAuth =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api/auth/users") ||
    pathname.startsWith("/api/auth/change-password") ||
    pathname.startsWith("/api/links") ||
    pathname.startsWith("/api/contact/");

  if (needsAuth) {
    // For page navigations (text/html), let the client-side ProtectedRoute handle auth
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

  return addCacheHeaders(req, NextResponse.next());
}

function addCacheHeaders(req: NextRequest, response: NextResponse): NextResponse {
  const { pathname } = req.nextUrl;

  // Dashboard and login — no cache
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) {
    response.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return response;
  }

  // API routes — no cache (fresh data)
  if (pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return response;
  }

  // Static assets (images, fonts, etc.) — immutable cache
  if (pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/)) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return response;
  }

  // Sitemap and robots — cache for 1 hour
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
    response.headers.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
    return response;
  }

  // pSEO pages (industry + service) — ISR with stale-while-revalidate
  // These have revalidate=3600 in the page component, but edge headers help too
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 1 || segments.length === 2) {
    // Could be industry or industry/service pSEO page
    response.headers.set(
      "Cache-Control",
      "public, max-age=0, must-revalidate, stale-while-revalidate=3600"
    );
    return response;
  }

  // Main pages — short cache with stale-while-revalidate
  response.headers.set(
    "Cache-Control",
    "public, max-age=0, must-revalidate, stale-while-revalidate=60"
  );
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
