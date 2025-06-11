'use server'

import { getCourse, getProfessorsForCourse } from '@/utils/queries'
import Fallback from '@/components/Fallback'
import { AddProfessorForm } from './AddProfessorForm'
import ProfessorsTable from '@/components/professors/ProfessorsTable'

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
      <ProfessorsTable professors={professors} />
    </div>
  )
}
