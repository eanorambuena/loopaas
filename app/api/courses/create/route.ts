import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
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

    // Obtener datos del curso del request
    const courseData = await request.json()
    const { organizationId, title, abbreviature, semester, color, img, canvasId } = courseData

    // Validar que la organización pertenece al usuario
    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .select('id, name, plan, ownerId')
      .eq('id', organizationId)
      .eq('ownerId', userInfo.id)
      .single()

    if (orgError || !organization) {
      return NextResponse.json({ error: 'Organización no encontrada o sin permisos' }, { status: 403 })
    }

    // VALIDAR LÍMITES DEL PLAN
    if (organization.plan === 'Free') {
      // Contar cursos actuales de la organización
      const { count: currentCourses, error: countError } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('organizationId', organizationId)

      if (countError) {
        console.error('Error counting courses:', countError)
        return NextResponse.json({ error: 'Error al verificar límites' }, { status: 500 })
      }

      // Plan Free permite máximo 3 cursos
      if ((currentCourses || 0) >= 3) {
        return NextResponse.json({ 
          error: 'Plan Free permite máximo 3 cursos',
          code: 'PLAN_LIMIT_EXCEEDED',
          limit: 3,
          current: currentCourses
        }, { status: 402 }) // 402 Payment Required
      }
    }

    // Crear el curso
    const newCourseData = {
      title: title.trim(),
      abbreviature: abbreviature.trim(),
      semester: semester.trim(),
      color: color || '#eeeeee',
      img: img?.trim() || 'https://bit.ly/2k1H1t6',
      organizationId,
      teacherInfoId: userInfo.id,
      ...(canvasId?.trim() && { canvasId: canvasId.trim() })
    }

    const { data: newCourse, error: createError } = await supabase
      .from('courses')
      .insert([newCourseData])
      .select()
      .single()

    if (createError) {
      console.error('Error creating course:', createError)
      if (createError.code === '23505') {
        return NextResponse.json({ 
          error: 'El curso ya existe. Si crees que esto es un error, por favor ponte en contacto con nosotros.',
          code: 'DUPLICATE_COURSE'
        }, { status: 409 })
      }
      return NextResponse.json({ 
        error: 'Error al crear el curso',
        code: createError.code
      }, { status: 500 })
    }

    // Agregar profesor al curso
    if (newCourse && newCourse.id) {
      await supabase.from('professors').insert({ 
        teacherInfoId: userInfo.id, 
        courseId: newCourse.id 
      })

      await supabase.from('students').insert({ 
        userInfoId: userInfo.id, 
        courseId: newCourse.id, 
        group: 1000 // Grupo por defecto para profesores
      })
    }

    return NextResponse.json({ 
      success: true, 
      course: newCourse,
      message: 'Curso creado exitosamente'
    })

  } catch (error) {
    console.error('Error in create course API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
