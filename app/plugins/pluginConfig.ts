import { Microkernel, Allow } from 'plugini'
import * as ostromPlugin from './ostromPlugin'
import { createClient } from '@/utils/supabase/client'

// Registrar permiso getCourses - datos reales de Supabase
Allow.registerPermission({
  name: 'getCourses',
  func: async () => {
    const supabase = createClient()
    try {
      const { data: courses, error } = await supabase
        .from('courses')
        .select(`
          id,
          name,
          abbreviature,
          semester,
          organizations (
            name
          )
        `)
        .eq('active', true)
      
      if (error) {
        console.error('Error fetching courses:', error)
        return []
      }
      
      return courses?.map(course => ({
        id: course.id,
        name: `${course.name} (${course.abbreviature}-${course.semester})`,
        organizacion: (course.organizations as any)?.name || 'Sin organización'
      })) || []
    } catch (error) {
      console.error('Error in getCourses permission:', error)
      return []
    }
  },
  description: 'Acceder a los cursos reales del usuario desde Supabase'
})

// Registrar permiso getStudents - datos reales de estudiantes de un curso
Allow.registerPermission({
  name: 'getStudents',
  func: async (courseId?: number) => {
    if (!courseId) return []
    
    const supabase = createClient()
    try {
      const { data: students, error } = await supabase
        .from('students')
        .select(`
          id,
          userInfo (
            firstName,
            lastName,
            email
          )
        `)
        .eq('courseId', courseId)
        .eq('active', true)
      
      if (error) {
        console.error('Error fetching students:', error)
        return []
      }
      
      return students?.map(student => ({
        id: student.id,
        name: `${(student.userInfo as any)?.firstName || ''} ${(student.userInfo as any)?.lastName || ''}`.trim(),
        email: (student.userInfo as any)?.email || '',
        grade: 0, // Se puede agregar si existe en la BD
        active: true
      })) || []
    } catch (error) {
      console.error('Error in getStudents permission:', error)
      return []
    }
  },
  description: 'Acceder a los estudiantes reales de un curso desde Supabase'
})

// Registrar permiso supabaseAccess - acceso real a Supabase
Allow.registerPermission({
  name: 'supabaseAccess',
  func: () => {
    const supabase = createClient()
    return {
      client: supabase,
      canReadStudents: true,
      canReadCourses: true,
      canWriteAttendance: true,
      // Función para guardar asistencia
      saveAttendance: async (courseId: number, studentId: number, present: boolean, date: string) => {
        try {
          const { data, error } = await supabase
            .from('attendance')
            .upsert({
              courseId,
              studentId,
              present,
              date,
              createdAt: new Date().toISOString()
            }, {
              onConflict: 'courseId,studentId,date'
            })
          
          if (error) {
            console.error('Error saving attendance:', error)
            return { success: false, error }
          }
          
          return { success: true, data }
        } catch (error) {
          console.error('Error in saveAttendance:', error)
          return { success: false, error }
        }
      }
    }
  },
  description: 'Acceso real a Supabase para operaciones de asistencia'
})

// Crear microkernel y registrar solo el plugin de asistencia
export const microkernel = new Microkernel()
microkernel.registerPlugins([ostromPlugin])
