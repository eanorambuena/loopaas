import { createClient } from '@/utils/supabase/server'
import WannabeProfessorForm from './WannabeProfessorForm'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect('/login')

  const { data: userInfo } = await supabase
    .from('userInfo')
    .select('*')
    .eq('userId', user.id)
    .single()

  if (!userInfo) return redirect('/login')

  return (
    <div className="animate-in flex-1 flex flex-col w-full sm:max-w-lg px-8 justify-center gap-6">
      <h1 className="text-3xl font-bold">Perfil</h1>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Información Personal</h2>
        <p className="text-foreground">
          Actualiza tu información personal
        </p>
      </section>
      <WannabeProfessorForm userEmail={userInfo.email} />
    </div>
  )
}
