import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('swr', () => ({
  default: vi.fn(() => ({
    data: null,
    error: null,
    isLoading: false,
    mutate: vi.fn(),
  })),
}))

vi.mock('@/utils/hooks/useCurrentUser', () => ({
  default: () => ({
    user: { id: 'test-user-id', email: 'test@test.com' },
    mutate: vi.fn(),
  }),
}))

import useUserInfo from '@/utils/hooks/useUserInfo'

describe('useUserInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should accept zero arguments', () => {
    expect(() => useUserInfo()).not.toThrow()
  })

  it('should return userInfo, isLoading, error, and refetch', () => {
    const { result } = renderHook(() => useUserInfo())
    expect(result.current).toHaveProperty('userInfo')
    expect(result.current).toHaveProperty('isLoading')
    expect(result.current).toHaveProperty('error')
    expect(result.current).toHaveProperty('refetch')
    expect(typeof result.current.refetch).toBe('function')
  })
})
