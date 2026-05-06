import type { NextConfig } from "next";

// GITHUB_ACTIONS is set automatically by GitHub Actions runners.
// We only want `output: "export"` (static export) in CI — local builds
// keep API routes working for dev.
const isCI = process.env.GITHUB_ACTIONS === "true";

const basePath = isCI ? "/sports-calendar" : "";

const nextConfig: NextConfig = {
  ...(isCI ? { output: "export" } : {}),
  basePath,
  assetPrefix: isCI ? "/sports-calendar/" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
