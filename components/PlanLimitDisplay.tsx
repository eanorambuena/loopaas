'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Crown, AlertTriangle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface OrganizationUsage {
  organizationId: string
  organizationName: string
  plan: string
  currentUsage: {
    courses: number
    students: number
    evaluationsThisMonth: number
  }
}

interface PlanLimitDisplayProps {
  organizationId: string
  showUpgradeButton?: boolean
}

export default function PlanLimitDisplay({ organizationId, showUpgradeButton = true }: PlanLimitDisplayProps) {
  const [organizations, setOrganizations] = useState<OrganizationUsage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        setError(null)
        const response = await fetch('/api/plan-usage')
        if (!response.ok) {
          throw new Error('Error al obtener información de uso')
        }
        const data = await response.json()
        setOrganizations(data.organizations)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchUsage()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p>Error al cargar límites del plan</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const organization = organizations.find((org: any) => org.organizationId === organizationId)
  
  if (!organization) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <p>Organización no encontrada</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isPro = organization.plan === 'Pro'
  const usage = organization.currentUsage

  // Límites basados en el plan
  const limits = isPro ? {
    maxCourses: Infinity,
    maxStudents: Infinity,
    maxEvaluationsPerMonth: Infinity
  } : {
    maxCourses: 3,
    maxStudents: 50,
    maxEvaluationsPerMonth: 10
  }

  const usageItems = [
    {
      label: 'Cursos',
      current: usage.courses,
      limit: limits.maxCourses,
      percentage: limits.maxCourses === Infinity ? 0 : (usage.courses / limits.maxCourses) * 100,
      unlimited: limits.maxCourses === Infinity
    },
    {
      label: 'Estudiantes',
      current: usage.students,
      limit: limits.maxStudents,
      percentage: limits.maxStudents === Infinity ? 0 : (usage.students / limits.maxStudents) * 100,
      unlimited: limits.maxStudents === Infinity
    },
    {
      label: 'Evaluaciones (este mes)',
      current: usage.evaluationsThisMonth,
      limit: limits.maxEvaluationsPerMonth,
      percentage: limits.maxEvaluationsPerMonth === Infinity ? 0 : (usage.evaluationsThisMonth / limits.maxEvaluationsPerMonth) * 100,
      unlimited: limits.maxEvaluationsPerMonth === Infinity
    }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {isPro ? (
                <Crown className="w-5 h-5 text-yellow-500" />
              ) : (
                <TrendingUp className="w-5 h-5 text-blue-500" />
              )}
              Plan {organization.plan}
            </CardTitle>
            <CardDescription>
              {organization.organizationName}
            </CardDescription>
          </div>
          <Badge 
            variant={isPro ? 'default' : 'secondary'}
            className={`${
              isPro 
                ? 'relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white border-0 shadow-lg animate-pulse overflow-hidden' 
                : ''
            }`}
          >
            {isPro && (
              <>
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                {/* Partículas brillantes */}
                <div className="absolute top-0 left-1/4 w-1 h-1 bg-white/80 rounded-full animate-twinkle"></div>
                <div className="absolute bottom-0 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-twinkle-delayed"></div>
                <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white/70 rounded-full animate-twinkle-slow"></div>
              </>
            )}
            <span className="relative z-10 font-bold">
              {isPro ? (
                <div className="flex items-center gap-1">
                  <Crown className="w-3 h-3 text-yellow-300" />
                  PRO
                </div>
              ) : (
                organization.plan
              )}
            </span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {usageItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm text-gray-600">
                  {item.current} / {item.unlimited ? '∞' : item.limit}
                </span>
              </div>
              
              {!item.unlimited && (
                <div className="space-y-1">
                  <Progress 
                    value={item.percentage} 
                    className="h-2"
                  />
                  {item.percentage >= 90 && (
                    <p className="text-xs text-red-600">
                      ⚠️ Te estás acercando al límite
                    </p>
                  )}
                </div>
              )}
              
              {item.unlimited && (
                <div className="text-xs text-green-600 flex items-center gap-1">
                  ✓ Ilimitado en tu plan Pro
                </div>
              )}
            </div>
          ))}
          
          {!isPro && showUpgradeButton && (
            <div className="pt-4 border-t">
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  ¿Necesitas más? Actualiza a Pro para obtener acceso ilimitado
                </p>
                <Link href="/pricing">
                  <Button className="w-full relative bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 hover:from-purple-600 hover:via-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Crown className="w-4 h-4 mr-2 relative z-10 text-yellow-300" />
                    <span className="relative z-10 font-semibold">Actualizar a Pro</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}
          
          {isPro && (
            <div className="pt-4 border-t">
              <div className="text-center text-sm text-purple-600 flex items-center justify-center gap-2">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Disfrutando del plan Pro con acceso ilimitado
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
