import { getUserInfoByIdClient } from '@/utils/getUserInfoByIdClient'
import { useEffect, useState } from 'react'
import { useIsVisible } from '@/utils/hooks/useIsVisible'

interface ResponseDisplayProps {
  data: string
}

export function ResponseDisplay({ data }: ResponseDisplayProps) {
  const [displayData, setDisplayData] = useState<{ evaluatedUserInfo: any, criteria: string, answer: string }[] | null>()
  const [shouldDisplayData, setShouldDisplayData] = useState(false)
  const [shouldPrefetchData, setShouldPrefetchData] = useState(false)
  const { isVisible, ref } = useIsVisible()
  
  useEffect(() => {
    const shouldFetchData = shouldDisplayData || shouldPrefetchData || isVisible
    if (!shouldFetchData || !data || displayData) return
    console.log(`shouldDisplayData: ${shouldDisplayData}, shouldPrefetchData: ${shouldPrefetchData}, isVisible: ${isVisible}`)
    
    try {
      (async () => {
        const parsedData = JSON.parse(data)
        const digestedData: { evaluatedUserInfo: any, criteria: string, answer: string }[] = []
        const promises: Promise<any>[] = []
        for (const parsedItem of parsedData) {
          const asyncFetch = async () => {
            const splitedItem = parsedItem.split('--')
            const evaluatedUserInfoId = await splitedItem[0]
            const criteria = splitedItem[1]
            const answer = splitedItem[2]
            const evaluatedUserInfo = await getUserInfoByIdClient(evaluatedUserInfoId)
            digestedData.push({
              evaluatedUserInfo,
              criteria,
              answer
            })
          }
          promises.push(asyncFetch())
        }
        await Promise.all(promises)
        setDisplayData(digestedData)
      })()
    } catch (error) {
      console.error('Error parsing data:', error)
    }
  }, [data, shouldDisplayData, shouldPrefetchData, isVisible, displayData])

  function handleOnMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
    if (!shouldDisplayData && !shouldPrefetchData) {
      setShouldPrefetchData(true)
    }
  }

  if (!shouldDisplayData) {
    return (
      <button
        ref={ref}
        onClick={() => setShouldDisplayData(true)}
        onMouseEnter={handleOnMouseEnter}
        className='bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors'
      >
        Mostrar Respuestas
      </button>
    )
  }
  if (!displayData) return <div>Cargando...</div>
  if (displayData.length === 0) return <div>No hay respuestas disponibles</div>

  return (
    <div className='max-h-40 overflow-y-auto'>
      {displayData?.map((item, index) => {
        const { evaluatedUserInfo, criteria, answer } = item
        return (
          <div key={index} className='mb-2'>
            <strong>Usuario Evaluado:</strong> {evaluatedUserInfo?.firstName} {evaluatedUserInfo?.lastName}<br />
            <strong>Criterio:</strong> {criteria}<br />
            <strong>Respuesta:</strong> {answer}
          </div>
        )
      })}
    </div>
  )
}
