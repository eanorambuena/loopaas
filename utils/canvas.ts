"use server"

const CANVAS_URL = 'https://cursos.canvas.uc.cl'

export async function getAuthorizationHeader() {
  return {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_CANVAS_API_TOKEN}`,
      mode: 'no-cors'
    }
  }
}

export async function fetchGroups(course: any) {
  let response = await fetch(`${CANVAS_URL}/api/v1/courses/${course.canvasId}/groups`, await getAuthorizationHeader())
  let groups = (await response.json())
    .map((group: any) => ({
      id: group.id,
      name: group.name,
      students: group.users,
    }))

  for (const group of groups) {
    let response = await fetch(`${CANVAS_URL}/api/v1/groups/${group.id}/users`, await getAuthorizationHeader())
    let students = (await response.json())
      .map((student: any) => ({
        id: student.id,
        name: student.name,
      }))
    group.students = students
  }
  
  return groups
}

export async function fetchCourse(canvasId: string) {
  try {
    const response = await fetch(`${CANVAS_URL}/api/v1/courses/${canvasId}`, await getAuthorizationHeader())
    const result = await response.json()
    if (result.code) {
      console.log(result)
    }
    return result
  }
  catch (error) {
    console.log(error)
    return null
  }

  
}
