'use client'

import SecondaryButton from '@/components/SecondaryButton'
import { Evaluation } from '@/utils/schema'

interface UpdateGradesButtonProps {
  evaluation: Evaluation
  students: any[]
}

export function UpdateGradesButton({ evaluation, students }: UpdateGradesButtonProps) {
  async function updateGrades() {
    console.log('Updating grades...')
    const promises = students.map(async (student) => {
      const response = await fetch('/api/save-grades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ evaluation, students: [student] })
      })
      return response.json()
    })
    await Promise.all(promises)
    console.log('Grades updated')
    window.location.reload()
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
