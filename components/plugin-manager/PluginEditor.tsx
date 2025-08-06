'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import EditableCodeBlock from '@/components/EditableCodeBlock'
import { PluginErrorBoundary } from '@/components/PluginErrorBoundary'
import { IconDeviceFloppy, IconX } from '@tabler/icons-react'
import { type PluginEditorProps, type CustomPlugin } from './types'
import { renderPluginComponentSafe } from './plugin-utils'

const HELLO_WORLD_TEMPLATE = `function Component() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg border border-blue-200 dark:border-blue-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-3">
          🚀 Mi Plugin Personalizado
        </h2>
        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          {count}
        </div>
        <p className="text-blue-600 dark:text-blue-300 mb-4">
          ¡Haz clic en el botón para incrementar el contador!
        </p>
        <button 
          onClick={() => setCount(count + 1)}
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          ✨ Incrementar
        </button>
        <div className="mt-4 text-xs text-blue-500 dark:text-blue-400">
          📦 Este plugin se puede publicar al Marketplace
        </div>
      </div>
    </div>
  )
}`

export function PluginEditor({ plugin, onSave, onCancel }: PluginEditorProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: plugin?.name || '',
    description: plugin?.description || '',
    code: plugin?.code || ''
  })
  const [previewComponent, setPreviewComponent] = useState<React.ReactElement | null>(null)
  const [splitSize, setSplitSize] = useState<number>(50)

  // Inicializar con template si está vacío y no es edición
  useEffect(() => {
    if (!plugin && !formData.code.trim()) {
      setFormData(prev => ({
        ...prev,
        code: HELLO_WORLD_TEMPLATE
      }))
    }
  }, [plugin, formData.code])

  // Función para renderizar el preview
  const renderPreview = useCallback(async (code: string) => {
    if (!code.trim()) {
      setPreviewComponent(null)
      return
    }

    try {
      const component = await renderPluginComponentSafe(code)
      setPreviewComponent(component)
    } catch (error) {
      console.error('Error rendering preview:', error)
      setPreviewComponent(null)
    }
  }, [])

  // Efecto para renderizar el preview cuando cambia el código
  useEffect(() => {
    const timer = setTimeout(() => {
      renderPreview(formData.code)
    }, 500)

    return () => clearTimeout(timer)
  }, [formData.code, renderPreview])

  const handleSplitResize = (sizes: number[]) => {
    const editorSize = sizes[0]
    setSplitSize(editorSize)
    localStorage.setItem('pluginEditorSplitSize', editorSize.toString())
  }

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa un nombre para el plugin',
        variant: 'destructive'
      })
      return
    }

    if (!formData.code.trim()) {
      toast({
        title: 'Error', 
        description: 'Por favor ingresa el código del plugin',
        variant: 'destructive'
      })
      return
    }

    const pluginToSave: CustomPlugin = {
      id: plugin?.id || `custom_${Date.now()}`,
      name: formData.name.trim(),
      description: formData.description.trim() || 'Plugin personalizado',
      code: formData.code.trim(),
      enabled: plugin?.enabled ?? true
    }

    onSave(pluginToSave)
  }

  return (
    <div className="min-h-[600px] max-h-[calc(100vh-200px)] flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header con campos de nombre y descripción */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {plugin ? `Editando: ${plugin.name}` : 'Crear Nuevo Plugin'}
          </h3>
          <div className="flex gap-2">
            <Button 
              onClick={handleSave} 
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0"
            >
              <IconDeviceFloppy className="w-4 h-4 mr-2" />
              {plugin ? 'Guardar Cambios' : 'Crear Plugin'}
            </Button>
            <Button variant="outline" onClick={onCancel} size="sm">
              <IconX className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Split Pane con editor y preview */}
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full min-h-[500px] rounded-lg border"
          onLayout={handleSplitResize}
        >
          {/* Panel izquierdo - Editor */}
          <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
            <div className="h-full flex flex-col bg-white dark:bg-gray-800 overflow-hidden">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Código del Componente *
                </label>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <EditableCodeBlock
                  code={formData.code}
                  onChange={(code) => setFormData(prev => ({ ...prev, code }))}
                  placeholder={HELLO_WORLD_TEMPLATE}
                  className="h-full border-0 rounded-none m-0"
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Panel derecho - Preview */}
          <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
            <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preview en Tiempo Real
                </label>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <div className="w-full max-w-2xl mx-auto">
                  <PluginErrorBoundary pluginName="Preview">
                    {previewComponent || (
                      <div className="flex items-center justify-center h-64 text-gray-500">
                        {formData.code.trim() ? 'Transpilando...' : 'Escribe código para ver el preview'}
                      </div>
                    )}
                  </PluginErrorBoundary>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
