import { addSectionToStudents, getUniqueSections } from '@/utils/statistics'

describe('statisticsUtils', () => {
  describe('addSectionToStudents', () => {
    it('should add section property to students based on group', () => {
      const students = [
        { userInfoId: 'user1', group: '1A', name: 'Juan Pérez' },
        { userInfoId: 'user2', group: '2B', name: 'María García' },
        { userInfoId: 'user3', group: '10C', name: 'Carlos López' },
        { userInfoId: 'user4', group: 'A', name: 'Ana Rodríguez' }
      ]

      const result = addSectionToStudents(students)

      expect(result).toHaveLength(4)
      expect(result[0].section).toBe('1')
      expect(result[1].section).toBe('2')
      expect(result[2].section).toBe('10')
      expect(result[3].section).toBe('A')
    })

    it('should handle students without groups', () => {
      const students = [
        { userInfoId: 'user1', group: null, name: 'Juan Pérez' },
        { userInfoId: 'user2', group: undefined, name: 'María García' },
        { userInfoId: 'user3', name: 'Carlos López' } // sin group property
      ]

      const result = addSectionToStudents(students)

      expect(result).toHaveLength(3)
      expect(result[0].section).toBe('Sin sección')
      expect(result[1].section).toBe('Sin sección')
      expect(result[2].section).toBe('Sin sección')
    })

    it('should handle empty array', () => {
      const result = addSectionToStudents([])

      expect(result).toHaveLength(0)
    })

    it('should handle groups with single character', () => {
      const students = [
        { userInfoId: 'user1', group: 'A', name: 'Juan Pérez' },
        { userInfoId: 'user2', group: '1', name: 'María García' }
      ]

      const result = addSectionToStudents(students)

      expect(result[0].section).toBe('A')
      expect(result[1].section).toBe('1')
    })

    it('should handle groups with multiple characters', () => {
      const students = [
        { userInfoId: 'user1', group: '12A', name: 'Juan Pérez' },
        { userInfoId: 'user2', group: 'ABC', name: 'María García' }
      ]

      const result = addSectionToStudents(students)

      expect(result[0].section).toBe('12')
      expect(result[1].section).toBe('AB')
    })
  })

  describe('getUniqueSections', () => {
    it('should return unique sections from students', () => {
      const students = [
        { userInfoId: 'user1', group: '1A', section: '1' },
        { userInfoId: 'user2', group: '1B', section: '1' },
        { userInfoId: 'user3', group: '2A', section: '2' },
        { userInfoId: 'user4', group: '2B', section: '2' },
        { userInfoId: 'user5', group: '3A', section: '3' }
      ]

      const result = getUniqueSections(students)

      expect(result).toHaveLength(3)
      expect(result).toContain('1')
      expect(result).toContain('2')
      expect(result).toContain('3')
    })

    it('should handle students without sections', () => {
      const students = [
        { userInfoId: 'user1', group: '1A', section: '1' },
        { userInfoId: 'user2', group: '2A', section: '2' },
        { userInfoId: 'user3', group: null, section: 'N/A' }
      ]

      const result = getUniqueSections(students)

      expect(result).toHaveLength(3)
      expect(result).toContain('1')
      expect(result).toContain('2')
      expect(result).toContain('N/A')
    })

    it('should handle empty array', () => {
      const result = getUniqueSections([])

      expect(result).toHaveLength(0)
    })

    it('should handle duplicate sections', () => {
      const students = [
        { userInfoId: 'user1', group: '1A', section: '1' },
        { userInfoId: 'user2', group: '1B', section: '1' },
        { userInfoId: 'user3', group: '1C', section: '1' },
        { userInfoId: 'user4', group: '2A', section: '2' }
      ]

      const result = getUniqueSections(students)

      expect(result).toHaveLength(2)
      expect(result).toContain('1')
      expect(result).toContain('2')
    })

    it('should handle students without section property', () => {
      const students = [
        { userInfoId: 'user1', group: '1A' },
        { userInfoId: 'user2', group: '2A' }
      ]

      const result = getUniqueSections(students)

      expect(result).toHaveLength(0) // No sections to extract
    })
  })
}) 