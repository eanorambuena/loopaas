import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export class Auth {
  static async SignIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
  }

  static async SignUp(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) throw error
  }
}
