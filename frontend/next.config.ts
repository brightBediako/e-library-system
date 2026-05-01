import type { NextConfig } from "next";

/** Browser calls same-origin `/api/*`; Next forwards to Nest (avoids CORS during local dev). */
const backendProxyTarget = process.env.BACKEND_PROXY_TARGET ?? "http://127.0.0.1:3001";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendProxyTarget.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
