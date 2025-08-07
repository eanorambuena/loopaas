import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId')
    
    if (!organizationId) {
      return NextResponse.json({ error: 'organizationId requerido' }, { status: 400 })
    }

    const supabase = createClient()
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Obtener información de la organización
    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .select('plan')
      .eq('id', organizationId)
      .single()

    if (orgError || !organization) {
      return NextResponse.json({ error: 'Organización no encontrada' }, { status: 404 })
    }

    // Contar cursos de la organización
    const { count: coursesCount, error: coursesError } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true })
      .eq('organizationId', organizationId)

    if (coursesError) {
      console.error('Error counting courses:', coursesError)
      return NextResponse.json({ error: 'Error al contar cursos' }, { status: 500 })
    }

    // Obtener estadísticas adicionales si es necesario
    const { data: courseStats, error: statsError } = await supabase
      .from('courses')
      .select(`
        id,
        students!inner(id),
        title
      `)
      .eq('organizationId', organizationId)

    let totalStudents = 0
    let totalGroups = 0
    
    if (courseStats && !statsError) {
      // Contar estudiantes por curso (esto es aproximado, podrías necesitar una consulta más específica)
      totalStudents = courseStats.reduce((acc, course) => acc + (course.students?.length || 0), 0)
      
      // Para grupos, necesitarías hacer consultas adicionales o tener una tabla de grupos
      // Por ahora, usamos un estimado basado en estudiantes
      totalGroups = Math.ceil(totalStudents / 4) // Asumiendo 4 estudiantes por grupo promedio
    }

    return NextResponse.json({
      planType: organization.plan,
      coursesUsed: coursesCount || 0,
      studentsUsed: totalStudents,
      groupsUsed: totalGroups,
      organizationId
    })

  } catch (error) {
    console.error('Error in plan-usage API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
