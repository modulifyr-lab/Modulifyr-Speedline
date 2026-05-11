import { NextRequest, NextResponse } from 'next/server'

// This middleware runs on the edge — it can't use Firebase Admin SDK.
// We use a lightweight cookie check: Firebase Auth sets a cookie named
// 'firebase-auth-token' which we write client-side after sign-in (see AuthContext).
// For a more secure setup, use Firebase session cookies with the Admin SDK.

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only guard the library route
  if (pathname.startsWith('/library')) {
    const token = req.cookies.get('speedline-auth')?.value
    if (!token) {
      const loginUrl = new URL('/auth', req.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/library/:path*'],
}
