import { APP_NAME, APP_BASE_URL } from '@/lib/constants'
import StatisticsDashboard from '@/components/statistics/StatisticsDashboard'
import { ShareStatsLinkButton } from '@/components/ShareStatsLinkButton'

interface EstadisticasPageProps {
  params: Promise<{
    abbreviature: string
    semester: string
    id: string
  }>
}

export default async function Page(props: EstadisticasPageProps) {
  const params = await props.params
  const publicUrl = `${APP_BASE_URL}/compartir/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}/estadisticas`
  return (
    <div className='p-3 sm:p-4 md:p-6 w-full max-w-screen 6xl mx-auto'>
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between mb-4 sm:mb-6'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold leading-tight'>Estadísticas públicas de la evaluación</h1>
        <ShareStatsLinkButton publicUrl={publicUrl} />
      </div>
      <StatisticsDashboard evaluationId={params.id} />
    </div>
  )
}

export const metadata = {
  title: 'Estadísticas públicas de la evaluación',
  description: `Visualiza y comparte las estadísticas de esta evaluación en ${APP_NAME}.`,
  openGraph: {
    title: 'Estadísticas públicas de la evaluación',
    description: `Visualiza y comparte las estadísticas de esta evaluación en ${APP_NAME}.`,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: `${APP_NAME} Estadísticas`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estadísticas públicas de la evaluación',
    description: `Visualiza y comparte las estadísticas de esta evaluación en ${APP_NAME}.`,
    images: ['/opengraph-image.png'],
  },
}
