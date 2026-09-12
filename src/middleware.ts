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
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get('oneclickbiz_auth_token')?.value;
  const payload = tokenCookie ? parseJWTPayload(tokenCookie) : null;
  const isSuperAdmin = payload?.role === 'SUPER_ADMIN' || payload?.email === 'admin@oneclickbiz.in';

  // 1. STRICT ADMIN ROUTE PROTECTION (/admin/...)
  if (pathname.startsWith('/admin')) {
    // Allow access to the login page
    if (pathname === '/admin/login') {
      if (isSuperAdmin) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Block non-admins from all other /admin routes
    if (!payload || !isSuperAdmin) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // 2. STRICT DASHBOARD / BUSINESS PORTAL PROTECTION (/dashboard/...)
  if (pathname.startsWith('/dashboard')) {
    // If a Super Admin tries to visit the business dashboard, redirect them to admin console
    if (isSuperAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
  }

  // 3. BUSINESS LOGIN PAGE (/login)
  if (pathname === '/login') {
    // If already logged in as Super Admin, redirect to /admin
    if (isSuperAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/login',
  ],
};
