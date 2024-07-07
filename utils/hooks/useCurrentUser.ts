import useSWR from 'swr'
import { createClient } from '../supabase/client'

const supabase = createClient()

const fetcher = (url: string) => supabase.auth.getUser()
  .then((userData) => userData.data)

export default function useCurrentUser () {
  const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher)
 
  return {
    user: data?.user,
    isLoading,
    error,
    mutate
  }
}
