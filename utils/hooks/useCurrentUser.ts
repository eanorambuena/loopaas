'use client'

import { useSession } from 'next-auth/react'

export default function useCurrentUser() {
  const { data: session, status, update } = useSession()

  return {
    user: session?.user ?? null,
    isLoading: status === 'loading',
    error: status === 'unauthenticated' ? new Error('No authenticated') : null,
    mutate: update,
  }
}
