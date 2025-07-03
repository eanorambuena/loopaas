'use client'

import { useEffect, useState, useRef } from 'react'
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
  const [copied, setCopied] = useState(false)
  const [allScoresReady, setAllScoresReady] = useState(false)
  const pendingPromises = useRef<Promise<any>[]>([])

  // Inicializar la tabla con todos los estudiantes (sin puntaje)
  useEffect(() => {
    if (!students || students.length === 0) return
    setStudentsWithGrades(
      students.map(s => ({ ...s, peerEvaluationScore: null }))
    )
    setAllScoresReady(false)
    setLoading(true)
  }, [students])

  // Calcular puntajes asíncronos fila a fila, actualizando por userInfoId
  useEffect(() => {
    if (!evaluation || students.length === 0) return
    let isCancelled = false
    const promises: Promise<void>[] = students.map((student) => {
      return fetch('/api/get-peer-evaluation-scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evaluation, students: [student] })
      })
        .then(async res => {
          if (!res.ok) throw new Error('Error al calcular puntaje')
          const [result] = await res.json()
          if (!isCancelled) {
            setStudentsWithGrades(prev => prev.map(s => {
              if (s.userInfoId === result.userInfoId) {
                const nombre = `${s.userInfo?.firstName ?? ''} ${s.userInfo?.lastName ?? ''}`.trim()
                console.log(`Puntaje actualizado en UI para estudiante: ${nombre} (${s.userInfoId}) = ${result.peerEvaluationScore}`)
                return { ...s, peerEvaluationScore: result.peerEvaluationScore }
              }
              return s
            }))
          }
          // Guardar en la base de datos (asincrónico, no bloquea la UI)
          if (result && result.userInfoId && evaluation.id && result.peerEvaluationScore !== undefined && result.peerEvaluationScore !== null && result.peerEvaluationScore !== 'N/A') {
            const nombre = `${student.userInfo?.firstName ?? ''} ${student.userInfo?.lastName ?? ''}`.trim()
            fetch('/api/save-grade', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userInfoId: result.userInfoId,
                evaluationId: evaluation.id,
                score: parseFloat(result.peerEvaluationScore)
              })
            })
              .then(r => {
                if (r.ok) {
                  console.log(`Puntaje guardado en Supabase para estudiante: ${nombre} (${result.userInfoId}) = ${result.peerEvaluationScore}`)
                }
              })
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setStudentsWithGrades(prev => prev.map(s =>
              s.userInfoId === student.userInfoId
                ? { ...s, peerEvaluationScore: 'N/A' }
                : s
            ))
          }
        })
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
    const rows = studentsWithGrades.map(s => [
      `${s.userInfo?.firstName ?? ''} ${s.userInfo?.lastName ?? ''}`.trim(),
      s.userInfo?.email ?? '',
      s.group ?? '',
      (s.group ? (String(s.group).length <= 1 ? String(s.group) : String(s.group).slice(0, -1)) : 'N/A'),
      s.peerEvaluationScore ?? ''
    ])
    const tsv = [headers, ...rows].map(row => row.join('\t')).join('\n')
    navigator.clipboard.writeText(tsv)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
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
        <p>Estudiantes con puntajes: {studentsWithGrades.filter(s => s.peerEvaluationScore !== null && s.peerEvaluationScore !== undefined).length}</p>
        <p>Estudiantes con puntajes válidos: {studentsWithGrades.filter(s => s.peerEvaluationScore && s.peerEvaluationScore !== 'N/A').length}</p>
      </div>
      <div className="mb-4 flex gap-4 items-center">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={handleCopyTable}
        >
          Copiar tabla
        </button>
        {copied && <span className="text-green-700 font-semibold">¡Tabla copiada!</span>}
        {!allScoresReady && (
          <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-sm font-medium">
            Advertencia: la tabla podría no estar completa todavía.
          </span>
        )}
      </div>
      {!allScoresReady && (
        <div className="flex justify-center items-center p-2 text-gray-500 text-sm">Cargando puntajes...</div>
      )}
      <ResultsTable students={studentsWithGrades} />
    </>
  )
}
