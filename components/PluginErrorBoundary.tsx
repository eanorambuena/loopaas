'use client'

import React from 'react'

interface PluginErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface PluginErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactElement
  pluginName?: string
}

export class PluginErrorBoundary extends React.Component<
  PluginErrorBoundaryProps,
  PluginErrorBoundaryState
> {
  constructor(props: PluginErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): PluginErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Plugin Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2">
                ⚠️ Error en el plugin{this.props.pluginName ? ` "${this.props.pluginName}"` : ''}
              </h4>
              <pre className="text-red-600 dark:text-red-300 text-sm whitespace-pre-wrap font-mono mb-3 bg-red-100 dark:bg-red-900/30 p-2 rounded">
                {this.state.error?.message || 'Error desconocido'}
              </pre>
              <div className="text-red-500 dark:text-red-400 text-xs space-y-1">
                <p>💡 <strong>Consejos:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Asegúrate de que todas las variables estén definidas</li>
                  <li>Si usas hooks como <code>useState</code>, importa React primero</li>
                  <li>Usa JSX normal: <code>&lt;div className=&quot;...&quot;&gt;contenido&lt;/div&gt;</code></li>
                  <li>Define una función llamada &quot;Component&quot; que retorne JSX</li>
                </ul>
              </div>
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="mt-3 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
