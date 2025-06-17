import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = createClient()
  const { email } = await req.json()
  const password = process.env.NEXT_PASSWORD

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const { error, data: { user } } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return NextResponse.json({ error: error.message ?? error }, { status: 500 })
  }

  return NextResponse.json({ user })
}
