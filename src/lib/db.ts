import { PrismaClient } from '@prisma/client'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * Ensure DATABASE_URL points to PostgreSQL (not a stale SQLite URL).
 *
 * A stale OS env var (e.g. file:...custom.db) can override .env.
 * We detect this and reload the correct PostgreSQL URL from .env.
 *
 * In production (Vercel, AWS, Docker), env vars are set by the platform
 * and .env may not exist — existsSync returns false and we skip.
 */
function ensureDatabaseUrl() {
  const current = process.env.DATABASE_URL || ''

  // If already a valid PostgreSQL URL, we're good
  if (current.startsWith('postgresql://') || current.startsWith('postgres://')) {
    return
  }

  // Try to load the correct URL from .env file
  const envPath = join(process.cwd(), '.env')
  if (!existsSync(envPath)) return

  try {
    const envContent = readFileSync(envPath, 'utf-8')
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const val = trimmed.slice(eq + 1).trim()
      if (key === 'DATABASE_URL' && (val.startsWith('postgresql://') || val.startsWith('postgres://'))) {
        // Override the stale env var with the correct PostgreSQL URL
        process.env.DATABASE_URL = val
      } else if (!process.env[key]) {
        process.env[key] = val
      }
    }
  } catch {
    // ignore read errors
  }
}

ensureDatabaseUrl()

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
