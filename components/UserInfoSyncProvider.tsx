'use client'

import { useUserInfoSync } from '@/utils/hooks/useUserInfoSync'

export function UserInfoSyncProvider({ children }: { children: React.ReactNode }) {
  useUserInfoSync()
  return <>{children}</>
}
