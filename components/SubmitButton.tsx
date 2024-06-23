"use client"

import { useFormStatus } from "react-dom"
import { type ComponentProps } from "react"

export type SubmitButtonProps = ComponentProps<"button"> & {
  pendingText?: string
}

export function SubmitButton({ children, pendingText, ...props }: SubmitButtonProps) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction

  return (
    <button {...props} type="submit" aria-disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  )
}
