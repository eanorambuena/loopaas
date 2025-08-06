'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { IconPlus, IconX, IconArrowLeft } from '@tabler/icons-react'
import { type CustomPlugin } from './types'
import { PluginEditor } from './PluginEditor'
import { PluginList } from './PluginList'

/**
 * Gestor principal de plugins personalizados
 * Componente refactorizado que maneja la creación, edición y gestión de plugins
 */
export default function CustomPluginManager() {
  const { toast } = useToast()
  
  // Estados principales
  const [plugins, setPlugins] = useState<CustomPlugin[]>([])
  const [currentView, setCurrentView] = useState<'list' | 'editor' | 'viewer'>('list')
  const [editingPlugin, setEditingPlugin] = useState<CustomPlugin | null>(null)
  const [viewingPlugin, setViewingPlugin] = useState<CustomPlugin | null>(null)

  // Cargar plugins desde localStorage al montar
  useEffect(() => {
    const loadPlugins = () => {
      try {
        const stored = localStorage.getItem('customPlugins')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            setPlugins(parsed)
          }
        }
      } catch (error) {
        console.error('Error loading plugins from localStorage:', error)
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los plugins guardados',
          variant: 'destructive'
        })
      }
    }

    loadPlugins()
  }, [toast])

  // Guardar plugins en localStorage
  const savePluginsToStorage = useCallback((updatedPlugins: CustomPlugin[]) => {
    try {
      localStorage.setItem('customPlugins', JSON.stringify(updatedPlugins))
    } catch (error) {
      console.error('Error saving plugins to localStorage:', error)
      toast({
        title: 'Error',
        description: 'No se pudieron guardar los plugins',
        variant: 'destructive'
      })
    }
  }, [toast])

  // Crear nuevo plugin
  const handleCreatePlugin = () => {
    setEditingPlugin(null)
    setCurrentView('editor')
  }

  // Editar plugin existente
  const handleEditPlugin = (plugin: CustomPlugin) => {
    setEditingPlugin(plugin)
    setCurrentView('editor')
  }

  // Guardar plugin (crear o actualizar)
  const handleSavePlugin = (pluginData: CustomPlugin) => {
    setPlugins(prevPlugins => {
      let updatedPlugins: CustomPlugin[]

      if (editingPlugin) {
        // Actualizar plugin existente
        updatedPlugins = prevPlugins.map(p => 
          p.id === editingPlugin.id ? pluginData : p
        )
        toast({
          title: 'Plugin actualizado',
          description: `El plugin "${pluginData.name}" se ha actualizado correctamente`,
        })
      } else {
        // Crear nuevo plugin
        updatedPlugins = [...prevPlugins, pluginData]
        toast({
          title: 'Plugin creado',
          description: `El plugin "${pluginData.name}" se ha creado correctamente`,
        })
      }

      savePluginsToStorage(updatedPlugins)
      return updatedPlugins
    })

    // Volver a la lista
    setCurrentView('list')
    setEditingPlugin(null)
  }

  // Cancelar edición
  const handleCancelEdit = () => {
    setCurrentView('list')
    setEditingPlugin(null)
  }

  // Toggle activación de plugin
  const handleTogglePlugin = (id: string, enabled: boolean) => {
    setPlugins(prevPlugins => {
      const updatedPlugins = prevPlugins.map(plugin => 
        plugin.id === id ? { ...plugin, enabled } : plugin
      )
      savePluginsToStorage(updatedPlugins)

      const plugin = updatedPlugins.find(p => p.id === id)
      if (plugin) {
        toast({
          title: enabled ? 'Plugin activado' : 'Plugin desactivado',
          description: `El plugin "${plugin.name}" se ha ${enabled ? 'activado' : 'desactivado'} correctamente`,
        })
      }

      return updatedPlugins
    })
  }

  // Confirmar eliminación
  const handleDeletePlugin = (id: string) => {
    const plugin = plugins.find(p => p.id === id)
    if (!plugin) return

    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar el plugin "${plugin.name}"? Esta acción no se puede deshacer.`
    )
    
    if (confirmDelete) {
      setPlugins(prevPlugins => {
        const updatedPlugins = prevPlugins.filter(p => p.id !== id)
        savePluginsToStorage(updatedPlugins)

        toast({
          title: 'Plugin eliminado',
          description: `El plugin "${plugin.name}" se ha eliminado correctamente`,
        })

        return updatedPlugins
      })
    }
  }

  // Ver código del plugin
  const handleViewPlugin = (plugin: CustomPlugin) => {
    setViewingPlugin(plugin)
    setCurrentView('viewer')
  }

  // Compartir plugin
  const handleSharePlugin = async (plugin: CustomPlugin) => {
    try {
      const shareText = `# ${plugin.name}\n\n${plugin.description}\n\n\`\`\`javascript\n${plugin.code}\n\`\`\``

      if (navigator.share && navigator.canShare?.({ text: shareText })) {
        await navigator.share({
          title: `Plugin: ${plugin.name}`,
          text: shareText
        })
      } else {
        await navigator.clipboard.writeText(shareText)
        toast({
          title: 'Plugin copiado',
          description: 'El código del plugin se ha copiado al portapapeles',
        })
      }
    } catch (error) {
      console.error('Error sharing plugin:', error)
      toast({
        title: 'Error',
        description: 'No se pudo compartir el plugin',
        variant: 'destructive'
      })
    }
  }

  // Volver a la lista
  const handleBackToList = () => {
    setCurrentView('list')
    setEditingPlugin(null)
    setViewingPlugin(null)
  }

  // Vista del editor
  if (currentView === 'editor') {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToList}>
            <IconArrowLeft className="w-4 h-4 mr-2" />
            Volver a la lista
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editingPlugin ? `Editando: ${editingPlugin.name}` : 'Crear Nuevo Plugin'}
          </h1>
        </div>
        <PluginEditor
          plugin={editingPlugin}
          onSave={handleSavePlugin}
          onCancel={handleCancelEdit}
        />
      </div>
    )
  }

  // Vista del visualizador
  if (currentView === 'viewer' && viewingPlugin) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToList}>
            <IconArrowLeft className="w-4 h-4 mr-2" />
            Volver a la lista
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ver Plugin: <span className="text-blue-600 dark:text-blue-400">{viewingPlugin.name}</span>
            </h1>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Descripción
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {viewingPlugin.description || 'Sin descripción'}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Código
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-auto">
                <pre className="text-sm">
                  <code>{viewingPlugin.code}</code>
                </pre>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={() => handleEditPlugin(viewingPlugin)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Editar Plugin
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSharePlugin(viewingPlugin)}
              >
                Compartir
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Vista principal de la lista
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header con botón crear */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Gestor de Plugins Personalizados
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Crea, edita y gestiona tus plugins personalizados para extender la funcionalidad
          </p>
        </div>
        
        <Button 
          onClick={handleCreatePlugin}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <IconPlus className="w-4 h-4 mr-2" />
          Crear Plugin
        </Button>
      </div>

      {/* Lista de plugins */}
      <PluginList
        plugins={plugins}
        onToggle={handleTogglePlugin}
        onEdit={handleEditPlugin}
        onDelete={handleDeletePlugin}
        onView={handleViewPlugin}
        onShare={handleSharePlugin}
      />
    </div>
  )
}
