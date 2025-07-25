import React from 'react'
import { Allow } from 'plugini'

export default function PermissionManager({ activePermissions, onTogglePermission }: { activePermissions: Set<string>, onTogglePermission: (permissionName: string) => void }) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-2">🔐 Gestión de Permisos del Sistema</h3>
      <div className="p-4 border-2 border-emerald-400 rounded-lg bg-emerald-50 dark:bg-emerald-950">
        <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm">Controla qué permisos están disponibles para los plugins:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Allow.getAllPermissions().map(({ name, description }) => (
            <label key={name} className="flex items-center gap-3 bg-white dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 rounded-lg px-4 py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activePermissions.has(name)}
                onChange={() => onTogglePermission(name)}
                className="accent-emerald-600 w-5 h-5"
              />
              <div>
                <div className="font-bold text-emerald-800 dark:text-emerald-200 text-sm">{name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
              </div>
            </label>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">⚠️ Cambiar permisos reiniciará automáticamente los plugins activos</div>
      </div>
    </section>
  )
}
