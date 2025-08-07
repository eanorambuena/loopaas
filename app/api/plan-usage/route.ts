import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Obtener información del usuario
    const { data: userInfo, error: userInfoError } = await supabase
      .from('userInfo')
      .select('id')
      .eq('userId', user.id)
      .single()
    
    if (userInfoError || !userInfo) {
      return NextResponse.json({ error: 'Información de usuario no encontrada' }, { status: 404 })
    }

    // Obtener organizaciones del usuario
    const { data: organizations, error: orgsError } = await supabase
      .from('organizations')
      .select('id, name, plan')
      .eq('ownerId', userInfo.id)

    if (orgsError) {
      console.error('Error fetching organizations:', orgsError)
      return NextResponse.json({ error: 'Error al obtener organizaciones' }, { status: 500 })
    }

    // Para cada organización, obtener el uso actual
    const usageData = await Promise.all(
      (organizations || []).map(async (org) => {
        try {
          // Contar cursos
          const { count: coursesCount } = await supabase
            .from('courses')
            .select('*', { count: 'exact', head: true })
            .eq('organizationId', org.id)

          // Contar estudiantes únicos en todos los cursos de la organización
          const { data: courses } = await supabase
            .from('courses')
            .select('id')
            .eq('organizationId', org.id)

          let studentsCount = 0
          if (courses && courses.length > 0) {
            const courseIds = courses.map(c => c.id)
            const { count } = await supabase
              .from('students')
              .select('userInfoId', { count: 'exact', head: true })
              .in('courseId', courseIds)
            studentsCount = count || 0
          }

          // Contar evaluaciones del mes actual
          const startOfMonth = new Date()
          startOfMonth.setDate(1)
          startOfMonth.setHours(0, 0, 0, 0)
          
          const { count: evaluationsCount } = await supabase
            .from('evaluations')
            .select('*', { count: 'exact', head: true })
            .in('courseId', courses?.map(c => c.id) || [])
            .gte('created_at', startOfMonth.toISOString())

          return {
            organizationId: org.id,
            organizationName: org.name,
            plan: org.plan,
            currentUsage: {
              courses: coursesCount || 0,
              students: studentsCount,
              evaluationsThisMonth: evaluationsCount || 0,
            }
          }
        } catch (error) {
          console.error(`Error getting usage for org ${org.id}:`, error)
          return {
            organizationId: org.id,
            organizationName: org.name,
            plan: org.plan,
            currentUsage: {
              courses: 0,
              students: 0,
              evaluationsThisMonth: 0,
            }
          }
        }
      })
    )

    return NextResponse.json({ organizations: usageData })
  } catch (error) {
    console.error('Error in plan usage API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
