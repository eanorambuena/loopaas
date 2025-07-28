'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Languages, Globe } from 'lucide-react';
import GoogleTranslate from './GoogleTranslate';
import BrowserTranslate from './BrowserTranslate';

export default function SmartTranslate() {
  const [userLanguage, setUserLanguage] = useState<string>('');
  const [showTranslateOptions, setShowTranslateOptions] = useState(false);

  useEffect(() => {
    // Detectar idioma del usuario
    const detectedLanguage = navigator.language || navigator.languages?.[0] || '';
    setUserLanguage(detectedLanguage.toLowerCase());
    
    // Mostrar opciones de traducción si no es español
    if (!detectedLanguage.toLowerCase().startsWith('es')) {
      setShowTranslateOptions(true);
    }
  }, []);

  const suggestTranslation = () => {
    // Sugerir usar traducción automática del browser
    if (window.confirm('¿Te gustaría traducir esta página al inglés? Puedes usar la traducción automática de tu navegador (clic derecho → Traducir) o usar nuestro traductor integrado.')) {
      setShowTranslateOptions(true);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Mostrar sugerencia si el usuario no habla español */}
      {userLanguage && !userLanguage.startsWith('es') && !showTranslateOptions && (
        <Button
          onClick={suggestTranslation}
          variant="outline"
          size="sm"
          className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          <Globe className="h-4 w-4" />
          Translate page?
        </Button>
      )}

      {/* Opciones de traducción */}
      {showTranslateOptions && (
        <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <Languages className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-blue-700 dark:text-blue-300">Traducir:</span>
          
          {/* Google Translate Widget */}
          <GoogleTranslate />
          
          {/* Browser Translation API (si está disponible) */}
          <BrowserTranslate />
          
          {/* Instrucciones para traducción manual del browser */}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            o clic derecho → "Traducir"
          </span>
          
          <Button
            onClick={() => setShowTranslateOptions(false)}
            variant="ghost"
            size="sm"
            className="ml-2 h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>
      )}
    </div>
  );
}
