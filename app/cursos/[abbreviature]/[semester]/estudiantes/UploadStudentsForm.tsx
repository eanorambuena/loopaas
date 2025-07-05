'use client'

import Input from '@/components/Input'
import MainButton from '@/components/MainButton'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

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
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch('/api/save-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv })
      })

      if (!res.ok) throw new Error('Fallo la carga')

      toast({
        title: 'Éxito',
        description: 'Estudiantes cargados correctamente',
        variant: 'success'
      })
      setCsv('')
      setTimeout(() => window.location.reload(), 1200)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error al guardar estudiantes',
        variant: 'destructive'
      })
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
      toast({
        title: 'Éxito',
        description: 'Estudiante agregado correctamente',
        variant: 'success'
      })
      setForm({ lastName: '', firstName: '', email: '', group: '', password: '' })
      setTimeout(() => window.location.reload(), 1200)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Error al agregar estudiante',
        variant: 'destructive'
      })
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
        <MainButton
          className='w-full'
          type='submit'
          pendingText='Agregando estudiante...'
          disabled={loading}
        >
          Agregar estudiante
        </MainButton>
      </form>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4 border border-foreground/20 rounded-md p-4'>
        <legend className='text-lg flex flex-col gap-2'>
          <h3 className='font-semibold'>Importar estudiantes desde CSV</h3>
          <p>Si no desea ingresar los estudiantes uno por uno, puede importarlos desde un CSV con el siguiente formato:</p>
          <span className='text-sm'>APELLIDOS;NOMBRES;PASSWORD;CORREO;GRUPO</span>
          <p>El archivo debe estar en formato CSV y tener las columnas en el orden especificado.</p>
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
        <MainButton
          className='w-full'
          type='submit'
          pendingText='Guardando estudiantes...'
        >
          Importar estudiantes desde CSV
        </MainButton>
      </form>
    </div>
  )
}
