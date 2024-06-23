"use client"

import { fetchCourse } from "@/utils/canvas"
import { createClient } from "@/utils/supabase/client"
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import Input from "@/components/Input"
import MainSubmitButton from "@/components/MainSubmitButton"
import { Evaluation } from "@/utils/schema"

interface Props {
  evaluation: Evaluation
}

export default function ConfigForm({ evaluation }: Props) {
  const supabase = createClient()
  const { toast } = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    return toast({
      title: 'Éxito',
      description: 'Curso creado correctamente',
      variant: 'success'
    })
  }

  return (
    <form className="animate-in flex-1 flex flex-col w-full justify-center items-center gap-2 text-foreground" onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-6 sm:max-w-md">
        <Input label="Título" name="title" required defaultValue={evaluation.title} />
        <Input type="textarea" label="Instrucciones" name="instructions" required defaultValue={evaluation.instructions} />
        <Input type="datetime-local" label="Fecha de entrega" name="deadLine"required defaultValue={evaluation.deadLine} />
        <Input label="Secciones" name="sections" required defaultValue={evaluation.sections.join(',')} />
        <Input type="textarea" label="Preguntas" name="questions" required defaultValue={JSON.stringify(evaluation.questions)} />
        <MainSubmitButton pendingText="Creando curso...">
          Crear Curso
        </MainSubmitButton>
      </fieldset>
      <Toaster />
    </form>
  )
}
