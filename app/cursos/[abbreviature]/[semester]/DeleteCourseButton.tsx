'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteCourseButton({ courseId }: { courseId: string }) {
  const { toast, dismiss } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = () => {
    const toastObj = toast({
      title: '¿Estás seguro de eliminar el curso?',
      description: 'Esta acción no se puede deshacer.',
      variant: 'destructive',
      action: (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => dismiss(toastObj.id)}>
            Cancelar
          </Button>
          <Button variant="destructive" size="sm"
            onClick={async () => {
              setLoading(true)
              await fetch('/api/delete-course', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId })
              })
              setLoading(false)
              dismiss(toastObj.id)
              toast({
                title: 'Curso eliminado',
                description: 'El curso fue eliminado correctamente.',
                variant: 'success'
              })
              router.push('/cursos')
            }}
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      )
    })
  }
  return (
    <Button variant="destructive" onClick={handleDelete} className="mt-4 w-fit self-end">Eliminar curso</Button>
  )
} 