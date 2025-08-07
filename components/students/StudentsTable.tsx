'use client'

import { CourseStudentWithUserInfo } from '@/utils/queries'
import { useState, useRef } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { GenericTable } from '@/components/GenericTable'
import { studentsColumns } from '@/components/students/studentsColumns'

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
    // TODO: Implementar modal para cambiar grupo
    console.log('Cambiar grupo para:', student.userInfo.firstName, student.userInfo.lastName)
  }

  return (
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
  )
}
