import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = createClient()
  const { userInfoId, courseId } = await req.json()

  if (!userInfoId || !courseId) {
    return NextResponse.json({ error: 'Missing userInfoId or courseId' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('professors')
    .select('id')
    .eq('teacherInfoId', userInfoId)
    .eq('courseId', courseId)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const isProfessor = !!data
  return NextResponse.json({ isProfessor })
}
