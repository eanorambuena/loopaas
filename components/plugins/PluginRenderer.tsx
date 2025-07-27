import React from 'react'

interface PluginRendererProps {
  plugin: any
  activePermissions?: Set<string>
}

export default function PluginRenderer({ plugin, activePermissions }: PluginRendererProps) {
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
      <div className="p-6 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950">
        <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">Error en Plugin: {name}</h4>
        <p className="text-red-600 dark:text-red-400">El componente del plugin no es válido</p>
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
  
  return (
    <div className="p-6">
      <Component {...enhancedProps} />
    </div>
  )
}
