import { StudentWithGrades } from './schema'

export interface CachedResults {
  evaluationId: string
  studentsWithGrades: StudentWithGrades[]
  timestamp: number
  expiresAt: number
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

export class ResultsCache {
  private static instance: ResultsCache
  private cache: Map<string, CachedResults> = new Map()

  static getInstance(): ResultsCache {
    if (!ResultsCache.instance) {
      ResultsCache.instance = new ResultsCache()
    }
    return ResultsCache.instance
  }

  set(evaluationId: string, studentsWithGrades: StudentWithGrades[]): void {
    const now = Date.now()
    const cachedData: CachedResults = {
      evaluationId,
      studentsWithGrades,
      timestamp: now,
      expiresAt: now + CACHE_DURATION
    }
    this.cache.set(evaluationId, cachedData)
  }

  get(evaluationId: string): StudentWithGrades[] | null {
    const cached = this.cache.get(evaluationId)
    if (!cached) return null

    // Check if cache has expired
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(evaluationId)
      return null
    }

    return cached.studentsWithGrades
  }

  isStale(evaluationId: string): boolean {
    const cached = this.cache.get(evaluationId)
    if (!cached) return true

    // Consider stale if older than 2 minutes
    return Date.now() > cached.timestamp + (2 * 60 * 1000)
  }

  clear(evaluationId: string): void {
    this.cache.delete(evaluationId)
  }

  clearAll(): void {
    this.cache.clear()
  }
}

// Server-side cache for SSR
export class ServerResultsCache {
  private static cache: Map<string, CachedResults> = new Map()

  static set(evaluationId: string, studentsWithGrades: StudentWithGrades[]): void {
    const now = Date.now()
    const cachedData: CachedResults = {
      evaluationId,
      studentsWithGrades,
      timestamp: now,
      expiresAt: now + CACHE_DURATION
    }
    ServerResultsCache.cache.set(evaluationId, cachedData)
  }

  static get(evaluationId: string): StudentWithGrades[] | null {
    const cached = ServerResultsCache.cache.get(evaluationId)
    if (!cached) return null

    if (Date.now() > cached.expiresAt) {
      ServerResultsCache.cache.delete(evaluationId)
      return null
    }

    return cached.studentsWithGrades
  }

  static isStale(evaluationId: string): boolean {
    const cached = ServerResultsCache.cache.get(evaluationId)
    if (!cached) return true

    return Date.now() > cached.timestamp + (2 * 60 * 1000)
  }

  static clear(evaluationId: string): void {
    ServerResultsCache.cache.delete(evaluationId)
  }

  static clearAll(): void {
    ServerResultsCache.cache.clear()
  }
} 