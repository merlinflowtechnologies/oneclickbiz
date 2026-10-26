import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface JWTPayload {
  userId?: string;
  email?: string;
  role?: string;
  organizationId?: string;
  exp?: number;
}

function parseJWTPayload(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload) as JWTPayload;
    
    // Check expiration if present
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const cleanHost = host.split(':')[0].toLowerCase();

  const isPrimaryDomain = 
    !cleanHost ||
    cleanHost === 'oneclickbiz.in' ||
    cleanHost === 'www.oneclickbiz.in' ||
    cleanHost === 'cname.oneclickbiz.in' ||
    cleanHost === 'localhost' ||
    cleanHost === '127.0.0.1' ||
    cleanHost.endsWith('.vercel.app');

  // =========================================================================
  // 1. DYNAMIC CUSTOM DOMAIN REWRITING
  // If request arrives from a connected custom domain (e.g. cards.theirbrand.com),
  // transparently rewrite to the /d/[domain] dynamic profile page.
  // =========================================================================
  if (!isPrimaryDomain) {
    // Pass API calls and static next internals through
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/d/')) {
      return NextResponse.next();
    }

    // Rewrite custom domain traffic to /d/[domain] (maintains user's custom URL in browser bar)
    const rewritePath = `/d/${cleanHost}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(new URL(rewritePath, request.url));
  }

  // =========================================================================
  // 2. PRIMARY DOMAIN AUTH & PORTAL PROTECTIONS
  // =========================================================================
  const tokenCookie = request.cookies.get('oneclickbiz_auth_token')?.value;
  const payload = tokenCookie ? parseJWTPayload(tokenCookie) : null;
  const isSuperAdmin = payload?.role === 'SUPER_ADMIN' || payload?.email === 'admin@oneclickbiz.in';

  // STRICT ADMIN ROUTE PROTECTION (/admin/...)
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      if (isSuperAdmin) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    if (!payload || !isSuperAdmin) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // STRICT DASHBOARD / BUSINESS PORTAL PROTECTION (/dashboard/...)
  if (pathname.startsWith('/dashboard')) {
    if (isSuperAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // BUSINESS LOGIN PAGE (/login)
  if (pathname === '/login') {
    if (isSuperAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - direct image files (png, jpg, svg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
