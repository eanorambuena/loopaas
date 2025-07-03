'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { TemporalStats } from './types'

interface TemporalAnalysisProps {
  temporalStats: TemporalStats
}

const COLORS = ['#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22']

export default function TemporalAnalysis({ temporalStats }: TemporalAnalysisProps) {
  return (
    <>
      {/* Análisis Temporal */}
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        {/* Hora del día */}
        <Card>
          <CardHeader>
            <CardTitle>Respuestas por Hora del Día</CardTitle>
            <CardDescription>
              Distribución de respuestas a lo largo del día
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={temporalStats.hourOfDay}>
                <CartesianGrid strokeDasharray="3 3" className='stroke-muted' />
                <XAxis 
                  dataKey="hour" 
                  className='text-xs text-muted-foreground'
                  tickFormatter={(value) => `${value}:00`}
                />
                <YAxis className='text-xs text-muted-foreground' />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))'
                  }}
                  labelFormatter={(value) => `${value}:00`}
                  formatter={(value, name) => [value, 'Respuestas']}
                />
                <Bar 
                  dataKey="responses" 
                  className='fill-emerald-400 dark:fill-emerald-600'
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Día de la semana */}
        <Card>
          <CardHeader>
            <CardTitle>Respuestas por Día de la Semana</CardTitle>
            <CardDescription>
              Actividad a lo largo de la semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={temporalStats.dayOfWeek}>
                <CartesianGrid strokeDasharray="3 3" className='stroke-muted' />
                <XAxis 
                  dataKey="day" 
                  className='text-xs text-muted-foreground'
                />
                <YAxis className='text-xs text-muted-foreground' />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value, name) => [value, 'Respuestas']}
                />
                <Bar 
                  dataKey="responses" 
                  className='fill-emerald-400 dark:fill-emerald-600'
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Distribución por períodos y picos de actividad */}
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        {/* Distribución por períodos */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Períodos</CardTitle>
            <CardDescription>
              Respuestas por mañana, tarde, noche y madrugada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={temporalStats.timeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ period, percentage }) => `${period} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="responses"
                >
                  {temporalStats.timeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value, name) => [value, 'Respuestas']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Picos de actividad */}
        <Card>
          <CardHeader>
            <CardTitle>Peaks de Actividad</CardTitle>
            <CardDescription>
              Horas y días con mayor actividad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div>
                <h4 className='font-medium mb-2'>Horas Peak</h4>
                <div className='space-y-2'>
                  {temporalStats.peakHours.map((peak, index) => (
                    <div key={peak.hour} className='flex justify-between items-center'>
                      <span className='text-sm'>{peak.hour}:00</span>
                      <span className='text-sm font-medium'>{peak.responses} respuestas</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className='font-medium mb-2'>Días Peak</h4>
                <div className='space-y-2'>
                  {temporalStats.peakDays.map((peak, index) => (
                    <div key={peak.day} className='flex justify-between items-center'>
                      <span className='text-sm'>{peak.day}</span>
                      <span className='text-sm font-medium'>{peak.responses} respuestas</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
} 