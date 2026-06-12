import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/auth).*)',
  ],
}
