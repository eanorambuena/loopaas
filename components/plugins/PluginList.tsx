import React from 'react'
import { Allow } from 'plugini'

interface PluginListProps {
  availablePlugins: any[],
  activePermissions: Set<string>,
  getPluginPermissions: (pluginName: string) => string[],
  onEnablePlugin: (pluginName: string) => void,
  onDisablePlugin: (pluginName: string) => void
}

export default function PluginList({ availablePlugins, activePermissions, getPluginPermissions, onEnablePlugin, onDisablePlugin }: PluginListProps) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-2">Plugins Disponibles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availablePlugins.map(({ name, enabled }) => (
          <div key={name} className={`p-4 rounded-lg border ${enabled ? 'bg-emerald-50 dark:bg-emerald-900 border-emerald-400' : 'bg-white dark:bg-black border-gray-200 dark:border-emerald-800'} flex flex-col gap-2`}>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => enabled ? onDisablePlugin(name) : onEnablePlugin(name)}
                className={`px-4 py-2 rounded text-white text-sm font-semibold transition-colors ${enabled ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                {enabled ? `Deshabilitar ${name}` : `Habilitar ${name}`}
              </button>
              <span className={`font-bold text-xs ${enabled ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-400'}`}>{enabled ? 'ACTIVO' : 'INACTIVO'}</span>
            </div>
            <div>
              <span className="font-semibold text-xs text-gray-700 dark:text-gray-300">Permisos requeridos:</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {getPluginPermissions(name).length > 0 ? (
                  getPluginPermissions(name).map((permission, idx) => {
                    const isPermissionActive = activePermissions.has(permission)
                    return (
                      <span key={idx} className={`inline-block px-2 py-1 rounded-full text-xs border ${isPermissionActive ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'bg-red-100 text-red-700 border-red-300'}`}>
                        {isPermissionActive ? '✅' : '❌'} {Allow.getPermissionDescription(permission)}
                      </span>
                    )
                  })
                ) : (
                  <span className="text-xs text-gray-400 italic">Sin permisos especiales</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
