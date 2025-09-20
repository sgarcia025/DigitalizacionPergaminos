import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: "/app/frontend",
  experimental: {
    turbo: {
      root: "/app/frontend",
    },
  },
};

export default nextConfig;
