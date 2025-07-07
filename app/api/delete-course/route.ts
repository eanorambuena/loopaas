import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const { courseId } = await req.json()
  if (!courseId) {
    return NextResponse.json({ error: 'Falta el id del curso' }, { status: 400 })
  }
  
  const supabase = createClient()
  
  // Verificar si hay datos relacionados
  const [studentsResult, evaluationsResult, professorsResult] = await Promise.all([
    supabase.from('students').select('id').eq('courseId', courseId),
    supabase.from('evaluations').select('id').eq('courseId', courseId),
    supabase.from('professors').select('id').eq('courseId', courseId)
  ])
  
  const hasStudents = studentsResult.data && studentsResult.data.length > 0
  const hasEvaluations = evaluationsResult.data && evaluationsResult.data.length > 0
  const hasProfessors = professorsResult.data && professorsResult.data.length > 0
  
  // Si hay evaluaciones, verificar si hay respuestas
  let hasResponses = false
  let responsesCount = 0
  if (hasEvaluations && evaluationsResult.data) {
    const evaluationIds = evaluationsResult.data.map(e => e.id)
    const responsesResult = await supabase
      .from('responses')
      .select('id')
      .in('evaluationId', evaluationIds)
    hasResponses = !!(responsesResult.data && responsesResult.data.length > 0)
    responsesCount = responsesResult.data ? responsesResult.data.length : 0
  }
  
  // Retornar información sobre los datos relacionados
  return NextResponse.json({ 
    ok: true,
    hasRelatedData: hasStudents || hasEvaluations || hasProfessors || hasResponses,
    dataSummary: {
      students: hasStudents ? studentsResult.data.length : 0,
      evaluations: hasEvaluations ? evaluationsResult.data.length : 0,
      professors: hasProfessors ? professorsResult.data.length : 0,
      responses: hasResponses ? responsesCount : 0
    }
  })
}

export async function DELETE(req: Request) {
  const { courseId } = await req.json()
  if (!courseId) {
    return NextResponse.json({ error: 'Falta el id del curso' }, { status: 400 })
  }
  
  const supabase = createClient()
  
  try {
    // 1. Obtener todas las evaluaciones del curso
    const { data: evaluations } = await supabase
      .from('evaluations')
      .select('id')
      .eq('courseId', courseId)
    
    const evaluationIds = evaluations?.map(e => e.id) || []
    
    // 2. Borrar respuestas de todas las evaluaciones del curso
    if (evaluationIds.length > 0) {
      const { error: responsesError } = await supabase
        .from('responses')
        .delete()
        .in('evaluationId', evaluationIds)
      
      if (responsesError) {
        console.error('Error deleting responses:', responsesError)
        return NextResponse.json({ error: 'Error al eliminar respuestas' }, { status: 500 })
      }
    }
    
    // 3. Borrar evaluaciones del curso
    const { error: evaluationsError } = await supabase
      .from('evaluations')
      .delete()
      .eq('courseId', courseId)
    
    if (evaluationsError) {
      console.error('Error deleting evaluations:', evaluationsError)
      return NextResponse.json({ error: 'Error al eliminar evaluaciones' }, { status: 500 })
    }
    
    // 4. Borrar profesores del curso
    const { error: professorsError } = await supabase
      .from('professors')
      .delete()
      .eq('courseId', courseId)
    
    if (professorsError) {
      console.error('Error deleting professors:', professorsError)
      return NextResponse.json({ error: 'Error al eliminar profesores' }, { status: 500 })
    }
    
    // 5. Borrar estudiantes del curso
    const { error: studentsError } = await supabase
      .from('students')
      .delete()
      .eq('courseId', courseId)
    
    if (studentsError) {
      console.error('Error deleting students:', studentsError)
      return NextResponse.json({ error: 'Error al eliminar estudiantes' }, { status: 500 })
    }
    
    // 6. Finalmente, borrar el curso
    const { error: courseError } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId)
    
    if (courseError) {
      console.error('Error deleting course:', courseError)
      return NextResponse.json({ error: courseError.message }, { status: 500 })
    }
    
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error in delete course process:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
} 