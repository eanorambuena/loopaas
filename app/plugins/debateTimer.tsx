import React, { useState, useEffect, useRef } from 'react'
import { Clock, Play, Pause, RotateCcw, Plus, Trash2, Settings, Users, Trophy, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import * as ExcelJS from 'exceljs'

// Interfaces
interface DebateTeam {
  id: string
  name: string
  color: string
  totalTime: number // en segundos
  usedTime: number // en segundos
  isActive: boolean
  members: string[]
}

interface DebateSection {
  id: string
  name: string
  duration: number // en segundos
  description?: string
}

interface DebateSession {
  id: string
  name: string
  teams: DebateTeam[]
  sections: DebateSection[]
  currentSectionIndex: number
  startTime?: string
  endTime?: string
  isActive: boolean
}

interface TimeLog {
  teamId: string
  sectionId: string
  startTime: string
  endTime?: string
  duration: number
  timestamp: string
}

export const id = 'debate-timer'
export const permissions = []
export const metadata = {
  name: 'Timer de Debates',
  description: 'Gestiona tiempos de equipos en debates con secciones personalizadas'
}

const DebateTimerPlugin: React.FC = () => {
  // Estados principales
  const [debateSession, setDebateSession] = useState<DebateSession | null>(null)
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null)
  
  // Estados de configuración
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [newSectionName, setNewSectionName] = useState('')
  const [newSectionDuration, setNewSectionDuration] = useState(5)
  
  // Referencias
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  // Colores predefinidos para equipos
  const teamColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ]

  // Efectos
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Funciones de gestión de tiempo
  const startTimer = (teamId: string) => {
    if (!debateSession) return
    
    setActiveTeamId(teamId)
    setIsRunning(true)
    startTimeRef.current = Date.now()
    
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      setCurrentTime(elapsed)
      
      // Actualizar tiempo usado del equipo
      setDebateSession(prev => {
        if (!prev) return prev
        return {
          ...prev,
          teams: prev.teams.map(team => 
            team.id === teamId 
              ? { ...team, usedTime: team.usedTime + 1 }
              : team
          )
        }
      })
    }, 1000)
  }

  const pauseTimer = () => {
    if (!isRunning || !activeTeamId || !debateSession) return
    
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    // Registrar log de tiempo
    const currentSection = debateSession.sections[debateSession.currentSectionIndex]
    if (currentSection) {
      const log: TimeLog = {
        teamId: activeTeamId,
        sectionId: currentSection.id,
        startTime: new Date(Date.now() - currentTime * 1000).toISOString(),
        endTime: new Date().toISOString(),
        duration: currentTime,
        timestamp: new Date().toISOString()
      }
      setTimeLogs(prev => [...prev, log])
    }
    
    setCurrentTime(0)
    setActiveTeamId(null)
  }

  const resetTimer = () => {
    pauseTimer()
    setCurrentTime(0)
    setActiveTeamId(null)
  }

  // Funciones de configuración
  const createNewSession = () => {
    const session: DebateSession = {
      id: `debate_${Date.now()}`,
      name: `Debate ${new Date().toLocaleDateString()}`,
      teams: [],
      sections: [
        { id: 'opening', name: 'Apertura', duration: 300 },
        { id: 'arguments', name: 'Argumentos', duration: 600 },
        { id: 'counterarguments', name: 'Contraargumentos', duration: 300 },
        { id: 'closing', name: 'Cierre', duration: 180 }
      ],
      currentSectionIndex: 0,
      isActive: true
    }
    
    setDebateSession(session)
    setTimeLogs([])
    setIsConfiguring(true)
  }

  const addTeam = () => {
    if (!newTeamName.trim() || !debateSession) return
    
    const team: DebateTeam = {
      id: `team_${Date.now()}`,
      name: newTeamName.trim(),
      color: teamColors[debateSession.teams.length % teamColors.length],
      totalTime: 0,
      usedTime: 0,
      isActive: false,
      members: []
    }
    
    setDebateSession(prev => ({
      ...prev!,
      teams: [...prev!.teams, team]
    }))
    
    setNewTeamName('')
  }

  const removeTeam = (teamId: string) => {
    if (!debateSession) return
    
    setDebateSession(prev => ({
      ...prev!,
      teams: prev!.teams.filter(team => team.id !== teamId)
    }))
  }

  const addSection = () => {
    if (!newSectionName.trim() || !debateSession) return
    
    const section: DebateSection = {
      id: `section_${Date.now()}`,
      name: newSectionName.trim(),
      duration: newSectionDuration * 60 // convertir a segundos
    }
    
    setDebateSession(prev => ({
      ...prev!,
      sections: [...prev!.sections, section]
    }))
    
    setNewSectionName('')
    setNewSectionDuration(5)
  }

  const removeSection = (sectionId: string) => {
    if (!debateSession) return
    
    setDebateSession(prev => ({
      ...prev!,
      sections: prev!.sections.filter(section => section.id !== sectionId)
    }))
  }

  const nextSection = () => {
    if (!debateSession) return
    
    const nextIndex = debateSession.currentSectionIndex + 1
    if (nextIndex < debateSession.sections.length) {
      setDebateSession(prev => ({
        ...prev!,
        currentSectionIndex: nextIndex
      }))
      resetTimer()
    }
  }

  const previousSection = () => {
    if (!debateSession) return
    
    const prevIndex = debateSession.currentSectionIndex - 1
    if (prevIndex >= 0) {
      setDebateSession(prev => ({
        ...prev!,
        currentSectionIndex: prevIndex
      }))
      resetTimer()
    }
  }

  // Formatear tiempo
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Calcular tiempo restante
  const getRemainingTime = (teamId: string): number => {
    if (!debateSession) return 0
    
    const team = debateSession.teams.find(t => t.id === teamId)
    const currentSection = debateSession.sections[debateSession.currentSectionIndex]
    
    if (!team || !currentSection) return 0
    
    const remaining = currentSection.duration - team.usedTime
    return Math.max(0, remaining)
  }

  // Generar reporte
  const generateReport = async () => {
    if (!debateSession || timeLogs.length === 0) {
      alert('No hay datos para generar reporte')
      return
    }

    try {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Reporte de Debate')

      // Headers principales
      worksheet.addRow(['Reporte de Debate - ' + debateSession.name])
      worksheet.addRow([])
      
      // Resumen por equipos
      worksheet.addRow(['Resumen por Equipos'])
      const teamHeaders = ['Equipo', 'Tiempo Total Usado', 'Número de Intervenciones']
      worksheet.addRow(teamHeaders)

      debateSession.teams.forEach(team => {
        const teamLogs = timeLogs.filter(log => log.teamId === team.id)
        const totalTime = teamLogs.reduce((sum, log) => sum + log.duration, 0)
        
        worksheet.addRow([
          team.name,
          formatTime(totalTime),
          teamLogs.length
        ])
      })

      worksheet.addRow([])
      
      // Detalle por secciones
      worksheet.addRow(['Detalle por Secciones'])
      const detailHeaders = ['Sección', 'Equipo', 'Tiempo Usado', 'Hora Inicio', 'Hora Fin']
      worksheet.addRow(detailHeaders)

      timeLogs.forEach(log => {
        const team = debateSession.teams.find(t => t.id === log.teamId)
        const section = debateSession.sections.find(s => s.id === log.sectionId)
        
        worksheet.addRow([
          section?.name || 'Desconocido',
          team?.name || 'Desconocido',
          formatTime(log.duration),
          new Date(log.startTime).toLocaleTimeString(),
          log.endTime ? new Date(log.endTime).toLocaleTimeString() : 'En curso'
        ])
      })

      // Estilo
      worksheet.getRow(1).font = { bold: true, size: 14 }
      worksheet.getRow(3).font = { bold: true }
      worksheet.getRow(4).font = { bold: true }
      
      const teamHeaderRow = worksheet.getRow(4)
      teamHeaderRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE2E8F0' }
      }

      // Ajustar columnas
      worksheet.columns.forEach(column => {
        column.width = 20
      })

      // Generar archivo
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      })
      
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `debate_${debateSession.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`
      
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

  return (
    <div className="p-4 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Timer de Debates</h1>
        </div>
        
        {!debateSession ? (
          <Button onClick={createNewSession} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Debate
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => setIsConfiguring(!isConfiguring)} variant="outline">
              <Settings className="w-4 h-4" />
            </Button>
            <Button onClick={generateReport} variant="outline">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {!debateSession ? (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No hay debate activo
          </h2>
          <p className="text-gray-500 mb-4">
            Crea un nuevo debate para comenzar a gestionar los tiempos
          </p>
          <Button onClick={createNewSession} className="flex items-center gap-2 mx-auto">
            <Plus className="w-4 h-4" />
            Crear Nuevo Debate
          </Button>
        </div>
      ) : (
        <>
          {/* Panel de configuración */}
          {isConfiguring && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-4">Configuración del Debate</h3>
              
              {/* Agregar equipos */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Equipos</h4>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nombre del equipo"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded"
                    onKeyPress={(e) => e.key === 'Enter' && addTeam()}
                  />
                  <Button onClick={addTeam} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {debateSession.teams.map(team => (
                    <div 
                      key={team.id} 
                      className="flex items-center justify-between p-2 border rounded"
                      style={{ borderColor: team.color }}
                    >
                      <span className="text-sm" style={{ color: team.color }}>
                        {team.name}
                      </span>
                      <Button 
                        onClick={() => removeTeam(team.id)} 
                        size="sm" 
                        variant="ghost"
                        className="p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agregar secciones */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Secciones</h4>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nombre de la sección"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Minutos"
                    value={newSectionDuration}
                    onChange={(e) => setNewSectionDuration(parseInt(e.target.value) || 5)}
                    className="w-20 p-2 border border-gray-300 rounded"
                    min="1"
                    max="60"
                  />
                  <Button onClick={addSection} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {debateSession.sections.map((section, index) => (
                    <div key={section.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          index === debateSession.currentSectionIndex ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></span>
                        <span className="text-sm">
                          {section.name} ({formatTime(section.duration)})
                        </span>
                      </div>
                      <Button 
                        onClick={() => removeSection(section.id)} 
                        size="sm" 
                        variant="ghost"
                        className="p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={() => setIsConfiguring(false)} variant="outline">
                Terminar Configuración
              </Button>
            </div>
          )}

          {/* Sección actual */}
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button 
                onClick={previousSection} 
                variant="outline" 
                size="sm"
                disabled={debateSession.currentSectionIndex === 0}
              >
                ←
              </Button>
              
              <div className="bg-blue-50 px-6 py-3 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-800">
                  {debateSession.sections[debateSession.currentSectionIndex]?.name || 'Sin sección'}
                </h2>
                <p className="text-blue-600">
                  Duración: {formatTime(debateSession.sections[debateSession.currentSectionIndex]?.duration || 0)}
                </p>
              </div>
              
              <Button 
                onClick={nextSection} 
                variant="outline" 
                size="sm"
                disabled={debateSession.currentSectionIndex === debateSession.sections.length - 1}
              >
                →
              </Button>
            </div>
          </div>

          {/* Timer principal */}
          <div className="mb-6 text-center">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-4">
              {formatTime(currentTime)}
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                onClick={resetTimer} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              
              <Button 
                onClick={pauseTimer}
                disabled={!isRunning}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Pause className="w-4 h-4" />
                Pausar
              </Button>
            </div>
          </div>

          {/* Equipos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {debateSession.teams.map(team => {
              const remainingTime = getRemainingTime(team.id)
              const isActiveTeam = activeTeamId === team.id
              
              return (
                <div 
                  key={team.id} 
                  className={`p-4 border-2 rounded-lg ${
                    isActiveTeam ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold" style={{ color: team.color }}>
                      {team.name}
                    </h3>
                    <Trophy className="w-5 h-5" style={{ color: team.color }} />
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Tiempo usado:</span>
                      <span className="font-mono">{formatTime(team.usedTime)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tiempo restante:</span>
                      <span className={`font-mono ${remainingTime < 60 ? 'text-red-600' : ''}`}>
                        {formatTime(remainingTime)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: team.color,
                        width: `${Math.min(100, (team.usedTime / (debateSession.sections[debateSession.currentSectionIndex]?.duration || 1)) * 100)}%`
                      }}
                    ></div>
                  </div>
                  
                  <Button
                    onClick={() => isActiveTeam ? pauseTimer() : startTimer(team.id)}
                    disabled={isRunning && !isActiveTeam}
                    className={`w-full ${isActiveTeam ? 'bg-red-600 hover:bg-red-700' : ''}`}
                    style={!isActiveTeam ? { backgroundColor: team.color } : {}}
                  >
                    {isActiveTeam ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Iniciar
                      </>
                    )}
                  </Button>
                </div>
              )
            })}
          </div>

          {/* Resumen de actividad */}
          {timeLogs.length > 0 && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Resumen de Actividad</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{timeLogs.length}</p>
                  <p className="text-sm text-gray-600">Intervenciones</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {formatTime(timeLogs.reduce((sum, log) => sum + log.duration, 0))}
                  </p>
                  <p className="text-sm text-gray-600">Tiempo Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {new Set(timeLogs.map(log => log.teamId)).size}
                  </p>
                  <p className="text-sm text-gray-600">Equipos Activos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {debateSession.currentSectionIndex + 1}/{debateSession.sections.length}
                  </p>
                  <p className="text-sm text-gray-600">Secciones</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DebateTimerPlugin
