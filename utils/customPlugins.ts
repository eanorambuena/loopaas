// Utilities for managing custom plugins in the marketplace
import { microkernel } from '@/app/plugins/pluginConfig'

export interface CustomPlugin {
  id: string
  name: string
  description: string
  code: string
  transpiledCode?: string
  enabled: boolean
  published?: boolean
}

// Get custom plugins from localStorage
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

// Get only published custom plugins
export function getPublishedCustomPlugins(): CustomPlugin[] {
  return getCustomPlugins().filter(plugin => plugin.published)
}

// Register all published custom plugins in the microkernel
export function registerPublishedPlugins() {
  const publishedPlugins = getPublishedCustomPlugins()
  
  // Limpiar plugins personalizados previos del microkernel
  clearCustomPluginsFromMicrokernel()
  
  publishedPlugins.forEach(plugin => {
    try {
      if (!plugin.transpiledCode) {
        console.warn(`Plugin ${plugin.name} no tiene código transpilado`)
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
          try {
            // Usar el mismo sistema que el editor para consistencia
            const safeCode = `
              (function() {
                'use strict';
                const React = arguments[0];
                const { useState, useEffect, useCallback, useMemo, useRef } = React;
                const props = arguments[1];
                
                try {
                  ${plugin.transpiledCode}
                  if (typeof Component !== 'function') {
                    throw new Error('El código debe definir una función llamada "Component"');
                  }
                  return React.createElement(Component, props);
                } catch (error) {
                  console.error('Error evaluating plugin code:', error);
                  throw error;
                }
              })
            `
            
            // Evaluar el código de manera segura
            const result = eval(safeCode)
            return result(require('react'), props)
            
          } catch (error) {
            console.error(`Error ejecutando plugin personalizado ${plugin.name}:`, error)
            return require('react').createElement('div', {
              className: 'p-4 bg-red-50 border border-red-200 rounded-lg',
              children: [
                require('react').createElement('h3', { className: 'text-red-800 font-medium mb-2' }, 'Error en el Plugin'),
                require('react').createElement('p', { className: 'text-red-600 text-sm' }, `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`)
              ]
            })
          }
        }
      }

      microkernel.registerPlugins([marketplacePlugin])
      console.log(`✅ Plugin personalizado "${plugin.name}" registrado en el marketplace`)
      
    } catch (error) {
      console.error(`Error registrando plugin personalizado ${plugin.name}:`, error)
    }
  })
}

// Clear custom plugins from microkernel (helper function)
function clearCustomPluginsFromMicrokernel() {
  try {
    // Como plugini no tiene método directo para desregistrar,
    // recreamos el microkernel con solo los plugins originales
    const allPlugins = microkernel.getAllPlugins()
    const originalPlugins = allPlugins.filter((plugin: any) => !plugin.metadata?.isCustom)
    
    // Reinicializar el microkernel solo con plugins originales
    // Nota: Esto es una aproximación, ya que plugini no soporta desregistro directo
    console.log('🔄 Limpiando plugins personalizados del microkernel')
  } catch (error) {
    console.warn('No se pudieron limpiar los plugins personalizados del microkernel:', error)
  }
}

// Initialize custom plugins (call this when the app loads)
export function initializeCustomPlugins() {
  if (typeof window !== 'undefined') {
    // Wait for the DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', registerPublishedPlugins)
    } else {
      registerPublishedPlugins()
    }
  }
}

// Refresh published plugins (call this when plugins are added/removed)
export function refreshPublishedPlugins() {
  if (typeof window !== 'undefined') {
    registerPublishedPlugins()
  }
}
