'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function useUserInfoSync() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/sync-user-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }).catch(console.error)
    }
  }, [session?.user?.email])
}
