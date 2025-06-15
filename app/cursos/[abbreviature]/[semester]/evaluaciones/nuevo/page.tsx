import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Fallback from '@/components/Fallback'
import { getCourse } from '@/utils/queries'

export default async function Page({ params }: { params: { abbreviature: string, semester: string } }) {
  const supabase = createClient()

  const course = await getCourse(params.abbreviature, params.semester)

  if (!course) return <Fallback>No se encontró el curso</Fallback>

  const { data: newEvaluation, error } = await supabase
    .from('evaluations')
    .insert([{ courseId: course.id, title: '', instructions: '', deadLine: new Date(), questions: {} }])
    .select()
    .single()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nueva Evaluación</h1>
      <Link
        className="w-full max-w-4xl rounded-md flex justify-center items-center bg-[#eeeeee] dark:bg-gray-900 hover:scale-105 transition-transform duration-300 hover:shadow-[0_20px_30px_rgba(_8,_184,_112,_0.7)]"
        href={`/cursos/${params.abbreviature}/${params.semester}/evaluaciones/${newEvaluation?.id}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Nueva Evaluación</h2>
          <p className="text-gray-600 dark:text-gray-400">Haz clic aquí para comenzar a editar la nueva evaluación.</p>
        </div>
      </Link>
      {error && <p className="text-red-500">Error al crear la evaluación: {error.message}</p>}
    </div>
  )
}
