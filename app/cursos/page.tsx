import { createClient } from '@/utils/supabase/server'
import CourseCard from '@/components/CourseCard'
import { AddCard } from '@/components/AddCard'
import { getCurrentUser, getUserInfo } from '@/utils/queries'
import Fallback from '@/components/Fallback'
import { isProfessorServer } from '@/utils/isProfessorServer'

export default async function CursosPage() {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id)

  const supabase = createClient()

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  const isProfessor = await isProfessorServer({
    userInfoId: userInfo?.id!
  })

  return (
    <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3">
      <h1 className='text-3xl font-bold'>Cursos</h1>
      <main className="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
        {isProfessor && (
          <AddCard title="Nuevo Curso" path="/cursos/nuevo" />
        )}
        {!courses?.length && (
          <Fallback>No se encontraron cursos</Fallback>
        )}
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </main>
    </div>
  )
}
