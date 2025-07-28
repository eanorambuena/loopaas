'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Check, X, Zap, Users, BarChart3, Shield, Clock } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/ui/use-toast'

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/mes',
    description: 'Perfecto para organizaciones pequeñas que están comenzando',
    badge: 'Gratis para siempre',
    badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    features: [
      { name: 'Hasta 50 estudiantes', included: true },
      { name: '3 cursos activos', included: true },
      { name: '10 evaluaciones por mes', included: true },
      { name: 'Plugins básicos', included: true },
      { name: 'Soporte por email', included: true },
      { name: 'Dashboard básico', included: true },
      { name: 'Estadísticas avanzadas', included: false },
      { name: 'Plugins premium', included: false },
      { name: 'Soporte prioritario', included: false },
      { name: 'API access', included: false },
    ],
    buttonText: 'Comenzar gratis',
    buttonVariant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mes',
    description: 'Para organizaciones que necesitan funcionalidades avanzadas',
    badge: 'Más popular',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    features: [
      { name: 'Estudiantes ilimitados', included: true },
      { name: 'Cursos ilimitados', included: true },
      { name: 'Evaluaciones ilimitadas', included: true },
      { name: 'Todos los plugins', included: true },
      { name: 'Soporte prioritario 24/7', included: true },
      { name: 'Dashboard avanzado', included: true },
      { name: 'Estadísticas en tiempo real', included: true },
      { name: 'Plugins premium', included: true },
      { name: 'API completa', included: true },
      { name: 'Exportación de datos', included: true },
    ],
    buttonText: 'Comenzar prueba gratis',
    buttonVariant: 'default' as const,
    popular: true,
  },
]

export default function NuevaOrganizacionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [organizationName, setOrganizationName] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const { toast } = useToast()

  // Verificar autenticación al cargar y detectar plan preseleccionado
  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        
        if (!user) {
          // Redirigir al login si no está autenticado
          router.push('/login?redirect=/organizaciones/nueva')
          return
        }
        
        setUser(user)
        
        // Detectar plan preseleccionado desde URL
        const planFromUrl = searchParams.get('plan')
        if (planFromUrl) {
          const plan = planFromUrl.charAt(0).toUpperCase() + planFromUrl.slice(1).toLowerCase()
          if (plan === 'Free' || plan === 'Pro') {
            setSelectedPlan(plan)
            setShowForm(true)
          }
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error)
        router.push('/login?redirect=/organizaciones/nueva')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName)
    setShowForm(true)
  }

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      if (!organizationName.trim()) throw new Error('Nombre de organización requerido')

      console.log('🔍 [Frontend] Creating organization:', { 
        name: organizationName.trim(), 
        plan: selectedPlan 
      })

      const response = await fetch('/api/create-organization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: organizationName.trim(),
          plan: selectedPlan
        })
      })

      console.log('🔍 [Frontend] Response status:', response.status)
      const data = await response.json()
      console.log('🔍 [Frontend] Response data:', data)

      if (!response.ok) {
        console.error('❌ [Frontend] API Error:', data)
        throw new Error(data.error || 'Error al crear organización')
      }

      console.log('✅ [Frontend] Organization created successfully!')
      
      toast({
        title: 'Organización creada exitosamente',
        description: `La organización "${organizationName}" ha sido creada con el plan ${selectedPlan}`,
        variant: 'success'
      })

      // Redirigir a la página de gestión de la organización
      router.push(`/organizaciones/${data.organization.id}`)

    } catch (error: any) {
      console.error('❌ [Frontend] Error creating organization:', error)
      toast({
        title: 'Error al crear organización',
        description: error.message || 'Ha ocurrido un error inesperado',
        variant: 'destructive'
      })
    } finally {
      setIsCreating(false)
    }
  }

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Verificando autenticación...</p>
        </div>
      </main>
    )
  }

  // Solo mostrar el contenido si está autenticado
  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Crea tu organización
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Elige el plan perfecto para tu institución educativa y comienza a gestionar evaluaciones peer-to-peer de forma profesional
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        {!showForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <Card className={`h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.popular 
                    ? 'border-emerald-500 shadow-emerald-100 dark:shadow-emerald-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className={plan.badgeColor}>
                        <Zap className="w-3 h-3 mr-1" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8 pt-8">
                    <div className="mb-4">
                      {plan.name === 'Free' ? (
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                          <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {plan.period}
                      </span>
                    </div>
                    
                    <CardDescription className="mt-4 text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          feature.included 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-400 dark:text-gray-500 line-through'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                  
                  <CardFooter className="pt-6">
                    <Button
                      onClick={() => handlePlanSelect(plan.name)}
                      variant={plan.buttonVariant}
                      className={`w-full text-base py-6 ${
                        plan.popular 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg' 
                          : ''
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Organization Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <Card className="shadow-2xl border-emerald-200 dark:border-emerald-800">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-emerald-600">
                  Crear organización
                </CardTitle>
                <CardDescription>
                  Plan seleccionado: <span className="font-semibold text-emerald-600">{selectedPlan}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleCreateOrganization} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="org-name">
                      Nombre de la organización
                    </label>
                    <Input
                      id="org-name"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="Ej: Colegio San Martín"
                      className="mt-2 text-base"
                      required
                    />
                  </div>
                  
                  {selectedPlan === 'Pro' && (
                    <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">Prueba gratuita de 14 días</span>
                      </div>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Disfruta de todas las funcionalidades Pro sin costo. 
                        Puedes cancelar en cualquier momento.
                      </p>
                    </div>
                  )}
                  
                  <Button type="submit" disabled={isCreating} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base py-6">
                    {isCreating ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Creando organización...
                      </div>
                    ) : (
                      selectedPlan === 'Free' ? 'Crear organización gratis' : 'Comenzar prueba gratuita'
                    )}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="flex justify-center">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-sm text-emerald-600 hover:underline"
                >
                  ← Cambiar plan
                </button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 space-x-6">
          <Link href="/organizaciones" className="text-emerald-600 hover:underline font-medium">
            Ver mis organizaciones
          </Link>
          <span className="text-gray-300">•</span>
          <Link href="/" className="text-emerald-600 hover:underline font-medium">
            ← Volver a la landing
          </Link>
        </div>
      </div>
    </main>
  )
}
