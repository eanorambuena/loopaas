'use server'

import Fallback from '@/components/Fallback'
import { ShareStatsLinkButton } from '@/components/ShareStatsLinkButton'
import StatisticsDashboard from '@/components/statistics/StatisticsDashboard'
import { Console } from '@/utils/console'
import { isProfessorServer } from '@/utils/isProfessorServer'
import { getCourse, getCurrentUser, getEvaluationByParams, getEvaluationResponses, getUserInfo } from '@/utils/queries'
import { Evaluation } from '@/utils/schema'
import { redirect } from 'next/navigation'

interface EstadisticasPageProps {
  params: {
    abbreviature: string
    semester: string
    id: string
  }
}

export default async function Page({ params }: EstadisticasPageProps) {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id, false)
  const publicUrl = `${process.env.NEXT_PUBLIC_APP_URL}/compartir/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}/estadisticas`

  if (!userInfo || !userInfo.id) {
    Console.Error(`UserInfo not found for user ${user.email}`)
    return <Fallback>No se encontró tu información de usuario</Fallback>
  }

  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) return <Fallback>No se encontró el curso</Fallback>

  const isCourseProfessor = await isProfessorServer({
    userInfoId: userInfo.id,
    courseId: course.id
  })
  
  if (!isCourseProfessor) {
    redirect(`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}/respuestas`)
  }

  let evaluation: Evaluation
  try {
    evaluation = await getEvaluationByParams(params) as Evaluation
    if (!evaluation) return <Fallback>No se encontró la evaluación</Fallback>
  } catch (error) {
    Console.Error(`Error al obtener la evaluación: ${error}`)
    return <Fallback>Error al cargar la evaluación</Fallback>
  }

  let responses
  try {
    responses = await getEvaluationResponses({ evaluationId: params.id })
    Console.Info(`Fetched ${responses.length} responses for evaluation ${params.id}`)
    if (!responses || responses.length === 0) {
      return <Fallback>No se encontraron respuestas para esta evaluación</Fallback>
    }
  } catch (error) {
    Console.Error(`Error fetching responses: ${error}`)
    return <Fallback>{`Error al obtener respuestas: ${error}`}</Fallback>
  }

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='flex gap-4 items-center justify-between mb-6'>
        <h1 className='text-3xl font-bold'>Estadísticas de {evaluation.title}</h1>
        <ShareStatsLinkButton publicUrl={publicUrl} />
      </div>
      <StatisticsDashboard evaluationId={params.id} />
    </div>
  )
}
