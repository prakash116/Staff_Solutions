import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Inline the (small) Tailwind stylesheet into the HTML so first paint does
    // not wait on a separate render-blocking CSS request.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote hosts here only when real remote images are configured.
    remotePatterns: [],
  },
};

export default nextConfig;
