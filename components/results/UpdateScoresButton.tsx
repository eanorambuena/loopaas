import React from 'react'

interface UpdateScoresButtonProps {
  onClick: () => void
  isUpdating: boolean
  loading: boolean
}

export function UpdateScoresButton({ onClick, isUpdating, loading }: UpdateScoresButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      onClick={onClick}
      disabled={isUpdating || loading}
    >
      {isUpdating ? 'Actualizando puntajes...' : 'Actualizar puntajes'}
    </button>
  )
} 
