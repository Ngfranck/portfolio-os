import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(process.env.NODE_ENV === "production"
    ? { basePath: "/admin" }
    : {}),
};

export default nextConfig;
