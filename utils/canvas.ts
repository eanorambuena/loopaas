import { getCourseStudents } from "./queries"

const CANVAS_URL = 'https://cursos.canvas.uc.cl'

export function getAuthorizationHeader() {
  return {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_CANVAS_API_TOKEN}`,
    }
  }
}

export async function fetchGroups(course: any) {
  let response = await fetch(`${CANVAS_URL}/api/v1/courses/${course.canvasId}/groups`, getAuthorizationHeader())
  let groups = (await response.json())
    .map((group: any) => ({
      id: group.id,
      name: group.name,
      students: group.users,
    }))

  for (const group of groups) {
    let response = await fetch(`${CANVAS_URL}/api/v1/groups/${group.id}/users`, getAuthorizationHeader())
    let students = (await response.json())
      .map((student: any) => ({
        id: student.id,
        name: student.name,
      }))
    group.students = students
  }

  const students = await getCourseStudents(course)
  
  return groups
}