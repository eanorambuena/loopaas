import React, { useState, useRef, useEffect } from 'react'
import { usePermissions, PermissionError, Allow } from 'plugini'
import { QrCode, Users, CheckCircle, XCircle, Camera, Download, Settings, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import QrScanner from 'qr-scanner'
import { Html5Qrcode } from 'html5-qrcode'

// Interfaces para tipos
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

interface AttendanceRecord {
  id: string
  name: string
  email: string
  attended: boolean
}

export const id = 'ostrom-attendance'
export const permissions = ['getStudents', 'getCourses', 'supabaseAccess', 'camera']
export const metadata = {
  preferredWidth: 'large',
  name: 'Ostrom - Control de Asistencia QR',
  description: 'Sistema de control de asistencia con doble librería QR, escaneo continuo y feedback sonoro'
}

const OstromAttendanceComponent = (props: any) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [attendanceList, setAttendanceList] = useState<{[key: string]: boolean}>({})
  const [scannerActive, setScannerActive] = useState(false)
  const [scannedData, setScannedData] = useState<string>('')
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [cameraError, setCameraError] = useState<string>('')
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const [useHtml5Scanner, setUseHtml5Scanner] = useState(false)
  const [html5ScannerActive, setHtml5ScannerActive] = useState(false)
  const [lastScannedEmail, setLastScannedEmail] = useState<string>('')
  const [lastScanTime, setLastScanTime] = useState<number>(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const qrScannerRef = useRef<QrScanner | null>(null)
  const html5QrRef = useRef<Html5Qrcode | null>(null)

  // Función para agregar mensajes de debug
  const addDebugMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const fullMessage = `[${timestamp}] ${message}`
    console.log(fullMessage)
    setDebugInfo(prev => [...prev.slice(-4), fullMessage])
  }

  // Función para reproducir sonido de beep
  const playBeepSound = () => {
    if (!soundEnabled) return
    
    try {
      // Crear un AudioContext para generar un beep
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Configurar el sonido: frecuencia 800Hz, duración 200ms
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.type = 'sine'
      
      // Configurar volumen
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
      // Reproducir
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
      
      addDebugMessage('🔊 Sonido de beep reproducido')
    } catch (error) {
      console.warn('No se pudo reproducir el sonido:', error)
      addDebugMessage('🔇 Error reproduciendo sonido')
    }
  }

  // Cargar cursos
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        if (props.activePermissions && props.activePermissions.has('getCourses')) {
          const allPermissions = Allow.getAllPermissions()
          const coursesPermission = allPermissions.find(p => p.name === 'getCourses')
          
          if (coursesPermission?.func) {
            const coursesData = await coursesPermission.func()
            setCourses(coursesData || [])
          }
        } else {
          setCourses([])
        }
      } catch (error) {
        console.error('[OSTROM] Error loading courses:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [props.activePermissions])

  // Cargar estudiantes cuando se selecciona un curso
  useEffect(() => {
    const loadStudents = async () => {
      if (!selectedCourse) {
        setStudents([])
        return
      }

      if (!props.activePermissions || !props.activePermissions.has('getStudents')) {
        setStudents([])
        return
      }

      setLoading(true)
      try {
        const allPermissions = Allow.getAllPermissions()
        const studentsPermission = allPermissions.find(p => p.name === 'getStudents')
        
        if (studentsPermission?.func) {
          const studentsData = await studentsPermission.func(selectedCourse.id)
          setStudents(studentsData || [])
        }
      } catch (error) {
        console.error('[OSTROM] Error loading students:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [selectedCourse, props.activePermissions])

  // Limpiar escáner al desmontar
  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop()
        qrScannerRef.current.destroy()
      }
      if (html5QrRef.current) {
        html5QrRef.current.stop().catch(() => {})
        html5QrRef.current.clear()
      }
    }
  }, [])

  // Verificar permisos
  const hasStudentsPermission = props.activePermissions?.has('getStudents')
  const hasCoursesPermission = props.activePermissions?.has('getCourses')
  const hasSupabasePermission = props.activePermissions?.has('supabaseAccess')
  const hasCameraPermission = props.activePermissions?.has('camera')

  if (!hasStudentsPermission || !hasCoursesPermission || !hasSupabasePermission || !hasCameraPermission) {
    const missingPermissions = []
    if (!hasStudentsPermission) missingPermissions.push('getStudents')
    if (!hasCoursesPermission) missingPermissions.push('getCourses')
    if (!hasSupabasePermission) missingPermissions.push('supabaseAccess')
    if (!hasCameraPermission) missingPermissions.push('camera')
    
    return (
      <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
        <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-2">
          ⚠️ Permisos insuficientes
        </h3>
        <p className="text-orange-700 dark:text-orange-300">
          Este plugin requiere los permisos: {missingPermissions.join(', ')}
        </p>
        <ul className="text-sm text-orange-600 dark:text-orange-400 ml-4 list-disc mt-2">
          <li><strong>getStudents:</strong> Ver lista de estudiantes del curso</li>
          <li><strong>getCourses:</strong> Acceder a los cursos disponibles</li>
          <li><strong>supabaseAccess:</strong> Guardar asistencia</li>
          <li><strong>camera:</strong> Acceder a la cámara para escanear QR</li>
        </ul>
      </div>
    )
  }

  // QrScanner functions
  const startQrScanner = async () => {
    addDebugMessage('🚀 Iniciando QrScanner...')
    setScannerActive(true)
    setCameraError('')

    await new Promise(resolve => setTimeout(resolve, 100))
    
    if (!videoRef.current) {
      addDebugMessage('❌ Video element no encontrado')
      setCameraError('Error: Video element no encontrado')
      setScannerActive(false)
      return
    }

    try {
      if (!props.activePermissions || !props.activePermissions.has('camera')) {
        throw new Error('Permiso de cámara no otorgado')
      }

      const allPermissions = Allow.getAllPermissions()
      const cameraPermission = allPermissions.find(p => p.name === 'camera')
      
      if (cameraPermission) {
        await cameraPermission.func()
      }

      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          addDebugMessage(`🎯 QR detectado: ${result.data}`)
          processScannedEmail(result.data)
          // NO detenemos el scanner, permitimos escaneo continuo
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment',
          maxScansPerSecond: 2, // Reducimos para evitar spam
          returnDetailedScanResult: true
        }
      )
      
      await qrScannerRef.current.start()
      addDebugMessage('✅ QrScanner iniciado exitosamente')
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
      addDebugMessage(`💥 Error: ${errorMsg}`)
      setCameraError(errorMsg)
      setScannerActive(false)
    }
  }

  const stopQrScanner = () => {
    addDebugMessage('🛑 Deteniendo QrScanner...')
    if (qrScannerRef.current) {
      qrScannerRef.current.stop()
      qrScannerRef.current.destroy()
      qrScannerRef.current = null
    }
    setScannerActive(false)
  }

  // Html5Qrcode functions
  const startHtml5Scanner = async () => {
    addDebugMessage('🚀 Iniciando Html5Qrcode...')
    setHtml5ScannerActive(true)
    setCameraError('')

    try {
      if (!props.activePermissions || !props.activePermissions.has('camera')) {
        throw new Error('Permiso de cámara no otorgado')
      }

      html5QrRef.current = new Html5Qrcode('html5-qrcode-scanner')

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }

      await html5QrRef.current.start(
        { facingMode: 'environment' },
        config,
        (qrCodeMessage) => {
          addDebugMessage(`🎯 QR detectado con Html5Qrcode: ${qrCodeMessage}`)
          processScannedEmail(qrCodeMessage)
          // NO detenemos el scanner, permitimos escaneo continuo
        },
        () => {
          // Error silenciado - normal cuando no hay QR
        }
      )

      addDebugMessage('✅ Html5Qrcode iniciado exitosamente')

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
      addDebugMessage(`💥 Error Html5Qrcode: ${errorMsg}`)
      setCameraError(errorMsg)
      setHtml5ScannerActive(false)
    }
  }

  const stopHtml5Scanner = async () => {
    addDebugMessage('🛑 Deteniendo Html5Qrcode...')
    
    if (html5QrRef.current) {
      try {
        await html5QrRef.current.stop()
        html5QrRef.current.clear()
        html5QrRef.current = null
      } catch (error) {
        // Error silenciado
      }
    }
    
    setHtml5ScannerActive(false)
  }

  // Process scanned email
  const processScannedEmail = async (email: string) => {
    const currentTime = Date.now()
    const timeSinceLastScan = currentTime - lastScanTime
    
    // Debounce: evitar procesar el mismo email en menos de 2 segundos
    if (email === lastScannedEmail && timeSinceLastScan < 2000) {
      addDebugMessage(`⏱️ Ignorando scan duplicado de: ${email} (${timeSinceLastScan}ms desde el último)`)
      return
    }
    
    setLastScannedEmail(email)
    setLastScanTime(currentTime)
    
    addDebugMessage(`📧 Procesando email: ${email}`)
    
    const student = students.find((s: Student) => s.email.toLowerCase() === email.toLowerCase())
    
    if (student) {
      // Verificar si ya está marcado como presente
      if (attendanceList[student.id] === true) {
        addDebugMessage(`ℹ️ ${student.name} ya está marcado como presente`)
        playBeepSound() // Sonido incluso para duplicados
        alert(`ℹ️ ${student.name} ya está presente`)
        return
      }
      
      addDebugMessage(`✅ Estudiante encontrado: ${student.name}`)
      await markAttendance(student.id, true)
      playBeepSound() // Sonido de éxito
      alert(`✅ Asistencia registrada para: ${student.name}`)
    } else {
      addDebugMessage(`❌ Estudiante no encontrado: ${email}`)
      alert(`❌ Email ${email} no encontrado en el curso`)
    }
  }

  // Mark attendance
  const markAttendance = async (studentId: string, present: boolean) => {
    setAttendanceList(prev => ({
      ...prev,
      [studentId]: present
    }))
    
    // Guardar en localStorage
    try {
      const today = new Date().toISOString().split('T')[0]
      const records = JSON.parse(localStorage.getItem('attendance_records') || '[]')
      
      records.push({
        courseId: selectedCourse?.id,
        studentId,
        present,
        date: today,
        timestamp: new Date().toISOString()
      })
      
      localStorage.setItem('attendance_records', JSON.stringify(records))
      addDebugMessage('💾 Asistencia guardada en localStorage')
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      <div className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950 p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2 flex items-center gap-2">
          <QrCode size={20} className="sm:w-6 sm:h-6" />
          <span className="truncate">Control de Asistencia QR</span>
        </h2>
        <p className="text-emerald-700 dark:text-emerald-300 text-sm">
          Escanea códigos QR de estudiantes para marcar asistencia. Con doble librería, escaneo continuo y feedback sonoro.
        </p>
      </div>

      {/* Debug Panel */}
      {debugInfo.length > 0 && (
        <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
          <h4 className="text-white mb-2 font-bold">🔍 Debug Info:</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {debugInfo.map((msg, idx) => (
              <div key={idx} className="break-all">{msg}</div>
            ))}
          </div>
        </div>
      )}

      {/* Course selection */}
      <div className="w-full">
        <label className="block text-sm font-medium mb-2">Seleccionar Curso</label>
        <select 
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm sm:text-base"
          value={selectedCourse?.id || ''}
          onChange={(e) => {
            if (!e.target.value) {
              setSelectedCourse(null)
              return
            }
            
            const foundCourse = courses.find((course: Course) => course.id === e.target.value)
            setSelectedCourse(foundCourse || null)
            setAttendanceList({})
            // Limpiar debounce al cambiar de curso
            setLastScannedEmail('')
            setLastScanTime(0)
          }}
          disabled={loading}
        >
          <option value="">
            {loading ? '-- Cargando cursos...' : '-- Seleccionar curso --'}
          </option>
          {courses.map((course: Course) => (
            <option key={course.id} value={course.id}>
              {course.name} - {course.organizacion}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <>
          {/* Scanner controls */}
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 w-full">
            <h3 className="font-semibold mb-3 text-sm sm:text-base">Scanner QR</h3>
            
            {/* Method selector - Toggle Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 p-3 sm:p-4 rounded-lg mb-4 border border-emerald-200 dark:border-emerald-800">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm sm:text-base">
                  <QrCode size={16} className="sm:w-5 sm:h-5" />
                  <span className="truncate">Librería de Scanner</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {useHtml5Scanner ? 'Html5Qrcode (Alternativa)' : 'QrScanner (Por defecto)'}
                </p>
              </div>
              
              {/* Toggle Switch */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs sm:text-sm font-medium transition-colors ${!useHtml5Scanner ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  QrScanner
                </span>
                
                <button
                  onClick={() => {
                    const newValue = !useHtml5Scanner
                    setUseHtml5Scanner(newValue)
                    addDebugMessage(`📦 Cambiado a ${newValue ? 'Html5Qrcode' : 'QrScanner'}`)
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                    useHtml5Scanner ? 'bg-blue-600' : 'bg-emerald-600'
                  }`}
                  role="switch"
                  aria-checked={useHtml5Scanner}
                >
                  <span className="sr-only">Cambiar método de scanner</span>
                  <span
                    className={`${
                      useHtml5Scanner ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </button>
                
                <span className={`text-xs sm:text-sm font-medium transition-colors ${useHtml5Scanner ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  Html5Qrcode
                </span>
              </div>
            </div>

            {/* Sound toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 p-3 sm:p-4 rounded-lg mb-4 border border-yellow-200 dark:border-yellow-800">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm sm:text-base">
                  {soundEnabled ? <Volume2 size={16} className="sm:w-5 sm:h-5" /> : <VolumeX size={16} className="sm:w-5 sm:h-5" />}
                  <span className="truncate">Sonido de Feedback</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {soundEnabled ? 'Beep activado en cada escaneo' : 'Sonido desactivado'}
                </p>
              </div>
              
              {/* Sound Toggle Switch */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs sm:text-sm font-medium transition-colors ${!soundEnabled ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  Silencioso
                </span>
                
                <button
                  onClick={() => {
                    const newValue = !soundEnabled
                    setSoundEnabled(newValue)
                    addDebugMessage(`🔊 Sonido ${newValue ? 'activado' : 'desactivado'}`)
                    if (newValue) {
                      // Reproducir sonido de prueba cuando se activa
                      setTimeout(playBeepSound, 100)
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                    soundEnabled ? 'bg-orange-600' : 'bg-gray-400'
                  }`}
                  role="switch"
                  aria-checked={soundEnabled}
                >
                  <span className="sr-only">Activar sonido de feedback</span>
                  <span
                    className={`${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </button>
                
                <span className={`text-xs sm:text-sm font-medium transition-colors ${soundEnabled ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  Con Beep
                </span>
              </div>
            </div>

            {/* Info text about scanner methods */}
            <div className="mb-4 p-2 sm:p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-1 sm:mt-2 flex-shrink-0"></div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {useHtml5Scanner ? (
                    <>
                      <strong className="text-blue-600 dark:text-blue-400">Html5Qrcode:</strong> Mayor compatibilidad con navegadores móviles y dispositivos más antiguos.
                    </>
                  ) : (
                    <>
                      <strong className="text-emerald-600 dark:text-emerald-400">QrScanner:</strong> Opción por defecto con mejor rendimiento en navegadores modernos.
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Scanner controls */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              {!useHtml5Scanner ? (
                <>
                  {!scannerActive ? (
                    <Button onClick={startQrScanner} className="flex items-center justify-center gap-2 w-full sm:w-auto text-sm">
                      <Camera size={16} />
                      <span className="truncate">Iniciar cámara QR</span>
                    </Button>
                  ) : (
                    <Button onClick={stopQrScanner} variant="outline" className="w-full sm:w-auto text-sm">
                      Detener cámara
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {!html5ScannerActive ? (
                    <Button onClick={startHtml5Scanner} className="flex items-center justify-center gap-2 w-full sm:w-auto text-sm">
                      <Camera size={16} />
                      <span className="truncate">Iniciar Html5 Scanner</span>
                    </Button>
                  ) : (
                    <Button onClick={stopHtml5Scanner} variant="outline" className="w-full sm:w-auto text-sm">
                      Detener Html5 Scanner
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Scanner area */}
            <div className="space-y-4 w-full">
              {/* QrScanner video */}
              {!useHtml5Scanner && (
                <div className={scannerActive ? 'block' : 'hidden'}>
                  <video 
                    ref={videoRef}
                    className="w-full max-w-sm sm:max-w-md mx-auto rounded-lg bg-black border-2 border-emerald-500"
                    playsInline
                    muted
                    autoPlay
                    style={{ 
                      height: '250px',
                      objectFit: 'cover'
                    }}
                  />
                  {scannerActive && !cameraError && (
                    <div className="text-center mt-2">
                      <p className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium">
                        📱 Cámara activa - Escaneo continuo de códigos QR
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Enfoca cualquier código QR para registrar asistencia
                        {soundEnabled && ' 🔊'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Html5Qrcode scanner */}
              {useHtml5Scanner && (
                <div className={html5ScannerActive ? 'block' : 'hidden'}>
                  <div 
                    id="html5-qrcode-scanner" 
                    className="w-full max-w-sm sm:max-w-md mx-auto rounded-lg overflow-hidden border-2 border-emerald-500"
                    style={{ minHeight: '200px' }}
                  />
                  {html5ScannerActive && !cameraError && (
                    <div className="text-center mt-2">
                      <p className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium">
                        📱 Html5Qrcode activo - Escaneo continuo de códigos QR
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Enfoca cualquier código QR para registrar asistencia
                        {soundEnabled && ' 🔊'}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Inactive message */}
              {!scannerActive && !html5ScannerActive && !cameraError && (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-8 rounded-lg text-center">
                  <Camera size={32} className="sm:w-12 sm:h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Presiona &quot;Iniciar cámara&quot; para comenzar el escaneo continuo
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Método: {useHtml5Scanner ? 'Html5Qrcode' : 'QrScanner'}
                  </p>
                </div>
              )}

              {/* Error message */}
              {cameraError && (
                <div className="bg-red-100 dark:bg-red-950 p-3 sm:p-4 rounded-lg text-center">
                  <XCircle size={32} className="sm:w-12 sm:h-12 mx-auto mb-4 text-red-500" />
                  <p className="text-red-700 dark:text-red-300 font-medium mb-2 text-sm sm:text-base">Error de cámara</p>
                  <p className="text-red-600 dark:text-red-400 text-xs sm:text-sm break-words">{cameraError}</p>
                  <Button 
                    onClick={() => {
                      setCameraError('')
                      setUseHtml5Scanner(!useHtml5Scanner) // Cambiar método automáticamente
                    }} 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 text-xs sm:text-sm"
                  >
                    Probar otro método
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Students list */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Users size={20} />
                Estudiantes del curso ({students.length})
                {loading && <span className="text-sm text-gray-500">(Cargando...)</span>}
              </h4>
            </div>

            {students.length === 0 ? (
              <div className="text-center py-8">
                <Users size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  {selectedCourse ? 'No hay estudiantes en este curso' : 'Selecciona un curso'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {students.map((student: Student) => {
                  const isPresent = attendanceList[student.id]
                  return (
                    <div 
                      key={student.id}
                      className="border rounded-lg bg-white dark:bg-gray-800 p-3 space-y-3"
                    >
                      {/* Student info */}
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{student.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{student.email}</p>
                      </div>
                      
                      {/* Buttons - Stack on mobile */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          variant={isPresent === true ? 'default' : 'outline'}
                          onClick={() => markAttendance(student.id, true)}
                          className={`flex-1 flex items-center justify-center gap-2 ${isPresent === true ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        >
                          <CheckCircle size={16} />
                          <span className="text-xs sm:text-sm">Presente</span>
                        </Button>
                        <Button
                          size="sm"
                          variant={isPresent === false ? 'default' : 'outline'}
                          onClick={() => markAttendance(student.id, false)}
                          className={`flex-1 flex items-center justify-center gap-2 ${isPresent === false ? 'bg-red-600 hover:bg-red-700' : ''}`}
                        >
                          <XCircle size={16} />
                          <span className="text-xs sm:text-sm">Ausente</span>
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            
            {/* Attendance summary */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {Object.values(attendanceList).filter(v => v === true).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Presentes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {Object.values(attendanceList).filter(v => v === false).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ausentes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                    {students.length - Object.keys(attendanceList).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sin marcar</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export { OstromAttendanceComponent as component }
