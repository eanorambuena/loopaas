'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { GenericTable } from '@/components/GenericTable'
import { groupStatsColumns } from './groupStatsColumns'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'

interface GroupStats {
  group: string
  uniqueUsers: number
  totalResponses: number
  totalStudents: number
  responsePercentage: number
}

interface DailyResponse {
  date: string
  responses: number
}

interface GeneralStats {
  totalResponses: number
  uniqueStudents: number
  activeDays: number
  averageResponsesPerDay: number
  totalStudents: number
  responseRate: number
}

interface StatisticsDashboardProps {
  evaluationId: string
}

export default function StatisticsDashboard({ evaluationId }: StatisticsDashboardProps) {
  const [stats, setStats] = useState<GroupStats[]>([])
  const [dailyData, setDailyData] = useState<DailyResponse[]>([])
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
        
        // Crear mapa de estudiantes por grupo
        const studentsByGroup = new Map<string, Set<string>>()
        studentsData.students?.forEach((student: any) => {
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
        
        data.responses.forEach((response: any) => {
          const group = response.group || 'Sin grupo'
          const userId = response.userInfoId
          const date = new Date(response.created_at).toISOString().split('T')[0]
          
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
        })
        
        // Convertir datos diarios a array y ordenar por fecha
        const dailyDataArray: DailyResponse[] = Array.from(dailyResponses.entries())
          .map(([date, responses]) => ({ date, responses }))
          .sort((a, b) => a.date.localeCompare(b.date))
        
        setDailyData(dailyDataArray)
        
        // Calcular estadísticas generales
        const totalStudents = studentsData.students?.length || 0
        const totalResponses = data.responses.length
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
  }, [evaluationId])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-lg'>Cargando estadísticas...</div>
      </div>
    )
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
      {/* Estadísticas Generales */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Respuestas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{generalStats.totalResponses}</div>
            <p className='text-xs text-muted-foreground'>
              {generalStats.activeDays} días activos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Estudiantes que Respondieron</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{generalStats.uniqueStudents}</div>
            <p className='text-xs text-muted-foreground'>
              de {generalStats.totalStudents} total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Tasa de Respuesta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{generalStats.responseRate}%</div>
            <p className='text-xs text-muted-foreground'>
              participación general
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Promedio por Día</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{generalStats.averageResponsesPerDay}</div>
            <p className='text-xs text-muted-foreground'>
              respuestas diarias
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Respuestas por Día */}
      {dailyData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Respuestas por Día</CardTitle>
            <CardDescription>
              Distribución de respuestas a lo largo del tiempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" className='stroke-muted' />
                <XAxis 
                  dataKey="date" 
                  className='text-xs text-muted-foreground'
                  tickFormatter={(value) => new Date(value).toLocaleDateString('es-ES', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                />
                <YAxis className='text-xs text-muted-foreground' />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString('es-ES', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  formatter={(value, name) => [value, 'Respuestas']}
                />
                <Bar 
                  dataKey="responses" 
                  fill="hsl(var(--chart-1))"
                  className='fill-emerald-400 dark:fill-emerald-600'
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Tabla de Estadísticas por Grupo */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas por Grupo</CardTitle>
          <CardDescription>
            Detalle de usuarios únicos y total de respuestas por grupo y sección. Ordenado por número de grupo.
          </CardDescription>
        </CardHeader>
        <CardContent className='pb-0'>
          <GenericTable
            data={stats}
            columns={groupStatsColumns}
            filterColumnIds={['section']}
            emptyMessage='No hay datos de estadísticas por grupo disponibles.'
          />
        </CardContent>
      </Card>
    </div>
  )
}
