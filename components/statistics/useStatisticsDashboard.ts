import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GeneralStats, TemporalStats, DailyResponse, GroupStats, InjusticeCase } from './types'
import { addSectionToStudents, getUniqueSections } from '@/utils/statistics'
import { processResponsesData, processInjusticeCases } from './statisticsProcessor'
import { 
  fetchEvaluationData, 
  fetchResponsesData, 
  fetchStudentsData, 
  fetchPeerEvaluationScores 
} from './statisticsApi'

export function useStatisticsDashboard(evaluationId: string) {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [stats, setStats] = useState<GroupStats[]>([])
  const [dailyData, setDailyData] = useState<DailyResponse[]>([])
  const [temporalStats, setTemporalStats] = useState<TemporalStats>({
    hourOfDay: [],
    dayOfWeek: [],
    timeDistribution: [],
    peakHours: [],
    peakDays: []
  })
  const [generalStats, setGeneralStats] = useState<GeneralStats>({
    totalResponses: 0,
    uniqueStudents: 0,
    activeDays: 0,
    averageResponsesPerDay: 0,
    totalStudents: 0,
    responseRate: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sections, setSections] = useState<string[]>([])
  const [selectedSection, setSelectedSection] = useState<string>('Todas')
  const [injusticeCases, setInjusticeCases] = useState<InjusticeCase[]>([])
  const [injusticeLoading, setInjusticeLoading] = useState(false)

  // Inicializar sección desde search params
  useEffect(() => {
    const sectionFromParams = searchParams.get('section')
    if (sectionFromParams) {
      setSelectedSection(sectionFromParams)
    }
  }, [searchParams])

  // Actualizar URL cuando cambia la sección
  const handleSectionChange = (section: string) => {
    setSelectedSection(section)
    const params = new URLSearchParams(searchParams.toString())
    if (section === 'Todas') {
      params.delete('section')
    } else {
      params.set('section', section)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // Obtener respuestas
        const data = await fetchResponsesData(evaluationId)
        
        // Obtener información del curso para saber el courseId
        const evaluationData = await fetchEvaluationData(evaluationId)
        
        // Obtener todos los estudiantes del curso
        const studentsData = await fetchStudentsData(evaluationData.courseId)

        // Agregar propiedad section calculada a cada estudiante y extraer secciones únicas
        const studentsWithSection = addSectionToStudents(studentsData.students || [])
        const uniqueSections = getUniqueSections(studentsWithSection)
        setSections(uniqueSections)

        // Procesar datos principales
        const processedData = processResponsesData(data.responses, studentsWithSection, selectedSection)
        
        setGeneralStats(processedData.generalStats)
        setTemporalStats(processedData.temporalStats)
        setDailyData(processedData.dailyData)
        setStats(processedData.groupStats)
        
        // Detectar casos de injusticia basados en coevaluación
        setInjusticeLoading(true)
        try {
          const studentsWithScores = await fetchPeerEvaluationScores(evaluationData, studentsWithSection)
          const detectedInjustices = processInjusticeCases(studentsWithScores)
          setInjusticeCases(detectedInjustices)
        } catch (peerError) {
          console.error('Error fetching peer evaluation scores:', peerError)
          // No fallar completamente si no se pueden obtener los scores de coevaluación
        } finally {
          setInjusticeLoading(false)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [evaluationId, selectedSection])

  return {
    // State
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
    
    // Actions
    handleSectionChange
  }
} 