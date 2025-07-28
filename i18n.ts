import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  const locale = 'es' // Siempre español por defecto
  
  return {
    locale,
    messages: {
      // Navegación
      'nav.home': 'Inicio',
      'nav.courses': 'Cursos', 
      'nav.organizations': 'Organizaciones',
      'nav.profile': 'Perfil',
      'nav.signOut': 'Cerrar sesión',
      'nav.signIn': 'Iniciar sesión',
      
      // Organizaciones
      'org.myOrganizations': 'Mis Organizaciones',
      'org.manage': 'Gestionar',
      'org.newOrganization': 'Nueva Organización',
      'org.noOrganizationsYet': 'No tienes organizaciones aún',
      'org.createFirst': 'Crea tu primera organización',
      'org.loading': 'Cargando organizaciones...',
      'org.createdOn': 'Creado el',
      'org.owner': 'Propietario',
      'org.courses': 'cursos',
      'org.course': 'curso',
      
      // Cursos
      'course.myCourses': 'Mis Cursos',
      'course.students': 'Estudiantes',
      'course.professor': 'Profesor',
      'course.evaluations': 'Evaluaciones',
      'course.grades': 'Calificaciones',
      
      // Acciones
      'action.save': 'Guardar',
      'action.cancel': 'Cancelar',
      'action.edit': 'Editar',
      'action.delete': 'Eliminar',
      'action.enable': 'Habilitar',
      'action.disable': 'Deshabilitar',
      
      // Plugins
      'plugin.marketplace': 'Marketplace de Plugins',
      'plugin.systemPermissions': 'Gestión de Permisos del Sistema',
      'plugin.availablePlugins': 'Plugins Disponibles',
      'plugin.activePlugins': 'Plugins Activos',
      'plugin.noActivePlugins': 'No hay plugins activos',
      'plugin.active': 'ACTIVO',
      'plugin.inactive': 'INACTIVO'
    }
  }
})
