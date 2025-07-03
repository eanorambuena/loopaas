interface LoadingScoresProps {
  allScoresReady: boolean
}

export function LoadingScores({ allScoresReady }: LoadingScoresProps) {
  if (allScoresReady) return null
  return <div className="flex justify-center items-center p-2 text-gray-500 text-sm">Cargando puntajes...</div>
} 