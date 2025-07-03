'use client'

import { useEffect, useState, useRef } from 'react'
import { ResultsTable } from '@/components/results/ResultsTable'
import { StudentWithGrades } from '@/utils/schema'
import { DebugInfo } from './DebugInfo'
import { CopyTableButton } from './CopyTableButton'
import { LoadingWarning } from './LoadingWarning'
import { LoadingScores } from './LoadingScores'
import { ErrorMessage } from './ErrorMessage'

interface ResultsDisplayProps {
  evaluation: any
  students: any[]
}

function mapStudentsToInitialGrades(students: any[]): StudentWithGrades[] {
  return students.map(student => ({ ...student, peerEvaluationScore: null }))
}

async function fetchStudentPeerScore(evaluation: any, student: any) {
  const response = await fetch('/api/get-peer-evaluation-scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ evaluation, students: [student] })
  })
  if (!response.ok) throw new Error('Error al calcular puntaje')
  const [result] = await response.json()
  return result
}

async function persistStudentGrade(userInfoId: string, evaluationId: string, score: number, studentName: string) {
  const response = await fetch('/api/save-grade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userInfoId, evaluationId, score })
  })
  if (response.ok) {
    console.log(`Puntaje guardado en Supabase para estudiante: ${studentName} (${userInfoId}) = ${score}`)
  }
}

function getFullStudentName(userInfo: any) {
  return `${userInfo?.firstName ?? ''} ${userInfo?.lastName ?? ''}`.trim()
}

function getSectionFromGroup(group: string | number | null | undefined): string {
  if (!group) return 'N/A'
  const groupStr = String(group)
  if (groupStr.length <= 1) return groupStr
  return groupStr.slice(0, -1)
}

function getTableRows(studentsWithGrades: StudentWithGrades[]) {
  return studentsWithGrades.map(student => [
    getFullStudentName(student.userInfo),
    student.userInfo?.email ?? '',
    student.group ?? '',
    getSectionFromGroup(student.group),
    student.peerEvaluationScore ?? ''
  ])
}

export function ResultsDisplay({ evaluation, students }: ResultsDisplayProps) {
  const [studentsWithGrades, setStudentsWithGrades] = useState<StudentWithGrades[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [allScoresReady, setAllScoresReady] = useState(false)
  const pendingPromises = useRef<Promise<any>[]>([])

  useEffect(() => {
    if (!students || students.length === 0) return
    setStudentsWithGrades(mapStudentsToInitialGrades(students))
    setAllScoresReady(false)
    setLoading(true)
  }, [students])

  useEffect(() => {
    if (!evaluation || students.length === 0) return
    console.log('Iniciando cálculo de puntajes para todos los estudiantes:', students.map(s => s.userInfoId))
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
    Promise.all(promises).then(() => {
      if (!isCancelled) {
        setAllScoresReady(true)
        setLoading(false)
      }
    })
    return () => { isCancelled = true }
  }, [evaluation, students])

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
      </div>
      <LoadingScores allScoresReady={allScoresReady} />
      <ResultsTable students={studentsWithGrades} />
    </>
  )
}
