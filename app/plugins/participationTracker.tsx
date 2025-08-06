import React, { useState, useEffect, useCallback } from 'react'
import { Users, TrendingUp, MessageCircle, HelpCircle, CheckCircle, Award, BarChart3, Download, Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import * as ExcelJS from 'exceljs'

// Interfaces
interface Student {
  id: string
  name: string
  email: string
  grade: number
  active: boolean
}

interface Course {
  id: string
  name: string
  organizacion: string
}

interface ParticipationEvent {
  studentId: string
  type: 'question' | 'answer_correct' | 'answer_incorrect' | 'participation' | 'contribution'
  timestamp: string
  points: number
  sessionId: string
}

interface ParticipationSession {
  id: string
  courseId: string
  name: string
  startTime: string
  endTime?: string
  isActive: boolean
}

export const id = 'participation-tracker'
export const permissions = ['getStudents', 'getCourses', 'supabaseAccess']
export const metadata = {
  name: 'Análisis de Participación en Tiempo Real',
  description: 'Registra participación estudiantil durante la clase con métricas en tiempo real'
}

const ParticipationTrackerPlugin: React.FC<any> = (props) => {
  const { getStudents, getCourses } = props
  
  // Estados principales
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [currentSession, setCurrentSession] = useState<ParticipationSession | null>(null)
  const [participationEvents, setParticipationEvents] = useState<ParticipationEvent[]>([])
  const [isSessionActive, setIsSessionActive] = useState(false)

  // Cargar cursos
  const loadCourses = useCallback(async () => {
    try {
      const coursesData = await getCourses()
      setCourses(coursesData)
    } catch (error) {
      console.error('Error loading courses:', error)
    }
  }, [getCourses])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  const loadStudents = async (courseId: string) => {
    try {
      const studentsData = await getStudents(courseId)
      setStudents(studentsData)
    } catch (error) {
      console.error('Error loading students:', error)
    }
  }

  // Iniciar nueva sesión
  const startSession = () => {
    if (!selectedCourse) return
    
    const session: ParticipationSession = {
      id: `session_${Date.now()}`,
      courseId: selectedCourse.id,
      name: `Sesión ${new Date().toLocaleDateString()}`,
      startTime: new Date().toISOString(),
      isActive: true
    }
    
    setCurrentSession(session)
    setIsSessionActive(true)
    setParticipationEvents([])
    
    // Guardar en localStorage
    localStorage.setItem('current_participation_session', JSON.stringify(session))
  }

  // Terminar sesión
  const endSession = () => {
    if (!currentSession) return
    
    const updatedSession = {
      ...currentSession,
      endTime: new Date().toISOString(),
      isActive: false
    }
    
    setCurrentSession(updatedSession)
    setIsSessionActive(false)
    
    // Guardar eventos en localStorage
    const allSessions = JSON.parse(localStorage.getItem('participation_sessions') || '[]')
    allSessions.push({
      session: updatedSession,
      events: participationEvents
    })
    localStorage.setItem('participation_sessions', JSON.stringify(allSessions))
    localStorage.removeItem('current_participation_session')
  }

  // Registrar participación
  const recordParticipation = (studentId: string, type: ParticipationEvent['type']) => {
    if (!currentSession || !isSessionActive) return
    
    const points = {
      'question': 3,
      'answer_correct': 5,
      'answer_incorrect': 1,
      'participation': 2,
      'contribution': 4
    }[type]
    
    const event: ParticipationEvent = {
      studentId,
      type,
      timestamp: new Date().toISOString(),
      points,
      sessionId: currentSession.id
    }
    
    setParticipationEvents(prev => [...prev, event])
  }

  // Calcular estadísticas por estudiante
  const getStudentStats = (studentId: string) => {
    const studentEvents = participationEvents.filter(e => e.studentId === studentId)
    
    return {
      totalPoints: studentEvents.reduce((sum, e) => sum + e.points, 0),
      questions: studentEvents.filter(e => e.type === 'question').length,
      correctAnswers: studentEvents.filter(e => e.type === 'answer_correct').length,
      incorrectAnswers: studentEvents.filter(e => e.type === 'answer_incorrect').length,
      participations: studentEvents.filter(e => e.type === 'participation').length,
      contributions: studentEvents.filter(e => e.type === 'contribution').length,
      totalEvents: studentEvents.length
    }
  }

  // Generar reporte Excel
  const generateReport = async () => {
    if (!currentSession || students.length === 0) {
      alert('No hay datos para generar reporte')
      return
    }

    try {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Reporte de Participación')

      // Headers
      const headers = [
        'Estudiante', 'Email', 'Puntos Totales', 'Preguntas', 
        'Respuestas Correctas', 'Respuestas Incorrectas', 
        'Participaciones', 'Contribuciones', 'Total Eventos'
      ]
      worksheet.addRow(headers)

      // Estilo del header
      const headerRow = worksheet.getRow(1)
      headerRow.font = { bold: true }
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B82F6' }
      }

      // Datos de estudiantes
      students.forEach(student => {
        const stats = getStudentStats(student.id)
        worksheet.addRow([
          student.name,
          student.email,
          stats.totalPoints,
          stats.questions,
          stats.correctAnswers,
          stats.incorrectAnswers,
          stats.participations,
          stats.contributions,
          stats.totalEvents
        ])
      })

      // Ajustar columnas
      worksheet.columns.forEach(column => {
        column.width = 15
      })

      // Generar archivo
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      })
      
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `participacion_${selectedCourse?.name}_${new Date().toISOString().split('T')[0]}.xlsx`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      alert('✅ Reporte generado exitosamente')
      
    } catch (error) {
      alert('❌ Error al generar reporte')
      console.error('Report generation error:', error)
    }
  }

  // Verificar permisos
  if (!getStudents || !getCourses) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-2">Permisos Insuficientes</h3>
        <p className="text-red-600">
          Este plugin necesita acceso a estudiantes y cursos para funcionar correctamente.
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Análisis de Participación</h1>
        </div>
        
        {isSessionActive && (
          <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 text-sm font-medium">Sesión Activa</span>
          </div>
        )}
      </div>

      {/* Selección de curso */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Curso:
        </label>
        <select
          value={selectedCourse?.id || ''}
          onChange={(e) => {
            const course = courses.find(c => c.id === e.target.value)
            setSelectedCourse(course || null)
            if (course) {
              loadStudents(course.id)
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Selecciona un curso --</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name} ({course.organizacion})
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <>
          {/* Controles de sesión */}
          <div className="mb-6 flex gap-4">
            {!isSessionActive ? (
              <Button onClick={startSession} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Iniciar Sesión
              </Button>
            ) : (
              <Button onClick={endSession} variant="destructive" className="flex items-center gap-2">
                <Pause className="w-4 h-4" />
                Terminar Sesión
              </Button>
            )}
            
            <Button onClick={generateReport} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Descargar Reporte
            </Button>
          </div>

          {/* Botones de participación */}
          {isSessionActive && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-3">Acciones Rápidas de Participación:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div className="text-center">
                  <HelpCircle className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                  <span className="text-xs">Pregunta (+3)</span>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <span className="text-xs">Resp. Correcta (+5)</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-1 text-red-600" />
                  <span className="text-xs">Resp. Incorrecta (+1)</span>
                </div>
                <div className="text-center">
                  <MessageCircle className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <span className="text-xs">Participación (+2)</span>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 mx-auto mb-1 text-yellow-600" />
                  <span className="text-xs">Contribución (+4)</span>
                </div>
              </div>
            </div>
          )}

          {/* Lista de estudiantes */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Estudiantes ({students.length})
            </h2>
            
            <div className="space-y-2">
              {students.map(student => {
                const stats = getStudentStats(student.id)
                return (
                  <div 
                    key={student.id} 
                    className="p-4 border border-gray-200 rounded-lg bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <div className="mt-2 flex items-center gap-4 text-xs">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {stats.totalPoints} puntos
                          </span>
                          <span className="text-gray-600">
                            {stats.totalEvents} eventos
                          </span>
                        </div>
                      </div>
                      
                      {isSessionActive && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => recordParticipation(student.id, 'question')}
                            className="p-2"
                            title="Hizo una pregunta"
                          >
                            <HelpCircle className="w-4 h-4 text-purple-600" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => recordParticipation(student.id, 'answer_correct')}
                            className="p-2"
                            title="Respondió correctamente"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => recordParticipation(student.id, 'answer_incorrect')}
                            className="p-2"
                            title="Respondió incorrectamente"
                          >
                            <RotateCcw className="w-4 h-4 text-red-600" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => recordParticipation(student.id, 'participation')}
                            className="p-2"
                            title="Participó en clase"
                          >
                            <MessageCircle className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => recordParticipation(student.id, 'contribution')}
                            className="p-2"
                            title="Hizo una contribución valiosa"
                          >
                            <Award className="w-4 h-4 text-yellow-600" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Estadísticas detalladas */}
                    {stats.totalEvents > 0 && (
                      <div className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-semibold text-purple-600">{stats.questions}</div>
                          <div className="text-gray-500">Preguntas</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-green-600">{stats.correctAnswers}</div>
                          <div className="text-gray-500">Correctas</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-red-600">{stats.incorrectAnswers}</div>
                          <div className="text-gray-500">Incorrectas</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">{stats.participations}</div>
                          <div className="text-gray-500">Participaciones</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-yellow-600">{stats.contributions}</div>
                          <div className="text-gray-500">Contribuciones</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-800">{stats.totalPoints}</div>
                          <div className="text-gray-500">Total</div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Resumen de la sesión */}
          {currentSession && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Resumen de la Sesión
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {participationEvents.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Eventos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {new Set(participationEvents.map(e => e.studentId)).size}
                  </p>
                  <p className="text-sm text-gray-600">Estudiantes Activos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {participationEvents.reduce((sum, e) => sum + e.points, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Puntos Totales</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {students.length > 0 ? Math.round((new Set(participationEvents.map(e => e.studentId)).size / students.length) * 100) : 0}%
                  </p>
                  <p className="text-sm text-gray-600">Participación</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ParticipationTrackerPlugin
