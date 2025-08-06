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
    <div className="animate-in flex flex-col justify-center items-center gap-6 p-6 opacity-0 w-full max-w-7xl mx-auto px-3">
      <h1 className='text-3xl font-bold'>Cursos</h1>
      <main className="w-full">
        {!courses?.length && !isProfessor && (
          <Fallback>No se encontraron cursos</Fallback>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {isProfessor && (
            <AddCard title="Nuevo Curso" path="/cursos/nuevo" className="text-center size-[18rem]" />
          )}
          {courses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  )
}
