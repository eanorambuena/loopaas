import { NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { students, evaluations, professors, responses, grades, courses } from '@/drizzle/schema'
import { eq, inArray } from 'drizzle-orm'

export async function POST(req: Request) {
  const { courseId } = await req.json()
  if (!courseId) {
    return NextResponse.json({ error: 'Falta el id del curso' }, { status: 400 })
  }
  
  const [studentRows, evaluationRows, professorRows] = await Promise.all([
    db.query.students.findMany({ where: eq(students.courseId, courseId) }),
    db.query.evaluations.findMany({ where: eq(evaluations.courseId, courseId) }),
    db.query.professors.findMany({ where: eq(professors.courseId, courseId) }),
  ])
  
  const hasStudents = studentRows.length > 0
  const hasEvaluations = evaluationRows.length > 0
  const hasProfessors = professorRows.length > 0
  
  let hasResponses = false
  let responsesCount = 0
  if (hasEvaluations) {
    const evaluationIds = evaluationRows.map(e => e.id)
    const responseRows = evaluationIds.length > 0
      ? await db.query.responses.findMany({
          where: inArray(responses.evaluationId, evaluationIds),
        })
      : []
    hasResponses = responseRows.length > 0
    responsesCount = responseRows.length
  }
  
  return NextResponse.json({ 
    ok: true,
    hasRelatedData: hasStudents || hasEvaluations || hasProfessors || hasResponses,
    dataSummary: {
      students: studentRows.length,
      evaluations: evaluationRows.length,
      professors: professorRows.length,
      responses: hasResponses ? responsesCount : 0
    }
  })
}

export async function DELETE(req: Request) {
  const { courseId } = await req.json()
  if (!courseId) {
    return NextResponse.json({ error: 'Falta el id del curso' }, { status: 400 })
  }
  
  try {
    const evaluationRows = await db.query.evaluations.findMany({
      where: eq(evaluations.courseId, courseId),
    })
    
    const evaluationIds = evaluationRows.map(e => e.id)
    
    if (evaluationIds.length > 0) {
      await db.delete(grades).where(inArray(grades.evaluationId, evaluationIds))
      await db.delete(responses).where(inArray(responses.evaluationId, evaluationIds))
    }
    
    await db.delete(evaluations).where(eq(evaluations.courseId, courseId))
    await db.delete(professors).where(eq(professors.courseId, courseId))
    await db.delete(students).where(eq(students.courseId, courseId))
    await db.delete(courses).where(eq(courses.id, courseId))
    
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error in delete course process:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
} 