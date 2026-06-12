import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/drizzle/db'
import { userInfo } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'No autenticado' }, { status: 401 })
    }

    const existing = await db.query.userInfo.findFirst({
      where: eq(userInfo.userId, session.user.id),
    })

    if (!existing) {
      await db.insert(userInfo).values({
        userId: session.user.id,
        email: session.user.email,
        firstName: session.user.name?.split(' ')[0] || '',
        lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
      }).onConflictDoNothing()
    }

    return NextResponse.json({ message: 'User info synced' })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
