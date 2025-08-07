'use client'

import React, { useState, useMemo } from 'react'
import { CourseStudentWithUserInfo } from '@/utils/queries'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, UserPlus, Shuffle, Move, UserMinus } from 'lucide-react'
import GroupIcon from '@/components/icons/GroupIcon'

interface GroupsManagerProps {
  students: CourseStudentWithUserInfo[]
  course?: any
}

interface GroupData {
  groupNumber: string
  students: CourseStudentWithUserInfo[]
}

export default function GroupsManager({ students }: GroupsManagerProps) {
  const [studentList, setStudentList] = useState(students)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [newGroupNumber, setNewGroupNumber] = useState('')
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [isMovingStudents, setIsMovingStudents] = useState(false)
  const { toast } = useToast()

  // Agrupar estudiantes por número de grupo
  const groupedStudents = useMemo(() => {
    const groups: { [key: string]: CourseStudentWithUserInfo[] } = {}
    const unassigned: CourseStudentWithUserInfo[] = []

    studentList.forEach(student => {
      if (student.group && String(student.group).trim()) {
        const groupKey = String(student.group)
        if (!groups[groupKey]) {
          groups[groupKey] = []
        }
        groups[groupKey].push(student)
      } else {
        unassigned.push(student)
      }
    })

    // Convertir a array y ordenar por número de grupo
    const groupsArray: GroupData[] = Object.keys(groups)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(groupNumber => ({
        groupNumber,
        students: groups[groupNumber]
      }))

    return { groups: groupsArray, unassigned }
  }, [studentList])

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const createNewGroup = async () => {
    if (!newGroupNumber.trim() || selectedStudents.length === 0) {
      toast({
        title: 'Error',
        description: 'Selecciona estudiantes y especifica un número de grupo',
        variant: 'destructive'
      })
      return
    }

    setIsCreatingGroup(true)
    try {
      // Actualizar estudiantes seleccionados
      const updatePromises = selectedStudents.map(async (studentId) => {
        const student = studentList.find(s => s.id === studentId)
        if (!student) return

        const res = await fetch('/api/update-student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userInfoId: student.userInfo.id,
            firstName: student.userInfo.firstName,
            lastName: student.userInfo.lastName,
            group: newGroupNumber.trim()
          })
        })

        if (!res.ok) throw new Error(`Error al actualizar estudiante ${student.userInfo.firstName}`)
      })

      await Promise.all(updatePromises)

      // Actualizar estado local
      setStudentList(prev =>
        prev.map(student =>
          selectedStudents.includes(student.id)
            ? { ...student, group: newGroupNumber.trim() }
            : student
        )
      )

      toast({
        title: 'Éxito',
        description: `Grupo ${newGroupNumber} creado con ${selectedStudents.length} estudiantes`,
        variant: 'success'
      })

      setSelectedStudents([])
      setNewGroupNumber('')
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Ocurrió un error al crear el grupo',
        variant: 'destructive'
      })
    } finally {
      setIsCreatingGroup(false)
    }
  }

  const moveStudentsToGroup = async (targetGroup: string) => {
    if (selectedStudents.length === 0) {
      toast({
        title: 'Error',
        description: 'Selecciona estudiantes para mover',
        variant: 'destructive'
      })
      return
    }

    setIsMovingStudents(true)
    try {
      const updatePromises = selectedStudents.map(async (studentId) => {
        const student = studentList.find(s => s.id === studentId)
        if (!student) return

        const res = await fetch('/api/update-student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userInfoId: student.userInfo.id,
            firstName: student.userInfo.firstName,
            lastName: student.userInfo.lastName,
            group: targetGroup
          })
        })

        if (!res.ok) throw new Error(`Error al mover estudiante ${student.userInfo.firstName}`)
      })

      await Promise.all(updatePromises)

      setStudentList(prev =>
        prev.map(student =>
          selectedStudents.includes(student.id)
            ? { ...student, group: targetGroup }
            : student
        )
      )

      toast({
        title: 'Éxito',
        description: `${selectedStudents.length} estudiantes movidos al grupo ${targetGroup}`,
        variant: 'success'
      })

      setSelectedStudents([])
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Ocurrió un error al mover estudiantes',
        variant: 'destructive'
      })
    } finally {
      setIsMovingStudents(false)
    }
  }

  const autoAssignGroups = async () => {
    const unassignedStudents = groupedStudents.unassigned
    if (unassignedStudents.length === 0) {
      toast({
        title: 'Info',
        description: 'No hay estudiantes sin asignar',
      })
      return
    }

    // Calcular número de grupos óptimo (4-5 estudiantes por grupo)
    const studentsPerGroup = 4
    const numberOfGroups = Math.ceil(unassignedStudents.length / studentsPerGroup)
    const nextGroupNumber = Math.max(...groupedStudents.groups.map(g => parseInt(g.groupNumber)), 0) + 1

    setIsMovingStudents(true)
    try {
      const updatePromises = unassignedStudents.map(async (student, index) => {
        const groupNumber = nextGroupNumber + Math.floor(index / studentsPerGroup)
        
        const res = await fetch('/api/update-student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userInfoId: student.userInfo.id,
            firstName: student.userInfo.firstName,
            lastName: student.userInfo.lastName,
            group: groupNumber.toString()
          })
        })

        if (!res.ok) throw new Error(`Error al asignar estudiante ${student.userInfo.firstName}`)
        return { student, groupNumber }
      })

      const results = await Promise.all(updatePromises)

      setStudentList(prev =>
        prev.map(student => {
          const result = results.find(r => r?.student.id === student.id)
          return result ? { ...student, group: result.groupNumber.toString() } : student
        })
      )

      toast({
        title: 'Éxito',
        description: `${unassignedStudents.length} estudiantes asignados automáticamente a ${numberOfGroups} grupos`,
        variant: 'success'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Ocurrió un error al asignar grupos automáticamente',
        variant: 'destructive'
      })
    } finally {
      setIsMovingStudents(false)
    }
  }

  const unassignStudents = async () => {
    if (selectedStudents.length === 0) {
      toast({
        title: 'Error',
        description: 'Selecciona estudiantes para desasignar',
        variant: 'destructive'
      })
      return
    }

    setIsMovingStudents(true)
    try {
      const updatePromises = selectedStudents.map(async (studentId) => {
        const student = studentList.find(s => s.id === studentId)
        if (!student) return

        const res = await fetch('/api/update-student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userInfoId: student.userInfo.id,
            firstName: student.userInfo.firstName,
            lastName: student.userInfo.lastName,
            group: null // Desasignar del grupo (null)
          })
        })

        if (!res.ok) throw new Error(`Error al desasignar estudiante ${student.userInfo.firstName}`)
      })

      await Promise.all(updatePromises)

      setStudentList(prev =>
        prev.map(student =>
          selectedStudents.includes(student.id)
            ? { ...student, group: null as any } // Usamos 'as any' para evitar el error de tipos
            : student
        )
      )

      toast({
        title: 'Éxito',
        description: `${selectedStudents.length} estudiantes desasignados de sus grupos`,
        variant: 'success'
      })

      setSelectedStudents([])
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Ocurrió un error al desasignar estudiantes',
        variant: 'destructive'
      })
    } finally {
      setIsMovingStudents(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Controles principales */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Gestión de Grupos</h2>
          <Badge variant="outline" className="text-sm">
            {studentList.length} estudiantes total
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {groupedStudents.unassigned.length} sin asignar
          </Badge>
          <Badge variant="default" className="text-sm">
            {groupedStudents.groups.length} grupos
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={unassignStudents}
            disabled={isMovingStudents || selectedStudents.length === 0}
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <UserMinus className="w-4 h-4 mr-2" />
            Desasignar
          </Button>
          
          <Button
            onClick={autoAssignGroups}
            disabled={isMovingStudents || groupedStudents.unassigned.length === 0}
            variant="outline"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Auto-asignar
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                disabled={selectedStudents.length === 0}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Crear Grupo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Grupo</DialogTitle>
                <DialogDescription>
                  Asignar {selectedStudents.length} estudiantes seleccionados a un nuevo grupo
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="group-number">Número de Grupo</Label>
                  <Input
                    id="group-number"
                    type="number"
                    value={newGroupNumber}
                    onChange={(e) => setNewGroupNumber(e.target.value)}
                    placeholder="Ej: 1, 2, 3..."
                    min="1"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={createNewGroup}
                    disabled={isCreatingGroup || !newGroupNumber.trim()}
                  >
                    {isCreatingGroup ? 'Creando...' : 'Crear Grupo'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estudiantes seleccionados */}
      {selectedStudents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              {selectedStudents.length} estudiantes seleccionados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedStudents.map(studentId => {
                const student = studentList.find(s => s.id === studentId)
                return (
                  <Badge key={studentId} variant="secondary">
                    {student?.userInfo.firstName} {student?.userInfo.lastName}
                  </Badge>
                )
              })}
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={unassignStudents}
                disabled={isMovingStudents}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <UserMinus className="w-3 h-3 mr-1" />
                Desasignar
              </Button>
              
              <span className="text-sm text-gray-600 self-center">Mover a grupo:</span>
              {groupedStudents.groups.map(group => (
                <Button
                  key={group.groupNumber}
                  size="sm"
                  variant="outline"
                  onClick={() => moveStudentsToGroup(group.groupNumber)}
                  disabled={isMovingStudents}
                >
                  <Move className="w-3 h-3 mr-1" />
                  Grupo {group.groupNumber}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de grupos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Estudiantes sin asignar */}
        {groupedStudents.unassigned.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Sin Asignar
                <Badge variant="secondary">{groupedStudents.unassigned.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {groupedStudents.unassigned.map(student => (
                  <div
                    key={student.id}
                    className={`p-2 rounded cursor-pointer transition-colors ${
                      selectedStudents.includes(student.id)
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => toggleStudentSelection(student.id)}
                  >
                    <div className="font-medium text-sm">
                      {student.userInfo.firstName} {student.userInfo.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {student.userInfo.email}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grupos existentes */}
        {groupedStudents.groups.map(group => (
          <Card key={group.groupNumber}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GroupIcon className="w-4 h-4" />
                Grupo {group.groupNumber}
                <Badge variant="default">{group.students.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {group.students.map(student => (
                  <div
                    key={student.id}
                    className={`p-2 rounded cursor-pointer transition-colors ${
                      selectedStudents.includes(student.id)
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => toggleStudentSelection(student.id)}
                  >
                    <div className="font-medium text-sm">
                      {student.userInfo.firstName} {student.userInfo.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {student.userInfo.email}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}