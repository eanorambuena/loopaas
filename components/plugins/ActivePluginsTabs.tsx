import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import PluginRenderer from './PluginRenderer'

interface ActivePluginsTabsProps {
  enabledPlugins: any[]
  activePermissions?: Set<string>
}

export default function ActivePluginsTabs({ enabledPlugins, activePermissions }: ActivePluginsTabsProps) {
  // Debug: log the enabledPlugins to see what we're receiving
  React.useEffect(() => {
    console.log('ActivePluginsTabs - Number of enabled plugins:', enabledPlugins.length)
    if (enabledPlugins.length > 0) {
      console.log('ActivePluginsTabs - First plugin structure:', enabledPlugins[0])
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
            Habilita algunos plugins arriba para verlos organizados en tabs aquí
          </p>
        </div>
      </section>
    )
  }

  // Usar el primer plugin como default tab
  const defaultTab = enabledPlugins[0]?.name || 'plugin-0'

  return (
    <section className="w-full">
      <h3 className="text-lg font-semibold mb-4">Plugins Activos</h3>
      
            <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full h-auto p-2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-xl" style={{gridTemplateColumns: `repeat(${Math.min(enabledPlugins.length, 4)}, 1fr)`}}>
          {enabledPlugins.map((plugin, index) => {
            const tabValue = plugin.name || `plugin-${index}`
            return (
              <TabsTrigger 
                key={tabValue} 
                value={tabValue}
                className="flex flex-col items-center gap-2 p-4 h-auto text-center min-w-0 rounded-lg
                           bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800
                           hover:bg-emerald-100 dark:hover:bg-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-600
                           data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:border-emerald-600
                           data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-200 dark:data-[state=active]:shadow-emerald-900
                           transition-all duration-200 ease-in-out transform hover:scale-105 data-[state=active]:scale-105
                           cursor-pointer select-none"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 data-[state=active]:bg-white opacity-70"></div>
                <span className="font-semibold text-sm truncate w-full">{plugin.name || `Plugin ${index + 1}`}</span>
                <span className="text-xs opacity-75 truncate w-full">
                  {plugin.description || 'Plugin activo'}
                </span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {enabledPlugins.map((plugin, index) => {
          const tabValue = plugin.name || `plugin-${index}`
          return (
            <TabsContent 
              key={tabValue} 
              value={tabValue}
              className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-lg mt-4 
                        animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
            >
              <div className="overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <h4 className="font-bold text-lg text-emerald-700 dark:text-emerald-300">
                    {plugin.name || `Plugin ${index + 1}`}
                  </h4>
                  <span className="text-xs bg-emerald-500 text-white px-3 py-1 rounded-full font-medium shadow-sm">
                    Activo
                  </span>
                  <div className="ml-auto text-xs text-emerald-600 dark:text-emerald-400">
                    ID: {plugin.id || `plugin-${index}`}
                  </div>
                </div>
                
                <PluginRenderer 
                  plugin={plugin}
                  activePermissions={activePermissions}
                />
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </section>
  )
}
