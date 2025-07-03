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
  fetchStudentsWithGrades,
  fetchStudentPeerScore,
  persistStudentGrade,
  getFullStudentName,
  getTableRows
} from '@/components/results/resultsDisplayLogic'
import { UpdateScoresButton } from '@/components/results/UpdateScoresButton'

interface ResultsDisplayProps {
  evaluation: any
  students: any[]
}

function mapStudentsToInitialGrades(students: any[]): StudentWithGrades[] {
  return students.map(student => ({ ...student, peerEvaluationScore: null }))
}

function getSectionFromGroup(group: string | number | null | undefined): string {
  if (!group) return 'N/A'
  const groupStr = String(group)
  if (groupStr.length <= 1) return groupStr
  return groupStr.slice(0, -1)
}

export function ResultsDisplay({ evaluation, students }: ResultsDisplayProps) {
  const [studentsWithGrades, setStudentsWithGrades] = useState<StudentWithGrades[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [allScoresReady, setAllScoresReady] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const pendingPromises = useRef<Promise<any>[]>([])

  useEffect(() => {
    async function fetchGrades() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/get-students-with-grades', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ evaluation, students })
        })
        if (!response.ok) throw new Error('Error al obtener notas desde la base de datos')
        const data = await response.json()
        setStudentsWithGrades(data)
        setAllScoresReady(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }
    if (evaluation && students.length > 0) {
      fetchGrades()
    }
  }, [evaluation, students])

  async function handleUpdateScores() {
    setIsUpdating(true)
    setError(null)
    setAllScoresReady(false)
    try {
      let isCancelled = false
      const promises: Promise<void>[] = students.map(async (student) => {
        try {
          const result = await fetchStudentPeerScore(evaluation, student)
          if (!isCancelled) {
            setStudentsWithGrades(prev => prev.map(s => {
              if (s.userInfoId === result.userInfoId) {
                const nombre = getFullStudentName(s.userInfo)
                console.log(`Puntaje actualizado en UI para estudiante: ${nombre} (${s.userInfoId}) = ${result.peerEvaluationScore}`)
                return { ...s, peerEvaluationScore: result.peerEvaluationScore }
              }
              return s
            }))
          }
          if (result && result.userInfoId && evaluation.id && result.peerEvaluationScore !== undefined && result.peerEvaluationScore !== null && result.peerEvaluationScore !== 'N/A') {
            const nombre = getFullStudentName(student.userInfo)
            persistStudentGrade(result.userInfoId, evaluation.id, parseFloat(result.peerEvaluationScore), nombre)
          }
        } catch {
          if (!isCancelled) {
            setStudentsWithGrades(prev => prev.map(s =>
              s.userInfoId === student.userInfoId
                ? { ...s, peerEvaluationScore: 'N/A' }
                : s
            ))
          }
        }
      })
      pendingPromises.current = promises
      await Promise.all(promises)
      setAllScoresReady(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsUpdating(false)
    }
  }

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

  if (error) return <ErrorMessage error={error} />

  return (
    <>
      <DebugInfo evaluation={evaluation} students={students} studentsWithGrades={studentsWithGrades} />
      <div className="mb-4 flex gap-4 items-center">
        <CopyTableButton studentsWithGrades={studentsWithGrades} onCopy={handleCopyTable} copied={copied} />
        <LoadingWarning allScoresReady={allScoresReady} />
        <UpdateScoresButton onClick={handleUpdateScores} isUpdating={isUpdating} loading={loading} />
      </div>
      <LoadingScores allScoresReady={allScoresReady || isUpdating} />
      <ResultsTable students={studentsWithGrades} />
    </>
  )
}
