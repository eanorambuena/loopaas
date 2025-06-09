// app/api/save-students/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createAutoConfirmUsers } from '@/utils/queries'

export async function POST(req: Request) {
  const supabase = createClient()
  const body = await req.json()

  const csv = body.csv
  if (!csv) return NextResponse.json({ error: 'No CSV provided' }, { status: 400 })

  await createAutoConfirmUsers(csv)

  return NextResponse.json({ ok: true })
}
