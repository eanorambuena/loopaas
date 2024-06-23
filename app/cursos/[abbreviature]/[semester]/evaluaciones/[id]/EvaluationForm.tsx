'use client'

import Question from '@/components/Question'
import { SubmitButton } from '@/components/SubmitButton'
import { useToast } from '@/components/ui/use-toast'
import { Evaluation } from '@/utils/schema'

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

interface Props {
  evaluation: Evaluation
}

export default function EvaluationForm({ evaluation }: Props) {
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

    const radios = document.getElementsByTagName('input')
    const value: Record<string, any> = {}
    const names = []
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].type === 'radio') {
        names.push(radios[i].name)
      }
    }
    // Adapted from https://stackoverflow.com/a/1423868
    names.forEach((name) => {
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked && radios[i].name === name) {
          value[name] = radios[i].id;      
        }
      }
    })
    console.log(value)

    toast({
      title: 'Éxito',
      description: 'Formulario enviado correctamente',
      variant: 'success'
    })

    const responses = Object.groupBy(entries, ([key]) => key.split('-')[0])
    console.log({responses})
  }

  const deadLineDay = evaluation.deadLine?.split('-')[2]
  const deadLineMonth = evaluation.deadLine?.split('-')[1]
  const deadLineYear = evaluation.deadLine?.split('-')[0]
  
  return (
    <form onSubmit={ handleSubmit } className='w-full sm:max-w-4xl mx-auto flex flex-col gap-6 bg-gray-100 dark:bg-gray-900 p-6 rounded-md'>
      <h1 className='text-2xl font-bold dark:text-gray-100'>{ evaluation.title }</h1>
      <p className='dark:text-gray-100'>{ evaluation.instructions }</p>
      <p className='dark:text-gray-100'>Fecha límite: { evaluation.deadLine ? `${deadLineDay} / ${deadLineMonth} / ${deadLineYear}` : 'Cargando' } </p>
      { [ ...evaluation.sections].map((title, index) => (
        <fieldset key={ index } className='w-full flex flex-col justify-center items-center'>
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
        pendingText="Enviando evaluación..."
      >
        Enviar
      </SubmitButton>
    </form>
  )
}
