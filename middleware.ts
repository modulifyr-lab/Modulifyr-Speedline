// Route protection is handled client-side in app/library/page.tsx via useAuth().
// Firebase Auth restores from IndexedDB asynchronously on the client — any
// server-side cookie check runs before that restoration completes, causing
// authenticated users to get redirected to /auth on every page load.
//
// The library page already does:
//   if (!loading && !user) router.replace('/auth?next=/library')
//
// That is sufficient. This middleware file is kept as a placeholder for
// future server-side needs (e.g. redirecting logged-in users away from /auth).

import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // If already signed in (cookie present) and trying to access /auth,
  // redirect to library instead of showing the login page again.
  const hasAuth = req.cookies.get('speedline-auth')?.value
  if (pathname.startsWith('/auth') && hasAuth) {
    return NextResponse.redirect(new URL('/library', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*'],
}