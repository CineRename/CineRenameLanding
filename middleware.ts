import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Canonical host: redirect www.<domain> to the apex domain (single indexable hostname)
  const host = (req.headers.get('host') ?? req.nextUrl.hostname).split(':')[0];
  if (host.startsWith('www.') && !host.includes('localhost')) {
    const apexUrl = req.nextUrl.clone();
    apexUrl.hostname = host.slice(4);
    apexUrl.protocol = 'https:';
    apexUrl.port = '';
    return NextResponse.redirect(apexUrl, 301);
  }

  // Force HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    req.headers.get('x-forwarded-proto') !== 'https' &&
    !req.nextUrl.hostname.includes('localhost')
  ) {
    const httpsUrl = req.nextUrl.clone();
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl, 301);
  }

  return intlMiddleware(req);
}
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/', '/(fr|es|zh|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};