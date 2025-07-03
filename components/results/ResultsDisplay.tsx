'use client'

import { useEffect, useState, useRef } from 'react'
import { ResultsTable } from '@/components/results/ResultsTable'
import { StudentWithGrades } from '@/utils/schema'
import { DebugInfo } from '@/components/results/DebugInfo'
import { CopyTableButton } from '@/components/results/CopyTableButton'
import { LoadingWarning } from '@/components/results/LoadingWarning'
import { LoadingScores } from '@/components/results/LoadingScores'
import { ErrorMessage } from '@/components/results/ErrorMessage'
import {
  fetchStudentPeerScore,
  persistStudentGrade,
  getFullStudentName,
  getTableRows,
  fetchStudentsWithGrades
} from '@/components/results/resultsDisplayLogic'
import { UpdateScoresButton } from '@/components/results/UpdateScoresButton'
import { useRouter } from 'next/navigation'

interface ResultsDisplayProps {
  evaluation: any
  students: any[]
  abbreviature?: string
  semester?: string
  publicView?: boolean
}

export function ResultsDisplay({ evaluation, students, abbreviature, semester, publicView }: ResultsDisplayProps) {
  const [studentsWithGrades, setStudentsWithGrades] = useState<StudentWithGrades[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [allScoresReady, setAllScoresReady] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const pendingPromises = useRef<Promise<any>[]>([])
  const studentsRef = useRef<StudentWithGrades[]>([])

  useEffect(() => {
    let isCancelled = false
    async function fetchGradesRowByRow() {
      setLoading(true)
      setError(null)
      studentsRef.current = students.map(s => ({ ...s, peerEvaluationScore: null }))
      setStudentsWithGrades([...studentsRef.current])
      setAllScoresReady(false)
      try {
        for (const student of students) {
          if (isCancelled) break
          try {
            const response = await fetch('/api/get-students-with-grades', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ evaluation, students: [student] })
            })
            if (!response.ok) throw new Error('Error al obtener nota desde la base de datos')
            const [data] = await response.json()
            const idx = studentsRef.current.findIndex(s => s.userInfoId === student.userInfoId)
            if (idx !== -1) {
              studentsRef.current[idx].peerEvaluationScore = data.peerEvaluationScore
              setStudentsWithGrades([...studentsRef.current])
              if (
                !publicView &&
                data.peerEvaluationScore !== undefined &&
                data.peerEvaluationScore !== null &&
                data.peerEvaluationScore !== 'N/A' &&
                evaluation.id &&
                student.userInfoId
              ) {
                persistStudentGrade(student.userInfoId, evaluation.id, parseFloat(data.peerEvaluationScore), getFullStudentName(student.userInfo))
              }
            }
          } catch (err) {
            const idx = studentsRef.current.findIndex(s => s.userInfoId === student.userInfoId)
            if (idx !== -1) {
              studentsRef.current[idx].peerEvaluationScore = 'N/A'
              setStudentsWithGrades([...studentsRef.current])
            }
          }
        }
        setAllScoresReady(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }
    async function fetchAllGradesFromDB() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchStudentsWithGrades(evaluation, students)
        setStudentsWithGrades(data)
        setAllScoresReady(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }
    if (evaluation && students.length > 0) {
      if (publicView) {
        fetchAllGradesFromDB()
      } else {
        fetchGradesRowByRow()
      }
    }
    return () => { isCancelled = true }
  }, [evaluation, students, publicView])

  function handleCopyTable() {
    if (!studentsWithGrades.length) return
    const headers = ['Estudiante', 'Correo', 'Grupo', 'Sección', 'Puntaje de Coevaluación']
    const rows = getTableRows(studentsWithGrades)
    const tsv = [headers, ...rows].map(row => row.join('\t')).join('\n')
    navigator.clipboard.writeText(tsv)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
  }

  function ShareLinkButton({ abbreviature, semester, evaluation }: { abbreviature: string, semester: string, evaluation: any }) {
    const [copied, setCopied] = useState(false)
    const id = evaluation?.id || ''
    const publicUrl = `${window.location.origin}/compartir/cursos/${abbreviature}/${semester}/evaluaciones/${id}/resultados`
    const handleCopy = () => {
      navigator.clipboard.writeText(publicUrl)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
    }
    return (
      <button
        className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm"
        onClick={handleCopy}
      >
        {copied ? '¡Link copiado!' : 'Compartir link público'}
      </button>
    )
  }

  if (error) return <ErrorMessage error={error} />

  return (
    <>
      {!publicView && <DebugInfo evaluation={evaluation} students={students} studentsWithGrades={studentsWithGrades} />}
      <div className="mb-4 flex gap-4 items-center">
        <CopyTableButton studentsWithGrades={studentsWithGrades} onCopy={handleCopyTable} copied={copied} />
        <LoadingWarning allScoresReady={allScoresReady} />
        <ShareLinkButton abbreviature={abbreviature || ''} semester={semester || ''} evaluation={evaluation} />
      </div>
      <LoadingScores allScoresReady={allScoresReady || isUpdating} />
      <ResultsTable students={studentsWithGrades} />
    </>
  )
}
