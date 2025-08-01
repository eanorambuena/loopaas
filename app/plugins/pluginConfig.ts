import { Microkernel, Allow } from 'plugini'
import * as ostromPlugin from './ostromPlugin'
import { createClient } from '@/utils/supabase/client'

// Registrar permiso getCourses - datos reales de Supabase
Allow.registerPermission({
  name: 'getCourses',
  func: async () => {
    console.log('🔄 getCourses: Iniciando...')
    
    // SIEMPRE devolver datos de prueba para debug
    const testCourses = [
      {
        id: 1,
        name: 'Desarrollo de Software (IDS123-2024-1)',
        organizacion: 'Universidad de Prueba'
      },
      {
        id: 2,
        name: 'Base de Datos (BD456-2024-1)',
        organizacion: 'Universidad de Prueba'
      },
      {
        id: 3,
        name: 'Redes de Computadores (RC789-2024-1)',
        organizacion: 'Universidad de Prueba'
      }
    ]
    
    console.log('✅ getCourses: Devolviendo cursos de prueba:', testCourses)
    return testCourses
    
    /* 
    // Código real (comentado para debug)
    try {
      const response = await fetch('/api/plugins/courses', {
        credentials: 'include' // Incluir cookies de sesión
      })
      
      if (!response.ok) {
        console.error('Error fetching courses from API:', response.status, response.statusText)
        
        // Si es error de autenticación, devolver array vacío en lugar de fallar
        if (response.status === 401) {
          console.warn('Usuario no autenticado, devolviendo lista vacía de cursos')
          return []
        }
        
        return []
      }
      
      const data = await response.json()
      console.log('✅ Cursos obtenidos exitosamente:', data.courses?.length || 0)
      return data.courses || []
    } catch (error) {
      console.error('Error in getCourses permission:', error)
      return []
    }
    */
  },
  description: 'Acceder a los cursos reales del usuario desde Supabase'
})

// Registrar permiso getStudents - datos reales de estudiantes de un curso
Allow.registerPermission({
  name: 'getStudents',
  func: async (courseId?: number) => {
    console.log('🔄 getStudents: Iniciando para courseId:', courseId)
    
    if (!courseId) {
      console.warn('getStudents llamado sin courseId')
      return []
    }
    
    // SIEMPRE devolver datos de prueba para debug
    const testStudents = [
      {
        id: 101,
        name: 'Ana García López',
        email: 'ana.garcia@universidad.edu',
        grade: 8.5,
        active: true
      },
      {
        id: 102,
        name: 'Carlos Rodríguez Pérez',
        email: 'carlos.rodriguez@universidad.edu',
        grade: 7.8,
        active: true
      },
      {
        id: 103,
        name: 'María González Silva',
        email: 'maria.gonzalez@universidad.edu',
        grade: 9.2,
        active: true
      },
      {
        id: 104,
        name: 'Juan Martínez Torres',
        email: 'juan.martinez@universidad.edu',
        grade: 6.9,
        active: true
      }
    ]
    
    console.log(`✅ getStudents: Devolviendo ${testStudents.length} estudiantes de prueba para curso ${courseId}`)
    return testStudents
    
    /* 
    // Código real (comentado para debug)
    try {
      const response = await fetch(`/api/plugins/students/${courseId}`, {
        credentials: 'include' // Incluir cookies de sesión
      })
      
      if (!response.ok) {
        console.error('Error fetching students from API:', response.status, response.statusText)
        
        // Si es error de autenticación, devolver array vacío
        if (response.status === 401) {
          console.warn('Usuario no autenticado, devolviendo lista vacía de estudiantes')
          return []
        }
        
        return []
      }
      
      const data = await response.json()
      console.log(`✅ Estudiantes obtenidos exitosamente para curso ${courseId}:`, data.students?.length || 0)
      return data.students || []
    } catch (error) {
      console.error('Error in getStudents permission:', error)
      return []
    }
    */
  },
  description: 'Acceder a los estudiantes reales de un curso desde Supabase'
})

// Registrar permiso supabaseAccess - usando localStorage por ahora
Allow.registerPermission({
  name: 'supabaseAccess',
  func: () => {
    return {
      canReadStudents: true,
      canReadCourses: true,
      canWriteAttendance: true,
      // Función para guardar asistencia en localStorage
      saveAttendance: async (courseId: number, studentId: number, present: boolean, date: string) => {
        try {
          // Obtener asistencias existentes del localStorage
          const existingAttendance = JSON.parse(localStorage.getItem('attendance_records') || '[]')
          
          // Crear clave única para este registro
          const recordKey = `${courseId}_${studentId}_${date}`
          
          // Buscar si ya existe un registro para este estudiante/curso/fecha
          const existingIndex = existingAttendance.findIndex(
            (record: any) => record.key === recordKey
          )
          
          const newRecord = {
            key: recordKey,
            courseId,
            studentId,
            present,
            date,
            createdAt: new Date().toISOString()
          }
          
          if (existingIndex !== -1) {
            // Actualizar registro existente
            existingAttendance[existingIndex] = newRecord
          } else {
            // Agregar nuevo registro
            existingAttendance.push(newRecord)
          }
          
          // Guardar en localStorage
          localStorage.setItem('attendance_records', JSON.stringify(existingAttendance))
          
          console.log('📝 Asistencia guardada en localStorage:', newRecord)
          return { success: true, data: newRecord }
        } catch (error) {
          console.error('Error saving attendance to localStorage:', error)
          return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
        }
      },
      
      // Función para obtener asistencias desde localStorage
      getAttendance: async (courseId: number, date?: string) => {
        try {
          const attendanceRecords = JSON.parse(localStorage.getItem('attendance_records') || '[]')
          
          let filtered = attendanceRecords.filter((record: any) => record.courseId === courseId)
          
          if (date) {
            filtered = filtered.filter((record: any) => record.date === date)
          }
          
          return { success: true, data: filtered }
        } catch (error) {
          console.error('Error getting attendance from localStorage:', error)
          return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
        }
      }
    }
  },
  description: 'Acceso a localStorage para operaciones de asistencia (modo desarrollo)'
})

// Crear microkernel y registrar solo el plugin de asistencia
export const microkernel = new Microkernel()
microkernel.registerPlugins([ostromPlugin])
