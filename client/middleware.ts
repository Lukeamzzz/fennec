import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' 'nonce-${nonce}' blob: https://api.mapbox.com https://events.mapbox.com;
    style-src 'self' 'unsafe-inline' 'nonce-${nonce}' https://api.mapbox.com https://fonts.googleapis.com;
    img-src 'self' data: blob: https://api.mapbox.com;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self' https://fennec-back-447938427814.northamerica-south1.run.app:8080 https://identitytoolkit.googleapis.com https://api.mapbox.com https://events.mapbox.com https://fennec-prediccion.onrender.com https://securetoken.googleapis.com;
    worker-src 'self' blob:;
  `;

    const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce); // Para usar en layout o scripts si se necesita

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);
    response.headers.set("x-nonce", nonce);

    return response;
}
export const config = {
    matcher: [
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};
