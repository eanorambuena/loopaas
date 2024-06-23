"use client"

import { SubmitButton } from "@/components/SubmitButton"
import { useToast } from "@/components/ui/use-toast"
import { sendEmail } from "@/utils/resend"

export default function WannabeProfessorForm({ userEmail }: { userEmail: string }) {
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const token = formData.get("token")
    sendEmail({
      from: 'onboarding@resend.dev',
      to: 'eanorambuena@uc.cl',
      subject: 'IDSApp | Cuenta de Profesor Solicitada',
      html: `<p>Un usuario ha solicitado una cuenta de profesor</p>
      <p>Token de Canvas: <strong>${token}</strong></p>
      <p>Correo: <strong>${userEmail}</strong></p>
      <p>Por favor, revisa la solicitud en el panel de administración</p>`
    })
    toast({
      title: 'Solicitud Enviada',
      description: 'Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.',
      variant: 'success'
    })
  }

  return (
    <section className="flex flex-col gap-4 border border-foreground/20 rounded-md p-4">
      <h2 className="text-xl font-bold">Solicitar Cuenta de Profesor</h2>
      <p className="text-foreground">
        Para solicitar una cuenta de profesor, ingresa tu token de Canvas
      </p>
      <form className="animate-in flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2 text-foreground" onSubmit={handleSubmit}>
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
          className="bg-emerald-700 rounded-md px-4 py-2 text-emerald-50 mb-2 font-bold"
          pendingText="Iniciando Sesión..."
        >
          Solicitar Cuenta de Profesor
        </SubmitButton>
      </form>
    </section>
  )
}
