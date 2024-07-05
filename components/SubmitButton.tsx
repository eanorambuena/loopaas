'use client'

import { useFormStatus } from 'react-dom'
import { type ComponentProps } from 'react'

export type SubmitButtonProps = ComponentProps<'button'> & {
  pendingText?: string
  type?: 'submit' | 'button'
}

export function SubmitButton({ children, pendingText, type = 'submit', ...props }: SubmitButtonProps) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction

  return (
    <button {...props} type={type} aria-disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  )
}
