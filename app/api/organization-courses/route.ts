import { NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { courses } from '@/drizzle/schema'
import { sql } from 'drizzle-orm'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const organizationId = searchParams.get('organizationId')
  if (!organizationId) {
    return NextResponse.json({ count: 0 })
  }
  const result = await db.select({ count: sql<number>`count(*)` }).from(courses)
  const count = Number(result[0]?.count || 0)
  return NextResponse.json({ count })
}
