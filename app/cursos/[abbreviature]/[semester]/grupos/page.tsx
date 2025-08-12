import GroupsManager from '@/components/groups/GroupsManager'
import { getCourse, getCourseStudents } from '@/utils/queries'
import { redirect } from 'next/navigation'
import Fallback from '@/components/Fallback'

export default async function GruposPage(props: { params: Promise<{ abbreviature: string, semester: string }> }) {
  const params = await props.params
  let course
  try {
    course = await getCourse(params.abbreviature, params.semester)
    if (!course) return <Fallback>No se encontró el curso</Fallback>
  } catch (error) {
    return <Fallback>Error al cargar el curso</Fallback>
  }

  let students
  try {
    students = course && (await getCourseStudents({ course }))
  } catch (error) {
    return <Fallback>Error al cargar los estudiantes</Fallback>
  }

  if (!students) return <Fallback>No hay estudiantes en este curso</Fallback>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Grupos</h1>
      <GroupsManager students={students} course={course} />
    </div>
  )
}
