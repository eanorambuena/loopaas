import React from 'react'

interface ActivePluginsProps {
  enabledPlugins: any[] // Temporalmente cambiamos a any[] para debuggear
  activePermissions?: Set<string>
}

export default function ActivePlugins({ enabledPlugins, activePermissions }: ActivePluginsProps) {
  // Generar una key única basada en los permisos activos
  const permKey = activePermissions ? Array.from(activePermissions).sort().join(',') : ''
  
  // Debug: log the enabledPlugins to see what we're receiving
  React.useEffect(() => {
    console.log('ActivePlugins - Number of enabled plugins:', enabledPlugins.length)
    if (enabledPlugins.length > 0) {
      console.log('ActivePlugins - First plugin structure:', enabledPlugins[0])
    }
  }, [enabledPlugins])
  
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Plugins Activos</h3>
      {enabledPlugins.length === 0 ? (
        <p className="text-gray-400">No hay plugins activos</p>
      ) : (
        enabledPlugins.map((plugin: any, index: number) => {
          const { name } = plugin
          // Intentar obtener el componente de diferentes maneras
          let Component = plugin.component || plugin.Component || plugin.comp || plugin.default
          
          // Si el plugin es un módulo, intentar acceder a sus exportaciones
          if (!Component && typeof plugin === 'object' && plugin.Component) {
            Component = plugin.Component
          }
          
          // Si seguimos sin componente, intentar buscar en otras propiedades comunes
          if (!Component) {
            const possibleProps = ['render', 'view', 'UI', 'ReactComponent']
            for (const prop of possibleProps) {
              if (plugin[prop] && typeof plugin[prop] === 'function') {
                Component = plugin[prop]
                break
              }
            }
          }
          
          // Safety check: ensure Component exists and is a valid React component
          if (!Component || (typeof Component !== 'function' && typeof Component !== 'object')) {
            console.warn(`Plugin "${name}" has an invalid component:`, Component);
            console.warn(`Plugin "${name}" full object:`, plugin);
            return (
              <div key={name + permKey + index} className="mb-6 p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">Plugin: {name}</h4>
                <p className="text-red-600 dark:text-red-400">Error: Invalid component for this plugin</p>
                <pre className="text-xs text-red-500 mt-2 overflow-auto max-h-32">
                  Debug keys: {JSON.stringify(Object.keys(plugin), null, 2)}
                </pre>
              </div>
            );
          }

          const props = plugin.props || {}
          
          // Añadir los permisos activos a las props del plugin
          const enhancedProps = {
            ...props,
            activePermissions: activePermissions,
            permissionsArray: activePermissions ? Array.from(activePermissions) : []
          }
          
          console.log(`Plugin "${name}" props:`, enhancedProps)
          
          return (
            <div key={name + permKey + index} className="mb-6 p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg bg-white dark:bg-black">
              <h4 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-300">Plugin: {name}</h4>
              <Component {...enhancedProps} />
            </div>
          );
        })
      )}
    </section>
  )
}
