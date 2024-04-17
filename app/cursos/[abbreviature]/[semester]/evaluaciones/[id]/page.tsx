import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
//import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Question from "@/components/Question"

type Evaluation = {
  title: string
  instructions: string
  deadLine: string
  sections: Record<string, string>
  questions: Record<string, any>
}

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
    .eq("courseId", (_evaluation as any).course_id)
    .neq("userInfoId", userInfo.id)
    .eq("group", student.group)

  console.log(groupStudents)
  if (!groupStudents) return redirect(REDIRECT_PATH)

  const sections = groupStudents.reduce((acc, user) => {
    if (!groupStudents.includes(user.id)) return acc
    return { ...acc, [user.id]: `Por favor, califica a ${user.firstName} ${user.lastName}` }
  }, {})

  const evaluation: any = {
    ..._evaluation,
    sections,
  }

  //const [values, setValues] = useState({})

  const deadLineDay = evaluation.deadLine?.split('-')[2]
  const deadLineMonth = evaluation.deadLine?.split('-')[1]
  const deadLineYear = evaluation.deadLine?.split('-')[0]

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(e)
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
        <main className="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <form onSubmit={ handleSubmit } className='w-full sm:max-w-4xl mx-auto flex flex-col gap-6 bg-slate-100 dark:bg-slate-800 p-6'>
          <h1 className='text-2xl font-bold dark:text-gray-100'>{ evaluation.title }</h1>
          <p className='dark:text-gray-100'>{ evaluation.instructions }</p>
          <p className='dark:text-gray-100'>Fecha límite: { evaluation.deadLine ? `${deadLineDay} / ${deadLineMonth} / ${deadLineYear}` : 'Cargando' } </p>
          { Object.entries(evaluation.sections).map(([sectionKey, sectionValue]) => (
            <fieldset key={ sectionKey } className='w-full'>
              <legend className='text-lg font-bold dark:text-gray-100'>{ sectionValue as any }</legend>
              { Object.entries(evaluation.questions ?? {}).map(([questionKey, question]) => (
                <Question
                  id={`${sectionKey}-${questionKey}`}
                  key={`${sectionKey}-${questionKey}`}
                  question={ question as any }
                  sectionKey={ sectionKey }
                />
              ))}
            </fieldset>
          ))}
          <button type='submit' className='w-full bg-purple-950 text-white font-bold py-2 rounded-md'>Enviar</button>
        </form>
        </main>
      </div>
      <Footer />
    </div>
  )
}
