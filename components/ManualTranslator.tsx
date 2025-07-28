'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Diccionario completo para textos críticos - mantenemos el sistema actual que funciona
const translations: Record<string, string> = {
  // Navegación
  'Inicio': 'Home',
  'Cursos': 'Courses', 
  'Organizaciones': 'Organizations',
  'Perfil': 'Profile',
  'Cerrar sesión': 'Sign out',
  'Iniciar sesión': 'Sign in',
  
  // Organizaciones
  'Mis Organizaciones': 'My Organizations',
  'Gestionar': 'Manage',
  'Nueva Organización': 'New Organization',
  'No tienes organizaciones aún': 'You don\'t have any organizations yet',
  'Crea tu primera organización': 'Create your first organization',
  'Cargando organizaciones...': 'Loading organizations...',
  'Creado el': 'Created on',
  'Propietario': 'Owner',
  'curso': 'course',
  'cursos': 'courses',
  
  // Cursos
  'Mis Cursos': 'My Courses',
  'Estudiantes': 'Students',
  'Profesor': 'Professor',
  'Evaluaciones': 'Evaluations',
  'Calificaciones': 'Grades',
  
  // Acciones
  'Guardar': 'Save',
  'Cancelar': 'Cancel',
  'Editar': 'Edit',
  'Eliminar': 'Delete',
  'Habilitar': 'Enable',
  'Deshabilitar': 'Disable',
  
  // Plugins
  'Marketplace de Plugins': 'Plugin Marketplace',
  'Gestión de Permisos del Sistema': 'System Permissions Management',
  'Plugins Disponibles': 'Available Plugins',
  'Plugins Activos': 'Active Plugins',
  'No hay plugins activos': 'No active plugins',
  'ACTIVO': 'ACTIVE',
  'INACTIVO': 'INACTIVE'
}

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
    Object.entries(translations).forEach(([spanish, english]) => {
      const elements = document.querySelectorAll('*')
      
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement
        
        if (element.textContent?.trim() === spanish && 
            !element.querySelector('*') && 
            !element.hasAttribute('data-translated')) {
          element.textContent = english
          element.setAttribute('data-translated', 'true')
          element.setAttribute('data-original-text', spanish)
        }
      }
    })
  }

  const restoreOriginalText = () => {
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
