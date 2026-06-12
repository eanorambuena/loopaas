import { NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { students } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { Console } from '@/utils/console'

export async function POST(req: Request) {
  const body = await req.json()
  const { studentId, userInfoId } = body

  if (!studentId || !userInfoId) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
  }

  await db.delete(students).where(eq(students.id, studentId))

  Console.Info(`Estudiante eliminado: ${studentId}`)
  return NextResponse.json({ ok: true })
}
