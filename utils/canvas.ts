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

export async function fetchGroups(course: any) {
  try {
    const response = await fetch(`${CANVAS_URL}/api/v1/courses/${course.canvasId}/groups`, await getAuthorizationHeader())
    if (!response || !response.ok)
      throw new Error(`Error fetching groups: ${response?.statusText}`)
    const groupData = await response.json()
    if (!groupData)
      throw new Error('Error fetching groups: no data')
    console.log({ groupData})
    let groups = groupData?.map((group: any) => ({
      id: group.id,
      name: group.name,
    }))

    for (const group of groups) {
      const response = await fetch(`${CANVAS_URL}/api/v1/groups/${group.id}/users`, await getAuthorizationHeader())
      const studentsData = await response.json()

      let students: any[] = []
      for (const studentData of studentsData) {
        const response = await fetch(`${CANVAS_URL}/api/v1/users/${studentData.id}/profile`, await getAuthorizationHeader())
        const student = await response.json()
        const sortableNameData = student.sortable_name.split(', ')
        const firstName = sortableNameData[1]
        const lastName = sortableNameData[0]
        const email = `${student.login_id}@estudiante.uc.cl`
        students.push({
          id: student.id,
          avatarUrl: student.avatar_url,
          firstName,
          lastName,
          email,
        })
      }
      group.students = students
    }
    return groups.filter((group: any) => group.students.length > 0)
  }
  catch (error) {
    console.log(error)
    return []
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
