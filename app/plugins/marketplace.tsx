'use client'

import React from 'react'
import { usePluginManager } from 'plugini'
import { Button } from '@/components/ui/button'
import { microkernel } from './pluginConfig'

export function PluginsMarketplace() {
  const {
    enabledPlugins,
    availablePlugins,
    handleEnablePlugin,
    handleDisablePlugin
  } = usePluginManager(microkernel)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-black py-10">
      <h1 className="text-3xl font-bold mb-8 text-emerald-700 dark:text-emerald-300">Marketplace de Plugins</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {availablePlugins.map((plugin: any) => {
          const isAdded = enabledPlugins.some((p: any) => p.name === plugin.name)
          return (
            <div key={plugin.name} className="flex flex-col gap-4 p-6 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-white dark:bg-black">
              <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200">{plugin.name}</h2>
              <div className="flex gap-2 mt-2">
                {plugin.permissions?.map((perm: string) => (
                  <span key={perm} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs dark:bg-emerald-900 dark:text-emerald-200">{perm}</span>
                ))}
              </div>
              <Button
                variant={isAdded ? 'secondary' : 'default'}
                onClick={() => isAdded ? handleDisablePlugin(plugin.name) : handleEnablePlugin(plugin.name)}
                className="mt-2"
              >
                {isAdded ? 'Quitar plugin' : 'Añadir plugin'}
              </Button>
            </div>
          )
        })}
      </div>
      {/* Plugins activos */}
      <div className="w-full max-w-4xl mt-10">
        {enabledPlugins.map(({ name, component: Component, props }: any) => (
          <div key={name} className="mb-8">
            <h3 className="font-bold mb-2">Plugin: {name}</h3>
            <Component {...props} />
          </div>
        ))}
      </div>
    </main>
  )
}
