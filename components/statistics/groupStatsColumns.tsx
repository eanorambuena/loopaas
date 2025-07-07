import { ColumnDef } from '@tanstack/react-table'

interface GroupStats {
  group: string
  uniqueUsers: number
  totalResponses: number
  totalStudents: number
  responsePercentage: number
}

// Función para obtener la sección basada en el grupo
const getSection = (group: string): string => {
  if (!group || group === 'Sin grupo') return 'Sin sección'
  
  const groupNumber = parseInt(group)
  if (isNaN(groupNumber)) return 'Sin sección'
  
  // Tomar los n-1 primeros dígitos
  const groupStr = groupNumber.toString()
  if (groupStr.length <= 1) return groupStr
  
  return groupStr.slice(0, -1)
}

export const groupStatsColumns: ColumnDef<GroupStats>[] = [
  {
    accessorKey: 'group',
    header: 'Grupo',
    enableSorting: true,
    cell: ({ row }) => {
      const group = row.getValue('group') as string
      return group || 'Sin grupo'
    },
  },
  {
    id: 'section',
    accessorFn: (row) => getSection(row.group),
    header: 'Sección',
    enableSorting: true,
    filterFn: (row, id, value) => {
      const section = getSection(row.original.group)
      return section === value
    },
    cell: ({ row }) => {
      const section = getSection(row.original.group)
      return (
        <div className='font-medium text-purple-600 dark:text-purple-400'>
          {section}
        </div>
      )
    },
  },
  {
    accessorKey: 'uniqueUsers',
    header: 'Estudiantes que respondieron',
    enableSorting: true,
    cell: ({ row }) => {
      const count = row.getValue('uniqueUsers') as number
      return (
        <div className='font-medium text-emerald-600 dark:text-emerald-400'>
          {count}
        </div>
      )
    },
  },
  {
    accessorKey: 'totalResponses',
    header: 'Respuestas totales',
    enableSorting: true,
    meta: {
      hideOnMobile: true
    },
    cell: ({ row }) => {
      const count = row.getValue('totalResponses') as number
      return (
        <div className='font-medium text-blue-600 dark:text-blue-400'>
          {count}
        </div>
      )
    },
  },
  {
    accessorKey: 'responsePercentage',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <div className="flex items-center gap-2">
          <span>% Respuesta</span>
          <button
            onClick={() => {
              if (!isSorted) {
                column.toggleSorting(false) // ascendente
              } else if (isSorted === 'asc') {
                column.toggleSorting(true) // descendente
              } else {
                column.clearSorting() // sin ordenar
              }
            }}
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded transition-colors"
          >
            {!isSorted ? '↕' : isSorted === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      )
    },
    enableSorting: true,
    cell: ({ row }) => {
      const percentage = row.getValue('responsePercentage') as number
      const totalStudents = row.original.totalStudents
      const uniqueUsers = row.original.uniqueUsers
      
      return (
        <div className='font-medium text-orange-600 dark:text-orange-400'>
          {percentage.toFixed(1)}%
          <div className='text-xs text-gray-500'>
            ({uniqueUsers}/{totalStudents})
          </div>
        </div>
      )
    },
  },
] 