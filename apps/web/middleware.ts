import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = new Set(['account', 'orders', 'checkout']);

export const config = {
  matcher: ['/(en|fr|ar)/(account|orders|checkout)/:path*']
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments.at(0) ?? 'en';
  const section = segments.at(1) ?? '';

  if (!protectedRoutes.has(section)) {
    return NextResponse.next();
  }

  const hasSession = req.cookies.has('sb-darlemlih-auth');

  if (!hasSession) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set('redirectTo', `${req.nextUrl.pathname}${req.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
