import { StudentWithGrades } from '@/utils/schema'

interface CopyTableButtonProps {
  studentsWithGrades: StudentWithGrades[]
  onCopy: () => void
  copied: boolean
}

export function CopyTableButton({ studentsWithGrades, onCopy, copied }: CopyTableButtonProps) {
  return (
    <button
      className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs sm:text-sm"
      onClick={onCopy}
      disabled={studentsWithGrades.length === 0}
    >
      Copiar tabla
      {copied && <span className="ml-2 text-green-700 font-semibold">¡Tabla copiada!</span>}
    </button>
  )
} 