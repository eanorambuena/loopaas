import { useEffect, useRef, useState } from 'react'

export function useIsVisible<T extends Element>() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      try {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      } catch (error) {
        console.error('Error unobserving element:', error)
      }
      observer.disconnect()
    }
  }, [])

  return { isVisible, ref }
}
