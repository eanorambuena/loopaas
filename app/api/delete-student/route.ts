import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { Console } from '@/utils/console'

export async function POST(req: Request) {
  const supabase = createClient()
  const body = await req.json()
  const { studentId, userInfoId } = body

  if (!studentId || !userInfoId) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
  }

  // Eliminar de students
  const { error: studentError } = await supabase
    .from('students')
    .delete()
    .eq('id', studentId)

  if (studentError) {
    Console.Error(`Error al eliminar estudiante: ${studentError.message}`)
    return NextResponse.json({ error: 'No se pudo eliminar el estudiante' }, { status: 500 })
  }

  // Opcional: Eliminar userInfo si no está en otros cursos
  // const { count } = await supabase
  //   .from('students')
  //   .select('*', { count: 'exact', head: true })
  //   .eq('userInfoId', userInfoId)
  // if (count === 0) {
  //   await supabase.from('userInfo').delete().eq('id', userInfoId)
  // }

  Console.Info(`Estudiante eliminado: ${studentId}`)
  return NextResponse.json({ ok: true })
}
