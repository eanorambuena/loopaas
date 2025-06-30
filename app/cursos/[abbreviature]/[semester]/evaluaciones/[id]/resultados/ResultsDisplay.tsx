'use client'

import { useEffect, useState } from 'react'
import { UpdateGradesButton } from '@/components/results/UpdateGradesButton'
import { ResultsTable } from '@/components/results/ResultsTable'
import { StudentWithGrades } from '@/utils/schema'

interface ResultsDisplayProps {
  evaluation: any
  students: any[]
}

export function ResultsDisplay({ evaluation, students }: ResultsDisplayProps) {
  const [studentsWithGrades, setStudentsWithGrades] = useState<StudentWithGrades[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStudentsWithGrades() {
      try {
        setLoading(true)
        setError(null)
        console.log('Fetching students with grades for evaluation:', evaluation.id)
        console.log('Students to process:', students.length)
        
        const response = await fetch('/api/get-students-with-grades', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ evaluation, students })
        })
        
        if (!response.ok) {
          throw new Error(`Error al obtener las notas: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Received data:', data)
        setStudentsWithGrades(data)
      } catch (error) {
        console.error('Error fetching students with grades:', error)
        setError(error instanceof Error ? error.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }
    
    if (evaluation && students.length > 0) {
      fetchStudentsWithGrades()
    }
  }, [evaluation, students])

  if (loading) {
    return <div className="flex justify-center items-center p-8">Cargando resultados...</div>
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-blue-800">Información de Debug:</h3>
        <p>Evaluación ID: {evaluation.id}</p>
        <p>Estudiantes totales: {students.length}</p>
        <p>Estudiantes con notas: {studentsWithGrades.length}</p>
        <p>Estudiantes con notas válidas: {studentsWithGrades.filter(s => s.finalGrade && s.finalGrade !== 'N/A').length}</p>
      </div>
      
      <UpdateGradesButton evaluation={evaluation} students={studentsWithGrades} />
      <ResultsTable students={studentsWithGrades} />
    </>
  )
}
