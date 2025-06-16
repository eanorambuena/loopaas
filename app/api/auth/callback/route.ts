import { NextRequest, NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createClient()
  const session = await auth0.getSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'No user found' }, { status: 401 })
  }

  const { email } = session.user

  if (!email) {
    return NextResponse.json({ error: 'No email found in user session' }, { status: 400 })
  }

  console.log(email)
  // Iniciar sesión en Supabase con el mismo email
  const { data, error } = await supabase.auth.signInWithOtp({ email })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.redirect('/')
}
