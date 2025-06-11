'use client'

import { ColumnDef } from '@tanstack/react-table'
import { GenericTable } from '@/components/GenericTable'
import { Response } from '@/utils/schema'
import { ResponseDisplay } from './ResponseDisplay'

export default function ResponsesTable({ responses }: { responses: Response[] }) {
  const columns: ColumnDef<Response>[] = [
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
      cell: ({ row }) => row.original.userInfo?.email
    },
    {
      accessorKey: 'data',
      header: 'Respuestas',
      cell: ({ row }) => <ResponseDisplay data={row.original.data} />,
    },
    {
      accessorKey: 'created_at',
      header: 'Fecha de envío',
      cell: ({ row }) => {
        const date = new Date(row.original.created_at)
        return date.toLocaleDateString('es-CL', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      },
    },
  ]

  return (
    <GenericTable
      data={responses}
      columns={columns}
      filterColumnIds={['email']}
      emptyMessage='No hay respuestas registradas.'
    />
  )
}
