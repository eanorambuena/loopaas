import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'

vi.mock('@/app/plugins/pluginConfig', () => ({
  microkernel: {
    registerPlugins: vi.fn(),
    getAllPlugins: vi.fn().mockReturnValue([]),
  },
}))

vi.mock('@/utils/customPlugins', () => ({
  refreshPublishedPlugins: vi.fn(),
}))

vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}))

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
    get length() { return Object.keys(store).length },
    key: (i: number) => Object.keys(store)[i] || null,
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

import { CustomPluginManager } from '@/components/CustomPluginManager'

describe('CustomPluginManager', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render without crashing', () => {
    render(<CustomPluginManager />)
    expect(screen.getByText('Mis Plugins Personalizados')).toBeDefined()
  })

  it('should show empty state when no plugins', () => {
    render(<CustomPluginManager />)
    expect(screen.getByText('No hay plugins personalizados')).toBeDefined()
  })

  it('should show create button', () => {
    render(<CustomPluginManager />)
    expect(screen.getByText(/Crear Nuevo Plugin/)).toBeDefined()
  })

  it('should show plugins from localStorage', () => {
    const plugins = [
      { id: '1', name: 'Test Plugin', description: 'A test', code: '<div/>', enabled: true },
    ]
    localStorage.setItem('customPlugins', JSON.stringify(plugins))

    render(<CustomPluginManager />)
    expect(screen.getByText('Test Plugin')).toBeDefined()
    expect(screen.getByText('A test')).toBeDefined()
  })

  it('should show published badge for published plugins', () => {
    const plugins = [
      { id: '1', name: 'Published', code: '<div/>', enabled: true, published: true, description: '' },
    ]
    localStorage.setItem('customPlugins', JSON.stringify(plugins))

    render(<CustomPluginManager />)
    expect(screen.getByText('Publicado')).toBeDefined()
  })
})
