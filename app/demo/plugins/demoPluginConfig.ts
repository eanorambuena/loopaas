import { Microkernel, Allow } from 'plugini'
import * as demoOstromPlugin from './demoOstromPlugin'
import * as compactPlugin from './compactPlugin'
import * as organizationPlugin from './organizationPlugin'
import * as studentStatsPlugin from './studentStatsPlugin'

// Registrar permiso getCourses - datos de demostración
Allow.registerPermission({
  name: 'getCourses',
  func: () => {
    return [
      { id: 1, name: 'Matemáticas Aplicadas (MAT-2024-1)', organizacion: 'Instituto Demo' },
      { id: 2, name: 'Física Cuántica (FIS-2024-1)', organizacion: 'Universidad Demo' },
      { id: 3, name: 'Programación Avanzada (PROG-2024-2)', organizacion: 'Tech Academy' },
      { id: 4, name: 'Sustentabilidad (SUST-2024-1)', organizacion: 'Instituto Verde' }
    ]
  },
  description: 'Acceder a cursos de demostración'
})

// Registrar permiso getStudents - datos de demostración
Allow.registerPermission({
  name: 'getStudents',
  func: (courseId?: number) => {
    const allStudents = {
      1: [
        { id: 1, name: 'Ana García', email: 'ana.garcia@demo.com', grade: 85, active: true },
        { id: 2, name: 'Carlos Ruiz', email: 'carlos.ruiz@demo.com', grade: 92, active: true },
        { id: 3, name: 'María López', email: 'maria.lopez@demo.com', grade: 78, active: true },
        { id: 4, name: 'Pedro Martínez', email: 'pedro.martinez@demo.com', grade: 88, active: true }
      ],
      2: [
        { id: 5, name: 'Laura Hernández', email: 'laura.hernandez@demo.com', grade: 91, active: true },
        { id: 6, name: 'Diego Torres', email: 'diego.torres@demo.com', grade: 87, active: true },
        { id: 7, name: 'Sofia Ramírez', email: 'sofia.ramirez@demo.com', grade: 94, active: true }
      ],
      3: [
        { id: 8, name: 'Andrés Silva', email: 'andres.silva@demo.com', grade: 89, active: true },
        { id: 9, name: 'Camila Vargas', email: 'camila.vargas@demo.com', grade: 93, active: true },
        { id: 10, name: 'Roberto Chen', email: 'roberto.chen@demo.com', grade: 96, active: true },
        { id: 11, name: 'Isabella Morales', email: 'isabella.morales@demo.com', grade: 82, active: true }
      ],
      4: [
        { id: 12, name: 'Mateo Fernández', email: 'mateo.fernandez@demo.com', grade: 86, active: true },
        { id: 13, name: 'Valentina Castro', email: 'valentina.castro@demo.com', grade: 90, active: true }
      ]
    }
    
    return courseId ? (allStudents[courseId as keyof typeof allStudents] || []) : []
  },
  description: 'Acceder a estudiantes de demostración'
})

// Registrar permiso demoDatabase - simulación de base de datos
Allow.registerPermission({
  name: 'demoDatabase',
  func: () => {
    // Simulamos un almacenamiento temporal de asistencia
    const attendanceStorage: { [key: string]: boolean } = {}
    
    return {
      canReadStudents: true,
      canReadCourses: true,
      canWriteAttendance: true,
      // Función simulada para guardar asistencia
      saveAttendance: (courseId: number, studentId: number, present: boolean, date: string) => {
        const key = `${courseId}-${studentId}-${date}`
        attendanceStorage[key] = present
        console.log(`[DEMO] Asistencia guardada: Curso ${courseId}, Estudiante ${studentId}, Presente: ${present}, Fecha: ${date}`)
        return { success: true, message: 'Asistencia guardada en modo demostración' }
      },
      // Función para obtener asistencia (para futuras funcionalidades)
      getAttendance: (courseId: number, date: string) => {
        const attendance: { [studentId: number]: boolean } = {}
        Object.keys(attendanceStorage).forEach(key => {
          const [cId, sId, d] = key.split('-')
          if (parseInt(cId) === courseId && d === date) {
            attendance[parseInt(sId)] = attendanceStorage[key]
          }
        })
        return attendance
      }
    }
  },
  description: 'Acceso simulado a base de datos para demostración'
})

// Registrar permiso readNotes - datos de notas de demostración
Allow.registerPermission({
  name: 'readNotes',
  func: (courseId?: number) => {
    const notesData = {
      1: [
        { studentId: 1, grade: 85, assignment: 'Examen Parcial 1', date: '2024-03-15' },
        { studentId: 2, grade: 92, assignment: 'Examen Parcial 1', date: '2024-03-15' },
        { studentId: 3, grade: 78, assignment: 'Examen Parcial 1', date: '2024-03-15' },
        { studentId: 4, grade: 88, assignment: 'Examen Parcial 1', date: '2024-03-15' }
      ],
      2: [
        { studentId: 5, grade: 91, assignment: 'Laboratorio 1', date: '2024-04-10' },
        { studentId: 6, grade: 87, assignment: 'Laboratorio 1', date: '2024-04-10' },
        { studentId: 7, grade: 94, assignment: 'Laboratorio 1', date: '2024-04-10' }
      ],
      3: [
        { studentId: 8, grade: 89, assignment: 'Proyecto Final', date: '2024-05-20' },
        { studentId: 9, grade: 93, assignment: 'Proyecto Final', date: '2024-05-20' },
        { studentId: 10, grade: 96, assignment: 'Proyecto Final', date: '2024-05-20' },
        { studentId: 11, grade: 82, assignment: 'Proyecto Final', date: '2024-05-20' }
      ],
      4: [
        { studentId: 12, grade: 86, assignment: 'Ensayo Sostenibilidad', date: '2024-06-05' },
        { studentId: 13, grade: 90, assignment: 'Ensayo Sostenibilidad', date: '2024-06-05' }
      ]
    }
    
    return courseId ? (notesData[courseId as keyof typeof notesData] || []) : []
  },
  description: 'Acceder a notas y calificaciones de demostración'
})

// Crear microkernel de demo y registrar plugins de demostración
export const demoMicrokernel = new Microkernel()
demoMicrokernel.registerPlugins([
  demoOstromPlugin,
  compactPlugin,
  organizationPlugin,
  studentStatsPlugin
])
