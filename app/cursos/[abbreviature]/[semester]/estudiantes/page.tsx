'use server'

import Fallback from '@/components/Fallback'
import { getCourse, getCourseStudents, getCurrentUser } from '@/utils/queries'
import UploadStudentsForm from './UploadStudentsForm'
import { Console } from '@/utils/console'
import StudentsTable from '../../../../../components/students/StudentsTable'

export default async function Page({ params }: { params: { abbreviature: string, semester: string } }) {
  try {
    await getCurrentUser()
  }
  catch (error) {
    Console.Error(`Error al obtener el usuario actual: ${error}`)
    return <Fallback>Error al cargar el usuario</Fallback>
  }

  let course
  try {
    course = await getCourse(params.abbreviature, params.semester)
    if (!course) return <Fallback>No se encontró el curso</Fallback>
  }
  catch (error) {
    Console.Error(`Error al obtener el curso: ${error}`)
    return <Fallback>Error al cargar el curso</Fallback>
  }

  let students
  try {
    students = course && await getCourseStudents({ course })
    if (!students ||students?.length === 0)
      return <Fallback>No hay estudiantes inscritos en el curso</Fallback>
  }
  catch (error) {
    Console.Error(`Error al obtener los estudiantes: ${error}`)
    return <Fallback>Error al cargar los estudiantes</Fallback>
  }

  return (
    <div className='animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 px-3'>
      <h1 className='text-3xl font-bold'>Estudiantes {course?.title ?? params.abbreviature} {params.semester}</h1>
      <UploadStudentsForm />
      <StudentsTable students={students} />
    </div>
  )
}
