'use client'

import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

export function AddProfessorForm({ courseId }: { courseId: string }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/add-professor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, courseId })
    })

    setLoading(false)

    if (res.ok) {
      toast({
        title: 'Profesor agregado',
        description: `Se ha agregado al profesor ${email} al curso.`,
        variant: 'success'
      })
      setEmail('')
      location.reload()
    } else {
      const error = await res.json()
      toast({
        title: 'Error al agregar profesor',
        description: error.message || 'Ocurrió un error al intentar agregar al profesor.',
        variant: 'destructive'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mb-4 flex gap-2'>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Correo del profesor'
        required
        className='border px-3 py-1 rounded w-72'
      />
      <button type='submit' className='bg-blue-600 text-white px-4 py-1 rounded' disabled={loading}>
        {loading ? 'Agregando...' : 'Agregar profesor'}
      </button>
    </form>
  )
}
