'use client'

import useSWR from 'swr'
import useCurrentUser from './useCurrentUser'
import { useRouter } from 'next/navigation'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}

export default function useUserInfo() {
  const router = useRouter()
  const { user } = useCurrentUser()
  const { data, error, isLoading, mutate } = useSWR(
    user ? `/api/user-info` : null,
    fetcher
  )

  const refetch = async () => {
    if (!user) return
    mutate()
  }

  return {
    userInfo: data ?? null,
    isLoading,
    error,
    refetch,
  }
}
