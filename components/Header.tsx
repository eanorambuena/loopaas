'use client'

import AuthButton from '@/components/AuthButton'
import useCurrentUser from '@/utils/hooks/useCurrentUser'
import HoverableLink from './HoverableLink'

export default function Header() {
  const { user, isLoading, error } = useCurrentUser()

  const noUserOrUserInfoFallback = (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
        <AuthButton />
      </div>
    </nav>
  )
  
  if (isLoading || error || !user) return noUserOrUserInfoFallback

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
