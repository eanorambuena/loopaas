import { Microkernel, Allow } from 'plugini'
import * as organizationPlugin from './organizationPlugin'

// Registrar permiso getCourses
Allow.registerPermission({
  name: 'getCourses',
  func: () => [
    { id: 1, name: 'Matemáticas', organizacion: 'Colegio San Martín' },
    { id: 2, name: 'Historia', organizacion: 'Colegio San Martín' },
  ],
  description: 'Acceder a los cursos del usuario'
})

// Crear microkernel y registrar plugins
export const microkernel = new Microkernel()
microkernel.registerPlugins([organizationPlugin])
