import { describe, it, expect } from 'vitest'
import type { Evaluation, StudentWithGrades, Grade } from '@/utils/schema'
import { getStudentsWithGradesSSR } from '@/lib/getStudentsWithGradesSSR'

const baseEvaluation: Evaluation = {
  id: '',
  title: '',
  courseId: '',
  instructions: '',
  deadLine: '',
  sections: [],
  questions: {}
}

const baseGrade: Grade = {
  id: '',
  created_at: '',
  userInfoId: '',
  evaluationId: '',
  score: null
}

describe('getStudentsWithGradesSSR', () => {
  it('devuelve los estudiantes con peerEvaluationScore correcto', async () => {
    const mockGetGrades = async (_eval: Evaluation, userId: string): Promise<Grade | undefined> => {
      if (userId === 'user1') return { ...baseGrade, score: 0.8 }
      if (userId === 'user2') return { ...baseGrade, score: 0.5 }
      return undefined
    }
    const students: StudentWithGrades[] = [
      { id: '1', userInfoId: 'user1', userInfo: null },
      { id: '2', userInfoId: 'user2', userInfo: null }
    ]
    const result = await getStudentsWithGradesSSR(baseEvaluation, students, mockGetGrades)
    expect(result[0].peerEvaluationScore).toBe(0.8)
    expect(result[1].peerEvaluationScore).toBe(0.5)
  })

  it('devuelve N/A si getGrades lanza error', async () => {
    const mockGetGrades = async (): Promise<Grade | undefined> => { throw new Error('fail') }
    const students: StudentWithGrades[] = [
      { id: '3', userInfoId: 'user3', userInfo: null }
    ]
    const result = await getStudentsWithGradesSSR(baseEvaluation, students, mockGetGrades)
    expect(result[0].peerEvaluationScore).toBe('N/A')
  })
})
