'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Crown, Zap, Lock } from 'lucide-react'
import { usePlanLimits } from '@/hooks/usePlanLimits'

interface PlanLimitCardProps {
  organizationId?: string
  feature?: 'courses' | 'students' | 'groups'
  currentCount?: number
  showUpgrade?: boolean
}

export default function PlanLimitCard({ 
  organizationId, 
  feature = 'courses',
  currentCount = 0,
  showUpgrade = true 
}: PlanLimitCardProps) {
  const { 
    planType, 
    isLoading, 
    error,
    coursesUsed,
    coursesLimit,
    checkLimit,
    upgrade 
  } = usePlanLimits({ organizationId })

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-red-600">
          Error al cargar información del plan
        </CardContent>
      </Card>
    )
  }

  const isPro = planType === 'Pro'
  const isLimitReached = checkLimit(`max${feature.charAt(0).toUpperCase() + feature.slice(1)}`, currentCount)
  const usagePercentage = coursesLimit === Infinity ? 0 : (coursesUsed / coursesLimit) * 100

  return (
    <Card className={`${isLimitReached ? 'border-red-300 bg-red-50' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {isPro ? (
              <Crown className="w-4 h-4 text-yellow-600" />
            ) : (
              <Lock className="w-4 h-4 text-gray-500" />
            )}
            Plan {planType}
          </div>
          <Badge variant={isPro ? 'default' : 'secondary'}>
            {isPro ? 'Pro' : 'Free'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progreso de uso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Cursos utilizados</span>
            <span>{coursesUsed} / {coursesLimit === Infinity ? '∞' : coursesLimit}</span>
          </div>
          {coursesLimit !== Infinity && (
            <Progress 
              value={usagePercentage} 
              className={`h-2 ${isLimitReached ? 'bg-red-200' : ''}`}
            />
          )}
        </div>

        {/* Advertencia si se alcanzó el límite */}
        {isLimitReached && !isPro && (
          <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-medium">
              ¡Límite alcanzado!
            </p>
            <p className="text-xs text-red-600 mt-1">
              Has alcanzado el límite de tu plan Free. Actualiza para continuar.
            </p>
          </div>
        )}

        {/* Botón de upgrade */}
        {!isPro && showUpgrade && (
          <Button 
            onClick={upgrade}
            className="w-full"
            variant={isLimitReached ? 'default' : 'outline'}
          >
            <Zap className="w-4 h-4 mr-2" />
            {isLimitReached ? 'Actualizar Ahora' : 'Actualizar a Pro'}
          </Button>
        )}

        {/* Características del plan */}
        <div className="text-xs text-gray-600 space-y-1">
          {isPro ? (
            <div>
              <p>✅ Cursos ilimitados</p>
              <p>✅ Estudiantes ilimitados</p>
              <p>✅ Exportación PDF</p>
              <p>✅ Integraciones</p>
            </div>
          ) : (
            <div>
              <p>📋 Máximo 2 cursos</p>
              <p>👥 Máximo 30 estudiantes por curso</p>
              <p>❌ Sin exportación PDF</p>
              <p>❌ Sin integraciones</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
