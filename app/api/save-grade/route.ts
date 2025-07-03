import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { userInfoId, evaluationId, score } = await req.json()
    if (!userInfoId || !evaluationId || typeof score !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid data' }, { status: 400 })
    }
    const supabase = createClient()
    try {
      const { error } = await supabase
        .from('grades')
        .upsert({ userInfoId, evaluationId, score }, { onConflict: ['userInfoId', 'evaluationId'] })
      if (error) {
        console.error('Supabase upsert error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ ok: true })
    } catch (err) {
      console.error('Unexpected error in upsert:', err)
      return NextResponse.json({ error: String(err) }, { status: 500 })
    }
  } catch (error) {
    console.error('General error in save-grade endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 