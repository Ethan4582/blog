import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Note: Standard Next.js redirects in next.config.ts don't work with 'output: export'.
  // We will handle the root redirect via a small client-side component or a _redirects file.
};

export default nextConfig;
