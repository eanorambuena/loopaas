'use client'

import LoadingSpinner from '@/components/LoadingSpinner'
import DailyResponsesChart from '@/components/statistics/DailyResponsesChart'
import GeneralStatsCards from '@/components/statistics/GeneralStatsCards'
import GroupStatsTable from '@/components/statistics/GroupStatsTable'
import InjusticeDetection from '@/components/statistics/InjusticeDetection'
import SectionFilter from '@/components/statistics/SectionFilter'
import TemporalAnalysis from '@/components/statistics/TemporalAnalysis'
import { useStatisticsDashboard } from '@/components/statistics/useStatisticsDashboard'

interface StatisticsDashboardProps {
  evaluationId: string
}

export default function StatisticsDashboard({ evaluationId }: StatisticsDashboardProps) {
  const {
    stats,
    dailyData,
    temporalStats,
    generalStats,
    loading,
    error,
    sections,
    selectedSection,
    injusticeCases,
    injusticeLoading,
    handleSectionChange
  } = useStatisticsDashboard(evaluationId)

  if (loading) {
    return <LoadingSpinner label='Cargando estadísticas...' />
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-lg text-red-600 dark:text-red-400'>Error: {error}</div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <SectionFilter
        sections={sections}
        selectedSection={selectedSection}
        onChange={handleSectionChange}
      />
      <GeneralStatsCards stats={generalStats} />
      <InjusticeDetection injusticeCases={injusticeCases} loading={injusticeLoading} />
      <TemporalAnalysis temporalStats={temporalStats} />
      <DailyResponsesChart dailyData={dailyData} />
      <GroupStatsTable stats={stats} />
    </div>
  )
}
