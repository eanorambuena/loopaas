import { getGrades } from '@/utils/queries'
import { NextResponse } from 'next/server'
import { StudentWithGrades } from '@/utils/schema'

export async function POST(req: Request) {
  try {
    const { evaluation, students } = await req.json()

    if (!evaluation || !students) {
      return NextResponse.json({ error: 'Missing evaluation or students data' }, { status: 400 })
    }

    console.log('Processing students with grades for evaluation:', evaluation.id)
    console.log('Number of students:', students.length)
    console.log('Sample student structure:', students[0])

    const promises = students.map(async (student: StudentWithGrades) => {
      try {
        const grades = await getGrades(evaluation, student.userInfoId)
        console.log(`Grades for student ${student.userInfoId}:`, grades)
        return {
          ...student,
          groupGrade: grades?.groupGrade ?? 'N/A',
          coGrade: grades?.evaluationGrade ?? 'N/A',
          finalGrade: grades?.finalGrade ?? 'N/A'
        }
      } catch (error) {
        console.error(`Error processing student ${student.userInfoId}:`, error)
        return {
          ...student,
          groupGrade: 'N/A',
          coGrade: 'N/A',
          finalGrade: 'N/A'
        }
      }
    })
    
    const studentsWithGrades = await Promise.all(promises)
    console.log('Final result:', studentsWithGrades.length, 'students processed')
    console.log('Sample result:', studentsWithGrades[0])
    
    return NextResponse.json(studentsWithGrades)
  } catch (error) {
    console.error('Error in get-students-with-grades:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
