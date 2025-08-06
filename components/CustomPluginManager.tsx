'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CodeBlock } from '@/components/ui/code-block'
import { useToast } from '@/components/ui/use-toast'
import EditableCodeBlock from '@/components/EditableCodeBlock'
import { PluginErrorBoundary } from '@/components/PluginErrorBoundary'
import { microkernel } from '@/app/plugins/pluginConfig'
import { refreshPublishedPlugins } from '@/utils/customPlugins'
import { IconPlus, IconCode, IconTrash, IconEye, IconEyeOff, IconPlayerPlay, IconPlayerStop, IconEdit, IconDeviceFloppy, IconX, IconWorld, IconPuzzle } from '@tabler/icons-react'

interface CustomPlugin {
  id: string
  name: string
  description: string
  code: string
  transpiledCode?: string
  enabled: boolean
  published?: boolean
}

interface PluginEditorProps {
  plugin?: CustomPlugin | null
  onSave: (plugin: CustomPlugin) => void
  onCancel: () => void
}

function PluginEditor({ plugin, onSave, onCancel }: PluginEditorProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: plugin?.name || '',
    description: plugin?.description || '',
    code: plugin?.code || ''
  })
  const [previewComponent, setPreviewComponent] = useState<React.ReactElement | null>(null)
  const [splitSize, setSplitSize] = useState<number>(50)

  const helloWorldTemplate = `function Component() {
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
          � Este plugin se puede publicar al Marketplace
        </div>
      </div>
    </div>
  )
}`

  // Inicializar con template si está vacío y no es edición
  useEffect(() => {
    if (!plugin && !formData.code.trim()) {
      setFormData(prev => ({
        ...prev,
        code: helloWorldTemplate
      }))
    }
  }, [plugin, formData.code, helloWorldTemplate])

  // Función para transpilar código JSX usando la API
  const transpileCode = async (code: string): Promise<string> => {
    try {
      const response = await fetch('/api/transpile-plugin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      })
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Error al transpilar el código')
      }
      
      return result.transpiledCode
    } catch (error) {
      throw new Error(`Error de transpilación: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    }
  }

  // Función para renderizar el componente de manera segura
  const renderPluginComponent = useCallback(async (code: string): Promise<React.ReactElement> => {
    try {
      const codeToExecute = await transpileCode(code)
      
      // Crear una función que evalúe el código transpilado de manera más segura
      const safeCode = `
        (function() {
          'use strict';
          const React = arguments[0];
          const { useState, useEffect, useCallback, useMemo, useRef } = React;
          
          try {
            ${codeToExecute}
            if (typeof Component !== 'function') {
              throw new Error('El código debe definir una función llamada "Component"');
            }
            return Component;
          } catch (error) {
            console.error('Error evaluating plugin code:', error);
            throw error;
          }
        })
      `
      
      // Evaluar el código de manera segura pasando React como parámetro
      const componentFactory = eval(safeCode)
      const PluginComponent = componentFactory(React)
      
      // Verificar que sea una función válida
      if (typeof PluginComponent !== 'function') {
        throw new Error('El código debe definir una función llamada "Component"')
      }
      
      return React.createElement(PluginComponent)
    } catch (error) {
      console.error('Error rendering plugin:', error)
      
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      const isReferenceError = errorMessage.includes('is not defined')
      const isSyntaxError = errorMessage.includes('Unexpected') || errorMessage.includes('SyntaxError')
      
      let hints = [
        '💡 Usa JSX normal: <div className="...">contenido</div>',
        '💡 Define una función llamada "Component" que retorne JSX',
        '💡 Verifica que no uses código no permitido por seguridad'
      ]
      
      if (isReferenceError) {
        hints = [
          '💡 Las variables no definidas incluyen hooks como useState, useEffect, etc.',
          '💡 Los hooks están disponibles globalmente, úsalos directamente: useState(0)',
          '💡 Si necesitas importar algo específico, puede que no esté disponible',
          ...hints
        ]
      }
      
      if (isSyntaxError) {
        hints = [
          '💡 Verifica la sintaxis de tu código JSX',
          '💡 Asegúrate de cerrar todas las etiquetas correctamente',
          '💡 Los comentarios JSX usan {/* */} en lugar de //',
          ...hints
        ]
      }
      
      return React.createElement('div', {
        className: 'p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg'
      }, [
        React.createElement('h4', {
          key: 'title',
          className: 'text-red-800 dark:text-red-200 font-semibold mb-2'
        }, '⚠️ Error en el código:'),
        React.createElement('pre', {
          key: 'error',
          className: 'text-red-600 dark:text-red-300 text-sm whitespace-pre-wrap font-mono mb-3 bg-red-100 dark:bg-red-900/30 p-2 rounded'
        }, errorMessage),
        React.createElement('div', {
          key: 'hints',
          className: 'text-red-500 dark:text-red-400 text-xs mt-3 space-y-1'
        }, hints.map((hint, index) => 
          React.createElement('p', { key: `hint${index}` }, hint)
        ))
      ])
    }
  }, [])

  // Efecto para renderizar componentes cuando cambia renderPreview

  // Guardar el tamaño del split en localStorage (opcional)
  const handleSplitResize = (sizes: number[]) => {
    const editorSize = sizes[0]
    setSplitSize(editorSize)
    // Guardar en localStorage si se desea persistir
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
                  placeholder={helloWorldTemplate}
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

export function CustomPluginManager() {
  const { toast } = useToast()
  const [plugins, setPlugins] = useState<CustomPlugin[]>([])
  const [editingPlugin, setEditingPlugin] = useState<CustomPlugin | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [showCodeFor, setShowCodeFor] = useState<string | null>(null)
  const [renderPreview, setRenderPreview] = useState<{ [key: string]: boolean }>({})
  const [pluginComponents, setPluginComponents] = useState<{ [key: string]: React.ReactElement }>({})

  // Cargar plugins desde localStorage al montar el componente
  useEffect(() => {
    const savedPlugins = localStorage.getItem('customPlugins')
    if (savedPlugins) {
      try {
        setPlugins(JSON.parse(savedPlugins))
      } catch (error) {
        console.error('Error al cargar plugins desde localStorage:', error)
      }
    }
  }, [])

  // Guardar plugins en localStorage cuando cambien
  useEffect(() => {
    if (plugins.length > 0) {
      localStorage.setItem('customPlugins', JSON.stringify(plugins))
    } else {
      localStorage.removeItem('customPlugins')
    }
  }, [plugins])

  const handleSavePlugin = (pluginData: CustomPlugin) => {
    const isEditing = editingPlugin !== null
    
    if (isEditing) {
      setPlugins(prev => prev.map(p => p.id === pluginData.id ? pluginData : p))
      toast({
        title: 'Plugin actualizado',
        description: `El plugin "${pluginData.name}" se ha actualizado correctamente`,
      })
    } else {
      setPlugins(prev => [...prev, pluginData])
      toast({
        title: 'Plugin creado',
        description: `El plugin "${pluginData.name}" se ha creado correctamente`,
      })
    }
    
    setEditingPlugin(null)
    setIsCreating(false)
  }

  const handleCancelEdit = () => {
    setEditingPlugin(null)
    setIsCreating(false)
  }

  const handleDeletePlugin = (pluginId: string) => {
    const pluginToDelete = plugins.find(p => p.id === pluginId)
    
    // Eliminar el plugin de la lista
    setPlugins(prev => prev.filter(p => p.id !== pluginId))
    
    // Si el plugin estaba publicado, refrescar el marketplace para despublicarlo
    if (pluginToDelete?.published) {
      setTimeout(() => {
        refreshPublishedPlugins()
        toast({
          title: 'Plugin despublicado',
          description: `"${pluginToDelete.name}" ha sido removido del Marketplace`,
        })
      }, 100)
    }
    
    toast({
      title: 'Plugin eliminado',
      description: `El plugin "${pluginToDelete?.name}" se ha eliminado correctamente`,
    })
  }

  const handlePublishToMarketplace = async (plugin: CustomPlugin) => {
    // Si ya está publicado, despublicar
    if (plugin.published) {
      // Marcar como no publicado
      setPlugins(prev => prev.map(p => 
        p.id === plugin.id 
          ? { ...p, published: false }
          : p
      ))

      // Refrescar plugins para removerlo del marketplace
      setTimeout(() => refreshPublishedPlugins(), 100)

      toast({
        title: '📤 Plugin despublicado',
        description: `"${plugin.name}" ha sido removido del Marketplace`,
      })
      return
    }

    try {
      // Transpilar el código si no está transpilado
      let transpiledCode = plugin.transpiledCode
      if (!transpiledCode) {
        transpiledCode = await transpileCode(plugin.code)
      }

      // Crear el plugin en formato compatible con plugini
      const marketplacePlugin = {
        id: `custom-${plugin.id}`,
        permissions: [], // Los plugins personalizados por ahora no requieren permisos especiales
        metadata: {
          name: plugin.name,
          description: plugin.description || 'Plugin personalizado creado por el usuario',
          preferredWidth: 'medium' as const,
          author: 'Usuario',
          version: '1.0.0',
          isCustom: true
        },
        component: function CustomPluginComponent(props: any) {
          // Crear un componente React que ejecute el código transpilado
          try {
            // Usar el mismo sistema que el preview para evitar problemas de scope
            const safeCode = `
              (function() {
                'use strict';
                const React = arguments[0];
                const { useState, useEffect, useCallback, useMemo, useRef } = React;
                const props = arguments[1];
                
                try {
                  ${transpiledCode}
                  if (typeof Component !== 'function') {
                    throw new Error('El código debe definir una función llamada "Component"');
                  }
                  return React.createElement(Component, props);
                } catch (error) {
                  console.error('Error evaluating plugin code:', error);
                  throw error;
                }
              })
            `
            
            // Evaluar el código de manera segura
            const result = eval(safeCode)
            return result(React, props)
            
          } catch (error) {
            console.error('Error ejecutando plugin personalizado:', error)
            return React.createElement('div', {
              className: 'p-4 bg-red-50 border border-red-200 rounded-lg'
            }, [
              React.createElement('h3', { className: 'text-red-800 font-medium mb-2' }, 'Error en el Plugin'),
              React.createElement('p', { className: 'text-red-600 text-sm' }, `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`)
            ])
          }
        }
      }

      // Registrar el plugin en el microkernel
      microkernel.registerPlugins([marketplacePlugin])

      // Marcar el plugin como publicado
      setPlugins(prev => prev.map(p => 
        p.id === plugin.id 
          ? { ...p, transpiledCode, published: true }
          : p
      ))

      // Refrescar la lista de plugins publicados para asegurar consistencia
      setTimeout(() => refreshPublishedPlugins(), 100)

      toast({
        title: '🎉 Plugin publicado',
        description: `"${plugin.name}" ahora está disponible en el Marketplace`,
      })

    } catch (error) {
      console.error('Error publicando plugin:', error)
      toast({
        title: 'Error',
        description: `No se pudo publicar el plugin: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        variant: 'destructive'
      })
    }
  }

  // Función para transpilar código JSX usando la API
  const transpileCode = async (code: string): Promise<string> => {
    try {
      const response = await fetch('/api/transpile-plugin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      })
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Error al transpilar el código')
      }
      
      return result.transpiledCode
    } catch (error) {
      throw new Error(`Error de transpilación: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    }
  }

  // Función para renderizar el componente de manera segura
  const renderPluginComponent = useCallback(async (plugin: CustomPlugin): Promise<React.ReactElement> => {
    try {
      let codeToExecute = plugin.transpiledCode
      
      // Si no hay código transpilado, transpilarlo ahora
      if (!codeToExecute) {
        codeToExecute = await transpileCode(plugin.code)
        // Actualizar el plugin con el código transpilado para uso futuro
        setPlugins(prev => prev.map(p => 
          p.id === plugin.id 
            ? { ...p, transpiledCode: codeToExecute }
            : p
        ))
      }
      
      // Asegurar que React esté disponible globalmente
      if (typeof window !== 'undefined') {
        (window as any).React = React
      }
      
      // Crear una función que evalúe el código transpilado (igual que en el preview del editor)
      const safeCode = `
        (function() {
          'use strict';
          const React = arguments[0];
          const { useState, useEffect, useCallback, useMemo, useRef } = React;
          
          try {
            ${codeToExecute}
            if (typeof Component !== 'function') {
              throw new Error('El código debe definir una función llamada "Component"');
            }
            return Component;
          } catch (error) {
            console.error('Error evaluating plugin code:', error);
            throw error;
          }
        })
      `
      
      // Evaluar el código de manera segura pasando React como parámetro
      const componentFactory = eval(safeCode)
      const PluginComponent = componentFactory(React)
      
      // Verificar que sea una función válida
      if (typeof PluginComponent !== 'function') {
        throw new Error('El código debe definir una función llamada "Component"')
      }
      
      return React.createElement(PluginComponent)
    } catch (error) {
      console.error('Error rendering plugin:', error)
      
      // Definir hints por defecto para el error
      const hints = [
        '💡 Usa JSX normal: <div className="...">contenido</div>',
        '💡 Define una función llamada "Component" que retorne JSX',
        '💡 Verifica que no uses código no permitido por seguridad'
      ]
      
      return React.createElement('div', {
        className: 'p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg'
      }, [
        React.createElement('h4', {
          key: 'title',
          className: 'text-red-800 dark:text-red-200 font-semibold mb-2'
        }, '⚠️ Error en el código:'),
        React.createElement('pre', {
          key: 'error',
          className: 'text-red-600 dark:text-red-300 text-sm whitespace-pre-wrap font-mono'
        }, error instanceof Error ? error.message : 'Error desconocido'),
        React.createElement('div', {
          key: 'hints',
          className: 'text-red-500 dark:text-red-400 text-xs mt-3 space-y-1'
        }, hints.map((hint, index) => 
          React.createElement('p', { key: `hint${index}` }, hint)
        ))
      ])
    }
  }, [setPlugins])

  // Efecto para renderizar componentes cuando cambia renderPreview
  useEffect(() => {
    const renderComponents = async () => {
      const newComponents: { [key: string]: React.ReactElement } = {}
      
      for (const plugin of plugins) {
        if (renderPreview[plugin.id]) {
          try {
            newComponents[plugin.id] = await renderPluginComponent(plugin)
          } catch (error) {
            console.error(`Error rendering plugin ${plugin.id}:`, error)
          }
        }
      }
      
      setPluginComponents(newComponents)
    }
    
    renderComponents()
  }, [renderPreview, plugins, renderPluginComponent])

  // Si está creando o editando, mostrar el editor
  if (isCreating || editingPlugin) {
    return (
      <PluginEditor
        plugin={editingPlugin || undefined}
        onSave={handleSavePlugin}
        onCancel={handleCancelEdit}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Header con botón de crear */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Mis Plugins Personalizados
        </h3>
        <Button
          onClick={() => setIsCreating(true)}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-6 py-3"
        >
          <IconPlus className="w-5 h-5 mr-2" />
          ✨ Crear Nuevo Plugin
        </Button>
      </div>

      {/* Lista de plugins */}
      {plugins.length === 0 ? (
        <div className="text-center py-12">
          <IconPuzzle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            No hay plugins personalizados
          </h4>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Crea tu primer plugin personalizado con JSX y publícalo al marketplace
          </p>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <IconPlus className="w-5 h-5 mr-2" />
            ✨ Crear Mi Primer Plugin
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {plugins.map((plugin) => (
            <div key={plugin.id} className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between p-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {plugin.name}
                    </h4>
                    {plugin.published && (
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
                        <IconWorld className="w-3 h-3 mr-1" />
                        Publicado
                      </span>
                    )}
                  </div>
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
                    onClick={() => setEditingPlugin(plugin)}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    title="Editar plugin"
                  >
                    <IconEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowCodeFor(showCodeFor === plugin.id ? null : plugin.id)}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    title={showCodeFor === plugin.id ? 'Ocultar código' : 'Ver código'}
                  >
                    {showCodeFor === plugin.id ? (
                      <IconEyeOff className="w-4 h-4" />
                    ) : (
                      <IconEye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setRenderPreview(prev => ({
                      ...prev,
                      [plugin.id]: !prev[plugin.id]
                    }))}
                    className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                    title={renderPreview[plugin.id] ? 'Ocultar preview' : 'Ver preview'}
                  >
                    {renderPreview[plugin.id] ? (
                      <IconPlayerStop className="w-4 h-4" />
                    ) : (
                      <IconPlayerPlay className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handlePublishToMarketplace(plugin)}
                    className={`p-1 transition-colors ${
                      plugin.published 
                        ? 'text-purple-500 hover:text-purple-600' 
                        : 'text-gray-400 hover:text-purple-500'
                    }`}
                    title={plugin.published ? 'Despublicar del Marketplace' : 'Publicar al Marketplace'}
                  >
                    <IconWorld className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePlugin(plugin.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Eliminar plugin"
                  >
                    <IconTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Mostrar código si está seleccionado */}
              {showCodeFor === plugin.id && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Código del Componente:
                  </h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <CodeBlock
                        language="jsx"
                        filename={`${plugin.name.replace(/\s+/g, '')}.jsx`}
                        code={plugin.code}
                      />
                    </div>
                    {renderPreview[plugin.id] && (
                      <div>
                        <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Preview en tiempo real:
                        </h6>
                        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 min-h-[200px]">
                          {pluginComponents[plugin.id] || (
                            <div className="flex items-center justify-center h-32">
                              <div className="text-sm text-gray-500">Cargando preview...</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mostrar solo preview si está seleccionado pero no el código */}
              {showCodeFor !== plugin.id && renderPreview[plugin.id] && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Preview del Plugin:
                  </h5>
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800">
                    {pluginComponents[plugin.id] || (
                      <div className="flex items-center justify-center h-32">
                        <div className="text-sm text-gray-500">Cargando preview...</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
