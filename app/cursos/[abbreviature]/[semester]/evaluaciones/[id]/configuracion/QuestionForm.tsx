import Input from "@/components/Input"
import SecondaryButton from "@/components/SecondaryButton"
import { LinearQuestion, Question } from "@/utils/schema"
import { useState } from "react"

interface Props {
  id: string
  question: Question
  deleteQuestion: (id: string) => void
}

export default function QuestionForm({ id, question, deleteQuestion }: Props) {
  const [questionState, setQuestion] = useState<Question>(question)

  if (question.type !== 'linear') return (
    <fieldset className="flex flex-col gap-4 border-t border-b border-foreground/20 p-4">
      <div className="flex gap-4 justify-between items-center">
        <legend className="text-xl font-bold">Pregunta {id}</legend>
        <Input label='Requerida' name={`${id}-required`} type='checkbox' defaultChecked={question.required} className="!flex-row justify-center items-center" />
        <SecondaryButton onClick={() => deleteQuestion(id)}>Eliminar pregunta</SecondaryButton>
      </div>
      <Input type={question.type} label={`Pregunta ${id}`} name={id} required defaultValue={JSON.stringify(question)} />
    </fieldset>
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
    <fieldset className="flex flex-col gap-4 border-t border-b border-foreground/20 p-4">
      <div className="flex gap-4 justify-between items-center">
        <legend className="text-xl font-bold">Pregunta {id}</legend>
        <Input label='Requerida' name={`${id}-required`} type='checkbox' defaultChecked={question.required} className="!flex-row justify-center items-center" />
        <SecondaryButton onClick={() => deleteQuestion(id)}>Eliminar pregunta</SecondaryButton>
      </div>
      {(questionState as LinearQuestion).criteria.map((criterion, i) => (
        <div key={i} className="flex gap-4">
          <Input label="Criterio" name={`${id}-${i}-criterion`} required defaultValue={criterion.label} />
          <Input label="Peso" name={`${id}-${i}-weight`} type="number" required defaultValue={criterion.weight.toString()} />
          <SecondaryButton onClick={() => deleteCriterion(i)}>
            Eliminar criterio
          </SecondaryButton>
        </div>
      ))}
      <SecondaryButton key={id} pendingText="Añadiendo criterio..." onClick={addCriterion}>
        Agregar criterio
      </SecondaryButton>
    </fieldset>
  )
}