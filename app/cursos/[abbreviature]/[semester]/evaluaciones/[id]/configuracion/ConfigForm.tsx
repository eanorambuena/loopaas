'use client'

import Input from '@/components/Input'
import MainButton from '@/components/MainButton'
import { useToast } from '@/components/ui/use-toast'
import { Evaluation, LinearQuestion } from '@/utils/schema'
import { createClient } from '@/utils/supabase/client'
import QuestionForm from './QuestionForm'
import SecondaryButton from '@/components/SecondaryButton'
import { useState } from 'react'

interface Props {
  evaluation: Evaluation
}

export default function ConfigForm({ evaluation }: Props) {
  const supabase = createClient()
  const { toast } = useToast()
  const [questions, setQuestions] = useState<Record<string, LinearQuestion>>(evaluation.questions)

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
    const _questions: Record<string, LinearQuestion> = {}
    questionData.forEach(([key, value]) => {
      const [id, index, type] = key.split('-')
      if (!_questions[id]) {
        const required = entries[`${id}-required`] === 'on'
        _questions[id] = {
          type: 'linear',
          required: required,
          criteria: []
        } as LinearQuestion
      }
      if (type === 'criterion') {
        _questions[id].criteria.push({
          label: value as string,
          weight: parseInt(entries[`${id}-${index}-weight`] as string)
        })
      }
    })
    setQuestions(_questions)

    const newEvaluation = {
      title: entries.title,
      instructions: entries.instructions,
      deadLine: entries.deadLine,
      questions: _questions
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
    setQuestions({ ...questions })
  }

  const addQuestion = () => {
    const id = Object.keys(questions).length
    evaluation.questions[id] = {
      type: 'linear',
      required: false,
      criteria: []
    }
    setQuestions({ ...questions })
  }
  
  return (
    <form className='animate-in flex-1 flex flex-col w-full justify-center items-center gap-6 text-foreground' onSubmit={handleSubmit}>
      <Input label='Título' name='title' required defaultValue={evaluation.title} className='w-full' />
      <Input type='textarea' label='Instrucciones' name='instructions' required defaultValue={evaluation.instructions} className='w-full' />
      <Input type='date' label='Fecha de entrega' name='deadLine'required defaultValue={evaluation.deadLine} className='w-full' />
      { Object.entries(questions).map(([id, question]) => (
        <QuestionForm id={id} question={question} key={id} deleteQuestion={deleteQuestion} />
      )) }
      <SecondaryButton onClick={addQuestion} className='w-full'>
        Agregar pregunta
      </SecondaryButton>
      <MainButton pendingText='Guardando evaluación...' className='w-full'>
        Guardar evaluación
      </MainButton>
    </form>
  )
}
