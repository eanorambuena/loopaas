"use client"

import { SubmitButton } from "@/components/SubmitButton"
import { fetchCourse } from "@/utils/canvas"
import { createClient } from "@/utils/supabase/client"
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'

const DEFAULT_COLOR = '#9AE6B4'

export default function NewCourseForm() {
  const supabase = createClient()
  const { toast } = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const color = formData.get('color') as string
    const canvasId = formData.get('canvasId') as string
    const response = await fetchCourse(canvasId)
    if (!response) {
      return toast({
        title: 'Error',
        description: 'No se encontró el curso en Canvas',
        variant: 'destructive'
      })
    }
    if (response.code == "23505") {
      return toast({
        title: 'Error',
        description: 'El curso ya existe',
        variant: 'destructive'
      })
    }
    const year = response.start_at?.split('-')[0] ?? new Date().getFullYear()
    const month = parseInt(response.start_at?.split('-')[1]) ?? new Date().getMonth()
    const semester = month < 7 ? 1 : 2 
    const { data, error } = await supabase
      .from('courses')
      .insert([
        {
          title: response.name,
          abbreviature: response.course_code,
          semester: `${year}-${semester}`,
          color: `bg-[${color}]`,
          canvasId
        }
      ])
    if (error) {
      return toast({
        title: 'Error',
        description: `Hubo un error al crear el curso. Por favor intenta de nuevo o ponte en contacto con nosotros. CÓDIGO DE ERROR ${response.error.message}`,
        variant: 'destructive'
      })
    }
    return toast({
        title: 'Éxito',
        description: 'Curso creado correctamente',
        variant: 'success'
    })
  }

  return (
    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" onSubmit={handleSubmit}>
      <label htmlFor="canvasId" className="text-md">ID Canvas</label>
      <input type="text" id="canvasId" name="canvasId" className="rounded-md px-4 py-2 bg-inherit border mb-6" />
      <label htmlFor="color" className="text-md">Color</label>
      <input type="color" id="color" name="color" defaultValue={DEFAULT_COLOR} className="rounded-md bg-inherit border mb-6" />
      <SubmitButton pendingText="Creando curso..." className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 font-bold">
        Crear Curso
      </SubmitButton>
      <Toaster />
    </form>
  )
}
