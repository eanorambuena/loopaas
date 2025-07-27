'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, Users, Crown, Settings } from 'lucide-react'

export default function AdminOrganizacionPage() {
  const [organization, setOrganization] = useState<any>(null)
  const [loading, setLoading] = useState(true)
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

        const { data: org, error: orgError } = await supabase
          .from('organizations')
          .select(`
            *,
            owner:ownerId (
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

        setOrganization(org)
        setNewName(org.name)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrganization()
  }, [params.id])

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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Cursos de la organización
            </h2>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay cursos aún
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Comienza creando tu primer curso para esta organización
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Crear primer curso
              </Button>
            </div>
          </div>

          {/* Back to Landing */}
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => router.push('/')}>
              ← Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
