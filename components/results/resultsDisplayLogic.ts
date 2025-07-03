import { StudentWithGrades } from '@/utils/schema'

export async function fetchStudentsWithGrades(evaluation: any, students: any[]): Promise<StudentWithGrades[]> {
  const response = await fetch('/api/get-students-with-grades', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ evaluation, students })
  })
  if (!response.ok) throw new Error('Error al obtener notas desde la base de datos')
  return await response.json()
}

export async function fetchStudentPeerScore(evaluation: any, student: any) {
  const response = await fetch('/api/get-peer-evaluation-scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ evaluation, students: [student] })
  })
  if (!response.ok) throw new Error('Error al calcular puntaje')
  const [result] = await response.json()
  return result
}

export async function persistStudentGrade(userInfoId: string, evaluationId: string, score: number, studentName: string) {
  const response = await fetch('/api/save-grade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userInfoId, evaluationId, score })
  })
  if (response.ok) {
    console.log(`Puntaje guardado en Supabase para estudiante: ${studentName} (${userInfoId}) = ${score}`)
  }
}

export function getFullStudentName(userInfo: any) {
  return `${userInfo?.firstName ?? ''} ${userInfo?.lastName ?? ''}`.trim()
}

export function getSectionFromGroup(group: string | number | null | undefined): string {
  if (!group) return 'N/A'
  const groupStr = String(group)
  if (groupStr.length <= 1) return groupStr
  return groupStr.slice(0, -1)
}

export function getTableRows(studentsWithGrades: StudentWithGrades[]) {
  return studentsWithGrades.map(student => [
    getFullStudentName(student.userInfo),
    student.userInfo?.email ?? '',
    student.group ?? '',
    getSectionFromGroup(student.group),
    student.peerEvaluationScore ?? ''
  ])
} 