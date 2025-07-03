import { createClient } from '@/utils/supabase/server'
import { getCourseById, getGroupMates, getResponsesByUserInfoId, getGrades } from '@/utils/queries'
import { Evaluation, Grade, LinearQuestion, QuestionCriterion, Response } from '@/utils/schema'
import { Console } from '@/utils/console'

export async function saveGrades(evaluation: Evaluation, students: any) {
  console.log('Starting saveGrades for evaluation:', evaluation.id)
  console.log('Number of students to process:', students.length)
  
  const responsesByUserInfoId = await getResponsesByUserInfoId(evaluation)
  console.log('Responses by userInfoId:', responsesByUserInfoId ? Object.keys(responsesByUserInfoId).length : 0)
  
  if (!responsesByUserInfoId || Object.keys(responsesByUserInfoId).length === 0) {
    console.log('No responses found for evaluation:', evaluation.id)
    throw new Error('No responses found for this evaluation')
  }

  const lastResponseByUserInfoId: Record<string, Response> = {}
  Object.entries(responsesByUserInfoId).forEach(async ([userInfoId, responses]) => {
    const response = responses[0] // consider only the last response
    lastResponseByUserInfoId[userInfoId] = response
  })

  console.log('Last responses by userInfoId:', Object.keys(lastResponseByUserInfoId).length)

  const course = await getCourseById(evaluation.courseId)
  if (!course) {
    console.log('Course not found for evaluation:', evaluation.courseId)
    throw new Error('Course not found')
  }

  const firstQuestion = Object.values(evaluation.questions)[0] as LinearQuestion
  if (!firstQuestion || firstQuestion.type !== 'linear') {
    console.log('First question is not linear or not found')
    throw new Error('First question is not linear or not found')
  }

  console.log('First question criteria:', firstQuestion.criteria.length)

  const newGradesByUserInfoId: Record<string, number> = {}
  const pathParams = { abbreviature: course.abbreviature, semester: course.semester, id: evaluation.id }

  for (const student of students) {
    console.log(`Processing student: ${student.userInfoId}`)
    
    const groupMates = await getGroupMates(pathParams, student.userInfoId, evaluation)
    if (!groupMates || groupMates.length === 0) {
      console.log(`No group mates found for student: ${student.userInfoId}`)
      continue
    }

    console.log(`Found ${groupMates.length} group mates for student: ${student.userInfoId}`)

    const studentCriteriaScores: Record<string, number[]> = {}
    groupMates.forEach((mate: any) => {
      const mateResponse = lastResponseByUserInfoId[mate.userInfoId]
      if (!mateResponse) {
        console.log(`No response found for mate: ${mate.userInfoId}`)
        return
      }

      const mateData = JSON.parse(mateResponse.data) as string[]
      if (!mateData) {
        console.log(`No data in response for mate: ${mate.userInfoId}`)
        return
      }
      
      const parsedMateData = mateData.map((value) => value.split('--'))

      const studentScores = parsedMateData.filter(value => value[0] === student.userInfoId)
      console.log(`Found ${studentScores.length} scores for student ${student.userInfoId} from mate ${mate.userInfoId}`)
      
      studentScores.forEach(([_, criterionLabel, score]) => {
        if (!studentCriteriaScores[criterionLabel]) studentCriteriaScores[criterionLabel] = []
        studentCriteriaScores[criterionLabel].push(parseInt(score))
      })
    })

    const maxGrade = 1
    const nullScore = 3
    const minScore = 1

    const weightsSum = firstQuestion.criteria.reduce((acc, criterion) => acc + criterion.weight, 0)
    const numberOfGroupMates = groupMates.length

    const slugifyCriterionLabel = (label: string) => label.toLowerCase().replace(/\s/g, '-')

    // Manejo de caso donde no hay respuestas válidas
    const criteriaLabels = firstQuestion.criteria.map(c => slugifyCriterionLabel(c.label))
    criteriaLabels.forEach(criterionLabel => {
      if (!studentCriteriaScores[criterionLabel]) {
        studentCriteriaScores[criterionLabel] = Array(numberOfGroupMates).fill(nullScore)
      }
    })

    const evaluationScore = Object.entries(studentCriteriaScores).reduce((acc, [criterionLabel, scores]) => {
      const criterion = firstQuestion.criteria.find((criterion: QuestionCriterion) => slugifyCriterionLabel(criterion.label) === criterionLabel)
      const weight = criterion?.weight ?? 0
      Console.Success(JSON.stringify({ group: student.group, criterionLabel, scores, numberOfGroupMates }))
      if (scores.length < numberOfGroupMates) {
        const missingScores = Array(numberOfGroupMates - scores.length).fill(nullScore)
        scores.push(...missingScores)
      }
      const averageScore = scores.reduce((acc, score) => acc + score, 0) / numberOfGroupMates

      return acc + (averageScore * weight) / weightsSum
    }, 0)
    
    const rawEvaluationGrade = (evaluationScore - nullScore) * (maxGrade / (nullScore - minScore))
    const evaluationGrade = Math.min(1, Math.max(-1, rawEvaluationGrade))
    newGradesByUserInfoId[student.userInfoId] = evaluationGrade
    
    console.log(`Calculated grade for student ${student.userInfoId}:`, evaluationGrade)
  }

  console.log('Grades calculated for students:', Object.keys(newGradesByUserInfoId).length)

  const newGrades: Grade[] = []
  for (const [userInfoId, grade] of Object.entries(newGradesByUserInfoId)) {
    const grades = await getGrades(evaluation, userInfoId)
    const groupGrade = parseFloat(grades?.groupGrade ?? '4.0')
    const newGrade = {
      evaluationId: evaluation.id,
      userInfoId,
      groupGrade: groupGrade.toFixed(2),
      evaluationGrade: grade.toFixed(2),
      finalGrade: (groupGrade + grade).toFixed(2),
    }
    newGrades.push(newGrade)
    console.log(`Final grade for student ${userInfoId}:`, newGrade)
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
