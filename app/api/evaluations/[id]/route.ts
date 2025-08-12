import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const supabase = createClient()
    
    const { data: evaluation, error } = await supabase
      .from('evaluations')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching evaluation:', error)
      return NextResponse.json(
        { error: 'Error al obtener la evaluación' },
        { status: 500 }
      )
    }

    if (!evaluation) {
      return NextResponse.json(
        { error: 'Evaluación no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(evaluation)
  } catch (error) {
    console.error('Error in evaluation API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 