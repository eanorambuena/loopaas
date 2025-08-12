import { SUPPORT_EMAIL, APP_NAME } from '@/lib/constants'
'use client'

import Input from '@/components/Input'
import MainButton from '@/components/MainButton'
import { useToast } from '@/components/ui/use-toast'
import { sendEmail } from '@/utils/resend'

export default function WannabeProfessorForm({ userEmail }: { userEmail: string }) {
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const token = formData.get('token')
    sendEmail({
      from: 'onboarding@resend.dev',
  to: SUPPORT_EMAIL,
  subject: `${APP_NAME} | Cuenta de Profesor Solicitada`,
      html: /*html*/`<h1>Un usuario ha solicitado una cuenta de profesor</h1>
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
      <form
        className="animate-in flex-1 flex flex-col w-full sm:max-w-md justify-center gap-4 text-foreground"
        onSubmit={handleSubmit}
      >
        <Input label="Token de Canvas" name="token" required />
        <MainButton>Solicitar Cuenta de Profesor</MainButton>
      </form>
    </section>
  )
}
