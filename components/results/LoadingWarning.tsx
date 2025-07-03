interface LoadingWarningProps {
  allScoresReady: boolean
}

export function LoadingWarning({ allScoresReady }: LoadingWarningProps) {
  if (allScoresReady) return null
  return (
    <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-xs sm:text-sm font-medium">
      Advertencia: la tabla podría no estar completa todavía.
    </span>
  )
} 