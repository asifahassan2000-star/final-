import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip prefetch requests
  if (
    request.headers.get('next-router-prefetch') ||
    request.headers.get('purpose') === 'prefetch'
  ) {
    return NextResponse.next();
  }

  // Generate a cryptographically secure, unpredictable per-request nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Least-permissive Content Security Policy with strict per-request nonce
  // 'strict-dynamic' allows scripts loaded by trusted nonce scripts to execute
  // 'unsafe-inline' is included only as backward-compatibility fallback for older browsers (ignored by modern browsers when nonce is present)
  const cspHeader = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:`,
    `style-src 'self' 'unsafe-inline' https:`,
    `img-src 'self' data: https: blob:`,
    `font-src 'self' data: https:`,
    `connect-src 'self' https: wss:`,
    `frame-src 'self' https: https://*.google.com https://*.openstreetmap.org`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ].join('; ');

  // Clone request headers to propagate x-nonce and CSP to Next.js App Router
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set the CSP header on the response sent to the browser
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, assets (public static assets)
     */
    '/((?!_next/static|_next/image|assets/|images/|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|webp|avif|svg|ico|pdf|txt|xml)$).*)',
  ],
};
