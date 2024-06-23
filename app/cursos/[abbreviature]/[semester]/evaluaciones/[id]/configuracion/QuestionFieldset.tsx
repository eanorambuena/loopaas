import DeleteIcon from '@/components/icons/DeleteIcon'
import Input from '@/components/Input'
import SecondaryButton from '@/components/SecondaryButton'

interface Props {
  deleteQuestion: (id: string) => void
  id: string
  question: any
  children: React.ReactNode
}

export default function QuestionFieldset({ deleteQuestion, id, question, children } : Props) {
  return (
    <div className='flex flex-col gap-4 w-full border border-foreground/20 rounded-md p-4'>
      <div className='flex gap-4 justify-between items-center w-full'>
        <legend className='text-xl font-bold'>Pregunta {id}</legend>
        <Input label='Requerida' name={`${id}-required`} type='checkbox' defaultChecked={question.required} className='!flex-row justify-center items-center' />
        <SecondaryButton
          aria-label='Eliminar pregunta'
          className='border-red-300 text-red-500 !p-auto aspect-square'
          onClick={() => deleteQuestion(id)}
        >
          <DeleteIcon size={24} />
        </SecondaryButton>
      </div>
      {children}
    </div>
  )
}
