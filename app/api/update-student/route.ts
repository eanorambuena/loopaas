import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { Console } from '@/utils/console'

export async function POST(req: Request) {
  const supabase = createClient()
  const body = await req.json()
  const { userInfoId, firstName, lastName, group } = body
  
  try {
    const { error: infoError } = await supabase
      .from('userInfo')
      .update({ firstName, lastName })
      .eq('id', userInfoId)

    const { error: groupError } = await supabase
      .from('students')
      .update({ group })
      .eq('userInfoId', userInfoId)

    // check student group was updated
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('group')
      .eq('userInfoId', userInfoId)

    if (studentError) {
      Console.Error(`Error al obtener el grupo del estudiante: ${studentError.message}`)
      return NextResponse.json({ ok: false, error: 'Error al obtener el grupo del estudiante' }, { status: 500 })
    }
    if (studentData.length === 0) {
      Console.Error(`No se encontró el estudiante con userInfoId: ${userInfoId}`)
      return NextResponse.json({ ok: false, error: 'Estudiante no encontrado' }, { status: 404 })
    }
    
    // Verificar actualización del grupo (manejar null para desasignación)
    const updatedGroup = studentData[0].group
    if (group === null || group === '' || group === undefined) {
      // Para desasignación, verificar que el grupo sea null, undefined o cadena vacía
      if (updatedGroup !== null && updatedGroup !== '' && updatedGroup !== undefined) {
        Console.Error(`El grupo del estudiante no se desasignó correctamente: ${updatedGroup}`)
        return NextResponse.json({ ok: false, error: 'El grupo del estudiante no se desasignó correctamente' }, { status: 500 })
      }
    } else {
      // Para asignación normal, verificar que coincida
      if (String(updatedGroup) !== String(group)) {
        Console.Error(`El grupo del estudiante no se actualizó correctamente: ${updatedGroup} != ${group}`)
        return NextResponse.json({ ok: false, error: 'El grupo del estudiante no se actualizó correctamente' }, { status: 500 })
      }
    }

    if (infoError || groupError) {
      throw new Error(`Error al actualizar la información del estudiante: ${infoError?.message || groupError?.message}`)
    }
  }
  catch (error) {
    Console.Error(`Error al procesar la solicitud: ${error}`)
    return NextResponse.json({ ok: false, error: 'Error al procesar la solicitud' }, { status: 500 })
  }

  Console.Info(`Estudiante actualizado: ${userInfoId} - ${firstName} ${lastName}, Grupo: ${group}`)

  return NextResponse.json({ ok: true })
}
