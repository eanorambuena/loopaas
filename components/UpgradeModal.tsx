'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProBadge from '@/components/ProBadge'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { 
  Crown, 
  Zap, 
  Users, 
  BookOpen, 
  BarChart3, 
  Shield, 
  X,
  Sparkles,
  Infinity,
  CheckCircle
} from 'lucide-react'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  triggerAction: string // 'cursos', 'estudiantes', 'evaluaciones'
  currentCount: number
  limit: number
}

const getActionText = (action: string) => {
  switch (action) {
    case 'cursos':
      return {
        title: 'Has alcanzado el límite de cursos',
        description: 'Tu plan Free permite hasta 3 cursos activos',
        icon: BookOpen,
        feature: 'Cursos ilimitados'
      }
    case 'estudiantes':
      return {
        title: 'Has alcanzado el límite de estudiantes',
        description: 'Tu plan Free permite hasta 50 estudiantes',
        icon: Users,
        feature: 'Estudiantes ilimitados'
      }
    case 'evaluaciones':
      return {
        title: 'Has alcanzado el límite de evaluaciones',
        description: 'Tu plan Free permite hasta 10 evaluaciones por mes',
        icon: BarChart3,
        feature: 'Evaluaciones ilimitadas'
      }
    default:
      return {
        title: 'Upgrade a Pro',
        description: 'Desbloquea todas las funcionalidades',
        icon: Crown,
        feature: 'Acceso completo'
      }
  }
}

const benefits = [
  {
    icon: Infinity,
    title: 'Sin límites',
    description: 'Cursos, estudiantes y evaluaciones ilimitadas'
  },
  {
    icon: Sparkles,
    title: 'Plugins premium',
    description: 'Accede a todos los plugins avanzados'
  },
  {
    icon: BarChart3,
    title: 'Estadísticas avanzadas',
    description: 'Reportes detallados y analytics en tiempo real'
  },
  {
    icon: Shield,
    title: 'Soporte prioritario',
    description: 'Chat en vivo y llamadas programadas'
  }
]

export default function UpgradeModal({ 
  isOpen, 
  onClose, 
  triggerAction, 
  currentCount, 
  limit 
}: UpgradeModalProps) {
  const router = useRouter()
  const [isClosing, setIsClosing] = useState(false)
  const actionText = getActionText(triggerAction)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 200)
  }

  const handleUpgrade = () => {
    router.push('/pricing')
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 border-0 bg-transparent overflow-hidden">
        <AnimatePresence mode="wait">
          {isOpen && !isClosing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative"
            >
              {/* Fondo con gradiente animado */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl"></div>
              
              <Card className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-purple-200/50 dark:border-purple-700/50 shadow-2xl rounded-2xl overflow-hidden">
                {/* Header con efectos especiales */}
                <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white">
                  {/* Efectos de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  <div className="absolute top-2 left-1/4 w-1 h-1 bg-white/80 rounded-full animate-twinkle"></div>
                  <div className="absolute bottom-2 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-twinkle-delayed"></div>
                  
                  <CardHeader className="relative text-center pb-8 pt-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <actionText.icon className="w-8 h-8 text-white" />
                      </div>
                      <Crown className="w-12 h-12 text-yellow-300 animate-pulse" />
                    </div>
                    
                    <CardTitle className="text-2xl font-bold mb-2">
                      {actionText.title}
                    </CardTitle>
                    
                    <CardDescription className="text-purple-100 text-lg">
                      {actionText.description}
                    </CardDescription>
                    
                    {/* Badge de límite actual */}
                    <div className="mt-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
                        {currentCount}/{limit} utilizados
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  {/* Botón de cerrar */}
                  <DialogClose className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
                    <X className="w-5 h-5 text-white" />
                  </DialogClose>
                </div>

                <CardContent className="p-8">
                  {/* Beneficio principal destacado */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/20 dark:to-blue-900/20 text-emerald-700 dark:text-emerald-400 px-6 py-3 rounded-full text-lg font-semibold border border-emerald-200 dark:border-emerald-700">
                      <CheckCircle className="w-5 h-5" />
                      Con Pro: {actionText.feature}
                    </div>
                  </div>

                  {/* Grid de beneficios */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-xl border border-purple-100 dark:border-purple-800"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {benefit.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                    {/* Precio destacado */}
                    <div className="text-center mb-8">
                      <div className="inline-block bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <ProBadge variant="minimal" size="md" className="bg-white/20 text-white" />
                        </div>
                        <div className="text-4xl font-bold mb-2">$29<span className="text-xl font-normal">/mes</span></div>
                        <div className="text-sm text-purple-200">14 días de prueba gratuita</div>
                      </div>
                    </div>                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleUpgrade}
                      className="flex-1 relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg py-6 font-semibold overflow-hidden group"
                    >
                      {/* Efectos especiales como la ProBadge */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      <div className="absolute top-2 left-1/4 w-1 h-1 bg-white/80 rounded-full animate-twinkle"></div>
                      <div className="absolute bottom-2 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-twinkle-delayed"></div>
                      <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white/70 rounded-full animate-twinkle-slow"></div>
                      
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5" />
                        Comenzar prueba gratuita
                      </div>
                    </Button>
                    
                    <Button
                      onClick={handleClose}
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 py-6 text-lg transition-all duration-300 hover:scale-105"
                    >
                      Tal vez después
                    </Button>
                  </div>

                  {/* Texto pequeño */}
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                    Sin compromiso • Cancela cuando quieras • Soporte incluido
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
