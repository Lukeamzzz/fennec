const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: `
      default-src 'self';
      script-src 'self' 'sha256-LcsuUMiDkprrt6ZKeiLP4iYNhWo8NqaSbAgtoZxVK3s=' https://api.mapbox.com https://events.mapbox.com;
      style-src 'self' https://api.mapbox.com https://fonts.googleapis.com;
      object-src 'none';
      base-uri 'self';
      frame-ancestors 'none';
      form-action 'self';
      img-src 'self' data: blob: https://api.mapbox.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://fennec-back-447938427814.northamerica-south1.run.app:8080 https://identitytoolkit.googleapis.com https://api.mapbox.com https://events.mapbox.com https://fennec-prediccion.onrender.com https://securetoken.googleapis.com;
      worker-src 'self' blob:;
    `.replace(/\s{2,}/g, ' ').trim(),
    },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
];


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};
