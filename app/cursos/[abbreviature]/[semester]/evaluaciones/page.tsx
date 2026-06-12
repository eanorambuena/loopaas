import EvaluationCard from '@/components/EvaluationCard'
import Fallback from '@/components/Fallback'
import { getCurrentUser, getUserInfo } from '@/utils/queries'
import { AddCard } from '@/components/AddCard'
import { isProfessorServer } from '@/utils/isProfessorServer'
import { db } from '@/drizzle/db'
import { courses, evaluations } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

export default async function Page(props: { params: Promise<{ abbreviature: string, semester: string }> }) {
  const params = await props.params
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id)

  const isProfessor = await isProfessorServer({
    userInfoId: userInfo?.id!
  })

  const coursesData = await db.query.courses.findMany({
    where: and(eq(courses.abbreviature, params.abbreviature), eq(courses.semester, params.semester)),
  })

  if (!coursesData || coursesData?.length === 0)
    return <Fallback>No se encontró el curso</Fallback>

  const courseEvaluationsData = await db.query.evaluations.findMany({
    where: eq(evaluations.courseId, coursesData?.[0].id),
  })

  const thereIsNoEvaluations = !courseEvaluationsData || courseEvaluationsData?.length === 0
  if (thereIsNoEvaluations && !isProfessor)
    return <Fallback>No se encontraron evaluaciones</Fallback>

  return (
    <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3">
      <h1 className='text-3xl font-bold'>Evaluaciones {coursesData?.[0].title ?? params.abbreviature} {params.semester}</h1>
      <main className="animate-in grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {isProfessor && (
          <AddCard
            title="Nueva Evaluación"
            className="[&_h3]:text-center"
            path={`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/nuevo`}
          />
        )}
        {courseEvaluationsData?.map((courseEvaluation) => (
          <EvaluationCard key={courseEvaluation.id} evaluation={courseEvaluation} params={params} />
        ))}
      </main>
    </div>
  )
}
