import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || null
  const { pathname } = req.nextUrl

  // Redirect logged-in users away from login and register pages
  if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && token) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  // Redirect non-logged-in users trying to access protected pages
  if (!(pathname.startsWith('/login') || pathname.startsWith('/register')) && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Allow access to other pages if user is logged in
  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/register', '/home', '/pemohon-bantuan']
}
