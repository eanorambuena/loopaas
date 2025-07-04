'use client'

import { ColumnDef, VisibilityState } from '@tanstack/react-table'
import { GenericTable } from '@/components/GenericTable'
import { StudentWithGrades } from '@/utils/schema'
import { useEffect, useState } from 'react'

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

  // Responsive column visibility: hide Estudiante and Sección on mobile
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    userInfo: false, // Start hidden on mobile, will be updated in useEffect
    section: false,  // Start hidden on mobile, will be updated in useEffect
  })

  useEffect(() => {
    // Set initial visibility based on screen size
    const updateVisibility = () => {
      setColumnVisibility({
        userInfo: window.innerWidth >= 768,
        section: window.innerWidth >= 768,
      })
    }
    
    // Set initial state
    updateVisibility()
    
    // Add resize listener
    window.addEventListener('resize', updateVisibility)
    return () => window.removeEventListener('resize', updateVisibility)
  }, [])

  const columns: ColumnDef<any>[] = [
    {
      id: 'userInfo',
      accessorKey: 'userInfo',
      header: () => (
        <span className="hidden md:inline">Estudiante</span>
      ),
      cell: ({ row }) => {
        const s = row.original.userInfo
        return (
          <span className="hidden md:inline">{`${s?.firstName} ${s?.lastName}`}</span>
        )
      },
      enableHiding: true,
      meta: {
        displayName: 'Estudiante'
      }
    },
    {
      id: 'email',
      accessorFn: (row) => row.userInfo?.email,
      header: 'Correo',
      filterFn: 'includesString',
      cell: ({ row }) => row.original.userInfo?.email,
      meta: {
        displayName: 'Correo'
      }
    },
    {
      id: 'group',
      accessorKey: 'group',
      header: 'Grupo',
      filterFn: (row, columnId, filterValue) => {
        const rowValue = String(row.getValue(columnId))
        return filterValue === '' || rowValue === filterValue
      },
      cell: ({ row }) => row.original.group ?? 'N/A',
      meta: {
        displayName: 'Grupo'
      }
    },
    {
      id: 'section',
      accessorKey: 'section',
      header: () => (
        <span className="hidden md:inline">Sección</span>
      ),
      filterFn: (row, columnId, filterValue) => {
        const rowValue = String(row.getValue(columnId))
        return filterValue === '' || rowValue === filterValue
      },
      cell: ({ row }) => (
        <span className="hidden md:inline">{row.original.section ?? 'N/A'}</span>
      ),
      enableHiding: true,
      meta: {
        displayName: 'Sección'
      }
    },
    {
      id: 'peerEvaluationScore',
      accessorKey: 'peerEvaluationScore',
      header: () => (
        <span>
          <span className="md:hidden">Puntaje</span>
          <span className="hidden md:inline">Puntaje de Coevaluación</span>
        </span>
      ),
      cell: ({ row }) => {
        const score = row.original.peerEvaluationScore
        if (score === null || score === undefined || score === 'N/A') {
          return 'N/A'
        }
        const numScore = typeof score === 'string' ? parseFloat(score) : score
        return numScore.toFixed(2)
      },
      meta: {
        displayName: 'Puntaje de Coevaluación'
      }
    },
  ]

  return (
    <GenericTable
      data={studentsWithSection}
      columns={columns}
      filterColumnIds={['email', 'group', 'section']}
      emptyMessage='No hay resultados registrados.'
      columnVisibility={columnVisibility}
      setColumnVisibility={setColumnVisibility}
    />
  )
}
