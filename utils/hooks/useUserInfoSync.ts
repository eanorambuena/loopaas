'use client'

import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useUserInfoSync() {
  const supabase = createClient()

  useEffect(() => {
    const syncUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
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
        }
      }
    }

    // Sincronizar al cargar
    syncUserInfo()

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        syncUserInfo()
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])
}
