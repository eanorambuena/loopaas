import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, getUserInfo } from '@/utils/queries'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    const userInfo = await getUserInfo(user.id)

    const hasUserToken = !!userInfo?.canvasToken
    const hasEnvToken = !!process.env.NEXT_CANVAS_API_TOKEN

    return NextResponse.json({
      hasUserToken,
      hasEnvToken,
      hasAnyToken: hasUserToken || hasEnvToken,
      tokenSource: hasUserToken ? 'user' : hasEnvToken ? 'environment' : 'none'
    })
  } catch (error) {
    console.error('Error checking Canvas token status:', error)
    return NextResponse.json(
      { error: 'Failed to check token status' },
      { status: 500 }
    )
  }
}
