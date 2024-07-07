'use server'

import { getCurrentUser, getUserInfo } from './queries'

const CANVAS_URL = 'https://cursos.canvas.uc.cl'

export async function getAuthorizationHeader() {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id)

  const canvasToken = userInfo?.canvasToken ?? process.env.NEXT_CANVAS_API_TOKEN

  return {
    headers: {
      Authorization: `Bearer ${canvasToken}`,
      mode: 'no-cors'
    }
  }
}

export async function fetchCourse(canvasId: string) {
  try {
    const response = await fetch(`${CANVAS_URL}/api/v1/courses/${canvasId}?include[]=course_image`, await getAuthorizationHeader())
    return await response.json()
  }
  catch (error) {
    console.log(error)
    return null
  }
}
