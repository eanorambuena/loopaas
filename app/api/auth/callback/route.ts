import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: Request) {
  const session = await getSession()
  const supabase = createClient()

  if (!session?.user) {
    return NextResponse.json({ error: 'No user found' }, { status: 401 })
  }

  const { email } = session.user

  // Iniciar sesión en Supabase con el mismo email
  const { data, error } = await supabase.auth.signInWithOtp({ email })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.redirect('/')
}
