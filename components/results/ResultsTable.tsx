'use client'

import { ColumnDef } from '@tanstack/react-table'
import { GenericTable } from '@/components/GenericTable'

interface StudentsWithGrades {
  id: string
  userInfo?: {
    firstName: string
    lastName: string
    email: string
  } | null
  userInfoId: string
  group?: string | null
  groupGrade?: string | number | null
  coGrade?: string | number | null
  finalGrade?: string | number | null
}

interface ResultsTableProps {
  students: StudentsWithGrades[]
}

export function ResultsTable({ students }: ResultsTableProps) {
  const columns: ColumnDef<StudentsWithGrades>[] = [
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
      accessorKey: 'groupGrade',
      header: 'Nota Grupal',
      cell: ({ row }) => row.original.groupGrade ?? 'N/A'
    },
    {
      accessorKey: 'coGrade',
      header: 'Coevaluación',
      cell: ({ row }) => row.original.coGrade ?? 'N/A'
    },
    {
      accessorKey: 'finalGrade',
      header: 'Nota Final',
      cell: ({ row }) => row.original.finalGrade ?? 'N/A'
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
