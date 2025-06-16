import { QuestionType } from '@/utils/schema'
import { input } from '@nextui-org/react'

interface OptionalInputProps {
  autocomplete?: string
  required?: boolean
  defaultValue?: string
  defaultChecked?: boolean
  placeholder?: string
  accept?: string
  disabled?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

interface Props extends OptionalInputProps {
  className?: string
  inputClassName?: string
  children?: React.ReactNode
  label: string
  name: string
  type?: 'text' | 'email' | 'select' | 'password' | 'number' | 'textarea' | 'datetime-local' | 'date' | 'time' | 'file' | 'color' | QuestionType
}

export default function Input({ className = '', children, label, name, type = 'text', inputClassName = '', ...props }: Props) {
  const inputStyles = `rounded-md ${type === 'color' ? '' : 'px-4 py-2'} bg-inherit border ${inputClassName}`
  const commonProps = { id: name, name, className: inputStyles, ...props }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-md">{label}</label>
      {type === 'textarea' ? (
        <textarea {...commonProps} rows={4} />
      ) : type === 'select' ? (
        <select {...commonProps}>
          {children}
        </select>
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  )
}
