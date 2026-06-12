import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { users, userInfo } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    if (!email.endsWith('uc.cl')) {
      return NextResponse.json(
        { message: 'Solo se permiten correos UC (@uc.cl)' },
        { status: 400 }
      )
    }

    const existing = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    })
    if (existing) {
      return NextResponse.json(
        { message: 'El usuario ya existe' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [newUser] = await db.insert(users).values({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: `${firstName || ''} ${lastName || ''}`.trim(),
    }).returning()

    if (!newUser) {
      return NextResponse.json(
        { message: 'No se pudo crear el usuario' },
        { status: 400 }
      )
    }

    await db.insert(userInfo).values({
      userId: newUser.id,
      email,
      firstName: firstName || '',
      lastName: lastName || '',
    }).onConflictDoNothing()

    return NextResponse.json({
      user: { id: newUser.id, email: newUser.email },
      message: 'Usuario creado exitosamente',
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
