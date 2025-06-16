import { getCourse, getCurrentUser, getUserInfo, getEvaluationWithSections } from '@/utils/queries'
import { redirect } from 'next/navigation'
import ConfigForm from './ConfigForm'
import Fallback from '@/components/Fallback'
import { isProfessorServer } from '@/utils/isProfessorServer'

interface EvaluationConfigPageProps {
  params: {
    abbreviature: string
    semester: string
    id: string
  }
}

export default async function Page({ params }: EvaluationConfigPageProps) {
  const user = await getCurrentUser()
  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) return <Fallback>No se encontró el curso</Fallback>

  const userInfo = await getUserInfo(user.id, false)
  if (!userInfo || !userInfo.id) return <Fallback>No se encontró el usuario</Fallback>
  
  const isCourseProfessor = await isProfessorServer({
    userInfoId: userInfo.id,
    courseId: course.id
  })
  
  if (!isCourseProfessor) redirect(`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}`)

  const evaluation = await getEvaluationWithSections(params, user)
  
  return (
    <div className='animate-in flex-1 flex flex-col gap-6 p-8 opacity-0 w-full max-w-xl sm:max-w-4xl px-3'>
      <h1 className='text-3xl font-bold'>Configuración de {evaluation.title ?? 'Evaluación'}</h1>
      <ConfigForm evaluation={evaluation} />
    </div>
  )
}
