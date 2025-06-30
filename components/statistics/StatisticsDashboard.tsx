'use client'

import { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { GenericTable } from '@/components/GenericTable'

interface GroupStats {
  group: string
  uniqueUsers: number
  totalResponses: number
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
        const response = await fetch(`/api/evaluations/${evaluationId}/responses`)
        if (!response.ok) {
          throw new Error('Error al cargar las estadísticas')
        }
        const data = await response.json()
        
        // Procesar datos para agrupar por grupo
        const groupStats = new Map<string, { uniqueUsers: Set<string>, totalResponses: number }>()
        
        data.responses.forEach((response: any) => {
          const group = response.group || 'Sin grupo'
          const userId = response.userInfoId
          
          if (!groupStats.has(group)) {
            groupStats.set(group, { uniqueUsers: new Set(), totalResponses: 0 })
          }
          
          const stats = groupStats.get(group)!
          stats.uniqueUsers.add(userId)
          stats.totalResponses++
        })
        
        // Convertir a array y ordenar por número de usuarios únicos
        const statsArray: GroupStats[] = Array.from(groupStats.entries()).map(([group, stats]) => ({
          group,
          uniqueUsers: stats.uniqueUsers.size,
          totalResponses: stats.totalResponses
        }))
        
        // Ordenar por usuarios únicos descendente
        statsArray.sort((a, b) => b.uniqueUsers - a.uniqueUsers)
        
        setStats(statsArray)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [evaluationId])

  // Definir las columnas para la tabla de estadísticas por grupo
  const groupStatsColumns: ColumnDef<GroupStats>[] = [
    {
      accessorKey: 'group',
      header: 'Grupo',
      enableSorting: true,
      filterFn: (row, id, value) => {
        return Number(row.original.group) === Number(value)
      },
      cell: ({ row }) => {
        const group = row.getValue('group') as string
        return group || 'Sin grupo'
      },
    },
    {
      accessorKey: 'uniqueUsers',
      header: 'Usuarios Únicos',
      enableSorting: true,
      cell: ({ row }) => {
        const count = row.getValue('uniqueUsers') as number
        return (
          <div className='font-medium text-emerald-600 dark:text-emerald-400'>
            {count}
          </div>
        )
      },
    },
    {
      accessorKey: 'totalResponses',
      header: 'Total Respuestas',
      enableSorting: true,
      cell: ({ row }) => {
        const count = row.getValue('totalResponses') as number
        return (
          <div className='font-medium text-blue-600 dark:text-blue-400'>
            {count}
          </div>
        )
      },
    },
  ]

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
            Detalle de usuarios únicos y total de respuestas por grupo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GenericTable
            data={stats}
            columns={groupStatsColumns}
            filterColumnIds={['group']}
            emptyMessage='No hay datos de estadísticas por grupo disponibles.'
          />
        </CardContent>
      </Card>
    </div>
  )
} 