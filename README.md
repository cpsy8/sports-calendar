## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Database setup

**Local development (Docker Postgres)** – separate tables per sport:

1. Copy `.env.local.example` to `.env.local` and add:
   - `DATABASE_URL=postgresql://sports:sports@localhost:5432/sports_calendar`
2. Start Postgres: `docker compose up -d`
3. Seed dummy data: `npm run db:seed:local`

**Production (Supabase)** – used when `DATABASE_URL` is not set or `NODE_ENV` is production:

1. Create a project at [Supabase](https://supabase.com)
2. Add to `.env.local` (or production env):
   - `NEXT_PUBLIC_SUPABASE_URL` – Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – anon key
   - `SUPABASE_SERVICE_ROLE_KEY` – for `npm run db:seed` (Supabase seed script)
3. Run `supabase/setup.sql` in Supabase SQL Editor, then `npm run db:seed`

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

Without `.env.local`, the app falls back to in-memory dummy data.
