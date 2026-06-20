// components/plugin-manager/plugin-utils.ts
import React from 'react'

/**
 * Transpila codigo JSX usando la API
 */
export const transpileCode = async (code: string): Promise<string> => {
  try {
    const response = await fetch('/api/transpile-plugin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code })
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'Error al transpilar el codigo')
    }

    return result.transpiledCode
  } catch (error) {
    throw new Error(`Error de transpilacion: ${error instanceof Error ? error.message : 'Error desconocido'}`)
  }
}

/**
 * Renderiza un componente de manera segura usando iframe sandbox
 */
export const renderPluginComponentSafe = async (code: string): Promise<React.ReactElement<any>> => {
  const { createPluginSandbox, validatePluginCode } = await import('@/utils/pluginSandbox')

  const validationError = validatePluginCode(code)
  if (validationError) {
    return React.createElement('div', {
      className: 'p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg'
    }, [
      React.createElement('h4', {
        key: 'title',
        className: 'text-red-800 dark:text-red-200 font-semibold mb-2'
      }, 'Error de seguridad:'),
      React.createElement('pre', {
        key: 'error',
        className: 'text-red-600 dark:text-red-300 text-sm whitespace-pre-wrap font-mono'
      }, validationError)
    ])
  }

  function PluginWrapper() {
    const ReactRef = React.useRef<HTMLDivElement>(null)
    const sandboxRef = React.useRef<{ cleanup: () => void } | null>(null)

    React.useEffect(() => {
      if (!ReactRef.current) return

      if (sandboxRef.current) {
        sandboxRef.current.cleanup()
      }

      sandboxRef.current = createPluginSandbox(code, ReactRef.current)

      return () => {
        if (sandboxRef.current) {
          sandboxRef.current.cleanup()
          sandboxRef.current = null
        }
      }
    }, [code])

    return React.createElement('div', {
      ref: ReactRef,
      style: { width: '100%', minHeight: '200px' }
    })
  }

  return React.createElement(PluginWrapper)
}
