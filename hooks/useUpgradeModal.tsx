'use client'

import { useState, useCallback } from 'react'

interface UseUpgradeModalReturn {
  isOpen: boolean
  triggerAction: string
  currentCount: number
  limit: number
  openModal: (action: string, currentCount: number, limit: number) => void
  closeModal: () => void
  checkLimitAndOpenModal: (action: 'cursos' | 'estudiantes' | 'evaluaciones', organizationId?: string) => Promise<boolean>
}

export function useUpgradeModal(): UseUpgradeModalReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [triggerAction, setTriggerAction] = useState('')
  const [currentCount, setCurrentCount] = useState(0)
  const [limit, setLimit] = useState(0)

  const openModal = useCallback((action: string, currentCount: number, limit: number) => {
    setTriggerAction(action)
    setCurrentCount(currentCount)
    setLimit(limit)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setTriggerAction('')
    setCurrentCount(0)
    setLimit(0)
  }, [])

  const checkLimitAndOpenModal = useCallback(async (action: 'cursos' | 'estudiantes' | 'evaluaciones', organizationId?: string): Promise<boolean> => {
    if (!organizationId) return false

    try {
      // Llamar a la API para verificar límites
      const response = await fetch('/api/plan-usage')
      if (!response.ok) {
        console.error('Error fetching plan usage')
        return false
      }

      const data = await response.json()
      const organization = data.organizations.find((org: any) => org.organizationId === organizationId)
      
      if (!organization) return false

      let currentUsage = 0
      let maxLimit = 0
      let canProceed = true

      switch (action) {
        case 'cursos':
          currentUsage = organization.currentUsage.courses
          maxLimit = organization.plan === 'Pro' ? Infinity : 3
          canProceed = currentUsage < maxLimit
          break
        case 'estudiantes':
          currentUsage = organization.currentUsage.students
          maxLimit = organization.plan === 'Pro' ? Infinity : 50
          canProceed = currentUsage < maxLimit
          break
        case 'evaluaciones':
          currentUsage = organization.currentUsage.evaluationsThisMonth
          maxLimit = organization.plan === 'Pro' ? Infinity : 10
          canProceed = currentUsage < maxLimit
          break
      }

      // Si no puede proceder (ha alcanzado el límite), mostrar modal
      if (!canProceed && maxLimit !== Infinity) {
        openModal(action, currentUsage, maxLimit)
        return true
      }

      return false
    } catch (error) {
      console.error('Error checking limits:', error)
      return false
    }
  }, [openModal])

  return {
    isOpen,
    triggerAction,
    currentCount,
    limit,
    openModal,
    closeModal,
    checkLimitAndOpenModal
  }
}
