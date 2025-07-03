'use client'

import { ColumnDef } from '@tanstack/react-table'
import { GenericTable } from '@/components/GenericTable'
import { StudentWithGrades } from '@/utils/schema'

function getSectionFromGroup(group: string | number | null | undefined): string {
  if (!group) return 'N/A'
  const g = String(group)
  if (g.length <= 1) return g
  return g.slice(0, -1)
}

interface ResultsTableProps {
  students: StudentWithGrades[]
}

export function ResultsTable({ students }: ResultsTableProps) {
  const studentsWithSection = students.map(s => ({
    ...s,
    section: getSectionFromGroup(s.group)
  }))

  const columns: ColumnDef<any>[] = [
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
        const rowValue = String(row.getValue(columnId))
        return filterValue === '' || rowValue === filterValue
      },
      cell: ({ row }) => row.original.group ?? 'N/A'
    },
    {
      accessorKey: 'section',
      header: 'Sección',
      filterFn: (row, columnId, filterValue) => {
        const rowValue = String(row.getValue(columnId))
        return filterValue === '' || rowValue === filterValue
      },
      cell: ({ row }) => row.original.section ?? 'N/A'
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
      data={studentsWithSection}
      columns={columns}
      filterColumnIds={['email', 'group', 'section']}
      emptyMessage='No hay resultados registrados.'
    />
  )
}
