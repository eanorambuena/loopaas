'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import DeleteCourseButton from '../DeleteCourseButton'

export default function ConfiguracionCursoPage() {
  const router = useRouter()
  const params = useParams() as { abbreviature: string, semester: string }
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [course, setCourse] = useState<any>(null)
  const [isProfessor, setIsProfessor] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await fetch(`/api/course-info?abbreviature=${params.abbreviature}&semester=${params.semester}`)
      const data = await res.json()
      setCourse(data.course)
      setIsProfessor(data.isProfessor)
      setLoading(false)
    }
    fetchData()
  }, [params.abbreviature, params.semester])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/update-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...course })
    })
    setSaving(false)
    if (res.ok) {
      toast({ title: 'Curso actualizado', variant: 'success' })
      router.refresh()
    } else {
      toast({ title: 'Error al actualizar', variant: 'destructive' })
    }
  }

  if (loading) return <div className="p-6">Cargando...</div>
  if (!course) return <div className="p-6">No se encontró el curso</div>

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-4">Configuración del curso</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-4 bg-card p-6 rounded-lg border">
        <Input label="Nombre del curso" name="title" value={course.title || ''} onChange={handleChange} required />
        <Input label="Abreviatura" name="abbreviature" value={course.abbreviature || ''} onChange={handleChange} required />
        <Input label="Semestre" name="semester" value={course.semester || ''} onChange={handleChange} required />
        <Input label="Color" name="color" type="color" value={course.color || '#eeeeee'} onChange={handleChange} />
        <Input label="URL de imagen" name="img" value={course.img || ''} onChange={handleChange} />
        <Button type="submit" disabled={saving} className="flex items-center gap-2">
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </form>
      {isProfessor && (
        <div className="mt-8 border-2 border-red-600 rounded-lg p-6 bg-red-50 dark:bg-red-950/90">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
            <span aria-label="Peligro" title="Peligro">⚠️</span> Danger Zone
          </h2>
          <p className="mb-4 font-semibold">Eliminar el curso es irreversible. Todos los datos asociados se perderán.</p>
          <DeleteCourseButton courseId={course.id} />
        </div>
      )}
    </div>
  )
} 