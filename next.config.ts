import type { NextConfig } from "next";

// GITHUB_ACTIONS is set automatically by GitHub Actions runners.
// We only want `output: "export"` (static export) in CI — local builds
// keep API routes working for dev.
const isCI = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  ...(isCI ? { output: "export" } : {}),
  basePath: isCI ? "/sports-calendar" : "",
  assetPrefix: isCI ? "/sports-calendar/" : "",
};

export default nextConfig;
