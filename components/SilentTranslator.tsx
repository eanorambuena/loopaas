'use client';

import { useEffect, useState } from 'react';

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
  'Ausente': 'Absent',
  'Tardanza': 'Late',
  
  // Acciones generales
  'Agregar': 'Add',
  'Añadir': 'Add',
  'Crear': 'Create',
  'Nuevo': 'New',
  'Nueva': 'New',
  'Buscar': 'Search',
  'Filtrar': 'Filter',
  'Ordenar': 'Sort',
  'Exportar': 'Export',
  'Importar': 'Import',
  'Descargar': 'Download',
  'Subir': 'Upload',
  'Enviar': 'Send',
  'Compartir': 'Share',
  'Copiar': 'Copy',
  'Pegar': 'Paste',
  'Cortar': 'Cut',
  'Seleccionar': 'Select',
  'Seleccionar todo': 'Select all',
  'Deseleccionar': 'Deselect',
  'Aplicar': 'Apply',
  'Confirmar': 'Confirm',
  'Aceptar': 'Accept',
  'Rechazar': 'Reject',
  'Aprobar': 'Approve',
  'Denegar': 'Deny',
  'Siguiente': 'Next',
  'Anterior': 'Previous',
  'Continuar': 'Continue',
  'Finalizar': 'Finish',
  'Completar': 'Complete',
  'Terminar': 'Finish',
  
  // Estados y mensajes
  'Cargando...': 'Loading...',
  'Guardando...': 'Saving...',
  'Enviando...': 'Sending...',
  'Procesando...': 'Processing...',
  'Error': 'Error',
  'Éxito': 'Success',
  'Exitoso': 'Successful',
  'Correcto': 'Correct',
  'Incorrecto': 'Incorrect',
  'Válido': 'Valid',
  'Inválido': 'Invalid',
  'Activo': 'Active',
  'Inactivo': 'Inactive',
  'Habilitado': 'Enabled',
  'Deshabilitado': 'Disabled',
  'Disponible': 'Available',
  'No disponible': 'Not available',
  'Completado': 'Completed',
  'Pendiente': 'Pending',
  'En progreso': 'In progress',
  'Finalizado': 'Finished',
  'Cancelado': 'Cancelled',
  
  // Permisos y acceso
  'Acceso denegado': 'Access denied',
  'Sin permisos': 'No permissions',
  'No tienes permisos': 'You don\'t have permission to access this organization',
  'No autorizado': 'Not authorized',
  'Permiso requerido': 'Permission required',
  'Admin': 'Admin',
  'Administrador': 'Administrator',
  'Usuario': 'User',
  'Invitado': 'Guest',
  'Público': 'Public',
  'Privado': 'Private',
  
  // Tiempo y fechas
  'Hoy': 'Today',
  'Ayer': 'Yesterday',
  'Mañana': 'Tomorrow',
  'Esta semana': 'This week',
  'La semana pasada': 'Last week',
  'Próxima semana': 'Next week',
  'Este mes': 'This month',
  'El mes pasado': 'Last month',
  'Próximo mes': 'Next month',
  'Este año': 'This year',
  'El año pasado': 'Last year',
  'Próximo año': 'Next year',
  'Fecha': 'Date',
  'Hora': 'Time',
  'Duración': 'Duration',
  'Comienzo': 'Start',
  'Fin': 'End',
  'Desde': 'From',
  'Hasta': 'To',
  
  // Formularios
  'Nombre': 'Name',
  'Apellido': 'Last name',
  'Email': 'Email',
  'Correo': 'Email',
  'Correo electrónico': 'Email',
  'Teléfono': 'Phone',
  'Dirección': 'Address',
  'Ciudad': 'City',
  'País': 'Country',
  'Contraseña': 'Password',
  'Confirmar contraseña': 'Confirm password',
  'Repetir contraseña': 'Repeat password',
  'Cambiar contraseña': 'Change password',
  'Olvidé mi contraseña': 'Forgot my password',
  'Recordar sesión': 'Remember me',
  'Mantener sesión': 'Keep me logged in',
  
  // Mensajes de error comunes
  'actualizado': 'updated',
  'No se pudo actualizar': 'Could not update the name',
  'No se pudo cargar': 'Could not load the organization',
  'No se pudo obtener información': 'Could not get user information',
  'Error inesperado': 'An unexpected error occurred',
  'Ha ocurrido un error': 'An error has occurred',
  'Algo salió mal': 'Something went wrong',
  'Inténtalo de nuevo': 'Try again',
  'Vuelve a intentarlo': 'Try again',
  'Página no encontrada': 'Page not found',
  'No encontrado': 'Not found',
  'Sin resultados': 'No results',
  'No hay datos': 'No data',
  'Vacío': 'Empty',
  
  // Footer y contacto
  'Hecho con ❤️ por': 'Made with ❤️ by',
  'Si tienes algún problema, por favor': 'If you have any problem, please',
  'contáctanos a': 'contact us at',
  'Contacto': 'Contact',
  'Soporte': 'Support',
  'Política de privacidad': 'Privacy policy',
  'Términos de servicio': 'Terms of service',
  'Términos y condiciones': 'Terms and conditions',
  
  // Plugins y características
  'Plugins': 'Plugins',
  'Extensiones': 'Extensions',
  'Herramientas': 'Tools',
  'Características': 'Features',
  'Funciones': 'Functions',
  'Opciones': 'Options',
  'Preferencias': 'Preferences',
  'Personalizar': 'Customize',
  
  // Meses
  'Enero': 'January',
  'Febrero': 'February',
  'Marzo': 'March',
  'Abril': 'April',
  'Mayo': 'May',
  'Junio': 'June',
  'Julio': 'July',
  'Agosto': 'August',
  'Septiembre': 'September',
  'Octubre': 'October',
  'Noviembre': 'November',
  'Diciembre': 'December',
  
  // Días de la semana
  'Lunes': 'Monday',
  'Martes': 'Tuesday',
  'Miércoles': 'Wednesday',
  'Jueves': 'Thursday',
  'Viernes': 'Friday',
  'Sábado': 'Saturday',
  'Domingo': 'Sunday'
};

