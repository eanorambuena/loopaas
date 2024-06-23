import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { fetchGroups } from "@/utils/canvas"
import { getCourse, getCourseStudents, getEvaluation, getGrades } from "@/utils/queries"

interface Props {
  params: {
    abbreviature: string
    semester: string
    id: string
  }
}

export default async function Page({ params }: Props) {
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

  const students = await getCourseStudents(course)
  if (students?.length === 0 || !students) {
    return (
      <h1 className='text-3xl font-bold'>
        No hay estudiantes inscritos en el curso
      </h1>
    )
  }

  const groups = await fetchGroups(course)

  for (const group of groups) {
    for (const student of group.students) {
      const studentIndex = students.findIndex(({ id }) => id === student.id)
      if (studentIndex !== -1) {
        students[studentIndex].group = group.name
      }
    }
  }

  const evaluation = await getEvaluation(params, user)

  for (const student of students) {
    const grades = await getGrades(evaluation, student.userInfoId)
    student.groupGrade = grades?.groupGrade ?? 'N/A'
    student.coGrade = grades?.evaluationGrade ?? 'N/A'
    student.finalGrade = grades?.finalGrade ?? 'N/A'
  }

  return (
    <div className="animate-in flex-1 flex flex-col gap-6 p-8 opacity-0">
      <h1 className='text-3xl font-bold'>Resultados {evaluation.title}</h1>
      <table className="table-auto text-sm sm:text-inherit max-w-[95%]">
        <thead className="h-fit">
          <tr className="sm:text-left sm:*:px-6 *:py-3">
            <th className="hidden sm:table-cell">Nombre</th>
            <th>Correo</th>
            <th className="hidden sm:table-cell">Grupo</th>
            <th className="hidden sm:table-cell">Nota Grupal</th>
            <th className="hidden sm:table-cell">Coevaluación</th>
            <th className="table-cell sm:hidden">Coev.</th>
            <th className="hidden sm:table-cell">Nota Final</th>
            <th className="table-cell sm:hidden">Nota</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {students.map((student) => (
            <tr key={student.id} className="sm:*:px-6 *:py-3">
              <td className="hidden sm:table-cell">{student.userInfo?.firstName} {student.userInfo?.lastName}</td>
              <td>{student.userInfo?.email}</td>
              <td className="hidden sm:table-cell">{student.group}</td>
              <td className="hidden sm:table-cell">{student.groupGrade}</td>
              <td>{student.coGrade}</td>
              <td>{student.finalGrade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
