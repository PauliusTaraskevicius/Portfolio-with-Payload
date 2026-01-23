import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },
  // Optimize for modern browsers - reduce bundle size
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
      "react-icons/io",
      "react-icons/fa",
      "react-icons/bs",
      "react-icons/cg",
      "react-icons/ci",
      "@tanstack/react-query",
      "swiper",
      "swiper/react",
      "swiper/modules",
    ],
    optimizeCss: true, // Enable CSS optimization with critters
  },
  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default withPayload(nextConfig);
