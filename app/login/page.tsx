"use client"

import { headers } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { SubmitButton } from "@/components/SubmitButton"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const { toast } = useToast()

  const signIn = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return toast({
        title: "Error",
        description: "No se pudo autenticar al usuario",
        variant: "destructive"
      })
    }

    return redirect("/cursos")
  }

  const signUp = async (formData: FormData) => {
    "use server"

    const origin = headers().get("origin")
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const isUC = email.endsWith("uc.cl")
    if (!isUC) {
      return toast({
        title: "Error",
        description: "Debes usar un correo UC",
        variant: "destructive"
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
      return redirect("/login?message=No se pudo autenticar al usuario")
    }
    return redirect("/login?message=Revisa tu correo para continuar con el proceso de inicio de sesión")
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
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
          formAction={signIn}
          className="bg-green-700 rounded-md px-4 py-2 text-green-50 mb-2 font-bold"
          pendingText="Iniciando Sesión..."
        >
          Iniciar Sesión
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Creando cuenta..."
        >
          Registrarse
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
        <Toaster />
      </form>
    </div>
  )
}
