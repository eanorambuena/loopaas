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

  // Check if cache is stale and we should refresh in background
  const isStale = ServerResultsCache.isStale(evaluationId)
  
  // Fetch fresh results
  console.log(`🔄 Fetching fresh results for evaluation ${evaluationId}`)
  const freshResults = await getStudentsWithGradesSSR(evaluation, students)
  
  // Cache the results
  ServerResultsCache.set(evaluationId, freshResults)
  
  return freshResults
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