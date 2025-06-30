'use client'

import { CourseStudentWithUserInfo } from '@/utils/queries'
import { useState } from 'react'
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
  const { toast } = useToast()

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
    if (!confirm('¿Estás seguro de que deseas eliminar este estudiante?')) return;
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
    }
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
        onDelete: handleDelete
      })}
      filterColumnIds={['email', 'group']}
      emptyMessage='No hay estudiantes en este curso o filtro aplicado.'
    />
  )
}
