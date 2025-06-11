'use client'

import MainButton from '@/components/MainButton'
import Question from '@/components/Question'
import SecondaryButton from '@/components/SecondaryButton'
import { useToast } from '@/components/ui/use-toast'
import { createResponse } from '@/utils/clientQueries'
import { Evaluation, UserInfoSchema } from '@/utils/schema'
import useChileTime from '@/utils/hooks/useChileTime'
import { Console } from '@/utils/console'

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
  userInfo: UserInfoSchema
}

export default function EvaluationForm({ evaluation, userInfo }: Props) {
  const { toast } = useToast()
  const chileTime = useChileTime()
  if (!userInfo) return null

  const isDateEarlierThanNow = (date: Date) => {
    const differeceInTime = chileTime.getTime() - date.getTime()
    console.log({ chileTime, date, differeceInTime })
    const differenceInSeconds = differeceInTime / 1000
    return differenceInSeconds >= 1
  }

  const deadLineDay = evaluation.deadLine?.split('-')[2]
  const deadLineMonth = evaluation.deadLine?.split('-')[1]
  const deadLineYear = evaluation.deadLine?.split('-')[0]

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
    const values: Record<string, any> = {}
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
          values[name] = radios[i].id      
        }
      }
    })
    const valuesList = Object.values(values)

    if (isDateEarlierThanNow(new Date(evaluation.deadLine))) return toast({
      title: 'Error',
      description: `Esta evaluación ya no está disponible. Fecha límite: ${deadLineDay} / ${deadLineMonth} / ${deadLineYear}`,
      variant: 'destructive'
    })

    ;(async () => {
      try {
        const error = await createResponse(evaluation, userInfo.id as string, valuesList)
        if (error) throw new Error(error)
      } catch (error: any) {
        Console.Error(`Error creating response: ${error.message}`)
        if (error) return toast({
          title: 'Error',
          description: 'Hubo un error al enviar la evaluación',
          variant: 'destructive'
        })
      }
      toast({
        title: 'Éxito',
        description: 'Evaluación enviada correctamente',
        variant: 'success'
      })
    })()
  }

  if (isDateEarlierThanNow(new Date(evaluation.deadLine))) return (
    <section className='w-full sm:max-w-4xl mx-auto flex flex-col gap-6 bg-gray-100 dark:bg-gray-900 p-6 rounded-md'>
      Esta evaluación ya no está disponible
      <p className='dark:text-gray-100'>Fecha límite: { evaluation.deadLine ? `${deadLineDay} / ${deadLineMonth} / ${deadLineYear}` : 'Cargando' } </p>
    </section>
  )
  
  return (
    <form
      className='w-full sm:max-w-4xl mx-auto flex flex-col gap-6 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 p-6 rounded-md'
      id='printJS-form'
      onSubmit={ handleSubmit }
    >
      <legend className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>{ evaluation.title }</h1>
        <p>{ evaluation.instructions }</p>
        <p className='font-semibold text-red-500'>Fecha límite: { evaluation.deadLine ? `${deadLineDay} / ${deadLineMonth} / ${deadLineYear}` : 'Cargando' } </p>
        <p className='text-gray-700 dark:text-gray-300 text-sm'>Respondiendo como: <strong>{ `${userInfo.firstName} ${userInfo.lastName} ` }<em>{userInfo.email}</em></strong></p>
      </legend>
      { !evaluation.sections.length && (
        <p className='text-yellow-700 dark:text-yellow-300 text-sm'>
          No tienes compañeros asignados a esta evaluación. Por favor contacta al profesor para más información.
        </p>
      )}
      { [ ...evaluation.sections].map((section, index) => (
        <fieldset key={ section.mateId } className='w-full flex flex-col justify-center items-center'>
          <legend className='text-lg font-bold dark:text-gray-100'>{ section.title }</legend>
          { Object.entries(evaluation.questions).map(([questionKey, question]) => (
            <Question
              id={`${section.mateId}-${questionKey}`}
              key={`${section.mateId}-${questionKey}`}
              question={ question as any }
              sectionKey={ `${section.mateId}` }
            />
          ))}
        </fieldset>
      ))}
      <MainButton>Enviar</MainButton>
      <SecondaryButton onClick={() => window.print()}>Imprimir</SecondaryButton>
    </form>
  )
}
