'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Languages, Globe } from 'lucide-react'
import GoogleTranslate from './GoogleTranslate'
import BrowserTranslate from './BrowserTranslate'

export default function SmartTranslate() {
  const [userLanguage, setUserLanguage] = useState<string>('')
  const [showTranslateOptions, setShowTranslateOptions] = useState(false)

  useEffect(() => {
    // Detectar idioma del usuario
    const detectedLanguage = navigator.language || navigator.languages?.[0] || ''
    setUserLanguage(detectedLanguage.toLowerCase())
    
    // Mostrar opciones de traducción si no es español
    if (!detectedLanguage.toLowerCase().startsWith('es')) {
      setShowTranslateOptions(true)
    }
  }, [])

  const suggestTranslation = () => {
    // Sugerir usar traducción automática del browser
    if (window.confirm('¿Te gustaría traducir esta página al inglés? Puedes usar la traducción automática de tu navegador (clic derecho → Traducir) o usar nuestro traductor integrado.')) {
      setShowTranslateOptions(true)
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Mostrar sugerencia si el usuario no habla español */}
      {userLanguage && !userLanguage.startsWith('es') && !showTranslateOptions && (
        <Button
          onClick={suggestTranslation}
          variant="outline"
          size="sm"
          className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          <Globe className="h-4 w-4" />
          Translate page?
        </Button>
      )}

      {/* Opciones de traducción */}
      {showTranslateOptions && (
        <div className="flex flex-col sm:flex-row items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 max-w-full">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">Traducir:</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Google Translate Widget */}
            <GoogleTranslate />
            
            {/* Browser Translation API (si está disponible) */}
            <BrowserTranslate />
            
            {/* Instrucciones para traducción manual del browser */}
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              o clic derecho → &quot;Traducir&quot;
            </span>
          </div>
          
          <Button
            onClick={() => setShowTranslateOptions(false)}
            variant="ghost"
            size="sm"
            className="ml-2 h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            ×
          </Button>
        </div>
      )}
    </div>
  )
}
