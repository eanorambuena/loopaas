import SecondaryButton from '@/components/SecondaryButton'
import SecondaryLink from '@/components/SecondaryLink'
import { fetchGroups } from '@/utils/canvas'
import { evaluationPath } from '@/utils/paths'
import { getCourse, getCourseStudents, getCurrentUser, getEvaluationByParams, getEvaluationWithSections, getGrades, getUserInfoById, saveGrades } from '@/utils/queries'
import { sendEmail } from '@/utils/resend'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    abbreviature: string
    semester: string
    id: string
  }
  searchParams: {
    sendReport: boolean
    message: string
  }
}

export default async function Page({ params, searchParams }: Props) {
  const user = await getCurrentUser()

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

  const professorUserInfo = await getUserInfoById(course.teacherInfoId)
  const evaluation = await getEvaluationByParams(params)

  const sendReport = async (html: any) => {
    await sendEmail({
      from: 'onboarding@resend.dev',
      to: professorUserInfo.email,
      subject: `IDSApp | Notas de Evaluación ${evaluation.title}`,
      html
    })
    redirect(`${evaluationPath(params)}/resultados?message=Reporte enviado con éxito`)
  }

  for (const student of students) {
    const grades = await getGrades(evaluation, student.userInfoId)
    student.groupGrade = grades?.groupGrade ?? 'N/A'
    student.coGrade = grades?.evaluationGrade ?? 'N/A'
    student.finalGrade = grades?.finalGrade ?? 'N/A'
  }

  if (searchParams.sendReport && sendReport) {
    sendReport(`
      <h1>Resultados de la evaluación ${evaluation.title}</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Grupo</th>
            <th>Nota Grupal</th>
            <th>Coevaluación</th>
            <th>Nota Final</th>
          </tr>
        </thead>
        <tbody>
          ${students.map((student) => `
            <tr>
              <td>${student.userInfo?.firstName} ${student.userInfo?.lastName}</td>
              <td>${student.userInfo?.email}</td>
              <td>${student.group}</td>
              <td>${student.groupGrade}</td>
              <td>${student.coGrade}</td>
              <td>${student.finalGrade}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `)
  }

  const updateGrades = async (formData: FormData) => {
    "use server"
    await saveGrades(evaluation, students)
  }

  return (
    <div className='animate-in flex-1 flex flex-col gap-6 p-8 opacity-0'>
      <h1 className='text-3xl font-bold'>Resultados {evaluation.title}</h1>
      {new Date(evaluation.deadLine) > new Date() && (
        <p className='text-red-500 w-full'>Advertencia: La evaluación aún no ha finalizado</p>
      )}
      {searchParams?.message && (
        <p className='mt-4 bg-foreground/10 text-foreground text-center group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full destructive group border-red-300 bg-red-500 text-slate-50 dark:border-red-500 dark:bg-red-700 dark:text-slate-50'>
          {searchParams.message}
        </p>
      )}
      <form className='flex gap-4'>
        <SecondaryButton
          className='w-fit'
          formAction={updateGrades}
          type='submit'
          pendingText='Actualizando Notas...'
        >
          Actualizar Notas
        </SecondaryButton>
        <SecondaryLink
          className='w-fit'
          href={`${evaluationPath(params)}/resultados?sendReport=true`}
        >
          Enviar Reporte al correo
        </SecondaryLink>
      </form>
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
    </div>
  )
}
