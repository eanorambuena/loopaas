'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, Users, Crown, Settings, BookOpen, ExternalLink } from 'lucide-react'

export default function AdminOrganizacionPage() {
  const [organization, setOrganization] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  useEffect(() => {
    async function loadOrganization() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
          router.push('/login')
          return
        }

        // Obtener userInfo para conseguir el ID correcto
        const { data: userInfo, error: userInfoError } = await supabase
          .from('userInfo')
          .select('id')
          .eq('userId', user.id)
          .single()

        if (userInfoError || !userInfo) {
          console.error('Error getting user info:', userInfoError)
          toast({
            title: 'Error',
            description: 'No se pudo obtener información del usuario',
            variant: 'destructive'
          })
          return
        }

        const { data: org, error: orgError } = await supabase
          .from('organizations')
          .select(`
            *,
            userInfo!inner (
              id,
              firstName,
              lastName,
              email
            )
          `)
          .eq('id', params.id)
          .single()

        if (orgError) {
          console.error('Error loading organization:', orgError)
          toast({
            title: 'Error',
            description: 'No se pudo cargar la organización',
            variant: 'destructive'
          })
          return
        }

        // Verificar que el usuario tenga acceso a esta organización
        if (org.ownerId !== userInfo.id) {
          toast({
            title: 'Acceso denegado',
            description: 'No tienes permisos para acceder a esta organización',
            variant: 'destructive'
          })
          router.push('/organizacion')
          return
        }

        // Transformar los datos para que coincidan con la interfaz
        const orgWithOwner = {
          ...org,
          owner: Array.isArray(org.userInfo) ? org.userInfo[0] : org.userInfo
        }

        setOrganization(orgWithOwner)
        setNewName(org.name)
        
        // Cargar cursos de la organización
        await loadCourses(org.id)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    async function loadCourses(organizationId: string) {
      try {
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select(`
            id,
            title,
            abbreviature,
            semester,
            color,
            created_at
          `)
          .eq('organizationId', organizationId)
          .order('created_at', { ascending: false })

        if (coursesError) {
          console.error('Error loading courses:', coursesError)
        } else {
          setCourses(coursesData || [])
        }
      } catch (error) {
        console.error('Error loading courses:', error)
      } finally {
        setCoursesLoading(false)
      }
    }

    loadOrganization()
  }, [params.id, router, supabase, toast])

  const handleSaveName = async () => {
    try {
      const { error } = await supabase
        .from('organizations')
        .update({ name: newName.trim() })
        .eq('id', params.id)

      if (error) throw error

      setOrganization({ ...organization, name: newName.trim() })
      setEditing(false)
      toast({
        title: 'Éxito',
        description: 'Nombre de organización actualizado',
        variant: 'success'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el nombre',
        variant: 'destructive'
      })
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando organización...</p>
        </div>
      </main>
    )
  }

  if (!organization) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Organización no encontrada</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">La organización que buscas no existe o no tienes acceso a ella.</p>
          <Button onClick={() => router.push('/')}>Volver al inicio</Button>
        </div>
      </main>
    )
  }
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Gestión de Organización
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Administra tu organización educativa
                  </p>
                </div>
              </div>
              <Badge 
                variant={organization.plan === 'Pro' ? 'default' : 'secondary'}
                className={organization.plan === 'Pro' ? 'bg-emerald-600' : ''}
              >
                Plan {organization.plan}
              </Badge>
            </div>

            {/* Organization Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Nombre de la organización
              </label>
              <div className="flex gap-2">
                {editing ? (
                  <>
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="flex-1"
                      placeholder="Nombre de la organización"
                    />
                    <Button onClick={handleSaveName} className="bg-emerald-600 hover:bg-emerald-700">
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setEditing(false)
                      setNewName(organization.name)
                    }}>
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <span className="text-lg font-semibold">{organization.name}</span>
                    </div>
                    <Button variant="outline" onClick={() => setEditing(true)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Organization Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Creada el</p>
                  <p className="font-semibold">
                    {new Date(organization.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Propietario</p>
                  <p className="font-semibold">
                    {organization.owner ? 
                      `${organization.owner.firstName} ${organization.owner.lastName}` : 
                      'No disponible'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Cursos de la organización
              </h2>
              <Badge variant="secondary">
                {courses.length} {courses.length === 1 ? 'curso' : 'cursos'}
              </Badge>
            </div>
            
            {coursesLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando cursos...</p>
              </div>
            ) : courses.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No hay cursos aún
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comienza creando tu primer curso para esta organización
                </p>
                <Button 
                  onClick={() => router.push('/cursos')}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Crear primer curso
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => router.push(`/cursos/${course.id}`)}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: course.color || '#6366f1' }}
                        />
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {course.title || 'Sin título'}
                        </h3>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {course.abbreviature && (
                        <p><span className="font-medium">Código:</span> {course.abbreviature}</p>
                      )}
                      {course.semester && (
                        <p><span className="font-medium">Semestre:</span> {course.semester}</p>
                      )}
                      <p>
                        <span className="font-medium">Creado:</span>{' '}
                        {new Date(course.created_at).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 transition-colors">
                        <BookOpen className="w-3 h-3" />
                        <span>Hacer clic para abrir curso</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Back to Landing */}
          <div className="text-center mt-8 space-x-4">
            <Button variant="outline" onClick={() => router.push('/organizacion')}>
              ← Ver todas las organizaciones
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              ← Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
