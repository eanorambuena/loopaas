import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { fetchGroups } from "@/utils/canvas"
import { getCourse, createCourseStudents, getCourseStudents } from "@/utils/queries"
import SecondaryButton from "@/components/SecondaryButton"

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

  async function saveStudents() {
    "use server"
    console.log({ groups })
    await createCourseStudents(course, groups)
  }

  return (
    <div className="animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 px-3">
      <h1 className='text-3xl font-bold'>Estudiantes {course.title ?? params.abbreviature} {params.semester}</h1>
      <form>
        <SecondaryButton
          className="w-full"
          type="submit"
          formAction={saveStudents}
          pendingText="Guardando estudiantes..."
        >
          Obtener estudiantes de Canvas
        </SecondaryButton>
      </form>
      <table className="table-auto">
        <thead>
          <tr className="text-left *:px-6 *:py-3">
            <th>Nombre</th>
            <th>Correo</th>
            <th>Grupo</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {students.map((student) => (
            <tr key={student.id} className="*:px-6 *:py-3">
              <td>{student.userInfo?.firstName} {student.userInfo?.lastName}</td>
              <td>{student.userInfo?.email}</td>
              <td>{student.group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}