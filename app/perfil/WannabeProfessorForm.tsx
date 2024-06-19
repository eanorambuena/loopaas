"use client"

import { SubmitButton } from "@/components/SubmitButton"

export default function WannabeProfessorForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log("Solicitar Cuenta de Profesor", formData.get("token"))
    // enviar correo
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">Solicitar Cuenta de Profesor</h2>
      <p className="text-foreground">
        Para solicitar una cuenta de profesor, ingresa tu token de Canvas
      </p>
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" onSubmit={handleSubmit}>
        <label className="text-md" htmlFor="email">
          Token de Canvas
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="token"
          type="text"
          placeholder="Token de Canvas"
          required
        />
        <SubmitButton
          className="bg-green-700 rounded-md px-4 py-2 text-green-50 mb-2 font-bold"
          pendingText="Iniciando Sesión..."
        >
          Solicitar Cuenta de Profesor
        </SubmitButton>
      </form>
    </section>
  )
}
