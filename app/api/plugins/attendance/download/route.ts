import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { attendance } from '@/drizzle/schema'
import ExcelJS from 'exceljs'

export async function GET(request: NextRequest) {
  try {
    const attendanceRows = await db.query.attendance.findMany()

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Asistencias')

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'ID Curso', key: 'courseId', width: 15 },
      { header: 'ID Estudiante', key: 'studentId', width: 18 },
      { header: 'Estado', key: 'status', width: 10 },
      { header: 'Fecha', key: 'date', width: 20 },
    ]

    attendanceRows?.forEach(row => {
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
