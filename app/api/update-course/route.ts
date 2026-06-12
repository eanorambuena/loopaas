import { NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { courses } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const body = await req.json()
  const { id, title, abbreviature, semester, img } = body
  if (!id) {
    return NextResponse.json({ error: 'Falta el id del curso' }, { status: 400 })
  }
  await db.update(courses)
    .set({ title, abbreviature, semester, img })
    .where(eq(courses.id, id))
  return NextResponse.json({ ok: true })
}

export async function PUT(req: Request) {
  const body = await req.json()
  const { title, abbreviature, semester, img, teacherInfoId } = body
  if (!title || !abbreviature || !semester || !teacherInfoId) {
    return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 })
  }
  const [course] = await db.insert(courses).values({
    title,
    abbreviature,
    semester,
    teacherInfoId,
    img,
  }).returning()
  return NextResponse.json(course)
} 