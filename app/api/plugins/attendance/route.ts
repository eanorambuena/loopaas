import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { getCurrentUser, getUserInfo } from '@/utils/queries'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
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

    const supabase = createClient()
    
    // Verificar que el curso existe
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('id')
      .eq('id', courseId)
      .single()

    if (courseError || !course) {
      return NextResponse.json(
        { error: 'Curso no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que el estudiante existe en el curso
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('id', studentId)
      .eq('courseId', courseId)
      .single()

    if (studentError || !student) {
      return NextResponse.json(
        { error: 'Estudiante no encontrado en el curso' },
        { status: 404 }
      )
    }

    // Guardar asistencia (usar upsert para evitar duplicados)
    const { data, error } = await supabase
      .from('attendance')
      .upsert({
        courseId: parseInt(courseId),
        studentId: parseInt(studentId),
        present,
        date,
        createdAt: new Date().toISOString()
      }, {
        onConflict: 'courseId,studentId,date'
      })
      .select()

    if (error) {
      console.error('Error saving attendance:', error)
      return NextResponse.json(
        { error: 'Error al guardar asistencia' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Asistencia guardada correctamente',
      data
    })
  } catch (error) {
    console.error('Error in attendance API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
