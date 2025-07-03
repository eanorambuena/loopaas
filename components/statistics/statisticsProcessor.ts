import { GeneralStats, TemporalStats, DailyResponse, GroupStats, InjusticeCase } from './types'

export interface ProcessedData {
  generalStats: GeneralStats
  temporalStats: TemporalStats
  dailyData: DailyResponse[]
  groupStats: GroupStats[]
  injusticeCases: InjusticeCase[]
}

export function processResponsesData(
  responses: any[],
  students: any[],
  selectedSection: string
): ProcessedData {
  // Filtrar estudiantes y respuestas por sección
  const filteredStudents = selectedSection === 'Todas'
    ? students
    : students.filter((s: any) => s.section === selectedSection)
  
  const filteredUserIds = new Set(filteredStudents.map((s: any) => s.userInfoId))
  const filteredResponses = selectedSection === 'Todas'
    ? responses
    : responses.filter((r: any) => filteredUserIds.has(r.userInfoId))

  // Crear mapa de estudiantes por grupo
  const studentsByGroup = new Map<string, Set<string>>()
  filteredStudents?.forEach((student: any) => {
    const group = student.group || 'Sin grupo'
    if (!studentsByGroup.has(group)) {
      studentsByGroup.set(group, new Set())
    }
    studentsByGroup.get(group)!.add(student.userInfoId)
  })

  // Procesar datos de respuestas por grupo
  const groupStats = new Map<string, { 
    uniqueUsers: Set<string>, 
    totalResponses: number
  }>()

  // Procesar datos de respuestas por día
  const dailyResponses = new Map<string, number>()
  const uniqueStudents = new Set<string>()

  // Procesar datos temporales
  const hourResponses = new Map<number, number>()
  const dayResponses = new Map<string, number>()
  const timePeriodResponses = new Map<string, number>()

  filteredResponses.forEach((response: any) => {
    const group = response.group || 'Sin grupo'
    const userId = response.userInfoId
    const date = new Date(response.created_at).toISOString().split('T')[0]
    const responseDate = new Date(response.created_at)

    // Agregar a estadísticas por grupo
    if (!groupStats.has(group)) {
      groupStats.set(group, { 
        uniqueUsers: new Set(), 
        totalResponses: 0
      })
    }

    const stats = groupStats.get(group)!
    stats.uniqueUsers.add(userId)
    stats.totalResponses++

    // Agregar a estadísticas por día
    dailyResponses.set(date, (dailyResponses.get(date) || 0) + 1)

    // Agregar a estudiantes únicos
    uniqueStudents.add(userId)

    // Procesar datos temporales
    const hour = responseDate.getHours()
    const dayOfWeek = responseDate.toLocaleDateString('es-ES', { weekday: 'long' })

    // Hora del día
    hourResponses.set(hour, (hourResponses.get(hour) || 0) + 1)

    // Día de la semana
    dayResponses.set(dayOfWeek, (dayResponses.get(dayOfWeek) || 0) + 1)

    // Distribución por períodos
    let period = ''
    if (hour >= 6 && hour < 12) period = 'Mañana'
    else if (hour >= 12 && hour < 18) period = 'Tarde'
    else if (hour >= 18 && hour < 24) period = 'Noche'
    else period = 'Madrugada'

    timePeriodResponses.set(period, (timePeriodResponses.get(period) || 0) + 1)
  })

  // Procesar estadísticas temporales
  const totalResponses = filteredResponses.length

  // Hora del día
  const hourOfDay = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    responses: hourResponses.get(hour) || 0
  }))

  // Día de la semana
  const dayNames = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
  const dayOfWeek = dayNames.map(day => ({
    day: day.charAt(0).toUpperCase() + day.slice(1),
    responses: dayResponses.get(day) || 0
  }))

  // Distribución por períodos
  const timeDistribution = Array.from(timePeriodResponses.entries()).map(([period, responses]) => ({
    period,
    responses,
    percentage: Math.round((responses / totalResponses) * 100)
  }))

  // Peaks de actividad
  const peakHours = hourOfDay
    .filter(h => h.responses > 0)
    .sort((a, b) => b.responses - a.responses)
    .slice(0, 5)

  const peakDays = dayOfWeek
    .filter(d => d.responses > 0)
    .sort((a, b) => b.responses - a.responses)
    .slice(0, 3)

  const temporalStats: TemporalStats = {
    hourOfDay,
    dayOfWeek,
    timeDistribution,
    peakHours,
    peakDays
  }

  // Convertir datos diarios a array y ordenar por fecha
  const dailyData: DailyResponse[] = Array.from(dailyResponses.entries())
    .map(([date, responses]) => ({ date, responses }))
    .sort((a, b) => a.date.localeCompare(b.date))

  // Calcular estadísticas generales
  const totalStudents = filteredStudents?.length || 0
  const activeDays = dailyResponses.size
  const averageResponsesPerDay = activeDays > 0 ? totalResponses / activeDays : 0
  const responseRate = totalStudents > 0 ? (uniqueStudents.size / totalStudents) * 100 : 0

  const generalStats: GeneralStats = {
    totalResponses,
    uniqueStudents: uniqueStudents.size,
    activeDays,
    averageResponsesPerDay: Math.round(averageResponsesPerDay * 100) / 100,
    totalStudents,
    responseRate: Math.round(responseRate * 100) / 100
  }

  // Convertir a array y calcular porcentajes para grupos
  const statsArray: GroupStats[] = Array.from(groupStats.entries()).map(([group, stats]) => {
    const totalStudentsInGroup = studentsByGroup.get(group)?.size || 0
    const uniqueUsers = stats.uniqueUsers.size
    const responsePercentage = totalStudentsInGroup > 0 ? (uniqueUsers / totalStudentsInGroup) * 100 : 0

    return {
      group,
      uniqueUsers,
      totalResponses: stats.totalResponses,
      totalStudents: totalStudentsInGroup,
      responsePercentage
    }
  })

  // Ordenar por número de grupo por defecto
  statsArray.sort((a, b) => {
    const groupA = a.group === 'Sin grupo' ? -1 : parseInt(a.group) || 0
    const groupB = b.group === 'Sin grupo' ? -1 : parseInt(b.group) || 0
    return groupA - groupB
  })

  return {
    generalStats,
    temporalStats,
    dailyData,
    groupStats: statsArray,
    injusticeCases: [] // Se procesará por separado
  }
}

