'use client'

import AuthButton from '@/components/AuthButton'
import useCurrentUser from '@/utils/hooks/useCurrentUser'
import HoverableLink from '@/components/HoverableLink'
import { useUser } from '@auth0/nextjs-auth0'
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

async function signInWithAuth0(email: string) {
  try {
    await fetch('/api/auto-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
  } catch (e) {
    console.error(e)
  }
}

export default function Header() {
  const { user, isLoading, error } = useCurrentUser()
  const { user: auth0User, isLoading: iL } = useUser()

  const supabase = createClient()

  useEffect(() => {
    if (!auth0User || !auth0User.email) {
      return
    }
    
    (async () => {
      const { error } = await signInWithAuth0(auth0User.email)
      console.log({ error })
    })()
  }, [auth0User, supabase.auth])

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
