import { SubmitButton, SubmitButtonProps } from './SubmitButton'

interface Props extends SubmitButtonProps {
  children: React.ReactNode
  className?: string
}

export default function MainButton({ children, className = '', ...props }: Props) {
  return (
    <SubmitButton
      className={`bg-emerald-700 text-emerald-50 rounded-md px-4 py-2 mb-2 font-semibold hover:scale-105 transition-transform duration-300  ${className}`}
      {...props}
    >
      {children}
    </SubmitButton>
  )
}
