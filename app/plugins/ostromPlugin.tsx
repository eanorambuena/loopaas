import React, { useState, useRef } from 'react'
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
  name: 'Ostrom - Control de Asistencia',
  description: 'Sistema de control de asistencia mediante códigos QR con integración a Supabase'
}

// Componente principal del plugin
const OstromAttendanceComponent = (props: any) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [attendanceList, setAttendanceList] = useState<{[key: string]: boolean}>({})
  const [scannerActive, setScannerActive] = useState(false)
  const [scannedData, setScannedData] = useState<string>('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  // Obtener datos de permisos
  const allPermissions = Allow.getAllPermissions()
  const studentsPermission = allPermissions.find(p => p.name === 'getStudents')
  const coursesPermission = allPermissions.find(p => p.name === 'getCourses')
  const supabasePermission = allPermissions.find(p => p.name === 'supabaseAccess')
  
  const students: Student[] = studentsPermission?.func?.() || []
  const courses: Course[] = coursesPermission?.func?.() || []
  const dbAccess = supabasePermission?.func?.() || {}

  // Funciones del escáner QR (simulado)
  const startScanner = async () => {
    setScannerActive(true)
    // Simular escaneo QR (en una implementación real usarías una librería como jsQR)
    setTimeout(() => {
      const randomStudent = students[Math.floor(Math.random() * students.length)]
      setScannedData(`student_${randomStudent.id}`)
      markAttendance(randomStudent.id, true)
      setScannerActive(false)
    }, 2000)
  }

  const stopScanner = () => {
    setScannerActive(false)
  }

  // Marcar asistencia
  const markAttendance = (studentId: number, present: boolean) => {
    setAttendanceList(prev => ({
      ...prev,
      [studentId]: present
    }))
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
            Ostrom - Control de Asistencia
          </h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Gestiona la asistencia de estudiantes con códigos QR
          </p>
        </div>
      </div>

      {/* Selector de curso */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Seleccionar curso:
        </label>
        <select 
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          value={selectedCourse?.id || ''}
          onChange={(e) => {
            const course = courses.find((c: Course) => c.id === parseInt(e.target.value))
            setSelectedCourse(course || null)
          }}
        >
          <option value="">-- Seleccionar curso --</option>
          {courses.map((course: Course) => (
            <option key={course.id} value={course.id}>
              {course.name} - {course.organizacion}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <>
          {/* Scanner QR */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Camera size={20} />
                Escáner QR
              </h4>
              <div className="flex gap-2">
                <Button 
                  onClick={startScanner}
                  disabled={scannerActive}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {scannerActive ? 'Escaneando...' : 'Iniciar escáner'}
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
              <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
                <div className="animate-pulse">
                  <QrCode size={64} className="mx-auto mb-4 text-emerald-600" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Escaneando código QR...
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
                <QrCode size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-500">
                  Haz clic en &quot;Iniciar escáner&quot; para comenzar
                </p>
              </div>
            )}
            
            {scannedData && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <p className="text-green-800 dark:text-green-200 text-sm">
                  ✅ Último código escaneado: {scannedData}
                </p>
              </div>
            )}
          </div>

          {/* Lista de estudiantes */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Users size={20} />
                Lista de Estudiantes ({students.length})
              </h4>
              <Button 
                onClick={generateReport}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Exportar CSV
              </Button>
            </div>
            
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
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {student.email}
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
