import { StudentWithGrades } from './schema'
import { ServerResultsCache } from './cache'
import { getStudentsWithGradesSSR } from '@/lib/getStudentsWithGradesSSR'

export async function getCachedResults(
  evaluation: any,
  students: any[]
): Promise<StudentWithGrades[]> {
  const evaluationId = evaluation.id

  // Check if we have cached results
  const cachedResults = ServerResultsCache.get(evaluationId)
  if (cachedResults) {
    console.log(`📦 Using cached results for evaluation ${evaluationId}`)
    return cachedResults
  }

  // For public view, return empty array to avoid timeout
  // The client will fetch the data
  console.log(`⏱️ No cache available for evaluation ${evaluationId}, returning empty for fast SSR`)
  return []
}

export async function getCachedResultsWithBackgroundRefresh(
  evaluation: any,
  students: any[]
): Promise<StudentWithGrades[]> {
  const evaluationId = evaluation.id

  // Check if we have cached results
  const cachedResults = ServerResultsCache.get(evaluationId)
  if (cachedResults) {
    // If cache is stale, refresh in background
    if (ServerResultsCache.isStale(evaluationId)) {
      console.log(`🔄 Cache is stale, refreshing in background for evaluation ${evaluationId}`)
      // Don't await this - let it run in background
      getStudentsWithGradesSSR(evaluation, students).then(freshResults => {
        ServerResultsCache.set(evaluationId, freshResults)
        console.log(`✅ Background refresh completed for evaluation ${evaluationId}`)
      }).catch(error => {
        console.error(`❌ Background refresh failed for evaluation ${evaluationId}:`, error)
      })
    }
    
    console.log(`📦 Using cached results for evaluation ${evaluationId}`)
    return cachedResults
  }

  // No cache available, fetch fresh results
  console.log(`🔄 No cache available, fetching fresh results for evaluation ${evaluationId}`)
  const freshResults = await getStudentsWithGradesSSR(evaluation, students)
  
  // Cache the results
  ServerResultsCache.set(evaluationId, freshResults)
  
  return freshResults
} 