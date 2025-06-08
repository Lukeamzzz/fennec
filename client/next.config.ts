import type { NextConfig } from "next";

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: `
  default-src 'self';
  script-src 'self';
  style-src 'self';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
  form-action 'self';
  img-src 'self';
  font-src 'self';
  connect-src 'self' https://fennec-back-447938427814.northamerica-south1.run.app:8080;
  worker-src 'self' blob:;
`.replace(/\s{2,}/g, ' ').trim(),

    },
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "no-referrer",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
    },
];

const nextConfig: NextConfig = {
    poweredByHeader: false,
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
