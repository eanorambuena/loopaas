'use client'

import React from 'react'
import { GenericTable } from '@/components/GenericTable'
import type { ColumnDef } from '@tanstack/react-table'

type Professor = {
  id: string
  userInfo: {
    firstName: string
    lastName: string
    email: string
  }
}

type ProfessorsTableProps = {
  professors: Professor[]
}

type ProfessorRow = {
  id: string
  fullName: string
  email: string
}

export default function ProfessorsTable({ professors }: ProfessorsTableProps) {
  const data: ProfessorRow[] = professors.map(prof => ({
    id: prof.id,
    fullName: `${prof.userInfo.firstName} ${prof.userInfo.lastName}`,
    email: prof.userInfo.email,
  }))

  const columns: ColumnDef<ProfessorRow>[] = [
    {
      accessorKey: 'fullName',
      header: 'Nombre',
    },
    {
      accessorKey: 'email',
      header: 'Correo',
    },
  ]

  return (
    <GenericTable
      data={data}
      columns={columns}
      filterColumnIds={['fullName', 'email']}
      emptyMessage='No hay profesores registrados para este curso'
    />
  )
}
