## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase (database)

1. Create a project at [Supabase](https://supabase.com)
2. Copy `.env.example` to `.env.local` and add:
   - `NEXT_PUBLIC_SUPABASE_URL` – Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` – anon key (for the app)
   - `SUPABASE_SERVICE_ROLE_KEY` – service_role key (for db:seed script only)
3. **Create table + seed data** – In Supabase **SQL Editor**, run the contents of `supabase/setup.sql`
   - Or run table migration first, then: `npm run db:seed` (uses service role key)

For GitHub Actions CI, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as repository secrets.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

Without `.env.local`, the app falls back to dummy data.
