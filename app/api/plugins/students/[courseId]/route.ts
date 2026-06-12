import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, getUserInfo } from '@/utils/queries'
import { db } from '@/drizzle/db'
import { students, userInfo } from '@/drizzle/schema'
import { eq, asc } from 'drizzle-orm'

export async function GET(request: NextRequest, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params
  try {
    const user = await getCurrentUser()
    const userInfoVal = await getUserInfo(user.id)
    
    if (!userInfoVal?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const studentRows = await db.query.students.findMany({
      where: eq(students.courseId, params.courseId),
      orderBy: [asc(students.group)],
    })

    const formattedStudents = await Promise.all(studentRows.map(async (s) => {
      const ui = await db.query.userInfo.findFirst({
        where: eq(userInfo.id, s.userInfoId),
      })
      return {
        id: s.id,
        name: `${ui?.firstName || ''} ${ui?.lastName || ''}`.trim(),
        email: ui?.email || '',
        grade: 0,
        active: true,
      }
    }))

    return NextResponse.json({ students: formattedStudents || [] })
  } catch (error) {
    console.error('Error in students API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
