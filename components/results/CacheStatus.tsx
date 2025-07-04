'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface CacheStatusProps {
  evaluationId: string
  onRefresh: () => Promise<void>
  isRefreshing?: boolean
  lastUpdated?: Date
}

export function CacheStatus({ evaluationId, onRefresh, isRefreshing = false, lastUpdated }: CacheStatusProps) {
  const [isManualRefreshing, setIsManualRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsManualRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsManualRefreshing(false)
    }
  }

  const isLoading = isRefreshing || isManualRefreshing

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
      <div className="flex items-center gap-1">
        {isLoading ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : lastUpdated ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <AlertCircle className="h-4 w-4 text-yellow-500" />
        )}
        <span>
          {isLoading 
            ? 'Actualizando...' 
            : lastUpdated 
              ? `Actualizado ${lastUpdated.toLocaleTimeString('es-CL', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                })}`
              : 'Sin datos cacheados'
          }
        </span>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRefresh}
        disabled={isLoading}
        className="h-6 px-2 text-xs"
      >
        <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
        <span className="ml-1">Actualizar</span>
      </Button>
    </div>
  )
} 