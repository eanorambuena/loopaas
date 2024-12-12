'use client'

import MainButton from '@/components/MainButton'
import Question from '@/components/Question'
import SecondaryButton from '@/components/SecondaryButton'
import { useToast } from '@/components/ui/use-toast'
import { createResponse } from '@/utils/clientQueries'
import { Evaluation, UserInfoSchema } from '@/utils/schema'

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

const isDateOlderByAtLeastHalfDay = (firstDate: Date, secondDate: Date) => {
  const differeceInTime = firstDate.getTime() - secondDate.getTime()
  const differenceInDays = differeceInTime / (1000 * 3600 * 12)
  return differenceInDays >= 1
}

interface Props {
  evaluation: Evaluation
  userInfo: UserInfoSchema
}

export default function EvaluationForm({ evaluation, userInfo }: Props) {
  const { toast } = useToast()
  if (!userInfo) return null

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

    if (isDateOlderByAtLeastHalfDay(new Date(evaluation.deadLine), new Date())) return toast({
      title: 'Error',
      description: `Esta evaluación ya no está disponible. Fecha límite: ${deadLineDay} / ${deadLineMonth} / ${deadLineYear}`,
      variant: 'destructive'
    })

    ;(async () => {
      const error = await createResponse(evaluation, userInfo.id as string, valuesList)
      if (error) return toast({
        title: 'Error',
        description: 'Hubo un error al enviar la evaluación',
        variant: 'destructive'
      })
      toast({
        title: 'Éxito',
        description: 'Evaluación enviada correctamente',
        variant: 'success'
      })
    })()
  }

  if (isDateOlderByAtLeastHalfDay(new Date(evaluation.deadLine), new Date())) return (
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
