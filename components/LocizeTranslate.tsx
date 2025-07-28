import { useEffect } from 'react'

export default function LocizeTranslate() {
  useEffect(() => {
    // Configuración de Locize
    const script = document.createElement('script')
    script.src = 'https://cdn.locize.app/js/locize.min.js'
    script.onload = () => {
      // @ts-ignore
      window.locize.init({
        fallbackLng: 'es',
        backend: {
          projectId: 'your-project-id', // Necesitas registrarte en locize.com
          apiKey: 'your-api-key',
          version: 'latest'
        }
      })
    }
    document.head.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[src*="locize"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return null // Invisible, funciona automáticamente
}
