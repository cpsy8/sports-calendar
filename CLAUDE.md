# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Environment Variables

Create `.env.local` with:

```
NODE_ENV=development
NEXT_PUBLIC_SUPABASE_URL=<supabase project url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase anon key>
SUPABASE_SERVICE_ROLE_KEY=<supabase service role key>
DATABASE_URL=postgresql://sports:sports@localhost:5432/sports_calendar
```

## Architecture

**Next.js 16 app** (App Router) with React 19, TypeScript, Tailwind CSS v4, Drizzle ORM.

### Data flow

- **`app/page.tsx`** — Single client component (`"use client"`) that manages all state: selected sport, center date, and fixtures. Fetches from `/api/fixtures?sport=<id>` on mount and sport change. Always renders the daily view.
- **`app/api/fixtures/route.ts`** — GET endpoint that delegates to `fetchFixtures()`.
- **`app/lib/fetch-fixtures.ts`** — Core data-fetching logic with environment-based routing:
  - `NODE_ENV === "production"` → reads from **Supabase** (`fetchFromSupabase`)
  - Development → reads from **local Docker Postgres** via Drizzle ORM (`fetchFromPostgres`)
- **`app/lib/db-schema.ts`** — Drizzle schema for `football_fixtures` and `f1_fixtures` tables.
- **`app/lib/supabase-client.ts`** — Creates Supabase client from env vars (returns `null` if not configured).
- **`app/lib/postgres-client.ts`** — Singleton `pg.Pool` for local dev; returns `null` outside development.

### Shared types and constants

- **`app/lib/fixtures.ts`** — `Fixture` interface, `COMPETITION_COLORS` map (competition name → color key), `CARD_CLASSES` map (color key → Tailwind classes), and `generateDummyFixtures()` for offline development.

### UI components

- **`app/components/HeaderBar.tsx`** — Sticky header with date navigation (prev/next day) and refresh button. Props: `centerDate`, `onPrev`, `onNext`, `onRefresh`, `loading`, `lastUpdated`.
- **`app/components/SportSelector.tsx`** — Centered pill-button filter bar for "All sports", "Football", "F1".

### View

Single **daily** view — list of match cards for the selected date, sorted by kickoff time. No weekly or monthly views.

### F1 fixture mapping

F1 rows are mapped to the `Fixture` interface with `circuit` as `homeTeam`, `country` as `awayTeam`, and a fixed `14:00` kickoff. Status mapping: `practice/qualifying/race` → `live`, `completed/cancelled` → `finished`.

### Path alias

`@/*` maps to the repo root (e.g., `@/app/lib/fixtures`).
