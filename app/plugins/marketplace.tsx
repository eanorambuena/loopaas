'use client'

import React, { useState } from 'react'
import { usePluginManager } from 'plugini'
import { microkernel } from './pluginConfig'
import PermissionManager from '@/components/plugins/PermissionManager'
import PluginList from '@/components/plugins/PluginList'
import ActivePluginsSidebar from '@/components/plugins/ActivePluginsSidebar'
import { CustomPluginManager } from '@/components/CustomPluginManager'
import { IconStore } from '@/components/icons/IconStore'
import { IconPlus } from '@tabler/icons-react'

export function PluginsMarketplace() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'custom'>('marketplace')
  
  const {
    enabledPlugins,
    availablePlugins,
    activePermissions,
    handleEnablePlugin,
    handleDisablePlugin,
    togglePermission,
    getPluginPermissions
  } = usePluginManager(microkernel)

  // Debug: log what we're getting from usePluginManager
  React.useEffect(() => {
    console.log('PluginsMarketplace - Active permissions:', Array.from(activePermissions))
    console.log('PluginsMarketplace - Enabled plugins count:', enabledPlugins.length)
  }, [enabledPlugins, activePermissions])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-emerald-700 dark:text-emerald-300">Marketplace de Plugins</h1>
      
      {/* Pestañas */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg mb-8">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
            activeTab === 'marketplace'
              ? 'bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <IconStore className="w-4 h-4" />
          Marketplace
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
            activeTab === 'custom'
              ? 'bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <IconPlus className="w-4 h-4" />
          Crear Plugin
        </button>
      </div>

      {/* Contenido según la pestaña activa */}
      {activeTab === 'marketplace' ? (
        <div className="w-full flex flex-col gap-8">
          <div className="max-w-4xl mx-auto">
            <PermissionManager 
              activePermissions={activePermissions}
              onTogglePermission={togglePermission}
            />
          </div>
          <div className="max-w-4xl mx-auto">
            <PluginList 
              availablePlugins={availablePlugins}
              activePermissions={activePermissions}
              getPluginPermissions={getPluginPermissions}
              onEnablePlugin={handleEnablePlugin}
              onDisablePlugin={handleDisablePlugin}
            />
          </div>
          <ActivePluginsSidebar enabledPlugins={enabledPlugins} activePermissions={activePermissions} />
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          <CustomPluginManager />
        </div>
      )}
    </main>
  )
}

