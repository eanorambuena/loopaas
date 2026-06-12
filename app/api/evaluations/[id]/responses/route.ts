import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/drizzle/db'
import { responses, students, userInfo } from '@/drizzle/schema'
import { eq, inArray } from 'drizzle-orm'

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const responseRows = await db.query.responses.findMany({
      where: eq(responses.evaluationId, params.id),
    })

    const responseWithUserInfo = await Promise.all(
      responseRows.map(async (r) => {
        const ui = await db.query.userInfo.findFirst({
          where: eq(userInfo.id, r.userInfoId),
        })
        return {
          id: r.id,
          userInfoId: r.userInfoId,
          created_at: r.created_at,
          userInfo: ui ? {
            id: ui.id,
            firstName: ui.firstName,
            lastName: ui.lastName,
            email: ui.email,
          } : null,
        }
      })
    )

    const userInfoIds = responseRows.map(r => r.userInfoId)
    const studentRows = userInfoIds.length > 0
      ? await db.query.students.findMany({
          where: inArray(students.userInfoId, userInfoIds),
        })
      : []

    const groupMap = new Map<string, string>()
    studentRows.forEach(student => {
      groupMap.set(student.userInfoId, student.group || '')
    })

    const responsesWithGroups = responseWithUserInfo.map(response => ({
      ...response,
      group: groupMap.get(response.userInfoId) || 'Sin grupo',
    }))

    return NextResponse.json({ responses: responsesWithGroups || [] })
  } catch (error) {
    console.error('Error in responses API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const body = await request.json()
    const { userInfoId, data } = body

    if (!userInfoId) {
      return NextResponse.json({ error: 'Missing userInfoId' }, { status: 400 })
    }

    const [response] = await db.insert(responses).values({
      evaluationId: params.id,
      userInfoId,
      data: typeof data === 'string' ? data : JSON.stringify(data),
    }).returning()

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error in create response API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 