import { createClient } from '@/utils/supabase/server'
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

  // Use the extracted calculation logic
  const peerEvaluationResults = await calculatePeerEvaluationScore(
    evaluation, 
    students, 
    course.abbreviature, 
    course.semester
  )

  console.log('Peer evaluation scores calculated for students:', peerEvaluationResults.length)

  const newGrades = []
  for (const peerResult of peerEvaluationResults) {
    const grades = await getGrades(evaluation, peerResult.userInfoId)
    const groupGrade = 4.0 // Default value, adjust if you have another source
    const newGrade = {
      evaluationId: evaluation.id,
      userInfoId: peerResult.userInfoId,
      score: Number((groupGrade + peerResult.peerEvaluationScore).toFixed(2)),
    }
    newGrades.push(newGrade)
    console.log(`Final grade for student ${peerResult.userInfoId}:`, newGrade)
  }

  const supabase = createClient()
  for (const grade of newGrades) {
    const { error } = await supabase
      .from('grades')
      .upsert(grade)
    if (error) {
      console.error('Error upserting grade:', error)
      throw new Error(`Error saving grade for student ${grade.userInfoId}: ${error.message}`)
    }
  }
  
  console.log('All grades saved successfully')
}
