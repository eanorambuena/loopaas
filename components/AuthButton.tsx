'use client'

import useCurrentUser from '@/utils/hooks/useCurrentUser'
import useUserInfo from '@/utils/hooks/useUserInfo'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthButton() {
  const supabase = createClient()
  const router = useRouter()
  const { user } = useCurrentUser()
  const { userInfo, error: userInfoError } = useUserInfo(user?.id)

  const signOut = async () => {
    await supabase.auth.signOut()
    return router.push('/login')
  }

  return user ? (
    <div className="flex items-center gap-4">
      {userInfo?.firstName && <span className="hidden sm:inline">Hola, {userInfo?.firstName}!</span>}
      <button
        className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        onClick={signOut}
      >
        Cerrar sesión
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Iniciar sesión
    </Link>
  )
}
