'use server'

import { getCourse, getProfessorsForCourse } from '@/utils/queries'
import Fallback from '@/components/Fallback'
import { AddProfessorForm } from './AddProfessorForm'

export default async function ProfesoresPage({ params }: {
  params: { abbreviature: string, semester: string }
}) {
  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) return <Fallback>No se encontró el curso</Fallback>

  const professors = await getProfessorsForCourse(course.id)
  if (!professors || professors.length === 0)
    return <Fallback>No hay profesores registrados para este curso</Fallback>

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>
        Profesores del curso {course.title}
      </h1>
      <AddProfessorForm courseId={course.id} />
      <table className='table-auto w-full border'>
        <thead>
          <tr className='*:px-4 *:py-2 bg-gray-100 text-left'>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((prof) => (
            <tr key={prof.id} className='border-t *:px-4 *:py-2'>
              <td>{prof.userInfo.firstName} {prof.userInfo.lastName}</td>
              <td>{prof.userInfo.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
