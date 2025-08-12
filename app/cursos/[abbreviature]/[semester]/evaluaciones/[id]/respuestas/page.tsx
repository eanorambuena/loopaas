'use server'

import { getCurrentUser, getCourse, getEvaluationResponses, getUserInfo } from '@/utils/queries'
import { isProfessorServer } from '@/utils/isProfessorServer'
import Fallback from '@/components/Fallback'
import ResponsesTable from '@/components/responses/ResponsesTable'
import { Console } from '@/utils/console'
import SecondaryLink from '@/components/SecondaryLink'

interface RespuestasPageProps {
  params: Promise<{
    abbreviature: string
    semester: string
    id: string
  }>
}

export default async function Page(props: RespuestasPageProps) {
  const params = await props.params
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

  let responses
  try {
    if (!isCourseProfessor){
      responses = await getEvaluationResponses({ evaluationId: params.id, userInfoId: userInfo.id })
    } else {
      responses = await getEvaluationResponses({ evaluationId: params.id })
    }
    Console.Info(`Fetched ${responses.length} responses for evaluation ${params.id}`)
    if (!responses || responses.length === 0) {
      return <Fallback>No se encontraron respuestas para esta evaluación</Fallback>
    }
  } catch (error) {
    Console.Error(`Error fetching responses: ${error}`)
    return <Fallback>{`Error al obtener respuestas: ${error}`}</Fallback>
  }

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Respuestas de la evaluación</h1>
        {isCourseProfessor && (
          <SecondaryLink href={`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}/estadisticas`}>
            Ver Estadísticas
          </SecondaryLink>
        )}
      </div>
      <ResponsesTable responses={responses} />
    </div>
  )
}
