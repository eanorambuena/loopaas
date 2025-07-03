import { 
  fetchEvaluationData, 
  fetchResponsesData, 
  fetchStudentsData, 
  fetchPeerEvaluationScores 
} from '../statisticsApi'

// Mock fetch globally
global.fetch = jest.fn()

describe('statisticsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchEvaluationData', () => {
    it('should fetch evaluation data successfully', async () => {
      const mockEvaluationData = {
        id: 'eval123',
        courseId: 'course456',
        name: 'Test Evaluation'
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvaluationData
      })

      const result = await fetchEvaluationData('eval123')

      expect(fetch).toHaveBeenCalledWith('/api/evaluations/eval123')
      expect(result).toEqual(mockEvaluationData)
    })

    it('should throw error when response is not ok', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      })

      await expect(fetchEvaluationData('eval123')).rejects.toThrow(
        'Error al obtener información de la evaluación'
      )
    })

    it('should throw error when fetch fails', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      await expect(fetchEvaluationData('eval123')).rejects.toThrow('Network error')
    })
  })

  describe('fetchResponsesData', () => {
    it('should fetch responses data successfully', async () => {
      const mockResponsesData = {
        responses: [
          { userInfoId: 'user1', group: '1A', created_at: '2024-01-15T10:30:00Z' },
          { userInfoId: 'user2', group: '1A', created_at: '2024-01-15T14:20:00Z' }
        ]
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponsesData
      })

      const result = await fetchResponsesData('eval123')

      expect(fetch).toHaveBeenCalledWith('/api/evaluations/eval123/responses')
      expect(result).toEqual(mockResponsesData)
    })

    it('should throw error when response is not ok', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500
      })

      await expect(fetchResponsesData('eval123')).rejects.toThrow(
        'Error al cargar las estadísticas'
      )
    })
  })

  describe('fetchStudentsData', () => {
    it('should fetch students data successfully', async () => {
      const mockStudentsData = {
        students: [
          { userInfoId: 'user1', name: 'Juan Pérez', group: '1A' },
          { userInfoId: 'user2', name: 'María García', group: '1A' }
        ]
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockStudentsData
      })

      const result = await fetchStudentsData('course456')

      expect(fetch).toHaveBeenCalledWith('/api/courses/course456/students')
      expect(result).toEqual(mockStudentsData)
    })

    it('should throw error when response is not ok', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404
      })

      await expect(fetchStudentsData('course456')).rejects.toThrow(
        'Error al obtener estudiantes del curso'
      )
    })
  })

  describe('fetchPeerEvaluationScores', () => {
    it('should fetch peer evaluation scores successfully', async () => {
      const mockEvaluation = { id: 'eval123', courseId: 'course456' }
      const mockStudents = [
        { userInfoId: 'user1', name: 'Juan Pérez', group: '1A' },
        { userInfoId: 'user2', name: 'María García', group: '1A' }
      ]

      const mockScoresData = [
        { userInfoId: 'user1', name: 'Juan Pérez', peerEvaluationScore: '0.5' },
        { userInfoId: 'user2', name: 'María García', peerEvaluationScore: '0.3' }
      ]

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockScoresData
      })

      const result = await fetchPeerEvaluationScores(mockEvaluation, mockStudents)

      expect(fetch).toHaveBeenCalledWith('/api/get-peer-evaluation-scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          evaluation: mockEvaluation,
          students: mockStudents
        })
      })
      expect(result).toEqual(mockScoresData)
    })

    it('should throw error when response is not ok', async () => {
      const mockEvaluation = { id: 'eval123', courseId: 'course456' }
      const mockStudents = [{ userInfoId: 'user1', name: 'Juan Pérez', group: '1A' }]

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500
      })

      await expect(fetchPeerEvaluationScores(mockEvaluation, mockStudents)).rejects.toThrow(
        'Error al obtener scores de coevaluación'
      )
    })

    it('should throw error when fetch fails', async () => {
      const mockEvaluation = { id: 'eval123', courseId: 'course456' }
      const mockStudents = [{ userInfoId: 'user1', name: 'Juan Pérez', group: '1A' }]

      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      await expect(fetchPeerEvaluationScores(mockEvaluation, mockStudents)).rejects.toThrow('Network error')
    })
  })
}) 