'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Diccionario completo para textos críticos
const translations: Record<string, string> = {
  // Navegación
  'Inicio': 'Home',
  'Cursos': 'Courses', 
  'Organizaciones': 'Organizations',
  'Perfil': 'Profile',
  'Cerrar sesión': 'Sign out',
  'Iniciar sesión': 'Sign in',
  'Ayuda': 'Help',
  'Configuración': 'Settings',
  'Mi cuenta': 'My account',
  'Dashboard': 'Dashboard',
  'Panel': 'Panel',
  
  // Organizaciones
  'Mis Organizaciones': 'My Organizations',
  'Gestiona todas tus organizaciones educativas': 'Manage all your educational organizations',
  'Nueva Organización': 'New Organization',
  'Crear Organización': 'Create Organization',
  'Gestionar': 'Manage',
  'Administrar': 'Manage',
  'No tienes organizaciones aún': 'You don\'t have any organizations yet',
  'Crea tu primera organización': 'Create your first organization',
  'Crear mi primera organización': 'Create my first organization',
  'Cargando organizaciones...': 'Loading organizations...',
  'Creado el': 'Created on',
  'Creada el': 'Created on',
  'Propietario': 'Owner',
  'Propietaria': 'Owner',
  'curso': 'course',
  'cursos': 'courses',
  'Gestión de Organización': 'Organization Management',
  'Gestiona tu organización educativa': 'Manage your educational organization',
  'Nombre de la organización': 'Organization name',
  'Guardar': 'Save',
  'Cancelar': 'Cancel',
  'Editar': 'Edit',
  'Eliminar': 'Delete',
  'Plan': 'Plan',
  'Analíticas': 'Analytics',
  'Estadísticas': 'Statistics',
  'Actualizar a Pro': 'Upgrade to Pro',
  'Mejorar a Pro': 'Upgrade to Pro',
  'Desbloquea el potencial completo': 'Unlock your organization\'s full potential with Pro',
  'Desbloquea todo el potencial de tu organización con Pro': 'Unlock your organization\'s full potential with Pro',
  'Estudiantes ilimitados': 'Unlimited students',
  'Analíticas avanzadas': 'Advanced analytics',
  'Soporte prioritario': 'Priority support',
  'Actualizar ahora': 'Upgrade now',
  'Mejorar ahora': 'Upgrade now',
  'Cursos de la organización': 'Organization courses',
  'Sin cursos aún': 'No courses yet',
  'No hay cursos aún': 'No courses yet',
  'Comienza creando tu primer curso': 'Start by creating your first course for this organization',
  'Empieza por crear tu primer curso para esta organización': 'Start by creating your first course for this organization',
  'Crear primer curso': 'Create first course',
  'Cargando cursos...': 'Loading courses...',
  'Código': 'Code',
  'Semestre': 'Semester',
  'Creado': 'Created',
  'Clic para abrir curso': 'Click to open course',
  'Haz clic para abrir el curso': 'Click to open course',
  'Ver todas las organizaciones': 'View all organizations',
  'Ver todos': 'View all',
  'Volver al inicio': 'Back to home',
  'Organización no encontrada': 'Organization not found',
  'La organización que buscas no existe o no tienes acceso a ella': 'The organization you\'re looking for doesn\'t exist or you don\'t have access to it.',
  
  // Cursos
  'Mis Cursos': 'My Courses',
  'Lista de cursos': 'Course list',
  'Crear curso': 'Create course',
  'Nuevo curso': 'New course',
  'Nombre del curso': 'Course name',
  'Descripción': 'Description',
  'Estudiantes': 'Students',
  'Profesor': 'Professor',
  'Profesora': 'Professor',
  'Profesores': 'Professors',
  'Estudiante': 'Student',
  'Evaluaciones': 'Evaluations',
  'Evaluación': 'Evaluation',
  'Calificaciones': 'Grades',
  'Calificación': 'Grade',
  'Tareas': 'Assignments',
  'Tarea': 'Assignment',
  'Examen': 'Exam',
  'Exámenes': 'Exams',
  'Parcial': 'Midterm',
  'Final': 'Final',
  'Nota': 'Grade',
  'Notas': 'Grades',
  'Promedio': 'Average',
  'Asistencia': 'Attendance',
  'Presente': 'Present',

  // Acciones comunes
  'Aceptar': 'Accept',
  'Rechazar': 'Reject',
  'Confirmar': 'Confirm',
  'Enviar': 'Send',
  'Cerrar': 'Close',
  'Abrir': 'Open',
  'Buscar': 'Search',
  'Filtrar': 'Filter',
  'Ordenar': 'Sort',
  'Exportar': 'Export',
  'Importar': 'Import',
  'Descargar': 'Download',
  'Cargar': 'Upload',
  'Imprimir': 'Print',
  'Compartir': 'Share',
  'Copiar': 'Copy',
  'Pegar': 'Paste',
  'Seleccionar': 'Select',
  'Actualizar': 'Update',
  'Refrescar': 'Refresh',
  'Reiniciar': 'Reset',
  'Recargar': 'Reload',
  'Continuar': 'Continue',
  'Siguiente': 'Next',
  'Anterior': 'Previous',
  'Finalizar': 'Finish',
  'Completar': 'Complete',
  'Pausar': 'Pause',
  'Reanudar': 'Resume',
  'Detener': 'Stop',
  
  // Estados
  'Activo': 'Active',
  'Inactivo': 'Inactive',
  'Pendiente': 'Pending',
  'Completado': 'Completed',
  'En progreso': 'In progress',
  'Cancelado': 'Canceled',
  'Aprobado': 'Approved',
  'Rechazado': 'Rejected',
  'Disponible': 'Available',
  'No disponible': 'Unavailable',
  'Visible': 'Visible',
  'Oculto': 'Hidden',
  'Público': 'Public',
  'Privado': 'Private',
  'Habilitado': 'Enabled',
  'Deshabilitado': 'Disabled',
  
  // Marketplace y Plugins
  'Marketplace de Plugins': 'Plugin Marketplace',
  'Gestión de Permisos del Sistema': 'System Permissions Management',
  'Controla qué permisos están disponibles para los plugins': 'Control which permissions are available for plugins',
  'Cambiar permisos reiniciará automáticamente los plugins activos': 'Changing permissions will automatically restart active plugins',
  'Plugins Disponibles': 'Available Plugins',
  'Plugins Activos': 'Active Plugins',
  'No hay plugins activos': 'No active plugins',
  'Habilitar': 'Enable',
  'Deshabilitar': 'Disable',
  'ACTIVO': 'ACTIVE',
  'INACTIVO': 'INACTIVE',
  'Permisos requeridos': 'Required permissions',
  'Sin permisos especiales': 'No special permissions',
  'Organización de los cursos': 'Course organization',
  'Organización del Curso': 'Course Organization',
  'Muestra a qué organización pertenece cada curso': 'Shows which organization each course belongs to',
  'Añadir plugin': 'Add plugin',
  'Quitar plugin': 'Remove plugin',
  'Acceder a los cursos del usuario': 'Access user courses'
}

