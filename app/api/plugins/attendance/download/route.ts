import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import ExcelJS from 'exceljs'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    // Obtener todas las asistencias
    const { data: attendance, error } = await supabase
      .from('attendance')
      .select('*')

    if (error) {
      return NextResponse.json({ error: 'Error al obtener asistencias' }, { status: 500 })
    }

    // Crear workbook y worksheet
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Asistencias')

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'ID Curso', key: 'courseId', width: 15 },
      { header: 'ID Estudiante', key: 'studentId', width: 18 },
      { header: 'Presente', key: 'present', width: 10 },
      { header: 'Fecha', key: 'date', width: 20 },
      { header: 'Creado', key: 'createdAt', width: 25 },
    ]

    attendance?.forEach(row => {
      worksheet.addRow(row)
    })

    // Generar buffer
    const buffer = await workbook.xlsx.writeBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="asistencias.xlsx"',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
