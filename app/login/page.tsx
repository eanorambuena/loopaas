'use client'

import MainButton from '@/components/MainButton'
import SecondaryButton from '@/components/SecondaryButton'
import SecondaryLink from '@/components/SecondaryLink'
import { useToast } from '@/components/ui/use-toast'
import { Auth } from '@/utils/auth'
import useCurrentUser from '@/utils/hooks/useCurrentUser'
import { ErrorWithStatus, useToastError } from '@/utils/hooks/useToastError'
import useUserInfo from '@/utils/hooks/useUserInfo'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GoogleIcon } from '@/components/icons/brands/GoogleIcon'
import { MicrosoftIcon } from '@/components/icons/brands/MicrosoftIcon'

type AvailableActions = 'signIn' | 'signUp'

export default function Login() {
  const router = useRouter()
  const toastError = useToastError()
  const { toast } = useToast()
  const { mutate, user } = useCurrentUser()
  const { refetch } = useUserInfo(user?.id)
  const [showingPassword, setShowingPassword] = useState(false)
  const [action, setAction] = useState<AvailableActions>('signIn')

  const signIn = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const user = await Auth.SignIn(email, password)
      toast({
        title: 'Inicio de sesión exitoso',
        description: 'Redirigiendo a cursos',
        variant: 'success'
      })
      mutate({ user })
      refetch()
      router.push('/cursos')
    }
    catch (error) {
      console.log({error})
      toastError(error as ErrorWithStatus)
    }
  }

  const signUp = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string || ''
    const lastName = formData.get('lastName') as string || ''

    try {
      const result = await Auth.SignUp(email, password, firstName, lastName)
      
      if (result.user) {
        toast({
          title: 'Registro exitoso',
          description: 'Usuario creado correctamente. Iniciando sesión automáticamente...',
          variant: 'success'
        })

        // Iniciar sesión automáticamente después del registro exitoso
        try {
          const user = await Auth.SignIn(email, password)
          mutate({ user })
          refetch()
          router.push('/cursos')
        } catch (signInError) {
          console.error('Error en login automático:', signInError)
          toast({
            title: 'Registro exitoso',
            description: 'Por favor inicia sesión con tus credenciales',
            variant: 'success'
          })
          setAction('signIn')
        }
      }
    }
    catch (error) {
      toastError(error as ErrorWithStatus)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowingPassword(false)
    const form = event.currentTarget
    const formData = new FormData(form)
    if (action === 'signIn')
      return await signIn(formData)
    await signUp(formData)
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {action === 'signIn' ? 'Iniciar Sesión' : 'Registrarse'}
        </h1>
        <p className="text-foreground/60 mt-2">
          {action === 'signIn' 
            ? 'Ingresa a tu cuenta para continuar' 
            : 'Crea una nueva cuenta para comenzar'
          }
        </p>
      </div>

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        onSubmit={handleSubmit}
      >
        {action === 'signUp' && (
          <>
            <label className="text-md" htmlFor="firstName">
              Nombre
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-4"
              name="firstName"
              placeholder="Tu nombre"
              type="text"
              required
            />
            <label className="text-md" htmlFor="lastName">
              Apellido
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-4"
              name="lastName"
              placeholder="Tu apellido"
              type="text"
              required
            />
          </>
        )}
        
        <label className="text-md" htmlFor="email">
          Correo
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
        <div className="w-full flex items-center justify-between gap-2 mb-6">
          <input
            className="rounded-md px-4 py-2 bg-inherit border flex-grow"
            type={showingPassword ? 'text' : 'password'}
            name="password"
            autoComplete='current-password'
            placeholder="••••••••"
            required
          />
          {/* button to toggle password visibility */}
          <button
            type="button"
            className="text-emerald-500 hover:underline"
            onClick={() => setShowingPassword(!showingPassword)}
          >
            { !showingPassword ? <EyeIcon /> : <EyeOffIcon /> }
          </button>
        </div>
        <MainButton type="submit">
          {action === 'signIn' ? 'Iniciar Sesión' : 'Registrarse'}
        </MainButton>
        
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => setAction(action === 'signIn' ? 'signUp' : 'signIn')}
            className="text-emerald-500 hover:underline"
          >
            {action === 'signIn' 
              ? '¿No tienes cuenta? Regístrate aquí' 
              : '¿Ya tienes cuenta? Inicia sesión aquí'
            }
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-6 mb-4">
          <hr className="flex-grow border-t border-foreground/20" />
          <span className="mx-2 text-foreground/60">o</span>
          <hr className="flex-grow border-t border-foreground/20" />
        </div>
        
        {action === 'signIn' && (
          <>
            <SecondaryButton onClick={() => router.push('/login/magic-link')}>
              Iniciar Sesión con Enlace Mágico (Beta)
            </SecondaryButton>
            <a
              className='border border-foreground/20 rounded-md px-4 py-2 text-center text-foreground hover:scale-105 transition-transform duration-300'
              href="/auth/login"
            >
              Iniciar Sesión con{' '}
              <MicrosoftIcon className="inline size-5 ml-1 mb-1" />
              <GoogleIcon className="inline size-5 ml-1 mb-1" />
              {' '}(Beta)
            </a>
          </>
        )}
      </form>
    </div>
  )
}
