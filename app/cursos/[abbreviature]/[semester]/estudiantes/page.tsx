'use server'

import Fallback from '@/components/Fallback'
import Input from '@/components/Input'
import SecondaryButton from '@/components/SecondaryButton'
import { createCourseStudents, getCourse, getCourseStudents, getCurrentUser } from '@/utils/queries'
import * as XLSX from 'xlsx'

export default async function Page({ params }: { params: { abbreviature: string, semester: string } }) {
  await getCurrentUser()

  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) return <Fallback>No se encontró el curso</Fallback>

  const students = await getCourseStudents(course)
  if (!students ||students?.length === 0)
    return <Fallback>No hay estudiantes inscritos en el curso</Fallback>

  async function saveStudents(formData: FormData) {
    'use server'
    const file = formData.get('file') as File
    const minGroup = parseInt(formData.get('minGroup') as string) || 0
    const maxGroup = parseInt(formData.get('maxGroup') as string) || 1000
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const studentsData = XLSX.utils.sheet_to_json(sheet)
    if (!studentsData) return
    console.log(studentsData)
    const students = studentsData.map((student: any) => {
      const [lastName, firstName] = student.nombre.split(', ')
      return {
        firstName,
        lastName,
        ucUsername: student.login_id,
        group: parseInt(student.group_name)
      }
    })
    await createCourseStudents(course, students, minGroup, maxGroup)
  }

  return (
    <div className='animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 px-3'>
      <h1 className='text-3xl font-bold'>Estudiantes {course?.title ?? params.abbreviature} {params.semester}</h1>
      <form className='flex flex-col gap-4 border border-foreground/20 rounded-md p-4' encType='multipart/form-data'>
        <Input
          type='file'
          name='file'
          label='Archivo de estudiantes'
          accept='.xlsx'
          required
        />
        <Input
          type='number'
          name='minGroup'
          label='Grupo mínimo'
          defaultValue='0'
          required
        />
        <Input
          type='number'
          name='maxGroup'
          label='Grupo máximo'
          defaultValue='1000'
          required
        />
        <SecondaryButton
          className='w-full'
          type='submit'
          formAction={saveStudents}
          pendingText='Guardando estudiantes...'
        >
          Importar estudiantes desde archivo
        </SecondaryButton>
      </form>
      <table className='table-auto'>
        <thead>
          <tr className='text-left *:px-6 *:py-3'>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Grupo</th>
          </tr>
        </thead>
        <tbody className='text-left'>
          {students?.map((student) => (
            <tr key={student.id} className='*:px-6 *:py-3'>
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
