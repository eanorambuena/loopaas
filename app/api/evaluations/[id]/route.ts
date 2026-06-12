import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { evaluations } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const evaluation = await db.query.evaluations.findFirst({
      where: eq(evaluations.id, params.id),
    })

    if (!evaluation) {
      return NextResponse.json(
        { error: 'Evaluación no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(evaluation)
  } catch (error) {
    console.error('Error in evaluation API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const body = await request.json()
    await db.update(evaluations)
      .set(body)
      .where(eq(evaluations.id, params.id))
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error in evaluation update API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 