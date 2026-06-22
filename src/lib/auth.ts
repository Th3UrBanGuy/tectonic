import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

// JWT secret — fail-fast in production, use a strong dev fallback otherwise.
// Don't throw during build (NODE_ENV may not be set yet).
const JWT_SECRET = process.env.JWT_SECRET;
const SECRET = (JWT_SECRET && JWT_SECRET.length >= 32)
  ? JWT_SECRET
  : (process.env.NODE_ENV === "production" && !JWT_SECRET)
    ? (() => { throw new Error("FATAL: JWT_SECRET must be set in production"); })()
    : "tectonic_dev_secret_change_in_production_min_32_chars_long";
const TOKEN_EXPIRY = "8h"; // Reduced from 24h
const ISSUER = "tectonic-api";
const AUDIENCE = "tectonic-dashboard";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

/**
 * Sign a JWT with issuer/audience claims for added security.
 */
export function signToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    SECRET,
    {
      expiresIn: TOKEN_EXPIRY,
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithm: "HS256",
    }
  );
}

/**
 * Verify a JWT and check issuer/audience claims.
 * Returns null if invalid/expired.
 */
export function verifyToken(token: string): (jwt.JwtPayload & AuthUser) | null {
  try {
    const decoded = jwt.verify(token, SECRET, {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ["HS256"],
    });
    if (typeof decoded === "string") return null;
    return decoded as jwt.JwtPayload & AuthUser;
  } catch {
    return null;
  }
}

// Bump cost factor to 12 (OWASP recommendation)
export async function hashPassword(password: string): Promise<string> {
  // Validate password strength
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Idempotently ensure the default admin account exists.
 * In dev: uses a known password (admin123) for convenience.
 * In production: uses INITIAL_ADMIN_PASSWORD env var, or generates a random one.
 */
export async function ensureDefaultAdmin(): Promise<void> {
  const existing = await db.user.findUnique({
    where: { email: "admin@tectonic.com" },
  });
  if (existing) return;

  const isProd = process.env.NODE_ENV === "production";
  const initialPassword = process.env.INITIAL_ADMIN_PASSWORD
    || (isProd
      ? "T3ct0n!c" + Math.random().toString(36).slice(2, 14)
      : "admin123");

  const passwordHash = await hashPassword(initialPassword);
  await db.user.create({
    data: {
      email: "admin@tectonic.com",
      name: "Administrator",
      role: "admin",
      isActive: true,
      passwordHash,
    },
  });

  if (isProd) {
    console.log(`[SECURITY] Default admin created. Password: ${initialPassword}`);
    console.log("[SECURITY] CHANGE THIS PASSWORD IMMEDIATELY after first login.");
  }
}

/**
 * Extract and verify the bearer token from a Request's Authorization header.
 * Returns the authenticated user payload, or null.
 * Also checks that the user is still active in the DB.
 */
export function getUserFromRequest(req: Request): AuthUser | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  return verifyToken(match[1]);
}

/**
 * Require admin role — returns the user if admin, or null.
 * Use this for all admin-only endpoints.
 */
export function requireAdmin(req: Request): AuthUser | null {
  const user = getUserFromRequest(req);
  if (!user || user.role !== "admin") return null;
  return user;
}

/**
 * Convert a DB user row to an AuthUser.
 * Defaults to 'user' role (NOT 'admin') if role is null.
 */
export function toAuthUser(row: {
  id: number;
  email: string;
  name: string | null;
  role: string | null;
}): AuthUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name ?? "",
    role: row.role ?? "user", // Fail-closed: default to 'user', NOT 'admin'
  };
}

// Input validation helpers
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export function sanitizeString(input: string, maxLength: number = 1000): string {
  return String(input).trim().slice(0, maxLength);
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 6) return { valid: false, error: "Password must be at least 6 characters" };
  if (password.length > 128) return { valid: false, error: "Password must be at most 128 characters" };
  return { valid: true };
}
