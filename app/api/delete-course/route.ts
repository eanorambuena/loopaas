import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const { courseId } = await req.json()
  if (!courseId) {
    return NextResponse.json({ error: 'Falta el id del curso' }, { status: 400 })
  }
  const supabase = createClient()
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', courseId)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
} 