import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // required for static export
  basePath: isProd ? "/sports-calendar" : "",
  assetPrefix: isProd ? "/sports-calendar/" : "",
};

export default nextConfig;
