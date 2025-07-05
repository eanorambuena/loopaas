import EvaluationCard from '@/components/EvaluationCard'
import Fallback from '@/components/Fallback'
import { getCurrentUser, getUserInfo } from '@/utils/queries'
import { createClient } from '@/utils/supabase/server'
import { AddCard } from '@/components/AddCard'
import { isProfessorServer } from '@/utils/isProfessorServer'

export default async function Page({ params }: { params: { abbreviature: string, semester: string } }) {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id)

  const isProfessor = await isProfessorServer({
    userInfoId: userInfo?.id!
  })

  const supabase = createClient()

  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('*')
    .eq('abbreviature', params.abbreviature)
    .eq('semester', params.semester)
    .order('created_at', { ascending: false })
  if (coursesError || !courses || courses?.length === 0)
    return <Fallback>No se encontró el curso</Fallback>

  const { data: courseEvaluations, error: courseEvaluationsError } = await supabase
    .from('evaluations')
    .select('*')
    .eq('courseId', courses?.[0].id)
    .order('created_at', { ascending: false })

  const thereIsNoEvaluations = courseEvaluationsError || !courseEvaluations || courseEvaluations?.length === 0
  if (thereIsNoEvaluations && !isProfessor)
    return <Fallback>No se encontraron evaluaciones</Fallback>

  return (
    <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3">
      <h1 className='text-3xl font-bold'>Evaluaciones {courses?.[0].title ?? params.abbreviature} {params.semester}</h1>
      <main className="animate-in grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {isProfessor && (
          <AddCard
            title="Nueva Evaluación"
            className="[&_h3]:text-center"
            path={`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/nuevo`}
          />
        )}
        {courseEvaluations?.map((courseEvaluation) => (
          <EvaluationCard key={courseEvaluation.id} evaluation={courseEvaluation} params={params} />
        ))}
      </main>
    </div>
  )
}
