import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import CourseCard from '@/components/CourseCard'

export default async function Page({ params }: { params: { abbreviature: string } }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('abbreviature', params.abbreviature)
    .order('created_at', { ascending: false })

  if (courses?.length === 0) {
    return (
      <h1 className='text-3xl font-bold'>
        No se encontraron cursos
      </h1>
    )
  }

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
