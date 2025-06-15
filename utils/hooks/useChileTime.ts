import { useState, useEffect } from 'react'

const useChileTime = (): Date => {
  const chileDefaultTimezone = new Date().toLocaleString('en-US', { timeZone: 'America/Santiago' })
  const chileDefaultTime = new Date(chileDefaultTimezone)
  const [chileTime, setChileTime] = useState<Date>(chileDefaultTime)

  useEffect(() => {
    try {
      const fetchChileTime = async () => {
        try {
          const response = await fetch('http://worldtimeapi.org/api/timezone/America/Santiago')
          if (!response.ok) {
            throw new Error('Error fetching Chile time')
          }
          const data = await response.json()
          setChileTime(new Date(data.datetime)) // Set the Chile time in state
        } catch (error) {
          console.error('Error fetching Chile time:', error)
        }
      }

      fetchChileTime() // Fetch the time once when the component mounts

      // Optional: Set an interval to update the time periodically
      const intervalId = setInterval(fetchChileTime, 60000) // Update every minute

      return () => clearInterval(intervalId) // Clean up interval on unmount
    } catch (error) {
      console.error('Error in useChileTime:', error)
    }
  }, [])

  return chileTime // Return the current Chile time or null if not yet loaded
}

export default useChileTime
