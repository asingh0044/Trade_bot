import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["lit"] = path.resolve(__dirname, "node_modules/lit");
    return config;
  },
};

export default nextConfig;
