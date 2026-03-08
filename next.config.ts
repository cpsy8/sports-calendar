import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Removed output: "export" – API routes (fixtures) require a server.
  // Use Vercel/Node for deployment. For static hosting, you'd need a separate backend.
  basePath: isProd ? "/sports-calendar" : "",
  assetPrefix: isProd ? "/sports-calendar/" : "",
};

export default nextConfig;
