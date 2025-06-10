'use server'

import { createClient } from '@/utils/supabase/server'

interface IsProfessorServerParams {
  userInfoId: string
  courseId?: string
}

export async function isProfessorServer({ userInfoId, courseId }: IsProfessorServerParams): Promise<boolean> {
  const supabase = createClient()

  let query = supabase
    .from('professors')
    .select('id')
    .eq('teacherInfoId', userInfoId)

  if (courseId) {
    query = query.eq('courseId', courseId)
  }

  const { data, error } = await query.maybeSingle()

  if (error) {
    console.error('❌ Error al verificar profesor:', error)
    return false
  }

  return !!data
}
