import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
    }

    // Si hay un usuario y es un nuevo registro, crear su userInfo
    if (data.user && data.user.email) {
      try {
        // Extraer información del usuario
        const firstName = data.user.user_metadata?.first_name || ''
        const lastName = data.user.user_metadata?.last_name || ''
        
        // Crear userInfo automáticamente
        await fetch(`${origin}/api/create-user-info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: data.user.id,
            email: data.user.email,
            firstName,
            lastName,
          }),
        })
      } catch (error) {
        console.error('Error creating user info:', error)
        // No redirigir con error, el userInfo se puede crear después
      }
    }
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/cursos`)
}
