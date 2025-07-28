import { useEffect } from 'react'

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Función que inicializa Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'es',
          includedLanguages: 'en,es,fr,pt,it',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      )
    }

    // Cargar el script de Google Translate
    const script = document.createElement('script')
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="translate.google.com"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">Traducir:</span>
      <div id="google_translate_element" className="inline-block"></div>
    </div>
  )
}
