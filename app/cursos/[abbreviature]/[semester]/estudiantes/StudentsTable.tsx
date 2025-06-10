'use client'

import { Console } from '@/utils/console'
import { CourseStudentWithUserInfo } from '@/utils/queries'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface StudentsTableProps {
  students: CourseStudentWithUserInfo[]
}

export default function StudentsTable({ students }: StudentsTableProps) {
  const [studentsList, setStudentsList] = useState<CourseStudentWithUserInfo[]>(students)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedStudent, setEditedStudent] = useState<any>(null)
  const { toast } = useToast()

  const startEdit = (student: any) => {
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
    setEditedStudent((editedStudent: CourseStudentWithUserInfo) => ({ ...editedStudent, [field]: value }))
  }

  const saveEdit = async () => {
    Console.Info(`Guardando cambios para el estudiante ${editedStudent.id}`)
    const payload = {
      userInfoId: editedStudent.userInfoId,
      firstName: editedStudent.firstName,
      lastName: editedStudent.lastName,
      group: editedStudent.group
    }
    try {
      const res = await fetch('/api/update-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        throw new Error(`Error al guardar cambios: ${res.statusText}`)
      }
    } catch (error) {
      Console.Error(`Error al guardar cambios: ${error}`)
      return toast({
        title: 'Error',
        description: 'Ocurrió un error al guardar los cambios',
        variant: 'destructive'
      })
    }
    Console.Info(`Cambios guardados para el estudiante ${editedStudent.id}`)
    setStudentsList((prev) =>
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
    setEditingId(null)
  }

  return (
    <table className='table-auto'>
      <thead>
        <tr className='text-left *:px-6 *:py-3'>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Grupo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className='text-left'>
        {studentsList.map((student) => (
          <tr key={student.id} className='*:px-6 *:py-3'>
            <td>
              {editingId === student.id ? (
                <>
                  <input
                    value={editedStudent.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className='border px-1'
                  />
                  <input
                    value={editedStudent.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className='border px-1 ml-1'
                  />
                </>
              ) : (
                `${student.userInfo?.firstName} ${student.userInfo?.lastName}`
              )}
            </td>
            <td>{student.userInfo?.email}</td>
            <td>
              {editingId === student.id ? (
                <input
                  value={editedStudent.group}
                  onChange={(e) => handleChange('group', e.target.value)}
                  className='border px-1'
                />
              ) : (
                student.group
              )}
            </td>
            <td>
              {editingId === student.id ? (
                <>
                  <button onClick={saveEdit} className='text-green-600 hover:underline'>Guardar</button>
                  <button onClick={() => setEditingId(null)} className='text-gray-600 hover:underline ml-2'>Cancelar</button>
                </>
              ) : (
                <button onClick={() => startEdit(student)} className='text-blue-500 hover:underline'>Editar</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
