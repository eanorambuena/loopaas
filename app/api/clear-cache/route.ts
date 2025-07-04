import { NextRequest, NextResponse } from 'next/server'
import { ServerResultsCache } from '@/utils/cache'

export async function POST(request: NextRequest) {
  try {
    const { evaluationId } = await request.json()
    
    if (evaluationId) {
      ServerResultsCache.clear(evaluationId)
      console.log(`🗑️ Cache cleared for evaluation ${evaluationId}`)
    } else {
      ServerResultsCache.clearAll()
      console.log('🗑️ All cache cleared')
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error clearing cache:', error)
    return NextResponse.json(
      { error: 'Error clearing cache' },
      { status: 500 }
    )
  }
} 