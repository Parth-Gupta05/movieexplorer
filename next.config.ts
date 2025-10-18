import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["image.tmdb.org"], // <--- This must be here
  },
};

export default nextConfig;
