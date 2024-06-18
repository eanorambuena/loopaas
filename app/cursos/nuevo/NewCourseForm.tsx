"use client"

import { SubmitButton } from "@/components/SubmitButton"
import { createClient } from "@/utils/supabase/client"

export default function NewCourseForm() {
  const supabase = createClient()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get('title')
    const abbreviature = formData.get('abbreviature')
    const semester = formData.get('semester')
    const color = formData.get('color')
    const canvasId = formData.get('canvasId')
    const { data, error } = await supabase
      .from('courses')
      .insert([
        { title, abbreviature, semester, color: `bg-[${color}]`, canvasId }
      ])
    if (error) {
      console.error(error)
    }
    else {
      console.log('Curso creado:', data)
    }
  }

  return (
    <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" onSubmit={handleSubmit}>
      <label htmlFor="title" className="text-md">Título</label>
      <input type="text" id="title" name="title" className="rounded-md px-4 py-2 bg-inherit border mb-6" />
      <label htmlFor="abbreviature" className="text-md">Abreviatura</label>
      <input type="text" id="abbreviature" name="abbreviature" className="rounded-md px-4 py-2 bg-inherit border mb-6" />
      <label htmlFor="semester" className="text-md">Semestre</label>
      <input type="text" id="semester" name="semester" className="rounded-md px-4 py-2 bg-inherit border mb-6" />
      <label htmlFor="color" className="text-md">Color</label>
      <input type="color" id="color" name="color" defaultValue={'#000000'} className="rounded-md bg-inherit border mb-6" />
      <label htmlFor="canvasId" className="text-md">ID Canvas</label>
      <input type="text" id="canvasId" name="canvasId" className="rounded-md px-4 py-2 bg-inherit border mb-6" />
      <SubmitButton pendingText="Creando curso...">
        Crear Curso
      </SubmitButton>
    </form>
  )
}
