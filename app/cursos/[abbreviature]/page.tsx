import { createClient } from '@/utils/supabase/server'
import CourseCard from '@/components/CourseCard'
import { getCurrentUser } from '@/utils/queries'
import Fallback from '@/components/Fallback'

export default async function Page(props: { params: Promise<{ abbreviature: string }> }) {
  const params = await props.params
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
    <div className="animate-in flex-1 flex flex-col gap-8 py-8 px-6 opacity-0 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className='text-3xl font-bold'>Cursos</h1>
        <p className="text-muted-foreground">
          Cursos disponibles para {params.abbreviature}
        </p>
      </div>
      <main className="animate-in grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </main>
    </div>
  )
}
