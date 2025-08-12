'use client'
import { SUPPORT_EMAIL, APP_NAME } from '@/lib/constants'
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
  Share2,
  Clock,
  Mail,
  HelpCircle,
  Target,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

export default function InstruccionesProfesorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Guía para Profesores - {APP_NAME}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aprende a gestionar cursos, estudiantes y evaluaciones de manera eficiente
          </p>
        </div>

  {/* Sección: ¿Qué es {APP_NAME} para profesores? */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Info className="h-6 w-6 text-blue-600" />
              ¿Qué es {APP_NAME} para profesores?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {APP_NAME} es una plataforma integral que te permite gestionar evaluaciones y coevaluaciones 
              en tus cursos universitarios. Como profesor, puedes crear cursos, gestionar estudiantes, 
              diseñar evaluaciones personalizadas y analizar resultados de manera detallada.
            </p>
            <div className="grid md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Gestión de Cursos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Crear y configurar cursos</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Estudiantes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gestionar listas de estudiantes</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Evaluaciones</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Crear evaluaciones personalizadas</p>
              </div>
              <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
                <BarChart3 className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-semibold">Análisis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estadísticas y detección de injusticias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Gestión de Cursos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="h-6 w-6 text-blue-600" />
              Gestión de Cursos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Crear un Nuevo Curso</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Plus className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Acceder al Formulario</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ve a &quot;Cursos&quot; → &quot;Nuevo Curso&quot; en el menú principal.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Información del Curso</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Completa: nombre, abreviatura, semestre y selecciona un color distintivo.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Crear</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Haz clic en &quot;Crear curso&quot; para finalizar el proceso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Configurar Curso Existente</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Acceder a Configuración</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Desde la página del curso, ve a la sección &quot;Configuración&quot;.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Modificar Detalles</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cambia nombre, abreviatura, semestre o color del curso.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Eliminar Curso</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Usa &quot;Eliminar curso&quot; con confirmación en dos pasos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Gestión de Estudiantes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-green-600" />
              Gestión de Estudiantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                Importante: Subir Estudiantes Primero
              </h3>
              <p className="text-green-700 dark:text-green-200 text-sm">
                Es recomendable subir la lista de estudiantes antes de crear evaluaciones 
                para tener una mejor organización y control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Subir Lista de Estudiantes</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Formato CSV</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Prepara un archivo CSV con columnas: nombre, email, grupo.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Subir Archivo</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        En la sección &quot;Estudiantes&quot; del curso, usa el formulario de carga.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Verificar</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Revisa que todos los estudiantes se hayan cargado correctamente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Gestionar Estudiantes</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Eye className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Ver Lista</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        La tabla muestra todos los estudiantes con opciones de filtrado.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Editar Individual</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Modifica datos de estudiantes específicos si es necesario.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Eliminar</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Elimina estudiantes individuales con confirmación.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Crear Evaluaciones */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-purple-600" />
              Crear Evaluaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Proceso de Creación</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Información Básica</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Define título, instrucciones, fecha límite y configuración general.
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
                        Agrega preguntas de diferentes tipos según tus necesidades.
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
                <h3 className="text-lg font-semibold mb-4">Tipos de Preguntas Disponibles</h3>
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
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Total de respuestas y tasa de participación</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Distribución temporal de respuestas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Estadísticas por grupo y sección</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm">Análisis detallado por pregunta</span>
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
                        El sistema detecta grupos con promedios negativos en coevaluaciones.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Share2 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Compartir Estadísticas</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Genera enlaces públicos para compartir con estudiantes o colegas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Mejores Prácticas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Mejores Prácticas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Diseño de Evaluaciones</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Escribe instrucciones claras y específicas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Usa criterios objetivos para evaluaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Establece fechas límite realistas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Prueba la evaluación antes de publicarla</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Gestión de Cursos</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Sube la lista de estudiantes antes de crear evaluaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Usa nombres de cursos descriptivos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Revisa regularmente las estadísticas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Comparte resultados con los estudiantes</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Soporte */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Mail className="h-6 w-6 text-blue-600" />
              Soporte y Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Si tienes preguntas sobre el uso de {APP_NAME} o necesitas ayuda con alguna funcionalidad, 
              no dudes en contactar al equipo de soporte.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/cursos">
                  Ir a Cursos
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/instrucciones">
                  Ver Instrucciones Generales
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href={`mailto:${SUPPORT_EMAIL}`}>
                  Contactar Soporte
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 