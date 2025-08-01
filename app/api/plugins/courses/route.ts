import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { getCurrentUser, getUserInfo } from '@/utils/queries'

export async function GET() {
  try {
    // Verificar autenticación
    const user = await getCurrentUser()
    const userInfo = await getUserInfo(user.id)
    
    if (!userInfo?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = createClient()
    
    // Obtener cursos - sin filtro active porque la columna no existe
    const { data: courses, error } = await supabase
      .from('courses')
      .select(`
        id,
        title,
        abbreviature,
        semester,
        organizationId,
        organizations (
          name
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching courses:', error)
      return NextResponse.json({ error: 'Error al obtener cursos' }, { status: 500 })
    }

    // Transformar datos al formato esperado por el plugin
    const formattedCourses = courses?.map(course => ({
      id: course.id,
      name: `${course.title} (${course.abbreviature}-${course.semester})`,
      organizacion: (course.organizations as any)?.name || 'Sin organización'
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
