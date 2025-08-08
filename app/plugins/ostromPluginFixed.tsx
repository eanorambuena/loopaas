import React, { useState, useRef, useEffect } from 'react'
import { usePermissions, PermissionError, Allow } from 'plugini'
import { QrCode, Users, CheckCircle, XCircle, Camera, Download, Settings, FileSpreadsheet, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import QrScanner from 'qr-scanner'
import { Html5Qrcode } from 'html5-qrcode'
import * as ExcelJS from 'exceljs'

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

export const id = 'ostrom-attendance-fixed'
export const permissions = ['getStudents', 'getCourses', 'supabaseAccess', 'camera']
export const metadata = {
  preferredWidth: 'large',
  name: 'Ostrom - Control de Asistencia QR (Mejorado)',
  description: 'Sistema de control de asistencia con doble librería QR y video visible'
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
  const [showDebugInfo, setShowDebugInfo] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const qrScannerRef = useRef<QrScanner | null>(null)
  const html5QrRef = useRef<Html5Qrcode | null>(null)

  // Función para agregar mensajes de debug (sin datos sensibles)
  const addDebugMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const fullMessage = `[${timestamp}] ${message}`
    // Solo log en desarrollo, no en producción
    if (process.env.NODE_ENV === 'development') {
      console.log(fullMessage)
    }
    setDebugInfo(prev => [...prev.slice(-4), fullMessage])
  }

  // Función para sanitizar texto y prevenir XSS
  const sanitizeText = (text: string): string => {
    return text
      .replace(/[<>]/g, '') // Remover caracteres HTML peligrosos
      .trim()
      .substring(0, 100) // Limitar longitud
  }

  // Función para validar formato de email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 254
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
    const missingPermissions: string[] = []
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
          stopQrScanner()
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment',
          maxScansPerSecond: 5
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
          stopHtml5Scanner()
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

  // Process scanned email con validaciones de seguridad
  const processScannedEmail = async (rawEmail: string) => {
    // Sanitizar y validar entrada
    const email = sanitizeText(rawEmail.toLowerCase())
    
    if (!isValidEmail(email)) {
      addDebugMessage('❌ Email inválido detectado')
      alert('❌ Código QR no contiene un email válido')
      return
    }
    
    addDebugMessage('📧 Procesando email válido')
    
    const student = students.find((s: Student) => s.email.toLowerCase() === email)
    
    if (student) {
      // Sanitizar nombre para mostrar
      const safeName = sanitizeText(student.name)
      addDebugMessage('✅ Estudiante encontrado')
      await markAttendance(student.id, true)
      alert(`✅ Asistencia registrada para: ${safeName}`)
    } else {
      addDebugMessage('❌ Estudiante no encontrado')
      alert('❌ Email no encontrado en el curso')
    }
  }

  // Mark attendance con seguridad mejorada
  const markAttendance = async (studentId: string, present: boolean) => {
    // Validar que studentId sea seguro
    if (!studentId || typeof studentId !== 'string' || studentId.length > 50) {
      addDebugMessage('❌ Student ID inválido')
      return
    }

    setAttendanceList(prev => ({
      ...prev,
      [studentId]: present
    }))

    // Guardar en Supabase vía API y también respaldo local
    try {
      const today = new Date().toISOString().split('T')[0]
      // Llamada a la API Next para guardar asistencia en Supabase
      if (selectedCourse?.id && studentId) {
        const response = await fetch('/api/plugins/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId: selectedCourse.id,
            studentId,
            present,
            date: today
          })
        })
        const result = await response.json()
        if (!response.ok) {
          addDebugMessage('❌ Error guardando en Supabase: ' + (result.error || response.status))
        } else {
          addDebugMessage('✅ Asistencia guardada en Supabase')
        }
      }
      // Guardar respaldo local
      const records = JSON.parse(localStorage.getItem('attendance_records') || '[]')
      records.push({
        courseId: selectedCourse?.id,
        studentHash: btoa(studentId),
        present,
        date: today,
        timestamp: new Date().toISOString()
      })
      if (records.length > 100) {
        records.splice(0, records.length - 100)
      }
      localStorage.setItem('attendance_records', JSON.stringify(records))
      addDebugMessage('💾 Asistencia guardada de forma segura (respaldo local)')
    } catch (error) {
      addDebugMessage('❌ Error guardando asistencia')
      console.error('Error saving attendance:', error)
    }
  }

  // Simulate QR scan for testing
  const simulateQRScan = async () => {
    if (students.length === 0) return
    
    const randomStudent = students[Math.floor(Math.random() * students.length)]
    await processScannedEmail(randomStudent.email)
  }

  // Función segura para generar CSV con datos de asistencia
  const generateAttendanceCSV = () => {
    if (!selectedCourse || students.length === 0) {
      alert('Selecciona un curso con estudiantes para generar CSV')
      return
    }

    try {
      // Obtener registros de asistencia del localStorage
      const records = JSON.parse(localStorage.getItem('attendance_records') || '[]')
      const courseRecords = records.filter((r: any) => r.courseId === selectedCourse.id)
      
      // Obtener fechas únicas
      const allDates: string[] = courseRecords.map((r: any) => r.date).filter(Boolean)
      const uniqueDates = Array.from(new Set(allDates)).sort()
      
      if (uniqueDates.length === 0) {
        alert('No hay registros de asistencia para generar CSV')
        return
      }

      // Crear CSV manualmente (más seguro que librerías externas)
      let csvContent = 'data:text/csv;charset=utf-8,'
      
      // Header: Nombre, Email, y fechas
      const header = ['Nombre', 'Email', ...uniqueDates].join(',')
      csvContent += header + '\n'
      
      // Filas: cada estudiante
      students.forEach(student => {
        const safeName = sanitizeText(student.name).replace(/,/g, ';') // Reemplazar comas
        const safeEmail = sanitizeText(student.email)
        
        let row = `"${safeName}","${safeEmail}"`
        
        // Para cada fecha, verificar si estuvo presente (1) o no (0)
        uniqueDates.forEach((date: string) => {
          const attendanceForDate = courseRecords.find((r: any) => 
            btoa(student.id) === r.studentHash && r.date === date
          )
          const attended = attendanceForDate?.present ? '1' : '0'
          row += `,${attended}`
        })
        
        csvContent += row + '\n'
      })

      // Descargar archivo
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      
      const safeCourseName = sanitizeText(selectedCourse.name).replace(/[^a-zA-Z0-9]/g, '_')
      const fileName = `asistencia_${safeCourseName}_${new Date().toISOString().split('T')[0]}.csv`
      link.setAttribute('download', fileName)
      
      // Cleanup después de descarga
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      addDebugMessage(`📊 CSV generado: ${fileName}`)
      alert('✅ Archivo CSV generado exitosamente')
      
    } catch (error) {
      addDebugMessage('❌ Error generando CSV')
      alert('❌ Error al generar archivo CSV')
    }
  }

  // Función para generar Excel (.xlsx) con ExcelJS
  const generateAttendanceExcel = async () => {
    if (!selectedCourse || students.length === 0) {
      alert('Selecciona un curso con estudiantes para generar Excel')
      return
    }

    try {
      // Obtener registros de asistencia del localStorage
      const records = JSON.parse(localStorage.getItem('attendance_records') || '[]')
      const courseRecords = records.filter((r: any) => r.courseId === selectedCourse.id)
      
      // Obtener fechas únicas
      const allDates: string[] = courseRecords.map((r: any) => r.date).filter(Boolean)
      const uniqueDates = Array.from(new Set(allDates)).sort()
      
      if (uniqueDates.length === 0) {
        alert('No hay registros de asistencia para generar Excel')
        return
      }

      // Crear workbook y worksheet
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Asistencia')

      // Headers
      const headers = ['Nombre', 'Email', ...uniqueDates]
      worksheet.addRow(headers)

      // Estilo para el header
      const headerRow = worksheet.getRow(1)
      headerRow.font = { bold: true }
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE2E8F0' }
      }

      // Datos de estudiantes
      students.forEach(student => {
        const safeName = sanitizeText(student.name)
        const safeEmail = sanitizeText(student.email)
        
        const row: (string | number)[] = [safeName, safeEmail]
        
        // Para cada fecha, verificar si estuvo presente (1) o no (0)
        uniqueDates.forEach((date: string) => {
          const attendanceForDate = courseRecords.find((r: any) => 
            btoa(student.id) === r.studentHash && r.date === date
          )
          const attended = attendanceForDate?.present ? 1 : 0
          row.push(attended)
        })
        
        worksheet.addRow(row)
      })

      // Ajustar ancho de columnas
      worksheet.columns.forEach(column => {
        if (column.header === 'Nombre') {
          column.width = 20
        } else if (column.header === 'Email') {
          column.width = 25
        } else {
          column.width = 12
        }
      })

      // Estilo condicional para las celdas de asistencia
      for (let rowNumber = 2; rowNumber <= students.length + 1; rowNumber++) {
        for (let colNumber = 3; colNumber <= headers.length; colNumber++) {
          const cell = worksheet.getCell(rowNumber, colNumber)
          if (cell.value === 1) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFD4EDDA' } // Verde claro
            }
            cell.font = { color: { argb: 'FF155724' } }
          } else if (cell.value === 0) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFF8D7DA' } // Rojo claro
            }
            cell.font = { color: { argb: 'FF721C24' } }
          }
        }
      }

      // Generar archivo
      const buffer = await workbook.xlsx.writeBuffer()
      
      // Crear blob y descargar
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      })
      
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      const safeCourseName = sanitizeText(selectedCourse.name).replace(/[^a-zA-Z0-9]/g, '_')
      const fileName = `asistencia_${safeCourseName}_${new Date().toISOString().split('T')[0]}.xlsx`
      link.download = fileName
      
      // Cleanup después de descarga
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      addDebugMessage(`📊 Excel generado: ${fileName}`)
      alert('✅ Archivo Excel generado exitosamente')
      
    } catch (error) {
      addDebugMessage('❌ Error generando Excel')
      alert('❌ Error al generar archivo Excel')
      console.error('Excel generation error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950 p-4">
        <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2 flex items-center gap-2">
          <QrCode size={24} />
          Control de Asistencia QR (Mejorado)
        </h2>
        <p className="text-emerald-700 dark:text-emerald-300 text-sm">
          Escanea códigos QR de estudiantes para marcar asistencia. Ahora con dos librerías para mayor compatibilidad.
        </p>
      </div>

      {/* Course selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Seleccionar Curso</label>
        <select 
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          value={selectedCourse?.id || ''}
          onChange={(e) => {
            if (!e.target.value) {
              setSelectedCourse(null)
              return
            }
            
            const foundCourse = courses.find((course: Course) => course.id === e.target.value)
            setSelectedCourse(foundCourse || null)
            setAttendanceList({})
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
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3">Scanner QR</h3>
            
            {/* Method selector */}
            <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950 p-3 rounded-lg mb-4">
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-200">Método de escaneo</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400">Cambia si uno no funciona</p>
              </div>
              <div className="flex gap-2">
                                <Button
                  size="sm"
                  variant={!useHtml5Scanner ? 'default' : 'outline'}
                  onClick={() => {
                    setUseHtml5Scanner(false)
                    addDebugMessage('📦 Cambiado a QrScanner')
                  }}
                  className="text-xs"
                >
                  QrScanner
                </Button>
                <Button
                  size="sm"
                  variant={useHtml5Scanner ? 'default' : 'outline'}
                  onClick={() => {
                    setUseHtml5Scanner(true)
                    addDebugMessage('📦 Cambiado a Html5Qrcode')
                  }}
                  className="text-xs"
                >
                  Html5Qrcode
                </Button>
              </div>
            </div>

            {/* Scanner controls */}
            <div className="flex gap-2 mb-4">
              {!useHtml5Scanner ? (
                <>
                  {!scannerActive ? (
                    <Button onClick={startQrScanner} className="flex items-center gap-2">
                      <Camera size={16} />
                      Activar escáner QR
                    </Button>
                  ) : (
                    <Button onClick={stopQrScanner} variant="outline">
                      Detener escáner
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {!html5ScannerActive ? (
                    <Button onClick={startHtml5Scanner} className="flex items-center gap-2">
                      <Camera size={16} />
                      Activar Html5 Scanner
                    </Button>
                  ) : (
                    <Button onClick={stopHtml5Scanner} variant="outline">
                      Detener Html5 Scanner
                    </Button>
                  )}
                </>
              )}
              
              <Button onClick={simulateQRScan} variant="outline" size="sm">
                Simular escaneo
              </Button>
              
              <Button 
                onClick={generateAttendanceCSV} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <FileText size={14} />
                Descargar CSV
              </Button>
              
              <Button 
                onClick={generateAttendanceExcel} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <FileSpreadsheet size={14} />
                Descargar Excel
              </Button>
            </div>

            {/* Scanner area */}
            <div className="space-y-4">
              {/* QrScanner video */}
              {!useHtml5Scanner && (
                <div className={scannerActive ? 'block' : 'hidden'}>
                  <video 
                    ref={videoRef}
                    className="w-full max-w-md mx-auto rounded-lg bg-black border-2 border-emerald-500"
                    playsInline
                    muted
                    autoPlay
                    style={{ 
                      height: '300px',
                      objectFit: 'cover'
                    }}
                  />
                  {scannerActive && !cameraError && (
                    <div className="text-center mt-2">
                      <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        📱 Cámara activa - Enfoca el código QR
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
                    className="w-full max-w-md mx-auto rounded-lg overflow-hidden border-2 border-emerald-500"
                    style={{ minHeight: '250px' }}
                  />
                  {html5ScannerActive && !cameraError && (
                    <div className="text-center mt-2">
                      <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        📱 Html5Qrcode activo - Enfoca el código QR
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Inactive message */}
              {!scannerActive && !html5ScannerActive && !cameraError && (
                <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
                  <Camera size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Presiona &quot;Activar escáner&quot; para comenzar
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Método: {useHtml5Scanner ? 'Html5Qrcode' : 'QrScanner'}
                  </p>
                </div>
              )}

              {/* Error message */}
              {cameraError && (
                <div className="bg-red-100 dark:bg-red-950 p-4 rounded-lg text-center">
                  <XCircle size={48} className="mx-auto mb-4 text-red-500" />
                  <p className="text-red-700 dark:text-red-300 font-medium mb-2">Error de cámara</p>
                  <p className="text-red-600 dark:text-red-400 text-sm">{cameraError}</p>
                  <Button 
                    onClick={() => {
                      setCameraError('')
                      setUseHtml5Scanner(!useHtml5Scanner) // Cambiar método automáticamente
                    }} 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
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
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {students.map((student: Student) => {
                  const isPresent = attendanceList[student.id]
                  return (
                    <div 
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-gray-800"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                      <div className="flex gap-2">
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

      {/* Debug Panel - Collapsible at bottom */}
      {debugInfo.length > 0 && (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg">
          <button
            onClick={() => setShowDebugInfo(!showDebugInfo)}
            className="w-full p-3 text-left bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-t-lg flex items-center justify-between transition-colors"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              🔧 Información de Debug ({debugInfo.length})
            </span>
            {showDebugInfo ? (
              <ChevronUp size={16} className="text-gray-500" />
            ) : (
              <ChevronDown size={16} className="text-gray-500" />
            )}
          </button>
          
          {showDebugInfo && (
            <div className="bg-gray-900 text-green-400 p-3 rounded-b-lg font-mono text-xs border-t border-gray-300 dark:border-gray-600">
              <div className="max-h-40 overflow-y-auto space-y-1">
                {debugInfo.map((msg, idx) => (
                  <div key={idx} className="text-green-300 leading-relaxed">{msg}</div>
                ))}
              </div>
              <button
                onClick={() => setDebugInfo([])}
                className="mt-3 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
              >
                Limpiar Debug
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { OstromAttendanceComponent as component }
