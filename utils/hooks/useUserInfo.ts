import useSWR from 'swr'
import { createClient } from '../supabase/client'
import { useRouter } from 'next/navigation'

const supabase = createClient()

const fetcher = (url: string) => supabase
  .from('userInfo')
  .select('*')
  .eq('userId', url)
  .single()
  .then((userData) => userData.data)

export default function useUserInfo(userId?: string) {
  const router = useRouter()
  const { data, error, isLoading, mutate } = useSWR(userId, fetcher)

  if (error)
    router.push('/perfil')

  return {
    userInfo: data?.userInfo,
    isLoading,
    error,
    mutateUserInfo: mutate,
  }
}
