import { auth } from '@/lib/auth'
import { db } from '@/drizzle/db'
import { userInfo } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const data = await db.query.userInfo.findFirst({
    where: eq(userInfo.userId, session.user.id),
  })

  if (!data) {
    return NextResponse.json({ error: 'User info not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}
