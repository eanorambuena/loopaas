'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginButton() {
  const supabase = createClientComponentClient()

  const loginWithAuth0 = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'auth0',
    })
  }

  return <button onClick={loginWithAuth0}>Iniciar sesión con Auth0</button>
}
