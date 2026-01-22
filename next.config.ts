import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  image: {
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
  /* config options here */
  // experimental: {
  //   serverComponentsExternalPackages: ["@payloadcms/storage-vercel-blob"],
  // },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.css$/,
  //     use: ["style-loader", "css-loader"],
  //   });
  //   return config;
  // },
};

export default withPayload(nextConfig);
