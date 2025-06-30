'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { GenericTable } from '@/components/GenericTable'
import { groupStatsColumns } from './groupStatsColumns'

interface GroupStats {
  group: string
  uniqueUsers: number
  totalResponses: number
  totalStudents: number
  responsePercentage: number
}

interface StatisticsDashboardProps {
  evaluationId: string
}

export default function StatisticsDashboard({ evaluationId }: StatisticsDashboardProps) {
  const [stats, setStats] = useState<GroupStats[]>([])
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
        
        data.responses.forEach((response: any) => {
          const group = response.group || 'Sin grupo'
          const userId = response.userInfoId
          
          if (!groupStats.has(group)) {
            groupStats.set(group, { 
              uniqueUsers: new Set(), 
              totalResponses: 0
            })
          }
          
          const stats = groupStats.get(group)!
          stats.uniqueUsers.add(userId)
          stats.totalResponses++
        })
        
        // Convertir a array y calcular porcentajes
        const statsArray: GroupStats[] = Array.from(groupStats.entries()).map(([group, stats]) => {
          const totalStudents = studentsByGroup.get(group)?.size || 0
          const uniqueUsers = stats.uniqueUsers.size
          const responsePercentage = totalStudents > 0 ? (uniqueUsers / totalStudents) * 100 : 0
          
          return {
            group,
            uniqueUsers,
            totalResponses: stats.totalResponses,
            totalStudents,
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
      {/* Tabla de estadísticas por grupo */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas por Grupo</CardTitle>
          <CardDescription>
            Detalle de usuarios únicos y total de respuestas por grupo y sección. Ordenado por número de grupo.
          </CardDescription>
        </CardHeader>
        <CardContent>
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