'use client'

import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/SubmitButton'
import { useState } from 'react'

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.log(error)
      return redirect('/login?message=No se pudo autenticar al usuario')
    }

    return redirect('/cursos')
  }

  const signUp = async (formData: FormData) => {
    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const isUC = true//email.endsWith("uc.cl")
    if (!isUC) {
      return redirect('/login?message=Debes usar un correo UC')
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.log(error)
      return redirect('/login?message=No se pudo autenticar al usuario')
    }
    return redirect('/login?message=Revisa tu correo para continuar con el proceso de inicio de sesión')
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
          required
        />
        <label className="text-md" htmlFor="password">
          Contraseña
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          className="bg-emerald-700 rounded-md px-4 py-2 text-emerald-50 mb-2 font-bold"
          pendingText="Iniciando Sesión..."
        >
          Iniciar Sesión
        </SubmitButton>
        <SubmitButton
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Creando cuenta..."
        >
          Registrarse
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 text-foreground text-center group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full destructive group border-red-300 bg-red-500 text-slate-50 dark:border-red-500 dark:bg-red-700 dark:text-slate-50">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
