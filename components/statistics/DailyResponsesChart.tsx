'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { DailyResponse } from './types'

interface DailyResponsesChartProps {
  dailyData: DailyResponse[]
}

export default function DailyResponsesChart({ dailyData }: DailyResponsesChartProps) {
  if (dailyData.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Respuestas por Día</CardTitle>
        <CardDescription>
          Distribución de respuestas a lo largo del tiempo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
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
                borderRadius: '6px',
                color: 'hsl(var(--foreground))'
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
  )
} 