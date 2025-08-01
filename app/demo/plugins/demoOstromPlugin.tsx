'use client'

import React, { useState, useEffect } from 'react'
import { Allow } from 'plugini'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { QrCode, Users, CheckCircle, XCircle, Download, CalendarDays } from 'lucide-react'

interface Course {
  id: number
  name: string
  organizacion: string
}

interface Student {
  id: number
  name: string
  email: string
  grade: number
  active: boolean
}

// Exportar metadatos del plugin antes del componente
export const id = 'demo-ostrom-attendance'
export const permissions = ['getCourses', 'getStudents', 'demoDatabase', 'readNotes']
export const metadata = {
  preferredWidth: 'large',
  name: 'Plugin de Asistencia Ostrom (Demo)',
  description: 'Sistema de gestión de asistencia con códigos QR - Versión de demostración con datos ficticios'
}

// Componente principal del plugin de demostración
const DemoOstromPlugin = (props: any) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [attendanceList, setAttendanceList] = useState<{ [studentId: number]: boolean }>({})
  const [currentDate] = useState(new Date().toISOString().split('T')[0])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [databaseAccess, setDatabaseAccess] = useState<any>(null)

  // Cargar datos usando permisos correctamente
  useEffect(() => {
    const loadData = async () => {
      console.log('[DEMO OSTROM] Iniciando carga de datos...')
      setLoading(true)
      try {
        const allPermissions = Allow.getAllPermissions()
        console.log('[DEMO OSTROM] Permisos disponibles:', allPermissions.map(p => p.name))
        
        // Obtener cursos
        const coursesPermission = allPermissions.find(p => p.name === 'getCourses')
        console.log('[DEMO OSTROM] Permiso getCourses encontrado:', !!coursesPermission)
        
        if (coursesPermission?.func) {
          const coursesData = await coursesPermission.func()
          console.log('[DEMO OSTROM] Datos de cursos:', coursesData)
          setCourses(coursesData || [])
        }

        // Obtener acceso a base de datos demo
        const databasePermission = allPermissions.find(p => p.name === 'demoDatabase')
        console.log('[DEMO OSTROM] Permiso demoDatabase encontrado:', !!databasePermission)
        
        if (databasePermission?.func) {
          const dbAccess = await databasePermission.func()
          console.log('[DEMO OSTROM] Acceso a BD:', dbAccess)
          setDatabaseAccess(dbAccess)
        }
      } catch (error) {
        console.error('[DEMO OSTROM] Error loading demo data:', error)
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
        console.log('[DEMO OSTROM] No hay curso seleccionado')
        setStudents([])
        return
      }

      console.log('[DEMO OSTROM] Cargando estudiantes para curso:', selectedCourse.id)
      setLoading(true)
      try {
        const allPermissions = Allow.getAllPermissions()
        const studentsPermission = allPermissions.find(p => p.name === 'getStudents')
        console.log('[DEMO OSTROM] Permiso getStudents encontrado:', !!studentsPermission)
        
        if (studentsPermission?.func) {
          const studentsData = await studentsPermission.func(selectedCourse.id)
          console.log('[DEMO OSTROM] Datos de estudiantes:', studentsData)
          setStudents(studentsData || [])
        }
      } catch (error) {
        console.error('[DEMO OSTROM] Error loading students:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [selectedCourse])

  // Verificar permisos requeridos - En demo, todos los permisos están disponibles
  const allPermissions = Allow.getAllPermissions()
  const requiredPermissions = ['getCourses', 'getStudents', 'demoDatabase', 'readNotes']
  const availablePermissions = allPermissions.filter(p => requiredPermissions.includes(p.name))
  
  console.log('[DEMO OSTROM] Permisos requeridos:', requiredPermissions)
  console.log('[DEMO OSTROM] Permisos disponibles:', availablePermissions.map(p => p.name))
  console.log('[DEMO OSTROM] Todos los permisos registrados:', allPermissions.map(p => p.name))

  // En modo demo, si los permisos están registrados, el plugin debería funcionar
  const missingPermissions = requiredPermissions.filter(perm => 
    !allPermissions.some(p => p.name === perm)
  )

  // Manejar selección de curso
  const handleCourseChange = (courseId: string) => {
    const course = courses.find((c: Course) => c.id.toString() === courseId)
    setSelectedCourse(course || null)
    setAttendanceList({}) // Limpiar asistencia anterior
  }

  // Marcar asistencia (simulado)
  const markAttendance = (studentId: number, present: boolean) => {
    setAttendanceList(prev => ({
      ...prev,
      [studentId]: present
    }))
    
    if (databaseAccess?.saveAttendance && selectedCourse) {
      const result = databaseAccess.saveAttendance(selectedCourse.id, studentId, present, currentDate)
      console.log('[DEMO] Resultado de guardar asistencia:', result)
    }
  }

  // Generar reporte CSV (simulado)
  const generateReport = () => {
    if (!selectedCourse || students.length === 0) return
    
    const csvData = [
      ['Nombre', 'Email', 'Estado', 'Fecha'],
      ...students.map(student => [
        student.name,
        student.email,
        attendanceList[student.id] === true ? 'Presente' : 
        attendanceList[student.id] === false ? 'Ausente' : 'No marcado',
        currentDate
      ])
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `asistencia-${selectedCourse.name.replace(/\s+/g, '-')}-${currentDate}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Si faltan permisos, mostrar información pero permitir que el plugin funcione en demo
  if (missingPermissions.length > 0) {
    console.warn('[DEMO OSTROM] Permisos faltantes, pero continuando en modo demo:', missingPermissions)
  }

  // En modo demo, mostrar el plugin aunque falten algunos permisos
  // Solo mostrar error si faltan permisos críticos (getCourses, getStudents)
  const criticalMissing = missingPermissions.filter(p => ['getCourses', 'getStudents'].includes(p))
  
  if (criticalMissing.length > 0) {
    return (
      <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
        <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-2">
          ⚠️ Permisos críticos faltantes
        </h3>
        <p className="text-orange-700 dark:text-orange-300">
          Este plugin necesita permisos críticos: {criticalMissing.join(', ')}
        </p>
        <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
          Todos los permisos registrados: {allPermissions.map(p => p.name).join(', ')}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <QrCode size={40} className="text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Plugin de Asistencia Ostrom (Demo)
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Sistema de gestión de asistencia con códigos QR y verificación por email. 
          <span className="text-emerald-600 font-semibold"> Modo Demostración</span>
        </p>
      </div>

      {/* Selector de curso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays size={24} />
            Seleccionar Curso
          </CardTitle>
          <CardDescription>
            Elige el curso para el cual deseas pasar asistencia hoy ({new Date().toLocaleDateString('es-ES')})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleCourseChange}>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Selecciona un curso..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
              {courses.map((course: Course) => (
                <SelectItem 
                  key={course.id} 
                  value={course.id.toString()}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{course.name}</span>
                    <span className="text-sm text-gray-500">{course.organizacion}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Panel de asistencia */}
      {selectedCourse && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR y controles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode size={24} />
                Código QR de Asistencia
              </CardTitle>
              <CardDescription>
                Los estudiantes pueden escanear este código para marcar su asistencia automáticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode size={64} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">QR Demo</p>
                  <p className="text-xs text-emerald-600 mt-1">Curso: {selectedCourse.name}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                  Modo Demostración Activo
                </Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fecha: {new Date().toLocaleDateString('es-ES')}
                </p>
              </div>
            </CardContent>
          </Card>

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
            )}
          </div>
        </div>
      )}

      {/* Estadísticas */}
      {selectedCourse && students.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {Object.values(attendanceList).filter(Boolean).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Presentes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {Object.values(attendanceList).filter(status => status === false).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ausentes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {students.length - Object.keys(attendanceList).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sin marcar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export const component = DemoOstromPlugin
export default DemoOstromPlugin
