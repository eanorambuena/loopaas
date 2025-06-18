import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getCourseById, getGroupMates, getResponsesByUserInfoId, getGrades } from '@/utils/queries'
import { evaluationPath } from './paths'
import { Evaluation, Grade, LinearQuestion, QuestionCriterion, Response } from '@/utils/schema'
import { Console } from '@/utils/console'

export async function saveGrades(evaluation: Evaluation, students: any) {
  const responsesByUserInfoId = await getResponsesByUserInfoId(evaluation)
  
  if (!responsesByUserInfoId) return

  const lastResponseByUserInfoId: Record<string, Response> = {}
  Object.entries(responsesByUserInfoId).forEach(async ([userInfoId, responses]) => {
    const response = responses[0] // consider only the last response
    lastResponseByUserInfoId[userInfoId] = response
  })

  const course = await getCourseById(evaluation.courseId)
  if (!course) return

  const firstQuestion = Object.values(evaluation.questions)[0] as LinearQuestion
  const newGradesByUserInfoId: Record<string, number> = {}
  const pathParams = { abbreviature: course.abbreviature, semester: course.semester, id: evaluation.id }

  for (const student of students) {
    const groupMates = await getGroupMates(pathParams, student.userInfoId, evaluation)
    if (!groupMates) continue

    const studentCriteriaScores: Record<string, number[]> = {}
    groupMates.forEach((mate: any) => {
      const mateResponse = lastResponseByUserInfoId[mate.userInfoId]
      if (!mateResponse) return

      const mateData = JSON.parse(mateResponse.data) as string[]
      if (!mateData) return
      const parsedMateData = mateData.map((value) => value.split('--'))

      const studentScores = parsedMateData.filter(value => value[0] === student.userInfoId)
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
      Console.Success(JSON.stringify({ grou: student.group, criterionLabel, scores, numberOfGroupMates }))
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
  }

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
  }

  const supabase = createClient()
  for (const grade of newGrades) {
    const { data: error } = await supabase
      .from('grades')
      .upsert(grade)
    if (error) redirect(`${evaluationPath(pathParams)}/resultados?message=No se pudieron guardar las notas`)
  }
}
