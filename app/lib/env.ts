/**
 * Environment detection for local vs production.
 * Local: use Docker Postgres (DATABASE_URL).
 * Production: use Supabase.
 */
export function isLocal(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    !!process.env.DATABASE_URL
  );
}

/**
 * URL of the external database service (Python controller).
 * When set, the app will call this service instead of talking
 * directly to Postgres/Supabase.
 */
export function getDbServiceUrl(): string | null {
  return process.env.DB_SERVICE_URL ?? null;
}
