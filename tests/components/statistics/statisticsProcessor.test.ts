import { processResponsesData, processInjusticeCases } from '@/components/statistics/statisticsProcessor'

describe('statisticsProcessor', () => {
  describe('processResponsesData', () => {
    const mockStudents = [
      {
        userInfoId: 'user1',
        group: '1A',
        section: '1'
      },
      {
        userInfoId: 'user2',
        group: '1A',
        section: '1'
      },
      {
        userInfoId: 'user3',
        group: '2B',
        section: '2'
      },
      {
        userInfoId: 'user4',
        group: '2B',
        section: '2'
      }
    ]

    const mockResponses = [
      {
        userInfoId: 'user1',
        group: '1A',
        created_at: '2024-01-15T10:30:00Z'
      },
      {
        userInfoId: 'user2',
        group: '1A',
        created_at: '2024-01-15T14:20:00Z'
      },
      {
        userInfoId: 'user3',
        group: '2B',
        created_at: '2024-01-16T09:15:00Z'
      },
      {
        userInfoId: 'user4',
        group: '2B',
        created_at: '2024-01-16T16:45:00Z'
      }
    ]

    it('should process data correctly for all sections', () => {
      const result = processResponsesData(mockResponses, mockStudents, 'Todas')

      expect(result.generalStats.totalResponses).toBe(4)
      expect(result.generalStats.uniqueStudents).toBe(4)
      expect(result.generalStats.totalStudents).toBe(4)
      expect(result.generalStats.responseRate).toBe(100)
      expect(result.generalStats.activeDays).toBe(2)

      expect(result.groupStats).toHaveLength(2)
      expect(result.groupStats[0].group).toBe('1A')
      expect(result.groupStats[0].uniqueUsers).toBe(2)
      expect(result.groupStats[0].totalResponses).toBe(2)
      expect(result.groupStats[1].group).toBe('2B')
      expect(result.groupStats[1].uniqueUsers).toBe(2)
      expect(result.groupStats[1].totalResponses).toBe(2)

      expect(result.dailyData).toHaveLength(2)
      expect(result.dailyData[0].date).toBe('2024-01-15')
      expect(result.dailyData[0].responses).toBe(2)
      expect(result.dailyData[1].date).toBe('2024-01-16')
      expect(result.dailyData[1].responses).toBe(2)

      expect(result.temporalStats.hourOfDay).toHaveLength(24)
      expect(result.temporalStats.dayOfWeek).toHaveLength(7)
  expect(result.temporalStats.timeDistribution.length).toBeGreaterThanOrEqual(2)
      expect(result.temporalStats.peakHours).toHaveLength(4)
      expect(result.temporalStats.peakDays).toHaveLength(2)
    })

    it('should filter data by section correctly', () => {
      const result = processResponsesData(mockResponses, mockStudents, '1')

      expect(result.generalStats.totalResponses).toBe(2)
      expect(result.generalStats.uniqueStudents).toBe(2)
      expect(result.generalStats.totalStudents).toBe(2)
      expect(result.generalStats.responseRate).toBe(100)

      expect(result.groupStats).toHaveLength(1)
      expect(result.groupStats[0].group).toBe('1A')
      expect(result.groupStats[0].uniqueUsers).toBe(2)
      expect(result.groupStats[0].totalResponses).toBe(2)
    })

    it('should handle empty data', () => {
      const result = processResponsesData([], [], 'Todas')

      expect(result.generalStats.totalResponses).toBe(0)
      expect(result.generalStats.uniqueStudents).toBe(0)
      expect(result.generalStats.totalStudents).toBe(0)
      expect(result.generalStats.responseRate).toBe(0)
      expect(result.generalStats.activeDays).toBe(0)
      expect(result.groupStats).toHaveLength(0)
      expect(result.dailyData).toHaveLength(0)
    })

    it('should handle students without groups', () => {
      const studentsWithoutGroups = [
        { userInfoId: 'user1', group: null, section: '1' },
        { userInfoId: 'user2', group: undefined, section: '1' }
      ]

      const responsesWithoutGroups = [
        { userInfoId: 'user1', group: null, created_at: '2024-01-15T10:30:00Z' },
        { userInfoId: 'user2', group: undefined, created_at: '2024-01-15T14:20:00Z' }
      ]

      const result = processResponsesData(responsesWithoutGroups, studentsWithoutGroups, 'Todas')

      expect(result.groupStats).toHaveLength(1)
      expect(result.groupStats[0].group).toBe('Sin grupo')
      expect(result.groupStats[0].uniqueUsers).toBe(2)
      expect(result.groupStats[0].totalResponses).toBe(2)
    })

    it('should calculate temporal statistics correctly', () => {
      const responses = [
        {
          userInfoId: 'user1',
          group: '1A',
          created_at: '2024-01-15T10:30:00Z' // Mañana
        },
        {
          userInfoId: 'user2',
          group: '1A',
          created_at: '2024-01-15T14:20:00Z' // Tarde
        },
        {
          userInfoId: 'user3',
          group: '2B',
          created_at: '2024-01-15T20:15:00Z' // Noche
        }
      ]

      const result = processResponsesData(responses, mockStudents, 'Todas')

      expect(result.temporalStats.timeDistribution).toHaveLength(3)
      
      const morningPeriod = result.temporalStats.timeDistribution.find(p => p.period === 'Mañana')
      const afternoonPeriod = result.temporalStats.timeDistribution.find(p => p.period === 'Tarde')
      const nightPeriod = result.temporalStats.timeDistribution.find(p => p.period === 'Noche')

      expect(morningPeriod?.responses).toBe(1)
      expect(afternoonPeriod?.responses).toBe(1)
      expect(nightPeriod?.responses).toBe(1)
    })
  })

  describe('processInjusticeCases', () => {
    const mockStudentsWithScores = [
      {
        userInfoId: 'user1',
        name: 'Juan Pérez',
        email: 'juan@test.com',
        group: '1A',
        peerEvaluationScore: '-0.5'
      },
      {
        userInfoId: 'user2',
        name: 'María García',
        email: 'maria@test.com',
        group: '1A',
        peerEvaluationScore: '-0.3'
      },
      {
        userInfoId: 'user3',
        name: 'Carlos López',
        email: 'carlos@test.com',
        group: '2B',
        peerEvaluationScore: '0.2'
      },
      {
        userInfoId: 'user4',
        name: 'Ana Rodríguez',
        email: 'ana@test.com',
        group: '2B',
        peerEvaluationScore: '0.1'
      },
      {
        userInfoId: 'user5',
        name: 'Pedro Silva',
        email: 'pedro@test.com',
        group: '3C',
        peerEvaluationScore: '-0.8'
      }
    ]

    it('should detect injustice cases correctly', () => {
      const result = processInjusticeCases(mockStudentsWithScores)

    expect(result).toHaveLength(1)
      
    // Solo grupo 1A tiene más de 1 estudiante y promedio negativo
    expect(result[0].group).toBe('1A')
    expect(result[0].averageScore).toBe(-0.4)
    expect(result[0].studentCount).toBe(2)
    expect(result[0].students).toHaveLength(2)
    expect(result[0].students[0].score).toBe(-0.5)
    expect(result[0].students[1].score).toBe(-0.3)
    })

    it('should not include groups with positive averages', () => {
      const positiveGroupStudents = [
        {
          userInfoId: 'user1',
          name: 'Juan Pérez',
          group: '1A',
          peerEvaluationScore: '0.5'
        },
        {
          userInfoId: 'user2',
          name: 'María García',
          group: '1A',
          peerEvaluationScore: '0.3'
        }
      ]

      const result = processInjusticeCases(positiveGroupStudents)

      expect(result).toHaveLength(0)
    })

    it('should not include groups with less than 2 students', () => {
      const singleStudentGroup = [
        {
          userInfoId: 'user1',
          name: 'Juan Pérez',
          group: '1A',
          peerEvaluationScore: '-0.5'
        }
      ]

      const result = processInjusticeCases(singleStudentGroup)

      expect(result).toHaveLength(0)
    })

    it('should handle N/A scores correctly', () => {
      const studentsWithNA = [
        {
          userInfoId: 'user1',
          name: 'Juan Pérez',
          group: '1A',
          peerEvaluationScore: 'N/A'
        },
        {
          userInfoId: 'user2',
          name: 'María García',
          group: '1A',
          peerEvaluationScore: '-0.3'
        }
      ]

      const result = processInjusticeCases(studentsWithNA)

      expect(result).toHaveLength(1)
      expect(result[0].averageScore).toBe(-0.15) // (0 + -0.3) / 2
    })

    it('should handle students without groups', () => {
      const studentsWithoutGroups = [
        {
          userInfoId: 'user1',
          name: 'Juan Pérez',
          group: null,
          peerEvaluationScore: '-0.5'
        },
        {
          userInfoId: 'user2',
          name: 'María García',
          group: undefined,
          peerEvaluationScore: '-0.3'
        }
      ]

      const result = processInjusticeCases(studentsWithoutGroups)

      expect(result).toHaveLength(1)
      expect(result[0].group).toBe('Sin grupo')
      expect(result[0].averageScore).toBe(-0.4)
    })

    it('should sort students by score ascending within each group', () => {
      const studentsWithMixedScores = [
        {
          userInfoId: 'user1',
          name: 'Juan Pérez',
          group: '1A',
          peerEvaluationScore: '-0.1'
        },
        {
          userInfoId: 'user2',
          name: 'María García',
          group: '1A',
          peerEvaluationScore: '-0.5'
        },
        {
          userInfoId: 'user3',
          name: 'Carlos López',
          group: '1A',
          peerEvaluationScore: '-0.3'
        }
      ]

      const result = processInjusticeCases(studentsWithMixedScores)

      expect(result[0].students[0].score).toBe(-0.5)
      expect(result[0].students[1].score).toBe(-0.3)
      expect(result[0].students[2].score).toBe(-0.1)
    })

    it('should handle empty input', () => {
      const result = processInjusticeCases([])

      expect(result).toHaveLength(0)
    })
  })
}) 