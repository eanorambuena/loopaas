import { getGroupMates, getResponsesByUserInfoId } from '@/utils/queries'
import { Evaluation, LinearQuestion, QuestionCriterion, Response } from '@/utils/schema'
import { Console } from '@/utils/console'

export interface PeerEvaluationResult {
  userInfoId: string
  peerEvaluationScore: number
  group: string
}

export async function calculatePeerEvaluationScore(
  evaluation: Evaluation, 
  students: any[], 
  courseAbbreviature: string, 
  courseSemester: string
): Promise<PeerEvaluationResult[]> {
  console.log('Starting peer evaluation calculation for evaluation:', evaluation.id)
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

  const firstQuestion = Object.values(evaluation.questions)[0] as LinearQuestion
  if (!firstQuestion || firstQuestion.type !== 'linear') {
    console.log('First question is not linear or not found')
    throw new Error('First question is not linear or not found')
  }

  console.log('First question criteria:', firstQuestion.criteria.length)

  const results: PeerEvaluationResult[] = []
  const pathParams = { abbreviature: courseAbbreviature, semester: courseSemester, id: evaluation.id }

  for (const student of students) {
    console.log(`Processing student: ${student.userInfoId}`)
    
    const groupMates = await getGroupMates(pathParams, student.userInfoId, evaluation)
    if (!groupMates || groupMates.length === 0) {
      console.log(`No group mates found for student: ${student.userInfoId}`)
      results.push({
        userInfoId: student.userInfoId,
        peerEvaluationScore: 0,
        group: student.group || 'N/A'
      })
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
    const peerEvaluationScore = Math.min(1, Math.max(-1, rawEvaluationGrade))
    
    results.push({
      userInfoId: student.userInfoId,
      peerEvaluationScore,
      group: student.group || 'N/A'
    })
    
    console.log(`Calculated peer evaluation score for student ${student.userInfoId}:`, peerEvaluationScore)
  }

  console.log('Peer evaluation scores calculated for students:', results.length)
  return results
} 