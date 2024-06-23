interface OptionalInputProps {
  autocomplete?: string
  required?: boolean
  defaultValue?: string
}

interface Props extends OptionalInputProps {
  className?: string
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'datetime-local'
}

export default function Input({ className = '', label, name, type = 'text', ...props }: Props) {
  const inputStyles = 'rounded-md px-4 py-2 bg-inherit border'
  const commonProps = { id: name, name, className: inputStyles, ...props }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-md">{label}</label>
      {type === 'textarea' ? (
        <textarea {...commonProps} />
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  )
}
