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

  useEffect(() => {
    async function fetchStudentsWithGrades() {
      students.map(async (student) => {
        const response = await fetch('/api/get-students-with-grades', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ evaluation, students: [student] })
        })
        const data = await response.json()
        setStudentsWithGrades(prev => [...prev, ...data])
      })
    }
    fetchStudentsWithGrades()
  }, [evaluation, students])

  return (
    <>
      <UpdateGradesButton evaluation={evaluation} students={studentsWithGrades} />
      <ResultsTable students={studentsWithGrades} />
    </>
  )
}
