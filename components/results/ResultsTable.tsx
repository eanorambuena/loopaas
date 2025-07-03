'use client'

import { ColumnDef } from '@tanstack/react-table'
import { GenericTable } from '@/components/GenericTable'
import { StudentWithGrades } from '@/utils/schema'

interface ResultsTableProps {
  students: StudentWithGrades[]
}

export function ResultsTable({ students }: ResultsTableProps) {
  const columns: ColumnDef<StudentWithGrades>[] = [
    {
      accessorKey: 'userInfo',
      header: 'Estudiante',
      cell: ({ row }) => {
        const s = row.original.userInfo
        return `${s?.firstName} ${s?.lastName}`
      },
    },
    {
      id: 'email',
      accessorFn: (row) => row.userInfo?.email,
      header: 'Correo',
      filterFn: 'includesString',
      cell: ({ row }) => row.original.userInfo?.email
    },
    {
      accessorKey: 'group',
      header: 'Grupo',
      filterFn: (row, columnId, filterValue) => {
        const rowValue = Number(row.getValue(columnId))
        const inputValue = Number(filterValue)
        return filterValue === '' || rowValue === inputValue
      },
      cell: ({ row }) => row.original.group ?? 'N/A'
    },
    {
      accessorKey: 'peerEvaluationScore',
      header: 'Puntaje de Coevaluación',
      cell: ({ row }) => {
        const score = row.original.peerEvaluationScore
        if (score === null || score === undefined || score === 'N/A') {
          return 'N/A'
        }
        const numScore = typeof score === 'string' ? parseFloat(score) : score
        return numScore.toFixed(2)
      }
    },
  ]

  return (
    <GenericTable
      data={students}
      columns={columns}
      filterColumnIds={['email', 'group']}
      emptyMessage='No hay resultados registrados.'
    />
  )
}
