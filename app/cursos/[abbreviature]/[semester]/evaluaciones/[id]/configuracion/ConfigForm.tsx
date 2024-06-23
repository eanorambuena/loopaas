"use client"

import Input from "@/components/Input"
import MainButton from "@/components/MainButton"
import { useToast } from '@/components/ui/use-toast'
import { Evaluation, LinearQuestion } from "@/utils/schema"
import { createClient } from "@/utils/supabase/client"
import QuestionForm from "./QuestionForm"
import SecondaryButton from "@/components/SecondaryButton"

interface Props {
  evaluation: Evaluation
}

export default function ConfigForm({ evaluation }: Props) {
  const supabase = createClient()
  const { toast } = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const entries = Object.fromEntries(formData.entries())
    const questionData = Object.entries(entries).filter(([key, value]) => key.includes('-'))
    /* parse questions in format:
        {id: {type: 'linear', required: true, criteria: [{label: 'criterion', weight: 1}, {label: 'criterion1', weight: 2}]}
      for example, from format:
        [['id-0-criterion, 'criterion'], ['id-0-weight', '1'], ['id-1-criterion', 'criterion1'], ['id-1-weight', '2']]
    */
   // TODO: add support for non-linear questions
    const questions: Record<string, LinearQuestion> = {}
    questionData.forEach(([key, value]) => {
      const [id, index, type] = key.split('-')
      if (!questions[id]) {
        const required = entries[`${id}-required`] === 'on'
        questions[id] = {
          type: 'linear',
          required: required,
          criteria: []
        } as LinearQuestion
      }
      if (type === 'criterion') {
        questions[id].criteria.push({
          label: value as string,
          weight: parseInt(entries[`${id}-${index}-weight`] as string)
        })
      }
    })

    const newEvaluation = {
      title: entries.title,
      instructions: entries.instructions,
      deadLine: entries.deadLine,
      questions
    }

    const { error } = await supabase
      .from('evaluations')
      .update(newEvaluation)
      .eq('id', evaluation.id)

    if (error) return toast({
      title: 'Error',
      description: 'Ocurrió un error al guardar la evaluación',
      variant: 'destructive'
    })
    
    toast({
      title: 'Éxito',
      description: 'Evaluación guardada correctamente',
      variant: 'success'
    })
  }

  const deleteQuestion = (id: string) => {
    delete evaluation.questions[id]
  }
  
  return (
    <form className="animate-in flex-1 flex flex-col w-full justify-center items-center gap-2 text-foreground" onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-6">
        <Input label="Título" name="title" required defaultValue={evaluation.title} />
        <Input type="textarea" label="Instrucciones" name="instructions" required defaultValue={evaluation.instructions} />
        <Input type="date" label="Fecha de entrega" name="deadLine"required defaultValue={evaluation.deadLine} />
        { Object.entries(evaluation.questions).map(([id, question]) => (
          <QuestionForm id={id} question={question} key={id} deleteQuestion={deleteQuestion} />
        )) }
        <SecondaryButton onClick={() => {
          const id = Object.keys(evaluation.questions).length
          evaluation.questions[id] = {
            type: 'linear',
            required: false,
            criteria: []
          }}}
        >
          Agregar pregunta
        </SecondaryButton>
        <MainButton pendingText="Guardando evaluación...">
          Guardar evaluación
        </MainButton>
      </fieldset>
    </form>
  )
}
