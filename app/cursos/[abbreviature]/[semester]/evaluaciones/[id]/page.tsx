import SecondaryLink from '@/components/SecondaryLink'
import { getCourse, getCurrentUser, getEvaluationWithSections, getIsCourseProfessor, getUserInfo } from '@/utils/queries'
import EvaluationForm from './EvaluationForm'

export default async function Page({ params }: { params: { abbreviature: string, semester: string, id: string } }) {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id)
  if (!userInfo) {
    return (
      <h1 className='text-3xl font-bold'>
        No se encontró el usuario
      </h1>
    )
  }
  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) {
    return (
      <h1 className='text-3xl font-bold'>
        No se encontró el curso
      </h1>
    )
  }
  const isCourseProfessor = await getIsCourseProfessor(course, user)
  const evaluation = await getEvaluationWithSections(params, user)

  return (
    <div className='animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3'>
      <h1 className='text-3xl font-bold'>{evaluation.title}</h1>
      {isCourseProfessor && (
        <div className='flex gap-4'>
          <SecondaryLink href={`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}/configuracion`}>
            Configurar Evaluación
          </SecondaryLink>
          <SecondaryLink href={`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}/resultados`}>
            Resultados
          </SecondaryLink>
        </div>
      )}
      <EvaluationForm evaluation={evaluation} userInfoId={userInfo.id} />
    </div>
  )
}
