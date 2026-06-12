import { NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { professors, students, userInfo } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const { email, courseId, teacherInfoId, group } = await req.json()

  if (!courseId) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
  }

  let teacherId = teacherInfoId

  if (!teacherId) {
    if (!email) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }
    const ui = await db.query.userInfo.findFirst({
      where: eq(userInfo.email, email.toLowerCase()),
    })
    if (!ui) {
      return NextResponse.json({ error: 'No se encontró el usuario' }, { status: 404 })
    }
    teacherId = ui.id
  }

  await db.insert(professors).values({
    teacherInfoId: teacherId,
    courseId,
  })

  if (group !== undefined) {
    await db.insert(students).values({
      userInfoId: teacherId,
      courseId,
      group: String(group),
    })
  }

  return NextResponse.json({ ok: true })
}
