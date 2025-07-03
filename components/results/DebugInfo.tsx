import { StudentWithGrades } from '@/utils/schema'

interface DebugInfoProps {
  evaluation: any
  students: any[]
  studentsWithGrades: StudentWithGrades[]
}

export function DebugInfo({ evaluation, students, studentsWithGrades }: DebugInfoProps) {
  return (
    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
      <h3 className="font-semibold text-blue-800">Información de Debug:</h3>
      <p>Evaluación ID: {evaluation.id}</p>
      <p>Estudiantes totales: {students.length}</p>
      <p>Estudiantes con puntajes: {studentsWithGrades.filter(s => s.peerEvaluationScore !== null && s.peerEvaluationScore !== undefined).length}</p>
      <p>Estudiantes con puntajes válidos: {studentsWithGrades.filter(s => s.peerEvaluationScore && s.peerEvaluationScore !== 'N/A').length}</p>
    </div>
  )
} 