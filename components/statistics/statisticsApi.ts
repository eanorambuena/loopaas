export async function fetchEvaluationData(evaluationId: string) {
  const response = await fetch(`/api/evaluations/${evaluationId}`)
  if (!response.ok) {
    throw new Error('Error al obtener información de la evaluación')
  }
  return response.json()
}

export async function fetchResponsesData(evaluationId: string) {
  const response = await fetch(`/api/evaluations/${evaluationId}/responses`)
  if (!response.ok) {
    throw new Error('Error al cargar las estadísticas')
  }
  return response.json()
}

export async function fetchStudentsData(courseId: string) {
  const response = await fetch(`/api/courses/${courseId}/students`)
  if (!response.ok) {
    throw new Error('Error al obtener estudiantes del curso')
  }
  return response.json()
}

export async function fetchPeerEvaluationScores(evaluation: any, students: any[]) {
  const response = await fetch('/api/get-peer-evaluation-scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      evaluation,
      students
    })
  })
  
  if (!response.ok) {
    throw new Error('Error al obtener scores de coevaluación')
  }
  
  return response.json()
} 