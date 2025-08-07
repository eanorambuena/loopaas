'use client'

import { useEffect, useState } from 'react'

// Definir tipos localmente para evitar problemas de importación
interface PlanLimits {
  maxStudents: number
  maxCourses: number
  maxEvaluationsPerMonth: number
  hasAdvancedStatistics: boolean
  hasPremiumPlugins: boolean
  hasPrioritySupport: boolean
  hasApiAccess: boolean
  hasLmsIntegration: boolean
  hasCustomReports: boolean
  hasAutoBackup: boolean
}

const PLAN_LIMITS: Record<string, PlanLimits> = {
  Free: {
    maxStudents: 50,
    maxCourses: 3,
    maxEvaluationsPerMonth: 10,
    hasAdvancedStatistics: false,
    hasPremiumPlugins: false,
    hasPrioritySupport: false,
    hasApiAccess: false,
    hasLmsIntegration: false,
    hasCustomReports: false,
    hasAutoBackup: false,
  },
  Pro: {
    maxStudents: Infinity,
    maxCourses: Infinity,
    maxEvaluationsPerMonth: Infinity,
    hasAdvancedStatistics: true,
    hasPremiumPlugins: true,
    hasPrioritySupport: true,
    hasApiAccess: true,
    hasLmsIntegration: true,
    hasCustomReports: true,
    hasAutoBackup: true,
  },
}

function getPlanLimits(planName: string): PlanLimits {
  return PLAN_LIMITS[planName] || PLAN_LIMITS.Free
}

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

interface UsePlanLimitsReturn {
  organizations: OrganizationUsage[]
  loading: boolean
  error: string | null
  canCreateCourse: (orgId: string) => boolean
  canAddStudent: (orgId: string) => boolean
  canCreateEvaluation: (orgId: string) => boolean
  getUsagePercentage: (orgId: string, type: 'courses' | 'students' | 'evaluations') => number
  hasFeature: (orgId: string, feature: keyof PlanLimits) => boolean
  refreshUsage: () => Promise<void>
}

export function usePlanLimits(): UsePlanLimitsReturn {
  const [organizations, setOrganizations] = useState<OrganizationUsage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    fetchUsage()
  }, [])

  const getOrganization = (orgId: string) => {
    return organizations.find(org => org.organizationId === orgId)
  }

  const canCreateCourse = (orgId: string): boolean => {
    const org = getOrganization(orgId)
    if (!org) return false
    const limits = getPlanLimits(org.plan)
    return org.currentUsage.courses < limits.maxCourses
  }

  const canAddStudent = (orgId: string): boolean => {
    const org = getOrganization(orgId)
    if (!org) return false
    const limits = getPlanLimits(org.plan)
    return org.currentUsage.students < limits.maxStudents
  }

  const canCreateEvaluation = (orgId: string): boolean => {
    const org = getOrganization(orgId)
    if (!org) return false
    const limits = getPlanLimits(org.plan)
    return org.currentUsage.evaluationsThisMonth < limits.maxEvaluationsPerMonth
  }

  const getUsagePercentage = (orgId: string, type: 'courses' | 'students' | 'evaluations'): number => {
    const org = getOrganization(orgId)
    if (!org) return 0
    
    const limits = getPlanLimits(org.plan)
    const usage = org.currentUsage
    
    switch (type) {
      case 'courses':
        return limits.maxCourses === Infinity ? 0 : (usage.courses / limits.maxCourses) * 100
      case 'students':
        return limits.maxStudents === Infinity ? 0 : (usage.students / limits.maxStudents) * 100
      case 'evaluations':
        return limits.maxEvaluationsPerMonth === Infinity ? 0 : (usage.evaluationsThisMonth / limits.maxEvaluationsPerMonth) * 100
      default:
        return 0
    }
  }

  const hasFeature = (orgId: string, feature: keyof PlanLimits): boolean => {
    const org = getOrganization(orgId)
    if (!org) return false
    const limits = getPlanLimits(org.plan)
    return Boolean(limits[feature])
  }

  return {
    organizations,
    loading,
    error,
    canCreateCourse,
    canAddStudent,
    canCreateEvaluation,
    getUsagePercentage,
    hasFeature,
    refreshUsage: fetchUsage,
  }
}