// Traducciones inversas (inglés a español)
const reverseTranslations: Record<string, string> = {}
Object.entries(translations).forEach(([spanish, english]) => {
  reverseTranslations[english] = spanish
})

export default function ManualTranslator() {
  const [isTranslated, setIsTranslated] = useState(false)

  const toggleTranslation = () => {
    if (isTranslated) {
      restoreOriginalText()
    } else {
      translatePage()
    }
    setIsTranslated(!isTranslated)
  }

  const translatePage = () => {
    // Traducir usando el diccionario manual (español a inglés)
    Object.entries(translations).forEach(([spanish, english]) => {
      const elements = document.querySelectorAll('*')
      
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement
        
        // Solo traducir elementos de texto sin hijos y que no estén ya traducidos
        if (element.textContent?.trim() === spanish && 
            !element.querySelector('*') && 
            !element.hasAttribute('data-translated') &&
            element.getAttribute('data-translate') !== 'no') {
          element.textContent = english
          element.setAttribute('data-translated', 'true')
          element.setAttribute('data-original-text', spanish)
        }
      }
    })
  }

  const restoreOriginalText = () => {
    // Restaurar texto original
    const translatedElements = document.querySelectorAll('[data-translated="true"]')
    
    translatedElements.forEach((element) => {
      const originalText = element.getAttribute('data-original-text')
      if (originalText) {
        element.textContent = originalText
        element.removeAttribute('data-translated')
        element.removeAttribute('data-original-text')
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTranslation}
      className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
      title={isTranslated ? 'Volver al español' : 'Translate to English'}
    >
      <Globe className="h-5 w-5" />
    </Button>
  )
}
