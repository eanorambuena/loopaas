'use client'

import Input from '@/components/Input'
import MainButton from '@/components/MainButton'
import { useToast } from '@/components/ui/use-toast'
import { ErrorWithStatus, useToastError } from '@/utils/hooks/useToastError'
import { UserInfoSchema } from '@/utils/schema'
import { useRouter } from 'next/navigation'

interface Props {
  user: { id: string; email: string }
  userInfo?: UserInfoSchema
}

export default function ProfileForm({ user, userInfo }: Props) {
  const { toast } = useToast()
  const router = useRouter()
  const toastError = useToastError()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    try {
      const res = await fetch('/api/create-user-info', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          firstName,
          lastName,
        }),
      })
      if (!res.ok) throw new Error('Error al actualizar la información')
      toast({
        title: 'Información Actualizada',
        description: 'Tu información personal ha sido actualizada',
        variant: 'success'
      })
      router.refresh()
    }
    catch (error) {
      return toastError(error as unknown as ErrorWithStatus)
    }
  }

  return (
    <section className="flex flex-col gap-4 border border-foreground/20 rounded-md p-4">
      <h2 className="text-xl font-bold">Información Personal</h2>
      <form
        className="animate-in flex-1 flex flex-col w-full sm:max-w-md justify-center gap-4 text-foreground"
        onSubmit={handleSubmit}
      >
        <Input label="Nombre (s)" name="firstName" required defaultValue={userInfo?.firstName} />
        <Input label="Apellido (s)" name="lastName" required defaultValue={userInfo?.lastName} />
        <MainButton>Actualizar Información</MainButton>
      </form>
    </section>
  )
}
