'use client'

import Input from '@/components/Input'
import SecondaryButton from '@/components/SecondaryButton'
import { useState } from 'react'

export default function UploadStudentsForm() {
  const [csv, setCsv] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch('/api/save-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv })
      })

      if (!res.ok) throw new Error('Fallo la carga')

      alert('Estudiantes cargados correctamente')
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert('Error al guardar estudiantes')
    }
  }

  return (
    <form onSubmit={handleSubmit}  className='flex flex-col gap-4 border border-foreground/20 rounded-md p-4'>
      <legend className='text-lg font-semibold'>
        Importar estudiantes desde CSV con formato:<br />
        <span className='text-sm font-normal'>APELLIDOS;NOMBRES;PASSWORD;CORREO;GRUPO</span>
      </legend>
      <Input
        type='textarea'
        name='csv'
        label='CSV de estudiantes'
        placeholder='APELLIDOS;NOMBRES;PASSWORD;CORREO;GRUPO'
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        required
      />
      <SecondaryButton
        className='w-full'
        type='submit'
        pendingText='Guardando estudiantes...'
      >
        Importar estudiantes desde CSV
      </SecondaryButton>
    </form>
  )
}
