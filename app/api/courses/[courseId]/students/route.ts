import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { students, userInfo } from '@/drizzle/schema'
import { eq, asc } from 'drizzle-orm'

export async function GET(request: NextRequest, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params
  try {
    const studentRows = await db.query.students.findMany({
      where: eq(students.courseId, params.courseId),
      orderBy: [asc(students.group)],
    })

    const studentsWithInfo = await Promise.all(
      studentRows.map(async (s) => {
        const ui = await db.query.userInfo.findFirst({
          where: eq(userInfo.id, s.userInfoId),
        })
        return {
          userInfoId: s.userInfoId,
          group: s.group,
          userInfo: ui ? {
            id: ui.id,
            firstName: ui.firstName,
            lastName: ui.lastName,
            email: ui.email,
          } : null,
        }
      })
    )

    return NextResponse.json({ students: studentsWithInfo || [] })
  } catch (error) {
    console.error('Error in students API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 