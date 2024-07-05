'use client'

import MainButton from '@/components/MainButton'
import SecondaryButton from '@/components/SecondaryButton'
import { useToast } from '@/components/ui/use-toast'
import { ErrorWithStatus, useToastError } from '@/utils/hooks/useToastError'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const router = useRouter()
  const toastError = useToastError()
  const { toast } = useToast()

  const signIn = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.log({error})
      return toastError(error as ErrorWithStatus)
    }
    toast({
      title: 'Inicio de sesión exitoso',
      description: 'Redirigiendo a cursos',
      variant: 'success'
    })
    router.push('/cursos')
  }

  const signUp = async (formData: FormData) => {
    const origin = window.location.origin
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const isUC = email.endsWith('uc.cl')
    if (!isUC) {
      return toastError({
        name: 'NotUcEmailError',
        status: 400,
      })
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return toastError(error as ErrorWithStatus)
    }
    toast({
      title: 'Registro exitoso',
      description: 'Revisa tu correo para continuar con el proceso de inicio de sesión',
      variant: 'success'
    })
  }

  const [action, setAction] = useState<'signIn' | 'signUp'>('signIn')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    if (action === 'signIn') {
      await signIn(formData)
    } else {
      await signUp(formData)
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" onSubmit={handleSubmit}>
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
        <label className="text-md" htmlFor="password">
          Contraseña
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          autoComplete='current-password'
          placeholder="••••••••"
          required
        />
        <MainButton onClick={() => setAction('signIn')}>
          Iniciar Sesión
        </MainButton>
        <SecondaryButton
          onClick={() => setAction('signUp')}
          type='submit'
        >
          Registrarse
        </SecondaryButton>
        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 text-foreground text-center group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full destructive group border-red-300 bg-red-500 text-slate-50 dark:border-red-500 dark:bg-red-700 dark:text-slate-50">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
