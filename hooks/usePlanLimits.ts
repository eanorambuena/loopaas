'use client'

import { useState, useEffect } from 'react'
import { PlanType, getPlanFeatures, hasFeature, isLimitReached } from '@/utils/plans'

interface UsePlanLimitsProps {
  organizationId?: string
}

interface PlanLimits {
  planType: PlanType
  isLoading: boolean
  error: string | null
  canCreateCourse: boolean
  canAddStudent: boolean
  canCreateGroup: boolean
  canExportCredentials: boolean
  canCustomizeCredentials: boolean
  canUseAdvancedAnalytics: boolean
  canIntegrateCanvas: boolean
  canUsePlugins: boolean
  coursesUsed: number
  coursesLimit: number
  checkLimit: (feature: string, currentCount: number) => boolean
  upgrade: () => void
}

export function usePlanLimits({ organizationId }: UsePlanLimitsProps = {}): PlanLimits {
  const [planData, setPlanData] = useState<{
    planType: PlanType
    coursesUsed: number
    studentsUsed: number
    groupsUsed: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPlanData() {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/organization/plan-usage?organizationId=${organizationId}`)
        if (!response.ok) throw new Error('Error al obtener datos del plan')
        
        const data = await response.json()
        setPlanData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }

    if (organizationId) {
      fetchPlanData()
    } else {
      setIsLoading(false)
    }
  }, [organizationId])

  const planType = planData?.planType || 'Free'
  const features = getPlanFeatures(planType)

  const checkLimit = (feature: string, currentCount: number) => {
    return isLimitReached(planType, feature as any, currentCount)
  }

  const upgrade = () => {
    // Redirigir a página de pricing o abrir modal de upgrade
    window.open('/pricing', '_blank')
  }

  return {
    planType,
    isLoading,
    error,
    canCreateCourse: !checkLimit('maxCourses', planData?.coursesUsed || 0),
    canAddStudent: !checkLimit('maxStudentsPerCourse', planData?.studentsUsed || 0),
    canCreateGroup: !checkLimit('maxGroupsPerCourse', planData?.groupsUsed || 0),
    canExportCredentials: hasFeature(planType, 'canExportCredentials'),
    canCustomizeCredentials: hasFeature(planType, 'canCustomizeCredentials'),
    canUseAdvancedAnalytics: hasFeature(planType, 'canUseAdvancedAnalytics'),
    canIntegrateCanvas: hasFeature(planType, 'canIntegrateCanvas'),
    canUsePlugins: hasFeature(planType, 'canUsePlugins'),
    coursesUsed: planData?.coursesUsed || 0,
    coursesLimit: features.maxCourses,
    checkLimit,
    upgrade
  }
}
