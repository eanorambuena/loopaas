'use client'

import SecondaryButton from '@/components/SecondaryButton'
import { createClient } from '@supabase/supabase-js'
//import Auth0Client from '@auth0/auth0-spa-js'
import { Auth0Client } from '@auth0/nextjs-auth0/server'

const auth0 = new Auth0Client({
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
  appBaseUrl: window.location.origin,
  scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
  secret: process.env.NEXT_
})

export default function LoginButton() {
  const loginWithAuth0 = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      accessToken: async () => {
        const accessToken = await auth0.getTokenSilently()

        // Alternatively you can use (await auth0.getIdTokenClaims()).__raw to
        // use an ID token instead.

        return accessToken
      },
    })
  }

  return (
    <SecondaryButton onClick={loginWithAuth0}>
      Iniciar sesión con Auth0 (Beta)
    </SecondaryButton>
  )
}
