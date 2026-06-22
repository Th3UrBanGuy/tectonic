# Dockerfile — Multi-platform deployment support
# Works with: AWS ECS/Fargate, AWS App Runner, Google Cloud Run, Azure Container Apps,
# Railway, Render, Fly.io, and any Docker-compatible platform.
#
# Build: docker build -t tectonic .
# Run:   docker run -p 3000:3000 -e DATABASE_URL=... -e JWT_SECRET=... tectonic

# ─── Stage 1: Dependencies ──────────────────────────────────────────────
FROM node:20-slim AS deps

# Install Bun
RUN npm install -g bun

WORKDIR /app

# Copy lockfile + package.json for dependency caching
COPY package.json bun.lock* ./
COPY prisma ./prisma

# Install dependencies (postinstall runs prisma generate)
RUN bun install --frozen-lockfile

# ─── Stage 2: Build ─────────────────────────────────────────────────────
FROM node:20-slim AS builder

RUN npm install -g bun

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app (prisma generate runs first via the build script)
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# ─── Stage 3: Production ────────────────────────────────────────────────
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Install only production dependencies
COPY package.json bun.lock* ./
COPY prisma ./prisma
RUN npm install -g bun && \
    bun install --frozen-lockfile --production && \
    bunx prisma generate

# Copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY next.config.ts ./
COPY package.json ./

# Non-root user for security
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs
USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/api/content').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["bun", "run", "start"]
