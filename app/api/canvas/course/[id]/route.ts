import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, getUserInfo } from '@/utils/queries'

const CANVAS_URL = 'https://cursos.canvas.uc.cl'

async function getAuthorizationHeader() {
  try {
    const user = await getCurrentUser()
    const userInfo = await getUserInfo(user.id)

    const canvasToken = userInfo?.canvasToken ?? process.env.NEXT_CANVAS_API_TOKEN

    return {
      headers: {
        Authorization: `Bearer ${canvasToken}`,
        'Content-Type': 'application/json'
      }
    }
  } catch (error) {
    console.error('Error getting auth header:', error)
    throw new Error('Failed to get authorization')
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const canvasId = params.id

    if (!canvasId) {
      return NextResponse.json(
        { error: 'Canvas ID is required' },
        { status: 400 }
      )
    }

    const authConfig = await getAuthorizationHeader()
    
    const response = await fetch(
      `${CANVAS_URL}/api/v1/courses/${canvasId}?include[]=course_image`,
      authConfig
    )

    if (!response.ok) {
      console.error('Canvas API error:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch course from Canvas' },
        { status: response.status }
      )
    }

    const courseData = await response.json()
    
    return NextResponse.json(courseData)
  } catch (error) {
    console.error('Error fetching Canvas course:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
