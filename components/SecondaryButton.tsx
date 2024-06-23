import { SubmitButton, SubmitButtonProps } from "./SubmitButton"

interface Props extends SubmitButtonProps {
  children: React.ReactNode
  className?: string
}

export default function SecondaryButton({ children, className = '', type = 'button', ...props }: Props) {
  return (
    <SubmitButton
      className={`border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </SubmitButton>
  )
}
