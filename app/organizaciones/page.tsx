'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { Building2, Crown, Calendar, Users, Plus, ArrowRight } from 'lucide-react'

interface Organization {
  id: string
  name: string
  plan: 'Free' | 'Pro'
  created_at: string
  coursesCount?: number
  owner: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

export default function OrganizacionesPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  useEffect(() => {
    async function loadOrganizations() {
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

        // Obtener organizaciones donde el usuario es el propietario
        const { data: orgs, error: orgsError } = await supabase
          .from('organizations')
          .select(`
            id,
            name,
            plan,
            created_at,
            ownerId,
            userInfo!inner (
              id,
              firstName,
              lastName,
              email
            ),
            courses (count)
          `)
          .eq('ownerId', userInfo.id)
          .order('created_at', { ascending: false })

        if (orgsError) {
          console.error('Error loading organizations:', orgsError)
          toast({
            title: 'Error',
            description: 'No se pudieron cargar las organizaciones',
            variant: 'destructive'
          })
          return
        }

        // Transformar los datos para que coincidan con la interfaz
        const formattedOrgs = orgs?.map(org => ({
          id: org.id,
          name: org.name,
          plan: org.plan,
          created_at: org.created_at,
          coursesCount: org.courses?.[0]?.count || 0,
          owner: Array.isArray(org.userInfo) ? org.userInfo[0] : org.userInfo
        })) || []

        setOrganizations(formattedOrgs)
      } catch (error) {
        console.error('Error:', error)
        toast({
          title: 'Error',
          description: 'Ocurrió un error inesperado',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    loadOrganizations()
  }, [router, supabase, toast])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando organizaciones...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Mis Organizaciones
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Administra todas tus organizaciones educativas
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => router.push('/organizaciones/nueva')}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nueva Organización
              </Button>
            </div>
          </div>

          {/* Organizations Grid */}
          {organizations.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No tienes organizaciones aún
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Crea tu primera organización para comenzar a gestionar cursos y estudiantes de manera profesional.
              </p>
              <Button 
                onClick={() => router.push('/organizaciones/nueva')}
                className="bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Crear mi primera organización
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {organizations.map((org) => (
                <div
                  key={org.id}
                  onClick={() => router.push(`/organizaciones/${org.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 cursor-pointer group border border-transparent hover:border-emerald-200 dark:hover:border-emerald-700"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                            {org.name}
                          </h3>
                        </div>
                      </div>
                      <Badge 
                        variant={org.plan === 'Pro' ? 'default' : 'secondary'}
                        className={`${org.plan === 'Pro' ? 'bg-emerald-600' : ''} flex-shrink-0 ml-2`}
                      >
                        {org.plan}
                      </Badge>
                    </div>

                    {/* Organization Stats */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Creada el {new Date(org.created_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Crown className="w-4 h-4" />
                        <span>Propietario</span>
                      </div>

                      {/* Course count */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>
                          {org.coursesCount || 0} {org.coursesCount === 1 ? 'curso' : 'cursos'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/organizaciones/${org.id}`)
                      }}
                      variant="outline"
                      className="w-full group"
                    >
                      Administrar
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Links */}
          <div className="text-center mt-12 space-x-6">
            <Link href="/pricing" className="text-emerald-600 hover:underline font-medium">
              Ver planes y precios
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/" className="text-emerald-600 hover:underline font-medium">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
