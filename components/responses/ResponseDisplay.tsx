import { getUserInfoByIdClient } from "@/utils/getUserInfoByIdClient"
import { useEffect, useState } from "react"

export const ResponseDisplay = ({ data }: { data: string }) => {
  const [displayData, setDisplayData] = useState<{ evaluatedUserInfo: any, criteria: string, answer: string }[] | null>()
  
  useEffect(() => {
    try {
      (async () => {
        const parsedData = JSON.parse(data)
        const digestedData: { evaluatedUserInfo: any, criteria: string, answer: string }[] = []
        const promises: Promise<any>[] = []
        for (const parsedItem of parsedData) {
          const splitedItem = parsedItem.split('--')
          const evaluatedUserInfoId = splitedItem[0]
          const criteria = splitedItem[1]
          const answer = splitedItem[2]
          const asyncFetch = async () => {
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
  }, [data])
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
