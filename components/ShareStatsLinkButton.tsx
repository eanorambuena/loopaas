'use client'

import { useState } from 'react'

export function ShareStatsLinkButton({ publicUrl }: { publicUrl: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
  }
  return (
    <button
      className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm"
      onClick={handleCopy}
      disabled={!publicUrl}
    >
      {copied ? '¡Link copiado!' : 'Compartir link público'}
    </button>
  )
} 