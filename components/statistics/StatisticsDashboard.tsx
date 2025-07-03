'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import GeneralStatsCards from './GeneralStatsCards'
import TemporalAnalysis from './TemporalAnalysis'
import DailyResponsesChart from './DailyResponsesChart'
import GroupStatsTable from './GroupStatsTable'
import SectionFilter from './SectionFilter'
import LoadingSpinner from '@/components/LoadingSpinner'
import { GeneralStats, TemporalStats, DailyResponse, GroupStats } from './types'
import { getSection, addSectionToStudents, getUniqueSections } from '@/utils/statistics'

interface StatisticsDashboardProps {
  evaluationId: string
}

export default function StatisticsDashboard({ evaluationId }: StatisticsDashboardProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [stats, setStats] = useState<GroupStats[]>([])
  const [dailyData, setDailyData] = useState<DailyResponse[]>([])
  const [temporalStats, setTemporalStats] = useState<TemporalStats>({
    hourOfDay: [],
    dayOfWeek: [],
    timeDistribution: [],
    peakHours: [],
    peakDays: []
  })
  const [generalStats, setGeneralStats] = useState<GeneralStats>({
    totalResponses: 0,
    uniqueStudents: 0,
    activeDays: 0,
    averageResponsesPerDay: 0,
    totalStudents: 0,
    responseRate: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sections, setSections] = useState<string[]>([])
  const [selectedSection, setSelectedSection] = useState<string>('Todas')

  // Inicializar sección desde search params
  useEffect(() => {
    const sectionFromParams = searchParams.get('section')
    if (sectionFromParams) {
      setSelectedSection(sectionFromParams)
    }
  }, [searchParams])

  // Actualizar URL cuando cambia la sección
  const handleSectionChange = (section: string) => {
    setSelectedSection(section)
    const params = new URLSearchParams(searchParams.toString())
    if (section === 'Todas') {
      params.delete('section')
    } else {
      params.set('section', section)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // Obtener respuestas
        const response = await fetch(`/api/evaluations/${evaluationId}/responses`)
        if (!response.ok) {
          throw new Error('Error al cargar las estadísticas')
        }
        const data = await response.json()
        
        // Obtener información del curso para saber el courseId
        const courseResponse = await fetch(`/api/evaluations/${evaluationId}`)
        if (!courseResponse.ok) {
          throw new Error('Error al obtener información de la evaluación')
        }
        const evaluationData = await courseResponse.json()
        
        // Obtener todos los estudiantes del curso
        const studentsResponse = await fetch(`/api/courses/${evaluationData.courseId}/students`)
        if (!studentsResponse.ok) {
          throw new Error('Error al obtener estudiantes del curso')
        }
        const studentsData = await studentsResponse.json()

        // Agregar propiedad section calculada a cada estudiante y extraer secciones únicas
        const studentsWithSection = addSectionToStudents(studentsData.students || [])
        const uniqueSections = getUniqueSections(studentsWithSection)
        setSections(uniqueSections)

        // Filtrar estudiantes y respuestas por sección
        const filteredStudents = selectedSection === 'Todas'
          ? studentsWithSection
          : studentsWithSection.filter((s: any) => s.section === selectedSection)
        const filteredUserIds = new Set(filteredStudents.map((s: any) => s.userInfoId))
        const filteredResponses = selectedSection === 'Todas'
          ? data.responses
          : data.responses.filter((r: any) => filteredUserIds.has(r.userInfoId))

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
        
        setTemporalStats({
          hourOfDay,
          dayOfWeek,
          timeDistribution,
          peakHours,
          peakDays
        })
        
        // Convertir datos diarios a array y ordenar por fecha
        const dailyDataArray: DailyResponse[] = Array.from(dailyResponses.entries())
          .map(([date, responses]) => ({ date, responses }))
          .sort((a, b) => a.date.localeCompare(b.date))
        
        setDailyData(dailyDataArray)
        
        // Calcular estadísticas generales
        const totalStudents = filteredStudents?.length || 0
        const activeDays = dailyResponses.size
        const averageResponsesPerDay = activeDays > 0 ? totalResponses / activeDays : 0
        const responseRate = totalStudents > 0 ? (uniqueStudents.size / totalStudents) * 100 : 0
        
        setGeneralStats({
          totalResponses,
          uniqueStudents: uniqueStudents.size,
          activeDays,
          averageResponsesPerDay: Math.round(averageResponsesPerDay * 100) / 100,
          totalStudents,
          responseRate: Math.round(responseRate * 100) / 100
        })
        
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
        
        setStats(statsArray)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [evaluationId, selectedSection])

  if (loading) {
    return <LoadingSpinner label='Cargando estadísticas...' />
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-lg text-red-600 dark:text-red-400'>Error: {error}</div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <SectionFilter
        sections={sections}
        selectedSection={selectedSection}
        onChange={handleSectionChange}
      />
      <GeneralStatsCards stats={generalStats} />
      <TemporalAnalysis temporalStats={temporalStats} />
      <DailyResponsesChart dailyData={dailyData} />
      <GroupStatsTable stats={stats} />
    </div>
  )
}
