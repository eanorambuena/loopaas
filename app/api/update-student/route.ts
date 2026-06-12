import { NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { userInfo, students } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { Console } from '@/utils/console'

export async function POST(req: Request) {
  const body = await req.json()
  const { userInfoId, firstName, lastName, group } = body
  
  try {
    await db.update(userInfo)
      .set({ firstName, lastName })
      .where(eq(userInfo.id, userInfoId))

    await db.update(students)
      .set({ group })
      .where(eq(students.userInfoId, userInfoId))

    const studentData = await db.query.students.findMany({
      where: eq(students.userInfoId, userInfoId),
    })

    if (studentData.length === 0) {
      Console.Error(`No se encontró el estudiante con userInfoId: ${userInfoId}`)
      return NextResponse.json({ ok: false, error: 'Estudiante no encontrado' }, { status: 404 })
    }
    if (Number(studentData[0].group) !== Number(group)) {
      Console.Error(`El grupo del estudiante no se actualizó correctamente: ${studentData[0].group} != ${group}`)
      return NextResponse.json({ ok: false, error: 'El grupo del estudiante no se actualizó correctamente' }, { status: 500 })
    }
  } catch (error) {
    Console.Error(`Error al procesar la solicitud: ${error}`)
    return NextResponse.json({ ok: false, error: 'Error al procesar la solicitud' }, { status: 500 })
  }

  Console.Info(`Estudiante actualizado: ${userInfoId} - ${firstName} ${lastName}, Grupo: ${group}`)

  return NextResponse.json({ ok: true })
}
