'use server'

import { getCurrentUser, getCourse, getEvaluationResponses, getUserInfo } from '@/utils/queries'
import { isProfessorServer } from '@/utils/isProfessorServer'
import { redirect } from 'next/navigation'
import Fallback from '@/components/Fallback'
import { Console } from '@/utils/console'
import { Evaluation } from '@/utils/schema'
import { getEvaluationByParams } from '@/utils/queries'
import StatisticsDashboard from '@/components/statistics/StatisticsDashboard'

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
      <h1 className='text-3xl font-bold mb-6'>Estadísticas de {evaluation.title}</h1>
      <StatisticsDashboard evaluation={evaluation} responses={responses} />
    </div>
  )
} 