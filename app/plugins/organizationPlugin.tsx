import React from 'react'
import { usePermissions, PermissionError } from 'plugini'

export const id = 'org-course'
export const permissions = ['getCourses']

export const component = (props: any) => {
  const allow = usePermissions(props, permissions)
  try {
    const cursos = allow.getCourses()
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
  } catch (error: any) {
    if (error instanceof PermissionError) {
      return <div className="text-red-500">Permiso denegado: {error.message}</div>
    }
    return <div className="text-red-500">Error: {error.message}</div>
  }
}
