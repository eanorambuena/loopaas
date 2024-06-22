import { getCourse } from "@/utils/queries"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: { abbreviature: string, semester: string } }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect("/login")

  const course = await getCourse(params.abbreviature, params.semester)

  if (!course) {
    return (
      <h1 className='text-3xl font-bold'>
        No se encontró el curso
      </h1>
    )
  }

  const { data: userInfo } = await supabase
    .from("userInfo")
    .select("*")
    .eq("userId", user.id)
    .single()

  const isCourseProfessor = userInfo?.id === course.teacherInfoId

  return (
    <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3">
      <h1 className='text-3xl font-bold'>{course.title ?? params.abbreviature} {params.semester}</h1>
      <main className="animate-in  grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        is course professor {isCourseProfessor}
      </main>
    </div>
  )
}
