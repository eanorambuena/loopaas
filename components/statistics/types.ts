export interface GroupStats {
  group: string
  uniqueUsers: number
  totalResponses: number
  totalStudents: number
  responsePercentage: number
}

export interface DailyResponse {
  date: string
  responses: number
}

export interface GeneralStats {
  totalResponses: number
  uniqueStudents: number
  activeDays: number
  averageResponsesPerDay: number
  totalStudents: number
  responseRate: number
}

export interface TemporalStats {
  hourOfDay: { hour: number; responses: number }[]
  dayOfWeek: { day: string; responses: number }[]
  timeDistribution: { period: string; responses: number; percentage: number }[]
  peakHours: { hour: number; responses: number }[]
  peakDays: { day: string; responses: number }[]
} 