'use client'

import { CourseStudentWithUserInfo } from '@/utils/queries'
import { useState, useRef } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { GenericTable } from '@/components/GenericTable'
import { studentsColumns } from '@/components/students/studentsColumns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface StudentsTableProps {
  students: CourseStudentWithUserInfo[]
}

export default function StudentsTable({ students }: StudentsTableProps) {
  const [studentList, setStudentList] = useState(students)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedStudent, setEditedStudent] = useState<any>(null)
  const { toast, dismiss } = useToast()
  const [pendingDelete, setPendingDelete] = useState<CourseStudentWithUserInfo | null>(null)
  const deleteToastId = useRef<string | null>(null)
  
  // Estados para el modal de cambio de grupo
  const [isChangeGroupModalOpen, setIsChangeGroupModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<CourseStudentWithUserInfo | null>(null)
  const [newGroup, setNewGroup] = useState('')
  const [isChangingGroup, setIsChangingGroup] = useState(false)

  const startEdit = (student: CourseStudentWithUserInfo) => {
    setEditingId(student.id)
    setEditedStudent({
      id: student.id,
      userInfoId: student.userInfo.id,
      firstName: student.userInfo.firstName,
      lastName: student.userInfo.lastName,
      group: student.group
    })
  }

  const handleChange = (field: string, value: string) => {
    setEditedStudent((prev: any) => ({ ...prev, [field]: value }))
  }

  const saveEdit = async () => {
    try {
      const res = await fetch('/api/update-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInfoId: editedStudent.userInfoId,
          firstName: editedStudent.firstName,
          lastName: editedStudent.lastName,
          group: editedStudent.group
        })
      })

      if (!res.ok) throw new Error(`Error al guardar cambios: ${res.statusText}`)

      setStudentList((prev) =>
        prev.map((student) =>
          student.id === editedStudent.id
            ? {
                ...student,
                userInfo: {
                  ...student.userInfo,
                  firstName: editedStudent.firstName,
                  lastName: editedStudent.lastName
                },
                group: editedStudent.group
              }
            : student
        )
      )

      toast({
        title: 'Éxito',
        description: 'Cambios guardados correctamente',
        variant: 'success'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Ocurrió un error al guardar los cambios',
        variant: 'destructive'
      })
    } finally {
      setEditingId(null)
    }
  }

  const handleDelete = async (student: CourseStudentWithUserInfo) => {
    setPendingDelete(student)
    if (deleteToastId.current) return // Ya hay un toast activo
    const toastObj = toast({
      title: '¿Eliminar estudiante?',
      description: `¿Seguro que deseas eliminar a ${student.userInfo.firstName} ${student.userInfo.lastName}?`,
      action: (
        <div className="flex gap-2">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={async () => {
              try {
                const res = await fetch('/api/delete-student', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ studentId: student.id, userInfoId: student.userInfo.id })
                })
                if (!res.ok) throw new Error('No se pudo eliminar el estudiante')
                setStudentList((prev) => prev.filter((s) => s.id !== student.id))
                toast({
                  title: 'Estudiante eliminado',
                  description: 'El estudiante fue eliminado correctamente',
                  variant: 'success'
                })
              } catch (error) {
                console.error(error)
                toast({
                  title: 'Error',
                  description: 'Ocurrió un error al eliminar el estudiante',
                  variant: 'destructive'
                })
              } finally {
                setPendingDelete(null)
                if (toastObj.id) dismiss(toastObj.id)
                deleteToastId.current = null
              }
            }}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
            onClick={() => {
              setPendingDelete(null)
              if (toastObj.id) dismiss(toastObj.id)
              deleteToastId.current = null
            }}
          >
            Cancelar
          </button>
        </div>
      ),
      duration: 10000,
      variant: 'destructive',
      onOpenChange: (open: boolean) => {
        if (!open) {
          setPendingDelete(null)
          deleteToastId.current = null
        }
      }
    })
    deleteToastId.current = toastObj.id
  }

  const handleChangeGroup = (student: CourseStudentWithUserInfo) => {
    setSelectedStudent(student)
    setNewGroup(student.group?.toString() || '')
    setIsChangeGroupModalOpen(true)
  }

  const confirmChangeGroup = async () => {
    if (!selectedStudent || !newGroup.trim()) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa un número de grupo válido',
        variant: 'destructive'
      })
      return
    }

    setIsChangingGroup(true)
    try {
      const res = await fetch('/api/update-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInfoId: selectedStudent.userInfo.id,
          firstName: selectedStudent.userInfo.firstName,
          lastName: selectedStudent.userInfo.lastName,
          group: newGroup // Enviar como string
        })
      })

      if (!res.ok) throw new Error(`Error al cambiar grupo: ${res.statusText}`)

      setStudentList((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, group: newGroup } // Usar string directamente
            : student
        )
      )

      toast({
        title: 'Éxito',
        description: `Grupo de ${selectedStudent.userInfo.firstName} ${selectedStudent.userInfo.lastName} cambiado a ${newGroup}`,
        variant: 'success'
      })

      setIsChangeGroupModalOpen(false)
      setSelectedStudent(null)
      setNewGroup('')
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Ocurrió un error al cambiar el grupo',
        variant: 'destructive'
      })
    } finally {
      setIsChangingGroup(false)
    }
  }

  const cancelChangeGroup = () => {
    setIsChangeGroupModalOpen(false)
    setSelectedStudent(null)
    setNewGroup('')
  }

  return (
    <>
      <GenericTable
        data={studentList}
        columns={studentsColumns({
          editingId,
          editedStudent,
          onEdit: startEdit,
          onChange: handleChange,
          onSave: saveEdit,
          onCancel: () => setEditingId(null),
          onDelete: handleDelete,
          onChangeGroup: handleChangeGroup
        })}
        filterColumnIds={['email', 'group']}
        emptyMessage='No hay estudiantes en este curso o filtro aplicado.'
      />

      {/* Modal para cambiar grupo */}
      <Dialog open={isChangeGroupModalOpen} onOpenChange={setIsChangeGroupModalOpen}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>Cambiar grupo de estudiante</DialogTitle>
            <DialogDescription>
              {selectedStudent && (
                <>Cambiar grupo de <strong>{selectedStudent.userInfo.firstName} {selectedStudent.userInfo.lastName}</strong></>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-6 mt-4">
            {/* Grupo actual */}
            <div className="flex-1">
              <h3 className="font-semibold mb-3 text-center">
                Grupo Actual: {selectedStudent?.group || 'Sin grupo'}
              </h3>
              <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                <div className="space-y-2">
                  {studentList
                    .filter(student => student.group === selectedStudent?.group)
                    .map(student => (
                      <div 
                        key={student.id} 
                        className={`p-2 rounded ${student.id === selectedStudent?.id ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white'}`}
                      >
                        <div className="font-medium">{student.userInfo.firstName} {student.userInfo.lastName}</div>
                        <div className="text-sm text-gray-500">{student.userInfo.email}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Flecha de transferencia */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl mb-2">👤</div>
              <div className="text-3xl">→</div>
              <div className="text-sm text-gray-600 mt-2 text-center">
                Transferir a
              </div>
            </div>

            {/* Grupo destino */}
            <div className="flex-1">
              <div className="mb-3">
                <Label htmlFor="new-group" className="block text-center font-semibold mb-2">
                  Nuevo Grupo
                </Label>
                <Input
                  id="new-group"
                  type="number"
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                  placeholder="Número de grupo"
                  className="text-center"
                  min="1"
                />
              </div>
              <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                <div className="space-y-2">
                  {newGroup.trim() ? (
                    studentList
                      .filter(student => student.group === newGroup && student.id !== selectedStudent?.id)
                      .map(student => (
                        <div key={student.id} className="p-2 bg-white rounded">
                          <div className="font-medium">{student.userInfo.firstName} {student.userInfo.lastName}</div>
                          <div className="text-sm text-gray-500">{student.userInfo.email}</div>
                        </div>
                      ))
                  ) : (
                    <div className="text-gray-500 text-center">Ingresa un número de grupo</div>
                  )}
                  {newGroup.trim() && studentList.filter(student => student.group === newGroup && student.id !== selectedStudent?.id).length === 0 && (
                    <div className="text-gray-500 text-center">Grupo vacío</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={cancelChangeGroup}>
              Cancelar
            </Button>
            <Button 
              onClick={confirmChangeGroup} 
              disabled={isChangingGroup || !newGroup.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              {isChangingGroup ? 'Cambiando...' : 'Confirmar Cambio'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
