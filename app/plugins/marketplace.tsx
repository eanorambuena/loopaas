'use client'

import React from 'react'
import { usePluginManager } from 'plugini'
import { microkernel } from './pluginConfig'
import PermissionManager from '@/components/plugins/PermissionManager'
import PluginList from '@/components/plugins/PluginList'
import ActivePlugins from '@/components/plugins/ActivePlugins'

export function PluginsMarketplace() {
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
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        <PermissionManager 
          activePermissions={activePermissions}
          onTogglePermission={togglePermission}
        />
        <PluginList 
          availablePlugins={availablePlugins}
          activePermissions={activePermissions}
          getPluginPermissions={getPluginPermissions}
          onEnablePlugin={handleEnablePlugin}
          onDisablePlugin={handleDisablePlugin}
        />
        <ActivePlugins enabledPlugins={enabledPlugins} activePermissions={activePermissions} />
      </div>
    </main>
  )
}

