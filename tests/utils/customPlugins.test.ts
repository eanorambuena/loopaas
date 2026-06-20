import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/app/plugins/pluginConfig', () => ({
  microkernel: {
    registerPlugins: vi.fn(),
    getAllPlugins: vi.fn().mockReturnValue([]),
  },
}))

import { getCustomPlugins, getPublishedCustomPlugins } from '@/utils/customPlugins'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

describe('customPlugins', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('getCustomPlugins', () => {
    it('should return empty array when no plugins stored', () => {
      expect(getCustomPlugins()).toEqual([])
    })

    it('should return empty array for invalid JSON', () => {
      localStorage.setItem('customPlugins', 'not-json')
      expect(getCustomPlugins()).toEqual([])
    })

    it('should return empty array for non-array data', () => {
      localStorage.setItem('customPlugins', JSON.stringify({ not: 'array' }))
      expect(getCustomPlugins()).toEqual([])
    })

    it('should return parsed plugins from localStorage', () => {
      const plugins = [
        { id: '1', name: 'Test', code: '<div/>', enabled: true },
        { id: '2', name: 'Test 2', code: '<span/>', enabled: false },
      ]
      localStorage.setItem('customPlugins', JSON.stringify(plugins))
      expect(getCustomPlugins()).toEqual(plugins)
    })
  })

  describe('getPublishedCustomPlugins', () => {
    it('should return only published plugins', () => {
      const plugins = [
        { id: '1', name: 'Published', code: '<div/>', enabled: true, published: true },
        { id: '2', name: 'Draft', code: '<span/>', enabled: true, published: false },
        { id: '3', name: 'No flag', code: '<p/>', enabled: true },
      ]
      localStorage.setItem('customPlugins', JSON.stringify(plugins))
      expect(getPublishedCustomPlugins()).toHaveLength(1)
      expect(getPublishedCustomPlugins()[0].name).toBe('Published')
    })

    it('should return empty array when no published plugins', () => {
      const plugins = [
        { id: '1', name: 'Draft', code: '<div/>', enabled: true, published: false },
      ]
      localStorage.setItem('customPlugins', JSON.stringify(plugins))
      expect(getPublishedCustomPlugins()).toEqual([])
    })
  })
})
