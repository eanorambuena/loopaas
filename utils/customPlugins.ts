// utils/customPlugins.ts
import { microkernel } from '@/app/plugins/pluginConfig'
import { validatePluginCode } from '@/utils/pluginSandbox'

export interface CustomPlugin {
  id: string
  name: string
  description: string
  code: string
  transpiledCode?: string
  enabled: boolean
  published?: boolean
}

export function getCustomPlugins(): CustomPlugin[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem('customPlugins')
    if (!stored) return []

    const plugins = JSON.parse(stored)
    return Array.isArray(plugins) ? plugins : []
  } catch (error) {
    console.error('Error loading custom plugins:', error)
    return []
  }
}

export function getPublishedCustomPlugins(): CustomPlugin[] {
  return getCustomPlugins().filter(plugin => plugin.published)
}

export function registerPublishedPlugins() {
  const publishedPlugins = getPublishedCustomPlugins()

  clearCustomPluginsFromMicrokernel()

  publishedPlugins.forEach(plugin => {
    try {
      if (!plugin.code) {
        console.warn(`Plugin ${plugin.name} no tiene codigo`)
        return
      }

      const validationError = validatePluginCode(plugin.code)
      if (validationError) {
        console.warn(`Plugin ${plugin.name} tiene codigo no permitido: ${validationError}`)
        return
      }

      const marketplacePlugin = {
        id: `custom-${plugin.id}`,
        permissions: [],
        metadata: {
          name: plugin.name,
          description: plugin.description || 'Plugin personalizado creado por el usuario',
          preferredWidth: 'medium' as const,
          author: 'Usuario',
          version: '1.0.0',
          isCustom: true
        },
        component: function CustomPluginComponent(props: any) {
          const React = require('react')
          const { useRef, useEffect } = React

          function PluginWrapper(innerProps: any) {
            const containerRef = useRef<HTMLDivElement>(null)
            const sandboxRef = useRef<{ cleanup: () => void } | null>(null)

            useEffect(() => {
              if (!containerRef.current) return

              // Clean up previous sandbox
              if (sandboxRef.current) {
                sandboxRef.current.cleanup()
              }

              // Dynamic import to avoid SSR issues
              import('@/utils/pluginSandbox').then(({ createPluginSandbox }) => {
                if (containerRef.current) {
                  sandboxRef.current = createPluginSandbox(
                    plugin.code,
                    containerRef.current,
                    innerProps
                  )
                }
              })

              return () => {
                if (sandboxRef.current) {
                  sandboxRef.current.cleanup()
                  sandboxRef.current = null
                }
              }
            }, [plugin.code, JSON.stringify(innerProps)])

            return React.createElement('div', {
              ref: containerRef,
              style: { width: '100%', minHeight: '200px' }
            })
          }

          return React.createElement(PluginWrapper, props)
        }
      }

      microkernel.registerPlugins([marketplacePlugin])
      console.log(`Plugin personalizado "${plugin.name}" registrado en el marketplace`)

    } catch (error) {
      console.error(`Error registrando plugin personalizado ${plugin.name}:`, error)
    }
  })
}

function clearCustomPluginsFromMicrokernel() {
  try {
    const allPlugins = microkernel.getAllPlugins()
    const originalPlugins = allPlugins.filter((plugin: any) => !plugin.metadata?.isCustom)
    console.log('Limpiando plugins personalizados del microkernel')
  } catch (error) {
    console.warn('No se pudieron limpiar los plugins personalizados del microkernel:', error)
  }
}

export function initializeCustomPlugins() {
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', registerPublishedPlugins)
    } else {
      registerPublishedPlugins()
    }
  }
}

export function refreshPublishedPlugins() {
  if (typeof window !== 'undefined') {
    registerPublishedPlugins()
  }
}
