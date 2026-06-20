import { signIn as nextAuthSignIn } from 'next-auth/react'

export class Auth {
  static async SignIn(email: string, password: string) {
    const result = await nextAuthSignIn('credentials', {
      email: email.toLowerCase(),
      password,
      redirect: false,
    })
    if (result?.error) throw new Error(result.error)
    return result
  }

  static async SignUp(email: string, password: string, firstName?: string, lastName?: string) {
    const response = await fetch('/api/signup-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error en el registro')
    }
    return response.json()
  }

  static async SignInWithMagicLink(email: string) {
    const result = await nextAuthSignIn('email', {
      email: email.toLowerCase(),
      redirect: false,
    })
    if (result?.error) throw new Error(result.error)
    return result
  }

  static async SignOut() {
    const { signOut } = await import('next-auth/react')
    await signOut({ redirect: false })
  }
}
