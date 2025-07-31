import { Microkernel, Allow } from 'plugini'
import * as organizationPlugin from './organizationPlugin'
import * as studentStatsPlugin from './studentStatsPlugin'
import * as compactPlugin from './compactPlugin'
import * as ostromPlugin from './ostromPlugin'

// Registrar permiso getCourses
Allow.registerPermission({
  name: 'getCourses',
  func: () => [
    { id: 1, name: 'Matemáticas', organizacion: 'Colegio San Martín' },
    { id: 2, name: 'Historia', organizacion: 'Colegio San Martín' },
    { id: 3, name: 'Ciencias', organizacion: 'Colegio San Martín' },
    { id: 4, name: 'Programación Web', organizacion: 'Universidad Técnica' },
    { id: 5, name: 'Base de Datos', organizacion: 'Universidad Técnica' },
  ],
  description: 'Acceder a los cursos del usuario'
})

// Registrar permiso getStudents - datos más realistas para control de asistencia
Allow.registerPermission({
  name: 'getStudents',
  func: () => [
    { id: 1, name: 'Ana García Pérez', email: 'ana.garcia@estudiante.edu', grade: 85, active: true },
    { id: 2, name: 'Carlos López Martínez', email: 'carlos.lopez@estudiante.edu', grade: 92, active: true },
    { id: 3, name: 'María Rodríguez Silva', email: 'maria.rodriguez@estudiante.edu', grade: 78, active: false },
    { id: 4, name: 'Pedro Martínez Vega', email: 'pedro.martinez@estudiante.edu', grade: 88, active: true },
    { id: 5, name: 'Laura Sánchez Torres', email: 'laura.sanchez@estudiante.edu', grade: 95, active: true },
    { id: 6, name: 'Diego Fernández Ramos', email: 'diego.fernandez@estudiante.edu', grade: 87, active: true },
    { id: 7, name: 'Sofia Morales Jiménez', email: 'sofia.morales@estudiante.edu', grade: 91, active: true },
    { id: 8, name: 'Andrés Vargas Luna', email: 'andres.vargas@estudiante.edu', grade: 82, active: true },
  ],
  description: 'Acceder a la información de estudiantes del curso'
})

// Registrar permiso readNotes
Allow.registerPermission({
  name: 'readNotes',
  func: () => true, // Simplemente permitir el acceso
  description: 'Acceder a las notas y recordatorios'
})

// Registrar permiso supabaseAccess - para acceso a base de datos
Allow.registerPermission({
  name: 'supabaseAccess',
  func: () => ({
    canReadStudents: true,
    canReadCourses: true,
    canWriteAttendance: true,
    dbConnection: 'simulated', // En implementación real sería la instancia de Supabase
  }),
  description: 'Acceso a la base de datos Supabase para operaciones de asistencia'
})

// Crear microkernel y registrar plugins
export const microkernel = new Microkernel()
microkernel.registerPlugins([organizationPlugin, studentStatsPlugin, compactPlugin, ostromPlugin])