export default function SilentTranslator() {
  const [hasTranslated, setHasTranslated] = useState(false);
  const [userWantsEnglish, setUserWantsEnglish] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'es' | 'en'>('es');
  const [showLanguageToggle, setShowLanguageToggle] = useState(false);

  useEffect(() => {
    // Detectar si el usuario prefiere inglés
    const detectUserLanguagePreference = () => {
      const userLang = navigator.language || navigator.languages?.[0] || '';
      const browserLangs = navigator.languages || [];
      
      // Verificar si prefiere inglés
      const prefersEnglish = userLang.toLowerCase().startsWith('en') ||
                           browserLangs.some(lang => lang.toLowerCase().startsWith('en'));
      
      return prefersEnglish && !userLang.toLowerCase().startsWith('es');
    };

    const shouldTranslate = detectUserLanguagePreference();
    setUserWantsEnglish(shouldTranslate);
    
    // Mostrar el toggle siempre que se detecte preferencia por inglés o el usuario ya haya traducido
    if (shouldTranslate || hasTranslated) {
      setShowLanguageToggle(true);
    }

    if (shouldTranslate && !hasTranslated && currentLanguage === 'es') {
      // Esperar un poco para que la página se cargue completamente
      const timer = setTimeout(() => {
        translatePageContent();
        setCurrentLanguage('en');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [hasTranslated, currentLanguage]);

  const translatePageContent = async () => {
    try {
      // Método 1: Usar Translation API del browser si está disponible
      if ('translation' in window) {
        try {
          // @ts-ignore
          const canTranslate = await window.translation?.canTranslate({
            sourceLanguage: 'es',
            targetLanguage: 'en'
          });

          if (canTranslate === 'readily') {
            // @ts-ignore
            const translator = await window.translation.createTranslator({
              sourceLanguage: 'es',
              targetLanguage: 'en'
            });

            await translateWithAPI(translator);
            setHasTranslated(true);
            return;
          }
        } catch (error) {
          console.log('Translation API no disponible, usando diccionario');
        }
      }

      // Método 2: Usar diccionario manual como fallback
      translateWithDictionary();
      setHasTranslated(true);

    } catch (error) {
      console.log('Error en traducción automática:', error);
    }
  };

  const translateWithAPI = async (translator: any) => {
    // Traducir elementos de texto principales
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span:not([class*="icon"]):not([data-translate="no"])',
      'button:not([data-translate="no"])',
      'label', 'td', 'th',
      '[data-translate="yes"]'
    ];

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const textContent = element.textContent?.trim();
        
        if (textContent && 
            textContent.length > 1 && 
            textContent.length < 200 &&
            !element.querySelector('*') && // Solo texto, no elementos anidados
            !/^[0-9\s\-\/\.]+$/.test(textContent) && // No solo números/fechas
            !element.hasAttribute('data-translated')) {
          
          try {
            const translatedText = await translator.translate(textContent);
            if (translatedText && translatedText !== textContent) {
              element.setAttribute('data-original-text', textContent);
              element.textContent = translatedText;
              element.setAttribute('data-translated', 'true');
            }
          } catch (error) {
            // Si falla la API, usar diccionario para este elemento
            const dictTranslation = translations[textContent];
            if (dictTranslation) {
              element.setAttribute('data-original-text', textContent);
              element.textContent = dictTranslation;
              element.setAttribute('data-translated', 'true');
            }
          }
        }
      }
    }
  };

  const translateWithDictionary = () => {
    // Traducir usando el diccionario manual
    Object.entries(translations).forEach(([spanish, english]) => {
      const elements = document.querySelectorAll('*');
      
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        
        if (element.textContent === spanish && 
            !element.querySelector('*') && 
            !element.hasAttribute('data-translated') &&
            !element.hasAttribute('data-translate') ||
            element.getAttribute('data-translate') !== 'no') {
          element.textContent = english;
          element.setAttribute('data-translated', 'true');
          element.setAttribute('data-original-text', spanish);
        }
      }
    });
  };

  const restoreOriginalText = () => {
    // Restaurar texto original
    const translatedElements = document.querySelectorAll('[data-translated="true"]');
    
    for (let i = 0; i < translatedElements.length; i++) {
      const element = translatedElements[i];
      const originalText = element.getAttribute('data-original-text');
      
      if (originalText) {
        element.textContent = originalText;
        element.removeAttribute('data-translated');
        element.removeAttribute('data-original-text');
      }
    }
  };

  const toggleLanguage = () => {
    if (currentLanguage === 'es') {
      // Cambiar a inglés
      if (!hasTranslated) {
        translatePageContent();
      } else {
        translateWithDictionary();
      }
      setCurrentLanguage('en');
      setHasTranslated(true);
    } else {
      // Cambiar a español
      restoreOriginalText();
      setCurrentLanguage('es');
    }
  };

  // Mostrar toggle si el usuario quiere inglés o ya ha traducido
  if (showLanguageToggle) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">Idioma:</span>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-3 py-1 text-xs border rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          title={currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
          <span className="text-sm">{currentLanguage === 'es' ? '🇪🇸' : '🇺🇸'}</span>
          <span className="font-medium">
            {currentLanguage === 'es' ? 'ES' : 'EN'}
          </span>
        </button>
      </div>
    );
  }

  // Componente invisible cuando no se necesita el toggle
  return null;
}
