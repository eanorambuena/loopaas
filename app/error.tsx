'use client' // Error components must be Client Components
 
import { UhOhIcon } from '@/components/icons/UhOhIcon'
import MainButton from '@/components/MainButton'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='flex flex-col items-center justify-center h-full gap-4 text-center'>
      <h1 className='text-3xl font-bold'>Algo salió mal</h1>
      <UhOhIcon />
      <MainButton
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Intenta de nuevo
      </MainButton>
    </div>
  )
}
