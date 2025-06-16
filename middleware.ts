import { NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { auth0 } from '@/lib/auth0'

async function updateSessionMiddleware(request: NextRequest) {
  request.headers.set('x-current-path', request.nextUrl.pathname)
  return await updateSession(request)
}

async function auth0Middleware(request: NextRequest) {
  return await auth0.middleware(request)
}

// Función para encadenar middlewares
async function chainMiddlewares(request: NextRequest, middlewares: Function[]) {
  for (const middleware of middlewares) {
    const response = await middleware(request)
    if (response) return response // Si un middleware devuelve una respuesta, se detiene la ejecución
  }
  return NextResponse.next()
}

// Middleware principal que encadena ambos middlewares
export async function middleware(request: NextRequest) {
  return await chainMiddlewares(request, [updateSessionMiddleware, auth0Middleware])
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
