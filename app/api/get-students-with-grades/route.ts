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
    console.log('Number of students in request:', students.length)
    console.log('Sample student structure:', students[0])

    const promises = students.map(async (student: StudentWithGrades) => {
      try {
        console.log(`Processing student: ${student.userInfo?.firstName} ${student.userInfo?.lastName} (${student.userInfoId})`)
        
        const grades = await getGrades(evaluation, student.userInfoId)
        console.log(`Grades for student ${student.userInfoId}:`, grades)
        
        const result = {
          ...student,
          groupGrade: grades?.groupGrade ?? 'N/A',
          coGrade: grades?.evaluationGrade ?? 'N/A',
          finalGrade: grades?.finalGrade ?? 'N/A'
        }
        
        console.log(`Result for student ${student.userInfoId}:`, result)
        return result
        
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
    console.log('Final result count:', studentsWithGrades.length)
    console.log('Sample final result:', studentsWithGrades[0])
    
    return NextResponse.json(studentsWithGrades)
  } catch (error) {
    console.error('Error in get-students-with-grades:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
