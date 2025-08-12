import React from 'react'

/**
 * Transpila código JSX usando la API
 */
export const transpileCode = async (code: string): Promise<string> => {
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

/**
 * Renderiza un componente de manera segura desde código transpilado
 */
export const renderPluginComponentSafe = async (code: string): Promise<React.ReactElement<any>> => {
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
}
