'use client'

import React, { useState } from 'react'
import Card from '@/components/Card'
import { Button } from '@/components/ui/button'

// Clase Allow para gestionar permisos
class Allow {
  private permissions: string[]
  constructor(permissions: string[]) {
    this.permissions = permissions
  }
  getCourses() {
    if (this.permissions.includes('getCourses')) {
      // Lógica de ejemplo: retorna cursos de prueba
      return [
        { id: 1, name: 'Matemáticas', organizacion: 'Colegio San Martín' },
        { id: 2, name: 'Historia', organizacion: 'Colegio San Martín' },
      ]
    }
    throw new Error('No tienes permiso para ver los cursos')
  }
}

// Plugin de ejemplo: muestra la organización de un curso
const OrganizationPlugin = ({ allow }: { allow: Allow }) => {
  let cursos = []
  try {
    cursos = allow.getCourses()
  } catch (e) {
    return <div className="text-red-500">No tienes permiso para ver los cursos</div>
  }
  return (
    <div>
      <h3 className="font-bold mb-2">Organización de los cursos</h3>
      <ul>
        {cursos.map((curso: any) => (
          <li key={curso.id}>
            <span className="font-semibold">{curso.name}</span>: {curso.organizacion}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Lista de plugins disponibles
const availablePlugins = [
  {
    id: 'org-course',
    name: 'Organización del Curso',
    description: 'Muestra a qué organización pertenece cada curso.',
    permissions: ['getCourses'],
    component: OrganizationPlugin,
  },
  // Puedes agregar más plugins aquí
]

export function PluginsMarketplace() {
  const [addedPlugins, setAddedPlugins] = useState<string[]>([])
  const [grantedPermissions, setGrantedPermissions] = useState<{ [id: string]: string[] }>({})

  const handleTogglePlugin = (pluginId: string, permissions: string[]) => {
    setAddedPlugins((prev) =>
      prev.includes(pluginId)
        ? prev.filter((id) => id !== pluginId)
        : [...prev, pluginId]
    )
    setGrantedPermissions((prev) =>
      prev[pluginId]
        ? { ...prev, [pluginId]: undefined }
        : { ...prev, [pluginId]: permissions }
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-black py-10">
      <h1 className="text-3xl font-bold mb-8 text-emerald-700 dark:text-emerald-300">Marketplace de Plugins</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {availablePlugins.map((plugin) => {
          const isAdded = addedPlugins.includes(plugin.id)
          const PluginComponent = plugin.component
          return (
            <Card key={plugin.id} className="flex flex-col gap-4 p-6 border border-emerald-200 dark:border-emerald-800">
              <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200">{plugin.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{plugin.description}</p>
              <div className="flex gap-2 mt-2">
                {plugin.permissions.map((perm) => (
                  <span key={perm} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs dark:bg-emerald-900 dark:text-emerald-200">{perm}</span>
                ))}
              </div>
              <Button
                variant={isAdded ? 'secondary' : 'default'}
                onClick={() => handleTogglePlugin(plugin.id, plugin.permissions)}
                className="mt-2"
              >
                {isAdded ? 'Quitar plugin' : 'Añadir plugin'}
              </Button>
              {isAdded && (
                <div className="mt-4">
                  <PluginComponent allow={new Allow(plugin.permissions)} />
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </main>
  )
}
