'use client'

import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export class Auth {
  static async SignIn(email: string, password: string) {
    const { error, data: { user } } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    
    // Sincronizar userInfo después del login exitoso
    if (user) {
      try {
        await fetch('/api/sync-user-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        console.error('Error syncing user info:', error)
        // No lanzar error, el usuario puede loguearse igual
      }
    }
    
    return user
  }
  
  static async SignInWithMagicLink(email: string) {
    const origin = window.location.origin
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${origin}/supabase/auth/callback`,
      }
    })
    if (error) throw error
  }

  static async SignInWithAuth0(email: string) {
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

  static async SignUp(email: string, password: string, firstName?: string, lastName?: string) {
    const origin = window.location.origin
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/supabase/auth/callback`,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    })
    if (error) throw error
    return data
  }
}
