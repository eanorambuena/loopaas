'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Languages } from 'lucide-react';

declare global {
  interface Window {
    translation: {
      canTranslate: (options: {sourceLanguage: string, targetLanguage: string}) => Promise<string>;
      createTranslator: (options: {sourceLanguage: string, targetLanguage: string}) => Promise<any>;
    };
  }
}

export default function BrowserTranslate() {
  const [canTranslate, setCanTranslate] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // Verificar si el browser soporta la Translation API
    const checkTranslationSupport = async () => {
      if ('translation' in window) {
        try {
          const availability = await window.translation.canTranslate({
            sourceLanguage: 'es',
            targetLanguage: 'en'
          });
          setCanTranslate(availability === 'readily');
        } catch (error) {
          console.log('Translation API no disponible');
        }
      }
    };

    checkTranslationSupport();
  }, []);

  const translatePage = async () => {
    if (!canTranslate) return;
    
    setIsTranslating(true);
    try {
      const translator = await window.translation.createTranslator({
        sourceLanguage: 'es',
        targetLanguage: 'en'
      });

      // Traducir elementos de texto
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, button, label');
      
      for (let i = 0; i < textElements.length; i++) {
        const element = textElements[i];
        const originalText = element.textContent;
        if (originalText && originalText.trim()) {
          try {
            const translatedText = await translator.translate(originalText);
            element.textContent = translatedText;
          } catch (error) {
            console.log('Error traduciendo:', originalText);
          }
        }
      }
    } catch (error) {
      console.error('Error en traducción:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  if (!canTranslate) return null;

  return (
    <Button
      onClick={translatePage}
      disabled={isTranslating}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      {isTranslating ? 'Traduciendo...' : 'Translate to English'}
    </Button>
  );
}
