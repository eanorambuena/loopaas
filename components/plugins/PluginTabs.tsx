import React, { useState } from 'react'

interface PluginTabsProps {
  enabledPlugins: any[]
  activePermissions?: Set<string>
}

export default function PluginTabs({ enabledPlugins, activePermissions }: PluginTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(enabledPlugins[0]?.name || '')

  // Si no hay plugins activos, mostrar mensaje
  if (enabledPlugins.length === 0) {
    return (
      <section>
        <h3 className="text-lg font-semibold mb-4">Plugins Activos</h3>
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No hay plugins activos</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Activa permisos y habilita plugins arriba para verlos aquí
          </p>
        </div>
      </section>
    )
  }

  // Si solo hay un plugin, no mostrar tabs
  if (enabledPlugins.length === 1) {
    const plugin = enabledPlugins[0]
    const Component = getPluginComponent(plugin)
    
    if (!Component) {
      return (
        <section>
          <h3 className="text-lg font-semibold mb-4">Plugins Activos</h3>
          <div className="p-6 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <h4 className="font-semibold text-red-700 dark:text-red-300">Error en plugin: {plugin.name}</h4>
            <p className="text-red-600 dark:text-red-400">No se pudo cargar el componente del plugin</p>
          </div>
        </section>
      )
    }

    const enhancedProps = {
      ...plugin.props,
      activePermissions,
      permissionsArray: activePermissions ? Array.from(activePermissions) : []
    }

    return (
      <section>
        <h3 className="text-lg font-semibold mb-4">Plugin Activo</h3>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
          <div className="px-4 py-3 bg-emerald-50 dark:bg-emerald-950 border-b border-emerald-200 dark:border-emerald-800 rounded-t-lg">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">{plugin.name}</h4>
          </div>
          <div className="p-6">
            <Component {...enhancedProps} />
          </div>
        </div>
      </section>
    )
  }

  // Múltiples plugins: mostrar sistema de tabs
  const activePlugin = enabledPlugins.find(p => p.name === activeTab) || enabledPlugins[0]
  const Component = getPluginComponent(activePlugin)

  const enhancedProps = {
    ...activePlugin.props,
    activePermissions,
    permissionsArray: activePermissions ? Array.from(activePermissions) : []
  }

  return (
    <section>
      <h3 className="text-lg font-semibold mb-4">Plugins Activos ({enabledPlugins.length})</h3>
      
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {enabledPlugins.map((plugin) => (
            <button
              key={plugin.name}
              onClick={() => setActiveTab(plugin.name)}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === plugin.name
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {plugin.name}
              {activeTab === plugin.name && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {Component ? (
            <Component {...enhancedProps} />
          ) : (
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400">
                Error: No se pudo cargar el componente para el plugin "{activePlugin.name}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Función auxiliar para obtener el componente del plugin
function getPluginComponent(plugin: any) {
  if (!plugin) return null
  
  // Intentar obtener el componente de diferentes maneras
  let Component = plugin.component || plugin.Component || plugin.comp || plugin.default
  
  // Si el plugin es un módulo, intentar acceder a sus exportaciones
  if (!Component && typeof plugin === 'object' && plugin.Component) {
    Component = plugin.Component
  }
  
  // Si seguimos sin componente, intentar buscar en otras propiedades comunes
  if (!Component) {
    const possibleProps = ['render', 'view', 'UI', 'ReactComponent']
    for (const prop of possibleProps) {
      if (plugin[prop] && typeof plugin[prop] === 'function') {
        Component = plugin[prop]
        break
      }
    }
  }
  
  // Verificar que el componente sea válido
  if (!Component || (typeof Component !== 'function' && typeof Component !== 'object')) {
    console.warn(`Plugin "${plugin.name}" has an invalid component:`, Component)
    return null
  }
  
  return Component
}
