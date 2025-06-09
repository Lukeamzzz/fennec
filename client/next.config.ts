import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  style-src 'self';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
  form-action 'self';
  img-src 'self';
  font-src 'self';
  connect-src 'self';
  worker-src 'none';
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy,
    },
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
    },
    {
        key: "Permissions-Policy",
        value: "geolocation=(), camera=(), microphone=(), interest-cohort=()",
    },
    {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
    },
    {
        key: "Cross-Origin-Embedder-Policy",
        value: "require-corp",
    },
    {
        key: "Cross-Origin-Resource-Policy",
        value: "same-origin",
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
