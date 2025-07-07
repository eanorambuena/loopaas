'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Trash2Icon } from 'lucide-react'
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
              
              // Primero verificar si hay datos relacionados
              const checkResponse = await fetch('/api/delete-course', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId })
              })
              
              if (!checkResponse.ok) {
                setLoading(false)
                dismiss(toastObj.id)
                toast({
                  title: 'Error',
                  description: 'No se pudo verificar los datos del curso.',
                  variant: 'destructive'
                })
                return
              }
              
              const checkData = await checkResponse.json()
              
              // Si hay datos relacionados, mostrar segundo toast de confirmación
              if (checkData.hasRelatedData) {
                dismiss(toastObj.id)
                
                const dataSummary = checkData.dataSummary
                const summaryText = [
                  dataSummary.students > 0 && `${dataSummary.students} estudiante(s)`,
                  dataSummary.evaluations > 0 && `${dataSummary.evaluations} evaluación(es)`,
                  dataSummary.professors > 0 && `${dataSummary.professors} profesor(es)`,
                  dataSummary.responses > 0 && `${dataSummary.responses} respuesta(s)`
                ].filter(Boolean).join(', ')
                
                const secondToastObj = toast({
                  title: '⚠️ Datos relacionados encontrados',
                  description: `Este curso tiene: ${summaryText}. ¿Estás seguro de que quieres eliminar todo?`,
                  variant: 'destructive',
                  action: (
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => dismiss(secondToastObj.id)}>
                        Cancelar
                      </Button>
                      <Button variant="destructive" size="sm"
                        onClick={async () => {
                          await performDelete(secondToastObj.id)
                        }}
                        disabled={loading}
                      >
                        {loading ? 'Eliminando...' : 'Eliminar todo'}
                      </Button>
                    </div>
                  )
                })
              } else {
                // No hay datos relacionados, proceder directamente
                await performDelete(toastObj.id)
              }
            }}
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Eliminar'}
          </Button>
        </div>
      )
    })
  }

  const performDelete = async (toastId: string) => {
    setLoading(true)
    
    try {
      const deleteResponse = await fetch('/api/delete-course', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      })
      
      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json()
        throw new Error(errorData.error || 'Error al eliminar el curso')
      }
      
      dismiss(toastId)
      toast({
        title: 'Curso eliminado',
        description: 'El curso fue eliminado correctamente.',
        variant: 'success'
      })
      router.push('/cursos')
    } catch (error) {
      console.error('Error deleting course:', error)
      dismiss(toastId)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Ocurrió un error al eliminar el curso.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleDelete} className="mt-4 w-fit self-end bg-red-500 hover:bg-red-600 text-white dark:bg-red-700 dark:hover:bg-red-800 flex items-center gap-2">
      <Trash2Icon size={20} />
      Eliminar curso
    </Button>
  )
}
