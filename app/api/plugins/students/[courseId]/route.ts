import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { getCurrentUser, getUserInfo } from '@/utils/queries'

export async function GET(request: NextRequest, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params
  try {
    // Verificar autenticación
    const user = await getCurrentUser()
    const userInfo = await getUserInfo(user.id)
    
    if (!userInfo?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = createClient()
    
    const { data: students, error } = await supabase
      .from('students')
      .select(`
        id,
        userInfoId,
        group,
        userInfo:userInfoId (
          id,
          firstName,
          lastName,
          email
        )
      `)
      .eq('courseId', params.courseId)
      .order('group', { ascending: true })

    if (error) {
      console.error('Error fetching students:', error)
      return NextResponse.json(
        { error: 'Error al obtener los estudiantes' },
        { status: 500 }
      )
    }

    // Transformar datos al formato esperado por el plugin
    const formattedStudents = students?.map(student => ({
      id: student.id,
      name: `${(student.userInfo as any)?.firstName || ''} ${(student.userInfo as any)?.lastName || ''}`.trim(),
      email: (student.userInfo as any)?.email || '',
      grade: 0, // Se puede agregar si existe en la BD
      active: true
    })) || []

    return NextResponse.json({ students: formattedStudents })
  } catch (error) {
    console.error('Error in students API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
