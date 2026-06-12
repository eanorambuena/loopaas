import { NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { professors } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const { userInfoId, courseId } = await req.json()

  if (!userInfoId || !courseId) {
    return NextResponse.json({ error: 'Missing userInfoId or courseId' }, { status: 400 })
  }

  const data = await db.query.professors.findFirst({
    where: and(eq(professors.teacherInfoId, userInfoId), eq(professors.courseId, courseId)),
  })

  const isProfessor = !!data
  return NextResponse.json({ isProfessor })
}
