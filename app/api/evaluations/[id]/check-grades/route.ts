import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const supabase = createClient()
    
    // Verificar si hay notas para esta evaluación
    const { data: grades, error } = await supabase
      .from('grades')
      .select('id')
      .eq('evaluationId', params.id)
      .limit(1)

    if (error) {
      console.error('Error checking grades:', error)
      return NextResponse.json(
        { error: 'Error al verificar las notas' },
        { status: 500 }
      )
    }

    const hasGrades = grades && grades.length > 0

    return NextResponse.json({ 
      hasGrades,
      count: grades?.length || 0
    })
  } catch (error) {
    console.error('Error in check-grades API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 