import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Form, { Evaluation } from "@/components/Form"

export default async function Page({ params }: { params: { abbreviature: string, semester: string, id: string } }) {
  const supabase = createClient()
  const REDIRECT_PATH = `/cursos/${params.abbreviature}/${params.semester}/evaluaciones`

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  const { data: _evaluation } = await supabase
    .from("evaluations")
    .select("*")
    .eq("id", params.id)
    .single()

  console.log("evaluation", _evaluation)
  if (!_evaluation) return redirect(REDIRECT_PATH)

  const { data: userInfo } = await supabase
    .from("userInfo")
    .select("*")
    .eq("userId", user.id)
    .single()

  console.log("userInfo", userInfo)
  if (!userInfo) return redirect(REDIRECT_PATH)

  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("courseId", _evaluation.courseId)
    .eq("userInfoId", userInfo.id)
    .single()

  console.log("student", student)
  if (!student) return redirect(REDIRECT_PATH)

  const { data: groupStudents } = await supabase
    .from("students")
    .select("*")
    .eq("courseId", _evaluation.courseId)
    .neq("userInfoId", userInfo.id)
    .eq("group", student.group)

  console.log("groupStudents", groupStudents)
  if (!groupStudents) return redirect(REDIRECT_PATH)

  const sections = groupStudents.reduce((acc, user) => {
    if (!groupStudents.includes(user.id)) return acc
    return { ...acc, [user.id]: `Por favor, califica a ${user.firstName} ${user.lastName}` }
  }, {})

  const evaluation: any = {
    ..._evaluation,
    sections,
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center hidden">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <Header />
      </div>

      <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3">
        <h1 className='text-3xl font-bold'>{evaluation.title}</h1>
        <Form evaluation={evaluation as Evaluation} />
      </div>

      <Footer />
    </div>
  )
}
