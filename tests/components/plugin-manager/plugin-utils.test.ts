import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

vi.mock('@/utils/pluginSandbox', () => ({
  validatePluginCode: vi.fn((code: string) => {
    if (code.includes('eval(')) return 'Codigo contiene patron no permitido'
    return null
  }),
  createPluginSandbox: vi.fn(() => ({ cleanup: vi.fn() })),
}))

import { transpileCode, renderPluginComponentSafe } from '@/components/plugin-manager/plugin-utils'
import { validatePluginCode, createPluginSandbox } from '@/utils/pluginSandbox'

describe('transpileCode', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return transpiled code on success', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, transpiledCode: 'var x = 1' }),
    })
    global.fetch = mockFetch

    const result = await transpileCode('const x = 1')
    expect(result).toBe('var x = 1')
    expect(mockFetch).toHaveBeenCalledWith('/api/transpile-plugin', expect.objectContaining({
      method: 'POST',
    }))
  })

  it('should throw on API error response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false, error: 'Syntax error' }),
    })

    await expect(transpileCode('bad code')).rejects.toThrow('Syntax error')
  })

  it('should throw on network error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network fail'))

    await expect(transpileCode('code')).rejects.toThrow('Error de transpilacion')
  })
})

describe('renderPluginComponentSafe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return error element for dangerous code', async () => {
    const element = await renderPluginComponentSafe('eval("alert(1)")')

    expect(element.type).toBe('div')
    expect(validatePluginCode).toHaveBeenCalledWith('eval("alert(1)")')
  })

  it('should return a React element for safe code', async () => {
    const element = await renderPluginComponentSafe('function Component() { return null }')

    expect(React.isValidElement(element)).toBe(true)
  })

  it('should not call createPluginSandbox for dangerous code', async () => {
    await renderPluginComponentSafe('eval("x")')

    expect(createPluginSandbox).not.toHaveBeenCalled()
  })
})
