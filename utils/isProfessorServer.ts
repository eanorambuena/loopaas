'use server'

import { createClient } from '@/utils/supabase/server'
import { Console } from '@/utils/console'

interface IsProfessorServerParams {
  userInfoId: string
  courseId?: string
}

export async function isProfessorServer({ userInfoId, courseId }: IsProfessorServerParams): Promise<boolean> {
  const supabase = createClient()

  try {
    let query = supabase
      .from('professors')
      .select()
      .eq('teacherInfoId', userInfoId)

    if (courseId) {
      query = query.eq('courseId', courseId)
    }

    const { data, error } = await query
    
    if (error) {
      Console.Error(`isProfessorServer: userInfoId=${userInfoId}, courseId=${courseId} - Error al consultar profesores:`, error)
      return false
    }
    if (!data) {
      Console.Info(`isProfessorServer: userInfoId=${userInfoId}, courseId=${courseId} - No es profesor`)
      return false
    }
    const isProfessor = data.length > 0
    Console.Info(`isProfessorServer: userInfoId=${userInfoId}, courseId=${courseId}, isProfessor=${isProfessor}`)
    return isProfessor
  }
  catch (error) {
    Console.Error(`isProfessorServer: userInfoId=${userInfoId}, courseId=${courseId} - Error inesperado: ${error}`)
    return false
  }
}
