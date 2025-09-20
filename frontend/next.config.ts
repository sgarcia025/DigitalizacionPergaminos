import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: "/app/frontend",
  turbopack: {
    root: "/app/frontend",
  },
};

export default nextConfig;
