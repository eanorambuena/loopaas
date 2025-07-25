'use client'

import React from 'react'
import { usePluginManager } from 'plugini'
import { microkernel } from './pluginConfig'
import PermissionManager from '@/components/PermissionManager'
import PluginList from '@/components/PluginList'
import ActivePlugins from '@/components/ActivePlugins'

export default function PluginsMarketplace() {
  const {
    enabledPlugins,
    availablePlugins,
    activePermissions,
    handleEnablePlugin,
    handleDisablePlugin,
    togglePermission,
    getPluginPermissions
  } = usePluginManager(microkernel)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-black py-10">
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
        <ActivePlugins enabledPlugins={enabledPlugins} />
      </div>
    </main>
  )
}

