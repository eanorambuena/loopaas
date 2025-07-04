import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { id, title, abbreviature, semester, color, img } = body
  if (!id) {
    return NextResponse.json({ error: 'Falta el id del curso' }, { status: 400 })
  }
  const supabase = createClient()
  const { error } = await supabase
    .from('courses')
    .update({ title, abbreviature, semester, color, img })
    .eq('id', id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
} 