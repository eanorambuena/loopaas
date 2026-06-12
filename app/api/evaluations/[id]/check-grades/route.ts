import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { grades } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const gradeRows = await db.query.grades.findMany({
      where: eq(grades.evaluationId, params.id),
      limit: 1,
    })

    const hasGrades = gradeRows.length > 0

    return NextResponse.json({ 
      hasGrades,
      count: gradeRows.length
    })
  } catch (error) {
    console.error('Error in check-grades API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 