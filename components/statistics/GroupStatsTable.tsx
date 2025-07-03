'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { GenericTable } from '@/components/GenericTable'
import { groupStatsColumns } from './groupStatsColumns'
import { GroupStats } from './types'

interface GroupStatsTableProps {
  stats: GroupStats[]
}

export default function GroupStatsTable({ stats }: GroupStatsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas por Grupo</CardTitle>
        <CardDescription>
          Detalle de usuarios únicos y total de respuestas por grupo y sección. Ordenado por número de grupo.
        </CardDescription>
      </CardHeader>
      <CardContent className='pb-0'>
        <GenericTable
          data={stats}
          columns={groupStatsColumns}
          filterColumnIds={['section']}
          emptyMessage='No hay datos de estadísticas por grupo disponibles.'
        />
      </CardContent>
    </Card>
  )
} 