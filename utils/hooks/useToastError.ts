import { useToast } from '@/components/ui/use-toast'
import { useCallback } from 'react'

export interface ErrorWithStatus {
  name: string
  status: number
  message?: string
}

const errorSuffixes = {
  application: 0,
  supabase: 1,
  vercel: 2,
  user: 3
}

const supportErrors: Record<string, any> = {
  NotUcEmailError: {
    suffix: errorSuffixes.user,
    message: 'Debes usar un correo UC'
  },
  AuthApiError: {
    suffix: errorSuffixes.application,
    message: 'Credenciales inválidas'
  },
  default: {
    suffix: errorSuffixes.application,
    message: 'Error desconocido, contacta a soporte'
  }
}

export function useToastError() {
  const { toast } = useToast()

  const toastError = useCallback((error: ErrorWithStatus) => {
    const { message, suffix } = supportErrors[error.name] ?? supportErrors.default
    const errorCode = `${error.status ?? (error as any)?.code ?? 500}${suffix}`
    console.error({ error })
    toast({
      title: `Error ${errorCode}`,
      description: message,
      variant: 'destructive'
    })
  }, [toast])

  return toastError
}
