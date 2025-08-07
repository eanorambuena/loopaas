// Configuración de planes y limitaciones

export interface PlanLimits {
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

export const PLAN_LIMITS: Record<string, PlanLimits> = {
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

export function getPlanLimits(planName: string): PlanLimits {
  return PLAN_LIMITS[planName] || PLAN_LIMITS.Free
}

export function canCreateCourse(currentCourses: number, planName: string): boolean {
  const limits = getPlanLimits(planName)
  return currentCourses < limits.maxCourses
}

export function canAddStudent(currentStudents: number, planName: string): boolean {
  const limits = getPlanLimits(planName)
  return currentStudents < limits.maxStudents
}

export function canCreateEvaluation(currentEvaluations: number, planName: string): boolean {
  const limits = getPlanLimits(planName)
  return currentEvaluations < limits.maxEvaluationsPerMonth
}

export function getUpgradeMessage(feature: keyof PlanLimits): string {
  const messages: Record<keyof PlanLimits, string> = {
    maxStudents: 'Actualiza a Pro para tener estudiantes ilimitados',
    maxCourses: 'Actualiza a Pro para crear cursos ilimitados',
    maxEvaluationsPerMonth: 'Actualiza a Pro para evaluaciones ilimitadas',
    hasAdvancedStatistics: 'Actualiza a Pro para acceder a estadísticas avanzadas',
    hasPremiumPlugins: 'Actualiza a Pro para acceder a todos los plugins',
    hasPrioritySupport: 'Actualiza a Pro para soporte prioritario',
    hasApiAccess: 'Actualiza a Pro para acceso a la API',
    hasLmsIntegration: 'Actualiza a Pro para integración con LMS',
    hasCustomReports: 'Actualiza a Pro para reportes personalizados',
    hasAutoBackup: 'Actualiza a Pro para backup automático',
  }
  return messages[feature] || 'Actualiza a Pro para más funcionalidades'
}
