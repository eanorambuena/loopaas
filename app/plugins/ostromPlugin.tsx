import React, { useState, useRef, useEffect } from 'react'
import { usePermissions, PermissionError, Allow } from 'plugini'
import { QrCode, Users, CheckCircle, XCircle, Camera, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import QrScanner from 'qr-scanner'

// Interfaces para tipos
interface Student {
  id: string // UUID
  name: string
  email: string
  grade: number
  active: boolean
}

interface Course {
  id: string // UUID
  name: string
  organizacion: string
}

interface AttendanceRecord {
  id: string // UUID
  name: string
  email: string
  attended: boolean
}

export const id = 'ostrom-attendance'
export const permissions = ['getStudents', 'getCourses', 'supabaseAccess', 'camera']
export const metadata = {
  preferredWidth: 'large',
  name: 'Ostrom - Control de Asistencia QR',
  description: 'Sistema completo de control de asistencia usando códigos QR con cámara real'
}

// Componente principal del plugin
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const qrScannerRef = useRef<QrScanner | null>(null)

  // Función para agregar mensajes de debug
  const addDebugMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const fullMessage = `[${timestamp}] ${message}`
    console.log(fullMessage)
    setDebugInfo(prev => [...prev.slice(-4), fullMessage]) // Mantener solo los últimos 5 mensajes
  }

  // Debug: Monitorear cambios en el estado del scanner
  useEffect(() => {
    addDebugMessage(`🔄 Scanner state changed: active=${scannerActive}`)
    if (scannerActive) {
      addDebugMessage(`📹 Video ref available: ${!!videoRef.current}`)
    }
  }, [scannerActive])

  // Debug: Monitorear errores de cámara
  useEffect(() => {
    if (cameraError) {
      addDebugMessage(`🚨 Camera error: ${cameraError}`)
    }
  }, [cameraError])

  // Obtener datos de permisos usando useEffect
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Solo cargar cursos si el permiso getCourses está activo
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
  }, [props.activePermissions]) // Dependencia en permisos activos

  // Cargar estudiantes cuando se selecciona un curso
  useEffect(() => {
    const loadStudents = async () => {
      if (!selectedCourse) {
        setStudents([])
        return
      }

      // Solo cargar estudiantes si el permiso getStudents está activo
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
  }, [selectedCourse, props.activePermissions]) // Dependencia en permisos activos

  // Limpiar escáner al desmontar el componente
  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop()
        qrScannerRef.current.destroy()
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
        <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
          <strong>Descripción de permisos:</strong>
        </p>
        <ul className="text-sm text-orange-600 dark:text-orange-400 ml-4 list-disc">
          <li><strong>getStudents:</strong> Ver lista de estudiantes del curso</li>
          <li><strong>getCourses:</strong> Acceder a los cursos disponibles</li>
          <li><strong>supabaseAccess:</strong> Guardar asistencia en localStorage (modo desarrollo)</li>
          <li><strong>camera:</strong> Acceder a la cámara para escanear códigos QR</li>
        </ul>
        <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
          Permisos activos: {props.activePermissions ? Array.from(props.activePermissions).join(', ') : 'ninguno'}
        </p>
      </div>
    )
  }

  // Obtener acceso a Supabase
  const allPermissions = Allow.getAllPermissions()
  const supabasePermission = allPermissions.find(p => p.name === 'supabaseAccess')
  const dbAccess = supabasePermission?.func?.() || {}

    // Funciones del escáner QR
  const startScanner = async () => {
    addDebugMessage('🚀 Iniciando escáner QR...')
    
    // Esperar un momento para que el DOM se actualice
    await new Promise(resolve => setTimeout(resolve, 100))
    
    if (!videoRef.current) {
      addDebugMessage('❌ Error: Elemento de video no encontrado')
      addDebugMessage(`📊 Video ref status: ${videoRef.current}`)
      addDebugMessage(`📊 Scanner active: ${scannerActive}`)
      setCameraError('Error: Elemento de video no encontrado. Intenta refrescar la página.')
      setScannerActive(false)
      return
    }
    
    addDebugMessage('✅ Elemento de video encontrado')
    addDebugMessage(`📊 Video element: ${videoRef.current.tagName} - Ready state: ${videoRef.current.readyState}`)
    
    setCameraError('')
    
    addDebugMessage('📱 Estado del escáner: activo')
    
    try {
      // Verificar protocolo
      addDebugMessage(`🔒 Protocolo: ${location.protocol} - Host: ${location.hostname}`)
      
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        throw new Error('Se requiere HTTPS para usar la cámara en dispositivos móviles')
      }

      // Verificar permisos activos
      const activePerms = props.activePermissions ? Array.from(props.activePermissions) : []
      addDebugMessage(`🔑 Permisos activos: ${activePerms.join(', ')}`)
      
      if (!props.activePermissions || !props.activePermissions.has('camera')) {
        throw new Error('Permiso de cámara no otorgado. Activa el permiso "camera" primero.')
      }

      // Obtener permisos del sistema
      const allPermissions = Allow.getAllPermissions()
      addDebugMessage(`📋 Permisos registrados: ${allPermissions.map(p => p.name).join(', ')}`)
      
      const cameraPermission = allPermissions.find(p => p.name === 'camera')
      
      if (!cameraPermission) {
        throw new Error('Permiso de cámara no registrado en el sistema')
      }
      
      addDebugMessage('📷 Solicitando acceso a cámara...')
      const cameraAccess = await cameraPermission.func()
      addDebugMessage('✅ Acceso a cámara obtenido')
      
      // Verificar QrScanner
      if (typeof QrScanner === 'undefined') {
        throw new Error('QrScanner library no está disponible')
      }
      
      addDebugMessage('📦 Creando instancia de QrScanner...')
      
      // Crear instancia del escáner QR
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          addDebugMessage(`🎯 QR detectado: ${result.data}`)
          processScannedEmail(result.data)
          stopScanner()
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment',
          maxScansPerSecond: 5,
          calculateScanRegion: (video) => {
            const smallerDimension = Math.min(video.videoWidth, video.videoHeight)
            const regionSize = Math.round(0.7 * smallerDimension)
            
            return {
              x: Math.round((video.videoWidth - regionSize) / 2),
              y: Math.round((video.videoHeight - regionSize) / 2),
              width: regionSize,
              height: regionSize,
            }
          }
        }
      )
      
      addDebugMessage('🎬 Iniciando QrScanner...')
      await qrScannerRef.current.start()
      addDebugMessage('✅ QrScanner iniciado exitosamente')
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
      addDebugMessage(`💥 Error: ${errorMsg}`)
      
      let userErrorMessage = 'Error desconocido'
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          userErrorMessage = 'Acceso a cámara denegado. Por favor permite el acceso a la cámara en tu navegador.'
        } else if (error.name === 'NotFoundError') {
          userErrorMessage = 'No se encontró ninguna cámara en tu dispositivo.'
        } else if (error.name === 'NotSupportedError') {
          userErrorMessage = 'Tu navegador no soporta acceso a cámara.'
        } else if (error.name === 'SecurityError') {
          userErrorMessage = 'Error de seguridad. Asegúrate de estar usando HTTPS.'
        } else {
          userErrorMessage = error.message
        }
      }
      
      setCameraError(userErrorMessage)
      setScannerActive(false)
    }
  }

  const stopScanner = () => {
    console.log('[QR DEBUG] 🛑 stopScanner called')
    if (qrScannerRef.current) {
      console.log('[QR DEBUG] 🛑 Stopping and destroying QrScanner...')
      qrScannerRef.current.stop()
      qrScannerRef.current.destroy()
      qrScannerRef.current = null
      console.log('[QR DEBUG] ✅ QrScanner stopped and destroyed')
    }
    setScannerActive(false)
    console.log('[QR DEBUG] ✅ Scanner state set to inactive')
  }

  // Simular escaneo de QR con email (para testing)
  const simulateQRScan = async () => {
    console.log('[QR DEBUG] 🎯 simulateQRScan called')
    console.log('[QR DEBUG] 📊 Students count:', students.length)
    
    if (students.length === 0) {
      console.log('[QR DEBUG] ❌ No students available for simulation')
      return
    }
    
    // Simular escaneo de un email aleatorio
    const randomStudent = students[Math.floor(Math.random() * students.length)]
    const scannedEmail = randomStudent.email
    
    console.log('[QR DEBUG] 🎲 Simulated scan for:', scannedEmail)
    setScannedData(scannedEmail)
    await processScannedEmail(scannedEmail)
  }

  // Procesar email escaneado y comparar con estudiantes
  const processScannedEmail = async (email: string) => {
    console.log('[QR DEBUG] 📧 processScannedEmail called with:', email)
    console.log('[QR DEBUG] 👥 Available students:', students.map(s => ({ name: s.name, email: s.email })))
    
    const student = students.find((s: Student) => s.email.toLowerCase() === email.toLowerCase())
    
    if (student) {
      console.log('[QR DEBUG] ✅ Student found:', student)
      await markAttendance(student.id, true)
      // Mostrar notificación de éxito
      setTimeout(() => {
        alert(`✅ Asistencia registrada para: ${student.name}`)
      }, 100)
    } else {
      console.log('[QR DEBUG] ❌ Student not found for email:', email)
      // Mostrar error si el email no está en la lista
      setTimeout(() => {
        alert(`❌ Email ${email} no encontrado en la lista de estudiantes del curso`)
      }, 100)
    }
  }

  // Función para input manual de email (para testing)
  const handleManualEmailInput = async (email: string) => {
    console.log('[QR DEBUG] ✍️ handleManualEmailInput called with:', email)
    if (email.trim()) {
      await processScannedEmail(email.trim())
    } else {
      console.log('[QR DEBUG] ❌ Empty email provided')
    }
  }

  // Marcar asistencia y guardar en localStorage
  const markAttendance = async (studentId: string, present: boolean) => {
    setAttendanceList(prev => ({
      ...prev,
      [studentId]: present
    }))
    
    // Guardar en localStorage si hay acceso y curso seleccionado
    if (dbAccess.saveAttendance && selectedCourse) {
      try {
        const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
        const result = await dbAccess.saveAttendance(
          selectedCourse.id,
          studentId,
          present,
          today
        )
        
        if (!result.success) {
          // Mostrar notificación de error
          setTimeout(() => {
            alert(`⚠️ Error al guardar en localStorage: ${result.error}`)
          }, 100)
        }
      } catch (error) {
        console.error('Error saving attendance:', error)
      }
    }
  }

  // Generar reporte de asistencia
  const generateReport = () => {
    const report: AttendanceRecord[] = students.map((student: Student) => ({
      ...student,
      attended: attendanceList[student.id] || false
    }))
    
    const csvContent = [
      ['ID', 'Nombre', 'Email', 'Asistió'],
      ...report.map((s: AttendanceRecord) => [s.id, s.name, s.email, s.attended ? 'Sí' : 'No'])
    ].map(row => row.join(',')).join('\\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `asistencia_${selectedCourse?.name || 'curso'}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
        <QrCode className="text-emerald-600 dark:text-emerald-400" size={24} />
        <div>
          <h3 className="font-bold text-emerald-800 dark:text-emerald-200">
            Ostrom - Control de Asistencia QR (Producción)
          </h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Sistema de asistencia con cámara real y datos reales - Guardado en localStorage
          </p>
        </div>
        {loading && (
          <div className="ml-auto">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
          </div>
        )}
      </div>

      {/* Selector de curso */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Seleccionar curso real:
        </label>
        
        {!props.activePermissions || !props.activePermissions.has('getCourses') ? (
          <div className="w-full p-4 border border-orange-300 rounded-md bg-orange-50 dark:bg-orange-950">
            <p className="text-orange-700 dark:text-orange-300 text-sm">
              ⚠️ Necesita el permiso <strong>getCourses</strong> para ver los cursos disponibles
            </p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              Habilite el permiso en la sección de gestión de permisos arriba
            </p>
          </div>
        ) : (
          <>
            <select 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={selectedCourse?.id || ''}
              onChange={(e) => {
                if (!e.target.value) {
                  setSelectedCourse(null)
                  setAttendanceList({})
                  return
                }
                
                const courseId = e.target.value // Mantener como string para UUIDs
                
                // Buscar curso comparando strings directamente
                const foundCourse = courses.find((course: Course) => {
                  return String(course.id) === String(courseId)
                })
                
                setSelectedCourse(foundCourse || null)
                setAttendanceList({}) // Limpiar asistencia al cambiar curso
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
            {courses.length === 0 && !loading && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No se encontraron cursos. Verifica tu conexión a Supabase y que tengas cursos registrados.
              </p>
            )}
          </>
        )}
      </div>

      {selectedCourse && (
        <>
          {/* Panel de Debug */}
          {debugInfo.length > 0 && (
            <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-3 bg-blue-50 dark:bg-blue-950">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-1">
                  🐛 Debug QR Scanner
                </h4>
                <Button 
                  onClick={() => setDebugInfo([])}
                  size="sm"
                  variant="outline"
                  className="text-xs px-2 py-1"
                >
                  Limpiar
                </Button>
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1 max-h-24 overflow-y-auto font-mono">
                {debugInfo.map((msg, idx) => (
                  <div key={idx} className="break-words">{msg}</div>
                ))}
              </div>
            </div>
          )}

          {/* Scanner QR */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Camera size={20} />
                Escáner QR con Cámara Real
              </h4>
              <div className="flex gap-2">
                <Button 
                  onClick={startScanner}
                  disabled={scannerActive}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {scannerActive ? 'Escáner activo' : 'Activar escáner'}
                </Button>
                {scannerActive && (
                  <Button 
                    onClick={stopScanner}
                    variant="outline"
                    size="sm"
                  >
                    Detener
                  </Button>
                )}
              </div>
            </div>
            
            {/* Área del escáner QR */}
            <div className="space-y-4">
              {/* Video element - siempre presente pero oculto cuando no está activo */}
              <div className={`relative ${scannerActive && !cameraError ? 'block' : 'hidden'}`}>
                <video 
                  ref={videoRef}
                  className="w-full max-w-md mx-auto rounded-lg bg-black aspect-square object-cover"
                  playsInline
                  muted
                  autoPlay
                  style={{ 
                    maxHeight: '80vh', // Limitar altura en móvil
                    minHeight: '250px' // Altura mínima para QR
                  }}
                />
                
                {/* Overlay de guía para QR */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-2 border-emerald-500 bg-emerald-500/10 rounded-lg w-3/4 max-w-[200px] aspect-square flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-2 border-2 border-emerald-400 rounded"></div>
                      <p className="text-emerald-100 text-xs font-medium px-2">
                        Enfoca el QR aquí
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Esquinas del marco de escaneo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-3/4 max-w-[200px] aspect-square">
                    {/* Esquina superior izquierda */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-3 border-t-3 border-emerald-400"></div>
                    {/* Esquina superior derecha */}
                    <div className="absolute top-0 right-0 w-6 h-6 border-r-3 border-t-3 border-emerald-400"></div>
                    {/* Esquina inferior izquierda */}
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-l-3 border-b-3 border-emerald-400"></div>
                    {/* Esquina inferior derecha */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-r-3 border-b-3 border-emerald-400"></div>
                  </div>
                </div>
              </div>

              {/* Mensaje de error */}
              {cameraError && (
                <div className="bg-red-100 dark:bg-red-950 p-4 rounded-lg text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-4xl">📷</div>
                    <div>
                      <p className="text-red-800 dark:text-red-200 font-medium mb-2">
                        ❌ Error de cámara
                      </p>
                      <p className="text-red-600 dark:text-red-400 text-sm mb-3">
                        {cameraError}
                      </p>
                      
                      {/* Consejos específicos para móvil */}
                      <div className="text-left bg-red-50 dark:bg-red-900 p-3 rounded text-xs">
                        <p className="font-medium text-red-700 dark:text-red-300 mb-2">� Soluciones comunes:</p>
                        <ul className="text-red-600 dark:text-red-400 space-y-1 list-disc list-inside">
                          <li>Permite acceso a la cámara en tu navegador</li>
                          <li>En móvil: usa Chrome, Firefox o Safari</li>
                          <li>Verifica que tengas una cámara funcional</li>
                          <li>En algunos casos, recarga la página</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap justify-center">
                      <Button 
                        onClick={() => {setCameraError(''); setScannerActive(false)}}
                        size="sm"
                        variant="outline"
                      >
                        Cerrar
                      </Button>
                      <Button 
                        onClick={() => {setCameraError(''); startScanner()}}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Reintentar
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Estado del escáner */}
              {scannerActive && !cameraError && (
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    📱 Escáner QR activo con cámara real
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-500 space-y-1">
                    <p>Los estudiantes deben mostrar su QR con email institucional</p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded text-xs">
                      <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">📋 Instrucciones móvil:</p>
                      <ul className="text-blue-600 dark:text-blue-400 list-disc list-inside space-y-0.5">
                        <li>Mantén el dispositivo estable</li>
                        <li>Asegúrate de tener buena iluminación</li>
                        <li>El QR debe ocupar el área marcada</li>
                        <li>Espera a que se enfoque automáticamente</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Estado inactivo */}
              {!scannerActive && !cameraError && (
                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
                  <QrCode size={64} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-500">
                    Haz clic en &quot;Activar escáner&quot; para comenzar
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Los estudiantes deben mostrar su QR con su email institucional
                  </p>
                </div>
              )}
              
              {/* Botón de simulación como fallback */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="text-center space-y-2">
                  <Button 
                    onClick={simulateQRScan}
                    size="sm"
                    variant="outline"
                    className="mx-auto"
                  >
                    🎯 Simular escaneo (para testing)
                  </Button>
                  <p className="text-xs text-gray-500">
                    (Solo para pruebas - el escáner real funciona con la cámara)
                  </p>
                </div>
              </div>
            </div>
            
            {scannedData && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <p className="text-green-800 dark:text-green-200 text-sm">
                  ✅ Último email escaneado: <strong>{scannedData}</strong>
                </p>
              </div>
            )}

            {/* Input manual para testing */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                🧪 Test manual (simular QR):
              </label>
              <div className="flex gap-2">
                <input 
                  type="email"
                  placeholder="Ingresa email del estudiante..."
                  className="flex-1 p-2 text-sm border border-blue-200 dark:border-blue-700 rounded bg-white dark:bg-gray-800"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleManualEmailInput((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = ''
                    }
                  }}
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    const input = document.querySelector('input[type="email"]') as HTMLInputElement
                    if (input) {
                      handleManualEmailInput(input.value)
                      input.value = ''
                    }
                  }}
                >
                  Procesar
                </Button>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Emails disponibles: {students.slice(0, 3).map(s => s.email).join(', ')}...
              </p>
            </div>
          </div>

          {/* Lista de estudiantes */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Users size={20} />
                Estudiantes del curso ({students.length})
                {loading && <span className="text-sm text-gray-500">(Cargando...)</span>}
              </h4>
              <Button 
                onClick={generateReport}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                disabled={students.length === 0}
              >
                <Download size={16} />
                Exportar CSV
              </Button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Cargando estudiantes...</p>
              </div>
            ) : !props.activePermissions || !props.activePermissions.has('getStudents') ? (
              <div className="text-center py-8">
                <Users size={48} className="mx-auto mb-4 text-gray-400" />
                <div className="p-4 border border-orange-300 rounded-md bg-orange-50 dark:bg-orange-950">
                  <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">
                    ⚠️ Necesita el permiso <strong>getStudents</strong> para ver los estudiantes
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    Habilite el permiso en la sección de gestión de permisos arriba
                  </p>
                </div>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-8">
                <Users size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">
                  {selectedCourse ? 'No hay estudiantes registrados en este curso' : 'Selecciona un curso para ver los estudiantes'}
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {students.map((student: Student) => {
                  const isPresent = attendanceList[student.id]
                  return (
                    <div 
                      key={student.id}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {student.name || 'Nombre no disponible'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {student.email || 'Email no disponible'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={isPresent === true ? 'default' : 'outline'}
                          onClick={() => markAttendance(student.id, true)}
                          className={isPresent === true ? 'bg-green-600 hover:bg-green-700' : ''}
                        >
                          <CheckCircle size={16} />
                          Presente
                        </Button>
                        <Button
                          size="sm"
                          variant={isPresent === false ? 'default' : 'outline'}
                          onClick={() => markAttendance(student.id, false)}
                          className={isPresent === false ? 'bg-red-600 hover:bg-red-700' : ''}
                        >
                          <XCircle size={16} />
                          Ausente
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            
            {/* Resumen de asistencia */}
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

            {/* Información sobre almacenamiento */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h5 className="font-medium text-blue-800 dark:text-blue-200">Información de almacenamiento</h5>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">
                📱 Los datos de asistencia se guardan en <strong>localStorage</strong> del navegador
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                • Clave: attendance_records • Persistente hasta que se limpie el navegador • Solo visible en este dispositivo
              </p>
              <div className="mt-2 flex gap-2">
                <button 
                  onClick={() => {
                    const records = localStorage.getItem('attendance_records')
                    const recordCount = JSON.parse(records || '[]').length
                    alert(`📋 Hay ${recordCount} registros de asistencia guardados en localStorage`)
                  }}
                  className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  Ver registros guardados
                </button>
                <button 
                  onClick={() => {
                    if (confirm('¿Estás seguro de que quieres borrar todos los registros de asistencia?')) {
                      localStorage.removeItem('attendance_records')
                      alert('🗑️ Todos los registros de asistencia han sido borrados')
                    }
                  }}
                  className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
                >
                  Limpiar todo
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export { OstromAttendanceComponent as component }
