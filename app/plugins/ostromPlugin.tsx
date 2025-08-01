import React, { useState, useRef, useEffect } from 'react'
import { usePermissions, PermissionError, Allow } from 'plugini'
import { QrCode, Users, CheckCircle, XCircle, Camera, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Interfaces para tipos
interface Student {
  id: number
  name: string
  email: string
  grade: number
  active: boolean
}

interface Course {
  id: number
  name: string
  organizacion: string
}

interface AttendanceRecord {
  id: number
  name: string
  email: string
  attended: boolean
}

export const id = 'ostrom-attendance'
export const permissions = ['getStudents', 'getCourses', 'supabaseAccess']
export const metadata = {
  preferredWidth: 'large',
  name: 'Ostrom - Control de Asistencia QR',
  description: 'Sistema completo de control de asistencia usando códigos QR con emails de estudiantes'
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Obtener datos de permisos usando useEffect
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const allPermissions = Allow.getAllPermissions()
        const coursesPermission = allPermissions.find(p => p.name === 'getCourses')
        
        if (coursesPermission?.func) {
          const coursesData = await coursesPermission.func()
          setCourses(coursesData || [])
        }
      } catch (error) {
        console.error('Error loading courses:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // Cargar estudiantes cuando se selecciona un curso
  useEffect(() => {
    const loadStudents = async () => {
      if (!selectedCourse) {
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
        console.error('Error loading students:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [selectedCourse])

  // Verificar permisos
  const hasStudentsPermission = props.activePermissions?.has('getStudents')
  const hasCoursesPermission = props.activePermissions?.has('getCourses')
  const hasSupabasePermission = props.activePermissions?.has('supabaseAccess')

  if (!hasStudentsPermission || !hasCoursesPermission || !hasSupabasePermission) {
    const missingPermissions = []
    if (!hasStudentsPermission) missingPermissions.push('getStudents')
    if (!hasCoursesPermission) missingPermissions.push('getCourses')
    if (!hasSupabasePermission) missingPermissions.push('supabaseAccess')
    
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
          <li><strong>supabaseAccess:</strong> Conectar con la base de datos para guardar asistencia</li>
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
    setScannerActive(true)
    setScannedData('')
  }

  const stopScanner = () => {
    setScannerActive(false)
  }

  // Simular escaneo de QR con email
  const simulateQRScan = async () => {
    if (!scannerActive || students.length === 0) return
    
    // Simular escaneo de un email aleatorio (en implementación real vendría del QR)
    const randomStudent = students[Math.floor(Math.random() * students.length)]
    const scannedEmail = randomStudent.email
    
    setScannedData(scannedEmail)
    await processScannedEmail(scannedEmail)
    setScannerActive(false)
  }

  // Procesar email escaneado y comparar con estudiantes
  const processScannedEmail = async (email: string) => {
    const student = students.find((s: Student) => s.email.toLowerCase() === email.toLowerCase())
    
    if (student) {
      await markAttendance(student.id, true)
      // Mostrar notificación de éxito
      setTimeout(() => {
        alert(`✅ Asistencia registrada para: ${student.name}`)
      }, 100)
    } else {
      // Mostrar error si el email no está en la lista
      setTimeout(() => {
        alert(`❌ Email ${email} no encontrado en la lista de estudiantes del curso`)
      }, 100)
    }
  }

  // Función para input manual de email (para testing)
  const handleManualEmailInput = async (email: string) => {
    if (email.trim()) {
      await processScannedEmail(email.trim())
    }
  }

  // Marcar asistencia y guardar en base de datos
  const markAttendance = async (studentId: number, present: boolean) => {
    setAttendanceList(prev => ({
      ...prev,
      [studentId]: present
    }))
    
    // Guardar en base de datos si hay acceso a Supabase y curso seleccionado
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
          console.error('Error saving attendance to database:', result.error)
          // Mostrar notificación de error
          setTimeout(() => {
            alert(`⚠️ Error al guardar en base de datos: ${result.error}`)
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
            Ostrom - Control de Asistencia Real
          </h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Sistema conectado a Supabase para gestión real de asistencia
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
        <select 
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={selectedCourse?.id || ''}
          onChange={(e) => {
            const course = courses.find((c: Course) => c.id === parseInt(e.target.value))
            setSelectedCourse(course || null)
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
            No se encontraron cursos. Verifica tu conexión a Supabase.
          </p>
        )}
      </div>

      {selectedCourse && (
        <>
          {/* Scanner QR */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Camera size={20} />
                Escáner QR de Asistencia
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
            
            {scannerActive ? (
              <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center space-y-4">
                <div className="animate-pulse">
                  <QrCode size={64} className="mx-auto mb-4 text-emerald-600" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Escáner QR activo. Enfoca el código QR del estudiante.
                  </p>
                </div>
                
                {/* Simulador de escáner - En implementación real esto sería la cámara */}
                <div className="space-y-2">
                  <Button 
                    onClick={simulateQRScan}
                    size="sm"
                    variant="outline"
                    className="mx-auto"
                  >
                    🎯 Simular escaneo de QR
                  </Button>
                  <p className="text-xs text-gray-500">
                    (Simulación para demo - en producción usaría la cámara)
                  </p>
                </div>
              </div>
            ) : (
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
          </div>
        </>
      )}
    </div>
  )
}

export { OstromAttendanceComponent as component }
