import StatisticsDashboard from '@/components/statistics/StatisticsDashboard'
import { ShareStatsLinkButton } from '@/components/ShareStatsLinkButton'

interface EstadisticasPageProps {
  params: {
    abbreviature: string
    semester: string
    id: string
  }
}

export default function Page({ params }: EstadisticasPageProps) {
  const publicUrl = `${window.location.origin}/compartir/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}/estadisticas`
  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-3xl font-bold'>Estadísticas públicas de la evaluación</h1>
        <ShareStatsLinkButton publicUrl={publicUrl} />
      </div>
      <StatisticsDashboard evaluationId={params.id} />
    </div>
  )
}
