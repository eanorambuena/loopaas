import { StudentWithGrades } from '@/utils/schema'

interface DebugInfoProps {
  evaluation: any
  students: any[]
  studentsWithGrades: StudentWithGrades[]
}

export function DebugInfo({ evaluation, students, studentsWithGrades }: DebugInfoProps) {
  return (
    <div className="mb-4 p-3 rounded border border-gray-200 bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2">Información de Debug</h3>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
        <div>
          <span className="font-medium">Evaluación ID:</span> {evaluation.id}
        </div>
        <div>
          <span className="font-medium">Estudiantes totales:</span> {students.length}
        </div>
        <div>
          <span className="font-medium">Con puntaje:</span> {studentsWithGrades.filter(s => s.peerEvaluationScore !== null && s.peerEvaluationScore !== undefined).length}
        </div>
        <div>
          <span className="font-medium">Con puntaje válido:</span> {studentsWithGrades.filter(s => s.peerEvaluationScore && s.peerEvaluationScore !== 'N/A').length}
        </div>
      </div>
    </div>
  )
} 