import Input from "@/components/Input"
import SecondarySubmitButton from "@/components/SecondarySubmitButton"
import { Question } from "@/utils/schema"

interface Props {
  id: string
  question: Question
  deleteQuestion: (id: string) => void
}

export default function QuestionForm({ id, question, deleteQuestion }: Props) {
  if (question.type !== 'linear') return (
    <fieldset className="flex flex-col gap-4 border-t border-b border-foreground/20 p-4">
      <div className="flex gap-4">
        <legend className="text-xl font-bold">Pregunta {id}</legend>
        <Input label='Requerida' name={`${id}-required`} type='checkbox' defaultChecked={question.required} className="flex-row" />
        <SecondarySubmitButton onClick={() => deleteQuestion(id)}>Eliminar pregunta</SecondarySubmitButton>
      </div>
      <Input type={question.type} label={`Pregunta ${id}`} name={id} required defaultValue={JSON.stringify(question)} />
    </fieldset>
  )

  const handleClick = () => {
    question.criteria.push({ label: '', weight: 0 })
  }

  return (
    <fieldset className="flex flex-col gap-4 border-t border-b border-foreground/20 p-4">
      <div className="flex gap-4">
        <legend className="text-xl font-bold">Pregunta {id}</legend>
        <Input label='Requerida' name={`${id}-required`} type='checkbox' defaultChecked={question.required} className="flex-row" />
        <SecondarySubmitButton onClick={() => deleteQuestion(id)}>Eliminar pregunta</SecondarySubmitButton>
      </div>
      {question.criteria.map((criterion, i) => (
        <div key={i} className="flex gap-4">
          <Input label="Criterio" name={`${id}-${i}-criterion`} required defaultValue={criterion.label} />
          <Input label="Peso" name={`${id}-${i}-weight`} type="number" required defaultValue={criterion.weight.toString()} />
          <SecondarySubmitButton onClick={() => question.criteria.splice(i, 1)}>Eliminar criterio</SecondarySubmitButton>
        </div>
      ))}
      <SecondarySubmitButton key={id} pendingText="Añadiendo criterio..." onClick={handleClick}>
        Agregar criterio
      </SecondarySubmitButton>
    </fieldset>
  )
}