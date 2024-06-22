'use client'

import { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import Question from '@/components/Question'
import { SubmitButton } from './SubmitButton'

export type Evaluation = {
  title: string
  instructions: string
  deadLine: string
  sections: Array<string>
  questions: Record<string, any>
}

export default function Form({ evaluation }: { evaluation: Evaluation }) {
  const [values, setValues] = useState({})
  const { toast } = useToast()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const entries = Array.from(data.entries())

    let numberOfQuestions = getNumberOfQuestions(evaluation)
    if (entries.length < numberOfQuestions) {
      return toast({
        title: 'Error',
        description: 'Por favor responde todas las preguntas',
        variant: 'destructive'
      })
    }

    let formData: Record<any, any>[] = []
    entries.forEach(([key, value]) => {
      formData.push({ [key]: value })
    })
    console.log(formData)

    toast({
      title: 'Éxito',
      description: 'Formulario enviado correctamente',
      variant: 'success'
    })
  }

  const deadLineDay = evaluation.deadLine?.split('-')[2]
  const deadLineMonth = evaluation.deadLine?.split('-')[1]
  const deadLineYear = evaluation.deadLine?.split('-')[0]
  
  return (
    <>
      <form onSubmit={ handleSubmit } className='w-full sm:max-w-4xl mx-auto flex flex-col gap-6 bg-gray-100 dark:bg-gray-900 p-6 rounded-md'>
        <h1 className='text-2xl font-bold dark:text-gray-100'>{ evaluation.title }</h1>
        <p className='dark:text-gray-100'>{ evaluation.instructions }</p>
        <p className='dark:text-gray-100'>Fecha límite: { evaluation.deadLine ? `${deadLineDay} / ${deadLineMonth} / ${deadLineYear}` : 'Cargando' } </p>
        { [ ...evaluation.sections].map((title, index) => (
          <fieldset key={ index } className='w-full'>
            <legend className='text-lg font-bold dark:text-gray-100'>{ title }</legend>
            { Object.entries(evaluation.questions).map(([questionKey, question]) => (
              <Question
                id={`${index}-${questionKey}`}
                key={`${index}-${questionKey}`}
                question={ question as any }
                sectionKey={ `${index}` }
              />
            ))}
          </fieldset>
        ))}
        <SubmitButton
          className="w-full bg-emerald-700 rounded-md px-4 py-2 text-white mb-2 font-bold"
          pendingText="Enviando formulario..."
        >
          Enviar
        </SubmitButton>
      </form>
      <Toaster />
    </>
  )
}

function getNumberOfQuestions(evaluation: Evaluation) {
  let numberOfQuestions = 0;
  [...Object.keys(evaluation.questions)].forEach((questionKey) => {
    const question = evaluation.questions[questionKey]
    if (question.type !== 'linear') {
      numberOfQuestions += 1
      return
    }
    numberOfQuestions += question.criteria.length
  })
  numberOfQuestions *= evaluation.sections.length
  return numberOfQuestions
}
