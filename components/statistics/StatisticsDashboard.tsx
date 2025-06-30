'use client'

import { useEffect, useRef, useState } from 'react'
import { Evaluation, Response } from '@/utils/schema'
import { Card } from '@/components/ui/card'

interface StatisticsDashboardProps {
  evaluation: Evaluation
  responses: Response[]
}

interface SectionStats {
  sectionTitle: string
  uniqueUsers: number
  totalResponses: number
}

export default function StatisticsDashboard({ evaluation, responses }: StatisticsDashboardProps) {
  const [sectionStats, setSectionStats] = useState<SectionStats[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

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

  useEffect(() => {
    // Calcular estadísticas por sección
    const stats: SectionStats[] = (evaluation.sections || []).map(section => {
      const sectionResponses = responses.filter(response => {
        try {
          const data = JSON.parse(response.data)
          return data.some((item: any) => item.sectionKey === section.mateId)
        } catch {
          return false
        }
      })

      const uniqueUsers = new Set(sectionResponses.map(r => r.userInfoId)).size
      const totalResponses = sectionResponses.length

      return {
        sectionTitle: section.title,
        uniqueUsers,
        totalResponses
      }
    })

    setSectionStats(stats)
  }, [evaluation, responses])

  useEffect(() => {
    if (!canvasRef.current || sectionStats.length === 0) return

    // Importar Chart.js dinámicamente
    const loadChart = async () => {
      const { Chart, registerables } = await import('chart.js/auto')
      Chart.register(...registerables)

      if (chartRef.current) {
        chartRef.current.destroy()
      }

      const ctx = canvasRef.current!.getContext('2d')
      if (!ctx) return

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: sectionStats.map(stat => stat.sectionTitle),
          datasets: [
            {
              label: 'Usuarios Únicos',
              data: sectionStats.map(stat => stat.uniqueUsers),
              backgroundColor: 'rgba(34, 197, 94, 0.8)',
              borderColor: 'rgba(34, 197, 94, 1)',
              borderWidth: 1
            },
            {
              label: 'Total de Respuestas',
              data: sectionStats.map(stat => stat.totalResponses),
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Respuestas por Sección',
              font: {
                size: 16
              }
            },
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Secciones'
              }
            }
          }
        }
      })
    }

    loadChart()

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [sectionStats])

  const totalUniqueUsers = new Set(responses.map(r => r.userInfoId)).size
  const totalResponses = responses.length

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
          <h3 className='text-lg font-semibold text-gray-700'>Secciones</h3>
          <p className='text-3xl font-bold text-purple-600'>{evaluation.sections?.length || 0}</p>
        </Card>
      </div>

      {/* Gráfico */}
      <Card className='p-6'>
        <canvas ref={canvasRef} />
      </Card>

      {/* Tabla de estadísticas detalladas */}
      <Card className='p-6'>
        <h3 className='text-lg font-semibold mb-4'>Estadísticas por Sección</h3>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='border border-gray-300 px-4 py-2 text-left'>Sección</th>
                <th className='border border-gray-300 px-4 py-2 text-center'>Usuarios Únicos</th>
                <th className='border border-gray-300 px-4 py-2 text-center'>Total Respuestas</th>
                <th className='border border-gray-300 px-4 py-2 text-center'>Promedio por Usuario</th>
              </tr>
            </thead>
            <tbody>
              {sectionStats.map((stat, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className='border border-gray-300 px-4 py-2'>{stat.sectionTitle}</td>
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