// app/api/save-students/route.ts
import { NextResponse } from 'next/server'
import { createAutoConfirmUsers } from '@/utils/queries'

export async function POST(req: Request) {
  const body = await req.json()

  const { csv, courseAbbreviation, courseSemester } = body
  if (!csv) return NextResponse.json({ error: 'No CSV provided' }, { status: 400 })
  if (!courseAbbreviation || !courseSemester) {
    return NextResponse.json({ error: 'Course information required' }, { status: 400 })
  }

  await createAutoConfirmUsers(csv, courseAbbreviation, courseSemester)

  return NextResponse.json({ ok: true })
}
