import SecondaryLink from '@/components/SecondaryLink'
import { getCourse, getCurrentUser, getEvaluationWithSections, getIsCourseProfessor, getUserInfo } from '@/utils/queries'
import EvaluationForm from './EvaluationForm'
import Fallback from '@/components/Fallback'
import { UserInfoSchema } from '@/utils/schema'

export default async function Page({ params }: { params: { abbreviature: string, semester: string, id: string } }) {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id) as UserInfoSchema

  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) return <Fallback>No se encontró el curso</Fallback>

  const isCourseProfessor = await getIsCourseProfessor(course, user)
  console.log(user.email, `isCourseProfessor: ${isCourseProfessor}`)

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
      {evaluation && <EvaluationForm evaluation={evaluation} userInfo={userInfo} />}
    </div>
  )
}
