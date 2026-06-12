import CourseCard from '@/components/CourseCard'
import { getCurrentUser } from '@/utils/queries'
import Fallback from '@/components/Fallback'
import { db } from '@/drizzle/db'
import { courses } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export default async function Page(props: { params: Promise<{ abbreviature: string }> }) {
  const params = await props.params
  await getCurrentUser()

  const coursesData = await db.query.courses.findMany({
    where: eq(courses.abbreviature, params.abbreviature),
  })

  if (!coursesData || coursesData?.length === 0)
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
        {coursesData?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </main>
    </div>
  )
}
