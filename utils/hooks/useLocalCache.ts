import { useState, useEffect } from 'react'

interface CachedData<T> {
  data: T
  timestamp: number
  expiresAt: number
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function useLocalCache<T>(
  key: string,
  fetchData: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Check localStorage for cached data
        const cached = localStorage.getItem(key)
        if (cached) {
          const parsed: CachedData<T> = JSON.parse(cached)
          
          // Check if cache is still valid
          if (Date.now() < parsed.expiresAt) {
            console.log(`📦 Using local cache for ${key}`)
            setData(parsed.data)
            setLastUpdated(new Date(parsed.timestamp))
            setLoading(false)
            return
          } else {
            console.log(`⏰ Local cache expired for ${key}`)
            localStorage.removeItem(key)
          }
        }

        // Fetch fresh data
        console.log(`🔄 Fetching fresh data for ${key}`)
        const freshData = await fetchData()
        
        // Cache the data
        const cacheData: CachedData<T> = {
          data: freshData,
          timestamp: Date.now(),
          expiresAt: Date.now() + CACHE_DURATION
        }
        localStorage.setItem(key, JSON.stringify(cacheData))
        
        setData(freshData)
        setLastUpdated(new Date())
        setLoading(false)
      } catch (err) {
        console.error(`❌ Error loading data for ${key}:`, err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
        setLoading(false)
      }
    }

    loadData()
  }, dependencies)

  const refresh = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log(`🔄 Manual refresh for ${key}`)
      const freshData = await fetchData()
      
      // Update cache
      const cacheData: CachedData<T> = {
        data: freshData,
        timestamp: Date.now(),
        expiresAt: Date.now() + CACHE_DURATION
      }
      localStorage.setItem(key, JSON.stringify(cacheData))
      
      setData(freshData)
      setLastUpdated(new Date())
      setLoading(false)
    } catch (err) {
      console.error(`❌ Error refreshing data for ${key}:`, err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
      setLoading(false)
    }
  }

  const clearCache = () => {
    localStorage.removeItem(key)
    setData(null)
    setLastUpdated(null)
  }

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    clearCache
  }
} 