import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Note: experimental.inlineCss was evaluated and rejected — Next duplicates the
  // inlined stylesheet inside the RSC flight payload, tripling the HTML size.
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote hosts here only when real remote images are configured.
    remotePatterns: [],
  },
};

export default nextConfig;
