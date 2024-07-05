import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import EvaluationCard from '@/components/EvaluationCard'

export default async function Page({ params }: { params: { abbreviature: string, semester: string } }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('abbreviature', params.abbreviature)
    .eq('semester', params.semester)
    .order('created_at', { ascending: false })

  if (courses?.length === 0) {
    return <div>Course not found</div>
  }

  const { data: courseEvaluations } = await supabase
    .from('evaluations')
    .select('*')
    .eq('courseId', courses?.[0].id)
    .order('created_at', { ascending: false })

  return (
    <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3">
      <h1 className='text-3xl font-bold'>Evaluaciones {courses?.[0].title ?? params.abbreviature} {params.semester}</h1>
      <main className="animate-in grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {courseEvaluations?.map((courseEvaluation) => (
          <EvaluationCard key={courseEvaluation.id} evaluation={courseEvaluation} params={params} />
        ))}
      </main>
    </div>
  )
}
