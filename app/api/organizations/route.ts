import { auth } from '@/lib/auth'
import { db } from '@/drizzle/db'
import { organizations, userInfo } from '@/drizzle/schema'
import { eq, asc } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const ui = await db.query.userInfo.findFirst({
      where: eq(userInfo.userId, session.user.id),
    })

    if (!ui) {
      return NextResponse.json({ error: 'Información de usuario no encontrada' }, { status: 404 })
    }

    const orgs = await db.query.organizations.findMany({
      orderBy: [asc(organizations.name)],
    })

    return NextResponse.json({ organizations: orgs || [] })
  } catch (error) {
    console.error('Error in organizations API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
