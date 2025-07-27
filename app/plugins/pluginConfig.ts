import { Microkernel, Allow } from 'plugini'
import * as organizationPlugin from './organizationPlugin'
import * as studentStatsPlugin from './studentStatsPlugin'
import * as compactPlugin from './compactPlugin'

// Registrar permiso getCourses
Allow.registerPermission({
  name: 'getCourses',
  func: () => [
    { id: 1, name: 'Matemáticas', organizacion: 'Colegio San Martín' },
    { id: 2, name: 'Historia', organizacion: 'Colegio San Martín' },
    { id: 3, name: 'Ciencias', organizacion: 'Colegio San Martín' },
  ],
  description: 'Acceder a los cursos del usuario'
})

// Registrar permiso getStudents
Allow.registerPermission({
  name: 'getStudents',
  func: () => [
    { id: 1, name: 'Ana García', email: 'ana.garcia@email.com', grade: 85, active: true },
    { id: 2, name: 'Carlos López', email: 'carlos.lopez@email.com', grade: 92, active: true },
    { id: 3, name: 'María Rodríguez', email: 'maria.rodriguez@email.com', grade: 78, active: false },
    { id: 4, name: 'Pedro Martínez', email: 'pedro.martinez@email.com', grade: 88, active: true },
    { id: 5, name: 'Laura Sánchez', email: 'laura.sanchez@email.com', grade: 95, active: true },
  ],
  description: 'Acceder a la información de estudiantes'
})

// Registrar permiso readNotes
Allow.registerPermission({
  name: 'readNotes',
  func: () => true, // Simplemente permitir el acceso
  description: 'Acceder a las notas y recordatorios'
})

// Crear microkernel y registrar plugins
export const microkernel = new Microkernel()
microkernel.registerPlugins([organizationPlugin, studentStatsPlugin, compactPlugin])
