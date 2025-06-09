'use server'

import Fallback from '@/components/Fallback'
import Input from '@/components/Input'
import SecondaryButton from '@/components/SecondaryButton'
import { createAutoConfirmUsers, createCourseStudents, getCourse, getCourseStudents, getCurrentUser } from '@/utils/queries'
import * as XLSX from 'xlsx'

export default async function Page({ params }: { params: { abbreviature: string, semester: string } }) {
  await getCurrentUser()

  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) return <Fallback>No se encontró el curso</Fallback>

  const students = await getCourseStudents({ course })
  if (!students ||students?.length === 0)
    return <Fallback>No hay estudiantes inscritos en el curso</Fallback>

  async function saveStudents(formData: FormData) {
    'use server'
    const csv = formData.get('csv') as string
    if (!csv) {
      throw new Error('CSV no proporcionado')
    }
    await createAutoConfirmUsers(csv)
  }

  return (
    <div className='animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 px-3'>
      <h1 className='text-3xl font-bold'>Estudiantes {course?.title ?? params.abbreviature} {params.semester}</h1>
      <form className='flex flex-col gap-4 border border-foreground/20 rounded-md p-4' encType='multipart/form-data'>
        <legend className='text-lg font-semibold'>
          Importar estudiantes desde CSV con formato:<br />
          <span className='text-sm font-normal'>APELLIDOS;NOMBRES;PASSWORD;CORREO;GRUPO</span>
        </legend>
        <Input
          type='textarea'
          name='csv'
          label='CSV de estudiantes'
          placeholder='APELLIDOS;NOMBRES;PASSWORD;CORREO;GRUPO'
          defaultValue=''
          required
        />
        <SecondaryButton
          className='w-full'
          type='submit'
          formAction={saveStudents}
          pendingText='Guardando estudiantes...'
        >
          Importar estudiantes desde CSV
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
