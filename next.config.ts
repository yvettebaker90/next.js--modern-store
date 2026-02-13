import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow images from any HTTPS domain (wildcard pattern)
      // This is necessary because the Platzi API returns images from various third-party sources
      { protocol: "https", hostname: "**" },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
