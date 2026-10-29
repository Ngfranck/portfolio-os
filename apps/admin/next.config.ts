import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "9mb",
    },
  },
  ...(process.env.NODE_ENV === "production"
    ? { basePath: "/admin" }
    : {}),
};

export default nextConfig;
