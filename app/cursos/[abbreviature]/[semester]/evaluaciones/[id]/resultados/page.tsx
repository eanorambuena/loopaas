import Fallback from '@/components/Fallback'
import { getCourse, getCourseStudents, getCurrentUser, getEvaluationByParams } from '@/utils/queries'
import { ResultsDisplay } from '@/components/results/ResultsDisplay'
import { isDeadlinePassed } from '@/utils/dateUtils'

interface Props {
  params: {
    abbreviature: string
    semester: string
    id: string
  }
}

export default async function Page({ params }: Props) {
  await getCurrentUser()

  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) return <Fallback>No se encontró el curso</Fallback>

  const students = await getCourseStudents({ course })
  if (!students || students?.length === 0)
    return <Fallback>No hay estudiantes inscritos en el curso</Fallback>

  const evaluation = await getEvaluationByParams(params)
  if (!evaluation) return <Fallback>No se encontró la evaluación</Fallback>
  
  return (
    <div className='animate-in flex-1 flex flex-col gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-8 opacity-0'>
      <h1 className='text-xl sm:text-2xl md:text-3xl font-bold break-words leading-tight'>{evaluation.title}</h1>
      {!isDeadlinePassed(evaluation.deadLine) && (
        <p className='text-red-500 w-full text-xs sm:text-sm md:text-base'>Advertencia: La evaluación aún no ha finalizado</p>
      )}
      <ResultsDisplay evaluation={evaluation} students={students} abbreviature={params.abbreviature} semester={params.semester} />
    </div>
  )
}
