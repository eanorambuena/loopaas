'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CodeBlock } from '@/components/ui/code-block'
import { useToast } from '@/components/ui/use-toast'
import EditableCodeBlock from '@/components/EditableCodeBlock'
import { IconPlus, IconCode, IconTrash, IconEye, IconEyeOff, IconPlayerPlay, IconPlayerStop } from '@tabler/icons-react'

interface CustomPlugin {
  id: string
  name: string
  description: string
  code: string
  transpiledCode?: string
  enabled: boolean
}

export function CustomPluginManager() {
  const { toast } = useToast()
  const [plugins, setPlugins] = useState<CustomPlugin[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showCodeFor, setShowCodeFor] = useState<string | null>(null)
  const [renderPreview, setRenderPreview] = useState<{ [key: string]: boolean }>({})
  const [pluginComponents, setPluginComponents] = useState<{ [key: string]: React.ReactElement }>({})
  const [showFormPreview, setShowFormPreview] = useState(false)
  const [formPreviewComponent, setFormPreviewComponent] = useState<React.ReactElement | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: ''
  })

  // Cargar plugins desde localStorage al montar el componente
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (plugins.length > 0) {
      localStorage.setItem('customPlugins', JSON.stringify(plugins))
    }
  }, [plugins])

  const helloWorldTemplate = `// Plugin Hello World
function Component() {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg border border-blue-200 dark:border-blue-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-3">
          ¡Hola Mundo!
        </h2>
        <p className="text-blue-600 dark:text-blue-300 mb-4">
          Este es mi primer plugin personalizado
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          🚀 Plugin Activo
        </div>
      </div>
    </div>
  )
}`

  const handleShowForm = () => {
    if (!showForm) {
      // Pre-llenar con el template de Hello World si está vacío
      if (!formData.code.trim()) {
        setFormData(prev => ({
          ...prev,
          code: helloWorldTemplate
        }))
      }
    }
    setShowForm(!showForm)
  }

  const handleCreatePlugin = () => {
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

    const newPlugin: CustomPlugin = {
      id: `custom_${Date.now()}`,
      name: formData.name.trim(),
      description: formData.description.trim() || 'Plugin personalizado',
      code: formData.code.trim(),
      enabled: true
    }

    setPlugins(prev => [...prev, newPlugin])
    setFormData({ name: '', description: '', code: '' })
    setShowForm(false)
    
    toast({
      title: 'Plugin creado',
      description: `El plugin "${newPlugin.name}" se ha creado correctamente`,
    })
  }

  const handleDeletePlugin = (pluginId: string) => {
    const pluginToDelete = plugins.find(p => p.id === pluginId)
    setPlugins(prev => prev.filter(p => p.id !== pluginId))
    
    // Limpiar localStorage si no quedan plugins
    const updatedPlugins = plugins.filter(p => p.id !== pluginId)
    if (updatedPlugins.length === 0) {
      localStorage.removeItem('customPlugins')
    }
    
    toast({
      title: 'Plugin eliminado',
      description: `El plugin "${pluginToDelete?.name}" se ha eliminado correctamente`,
    })
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
  const renderPluginComponent = async (plugin: CustomPlugin): Promise<React.ReactElement> => {
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
      
      // Crear una función que evalúe el código transpilado
      const safeCode = `
        (function() {
          'use strict';
          const React = arguments[0];
          ${codeToExecute}
          return Component;
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
        }, [
          React.createElement('p', { key: 'hint1' }, '💡 Usa JSX normal: <div className="...">contenido</div>'),
          React.createElement('p', { key: 'hint2' }, '💡 Define una función llamada "Component" que retorne JSX'),
          React.createElement('p', { key: 'hint3' }, '💡 Verifica que no uses código no permitido por seguridad')
        ])
      ])
    }
  }

  // Efecto para renderizar componentes cuando cambia renderPreview
  React.useEffect(() => {
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
  }, [renderPreview, plugins])

  // Efecto para renderizar el preview del formulario
  React.useEffect(() => {
    const renderFormPreview = async () => {
      if (showFormPreview && formData.code.trim()) {
        try {
          const tempPlugin: CustomPlugin = {
            id: 'form-preview',
            name: 'Preview',
            description: 'Preview',
            code: formData.code,
            enabled: true
          }
          const component = await renderPluginComponent(tempPlugin)
          setFormPreviewComponent(component)
        } catch (error) {
          console.error('Error rendering form preview:', error)
          setFormPreviewComponent(null)
        }
      } else {
        setFormPreviewComponent(null)
      }
    }
    
    renderFormPreview()
  }, [showFormPreview, formData.code])

  return (
    <div className="space-y-6">
      {/* Header con botón de crear */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Plugins Personalizados
        </h3>
        <Button
          onClick={handleShowForm}
          size="sm"
          className="flex items-center gap-2"
        >
          <IconPlus className="w-4 h-4" />
          Crear Plugin
        </Button>
      </div>

      {/* Formulario de crear plugin */}
      {showForm && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 lg:p-6 bg-gray-50 dark:bg-gray-800 w-full max-w-none">
          <div className="space-y-4 lg:space-y-6">
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
            <div className={`grid gap-6 ${showFormPreview ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {/* Editor de código - se expande cuando no hay preview */}
              <div className={showFormPreview ? 'lg:col-span-2' : 'col-span-1'}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Código del Componente *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowFormPreview(!showFormPreview)}
                    className="flex items-center gap-2 text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    {showFormPreview ? (
                      <>
                        <IconEyeOff className="w-3 h-3" />
                        Ocultar Preview
                      </>
                    ) : (
                      <>
                        <IconEye className="w-3 h-3" />
                        Ver Preview
                      </>
                    )}
                  </button>
                </div>
                
                {/* Editor usando EditableCodeBlock */}
                <EditableCodeBlock
                  code={formData.code}
                  onChange={(code) => setFormData(prev => ({ ...prev, code }))}
                  placeholder={`// Plugin Hello World
function Component() {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg border border-blue-200 dark:border-blue-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-3">
          ¡Hola Mundo!
        </h2>
        <p className="text-blue-600 dark:text-blue-300 mb-4">
          Este es mi primer plugin personalizado
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          🚀 Plugin Activo
        </div>
      </div>
    </div>
  )
}`}
                  className="my-0"
                />
              </div>

              {/* Preview en tiempo real */}
              {showFormPreview && (
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preview en Tiempo Real
                  </label>
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] overflow-auto min-w-[320px] max-w-full mx-auto">
                    <div className="w-full min-w-[280px] max-w-md mx-auto">
                      {formPreviewComponent || (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          {formData.code.trim() ? 'Transpilando...' : 'Escribe código para ver el preview'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
            <div key={plugin.id} className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between p-3">
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
