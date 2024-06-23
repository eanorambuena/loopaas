import DeleteIcon from '@/components/icons/DeleteIcon'
import Input from '@/components/Input'
import SecondaryButton from '@/components/SecondaryButton'
import { LinearQuestion, Question } from '@/utils/schema'
import { useState } from 'react'
import QuestionFieldset from './QuestionFieldset'

interface Props {
  id: string
  question: Question
  deleteQuestion: (id: string) => void
}

export default function QuestionForm({ id, question, deleteQuestion }: Props) {
  const [questionState, setQuestion] = useState<Question>(question)

  if (question.type !== 'linear') return (
    <QuestionFieldset deleteQuestion={deleteQuestion} id={id} question={question}>
      <Input type={question.type} label={`Pregunta ${id}`} name={id} required defaultValue={JSON.stringify(question)} />
    </QuestionFieldset>
  )

  const addCriterion = () => {
    question.criteria.push({ label: '', weight: 0 })
    setQuestion({ ...question })
  }

  const deleteCriterion = (index: number) => {
    question.criteria.splice(index, 1)
    setQuestion({ ...question })
  }

  return (
    <QuestionFieldset deleteQuestion={deleteQuestion} id={id} question={question}>
      {(questionState as LinearQuestion).criteria.map((criterion, i) => (
        <div key={i} className='flex gap-4'>
          <Input label='Criterio' name={`${id}-${i}-criterion`} required defaultValue={criterion.label} />
          <Input
            label='Peso'
            name={`${id}-${i}-weight`}
            type='number'
            className='max-w-fit sm:max-w-none'
            required
            defaultValue={criterion.weight.toString()}
          />
          <SecondaryButton
            aria-label='Eliminar pregunta'
            className='border-red-300 text-red-500'
            onClick={() => deleteCriterion(i)}
          >
            <DeleteIcon size={40} />
          </SecondaryButton>
        </div>
      ))}
      <SecondaryButton key={id} pendingText='Añadiendo criterio...' onClick={addCriterion}>
        Agregar criterio
      </SecondaryButton>
    </QuestionFieldset>
  )
}
