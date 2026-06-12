import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, getUserInfo } from '@/utils/queries'
import { db } from '@/drizzle/db'
import { attendance, courses, students } from '@/drizzle/schema'
import { and, eq, sql } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    const userInfo = await getUserInfo(user.id)
    
    if (!userInfo?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { courseId, studentId, present, date } = body

    if (!courseId || !studentId || present === undefined || !date) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      )
    }
    
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Curso no encontrado' },
        { status: 404 }
      )
    }

    const student = await db.query.students.findFirst({
      where: and(eq(students.id, studentId), eq(students.courseId, courseId)),
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Estudiante no encontrado en el curso' },
        { status: 404 }
      )
    }

    // Insert attendance record
    const [row] = await db.insert(attendance).values({
      courseId,
      studentId,
      date: new Date(date),
      status: present ? 'present' : 'absent',
    }).returning()

    return NextResponse.json({ 
      success: true, 
      message: 'Asistencia guardada correctamente',
      data: row
    })
  } catch (error) {
    console.error('Error in attendance API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
