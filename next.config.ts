import type { NextConfig } from "next";

// Production builds always target GitHub Pages at /sports-calendar.
// `next dev` keeps NODE_ENV=development → basePath "" → API routes work.
// Keying off NODE_ENV (auto-inlined by Next) lets client utils derive the
// same basePath without separate env plumbing.
const isProd = process.env.NODE_ENV === "production";

const basePath = isProd ? "/sports-calendar" : "";

const nextConfig: NextConfig = {
  ...(isProd ? { output: "export" } : {}),
  basePath,
  assetPrefix: isProd ? "/sports-calendar/" : "",
};

export default nextConfig;
