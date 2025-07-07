'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GeneralStats } from './types'

interface GeneralStatsCardsProps {
  stats: GeneralStats
}

export default function GeneralStatsCards({ stats }: GeneralStatsCardsProps) {
  return (
    <div className='grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-xs sm:text-sm font-medium'>Total Respuestas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-xl sm:text-2xl font-bold'>{stats.totalResponses}</div>
          <p className='text-xs text-muted-foreground'>
            {stats.activeDays} días activos
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-xs sm:text-sm font-medium'>Estudiantes que Respondieron</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-xl sm:text-2xl font-bold'>{stats.uniqueStudents}</div>
          <p className='text-xs text-muted-foreground'>
            de {stats.totalStudents} total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-xs sm:text-sm font-medium'>Tasa de Respuesta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-xl sm:text-2xl font-bold'>{stats.responseRate}%</div>
          <p className='text-xs text-muted-foreground'>
            participación general
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-xs sm:text-sm font-medium'>Promedio por Día</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-xl sm:text-2xl font-bold'>{stats.averageResponsesPerDay}</div>
          <p className='text-xs text-muted-foreground'>
            respuestas diarias
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 