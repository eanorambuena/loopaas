import React from 'react'

interface ActivePluginsProps {
  enabledPlugins: any[]
}

export default function ActivePlugins({ enabledPlugins }: ActivePluginsProps) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Plugins Activos</h3>
      {enabledPlugins.length === 0 ? (
        <p className="text-gray-400">No hay plugins activos</p>
      ) : (
        enabledPlugins.map(({ name, Component, props }: any) => (
          <div key={name} className="mb-6 p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-white dark:bg-black">
            <h4 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-300">Plugin: {name}</h4>
            <Component {...props} />
          </div>
        ))
      )}
    </section>
  )
}
