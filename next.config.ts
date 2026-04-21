import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix Turbopack workspace root detection when there are lockfiles
  // in parent directories (e.g. C:\Users\username\package-lock.json)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
