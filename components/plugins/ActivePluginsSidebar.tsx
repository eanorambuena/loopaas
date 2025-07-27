import React, { useState } from 'react'
import PluginRenderer from './PluginRenderer'

interface ActivePluginsSidebarProps {
  enabledPlugins: any[]
  activePermissions?: Set<string>
}

export default function ActivePluginsSidebar({ enabledPlugins, activePermissions }: ActivePluginsSidebarProps) {
  const [selectedPlugin, setSelectedPlugin] = useState<number>(0)

  // Debug: log the enabledPlugins to see what we're receiving
  React.useEffect(() => {
    console.log('ActivePluginsSidebar - Number of enabled plugins:', enabledPlugins.length)
    if (enabledPlugins.length > 0) {
      console.log('ActivePluginsSidebar - First plugin structure:', enabledPlugins[0])
    }
  }, [enabledPlugins])

  if (enabledPlugins.length === 0) {
    return (
      <section className="w-full">
        <h3 className="text-lg font-semibold mb-4">Plugins Activos</h3>
        <div className="p-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">No hay plugins activos</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Habilita algunos plugins arriba para verlos aquí organizados
          </p>
        </div>
      </section>
    )
  }

  const currentPlugin = enabledPlugins[selectedPlugin]

  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold mb-4">Plugins Activos</h3>
      
      <div className="flex h-[600px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header del sidebar */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-emerald-50 dark:bg-emerald-950">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Lista de Plugins
            </h4>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
              {enabledPlugins.length} plugin{enabledPlugins.length !== 1 ? 's' : ''} activo{enabledPlugins.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Lista de plugins */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 dark:scrollbar-track-gray-700 scrollbar-thumb-emerald-300 dark:scrollbar-thumb-emerald-600 hover:scrollbar-thumb-emerald-400 dark:hover:scrollbar-thumb-emerald-500">
            {enabledPlugins.map((plugin, index) => {
              const isSelected = selectedPlugin === index
              const pluginName = plugin.name || `Plugin ${index + 1}`
              const pluginId = plugin.id || `plugin-${index}`
              
              return (
                <button
                  key={pluginId}
                  onClick={() => setSelectedPlugin(index)}
                  className={`w-full p-4 text-left border-b border-gray-200 dark:border-gray-700 
                            transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700
                            ${isSelected 
                              ? 'bg-emerald-100 dark:bg-emerald-900 border-l-4 border-l-emerald-500 shadow-sm' 
                              : 'hover:border-l-4 hover:border-l-emerald-300 dark:hover:border-l-emerald-600'
                            }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icono placeholder - aquí se podría añadir el icono del plugin en el futuro */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm
                                   ${isSelected 
                                     ? 'bg-emerald-500' 
                                     : 'bg-gradient-to-br from-gray-400 to-gray-500'
                                   }`}>
                      {pluginName.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h5 className={`font-semibold text-sm truncate
                                     ${isSelected 
                                       ? 'text-emerald-700 dark:text-emerald-300' 
                                       : 'text-gray-700 dark:text-gray-300'
                                     }`}>
                        {pluginName}
                      </h5>
                      
                      <p className={`text-xs mt-1 truncate
                                    ${isSelected 
                                      ? 'text-emerald-600 dark:text-emerald-400' 
                                      : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                        {plugin.description || 'Plugin personalizado'}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-2 h-2 rounded-full
                                       ${isSelected 
                                         ? 'bg-emerald-500' 
                                         : 'bg-gray-400'
                                       }`}></div>
                        <span className={`text-xs font-medium
                                        ${isSelected 
                                          ? 'text-emerald-600 dark:text-emerald-400' 
                                          : 'text-gray-500 dark:text-gray-400'
                                        }`}>
                          ID: {pluginId}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="text-emerald-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col">
          {/* Header del plugin activo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {(currentPlugin?.name || 'P').charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-xl text-emerald-700 dark:text-emerald-300">
                  {currentPlugin?.name || `Plugin ${selectedPlugin + 1}`}
                </h4>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                  {currentPlugin?.description || 'Plugin personalizado activo'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-500 text-white px-3 py-1 rounded-full font-medium shadow-sm">
                  Activo
                </span>
                <div className="text-xs text-emerald-600 dark:text-emerald-400">
                  {selectedPlugin + 1} de {enabledPlugins.length}
                </div>
              </div>
            </div>
          </div>

          {/* Contenido del plugin */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 dark:scrollbar-track-gray-800 scrollbar-thumb-emerald-300 dark:scrollbar-thumb-emerald-600 hover:scrollbar-thumb-emerald-400 dark:hover:scrollbar-thumb-emerald-500">
            <PluginRenderer 
              plugin={currentPlugin}
              activePermissions={activePermissions}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
