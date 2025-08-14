import { toChileTime, isDeadlinePassed, isDeadlineAvailable, getDaysUntilDeadline } from '@/utils/dateUtils'
import { describe, it, expect } from 'vitest'

describe('dateUtils', () => {
  describe('toChileTime', () => {
    it('should convert UTC date to Chile time', () => {
      // Test con una fecha UTC específica
      const utcDate = new Date('2025-07-02T00:00:00.000Z')
      const chileTime = toChileTime(utcDate)
      
      // Verificar que la fecha se convirtió correctamente
      expect(chileTime).toBeInstanceOf(Date)
      expect(chileTime.getTime()).not.toBe(utcDate.getTime())
    })

    it('should handle string dates', () => {
      const dateString = '2025-07-02T00:00:00.000Z'
      const chileTime = toChileTime(dateString)
      
      expect(chileTime).toBeInstanceOf(Date)
    })
  })

  describe('isDeadlinePassed', () => {
    it('should return false when deadline is in the future', () => {
      // Fecha límite: 2 de julio 2025
      const deadline = '2025-07-02T00:00:00.000Z'
      // Hora actual simulada: 1 de julio 2025
      const currentTime = new Date('2025-07-01T12:00:00.000Z')
      
      const result = isDeadlinePassed(deadline, currentTime)
      
      expect(result).toBe(false)
    })

    it('should return true when deadline is in the past', () => {
      // Fecha límite: 1 de julio 2025
      const deadline = '2025-07-01T00:00:00.000Z'
      // Hora actual simulada: 2 de julio 2025
      const currentTime = new Date('2025-07-02T12:00:00.000Z')
      
      const result = isDeadlinePassed(deadline, currentTime)
      
      expect(result).toBe(true)
    })

    it('should return false when deadline is today', () => {
      // Fecha límite: 1 de julio 2025
      const deadline = '2025-07-01T23:59:59.000Z'
      // Hora actual simulada: 1 de julio 2025
      const currentTime = new Date('2025-07-01T12:00:00.000Z')
      
      const result = isDeadlinePassed(deadline, currentTime)
      
      expect(result).toBe(false)
    })
  })

  describe('isDeadlineAvailable', () => {
    it('should return true when deadline is in the future', () => {
      // Fecha límite: 2 de julio 2025
      const deadline = '2025-07-02T00:00:00.000Z'
      // Hora actual simulada: 1 de julio 2025
      const currentTime = new Date('2025-07-01T12:00:00.000Z')
      
      const result = isDeadlineAvailable(deadline, currentTime)
      
      expect(result).toBe(true)
    })

    it('should return false when deadline is in the past', () => {
      // Fecha límite: 1 de julio 2025
      const deadline = '2025-07-01T00:00:00.000Z'
      // Hora actual simulada: 2 de julio 2025
      const currentTime = new Date('2025-07-02T12:00:00.000Z')
      
      const result = isDeadlineAvailable(deadline, currentTime)
      
      expect(result).toBe(false)
    })
  })

  describe('getDaysUntilDeadline', () => {
    it('should return positive days when deadline is in the future', () => {
      // Fecha límite: 3 de julio 2025
      const deadline = '2025-07-03T00:00:00.000Z'
      // Hora actual simulada: 1 de julio 2025
      const currentTime = new Date('2025-07-01T12:00:00.000Z')
      
      const result = getDaysUntilDeadline(deadline, currentTime)
      
      expect(result).toBeGreaterThan(0)
    })

    it('should return negative days when deadline is in the past', () => {
      // Fecha límite: 1 de julio 2025
      const deadline = '2025-07-01T00:00:00.000Z'
      // Hora actual simulada: 3 de julio 2025
      const currentTime = new Date('2025-07-03T12:00:00.000Z')
      
      const result = getDaysUntilDeadline(deadline, currentTime)
      
      expect(result).toBeLessThan(0)
    })

    it('should return 0 when deadline is today', () => {
      // Fecha límite: 1 de julio 2025
      const deadline = '2025-07-01T23:59:59.000Z'
      // Hora actual simulada: 1 de julio 2025
      const currentTime = new Date('2025-07-01T12:00:00.000Z')
      
      const result = getDaysUntilDeadline(deadline, currentTime)
      
      // Debería ser 0 o 1 dependiendo de la conversión de zona horaria
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(1)
    })
  })

  describe('Integration tests', () => {
    it('should handle the specific case from the user', () => {
      // Caso específico del usuario: deadline 1 de julio, hoy 30 de junio
      const deadline = '2025-07-01T00:00:00.000Z'
      const currentTime = new Date('2025-06-30T12:00:00.000Z')
      
      const isPassed = isDeadlinePassed(deadline, currentTime)
      const isAvailable = isDeadlineAvailable(deadline, currentTime)
      const daysUntil = getDaysUntilDeadline(deadline, currentTime)
      
      // La evaluación debería estar disponible
      expect(isPassed).toBe(false)
      expect(isAvailable).toBe(true)
      expect(daysUntil).toBeGreaterThan(0)
    })

    it('should handle edge case with timezone conversion', () => {
      // Test con fechas muy cercanas para verificar la conversión de zona horaria
      const deadline = '2025-07-01T23:59:59.000Z'
      const currentTime = new Date('2025-07-01T23:59:58.000Z')
      
      const isPassed = isDeadlinePassed(deadline, currentTime)
      
      // Debería estar disponible (1 segundo antes del deadline)
      expect(isPassed).toBe(false)
    })
  })
})
