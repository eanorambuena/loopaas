 'use client'

import MainButton from '@/components/MainButton'
import SecondaryButton from '@/components/SecondaryButton'
import { useToast } from '@/components/ui/use-toast'
import { Auth } from '@/utils/auth'
import useCurrentUser from '@/utils/hooks/useCurrentUser'
import { ErrorWithStatus, useToastError } from '@/utils/hooks/useToastError'
import useUserInfo from '@/utils/hooks/useUserInfo'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type AvailableActions = 'signInWithMagicLink'

export default function Login() {
  const router = useRouter()
  const toastError = useToastError()
  const { toast } = useToast()
  const { mutate, user } = useCurrentUser()
  const { refetch } = useUserInfo(user?.id)
  const [action, setAction] = useState<AvailableActions>('signInWithMagicLink')

  const signInWithMagicLink = async (formData: FormData) => {
    const email = formData.get('email') as string

    try {
      await Auth.SignInWithMagicLink(email)
      toast({
        title: 'Enlace de inicio de sesión enviado',
        description: 'Revisa tu correo para continuar con el proceso de inicio de sesión',
        variant: 'success'
      })
    }
    catch (error) {
      toastError(error as ErrorWithStatus)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    if (action === 'signInWithMagicLink')
      return await signInWithMagicLink(formData)
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        onSubmit={handleSubmit}
      >
        <label className="text-md" htmlFor="email">
          Correo UC
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="correo@estudiante.uc.cl"
          autoComplete='email'
          type='email'
          required
        />
        <MainButton onClick={() => setAction('signInWithMagicLink')}>
          Iniciar Sesión con Enlace Mágico
        </MainButton>
        <SecondaryButton onClick={() => router.push('/login')}>
          Iniciar Sesión con Contraseña
        </SecondaryButton>
      </form>
    </div>
  )
}
