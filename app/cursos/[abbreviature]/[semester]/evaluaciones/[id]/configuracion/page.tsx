import { getCourse, getCurrentUser, getEvaluation, getIsCourseProfessor } from '@/utils/queries'
import { redirect } from 'next/navigation'
import ConfigForm from './ConfigForm'

export default async function Page({ params }: { params: { abbreviature: string, semester: string, id: string } }) {
  const user = await getCurrentUser()
  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) {
    return (
      <h1 className='text-3xl font-bold'>
        No se encontró el curso
      </h1>
    )
  }
  const isCourseProfessor = await getIsCourseProfessor(course, user)
  if (!isCourseProfessor) redirect(`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}`)

  const evaluation = await getEvaluation(params, user)

  return (
    <div className='animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3'>
      <h1 className='text-3xl font-bold'>{evaluation.title}</h1>
      <ConfigForm evaluation={evaluation} />
    </div>
  )
}
