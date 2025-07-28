'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { 
  Settings, 
  Users, 
  Bell, 
  Shield, 
  CreditCard, 
  Database, 
  Globe,
  Mail,
  Trash2,
  AlertTriangle
} from 'lucide-react'

export default function OrganizacionSettingsPage() {
  const [organization, setOrganization] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    weeklyReports: false,
    studentInvitations: true,
    publicProfile: false,
    dataRetention: '12',
    timezone: 'America/Santiago'
  })

  useEffect(() => {
    async function loadOrganization() {
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
            description: 'No tienes permisos para acceder a esta configuración',
            variant: 'destructive'
          })
          router.push('/organizaciones')
          return
        }

        setOrganization(org)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrganization()
  }, [params.id])

  const handleSaveSettings = async () => {
    setSaving(true)
    // Simular guardado de configuración
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast({
      title: 'Configuración guardada',
      description: 'Los cambios se han guardado correctamente',
      variant: 'success'
    })
    setSaving(false)
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando configuración...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Configuración
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {organization?.name} • Ajustes avanzados y preferencias
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Configuración General
                </CardTitle>
                <CardDescription>
                  Ajustes básicos de tu organización
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Zona horaria</Label>
                    <select 
                      id="timezone"
                      value={settings.timezone}
                      onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                      className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="America/Santiago">Santiago (GMT-3)</option>
                      <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                      <option value="America/Buenos_Aires">Buenos Aires (GMT-3)</option>
                      <option value="Europe/Madrid">Madrid (GMT+1)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="retention">Retención de datos (meses)</Label>
                    <Input
                      id="retention"
                      type="number"
                      value={settings.dataRetention}
                      onChange={(e) => setSettings({...settings, dataRetention: e.target.value})}
                      min="3"
                      max="60"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificaciones
                </CardTitle>
                <CardDescription>
                  Controla cómo y cuándo recibir notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Notificaciones por email</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Recibir alertas importantes por correo electrónico
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Reportes semanales</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Resumen semanal de actividad de la organización
                    </p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => setSettings({...settings, weeklyReports: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacidad y Seguridad
                </CardTitle>
                <CardDescription>
                  Configuración de privacidad y acceso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="student-invitations">Permitir invitaciones de estudiantes</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Los profesores pueden invitar estudiantes directamente
                    </p>
                  </div>
                  <Switch
                    id="student-invitations"
                    checked={settings.studentInvitations}
                    onCheckedChange={(checked) => setSettings({...settings, studentInvitations: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public-profile">Perfil público</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Hacer visible la organización en directorios públicos
                    </p>
                  </div>
                  <Switch
                    id="public-profile"
                    checked={settings.publicProfile}
                    onCheckedChange={(checked) => setSettings({...settings, publicProfile: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Billing Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Facturación
                </CardTitle>
                <CardDescription>
                  Gestiona tu suscripción y métodos de pago
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium">Plan actual</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {organization?.plan === 'Pro' ? 'Plan Pro - $29/mes' : 'Plan Free - Gratis'}
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/pricing')}
                  >
                    {organization?.plan === 'Pro' ? 'Gestionar' : 'Actualizar'}
                  </Button>
                </div>
                {organization?.plan === 'Pro' && (
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2">Método de pago</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      •••• •••• •••• 4242 (Visa)
                    </p>
                    <Button variant="outline" size="sm">
                      Cambiar método de pago
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  Zona de peligro
                </CardTitle>
                <CardDescription>
                  Acciones irreversibles para tu organización
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">
                    Eliminar organización
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                    Esta acción no se puede deshacer. Se eliminarán todos los cursos, estudiantes y datos.
                  </p>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar organización
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => router.push(`/organizaciones/${params.id}`)}
              >
                ← Volver
              </Button>
              <Button 
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
