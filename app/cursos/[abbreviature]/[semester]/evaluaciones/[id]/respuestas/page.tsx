'use server'

import { getCurrentUser, getCourse, getEvaluationResponses, getUserInfoById, getUserInfo } from '@/utils/queries'
import { isProfessorServer } from '@/utils/isProfessorServer'
import { redirect } from 'next/navigation'
import Fallback from '@/components/Fallback'
import ResponsesTable from '@/components/responses/ResponsesTable'
import { Console } from '@/utils/console'

interface RespuestasPageProps {
  params: {
    abbreviature: string
    semester: string
    id: string
  }
}

export default async function Page({ params }: RespuestasPageProps) {
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
  
  if (!isCourseProfessor) redirect(`/cursos/${params.abbreviature}/${params.semester}`)

  let responses
  try {
    responses = await getEvaluationResponses(params.id)
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
      <h1 className='text-2xl font-bold mb-4'>Respuestas de la evaluación</h1>
      <ResponsesTable responses={responses} />
    </div>
  )
}
