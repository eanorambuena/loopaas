import { NextResponse } from 'next/server'
import { getCurrentUser, getUserInfo } from '@/utils/queries'
import { db } from '@/drizzle/db'
import { courses } from '@/drizzle/schema'
import { desc, asc } from 'drizzle-orm'

export async function GET() {
  try {
    const user = await getCurrentUser()
    const userInfo = await getUserInfo(user.id)
    
    if (!userInfo?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const courseRows = await db.query.courses.findMany()

    const formattedCourses = courseRows?.map(c => ({
      id: c.id,
      name: `${c.title} (${c.abbreviature}-${c.semester})`,
      organizacion: 'Sin organización',
    })) || []

    return NextResponse.json({ courses: formattedCourses })
  } catch (error) {
    console.error('Error in courses API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
