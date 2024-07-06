import WannabeProfessorForm from './WannabeProfessorForm'
import { getCurrentUser, getUserInfo } from '@/utils/queries'
import ProfileForm from './ProfileForm'

export default async function Page() {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id, false)

  return (
    <div className="animate-in flex-1 flex flex-col w-full sm:max-w-lg p-8 justify-center gap-6">
      <h1 className="text-3xl font-bold">Perfil</h1>
      {!userInfo && (
        <p className="mt-4 bg-foreground/10 text-foreground text-center group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full destructive group border-red-300 bg-red-500 text-slate-50 dark:border-red-500 dark:bg-red-700 dark:text-slate-50">
          No cuentas con un perfil completo. Por favor, llena la información solicitada.
        </p>
      )}
      <ProfileForm user={user} userInfo={userInfo} />
      { userInfo && <WannabeProfessorForm userEmail={userInfo.email} /> }
    </div>
  )
}
