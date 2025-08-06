import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, getUserInfo } from '@/utils/queries'

const CANVAS_URL = 'https://cursos.canvas.uc.cl'

async function getAuthorizationHeader() {
  try {
    const user = await getCurrentUser()
    const userInfo = await getUserInfo(user.id)

    const canvasToken = userInfo?.canvasToken ?? process.env.NEXT_CANVAS_API_TOKEN

    if (!canvasToken) {
      throw new Error('No Canvas token available')
    }

    console.log('Using Canvas token:', canvasToken ? 'Token available' : 'No token')

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

    console.log('Fetching Canvas course with ID:', canvasId)

    const authConfig = await getAuthorizationHeader()
    
    const canvasUrl = `${CANVAS_URL}/api/v1/courses/${canvasId}?include[]=course_image`
    console.log('Canvas URL:', canvasUrl)
    
    const response = await fetch(canvasUrl, authConfig)

    console.log('Canvas API response status:', response.status)
    console.log('Canvas API response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Canvas API error details:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Canvas authentication failed. Please check your Canvas token.' },
          { status: 401 }
        )
      }

      return NextResponse.json(
        { error: `Canvas API error: ${response.statusText}` },
        { status: response.status }
      )
    }

    const courseData = await response.json()
    console.log('Canvas course data received:', {
      id: courseData.id,
      name: courseData.name,
      course_code: courseData.course_code
    })
    
    return NextResponse.json(courseData)
  } catch (error) {
    console.error('Error fetching Canvas course:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
