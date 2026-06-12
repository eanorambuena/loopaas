'use server'

import { db } from '@/drizzle/db'
import { professors } from '@/drizzle/schema'
import { eq, and } from 'drizzle-orm'
import { Console } from '@/utils/console'

interface IsProfessorServerParams {
  userInfoId: string
  courseId?: string
}

export async function isProfessorServer({ userInfoId, courseId }: IsProfessorServerParams): Promise<boolean> {
  try {
    const conditions = [eq(professors.teacherInfoId, userInfoId)]
    if (courseId) {
      conditions.push(eq(professors.courseId, courseId))
    }

    const data = await db.query.professors.findMany({
      where: and(...conditions),
    })
    
    const isProfessor = data.length > 0
    Console.Info(`isProfessorServer: userInfoId=${userInfoId}, courseId=${courseId}, isProfessor=${isProfessor}`)
    return isProfessor
  }
  catch (error) {
    Console.Error(`isProfessorServer: userInfoId=${userInfoId}, courseId=${courseId} - Error inesperado: ${error}`)
    return false
  }
}
