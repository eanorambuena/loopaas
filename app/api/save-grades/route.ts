import { NextRequest, NextResponse } from 'next/server'
import { saveGrades } from '@/utils/saveGrades'


export async function POST(req: Request) {
  const body = await req.json()
  const { evaluation, students } = body
  if (!evaluation || !students) {
    return NextResponse.json({ error: 'Missing evaluation or students data' }, { status: 400 })
  }
  await saveGrades(evaluation, students)
  return NextResponse.json({ ok: true })
}
