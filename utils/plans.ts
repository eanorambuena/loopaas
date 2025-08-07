// Configuración de planes de pago
export const PLANS = {
  Free: {
    name: 'Free',
    price: 0,
    currency: 'USD',
    features: {
      maxCourses: 2,
      maxStudentsPerCourse: 30,
      maxGroupsPerCourse: 6,
      maxProfessorsPerCourse: 2,
      canExportCredentials: false,
      canCustomizeCredentials: false,
      canUseAdvancedAnalytics: false,
      canIntegrateCanvas: false,
      canUsePlugins: false,
      maxOrganizations: 1,
      supportLevel: 'community'
    },
    limitations: {
      courses: 'Máximo 2 cursos',
      students: 'Máximo 30 estudiantes por curso',
      groups: 'Máximo 6 grupos por curso',
      professors: 'Máximo 2 profesores por curso',
      exports: 'Sin exportación de credenciales',
      customization: 'Sin personalización de credenciales',
      analytics: 'Análisis básicos solamente',
      integrations: 'Sin integraciones externas',
      plugins: 'Sin acceso a plugins'
    }
  },
  Pro: {
    name: 'Pro',
    price: 29.99,
    currency: 'USD',
    interval: 'month',
    features: {
      maxCourses: Infinity,
      maxStudentsPerCourse: Infinity,
      maxGroupsPerCourse: Infinity,
      maxProfessorsPerCourse: Infinity,
      canExportCredentials: true,
      canCustomizeCredentials: true,
      canUseAdvancedAnalytics: true,
      canIntegrateCanvas: true,
      canUsePlugins: true,
      maxOrganizations: Infinity,
      supportLevel: 'priority'
    },
    limitations: {},
    benefits: [
      'Cursos ilimitados',
      'Estudiantes ilimitados',
      'Grupos ilimitados',
      'Exportación de credenciales PDF',
      'Personalización avanzada',
      'Análisis avanzados',
      'Integración con Canvas',
      'Acceso completo a plugins',
      'Soporte prioritario'
    ]
  }
} as const

export type PlanType = keyof typeof PLANS

// Función para obtener las características de un plan
export function getPlanFeatures(planType: PlanType) {
  return PLANS[planType].features
}

// Función para verificar si una característica está disponible
export function hasFeature(planType: PlanType, feature: keyof typeof PLANS.Free.features): boolean {
  return PLANS[planType].features[feature] as boolean
}

// Función para obtener límites numéricos
export function getLimit(planType: PlanType, feature: keyof typeof PLANS.Free.features): number {
  const value = PLANS[planType].features[feature]
  return typeof value === 'number' ? value : Infinity
}

// Función para verificar si se ha alcanzado un límite
export function isLimitReached(planType: PlanType, feature: keyof typeof PLANS.Free.features, currentCount: number): boolean {
  const limit = getLimit(planType, feature)
  return currentCount >= limit
}
