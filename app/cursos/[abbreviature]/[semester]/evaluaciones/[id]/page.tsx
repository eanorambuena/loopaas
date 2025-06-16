import SecondaryLink from '@/components/SecondaryLink'
import { getCourse, getCurrentUser, getEvaluationWithSections, getUserInfo, isStudentInCourse } from '@/utils/queries'
import EvaluationForm from './EvaluationForm'
import Fallback from '@/components/Fallback'
import { UserInfoSchema } from '@/utils/schema'
import { isProfessorServer } from '@/utils/isProfessorServer'

export default async function Page({ params }: { params: { abbreviature: string, semester: string, id: string } }) {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id) as UserInfoSchema
  if (!userInfo.id) return <Fallback>No se encontró tu información de usuario</Fallback>

  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) return <Fallback>No se encontró el curso</Fallback>

  const isCourseProfessor = await isProfessorServer({
    userInfoId: userInfo.id,
    courseId: course.id
  })
  console.log(`Answering evaluation ${user.email}, isCourseProfessor: ${isCourseProfessor}`)

  if (!await isStudentInCourse(course.id, userInfo.id)) {
    return <Fallback>Debes estar inscrito en el curso para ver esta evaluación</Fallback>
  }

  let evaluation
  try {
    evaluation = await getEvaluationWithSections(params, user)
    if (!evaluation) {
      return <Fallback>No se encontró la evaluación</Fallback>
    }
  }
  catch (error) {
    console.error('Error fetching evaluation:', error)
    return <Fallback>{`Error ${error}`}</Fallback>
  }

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
      <SecondaryLink href={`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}/respuestas`}>
        {isCourseProfessor ? 'Ver Respuestas' : 'Mis Respuestas'}
      </SecondaryLink>
      {evaluation && (
        <>
          {isCourseProfessor && <p className='text-gray-500'>Vista previa de la evaluación:</p>}
          <EvaluationForm evaluation={evaluation} userInfo={userInfo} />
        </>
      )}
    </div>
  )
}
