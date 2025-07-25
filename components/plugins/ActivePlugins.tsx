import React from 'react'

interface ActivePluginsProps {
  enabledPlugins: any[]
  activePermissions?: Set<string>
}

export default function ActivePlugins({ enabledPlugins, activePermissions }: ActivePluginsProps) {
  // Generar una key única basada en los permisos activos
  const permKey = activePermissions ? Array.from(activePermissions).sort().join(',') : ''
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Plugins Activos</h3>
      {enabledPlugins.length === 0 ? (
        <p className="text-gray-400">No hay plugins activos</p>
      ) : (
        enabledPlugins.map(({ name, component: Component, props }: any) => (
          <div key={name + permKey} className="mb-6 p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-white dark:bg-black">
            <h4 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-300">Plugin: {name}</h4>
            <Component {...props} />
          </div>
        ))
      )}
    </section>
  )
}
export default function ActivePlugins({ enabledPlugins, activePermissions }: ActivePluginsProps & { activePermissions?: Set<string> }) {
  // Generar una key única basada en los permisos activos
  const permKey = activePermissions ? Array.from(activePermissions).sort().join(',') : ''
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Plugins Activos</h3>
      {enabledPlugins.length === 0 ? (
        <p className="text-gray-400">No hay plugins activos</p>
      ) : (
        enabledPlugins.map(({ name, component: Component, props }: any) => (
          <div key={name + permKey} className="mb-6 p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-white dark:bg-black">
            <h4 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-300">Plugin: {name}</h4>
            <Component {...props} />
          </div>
        ))
      )}
    </section>
  )
}
