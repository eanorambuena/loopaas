import { Evaluation, StudentWithGrades } from '@/utils/schema'
import { getGrades } from '@/utils/queries'

export async function getStudentsWithGradesSSR(evaluation: Evaluation, students: StudentWithGrades[]): Promise<StudentWithGrades[]> {
  return Promise.all(
    students.map(async (student) => {
      try {
        const grade = await getGrades(evaluation, student.userInfoId)
        return {
          ...student,
          peerEvaluationScore: grade?.score ?? 'N/A',
        }
      } catch (error) {
        return {
          ...student,
          peerEvaluationScore: 'N/A',
        }
      }
    })
  )
} 