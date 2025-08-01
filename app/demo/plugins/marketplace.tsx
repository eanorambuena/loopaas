'use client'

import React from 'react'
import { usePluginManager } from 'plugini'
import { demoMicrokernel } from './demoPluginConfig'
import PermissionManager from '@/components/plugins/PermissionManager'
import PluginList from '@/components/plugins/PluginList'
import ActivePluginsSidebar from '@/components/plugins/ActivePluginsSidebar'

export function PluginsMarketplace() {
  const {
    enabledPlugins,
    availablePlugins,
    activePermissions,
    handleEnablePlugin,
    handleDisablePlugin,
    togglePermission,
    getPluginPermissions
  } = usePluginManager(demoMicrokernel)

  // Debug: log what we're getting from usePluginManager
  React.useEffect(() => {
    console.log('[MARKETPLACE] Available plugins:', availablePlugins.map(p => ({ name: p.name })))
    console.log('[MARKETPLACE] Active permissions:', Array.from(activePermissions))
    console.log('[MARKETPLACE] Enabled plugins count:', enabledPlugins.length)
    console.log('[MARKETPLACE] Demo microkernel:', demoMicrokernel)
    
    // Debug permisos de cada plugin
    availablePlugins.forEach(plugin => {
      const permissions = getPluginPermissions(plugin.name)
      console.log(`[MARKETPLACE] Plugin "${plugin.name}" permisos:`, permissions)
    })
  }, [enabledPlugins, activePermissions, availablePlugins, getPluginPermissions])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-emerald-700 dark:text-emerald-300">Demo - Marketplace de Plugins</h1>
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
    </main>
  )
}
