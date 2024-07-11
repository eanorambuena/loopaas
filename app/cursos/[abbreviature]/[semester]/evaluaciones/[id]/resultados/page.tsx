import Fallback from '@/components/Fallback'
import Input from '@/components/Input'
import SecondaryButton from '@/components/SecondaryButton'
import SecondaryLink from '@/components/SecondaryLink'
import { evaluationPath } from '@/utils/paths'
import {
  getCourse, getCourseStudents, getCurrentUser, getEvaluationByParams,
  getGrades, saveGrades
} from '@/utils/queries'
import * as XLSX from 'xlsx'

interface Props {
  params: {
    abbreviature: string
    semester: string
    id: string
  }
  searchParams: {
    sendReport: boolean
    page: string
  }
}

export default async function Page({ params, searchParams }: Props) {
  await getCurrentUser()

  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) return <Fallback>No se encontró el curso</Fallback>

  const page = parseInt(searchParams.page ?? '1')
  const itemsPerPage = parseInt(process.env.NEXT_ITEMS_PER_PAGE ?? '10')
  const rangeMin = (page - 1) * itemsPerPage
  const rangeMax = rangeMin - 1 + itemsPerPage
  const students = await getCourseStudents({ course, rangeMin, rangeMax })
  if (students?.length === 0 || !students)
    return <Fallback>No hay estudiantes inscritos en el curso</Fallback>

  const evaluation = await getEvaluationByParams(params)
  if (!evaluation) return <Fallback>No se encontró la evaluación</Fallback>

  for (const student of students) {
    const grades = await getGrades(evaluation, student.userInfoId)
    student.groupGrade = grades?.groupGrade ?? 'N/A'
    student.coGrade = grades?.evaluationGrade ?? 'N/A'
    student.finalGrade = grades?.finalGrade ?? 'N/A'
  }

  const updateGrades = async (formData: FormData) => {
    'use server'
    const students = await getCourseStudents({ course })
    await saveGrades(evaluation, students)
    const file = formData.get('file') as File
    if (!file) return
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array' })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const groupsGradesData = XLSX.utils.sheet_to_json(sheet)
    if (!groupsGradesData) return
    console.log(groupsGradesData)
  }

  const baseUrl = `${evaluationPath(params)}/resultados`

  return (
    <div className='animate-in flex-1 flex flex-col gap-6 p-8 opacity-0'>
      <h1 className='text-3xl font-bold'>Resultados {evaluation.title}</h1>
      {new Date(evaluation.deadLine) > new Date() && (
        <p className='text-red-500 w-full'>Advertencia: La evaluación aún no ha finalizado</p>
      )}
      <section className='flex gap-4'>
        <form className='flex gap-4 border border-gray-300 rounded-md p-4'>
          <Input label='Notas Grupales' type='file' name='file' accept='.xlsx' />
          <SecondaryButton
            className='w-fit'
            formAction={updateGrades}
            type='submit'
            pendingText='Actualizando Notas...'
          >
            Actualizar Notas
          </SecondaryButton>
        </form>
        <SecondaryLink
          className='w-fit hidden'
          href={`${evaluationPath(params)}/resultados?sendReport=true`}
        >
          Enviar Reporte al correo
        </SecondaryLink>
      </section>
      <table className='table-auto text-sm sm:text-inherit max-w-[95%]'>
        <thead className='h-fit'>
          <tr className='text-left sm:*:px-6 *:py-3'>
            <th className='hidden sm:table-cell'>Nombre</th>
            <th>Correo</th>
            <th className='hidden sm:table-cell'>Grupo</th>
            <th className='hidden sm:table-cell'>Nota Grupal</th>
            <th className='table-cell sm:hidden'>Grupal</th>
            <th className='hidden sm:table-cell'>Coevaluación</th>
            <th className='table-cell sm:hidden'>Coev.</th>
            <th className='hidden sm:table-cell'>Nota Final</th>
            <th className='table-cell sm:hidden'>Nota</th>
          </tr>
        </thead>
        <tbody className='text-left'>
          {students.map((student) => (
            <tr key={student.id} className='sm:*:px-6 *:py-3'>
              <td className='hidden sm:table-cell'>{student.userInfo?.firstName} {student.userInfo?.lastName}</td>
              <td>{student.userInfo?.email}</td>
              <td className='hidden sm:table-cell'>{student.group}</td>
              <td>{student.groupGrade}</td>
              <td>{student.coGrade}</td>
              <td>{student.finalGrade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className='flex justify-center items-center gap-4'>
        {page > 1 ? (
          <SecondaryLink
            href={`${baseUrl}?page=${page - 1}`}
            className='w-fit'
          >
            Página Anterior
          </SecondaryLink>
        ) : <SecondaryButton className='w-fit opacity-50' disabled>Página Anterior</SecondaryButton>}
        <strong>{page}</strong>
        {students.length === itemsPerPage ? (
          <SecondaryLink
            href={`${baseUrl}?page=${page + 1}`}
            className='w-fit'
          >
            Página Siguiente
          </SecondaryLink>
        ) : <SecondaryButton className='w-fit opacity-50' disabled>Página Siguiente</SecondaryButton>}
      </section>
    </div>
  )
}
