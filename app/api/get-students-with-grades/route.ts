import { getGrades } from '@/utils/queries'
import { NextResponse } from 'next/server'
import { StudentWithGrades } from '@/utils/schema'

export async function POST(req: Request) {
  const { evaluation, students } = await req.json()

  if (!evaluation || !students) {
    return NextResponse.json({ error: 'Missing evaluation or students data' }, { status: 400 })
  }

  const promises = students.map(async (student: StudentWithGrades) => {
    const grades = await getGrades(evaluation, student.userInfoId)
    return {
      ...student,
      groupGrade: grades?.groupGrade ?? 'N/A',
      coGrade: grades?.evaluationGrade ?? 'N/A',
      finalGrade: grades?.finalGrade ?? 'N/A'
    }
  })
  const studentsWithGrades = await Promise.all(promises)
  return NextResponse.json(studentsWithGrades)
}
