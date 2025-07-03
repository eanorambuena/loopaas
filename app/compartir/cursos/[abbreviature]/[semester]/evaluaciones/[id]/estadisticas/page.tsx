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
  const publicUrl = `${process.env.NEXT_PUBLIC_APP_URL}/compartir/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}/estadisticas`
  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='flex gap-4 items-center justify-between mb-6'>
        <h1 className='text-3xl font-bold'>Estadísticas públicas de la evaluación</h1>
        <ShareStatsLinkButton publicUrl={publicUrl} />
      </div>
      <StatisticsDashboard evaluationId={params.id} />
    </div>
  )
}

export const metadata = {
  title: 'Estadísticas públicas de la evaluación',
  description: 'Visualiza y comparte las estadísticas de esta evaluación en IDSApp.',
  openGraph: {
    title: 'Estadísticas públicas de la evaluación',
    description: 'Visualiza y comparte las estadísticas de esta evaluación en IDSApp.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'IDSApp Estadísticas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estadísticas públicas de la evaluación',
    description: 'Visualiza y comparte las estadísticas de esta evaluación en IDSApp.',
    images: ['/opengraph-image.png'],
  },
}
