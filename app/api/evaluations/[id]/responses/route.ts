import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const supabase = createClient()
    
    // Obtener respuestas de la evaluación
    const { data: responses, error: responsesError } = await supabase
      .from('responses')
      .select(`
        id,
        userInfoId,
        created_at,
        userInfo:userInfoId (
          id,
          firstName,
          lastName,
          email
        )
      `)
      .eq('evaluationId', params.id)

    if (responsesError) {
      console.error('Error fetching responses:', responsesError)
      return NextResponse.json(
        { error: 'Error al obtener las respuestas' },
        { status: 500 }
      )
    }

    // Obtener información de grupos para todos los userInfoIds
    const userInfoIds = responses?.map(response => response.userInfoId) || []
    const { data: studentsData, error: studentsError } = await supabase
      .from('students')
      .select('userInfoId, group')
      .in('userInfoId', userInfoIds)

    if (studentsError) {
      console.error('Error fetching students data:', studentsError)
    }

    // Crear un mapa de userInfoId a group
    const groupMap = new Map<string, string>()
    studentsData?.forEach(student => {
      groupMap.set(student.userInfoId, student.group)
    })

    // Combinar respuestas con información de grupos
    const responsesWithGroups = responses?.map(response => ({
      ...response,
      group: groupMap.get(response.userInfoId) || 'Sin grupo'
    })) || []

    return NextResponse.json({ responses: responsesWithGroups })
  } catch (error) {
    console.error('Error in responses API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 