'use client'

import { useEffect, useState } from 'react'
import { Evaluation, Response } from '@/utils/schema'
import { Card } from '@/components/ui/card'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface StatisticsDashboardProps {
  evaluation: Evaluation
  responses: Response[]
}

interface GroupStats {
  group: string
  uniqueUsers: number
  totalResponses: number
}

export default function StatisticsDashboard({ evaluation, responses }: StatisticsDashboardProps) {
  const [groupStats, setGroupStats] = useState<GroupStats[]>([])

  useEffect(() => {
    // Calcular estadísticas por grupo
    const groupMap = new Map<string, { userInfoIds: Set<string>, responses: Response[] }>()
    
    responses.forEach(response => {
      const group = response.group || 'Sin Grupo'
      if (!groupMap.has(group)) {
        groupMap.set(group, { userInfoIds: new Set(), responses: [] })
      }
      const groupData = groupMap.get(group)!
      groupData.userInfoIds.add(response.userInfoId)
      groupData.responses.push(response)
    })

    const stats: GroupStats[] = Array.from(groupMap.entries()).map(([group, data]) => ({
      group: `Grupo ${group}`,
      uniqueUsers: data.userInfoIds.size,
      totalResponses: data.responses.length
    })).sort((a, b) => {
      // Ordenar por número de grupo (extraer el número del string "Grupo X")
      const groupA = parseInt(a.group.replace('Grupo ', '')) || 0
      const groupB = parseInt(b.group.replace('Grupo ', '')) || 0
      return groupA - groupB
    })

    setGroupStats(stats)
  }, [responses])

  // Verificar que evaluation existe
  if (!evaluation) {
    return (
      <div className='space-y-6'>
        <Card className='p-6'>
          <p className='text-center text-gray-500'>No se pudo cargar la información de la evaluación</p>
        </Card>
      </div>
    )
  }

  const chartData = groupStats.map(stat => ({
    group: stat.group,
    uniqueUsers: stat.uniqueUsers,
    totalResponses: stat.totalResponses,
    fill: 'var(--chart-1)'
  }))

  const chartConfig = {
    visitors: {
      label: 'Usuarios Únicos',
      color: 'hsl(var(--chart-1))',
    },
    chrome: {
      label: 'Total Respuestas',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig

  const totalUniqueUsers = new Set(responses.map(r => r.userInfoId)).size
  const totalResponses = responses.length
  const uniqueGroups = new Set(responses.map(r => r.group).filter(Boolean)).size

  return (
    <div className='space-y-6'>
      {/* Resumen general */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card className='p-6'>
          <h3 className='text-lg font-semibold text-gray-700'>Total de Respuestas</h3>
          <p className='text-3xl font-bold text-blue-600'>{totalResponses}</p>
        </Card>
        <Card className='p-6'>
          <h3 className='text-lg font-semibold text-gray-700'>Usuarios Únicos</h3>
          <p className='text-3xl font-bold text-green-600'>{totalUniqueUsers}</p>
        </Card>
        <Card className='p-6'>
          <h3 className='text-lg font-semibold text-gray-700'>Grupos Participantes</h3>
          <p className='text-3xl font-bold text-purple-600'>{uniqueGroups}</p>
        </Card>
      </div>

      {/* Gráfico */}
      <Card className='p-6'>
        <h3 className='text-lg font-semibold mb-4'>Respuestas por Grupo</h3>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey='group'
              type='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey='uniqueUsers' type='number' hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey='uniqueUsers' radius={5} fill='hsl(var(--chart-1))' />
          </BarChart>
        </ChartContainer>
      </Card>

      {/* Tabla de estadísticas detalladas */}
      <Card className='p-6'>
        <h3 className='text-lg font-semibold mb-4'>Estadísticas por Grupo</h3>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='border border-gray-300 px-4 py-2 text-left'>Grupo</th>
                <th className='border border-gray-300 px-4 py-2 text-center'>Usuarios Únicos</th>
                <th className='border border-gray-300 px-4 py-2 text-center'>Total Respuestas</th>
                <th className='border border-gray-300 px-4 py-2 text-center'>Promedio por Usuario</th>
              </tr>
            </thead>
            <tbody>
              {groupStats.map((stat, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className='border border-gray-300 px-4 py-2'>{stat.group}</td>
                  <td className='border border-gray-300 px-4 py-2 text-center'>{stat.uniqueUsers}</td>
                  <td className='border border-gray-300 px-4 py-2 text-center'>{stat.totalResponses}</td>
                  <td className='border border-gray-300 px-4 py-2 text-center'>
                    {stat.uniqueUsers > 0 ? (stat.totalResponses / stat.uniqueUsers).toFixed(2) : '0'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
} 