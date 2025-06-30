'use client'

import Input from '@/components/Input'
import SecondaryButton from '@/components/SecondaryButton'
import { useState } from 'react'

export default function UploadStudentsForm() {
  const [csv, setCsv] = useState('')
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    group: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

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

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { lastName, firstName, email, group, password } = form
    const singleCsv = `${lastName};${firstName};${password};${email};${group}`
    try {
      const res = await fetch('/api/save-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv: singleCsv })
      })
      if (!res.ok) throw new Error('Fallo al agregar estudiante')
      alert('Estudiante agregado correctamente')
      setForm({ lastName: '', firstName: '', email: '', group: '', password: '' })
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert('Error al agregar estudiante')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-8'>
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 border border-foreground/20 rounded-md p-4'>
        <legend className='text-lg font-semibold'>Agregar estudiante individualmente</legend>
        <Input
          name='lastName'
          label='Apellidos'
          value={form.lastName}
          onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
          required
        />
        <Input
          name='firstName'
          label='Nombres'
          value={form.firstName}
          onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
          required
        />
        <Input
          name='email'
          label='Correo'
          type='email'
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
        />
        <Input
          name='group'
          label='Grupo'
          value={form.group}
          onChange={e => setForm(f => ({ ...f, group: e.target.value }))}
          required
        />
        <Input
          name='password'
          label='Contraseña'
          type='text'
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          required
        />
        <SecondaryButton
          className='w-full'
          type='submit'
          pendingText='Agregando estudiante...'
          disabled={loading}
        >
          Agregar estudiante
        </SecondaryButton>
      </form>
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
    </div>
  )
}
