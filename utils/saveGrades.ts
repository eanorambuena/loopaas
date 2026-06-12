import { db } from '@/drizzle/db'
import { grades } from '@/drizzle/schema'
import { eq, and } from 'drizzle-orm'
import { getCourseById, getGrades } from '@/utils/queries'
import { Evaluation, Grade } from '@/utils/schema'
import { calculatePeerEvaluationScore } from '@/utils/calculatePeerEvaluationScore'

export async function saveGrades(evaluation: Evaluation, students: any) {
  console.log('Starting saveGrades for evaluation:', evaluation.id)
  console.log('Number of students to process:', students.length)
  
  const course = await getCourseById(evaluation.courseId)
  if (!course) {
    console.log('Course not found for evaluation:', evaluation.courseId)
    throw new Error('Course not found')
  }

  const peerEvaluationResults = await calculatePeerEvaluationScore(
    evaluation, 
    students, 
    course.abbreviature, 
    course.semester
  )

  console.log('Peer evaluation scores calculated for students:', peerEvaluationResults.length)

  for (const peerResult of peerEvaluationResults) {
    const existingGrades = await getGrades(evaluation, peerResult.userInfoId)
    const groupGrade = 4.0
    const score = Number((groupGrade + peerResult.peerEvaluationScore).toFixed(2))

    if (existingGrades) {
      await db.update(grades)
        .set({ score })
        .where(
          and(
            eq(grades.evaluationId, evaluation.id),
            eq(grades.userInfoId, peerResult.userInfoId)
          )
        )
    } else {
      await db.insert(grades).values({
        evaluationId: evaluation.id,
        userInfoId: peerResult.userInfoId,
        score,
      })
    }
    console.log(`Final grade for student ${peerResult.userInfoId}:`, { score })
  }
  
  console.log('All grades saved successfully')
}
