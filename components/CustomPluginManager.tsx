'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconPlus, IconCode, IconTrash } from '@tabler/icons-react'

interface CustomPlugin {
  id: string
  name: string
  description: string
  enabled: boolean
}

export function CustomPluginManager() {
  const [plugins, setPlugins] = useState<CustomPlugin[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleCreatePlugin = () => {
    if (!formData.name.trim()) {
      alert('Por favor ingresa un nombre para el plugin')
      return
    }

    const newPlugin: CustomPlugin = {
      id: `custom_${Date.now()}`,
      name: formData.name.trim(),
      description: formData.description.trim() || 'Plugin personalizado',
      enabled: true
    }

    setPlugins(prev => [...prev, newPlugin])
    setFormData({ name: '', description: '' })
    setShowForm(false)
  }

  const handleDeletePlugin = (pluginId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este plugin?')) {
      setPlugins(prev => prev.filter(p => p.id !== pluginId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header con botón de crear */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Plugins Personalizados
        </h3>
        <Button
          onClick={() => setShowForm(!showForm)}
          size="sm"
          className="flex items-center gap-2"
        >
          <IconPlus className="w-4 h-4" />
          Crear Plugin
        </Button>
      </div>

      {/* Formulario de crear plugin */}
      {showForm && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre del Plugin *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Mi Plugin de Asistencia"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción
              </label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe qué hace tu plugin..."
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreatePlugin} size="sm">
                Crear Plugin
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)} 
                size="sm"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de plugins */}
      {plugins.length === 0 ? (
        <div className="text-center py-8">
          <IconCode className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            No tienes plugins personalizados aún
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {plugins.map((plugin) => (
            <div 
              key={plugin.id}
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {plugin.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {plugin.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  plugin.enabled
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                  {plugin.enabled ? 'Activo' : 'Inactivo'}
                </span>
                <button
                  onClick={() => handleDeletePlugin(plugin.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Eliminar plugin"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
