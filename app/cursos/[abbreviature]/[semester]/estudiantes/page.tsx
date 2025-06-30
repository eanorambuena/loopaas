'use server'

import Fallback from '@/components/Fallback'
import { getCourse, getCourseStudents, getCurrentUser, getUserInfo } from '@/utils/queries'
import UploadStudentsForm from './UploadStudentsForm'
import { Console } from '@/utils/console'
import { isProfessorServer } from '@/utils/isProfessorServer'
import { redirect } from 'next/navigation'
import StudentsTable from '@/components/students/StudentsTable'

export default async function Page({ params }: { params: { abbreviature: string, semester: string } }) {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id, false)

  if (!userInfo || !userInfo.id) {
    Console.Error(`UserInfo not found for user ${user.email}`)
    return <Fallback>No se encontró tu información de usuario</Fallback>
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

  const isCourseProfessor = await isProfessorServer({
    userInfoId: userInfo.id,
    courseId: course.id
  })
  
  if (!isCourseProfessor) redirect(`/cursos/${params.abbreviature}/${params.semester}`)

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
      <StudentsTable students={students} />
      <UploadStudentsForm />
    </div>
  )
}
