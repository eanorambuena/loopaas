'use client'

import SecondaryButton from '@/components/SecondaryButton'
import { Evaluation } from '@/utils/schema'
import { useState } from 'react'

interface UpdateGradesButtonProps {
  evaluation: Evaluation
  students: any[]
}

export function UpdateGradesButton({ evaluation, students }: UpdateGradesButtonProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function updateGrades() {
    try {
      setIsUpdating(true)
      setMessage('Actualizando notas...')
      console.log('Updating grades for evaluation:', evaluation.id)
      console.log('Number of students:', students.length)
      
      const promises = students.map(async (student) => {
        console.log('Solicitando actualización de nota para estudiante:', student.userInfoId)
        const response = await fetch('/api/save-grades', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ evaluation, students: [student] })
        })
        
        if (!response.ok) {
          throw new Error(`Error updating grades for student ${student.userInfoId}: ${response.status}`)
        }
        
        return response.json()
      })
      
      await Promise.all(promises)
      console.log('Grades updated successfully')
      setMessage('Notas actualizadas correctamente. Recargando página...')
      
      // Reload after a short delay to show the message
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error('Error updating grades:', error)
      setMessage(`Error al actualizar notas: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setIsUpdating(false)
    }
  }
  
  return (
    <div className="mb-4">
      <SecondaryButton
        className='w-fit'
        onClick={updateGrades}
        pendingText='Actualizando Notas...'
        disabled={isUpdating}
      >
        {isUpdating ? 'Actualizando Notas...' : 'Actualizar Notas'}
      </SecondaryButton>
      {message && (
        <div className={`mt-2 p-2 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  )
}
