import React from 'react'
import { usePermissions, PermissionError, Allow } from 'plugini'

export const id = 'org-course'
export const permissions = ['getCourses']

// Definir el componente por separado
const OrganizationComponent = (props: any) => {
  // Debug: ver qué props estamos recibiendo
  console.log('OrganizationComponent props:', props)
  console.log('OrganizationComponent props keys:', Object.keys(props))
  
  try {
    // Verificar si getCourses está disponible como permiso activo
    if (props.activePermissions && props.activePermissions.has('getCourses')) {
      // Obtener todos los permisos disponibles y buscar getCourses
      const allPermissions = Allow.getAllPermissions()
      console.log('All permissions:', allPermissions)
      
      const getCoursesPermission = allPermissions.find(p => p.name === 'getCourses')
      
      if (getCoursesPermission && getCoursesPermission.func) {
        const cursos = getCoursesPermission.func()
        return (
          <div>
            <h3 className="font-bold mb-2">Organización de los cursos</h3>
            <ul>
              {cursos.map((curso: any) => (
                <li key={curso.id}>
                  <span className="font-semibold">{curso.name}</span>: {curso.organizacion}
                </li>
              ))}
            </ul>
          </div>
        )
      } else {
        return <div className="text-red-500">Error: No se pudo encontrar la función del permiso 'getCourses'</div>
      }
    } else {
      // Si no hay permisos activos, mostrar mensaje informativo
      const activePerms = props.activePermissions ? Array.from(props.activePermissions) : []
      return (
        <div className="text-orange-600">
          <p className="font-semibold">El permiso 'getCourses' no está activo.</p>
          <p>Permisos activos: {activePerms.length > 0 ? activePerms.join(', ') : 'ninguno'}</p>
          <p className="text-sm mt-2">Para activar el permiso, ve a la sección de "Gestión de Permisos del Sistema" arriba y activa 'getCourses'.</p>
        </div>
      )
    }
  } catch (error: any) {
    console.error('Error in OrganizationComponent:', error)
    return <div className="text-red-500">Error: {error.message}</div>
  }
}

// Exportar como Component (como estaba) y también como default
export const Component = OrganizationComponent
export default OrganizationComponent
