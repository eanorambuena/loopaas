import '@testing-library/jest-dom'

// Mock de fetch para tests
global.fetch = vi.fn()

// Mock de console para evitar logs en tests
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
} 