import { db } from '@/drizzle/db'
import { userInfo } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, email, firstName, lastName } = body

    if (!userId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verificar si ya existe un userInfo para este usuario
    const existingUserInfo = await db.query.userInfo.findFirst({
      where: eq(userInfo.userId, userId),
    })

    if (existingUserInfo) {
      return NextResponse.json({ userInfo: existingUserInfo })
    }

    // Crear nuevo userInfo
    const [newUserInfo] = await db.insert(userInfo).values({
      userId,
      firstName: firstName || '',
      lastName: lastName || '',
      email,
    }).returning()

    if (!newUserInfo) {
      return NextResponse.json({ error: 'Error creating user info' }, { status: 500 })
    }

    return NextResponse.json({ userInfo: newUserInfo })
  } catch (error) {
    console.error('Error in create-user-info API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, email, firstName, lastName } = body

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const existingUserInfo = await db.query.userInfo.findFirst({
      where: eq(userInfo.userId, userId),
    })

    if (existingUserInfo) {
      await db.update(userInfo)
        .set({ firstName, lastName, email })
        .where(eq(userInfo.userId, userId))
    } else {
      await db.insert(userInfo).values({
        userId,
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error in update-user-info API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
