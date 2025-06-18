'use client'

import SecondaryButton from '@/components/SecondaryButton'

export function UpdateGradesButton({ evaluationId, students }: { evaluationId: string, students: any[] }) {
  function updateGrades() {
    fetch('/api/save-grades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ evaluationId, students })
    })
  }
  
  return (
    <SecondaryButton
      className='w-fit'
      onClick={updateGrades}
      pendingText='Actualizando Notas...'
    >
      Actualizar Notas
    </SecondaryButton>
  )
}
