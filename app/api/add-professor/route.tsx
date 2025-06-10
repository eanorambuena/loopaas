import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = createClient()
  const { email, courseId } = await req.json()

  if (!email || !courseId) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
  }

  // buscar userInfo por email
  const { data: userInfo, error: userError } = await supabase
    .from('userInfo')
    .select('id')
    .eq('email', email.toLowerCase())
    .maybeSingle()

  if (userError || !userInfo) {
    return NextResponse.json({ error: 'No se encontró el usuario' }, { status: 404 })
  }

  // insertar en professors
  const { error: insertError } = await supabase
    .from('professors')
    .insert({
      teacherInfoId: userInfo.id,
      courseId
    })

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
