import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network IP for HMR
  allowedDevOrigins: ["192.168.0.31"],
};

export default nextConfig;
