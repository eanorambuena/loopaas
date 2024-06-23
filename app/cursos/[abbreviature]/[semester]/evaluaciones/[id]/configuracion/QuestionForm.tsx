import Input from "@/components/Input"
import SecondarySubmitButton from "@/components/SecondarySubmitButton"
import { Question } from "@/utils/schema"

interface Props {
  id: string
  question: Question
}

export default function QuestionForm({ id, question }: Props) {
  if (question.type !== 'linear') return (
    <>
      <legend className="text-xl font-bold">Pregunta {id}</legend>
      <Input type={question.type} label={`Pregunta ${id}`} name={id} required defaultValue={JSON.stringify(question)} />
    </>
  )

  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="text-xl font-bold">Pregunta {id}</legend>
      {question.criteria.map((criterion, i) => (
        <div key={i} className="flex gap-4">
          <Input label="Criterio" name={`${id}-${i}-criterion`} required defaultValue={criterion.label} />
          <Input label="Peso" name={`${id}-${i}-weight`} type="number" required defaultValue={criterion.weight.toString()} />
        </div>
      ))}
      <SecondarySubmitButton key={id} pendingText="Añadiendo criterio...">
        Añadir criterio
      </SecondarySubmitButton>
    </fieldset>
  )
}