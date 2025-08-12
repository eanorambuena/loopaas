
'use client'
import { APP_NAME } from '@/lib/constants'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Check, X, Zap, Users, BarChart3, Shield, Clock, Crown, Building2 } from 'lucide-react'

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
    icon: Users,
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
      { name: 'Estadísticas avanzadas', included: true },
      { name: 'Soporte prioritario', included: true },
      { name: 'API access', included: true },
      { name: 'Integración con LMS', included: true },
      { name: 'Reportes personalizados', included: true },
      { name: 'Backup automático', included: true },
    ],
    buttonText: 'Comenzar prueba Pro',
    buttonVariant: 'default' as const,
    popular: true,
    icon: Crown,
  },
]

const features = [
  {
    icon: BarChart3,
    title: 'Análisis Avanzado',
    description: 'Obtén insights profundos sobre el rendimiento de tus estudiantes con dashboards interactivos y reportes detallados.',
  },
  {
    icon: Shield,
    title: 'Seguridad Empresarial',
    description: 'Protección de datos de nivel empresarial con encriptación end-to-end y cumplimiento de estándares educativos.',
  },
  {
    icon: Zap,
    title: 'Integración Rápida',
    description: 'Conecta con tu LMS existente en minutos. Compatible con Canvas, Moodle, Blackboard y más.',
  },
  {
    icon: Clock,
    title: 'Ahorro de Tiempo',
    description: 'Automatiza evaluaciones y reduce el tiempo de corrección hasta en un 80% con nuestros plugins inteligentes.',
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName)
    // Redirigir a la página de creación de organización con el plan preseleccionado
    router.push(`/organizaciones/nueva?plan=${planName.toLowerCase()}`)
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Planes y Precios
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Elige el plan perfecto para tu organización educativa. Desde instituciones pequeñas hasta universidades grandes, tenemos la solución ideal para ti.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Zap className="w-4 h-4" />
              14 días de prueba gratuita en el plan Pro
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'md:scale-105' : ''}`}
              >
                <Card className={`h-full ${plan.popular ? 'border-emerald-200 dark:border-emerald-800 shadow-xl' : 'border-gray-200 dark:border-gray-700'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className={plan.badgeColor}>
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8 pt-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-emerald-500 to-blue-500' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <plan.icon className={`w-5 h-5 ${
                          plan.popular ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                        }`} />
                      </div>
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-1">
                        {plan.period}
                      </span>
                    </div>
                    
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePlanSelect(plan.name)}
                      variant={plan.buttonVariant}
                      className={`w-full py-3 text-lg font-medium ${
                        plan.popular 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                          : 'border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                ¿Por qué elegir {APP_NAME}?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Nuestra plataforma está diseñada específicamente para instituciones educativas modernas que buscan optimizar sus procesos de evaluación.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Preguntas Frecuentes
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ¿Puedo cambiar de plan en cualquier momento?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sí, puedes actualizar o degradar tu plan en cualquier momento desde tu panel de administración. Los cambios se aplican inmediatamente.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ¿Qué incluye la prueba gratuita?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  La prueba de 14 días incluye acceso completo al plan Pro sin restricciones. No se requiere tarjeta de crédito.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ¿Hay descuentos para instituciones educativas?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ofrecemos descuentos especiales para universidades y colegios. Contáctanos para obtener una cotización personalizada.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ¿Qué soporte técnico incluye cada plan?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  El plan Free incluye soporte por email. El plan Pro incluye soporte prioritario con chat en vivo y llamadas programadas.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para transformar tu institución educativa?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Únete a miles de educadores que ya están usando {APP_NAME} para mejorar sus procesos de evaluación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/organizaciones/nueva')}
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8"
              >
                Comenzar gratis
              </Button>
              <Button
                onClick={() => router.push('/login')}
                size="lg"
                variant="outline"
                className="border-white/80 text-white hover:bg-white hover:text-emerald-600 bg-transparent backdrop-blur-sm text-lg px-8 transition-all duration-200"
              >
                Iniciar sesión
              </Button>
            </div>
          </motion.div>

          {/* Footer Links */}
          <div className="text-center mt-12 space-x-6">
            <Link href="/" className="text-emerald-600 hover:underline font-medium">
              ← Volver a la landing
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/organizaciones" className="text-emerald-600 hover:underline font-medium">
              Ver mis organizaciones
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
