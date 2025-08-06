'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Award,
  Clock,
  Activity,
  Download,
  Filter
} from 'lucide-react'

export default function OrganizacionAnalyticsPage() {
  const [organization, setOrganization] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  useEffect(() => {
    async function loadData() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
          router.push('/login')
          return
        }

        const { data: userInfo, error: userInfoError } = await supabase
          .from('userInfo')
          .select('id')
          .eq('userId', user.id)
          .single()

        if (userInfoError || !userInfo) {
          router.push('/organizaciones')
          return
        }

        const { data: org, error: orgError } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', params.id)
          .single()

        if (orgError || !org) {
          router.push('/organizaciones')
          return
        }

        if (org.ownerId !== userInfo.id) {
          toast({
            title: 'Acceso denegado',
            description: 'No tienes permisos para ver estas estadísticas',
            variant: 'destructive'
          })
          router.push('/organizaciones')
          return
        }

        setOrganization(org)

        // Simular datos de analytics
        setAnalytics({
          totalStudents: 156,
          activeCourses: 8,
          completedEvaluations: 342,
          averageScore: 8.7,
          monthlyGrowth: 12.5,
          recentActivity: [
            { type: 'evaluation', count: 23, date: '2025-01-27' },
            { type: 'student', count: 8, date: '2025-01-26' },
            { type: 'course', count: 2, date: '2025-01-25' },
          ],
          topCourses: [
            { name: 'Matemáticas Avanzadas', students: 45, avgScore: 9.2 },
            { name: 'Física Cuántica', students: 32, avgScore: 8.8 },
            { name: 'Programación Web', students: 38, avgScore: 9.0 },
          ]
        })
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.id, router, supabase, toast])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando estadísticas...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Analytics
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {organization?.name} • Estadísticas y métricas de rendimiento
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
            
            {organization?.plan === 'Free' && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">
                    Analytics limitado en plan Free
                  </span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Actualiza a Pro para acceder a métricas avanzadas, reportes personalizados y análisis predictivo.
                </p>
              </div>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Estudiantes Totales
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analytics?.totalStudents || 0}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{analytics?.monthlyGrowth || 0}%</span>
                  <span className="text-sm text-gray-500 ml-1">este mes</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Cursos Activos
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analytics?.activeCourses || 0}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Evaluaciones
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analytics?.completedEvaluations || 0}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Promedio General
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {analytics?.averageScore || 0}
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Actividad Reciente
                </CardTitle>
                <CardDescription>
                  Últimas 7 días de actividad en tu organización
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.recentActivity?.map((activity: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'evaluation' ? 'bg-green-500' :
                          activity.type === 'student' ? 'bg-blue-500' : 'bg-purple-500'
                        }`} />
                        <span className="text-sm font-medium">
                          {activity.count} {
                            activity.type === 'evaluation' ? 'evaluaciones' :
                            activity.type === 'student' ? 'estudiantes nuevos' : 'cursos creados'
                          }
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Cursos Destacados
                </CardTitle>
                <CardDescription>
                  Cursos con mejor rendimiento este mes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.topCourses?.map((course: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {course.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {course.students} estudiantes
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {course.avgScore}/10
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pro Features Teaser */}
          {organization?.plan === 'Free' && (
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                  Desbloquea Analytics Avanzados
                </CardTitle>
                <CardDescription>
                  Obtén insights más profundos con el plan Pro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <h4 className="font-medium mb-2">Reportes Personalizados</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Crea reportes específicos con métricas que importan para ti
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <h4 className="font-medium mb-2">Análisis Predictivo</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Predicciones de rendimiento y tendencias futuras
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <h4 className="font-medium mb-2">Comparativas</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Compara el rendimiento entre cursos y periodos
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <h4 className="font-medium mb-2">Exportación Avanzada</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Exporta datos en múltiples formatos (PDF, Excel, CSV)
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => router.push('/pricing')}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Actualizar a Pro
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Back Button */}
          <div className="mt-8">
            <Button 
              variant="outline" 
              onClick={() => router.push(`/organizaciones/${params.id}`)}
            >
              ← Volver a la organización
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
