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
    return user
  }
  
  static async SignInWithMagicLink(email: string) {
    const origin = window.location.origin
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${origin}/auth/callback`,
      }
    })
    console.log({ data, error })
    if (error) throw error
  }

  static async SignUp(email: string, password: string) {
    const origin = window.location.origin
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      }
    })
    if (error) throw error
  }
}
