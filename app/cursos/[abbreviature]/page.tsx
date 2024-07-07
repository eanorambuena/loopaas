import { createClient } from '@/utils/supabase/server'
import CourseCard from '@/components/CourseCard'
import { getCurrentUser } from '@/utils/queries'
import Fallback from '@/components/Fallback'

export default async function Page({ params }: { params: { abbreviature: string } }) {
  const supabase = createClient()
  await getCurrentUser()

  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .eq('abbreviature', params.abbreviature)
    .order('created_at', { ascending: false })

  if (error || !courses || courses?.length === 0)
    return <Fallback>No se encontraron cursos</Fallback>

  return (
    <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3">
      <h1 className='text-3xl font-bold'>Cursos</h1>
      <main className="animate-in grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </main>
    </div>
  )
}
