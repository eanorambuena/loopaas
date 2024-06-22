import { getCourse } from '@/utils/queries'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import EvaluationForm, { Evaluation } from './EvaluationForm'

export default async function Page({ params }: { params: { abbreviature: string, semester: string, id: string } }) {
  const supabase = createClient()
  const REDIRECT_PATH = `/cursos/${params.abbreviature}/${params.semester}/evaluaciones`
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: _evaluation } = await supabase
    .from('evaluations')
    .select('*')
    .eq('id', params.id)
    .single()
  if (!_evaluation) return redirect(REDIRECT_PATH)

  const { data: userInfo } = await supabase
    .from('userInfo')
    .select('*')
    .eq('userId', user.id)
    .single()
  if (!userInfo) return redirect(REDIRECT_PATH)

  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('courseId', _evaluation.courseId)
    .eq('userInfoId', userInfo.id)
    .single()
  if (!student) return redirect(REDIRECT_PATH)

  const { data: groupStudents } = await supabase
    .from('students')
    .select('*')
    .eq('courseId', _evaluation.courseId)
    .neq('userInfoId', userInfo.id)
    .eq('group', student.group)
  if (!groupStudents) return redirect(REDIRECT_PATH)

  const sections: any = []
  for (const mate of groupStudents) {
    const { data: mateInfo } = await supabase
      .from('userInfo')
      .select('*')
      .eq('id', mate.userInfoId)
      .single()
    sections.push(`Por favor, califica a ${mateInfo.firstName} ${mateInfo.lastName}`)
  }

  const evaluation: Evaluation = {
    ..._evaluation,
    sections,
  }

  const course = await getCourse(params.abbreviature, params.semester)

  if (!course) {
    return (
      <h1 className='text-3xl font-bold'>
        No se encontró el curso
      </h1>
    )
  }

  const isCourseProfessor = userInfo?.id === course.teacherInfoId

  return (
    <div className='animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3'>
      <h1 className='text-3xl font-bold'>{evaluation.title}</h1>
      {isCourseProfessor && (
        <Link href={`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${params.id}/configuracion`}>
          Configurar Evaluación
        </Link>
      )}
      <EvaluationForm evaluation={evaluation} />
    </div>
  )
}
