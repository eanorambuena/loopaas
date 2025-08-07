'use client'

import { Badge } from '@/components/ui/badge'
import { Crown } from 'lucide-react'

interface ProBadgeProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal'
  showIcon?: boolean
}

export default function ProBadge({ 
  className = '', 
  size = 'sm', 
  variant = 'default',
  showIcon = true 
}: ProBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5', 
    lg: 'text-base px-4 py-2'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  if (variant === 'minimal') {
    return (
      <Badge 
        className={`
          bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 
          font-semibold ${sizeClasses[size]} ${className}
        `}
      >
        {showIcon && <Crown className={`${iconSizes[size]} mr-1`} />}
        Pro
      </Badge>
    )
  }

  return (
    <Badge 
      className={`
        relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 
        text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 
        overflow-hidden font-bold ${sizeClasses[size]} ${className}
      `}
    >
      {/* Efectos especiales */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
      <div className="absolute top-0 left-1/4 w-1 h-1 bg-white/80 rounded-full animate-twinkle"></div>
      <div className="absolute bottom-0 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-twinkle-delayed"></div>
      
      {/* Contenido */}
      <span className="relative z-10 flex items-center gap-1">
        {showIcon && <Crown className={iconSizes[size]} />}
        Pro
      </span>
    </Badge>
  )
}
