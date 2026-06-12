'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, Users, Crown, Settings, BookOpen, ArrowUpCircle, BarChart3, Shield, Zap } from 'lucide-react'

export default function AdminOrganizacionPage() {
  const [organization, setOrganization] = useState<any>(null)
  const [coursesCount, setCoursesCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    if (!session?.user) {
      router.push('/login')
      return
    }

    async function loadOrganization() {
      try {
        const userInfoRes = await fetch('/api/user-info')
        if (!userInfoRes.ok) {
          console.error('Error getting user info')
          toast({
            title: 'Error',
            description: 'No se pudo obtener información del usuario',
            variant: 'destructive'
          })
          return
        }
        const userInfo = await userInfoRes.json()

        const orgsRes = await fetch('/api/organizations')
        if (!orgsRes.ok) {
          console.error('Error loading organizations')
          toast({
            title: 'Error',
            description: 'No se pudo cargar la organización',
            variant: 'destructive'
          })
          return
        }
        const orgsData = await orgsRes.json()

        const org = (orgsData.organizations || []).find(
          (o: any) => o.id === params.id
        )

        if (!org) {
          toast({
            title: 'Error',
            description: 'No se pudo cargar la organización',
            variant: 'destructive'
          })
          return
        }

        if (org.ownerId !== userInfo.id) {
          toast({
            title: 'Acceso denegado',
            description: 'No tienes permisos para acceder a esta organización',
            variant: 'destructive'
          })
          router.push('/organizaciones')
          return
        }

        const orgWithOwner = {
          ...org,
          owner: {
            id: userInfo.id,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email
          }
        }

        setOrganization(orgWithOwner)
        setNewName(org.name)

        const coursesRes = await fetch('/api/organization-courses?organizationId=' + org.id)
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json()
          setCoursesCount(coursesData.count || 0)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrganization()
  }, [params.id, session, router, toast])

  const handleSaveName = async () => {
    toast({
      title: 'No disponible',
      description: 'La actualización del nombre no está disponible por ahora',
      variant: 'destructive'
    })
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white truncate">
                    Gestión de Organización
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Administra tu organización educativa
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button 
                  variant="outline" 
                  onClick={() => router.push(`/organizaciones/${params.id}/analytics`)}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push(`/organizaciones/${params.id}/configuracion`)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </Button>
                <Badge 
                  variant={organization.plan === 'Pro' ? 'default' : 'secondary'}
                  className={organization.plan === 'Pro' ? 'bg-emerald-600' : ''}
                >
                  Plan {organization.plan}
                </Badge>
              </div>
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

          {/* Upgrade Plan Section */}
          {organization.plan === 'Free' && (
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                    <ArrowUpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Actualiza a Pro
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Desbloquea todo el potencial de tu organización con funcionalidades avanzadas
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span>Estudiantes ilimitados</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <BarChart3 className="w-4 h-4 text-emerald-600" />
                        <span>Análisis avanzado</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <span>Soporte prioritario</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    $29<span className="text-sm font-normal text-gray-600 dark:text-gray-400">/mes</span>
                  </div>
                  <Button 
                    onClick={() => router.push('/pricing')}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Actualizar ahora
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Courses Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Cursos de la organización
              </h2>
              <Badge variant="secondary">
                {coursesCount} {coursesCount === 1 ? 'curso' : 'cursos'}
              </Badge>
            </div>
            
            {coursesCount === 0 ? (
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
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Esta organización tiene {coursesCount} cursos activos
                </p>
              </div>
            )}
          </div>

          {/* Back to Landing */}
          <div className="text-center mt-8 space-x-4">
            <Button variant="outline" onClick={() => router.push('/organizaciones')}>
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
