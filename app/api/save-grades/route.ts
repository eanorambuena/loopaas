import { NextRequest, NextResponse } from 'next/server'
import { saveGrades } from '@/utils/saveGrades'
import { ServerResultsCache } from '@/utils/cache'

export async function POST(req: Request) {
  try {
    console.log('Save grades endpoint called')
    const body = await req.json()
    const { evaluation, students } = body
    
    console.log('Received evaluation:', evaluation?.id)
    console.log('Received students count:', students?.length)
    
    if (!evaluation || !students) {
      console.error('Missing evaluation or students data')
      return NextResponse.json({ error: 'Missing evaluation or students data' }, { status: 400 })
    }
    
    console.log('Calling saveGrades function...')
    await saveGrades(evaluation, students)
    console.log('saveGrades function completed successfully')
    
    // Clear cache for this evaluation since grades were updated
    if (evaluation?.id) {
      ServerResultsCache.clear(evaluation.id)
      console.log(`🗑️ Cache cleared for evaluation ${evaluation.id} after grade update`)
    }
    
    return NextResponse.json({ ok: true, message: 'Grades saved successfully' })
  } catch (error) {
    console.error('Error in save-grades endpoint:', error)
    return NextResponse.json({ 
      error: 'Error saving grades', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
