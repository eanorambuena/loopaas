import React from 'react'
import { Allow } from 'plugini'

export const id = 'student-stats'
export const permissions = ['getStudents']
export const metadata = {
  preferredWidth: 'extra-large', // small, medium, large, extra-large
  name: 'Estadísticas de Estudiantes',
  description: 'Dashboard con estadísticas detalladas de estudiantes'
}

// Componente de estadísticas de estudiantes
const StudentStatsComponent = (props: any) => {
  console.log('StudentStatsComponent props:', props)
  
  try {
    // Verificar si getStudents está disponible como permiso activo
    if (props.activePermissions && props.activePermissions.has('getStudents')) {
      // Obtener todos los permisos disponibles y buscar getStudents
      const allPermissions = Allow.getAllPermissions()
      const getStudentsPermission = allPermissions.find(p => p.name === 'getStudents')
      
      if (getStudentsPermission && getStudentsPermission.func) {
        const students = getStudentsPermission.func()
        
        // Calcular algunas estadísticas simples
        const totalStudents = students.length
        const averageGrade = students.reduce((sum: number, student: any) => sum + (student.grade || 0), 0) / totalStudents || 0
        const topStudent = students.reduce((top: any, student: any) => 
          (student.grade || 0) > (top.grade || 0) ? student : top, students[0] || {}
        )
        
        return (
          <div className="space-y-6">
            <h3 className="font-bold mb-4">Estadísticas de Estudiantes</h3>
            
            {/* Cards de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300">Total Estudiantes</h4>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalStudents}</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold text-green-700 dark:text-green-300">Promedio General</h4>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{averageGrade.toFixed(1)}</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300">Mejor Estudiante</h4>
                <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{topStudent.name || 'N/A'}</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">Nota: {topStudent.grade || 'N/A'}</p>
              </div>
            </div>
            
            {/* Lista de estudiantes */}
            <div>
              <h4 className="font-semibold mb-3">Lista de Estudiantes</h4>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 text-left">Nombre</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Nota</th>
                      <th className="px-4 py-2 text-left">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student: any, index: number) => (
                      <tr key={student.id || index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-2 font-medium">{student.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">{student.email}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            (student.grade || 0) >= 70 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {student.grade || 'Sin nota'}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            student.active 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                          }`}>
                            {student.active ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      } else {
        return <div className="text-red-500">Error: No se pudo encontrar la función del permiso &apos;getStudents&apos;</div>
      }
    } else {
      // Si no hay permisos activos, mostrar mensaje informativo
      const activePerms = props.activePermissions ? Array.from(props.activePermissions) : []
      return (
        <div className="text-orange-600">
          <p className="font-semibold">El permiso &apos;getStudents&apos; no está activo.</p>
          <p>Permisos activos: {activePerms.length > 0 ? activePerms.join(', ') : 'ninguno'}</p>
          <p className="text-sm mt-2">Para activar el permiso, ve a la sección de &quot;Gestión de Permisos del Sistema&quot; arriba y activa &apos;getStudents&apos;.</p>
        </div>
      )
    }
  } catch (error: any) {
    console.error('Error in StudentStatsComponent:', error)
    return <div className="text-red-500">Error: {error.message}</div>
  }
}

// Exportar como Component y también como default
export const Component = StudentStatsComponent
export default StudentStatsComponent