export function processInjusticeCases(studentsWithScores: any[]): InjusticeCase[] {
  // Agrupar estudiantes por grupo y calcular promedios
  const groupScores = new Map<string, { scores: number[], students: any[] }>()

  studentsWithScores.forEach((student: any) => {
    const group = student.group || 'Sin grupo'
    const score = student.peerEvaluationScore === 'N/A' ? 0 : parseFloat(student.peerEvaluationScore) || 0

    if (!groupScores.has(group)) {
      groupScores.set(group, { scores: [], students: [] })
    }

    groupScores.get(group)!.scores.push(score)
    groupScores.get(group)!.students.push({
      userInfoId: student.userInfoId,
      name: student.name || student.email || 'Estudiante',
      score: score
    })
  })

  // Detectar grupos con promedio negativo
  const detectedInjustices: InjusticeCase[] = []

  groupScores.forEach((groupData, group) => {
    const averageScore = groupData.scores.reduce((sum, score) => sum + score, 0) / groupData.scores.length

    // Solo considerar grupos con al menos 2 estudiantes para evitar casos aislados
    if (averageScore < 0 && groupData.students.length >= 2) {
      detectedInjustices.push({
        group,
        averageScore,
        studentCount: groupData.students.length,
        students: groupData.students.sort((a, b) => a.score - b.score) // Ordenar por score ascendente
      })
    }
  })

  // Ordenar por promedio más negativo primero
  detectedInjustices.sort((a, b) => a.averageScore - b.averageScore)
  
  return detectedInjustices
} 