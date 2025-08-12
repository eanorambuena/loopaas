import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params
  try {
    const supabase = createClient()
    
    const { data: students, error } = await supabase
      .from('students')
      .select(`
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

    return NextResponse.json({ students: students || [] })
  } catch (error) {
    console.error('Error in students API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 