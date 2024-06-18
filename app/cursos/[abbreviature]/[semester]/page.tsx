import Card from "@/components/Card"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import EvaluationIcon from "@/components/icons/EvaluationIcon"
import UsersIcon from "@/components/icons/EvaluationIcon copy"
import { evaluationPath, studentsPath } from "@/utils/paths"
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

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <Header />
      <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3">
        <h1 className='text-3xl font-bold'>{course.title ?? params.abbreviature} {params.semester}</h1>
        <main className="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Card icon={EvaluationIcon} title="Evaluaciones" path={evaluationPath(params)} />
          <Card icon={UsersIcon} title="Estudiantes" path={studentsPath(params)} />
        </main>
      </div>
      <Footer />
    </div>
  )
}
