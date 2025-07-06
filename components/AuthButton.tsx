'use client'

import { getNavbarButtonStyles, NavbarButton } from '@/components/ui/resizable-navbar'
import useCurrentUser from '@/utils/hooks/useCurrentUser'
import useUserInfo from '@/utils/hooks/useUserInfo'
import { createClient } from '@/utils/supabase/client'
import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthButton() {
  const supabase = createClient()
  const router = useRouter()
  const { user } = useCurrentUser()
  const { userInfo, error: userInfoError } = useUserInfo(user?.id)
  const { user: auth0User, isLoading: iL } = useUser()

  const signOut = async () => {
    await supabase.auth.signOut()
    try {
      if (auth0User) {
        return router.push('/auth/logout')
      }
      return router.push('/')
    } catch (error) {
      return router.push('/')
    }
  }

  return user ? (
    <div className="flex items-center gap-4">
      {userInfo?.firstName && <span className="hidden sm:inline">Hola, {userInfo?.firstName}!</span>}
      <NavbarButton variant='primary' onClick={signOut}>
        Cerrar sesión
      </NavbarButton>
    </div>
  ) : (
    <Link href="/login" className={getNavbarButtonStyles('primary')}>
      Iniciar sesión
    </Link>
  )
}
