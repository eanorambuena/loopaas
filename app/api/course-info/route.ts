import { NextResponse } from 'next/server'
import { getCurrentUser, getUserInfo } from '@/utils/queries'
import { createClient } from '@/utils/supabase/server'
import { isProfessorServer } from '@/utils/isProfessorServer'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const abbreviature = searchParams.get('abbreviature')
  const semester = searchParams.get('semester')
  if (!abbreviature || !semester) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 })
  }
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id)
  const supabase = createClient()
  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('abbreviature', abbreviature)
    .eq('semester', semester)
    .single()
  if (error || !course) {
    return NextResponse.json({ error: 'No se encontró el curso' }, { status: 404 })
  }
  if (!userInfo || !userInfo.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const isProfessor = await isProfessorServer({ userInfoId: String(userInfo.id), courseId: String(course.id) })
  return NextResponse.json({ course, isProfessor })
} 