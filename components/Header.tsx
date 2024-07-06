import AuthButton from '@/components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import HoverableLink from './HoverableLink'
import { getUserInfo } from '@/utils/queries'

export default async function Header() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient()
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()
  if (!isSupabaseConnected) return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm" />
    </nav>
  )

  const supabase = createClient()

  const { data: { user }} = await supabase.auth.getUser()

  const noUserOrUserInfoFallback = (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
        <AuthButton />
      </div>
    </nav>
  )

  if (!user) return noUserOrUserInfoFallback

  const userInfo = await getUserInfo(user.id, false)
  if (!userInfo) return noUserOrUserInfoFallback

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <div className="flex gap-4">
          <HoverableLink href="/cursos">Cursos</HoverableLink>
          <HoverableLink href="/perfil">Perfil</HoverableLink>
        </div>
        <AuthButton />
      </div>
    </nav>
  )
}
