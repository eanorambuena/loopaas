import { APP_NAME } from '@/lib/constants'
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Trash2, 
  Upload, 
  Download,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  Plus,
  Eye,
  Share2
} from 'lucide-react'
import Link from 'next/link'

export default function InstruccionesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Guía de Uso - {APP_NAME}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Plataforma integral para la gestión de evaluaciones y coevaluaciones en cursos universitarios
          </p>
        </div>

  {/* Sección: ¿Qué es {APP_NAME}? */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Info className="h-6 w-6 text-blue-600" />
              ¿Qué es {APP_NAME}?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {APP_NAME} es una plataforma web diseñada para facilitar la gestión de evaluaciones y coevaluaciones 
              en el contexto universitario. Permite a los profesores crear evaluaciones, gestionar estudiantes 
              y analizar resultados de manera eficiente.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Gestión de Estudiantes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Subir y gestionar listas de estudiantes</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Evaluaciones</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Crear y configurar evaluaciones personalizadas</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Análisis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estadísticas detalladas y detección de injusticias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Roles de Usuario */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-green-600" />
              Roles de Usuario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Profesor
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Crear y gestionar cursos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Subir listas de estudiantes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Crear evaluaciones
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Ver estadísticas y resultados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Gestionar otros profesores
                  </li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                  Estudiante
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Responder evaluaciones
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Ver evaluaciones disponibles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Acceder a resultados (si están disponibles)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Funcionalidades Principales */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Gestión de Cursos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Gestión de Cursos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Plus className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Crear Curso</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Accede a &quot;Cursos&quot; → &quot;Nuevo Curso&quot; para crear un nuevo curso con nombre, 
                      abreviatura, semestre y color personalizado.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Configurar Curso</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Desde la página del curso, accede a &quot;Configuración&quot; para modificar 
                      detalles del curso o eliminarlo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Eliminar Curso</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      En la configuración del curso, usa &quot;Eliminar curso&quot;. El sistema 
                      verificará datos relacionados y pedirá confirmación.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gestión de Estudiantes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Gestión de Estudiantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Subir Estudiantes</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      En &quot;Estudiantes&quot; del curso, usa el formulario para subir una lista 
                      CSV con nombres, emails y grupos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Ver Estudiantes</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      La tabla muestra todos los estudiantes con opciones de filtrado 
                      por email y grupo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Eliminar Estudiantes</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cada estudiante tiene un botón de eliminar con confirmación 
                      antes de proceder.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sección: Evaluaciones */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-purple-600" />
              Evaluaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Crear Evaluación</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Información Básica</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Define título, instrucciones y fecha límite de la evaluación.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Configurar Preguntas</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Agrega preguntas de texto, opción múltiple, escala Likert, etc.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Publicar</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        La evaluación estará disponible para que los estudiantes respondan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Tipos de Preguntas</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Texto</Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Respuestas de texto libre</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Opción Múltiple</Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Selección de una opción</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Checkbox</Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Selección múltiple</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Escala Likert</Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Evaluación por criterios</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Estadísticas y Análisis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
              Estadísticas y Análisis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Estadísticas Generales</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Total de respuestas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Tasa de participación
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Distribución temporal
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Estadísticas por grupo
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Detección de Injusticias</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Análisis Automático</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        El sistema detecta automáticamente grupos con promedios negativos 
                        en coevaluaciones.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Share2 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Compartir Estadísticas</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Genera enlaces públicos para compartir estadísticas con otros.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Consejos y Mejores Prácticas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Consejos y Mejores Prácticas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Para Profesores</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Sube la lista de estudiantes antes de crear evaluaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Usa preguntas claras y específicas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Revisa las estadísticas para identificar problemas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Comparte enlaces de estadísticas con los estudiantes</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Para Estudiantes</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Lee cuidadosamente las instrucciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Responde de manera honesta y constructiva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Completa todas las preguntas requeridas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Revisa tus respuestas antes de enviar</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Instrucciones Específicas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-green-600" />
              Instrucciones Específicas por Rol
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Accede a guías detalladas específicas para tu rol en la plataforma:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                      Para Estudiantes
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-200 mb-4">
                      Aprende cómo participar en evaluaciones y coevaluaciones de manera efectiva
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/instrucciones/estudiante">
                        Ver Guía de Estudiante
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                      Para Profesores
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mb-4">
                      Aprende a gestionar cursos, estudiantes y evaluaciones de manera eficiente
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/instrucciones/profesor">
                        Ver Guía de Profesor
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Soporte */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Info className="h-6 w-6 text-blue-600" />
              Soporte y Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Si tienes preguntas o necesitas ayuda con {APP_NAME}, no dudes en contactar al equipo de desarrollo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/cursos">
                  Ir a Cursos
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">
                  Iniciar Sesión
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 