'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  className = '',
  label = 'Cargando...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className='flex items-center justify-center h-64'>
      <svg 
        className={`animate-spin text-emerald-600 dark:text-emerald-400 ${sizeClasses[size]} ${className}`} 
        xmlns='http://www.w3.org/2000/svg' 
        fill='none' 
        viewBox='0 0 24 24' 
        role='status' 
        aria-label={label}
      >
        <circle 
          className='opacity-25' 
          cx='12' 
          cy='12' 
          r='10' 
          stroke='currentColor' 
          strokeWidth='4'
        />
        <path 
          className='opacity-75' 
          fill='currentColor' 
          d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
        />
      </svg>
    </div>
  )
} 