import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { grades } from '@/drizzle/schema'
import { ServerResultsCache } from '@/utils/cache'

export async function POST(req: NextRequest) {
  try {
    const { userInfoId, evaluationId, score } = await req.json()
    if (!userInfoId || !evaluationId || typeof score !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid data' }, { status: 400 })
    }
    try {
      await db.insert(grades).values({ userInfoId, evaluationId, score })
      
      // Clear cache for this evaluation since a grade was updated
      ServerResultsCache.clear(evaluationId)
      console.log(`🗑️ Cache cleared for evaluation ${evaluationId} after individual grade update`)
      
      return NextResponse.json({ ok: true })
    } catch (err) {
      console.error('Unexpected error in insert:', err)
      return NextResponse.json({ error: String(err) }, { status: 500 })
    }
  } catch (error) {
    console.error('General error in save-grade endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 