'use client'

import { useState, useTransition } from 'react'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const switchLanguage = () => {
    const newLocale = locale === 'es' ? 'en' : 'es'
    
    startTransition(() => {
      // Remove current locale from pathname if present
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
      // Navigate to new locale
      router.replace(`/${newLocale}${pathWithoutLocale}`)
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      disabled={isPending}
      className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg disabled:opacity-50"
      title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <Globe className="h-5 w-5" />
    </Button>
  )
}
