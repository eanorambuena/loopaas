import { APP_NAME } from '@/lib/constants'
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Info,
  ArrowRight,
  Clock,
  Users,
  BarChart3,
  Mail,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'

export default function InstruccionesEstudiantePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Guía para Estudiantes - {APP_NAME}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aprende cómo participar en evaluaciones y coevaluaciones de manera efectiva
          </p>
        </div>

  {/* Sección: ¿Qué es {APP_NAME} para estudiantes? */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Info className="h-6 w-6 text-green-600" />
              ¿Qué es {APP_NAME} para estudiantes?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {APP_NAME} es una plataforma que te permite participar en evaluaciones y coevaluaciones 
              de tus cursos universitarios. Como estudiante, puedes responder evaluaciones creadas 
              por tus profesores y contribuir a la evaluación de tus compañeros de manera justa y constructiva.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Responder Evaluaciones</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Participa en evaluaciones de tus cursos</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Coevaluación</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Evalúa a tus compañeros de manera justa</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Ver Resultados</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accede a estadísticas cuando estén disponibles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Cómo Participar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              Cómo Participar en Evaluaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Acceso a Evaluaciones</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Recibir Enlace</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Tu profesor te enviará un enlace directo a la evaluación o podrás acceder 
                        desde el dashboard de tu curso.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Leer Instrucciones</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Lee cuidadosamente las instrucciones y el contexto de la evaluación 
                        antes de comenzar.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Responder Preguntas</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Completa todas las preguntas requeridas de manera honesta y constructiva.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Tipos de Preguntas</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-sm">Texto Libre</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Escribe tus respuestas en tus propias palabras
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-sm">Opción Múltiple</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Selecciona la opción que mejor represente tu opinión
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-sm">Escala Likert</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Evalúa diferentes criterios en una escala (ej: 1-5)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Coevaluación */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-purple-600" />
              Coevaluación: Evaluando a tus Compañeros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                ¿Qué es la Coevaluación?
              </h3>
              <p className="text-blue-700 dark:text-blue-200 text-sm">
                La coevaluación es un proceso donde evalúas el trabajo y contribución de tus compañeros 
                de equipo o grupo. Es una herramienta valiosa para el aprendizaje colaborativo.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Principios de una Buena Coevaluación</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Sé objetivo y justo en tus evaluaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Evalúa basándote en criterios específicos, no en preferencias personales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Proporciona comentarios constructivos cuando sea posible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Considera el esfuerzo y la contribución real al proyecto</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Qué Evitar</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">No evalúes basándote en amistad o enemistad personal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Evita dar puntuaciones extremas sin justificación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">No copies las evaluaciones de otros compañeros</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">No dejes evaluaciones incompletas o apresuradas</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Consejos Prácticos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <HelpCircle className="h-6 w-6 text-orange-600" />
              Consejos Prácticos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Antes de Evaluar</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Lee cuidadosamente las instrucciones de la evaluación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Asegúrate de tener suficiente tiempo para completar la evaluación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Ten presente los criterios de evaluación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Reflexiona sobre la contribución real de cada compañero</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Durante la Evaluación</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Tómate tu tiempo para pensar en cada respuesta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Sé consistente en tus evaluaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Proporciona comentarios específicos cuando sea posible</span>
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

        {/* Sección: Resultados y Estadísticas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
              Resultados y Estadísticas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Una vez que las evaluaciones estén cerradas, tu profesor puede compartir contigo 
              las estadísticas y resultados. Estos te ayudarán a entender:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
                <BarChart3 className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-semibold">Tus Resultados</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cómo te evaluaron tus compañeros</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Comparación Grupal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cómo se comparan los resultados del grupo</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Áreas de Mejora</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Identificar oportunidades de crecimiento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Soporte */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Mail className="h-6 w-6 text-blue-600" />
              ¿Necesitas Ayuda?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Si tienes preguntas sobre cómo usar {APP_NAME} o necesitas ayuda con una evaluación, 
              no dudes en contactar a tu profesor o al equipo de soporte.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/instrucciones">
                  Ver Instrucciones Generales
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:soporte.idsapp@gmail.com">
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